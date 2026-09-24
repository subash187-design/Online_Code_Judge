const dns = require('dns').promises;

const EMAIL_STRICT_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Perform DNS MX check with a configurable timeout
 */
async function checkMxWithTimeout(domain, timeoutMs = 3000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      const err = new Error('DNS lookup timed out');
      err.code = 'ETIMEOUT';
      reject(err);
    }, timeoutMs)
  );

  return Promise.race([dns.resolveMx(domain), timeoutPromise]);
}

/**
 * Validate email format, domain structure, and verify DNS MX records
 * before generating or sending an OTP.
 */
async function validateEmailAddress(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'A valid email address is required.' };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address exceeds maximum length of 254 characters.' };
  }

  if (trimmed.includes(' ') || trimmed.includes('..')) {
    return { valid: false, error: 'Email address contains invalid characters or consecutive dots.' };
  }

  if (!EMAIL_STRICT_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  const [localPart, domain] = parts;

  if (localPart.length === 0 || localPart.length > 64) {
    return { valid: false, error: 'The email username part must be between 1 and 64 characters.' };
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { valid: false, error: 'Email username cannot start or end with a dot.' };
  }

  if (!domain || !domain.includes('.')) {
    return { valid: false, error: 'Email domain must contain a valid extension (e.g. .com).' };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];

  // Top level domain must be only alphabetic and at least 2 characters long
  if (!/^[a-zA-Z]{2,63}$/.test(tld)) {
    return { valid: false, error: 'Email domain has an invalid top-level domain extension.' };
  }

  // Check DNS MX records for domain
  try {
    const mxRecords = await checkMxWithTimeout(domain, 3000);
    if (!mxRecords || mxRecords.length === 0) {
      // Fallback check for A record
      try {
        const aRecords = await dns.resolve(domain, 'A');
        if (!aRecords || aRecords.length === 0) {
          return { valid: false, error: `The email domain "${domain}" cannot receive emails.` };
        }
      } catch {
        return { valid: false, error: `The email domain "${domain}" has no active mail servers.` };
      }
    }
  } catch (err) {
    if (err.code === 'ENOTFOUND' || err.code === 'NXDOMAIN' || err.code === 'ENODATA' || err.code === 'NODATA') {
      return { valid: false, error: `The email domain "${domain}" does not exist or cannot receive mail.` };
    }
    // For network timeouts or internal DNS glitches, log warning and avoid blocking legitimate users
    console.warn(`[validateEmailAddress] DNS lookup warning for ${domain}:`, err.code || err.message);
  }

  return { valid: true, email: trimmed };
}

module.exports = {
  validateEmailAddress
};
