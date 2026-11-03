import { BUSINESS_CONFIG } from './businessConfig.js';

/**
 * Runtime site settings loader.
 *
 * Reads `settings.ini` (deployed next to index.html) BEFORE the app renders and
 * overrides the matching values in BUSINESS_CONFIG. This lets the owner change
 * phone numbers, emails and the form key directly on the server, without
 * rebuilding the site. If the file is missing or a value is invalid, the
 * built-in defaults from businessConfig.js are kept.
 */
const SETTINGS_URL = './settings.ini';
const LOAD_TIMEOUT_MS = 3000;

/** Minimal INI parser: returns { section: { key: value } }. */
export function parseIni(text) {
  const result = {};
  let section = '';
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;

    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      section = sectionMatch[1].trim().toLowerCase();
      result[section] = result[section] || {};
      continue;
    }

    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim().toLowerCase();
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    result[section] = result[section] || {};
    result[section][key] = value;
  }
  return result;
}

/** Turns "(404) 482-2246" / "+1 404 482 2246" into { display, tel, whatsapp } or null. */
function normalizePhone(value) {
  if (!value) return null;
  let digits = value.replace(/\D/g, '');
  if (digits.length === 10) digits = `1${digits}`; // US number without country code
  if (digits.length < 11 || digits.length > 15) return null;

  const display = digits.length === 11 && digits.startsWith('1')
    ? `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    : `+${digits}`;

  return { display, tel: `+${digits}`, whatsapp: digits };
}

function normalizeEmail(value) {
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}

/** Keeps SEO tags in index.html in sync with the current main phone number. */
function syncDocumentPhone(oldDisplay, oldTel, phone) {
  if (!phone || phone.display === oldDisplay || typeof document === 'undefined') return;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', description.getAttribute('content').split(oldDisplay).join(phone.display));
  }
  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
    node.textContent = node.textContent.split(oldTel).join(phone.tel);
  });
}

export function applySettings(settings) {
  const contact = settings.contact || {};
  const forms = settings.forms || {};
  const oldDisplay = BUSINESS_CONFIG.phone;
  const oldTel = BUSINESS_CONFIG.phoneRaw;

  const phone = normalizePhone(contact.phone);
  if (phone) {
    BUSINESS_CONFIG.phone = phone.display;
    BUSINESS_CONFIG.phoneRaw = phone.tel;
    if (BUSINESS_CONFIG.demoTechnician) BUSINESS_CONFIG.demoTechnician.phone = phone.display;
  } else if (contact.phone) {
    console.warn('[settings.ini] Invalid "phone" value, using default:', contact.phone);
  }

  const backupPhone = normalizePhone(contact.backup_phone);
  if (backupPhone) BUSINESS_CONFIG.altPhone = backupPhone.display;

  const whatsapp = normalizePhone(contact.whatsapp);
  if (whatsapp) BUSINESS_CONFIG.whatsappPhoneRaw = whatsapp.whatsapp;

  const email = normalizeEmail(contact.email);
  if (email) {
    BUSINESS_CONFIG.email = email;
    BUSINESS_CONFIG.dispatchEmail = email;
  } else if (contact.email) {
    console.warn('[settings.ini] Invalid "email" value, using default:', contact.email);
  }

  const supportEmail = normalizeEmail(contact.support_email);
  if (supportEmail) BUSINESS_CONFIG.supportEmail = supportEmail;

  // Form receiver: a real email OR FormSubmit's private random alias.
  const receiver = forms.receive_email;
  if (receiver) {
    if (normalizeEmail(receiver) || /^[A-Za-z0-9_-]{8,}$/.test(receiver)) {
      BUSINESS_CONFIG.formReceiver = receiver;
    } else {
      console.warn('[settings.ini] Invalid "receive_email" value, using default:', receiver);
    }
  }

  syncDocumentPhone(oldDisplay, oldTel, phone);
}

/** Loads settings.ini. Never throws and never blocks the site for more than LOAD_TIMEOUT_MS. */
export async function loadSiteSettings() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);
  try {
    const response = await fetch(SETTINGS_URL, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) {
      console.warn(`[settings.ini] Not found (HTTP ${response.status}). Using built-in defaults.`);
      return;
    }
    applySettings(parseIni(await response.text()));
  } catch (error) {
    console.warn('[settings.ini] Could not load. Using built-in defaults.', error);
  } finally {
    clearTimeout(timeoutId);
  }
}
