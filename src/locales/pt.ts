/**
 * Portuguese Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const pt: StrKitLocale = {
  code: 'pt',
  name: 'Portuguese',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/ão$/i, 'ões'],
      [/al$/i, 'ais'],
      [/el$/i, 'éis'],
      [/ol$/i, 'óis'],
      [/ul$/i, 'uis'],
      [/m$/i, 'ns'],
      [/r$/i, 'res'],
      [/z$/i, 'zes'],
      [/s$/i, 'ses'],
      [/$/, 's'],
    ],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    'á': 'a', 'Á': 'A',
    'à': 'a', 'À': 'A',
    'â': 'a', 'Â': 'A',
    'ã': 'a', 'Ã': 'A',
    'é': 'e', 'É': 'E',
    'ê': 'e', 'Ê': 'E',
    'í': 'i', 'Í': 'I',
    'ó': 'o', 'Ó': 'O',
    'ô': 'o', 'Ô': 'O',
    'õ': 'o', 'Õ': 'O',
    'ú': 'u', 'Ú': 'U',
    'ü': 'u', 'Ü': 'U',
    'ç': 'c', 'Ç': 'C',
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
