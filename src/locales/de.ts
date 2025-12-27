/**
 * German Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const de: StrKitLocale = {
  code: 'de',
  name: 'German',

  case: {
    upper: {
      'ß': 'SS',
    },
    lower: {},
  },

  plural: {
    rules: [
      [/e$/i, 'en'],
      [/er$/i, 'er'],
      [/el$/i, 'el'],
      [/en$/i, 'en'],
      [/$/, 'e'],
    ],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'ä': 'ae',
    'Ä': 'Ae',
    'ö': 'oe',
    'Ö': 'Oe',
    'ü': 'ue',
    'Ü': 'Ue',
    'ß': 'ss',
  },

  numbers: {
    decimal: ',',
    thousands: '.',
  },

  ordinals: {
    default: '.',
    rules: [],
  },
};
