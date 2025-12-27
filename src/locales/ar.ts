/**
 * Arabic Locale
 * RTL language with special character handling
 */

import type { StrKitLocale } from '../core/types.js';

export const ar: StrKitLocale = {
  code: 'ar',
  name: 'Arabic',

  case: {
    // Arabic doesn't have case distinction
    upper: {},
    lower: {},
  },

  plural: {
    // Arabic has complex plural rules
    rules: [],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'aa',
    'ب': 'b',
    'ت': 't',
    'ث': 'th',
    'ج': 'j',
    'ح': 'h',
    'خ': 'kh',
    'د': 'd',
    'ذ': 'dh',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ش': 'sh',
    'ص': 's',
    'ض': 'd',
    'ط': 't',
    'ظ': 'z',
    'ع': 'a',
    'غ': 'gh',
    'ف': 'f',
    'ق': 'q',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'w',
    'ي': 'y',
    'ة': 'h',
    'ى': 'a',
    'ء': '',
    'ئ': 'y',
    'ؤ': 'w',
  },

  numbers: {
    decimal: '.',
    thousands: ',',
  },

  ordinals: {
    default: '',
    rules: [],
  },
};
