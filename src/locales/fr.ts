/**
 * French Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const fr: StrKitLocale = {
  code: 'fr',
  name: 'French',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/(s|x|z)$/i, '$1'],
      [/(au|eu)$/i, '$1x'],
      [/al$/i, 'aux'],
      [/$/, 's'],
    ],
    irregulars: {
      'oeil': 'yeux',
      'ciel': 'cieux',
    },
    uncountables: [],
  },

  transliterate: {
    'à': 'a', 'â': 'a', 'ä': 'a',
    'À': 'A', 'Â': 'A', 'Ä': 'A',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
    'î': 'i', 'ï': 'i',
    'Î': 'I', 'Ï': 'I',
    'ô': 'o', 'ö': 'o',
    'Ô': 'O', 'Ö': 'O',
    'ù': 'u', 'û': 'u', 'ü': 'u',
    'Ù': 'U', 'Û': 'U', 'Ü': 'U',
    'ÿ': 'y',
    'Ÿ': 'Y',
    'ç': 'c',
    'Ç': 'C',
    'œ': 'oe',
    'Œ': 'OE',
    'æ': 'ae',
    'Æ': 'AE',
  },

  numbers: {
    decimal: ',',
    thousands: ' ',
  },

  ordinals: {
    default: 'e',
    rules: [
      [1, 'er'],
    ],
  },
};
