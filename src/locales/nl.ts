/**
 * Dutch Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const nl: StrKitLocale = {
  code: 'nl',
  name: 'Dutch',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/([aeiou])$/i, '$1s'],
      [/$/, 'en'],
    ],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'ë': 'e', 'Ë': 'E',
    'ï': 'i', 'Ï': 'I',
    'ö': 'o', 'Ö': 'O',
    'ü': 'u', 'Ü': 'U',
  },

  numbers: {
    decimal: ',',
    thousands: '.',
  },

  ordinals: {
    default: 'e',
    rules: [],
  },
};
