/**
 * Pluralization Plugin
 * Provides methods for pluralizing and singularizing words
 */

import type { StrKitOptions } from '../../core/types.js';

/**
 * English pluralization rules (most common to least common)
 */
const pluralRules: Array<[RegExp, string]> = [
  // Irregular words handled separately

  // Words ending in -is -> -es
  [/(ax|test)is$/i, '$1es'],
  [/(octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)us$/i, '$1i'],
  [/(alias|status)$/i, '$1es'],

  // Words ending in -us -> -i (Latin)
  [/^(alumn|bacill|cact|foc|fung|nucle|radi|stimul|syllab|termin|vir)us$/i, '$1i'],

  // Words ending in -um -> -a (Latin)
  [/(addend|bacteri|curricul|dat|medi|memorand|millenni|ov|spectr|strat)um$/i, '$1a'],

  // Words ending in -on -> -a (Greek)
  [/(criteri|phenomen)on$/i, '$1a'],

  // Sibilants: -s, -ss, -sh, -ch, -x, -z -> -es
  [/(s|ss|sh|ch|x|z)$/i, '$1es'],

  // Words ending in consonant + y -> -ies
  [/([^aeiou])y$/i, '$1ies'],

  // Words ending in -f or -fe -> -ves
  [/(?:([^f])fe|([lrf])f)$/i, '$1$2ves'],

  // Words ending in -o (preceded by consonant) -> -oes
  [/(hero|potato|tomato|echo|embargo|torpedo|veto|volcano|mosquito)$/i, '$1es'],

  // Default: add -s
  [/$/, 's'],
];

/**
 * English singularization rules
 */
const singularRules: Array<[RegExp, string]> = [
  // Plural -> singular
  [/ies$/i, 'y'],
  [/(ss|sh|ch|x|z)es$/i, '$1'],
  [/ves$/i, 'f'],
  [/([^aeiou])oes$/i, '$1o'],
  [/([ti])a$/i, '$1um'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis'],
  [/(^analy)ses$/i, '$1sis'],
  [/([^f])ves$/i, '$1fe'],
  [/(hive|tive|move)s$/i, '$1'],
  [/(alias|status)es$/i, '$1'],
  [/(ax|test)es$/i, '$1is'],
  [/(us)$/i, '$1'],
  [/(octop|vir)i$/i, '$1us'],
  [/(cris|ax|test)es$/i, '$1is'],
  [/s$/i, ''],
];

/**
 * Irregular plurals
 */
const irregulars: Record<string, string> = {
  child: 'children',
  man: 'men',
  woman: 'women',
  person: 'people',
  tooth: 'teeth',
  foot: 'feet',
  goose: 'geese',
  mouse: 'mice',
  ox: 'oxen',
  die: 'dice',
  criterion: 'criteria',
  phenomenon: 'phenomena',
  analysis: 'analyses',
  basis: 'bases',
  crisis: 'crises',
  diagnosis: 'diagnoses',
  hypothesis: 'hypotheses',
  thesis: 'theses',
  appendix: 'appendices',
  index: 'indices',
  matrix: 'matrices',
  vertex: 'vertices',
};

/**
 * Reversed irregulars for singularization
 */
const reversedIrregulars: Record<string, string> = Object.fromEntries(
  Object.entries(irregulars).map(([k, v]) => [v, k])
);

/**
 * Words that don't change in plural form
 */
const uncountables: Set<string> = new Set([
  'sheep',
  'fish',
  'deer',
  'series',
  'species',
  'money',
  'rice',
  'information',
  'equipment',
  'news',
  'aircraft',
  'bison',
  'buffalo',
  'moose',
  'salmon',
  'trout',
  'swine',
  'chassis',
  'headquarters',
  'pants',
  'scissors',
  'shorts',
  'thanks',
  'furniture',
  'luggage',
  'traffic',
  'knowledge',
  'offspring',
]);

/**
 * Custom rules added at runtime
 */
const customPluralRules: Array<[RegExp, string]> = [];
const customIrregulars: Record<string, string> = {};
const customReversedIrregulars: Record<string, string> = {};
const customUncountables: Set<string> = new Set();

/**
 * Pluralize a word
 * @example pluralize('apple') // 'apples'
 * @example pluralize('child') // 'children'
 * @example pluralize('apple', 1) // 'apple'
 * @example pluralize('apple', 5, true) // '5 apples'
 */
export function pluralize(
  word: string,
  count?: number,
  showCount?: boolean,
  _options?: StrKitOptions
): string {
  if (!word) return '';

  const lowerWord = word.toLowerCase();

  // Check count
  if (count === 1) {
    return showCount ? `1 ${word}` : word;
  }

  // Check uncountables
  if (uncountables.has(lowerWord) || customUncountables.has(lowerWord)) {
    return showCount ? `${count ?? ''} ${word}`.trim() : word;
  }

  // Check custom irregulars first
  if (customIrregulars[lowerWord]) {
    const plural = preserveCase(word, customIrregulars[lowerWord]);
    return showCount ? `${count ?? ''} ${plural}`.trim() : plural;
  }

  // Check built-in irregulars
  if (irregulars[lowerWord]) {
    const plural = preserveCase(word, irregulars[lowerWord]);
    return showCount ? `${count ?? ''} ${plural}`.trim() : plural;
  }

  // Apply custom rules first
  for (const [rule, replacement] of customPluralRules) {
    if (rule.test(word)) {
      const plural = word.replace(rule, replacement);
      return showCount ? `${count ?? ''} ${plural}`.trim() : plural;
    }
  }

  // Apply built-in rules
  for (const [rule, replacement] of pluralRules) {
    if (rule.test(word)) {
      const plural = word.replace(rule, replacement);
      return showCount ? `${count ?? ''} ${plural}`.trim() : plural;
    }
  }

  return showCount ? `${count ?? ''} ${word}`.trim() : word;
}

/**
 * Singularize a word
 * @example singularize('apples') // 'apple'
 * @example singularize('children') // 'child'
 */
export function singularize(word: string, _options?: StrKitOptions): string {
  if (!word) return '';

  const lowerWord = word.toLowerCase();

  // Check uncountables
  if (uncountables.has(lowerWord) || customUncountables.has(lowerWord)) {
    return word;
  }

  // Check custom reversed irregulars first
  if (customReversedIrregulars[lowerWord]) {
    return preserveCase(word, customReversedIrregulars[lowerWord]);
  }

  // Check built-in reversed irregulars
  if (reversedIrregulars[lowerWord]) {
    return preserveCase(word, reversedIrregulars[lowerWord]);
  }

  // Apply singularization rules
  for (const [rule, replacement] of singularRules) {
    if (rule.test(word)) {
      return word.replace(rule, replacement);
    }
  }

  return word;
}

/**
 * Check if a word is plural
 * @example isPlural('apples') // true
 * @example isPlural('apple') // false
 */
export function isPlural(word: string, _options?: StrKitOptions): boolean {
  if (!word) return false;

  const lowerWord = word.toLowerCase();

  // Uncountables can be either
  if (uncountables.has(lowerWord) || customUncountables.has(lowerWord)) {
    return true;
  }

  // Check if it's an irregular plural
  if (reversedIrregulars[lowerWord] || customReversedIrregulars[lowerWord]) {
    return true;
  }

  // Check if singularizing changes it
  const singular = singularize(word);
  return singular !== word;
}

/**
 * Check if a word is singular
 * @example isSingular('apple') // true
 * @example isSingular('apples') // false
 */
export function isSingular(word: string, _options?: StrKitOptions): boolean {
  if (!word) return false;

  const lowerWord = word.toLowerCase();

  // Uncountables can be either
  if (uncountables.has(lowerWord) || customUncountables.has(lowerWord)) {
    return true;
  }

  // Check if it's an irregular singular
  if (irregulars[lowerWord] || customIrregulars[lowerWord]) {
    return true;
  }

  // Check if pluralizing changes it
  const plural = pluralize(word);
  return plural !== word;
}

/**
 * Add a custom pluralization rule
 * @example addPluralRule(/gex$/i, 'gexii')
 */
export function addPluralRule(rule: RegExp, replacement: string): void {
  customPluralRules.unshift([rule, replacement]);
}

/**
 * Add an irregular word
 * @example addIrregular('opus', 'opera')
 */
export function addIrregular(singular: string, plural: string): void {
  customIrregulars[singular.toLowerCase()] = plural;
  customReversedIrregulars[plural.toLowerCase()] = singular;
}

/**
 * Add an uncountable word
 * @example addUncountable('sheep')
 */
export function addUncountable(word: string): void {
  customUncountables.add(word.toLowerCase());
}

/**
 * Preserve the case pattern of the original word
 */
function preserveCase(original: string, replacement: string): string {
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  }

  if (original[0] === original[0]?.toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }

  return replacement;
}

// Export plugin
export const pluralizationPlugin = {
  name: 'pluralization',
  version: '1.0.0',
  methods: {
    plural: pluralize,
    singular: singularize,
    isPlural,
    isSingular,
    addRule: addPluralRule,
    addIrregular,
    addUncountable,
  },
};
