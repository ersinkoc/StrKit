/**
 * Turkish Locale
 * Special handling for i/I characters
 */

import type { StrKitLocale } from '../core/types.js';

export const tr: StrKitLocale = {
  code: 'tr',
  name: 'Turkish',

  case: {
    // Turkish special uppercase mappings
    upper: {
      'i': 'İ', // Dotted I
      'ı': 'I', // Dotless I
    },
    // Turkish special lowercase mappings
    lower: {
      'İ': 'i', // Dotted i
      'I': 'ı', // Dotless i
    },
  },

  plural: {
    // Turkish doesn't change word form for plurals in most cases
    rules: [],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'ç': 'c',
    'Ç': 'C',
    'ğ': 'g',
    'Ğ': 'G',
    'ı': 'i',
    'İ': 'I',
    'ö': 'o',
    'Ö': 'O',
    'ş': 's',
    'Ş': 'S',
    'ü': 'u',
    'Ü': 'U',
  },

  numbers: {
    decimal: ',',
    thousands: '.',
  },

  ordinals: {
    default: '.',
    rules: [
      // Turkish uses just a period for ordinals: 1., 2., 3.
    ],
  },
};
