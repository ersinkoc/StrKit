/**
 * Polish Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const pl: StrKitLocale = {
  code: 'pl',
  name: 'Polish',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/a$/i, 'y'],
      [/$/, 'y'],
    ],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'ą': 'a', 'Ą': 'A',
    'ć': 'c', 'Ć': 'C',
    'ę': 'e', 'Ę': 'E',
    'ł': 'l', 'Ł': 'L',
    'ń': 'n', 'Ń': 'N',
    'ó': 'o', 'Ó': 'O',
    'ś': 's', 'Ś': 'S',
    'ź': 'z', 'Ź': 'Z',
    'ż': 'z', 'Ż': 'Z',
  },

  numbers: {
    decimal: ',',
    thousands: ' ',
  },

  ordinals: {
    default: '.',
    rules: [],
  },
};
