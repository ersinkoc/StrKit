/**
 * Korean Locale
 */

import type { StrKitLocale } from '../core/types.js';

export const ko: StrKitLocale = {
  code: 'ko',
  name: 'Korean',

  case: {
    // Korean doesn't have case distinction
    upper: {},
    lower: {},
  },

  plural: {
    // Korean doesn't change word forms for plural
    rules: [],
    irregulars: {},
    uncountables: [],
  },

  transliterate: {
    // Basic Korean to Romanization (Revised Romanization)
    // Consonants
    'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm',
    'ㅂ': 'b', 'ㅅ': 's', 'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch',
    'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
    'ㄲ': 'kk', 'ㄸ': 'tt', 'ㅃ': 'pp', 'ㅆ': 'ss', 'ㅉ': 'jj',
    // Vowels
    'ㅏ': 'a', 'ㅓ': 'eo', 'ㅗ': 'o', 'ㅜ': 'u', 'ㅡ': 'eu',
    'ㅣ': 'i', 'ㅐ': 'ae', 'ㅔ': 'e', 'ㅚ': 'oe', 'ㅟ': 'wi',
    'ㅑ': 'ya', 'ㅕ': 'yeo', 'ㅛ': 'yo', 'ㅠ': 'yu',
    'ㅒ': 'yae', 'ㅖ': 'ye', 'ㅘ': 'wa', 'ㅙ': 'wae',
    'ㅝ': 'wo', 'ㅞ': 'we', 'ㅢ': 'ui',
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
