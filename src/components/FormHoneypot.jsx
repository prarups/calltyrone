import React from 'react';

/**
 * Invisible spam trap. Real users never see or fill it; bots usually do.
 * Read it in a submit handler with: e.currentTarget.elements.namedItem('botcheck')?.value
 */
export default function FormHoneypot() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Leave this field empty
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
