/**
 * English Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const en: StrKitLocale = {
  code: 'en',
  name: 'English',

  case: {
    upper: {},
    lower: {},
  },

  plural: {
    rules: [
      [/(s|ss|sh|ch|x|z)$/i, '$1es'],
      [/([^aeiou])y$/i, '$1ies'],
      [/(?:([^f])fe|([lrf])f)$/i, '$1$2ves'],
      [/(hero|potato|tomato|echo|embargo|torpedo|veto)$/i, '$1es'],
      [/$/, 's'],
    ],
    irregulars: {
      child: 'children',
      man: 'men',
      woman: 'women',
      person: 'people',
      tooth: 'teeth',
      foot: 'feet',
      goose: 'geese',
      mouse: 'mice',
      ox: 'oxen',
    },
    uncountables: [
      'sheep', 'fish', 'deer', 'series', 'species', 'money', 'rice',
      'information', 'equipment', 'news', 'aircraft',
    ],
  },

  transliterate: {},

  numbers: {
    decimal: '.',
    thousands: ',',
  },

  ordinals: {
    default: 'th',
    rules: [
      [(n: number): boolean => n % 10 === 1 && n % 100 !== 11, 'st'],
      [(n: number): boolean => n % 10 === 2 && n % 100 !== 12, 'nd'],
      [(n: number): boolean => n % 10 === 3 && n % 100 !== 13, 'rd'],
    ],
  },
};
