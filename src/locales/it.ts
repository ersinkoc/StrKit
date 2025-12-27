/**
 * Italian Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const it: StrKitLocale = {
  code: 'it',
  name: 'Italian',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/a$/i, 'e'],
      [/o$/i, 'i'],
      [/e$/i, 'i'],
      [/$/, 'i'],
    ],
    irregulars: {
      'uomo': 'uomini',
    },
    uncountables: [],
  },

  transliterate: {
    'à': 'a', 'À': 'A',
    'è': 'e', 'È': 'E',
    'é': 'e', 'É': 'E',
    'ì': 'i', 'Ì': 'I',
    'ò': 'o', 'Ò': 'O',
    'ù': 'u', 'Ù': 'U',
  },

  numbers: {
    decimal: ',',
    thousands: '.',
  },

  ordinals: {
    default: 'o',
    rules: [],
  },
};
