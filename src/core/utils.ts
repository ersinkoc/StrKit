/**
 * Internal utilities for StrKit
 * These functions are not exported publicly
 */

/**
 * Split a string into Unicode-aware characters
 * Handles surrogate pairs, emoji, and combining characters correctly
 */
export function splitChars(str: string): string[] {
  return [...str];
}

/**
 * Reverse a string in a Unicode-aware manner
 * Handles surrogate pairs and emoji correctly
 */
export function reverseString(str: string): string {
  return [...str].reverse().join('');
}

/**
 * Split a string into words, handling various cases:
 * - camelCase
 * - PascalCase
 * - kebab-case
 * - snake_case
 * - dot.case
 * - path/case
 * - Regular spaces
 */
export function splitWords(str: string): string[] {
  if (!str) return [];

  return (
    str
      // Handle camelCase and PascalCase boundaries
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      // Handle consecutive uppercase followed by lowercase (e.g., XMLParser -> XML Parser)
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // Replace common separators with spaces
      .replace(/[-_./\\]/g, ' ')
      // Split on whitespace
      .split(/\s+/)
      // Filter out empty strings
      .filter(Boolean)
  );
}

/**
 * Check if a string contains only ASCII characters
 */
export function isAscii(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Normalize whitespace: collapse multiple spaces/tabs/newlines into single spaces
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Escape special characters for use in a regular expression
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get the UTF-8 byte length of a string
 */
export function getByteLength(str: string): number {
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0x80) {
      bytes += 1;
    } else if (charCode < 0x800) {
      bytes += 2;
    } else if (charCode >= 0xd800 && charCode <= 0xdbff) {
      // Surrogate pair
      bytes += 4;
      i++; // Skip the low surrogate
    } else {
      bytes += 3;
    }
  }
  return bytes;
}

/**
 * Capitalize the first character of a string
 */
export function capitalizeFirst(str: string, locale?: string): string {
  if (!str) return '';
  const chars = splitChars(str);
  if (chars.length === 0) return '';
  const first = chars[0];
  const rest = chars.slice(1).join('');
  if (locale) {
    return first.toLocaleUpperCase(locale) + rest;
  }
  return first.toUpperCase() + rest;
}

/**
 * Lowercase the first character of a string
 */
export function lowercaseFirst(str: string, locale?: string): string {
  if (!str) return '';
  const chars = splitChars(str);
  if (chars.length === 0) return '';
  const first = chars[0];
  const rest = chars.slice(1).join('');
  if (locale) {
    return first.toLocaleLowerCase(locale) + rest;
  }
  return first.toLowerCase() + rest;
}

/**
 * Convert a string to lowercase with optional locale support
 */
export function toLower(str: string, locale?: string): string {
  if (!str) return '';
  if (locale) {
    return str.toLocaleLowerCase(locale);
  }
  return str.toLowerCase();
}

/**
 * Convert a string to uppercase with optional locale support
 */
export function toUpper(str: string, locale?: string): string {
  if (!str) return '';
  if (locale) {
    return str.toLocaleUpperCase(locale);
  }
  return str.toUpperCase();
}

/**
 * Check if a character is a letter (Unicode-aware)
 */
export function isLetter(char: string): boolean {
  return /\p{L}/u.test(char);
}

/**
 * Check if a character is uppercase
 */
export function isUpperCase(char: string): boolean {
  return char !== char.toLowerCase() && char === char.toUpperCase();
}

/**
 * Check if a character is lowercase
 */
export function isLowerCase(char: string): boolean {
  return char !== char.toUpperCase() && char === char.toLowerCase();
}

/**
 * Ensure a value is a string
 */
export function ensureString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

/**
 * Get a nested property from an object using dot notation
 */
export function getNestedProperty(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

/**
 * Create bigrams (2-character sequences) from a string
 */
export function createBigrams(str: string): Map<string, number> {
  const bigrams = new Map<string, number>();
  const normalized = str.toLowerCase();

  for (let i = 0; i < normalized.length - 1; i++) {
    const bigram = normalized.substring(i, i + 2);
    bigrams.set(bigram, (bigrams.get(bigram) ?? 0) + 1);
  }

  return bigrams;
}

/**
 * Create word tokens from a string for similarity comparison
 */
export function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0);
}
