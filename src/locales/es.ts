/**
 * Spanish Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const es: StrKitLocale = {
  code: 'es',
  name: 'Spanish',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/(s|x|z)$/i, '$1es'],
      [/([aeiou])$/i, '$1s'],
      [/([^aeiou])$/i, '$1es'],
    ],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'á': 'a', 'Á': 'A',
    'é': 'e', 'É': 'E',
    'í': 'i', 'Í': 'I',
    'ó': 'o', 'Ó': 'O',
    'ú': 'u', 'Ú': 'U',
    'ü': 'u', 'Ü': 'U',
    'ñ': 'n', 'Ñ': 'N',
  },

  numbers: {
    decimal: ',',
    thousands: '.',
  },

  ordinals: {
    default: 'o',
    rules: [
      [1, 'o'],
    ],
  },
};
