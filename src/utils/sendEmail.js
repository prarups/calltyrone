import { BUSINESS_CONFIG } from '../config/businessConfig';

/**
 * Form-to-email delivery via FormSubmit (https://formsubmit.co) - free, no account, no API key.
 *
 * - Receiving inbox comes from `settings.ini` -> [forms] receive_email
 *   (falls back to BUSINESS_CONFIG.dispatchEmail).
 * - FIRST submission to a new inbox: FormSubmit emails an "Activate Form" link to that
 *   inbox (check Spam too). Click it once. After that every request arrives normally.
 *   After activating, you can replace the email in settings.ini with the private
 *   random alias FormSubmit gives you, so the real address is not visible in the site.
 * - Every response is verified. Callers receive { ok: false } on any failure so the UI
 *   shows an error + Call fallback instead of a fake success.
 */
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/';
const REQUEST_TIMEOUT_MS = 15000;

const getReceiver = () =>
  (BUSINESS_CONFIG.formReceiver || BUSINESS_CONFIG.dispatchEmail || BUSINESS_CONFIG.email || '').trim();

/**
 * @param {Object} params
 * @param {string} params.subject    Email subject line
 * @param {Object} params.fields     Key/value pairs shown in the email body
 * @param {string} [params.replyTo]  Customer email (lets the business hit "Reply")
 * @param {string} [params.honeypot] Value of the hidden bot-trap field
 * @returns {Promise<{ ok: boolean, error?: string, needsActivation?: boolean }>}
 */
export async function sendFormEmail({ subject, fields, replyTo, honeypot }) {
  // Bots fill the hidden honeypot field. Pretend success, send nothing.
  if (honeypot) {
    return { ok: true };
  }

  const receiver = getReceiver();
  if (!receiver) {
    console.error('[sendFormEmail] No receiving email. Set receive_email in settings.ini.');
    return { ok: false, error: 'Email service is not configured.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${FORMSUBMIT_ENDPOINT}${encodeURIComponent(receiver)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _captcha: 'false',
        _template: 'table',
        ...(replyTo ? { _replyto: replyTo } : {}),
        ...fields
      }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    const success = data.success === true || data.success === 'true';
    const message = String(data.message || '');

    if (response.ok && success) {
      // First-ever submission: FormSubmit asks the inbox owner to click "Activate".
      const needsActivation = /activat/i.test(message);
      if (needsActivation) {
        console.warn('[sendFormEmail] FormSubmit activation pending. Open the Activate email in the receiving inbox (check Spam).', message);
      }
      return { ok: true, needsActivation };
    }

    console.error('[sendFormEmail] Delivery rejected:', response.status, data);
    return { ok: false, error: message || `Request failed (HTTP ${response.status}).` };
  } catch (error) {
    const message = error.name === 'AbortError'
      ? 'The request timed out. Please check your connection.'
      : 'Network error. Please check your connection.';
    console.error('[sendFormEmail] Network failure:', error);
    return { ok: false, error: message };
  } finally {
    clearTimeout(timeoutId);
  }
}
