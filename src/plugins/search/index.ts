/**
 * Search Plugin
 * Provides methods for searching within strings
 */

import type { StrKitOptions, SearchOptions } from '../../core/types.js';

/**
 * Check if string contains a substring
 * @example contains('hello world', 'world') // true
 * @example contains('Hello World', 'world', { caseSensitive: false }) // true
 */
export function contains(
  input: string,
  search: string,
  options?: StrKitOptions
): boolean {
  if (!input || search === undefined || search === null) return false;
  if (search === '') return true;

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
  if (!input || search === undefined || search === null) return false;
  return input.startsWith(search);
}

/**
 * Check if string ends with a substring
 * @example endsWith('hello world', 'world') // true
 */
export function endsWith(input: string, search: string): boolean {
  if (!input || search === undefined || search === null) return false;
  return input.endsWith(search);
}

/**
 * Find the first index of a substring
 * @example indexOf('hello world', 'o') // 4
 * @example indexOf('hello world', 'o', { fromIndex: 5 }) // 7
 */
export function indexOf(
  input: string,
  search: string,
  options?: SearchOptions
): number {
  if (!input || search === undefined || search === null) return -1;

  const fromIndex = options?.fromIndex ?? 0;

  if (options?.caseSensitive === false) {
    return input.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
  }

  return input.indexOf(search, fromIndex);
}

/**
 * Find the last index of a substring
 * @example lastIndexOf('hello world', 'o') // 7
 */
export function lastIndexOf(
  input: string,
  search: string,
  options?: SearchOptions
): number {
  if (!input || search === undefined || search === null) return -1;

  const fromIndex = options?.fromIndex;

  if (options?.caseSensitive === false) {
    if (fromIndex !== undefined) {
      return input.toLowerCase().lastIndexOf(search.toLowerCase(), fromIndex);
    }
    return input.toLowerCase().lastIndexOf(search.toLowerCase());
  }

  if (fromIndex !== undefined) {
    return input.lastIndexOf(search, fromIndex);
  }
  return input.lastIndexOf(search);
}

/**
 * Count occurrences of a substring
 * @example countOccurrences('abracadabra', 'a') // 5
 * @example countOccurrences('hello hello', 'hello') // 2
 */
export function countOccurrences(
  input: string,
  search: string,
  options?: StrKitOptions
): number {
  if (!input || !search) return 0;

  let str = input;
  let substr = search;

  if (options?.caseSensitive === false) {
    str = input.toLowerCase();
    substr = search.toLowerCase();
  }

  let count = 0;
  let pos = 0;

  while ((pos = str.indexOf(substr, pos)) !== -1) {
    count++;
    pos += substr.length;
  }

  return count;
}

/**
 * Get all positions of a substring
 * @example positions('abracadabra', 'a') // [0, 3, 5, 7, 10]
 */
export function positions(
  input: string,
  search: string,
  options?: StrKitOptions
): number[] {
  if (!input || !search) return [];

  let str = input;
  let substr = search;

  if (options?.caseSensitive === false) {
    str = input.toLowerCase();
    substr = search.toLowerCase();
  }

  const result: number[] = [];
  let pos = 0;

  while ((pos = str.indexOf(substr, pos)) !== -1) {
    result.push(pos);
    pos += substr.length;
  }

  return result;
}

/**
 * Get the first regex match
 * @example match('hello 123 world 456', /\d+/) // '123'
 */
export function match(input: string, pattern: RegExp): string | null {
  if (!input) return null;

  const result = input.match(pattern);
  return result ? (result[0] ?? null) : null;
}

/**
 * Get all regex matches
 * @example matchAll('hello 123 world 456', /\d+/g) // ['123', '456']
 */
export function matchAll(input: string, pattern: RegExp): string[] {
  if (!input) return [];

  // Ensure global flag
  const flags = pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g';
  const globalPattern = new RegExp(pattern.source, flags);

  const results: string[] = [];
  let regexMatch: RegExpExecArray | null;

  while ((regexMatch = globalPattern.exec(input)) !== null) {
    results.push(regexMatch[0]);
    // Prevent infinite loop for zero-length matches
    if (regexMatch.index === globalPattern.lastIndex) {
      globalPattern.lastIndex++;
    }
  }

  return results;
}

/**
 * Extract with regex groups
 * @example extract('hello world', /(\w+) (\w+)/) // ['hello world', 'hello', 'world']
 */
export function extract(input: string, pattern: RegExp): RegExpMatchArray | null {
  if (!input) return null;
  return input.match(pattern);
}

/**
 * Extract all with regex groups
 * @example extractAll('a1 b2 c3', /([a-z])(\d)/g) // [['a1', 'a', '1'], ['b2', 'b', '2'], ['c3', 'c', '3']]
 */
export function extractAll(input: string, pattern: RegExp): RegExpMatchArray[] {
  if (!input) return [];

  // Ensure global flag
  const flags = pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g';
  const globalPattern = new RegExp(pattern.source, flags);

  const results: RegExpMatchArray[] = [];
  let regexMatch: RegExpExecArray | null;

  while ((regexMatch = globalPattern.exec(input)) !== null) {
    results.push(regexMatch);
    // Prevent infinite loop for zero-length matches
    if (regexMatch.index === globalPattern.lastIndex) {
      globalPattern.lastIndex++;
    }
  }

  return results;
}

// Export plugin
export const searchPlugin = {
  name: 'search',
  version: '1.0.0',
  methods: {
    contains,
    startsWith,
    endsWith,
    indexOf,
    lastIndexOf,
    countOccurrences,
    positions,
    match,
    matchAll,
    extract,
    extractAll,
  },
};
