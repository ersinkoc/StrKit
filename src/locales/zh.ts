/**
 * Chinese Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const zh: StrKitLocale = {
  code: 'zh',
  name: 'Chinese',

  case: {
    // Chinese doesn't have case distinction
    upper: {},
    lower: {},
  },

  plural: {
    // Chinese doesn't change word forms for plural
    rules: [],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    // Basic pinyin mappings for common characters
    // Full transliteration would require a comprehensive dictionary
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
