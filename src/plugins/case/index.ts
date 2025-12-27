/**
 * Case Conversion Plugin
 * Provides methods for converting strings between different case formats
 */

import { splitWords, capitalizeFirst, lowercaseFirst } from '../../core/utils.js';
import type { StrKitOptions } from '../../core/types.js';

/**
 * Convert string to camelCase
 * @example camelCase('hello world') // 'helloWorld'
 * @example camelCase('hello-world') // 'helloWorld'
 */
export function camelCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word, index) => {
      const lower = locale ? word.toLocaleLowerCase(locale) : word.toLowerCase();
      if (index === 0) return lower;
      return capitalizeFirst(lower, locale);
    })
    .join('');
}

/**
 * Convert string to kebab-case
 * @example kebabCase('helloWorld') // 'hello-world'
 * @example kebabCase('Hello World') // 'hello-world'
 */
export function kebabCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => (locale ? word.toLocaleLowerCase(locale) : word.toLowerCase()))
    .join('-');
}

/**
 * Convert string to snake_case
 * @example snakeCase('helloWorld') // 'hello_world'
 * @example snakeCase('Hello World') // 'hello_world'
 */
export function snakeCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => (locale ? word.toLocaleLowerCase(locale) : word.toLowerCase()))
    .join('_');
}

/**
 * Convert string to PascalCase
 * @example pascalCase('hello world') // 'HelloWorld'
 * @example pascalCase('hello-world') // 'HelloWorld'
 */
export function pascalCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => {
      const lower = locale ? word.toLocaleLowerCase(locale) : word.toLowerCase();
      return capitalizeFirst(lower, locale);
    })
    .join('');
}

/**
 * Convert string to Title Case
 * @example titleCase('hello world') // 'Hello World'
 * @example titleCase('hello-world') // 'Hello World'
 */
export function titleCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => {
      const lower = locale ? word.toLocaleLowerCase(locale) : word.toLowerCase();
      return capitalizeFirst(lower, locale);
    })
    .join(' ');
}

/**
 * Convert string to Sentence case
 * @example sentenceCase('hello world') // 'Hello world'
 * @example sentenceCase('HELLO WORLD') // 'Hello world'
 */
export function sentenceCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const locale = options?.locale;
  const lower = locale ? input.toLocaleLowerCase(locale) : input.toLowerCase();

  return capitalizeFirst(lower, locale);
}

/**
 * Convert string to CONSTANT_CASE
 * @example constantCase('hello world') // 'HELLO_WORLD'
 * @example constantCase('helloWorld') // 'HELLO_WORLD'
 */
export function constantCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => (locale ? word.toLocaleUpperCase(locale) : word.toUpperCase()))
    .join('_');
}

/**
 * Convert string to dot.case
 * @example dotCase('hello world') // 'hello.world'
 * @example dotCase('helloWorld') // 'hello.world'
 */
export function dotCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => (locale ? word.toLocaleLowerCase(locale) : word.toLowerCase()))
    .join('.');
}

/**
 * Convert string to path/case
 * @example pathCase('hello world') // 'hello/world'
 * @example pathCase('helloWorld') // 'hello/world'
 */
export function pathCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => (locale ? word.toLocaleLowerCase(locale) : word.toLowerCase()))
    .join('/');
}

/**
 * Convert string to Header-Case
 * @example headerCase('hello world') // 'Hello-World'
 * @example headerCase('helloWorld') // 'Hello-World'
 */
export function headerCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  const locale = options?.locale;

  return words
    .map((word) => {
      const lower = locale ? word.toLocaleLowerCase(locale) : word.toLowerCase();
      return capitalizeFirst(lower, locale);
    })
    .join('-');
}

/**
 * Swap case of each character
 * @example swapCase('Hello World') // 'hELLO wORLD'
 */
export function swapCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const locale = options?.locale;
  const chars = [...input];

  return chars
    .map((char) => {
      if (locale) {
        const upper = char.toLocaleUpperCase(locale);
        const lower = char.toLocaleLowerCase(locale);
        return char === upper ? lower : upper;
      }
      const upper = char.toUpperCase();
      const lower = char.toLowerCase();
      return char === upper ? lower : upper;
    })
    .join('');
}

/**
 * Convert string to UPPERCASE
 * @example toUpper('hello') // 'HELLO'
 */
export function toUpper(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const locale = options?.locale;
  return locale ? input.toLocaleUpperCase(locale) : input.toUpperCase();
}

/**
 * Convert string to lowercase
 * @example toLower('HELLO') // 'hello'
 */
export function toLower(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const locale = options?.locale;
  return locale ? input.toLocaleLowerCase(locale) : input.toLowerCase();
}

/**
 * Capitalize first letter
 * @example capitalize('hello') // 'Hello'
 */
export function capitalize(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  return capitalizeFirst(input, options?.locale);
}

/**
 * Lowercase first letter
 * @example decapitalize('Hello') // 'hello'
 */
export function decapitalize(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  return lowercaseFirst(input, options?.locale);
}

// Export all functions as a plugin
export const casePlugin = {
  name: 'case',
  version: '1.0.0',
  methods: {
    camel: camelCase,
    kebab: kebabCase,
    snake: snakeCase,
    pascal: pascalCase,
    title: titleCase,
    sentence: sentenceCase,
    constant: constantCase,
    dot: dotCase,
    path: pathCase,
    header: headerCase,
    swap: swapCase,
    upper: toUpper,
    lower: toLower,
    capitalize,
    decapitalize,
  },
};
