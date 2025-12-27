/**
 * Validation Plugin
 * Provides methods for validating string formats
 */

import type { StrKitOptions } from '../../core/types.js';

/**
 * Validate email address (RFC 5322 simplified)
 * @example isEmail('test@example.com') // true
 */
export function isEmail(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // RFC 5322 compliant regex (simplified)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(input)) return false;

  // Additional checks
  const atIndex = input.indexOf('@');
  const local = input.slice(0, atIndex);
  const domain = input.slice(atIndex + 1);

  if (!local || !domain) return false;
  if (local.length > 64) return false;
  if (domain.length > 253) return false;
  if (!domain.includes('.')) return false;

  return true;
}

/**
 * Validate URL
 * @example isUrl('https://example.com') // true
 */
export function isUrl(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  try {
    const url = new URL(input);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate UUID (any version or specific version)
 * @example isUuid('550e8400-e29b-41d4-a716-446655440000') // true
 * @example isUuid('550e8400-e29b-41d4-a716-446655440000', 4) // true
 */
export function isUuid(input: string, version?: 1 | 3 | 4 | 5): boolean {
  if (!input || typeof input !== 'string') return false;

  const patterns: Record<number | 'any', RegExp> = {
    1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    any: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  };

  const pattern = version !== undefined ? patterns[version] : patterns.any;
  return pattern !== undefined && pattern.test(input);
}

/**
 * Validate IP address (v4 or v6)
 * @example isIp('192.168.1.1') // true
 * @example isIp('::1') // true
 */
export function isIp(input: string): boolean {
  return isIpv4(input) || isIpv6(input);
}

/**
 * Validate IPv4 address
 * @example isIpv4('192.168.1.1') // true
 */
export function isIpv4(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  const parts = input.split('.');
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
}

/**
 * Validate IPv6 address
 * @example isIpv6('::1') // true
 * @example isIpv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 */
export function isIpv6(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // Handle :: notation
  const regex =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/;

  return regex.test(input);
}

/**
 * Validate phone number (international format)
 * @example isPhone('+1-555-555-5555') // true
 */
export function isPhone(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // Remove common separators and spaces
  const cleaned = input.replace(/[\s\-().]/g, '');

  // Check for valid phone number pattern
  // Allows optional + prefix, then 7-15 digits
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

/**
 * Validate credit card number (Luhn algorithm)
 * @example isCreditCard('4111111111111111') // true
 */
export function isCreditCard(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // Remove spaces and dashes
  const cleaned = input.replace(/[\s-]/g, '');

  // Must be 13-19 digits
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!, 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Check if string is empty
 * @example isEmpty('') // true
 * @example isEmpty('hello') // false
 */
export function isEmpty(input: string): boolean {
  return input === '' || input === null || input === undefined;
}

/**
 * Check if string is blank (empty or whitespace only)
 * @example isBlank('   ') // true
 * @example isBlank('hello') // false
 */
export function isBlank(input: string): boolean {
  if (!input) return true;
  return /^\s*$/.test(input);
}

/**
 * Check if string contains only alphabetic characters
 * @example isAlpha('hello') // true
 * @example isAlpha('hello123') // false
 */
export function isAlpha(input: string): boolean {
  if (!input) return false;
  return /^[a-zA-Z]+$/.test(input);
}

/**
 * Check if string contains only numeric characters
 * @example isNumeric('12345') // true
 * @example isNumeric('12.34') // false
 */
export function isNumeric(input: string): boolean {
  if (!input) return false;
  return /^\d+$/.test(input);
}

/**
 * Check if string contains only alphanumeric characters
 * @example isAlphanumeric('hello123') // true
 * @example isAlphanumeric('hello-123') // false
 */
export function isAlphanumeric(input: string): boolean {
  if (!input) return false;
  return /^[a-zA-Z0-9]+$/.test(input);
}

/**
 * Check if string is valid hexadecimal
 * @example isHex('ff00ff') // true
 * @example isHex('0xFF00FF') // true
 */
export function isHex(input: string): boolean {
  if (!input) return false;
  // Allow optional 0x prefix
  const hex = input.startsWith('0x') || input.startsWith('0X') ? input.slice(2) : input;
  return /^[0-9a-fA-F]+$/.test(hex);
}

/**
 * Check if string is valid base64
 * @example isBase64('aGVsbG8=') // true
 */
export function isBase64(input: string): boolean {
  if (!input) return false;

  // Standard base64 pattern
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  // URL-safe base64 pattern
  const base64UrlRegex = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}==|[A-Za-z0-9_-]{3}=)?$/;

  return base64Regex.test(input) || base64UrlRegex.test(input);
}

/**
 * Check if string is valid JSON
 * @example isJson('{"key":"value"}') // true
 */
export function isJson(input: string): boolean {
  if (!input) return false;

  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is all uppercase
 * @example isUpperCase('HELLO') // true
 * @example isUpperCase('Hello') // false
 */
export function isUpperCase(input: string): boolean {
  if (!input) return false;
  // Check if there are letters and all letters are uppercase
  const hasLetters = /[a-zA-Z]/.test(input);
  if (!hasLetters) return false;
  return input === input.toUpperCase();
}

/**
 * Check if string is all lowercase
 * @example isLowerCase('hello') // true
 * @example isLowerCase('Hello') // false
 */
export function isLowerCase(input: string): boolean {
  if (!input) return false;
  // Check if there are letters and all letters are lowercase
  const hasLetters = /[a-zA-Z]/.test(input);
  if (!hasLetters) return false;
  return input === input.toLowerCase();
}

/**
 * Check if string contains a substring
 * @example contains('hello world', 'world') // true
 */
export function contains(
  input: string,
  search: string,
  options?: StrKitOptions
): boolean {
  if (!input || !search) return false;

  if (options?.caseSensitive === false) {
    return input.toLowerCase().includes(search.toLowerCase());
  }

  return input.includes(search);
}

/**
 * Check if string starts with a substring
 * @example startsWith('hello world', 'hello') // true
 */
export function startsWith(input: string, search: string): boolean {
  if (!input || search === undefined) return false;
  return input.startsWith(search);
}

/**
 * Check if string ends with a substring
 * @example endsWith('hello world', 'world') // true
 */
export function endsWith(input: string, search: string): boolean {
  if (!input || search === undefined) return false;
  return input.endsWith(search);
}

/**
 * Check if strings are equal
 * @example equals('hello', 'hello') // true
 * @example equals('Hello', 'hello', { caseSensitive: false }) // true
 */
export function equals(
  input: string,
  other: string,
  options?: StrKitOptions
): boolean {
  if (input === other) return true;
  if (input === null || input === undefined || other === null || other === undefined) {
    return false;
  }

  if (options?.caseSensitive === false) {
    return input.toLowerCase() === other.toLowerCase();
  }

  return input === other;
}

/**
 * Check if string matches a regex pattern
 * @example matches('hello123', /^[a-z]+\d+$/) // true
 */
export function matches(input: string, pattern: RegExp): boolean {
  if (!input) return false;
  return pattern.test(input);
}

// Export plugin
export const validationPlugin = {
  name: 'validation',
  version: '1.0.0',
  methods: {
    email: isEmail,
    url: isUrl,
    uuid: isUuid,
    ip: isIp,
    ipv4: isIpv4,
    ipv6: isIpv6,
    phone: isPhone,
    creditCard: isCreditCard,
    empty: isEmpty,
    blank: isBlank,
    alpha: isAlpha,
    numeric: isNumeric,
    alphanumeric: isAlphanumeric,
    hex: isHex,
    base64: isBase64,
    json: isJson,
    upperCase: isUpperCase,
    lowerCase: isLowerCase,
    contains,
    startsWith,
    endsWith,
    equals,
    matches,
  },
};
