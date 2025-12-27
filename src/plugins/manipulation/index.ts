/**
 * Manipulation Plugin
 * Provides methods for string manipulation operations
 */

import { splitChars, reverseString, escapeRegExp, normalizeWhitespace } from '../../core/utils.js';
import type { TruncateOptions } from '../../core/types.js';

/**
 * Trim whitespace or specified characters from both ends
 * @example trim('  hello  ') // 'hello'
 * @example trim('##hello##', '#') // 'hello'
 */
export function trim(input: string, chars?: string): string {
  if (!input) return '';

  if (!chars) {
    return input.trim();
  }

  const escaped = escapeRegExp(chars);
  const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
  return input.replace(regex, '');
}

/**
 * Trim whitespace or specified characters from start
 * @example trimStart('  hello') // 'hello'
 */
export function trimStart(input: string, chars?: string): string {
  if (!input) return '';

  if (!chars) {
    return input.trimStart();
  }

  const escaped = escapeRegExp(chars);
  const regex = new RegExp(`^[${escaped}]+`);
  return input.replace(regex, '');
}

/**
 * Trim whitespace or specified characters from end
 * @example trimEnd('hello  ') // 'hello'
 */
export function trimEnd(input: string, chars?: string): string {
  if (!input) return '';

  if (!chars) {
    return input.trimEnd();
  }

  const escaped = escapeRegExp(chars);
  const regex = new RegExp(`[${escaped}]+$`);
  return input.replace(regex, '');
}

/**
 * Pad string on both sides to reach target length
 * @example pad('hello', 11, '-') // '---hello---'
 */
export function pad(input: string, length: number, char: string = ' '): string {
  if (!input) input = '';
  if (input.length >= length) return input;

  const totalPadding = length - input.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;

  return char.repeat(leftPadding) + input + char.repeat(rightPadding);
}

/**
 * Pad string on start to reach target length
 * @example padStart('5', 3, '0') // '005'
 */
export function padStart(input: string, length: number, char: string = ' '): string {
  if (!input) input = '';
  if (input.length >= length) return input;

  return char.repeat(length - input.length) + input;
}

/**
 * Pad string on end to reach target length
 * @example padEnd('5', 3, '0') // '500'
 */
export function padEnd(input: string, length: number, char: string = ' '): string {
  if (!input) input = '';
  if (input.length >= length) return input;

  return input + char.repeat(length - input.length);
}

/**
 * Repeat string n times
 * @example repeat('ab', 3) // 'ababab'
 */
export function repeat(input: string, count: number): string {
  if (!input || count <= 0) return '';
  return input.repeat(count);
}

/**
 * Reverse string (Unicode-aware)
 * @example reverse('hello') // 'olleh'
 */
export function reverse(input: string): string {
  if (!input) return '';
  return reverseString(input);
}

/**
 * Truncate string with ellipsis
 * @example truncate('hello world', 8) // 'hello...'
 * @example truncate('hello world', 8, { position: 'middle' }) // 'hel...ld'
 */
export function truncate(
  input: string,
  length: number,
  options?: TruncateOptions
): string {
  if (!input) return '';
  if (input.length <= length) return input;

  const ellipsis = options?.ellipsis ?? '...';
  const position = options?.position ?? 'end';

  if (length <= ellipsis.length) {
    return ellipsis.slice(0, length);
  }

  const availableLength = length - ellipsis.length;

  switch (position) {
    case 'start':
      return ellipsis + input.slice(-availableLength);

    case 'middle': {
      const leftLength = Math.ceil(availableLength / 2);
      const rightLength = Math.floor(availableLength / 2);
      return input.slice(0, leftLength) + ellipsis + input.slice(-rightLength);
    }

    case 'end':
    default:
      return input.slice(0, availableLength) + ellipsis;
  }
}

/**
 * Wrap string with characters
 * @example wrap('hello', '"') // '"hello"'
 * @example wrap('hello', '[', ']') // '[hello]'
 */
export function wrap(input: string, wrapper: string, end?: string): string {
  if (!input) input = '';
  return wrapper + input + (end ?? wrapper);
}

/**
 * Remove wrapping characters
 * @example unwrap('"hello"', '"') // 'hello'
 * @example unwrap('[hello]', '[', ']') // 'hello'
 */
export function unwrap(input: string, wrapper: string, end?: string): string {
  if (!input) return '';

  const endWrapper = end ?? wrapper;

  if (input.startsWith(wrapper) && input.endsWith(endWrapper)) {
    return input.slice(wrapper.length, -endWrapper.length || undefined);
  }

  return input;
}

/**
 * Splice string (like Array.splice)
 * @example splice('hello', 2, 2, 'XY') // 'heXYo'
 */
export function splice(
  input: string,
  start: number,
  deleteCount: number,
  insert: string = ''
): string {
  if (!input) return insert;

  const chars = splitChars(input);
  chars.splice(start, deleteCount, ...splitChars(insert));
  return chars.join('');
}

/**
 * Insert string at position
 * @example insert('hello', 2, 'XY') // 'heXYllo'
 */
export function insert(input: string, index: number, str: string): string {
  if (!input) return str;
  if (index <= 0) return str + input;
  if (index >= input.length) return input + str;

  return input.slice(0, index) + str + input.slice(index);
}

/**
 * Remove characters from string
 * @example remove('hello', 1, 3) // 'ho'
 */
export function remove(input: string, start: number, count: number): string {
  if (!input) return '';
  if (start < 0) start = 0;
  if (count <= 0) return input;

  return input.slice(0, start) + input.slice(start + count);
}

/**
 * Replace first occurrence
 * @example replace('hello', 'l', 'L') // 'heLlo'
 */
export function replace(
  input: string,
  search: string | RegExp,
  replacement: string
): string {
  if (!input) return '';
  return input.replace(search, replacement);
}

/**
 * Replace all occurrences
 * @example replaceAll('hello', 'l', 'L') // 'heLLo'
 */
export function replaceAll(
  input: string,
  search: string | RegExp,
  replacement: string
): string {
  if (!input) return '';

  if (typeof search === 'string') {
    return input.split(search).join(replacement);
  }

  // Ensure regex has global flag
  const flags = search.flags.includes('g') ? search.flags : search.flags + 'g';
  const globalRegex = new RegExp(search.source, flags);
  return input.replace(globalRegex, replacement);
}

/**
 * Get string between delimiters
 * @example between('<tag>', '<', '>') // 'tag'
 */
export function between(input: string, start: string, end: string): string {
  if (!input) return '';

  const startIndex = input.indexOf(start);
  if (startIndex === -1) return '';

  const searchStart = startIndex + start.length;
  const endIndex = input.indexOf(end, searchStart);
  if (endIndex === -1) return '';

  return input.slice(searchStart, endIndex);
}

/**
 * Get string before first occurrence
 * @example before('hello@world', '@') // 'hello'
 */
export function before(input: string, search: string): string {
  if (!input) return '';

  const index = input.indexOf(search);
  if (index === -1) return input;

  return input.slice(0, index);
}

/**
 * Get string after first occurrence
 * @example after('hello@world', '@') // 'world'
 */
export function after(input: string, search: string): string {
  if (!input) return '';

  const index = input.indexOf(search);
  if (index === -1) return '';

  return input.slice(index + search.length);
}

/**
 * Get string before last occurrence
 * @example beforeLast('hello@world@test', '@') // 'hello@world'
 */
export function beforeLast(input: string, search: string): string {
  if (!input) return '';

  const index = input.lastIndexOf(search);
  if (index === -1) return input;

  return input.slice(0, index);
}

/**
 * Get string after last occurrence
 * @example afterLast('hello@world@test', '@') // 'test'
 */
export function afterLast(input: string, search: string): string {
  if (!input) return '';

  const index = input.lastIndexOf(search);
  if (index === -1) return '';

  return input.slice(index + search.length);
}

/**
 * Append strings
 * @example append('hello', ' ', 'world') // 'hello world'
 */
export function append(input: string, ...strings: string[]): string {
  return (input ?? '') + strings.join('');
}

/**
 * Prepend strings
 * @example prepend('world', 'hello', ' ') // 'hello world'
 */
export function prepend(input: string, ...strings: string[]): string {
  return strings.join('') + (input ?? '');
}

/**
 * Surround string with another string
 * @example surround('hello', '***') // '***hello***'
 */
export function surround(input: string, wrapper: string): string {
  return wrapper + (input ?? '') + wrapper;
}

/**
 * Collapse multiple whitespace into single spaces
 * @example collapseWhitespace('hello   world\n\ntest') // 'hello world test'
 */
export function collapseWhitespace(input: string): string {
  if (!input) return '';
  return normalizeWhitespace(input);
}

/**
 * Split string into lines
 * @example lines('a\nb\nc') // ['a', 'b', 'c']
 */
export function lines(input: string): string[] {
  if (!input) return [];
  return input.split(/\r?\n/);
}

/**
 * Split string into words
 * @example words('hello world') // ['hello', 'world']
 */
export function words(input: string): string[] {
  if (!input) return [];
  return input.split(/\s+/).filter(Boolean);
}

/**
 * Split string into characters (Unicode-aware)
 * @example chars('hello') // ['h', 'e', 'l', 'l', 'o']
 */
export function chars(input: string): string[] {
  if (!input) return [];
  return splitChars(input);
}

// Export plugin
export const manipulationPlugin = {
  name: 'manipulation',
  version: '1.0.0',
  methods: {
    trim,
    trimStart,
    trimEnd,
    pad,
    padStart,
    padEnd,
    repeat,
    reverse,
    truncate,
    wrap,
    unwrap,
    splice,
    insert,
    remove,
    replace,
    replaceAll,
    between,
    before,
    after,
    beforeLast,
    afterLast,
    append,
    prepend,
    surround,
    collapseWhitespace,
    lines,
    words,
    chars,
  },
};
