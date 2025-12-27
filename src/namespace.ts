/**
 * Namespace API
 * Provides the str.* namespace for organized access to all methods
 */

import * as casePlugin from './plugins/case/index.js';
import * as manipulationPlugin from './plugins/manipulation/index.js';
import * as validationPlugin from './plugins/validation/index.js';
import * as sanitizationPlugin from './plugins/sanitization/index.js';
import * as formattingPlugin from './plugins/formatting/index.js';
import * as similarityPlugin from './plugins/similarity/index.js';
import * as analysisPlugin from './plugins/analysis/index.js';
import * as pluralizationPlugin from './plugins/pluralization/index.js';
import * as diffPlugin from './plugins/diff/index.js';
import * as searchPlugin from './plugins/search/index.js';

/**
 * The str namespace object
 * Provides organized access to all StrKit methods
 *
 * @example
 * import { str } from '@oxog/strkit';
 *
 * str.case.camel('hello world');  // 'helloWorld'
 * str.validate.email('test@test.com');  // true
 * str.similarity.levenshtein('cat', 'bat');  // 1
 */
export const str = {
  /**
   * Case conversion methods
   */
  case: {
    camel: casePlugin.camelCase,
    kebab: casePlugin.kebabCase,
    snake: casePlugin.snakeCase,
    pascal: casePlugin.pascalCase,
    title: casePlugin.titleCase,
    sentence: casePlugin.sentenceCase,
    constant: casePlugin.constantCase,
    dot: casePlugin.dotCase,
    path: casePlugin.pathCase,
    header: casePlugin.headerCase,
    swap: casePlugin.swapCase,
    upper: casePlugin.toUpper,
    lower: casePlugin.toLower,
    capitalize: casePlugin.capitalize,
    decapitalize: casePlugin.decapitalize,
  },

  /**
   * String manipulation methods
   */
  manipulation: {
    trim: manipulationPlugin.trim,
    trimStart: manipulationPlugin.trimStart,
    trimEnd: manipulationPlugin.trimEnd,
    pad: manipulationPlugin.pad,
    padStart: manipulationPlugin.padStart,
    padEnd: manipulationPlugin.padEnd,
    repeat: manipulationPlugin.repeat,
    reverse: manipulationPlugin.reverse,
    truncate: manipulationPlugin.truncate,
    wrap: manipulationPlugin.wrap,
    unwrap: manipulationPlugin.unwrap,
    splice: manipulationPlugin.splice,
    insert: manipulationPlugin.insert,
    remove: manipulationPlugin.remove,
    replace: manipulationPlugin.replace,
    replaceAll: manipulationPlugin.replaceAll,
    between: manipulationPlugin.between,
    before: manipulationPlugin.before,
    after: manipulationPlugin.after,
    beforeLast: manipulationPlugin.beforeLast,
    afterLast: manipulationPlugin.afterLast,
    append: manipulationPlugin.append,
    prepend: manipulationPlugin.prepend,
    surround: manipulationPlugin.surround,
    collapseWhitespace: manipulationPlugin.collapseWhitespace,
    lines: manipulationPlugin.lines,
    words: manipulationPlugin.words,
    chars: manipulationPlugin.chars,
  },

  /**
   * Validation methods
   */
  validate: {
    email: validationPlugin.isEmail,
    url: validationPlugin.isUrl,
    uuid: validationPlugin.isUuid,
    ip: validationPlugin.isIp,
    ipv4: validationPlugin.isIpv4,
    ipv6: validationPlugin.isIpv6,
    phone: validationPlugin.isPhone,
    creditCard: validationPlugin.isCreditCard,
    empty: validationPlugin.isEmpty,
    blank: validationPlugin.isBlank,
    alpha: validationPlugin.isAlpha,
    numeric: validationPlugin.isNumeric,
    alphanumeric: validationPlugin.isAlphanumeric,
    hex: validationPlugin.isHex,
    base64: validationPlugin.isBase64,
    json: validationPlugin.isJson,
    upperCase: validationPlugin.isUpperCase,
    lowerCase: validationPlugin.isLowerCase,
    contains: validationPlugin.contains,
    startsWith: validationPlugin.startsWith,
    endsWith: validationPlugin.endsWith,
    equals: validationPlugin.equals,
    matches: validationPlugin.matches,
  },

  /**
   * Sanitization methods
   */
  sanitize: {
    escape: sanitizationPlugin.escape,
    unescape: sanitizationPlugin.unescape,
    escapeHtml: sanitizationPlugin.escapeHtml,
    unescapeHtml: sanitizationPlugin.unescapeHtml,
    escapeRegex: sanitizationPlugin.escapeRegex,
    slugify: sanitizationPlugin.slugify,
    filename: sanitizationPlugin.sanitizeFilename,
    stripHtml: sanitizationPlugin.stripHtml,
    stripTags: sanitizationPlugin.stripTags,
    clean: sanitizationPlugin.clean,
    normalize: sanitizationPlugin.normalize,
    latinise: sanitizationPlugin.latinise,
    transliterate: sanitizationPlugin.transliterate,
  },

  /**
   * Formatting methods
   */
  format: {
    template: formattingPlugin.template,
    sprintf: formattingPlugin.sprintf,
    mask: formattingPlugin.mask,
    unmask: formattingPlugin.unmask,
    ordinalize: formattingPlugin.ordinalize,
    currency: formattingPlugin.formatCurrency,
    number: formattingPlugin.formatNumber,
  },

  /**
   * Similarity methods
   */
  similarity: {
    levenshtein: similarityPlugin.levenshtein,
    levenshteinRatio: similarityPlugin.levenshteinRatio,
    dice: similarityPlugin.dice,
    jaroWinkler: similarityPlugin.jaroWinkler,
    hamming: similarityPlugin.hamming,
    cosine: similarityPlugin.cosine,
    lcs: similarityPlugin.lcs,
    lcsLength: similarityPlugin.lcsLength,
    similarity: similarityPlugin.similarity,
    bestMatch: similarityPlugin.bestMatch,
    findSimilar: similarityPlugin.findSimilar,
  },

  /**
   * Analysis methods
   */
  analysis: {
    wordCount: analysisPlugin.wordCount,
    charCount: analysisPlugin.charCount,
    lineCount: analysisPlugin.lineCount,
    sentenceCount: analysisPlugin.sentenceCount,
    paragraphCount: analysisPlugin.paragraphCount,
    byteSize: analysisPlugin.byteSize,
    entropy: analysisPlugin.entropy,
    frequency: analysisPlugin.frequency,
    readingTime: analysisPlugin.readingTime,
    speakingTime: analysisPlugin.speakingTime,
  },

  /**
   * Pluralization methods
   */
  plural: {
    plural: pluralizationPlugin.pluralize,
    singular: pluralizationPlugin.singularize,
    isPlural: pluralizationPlugin.isPlural,
    isSingular: pluralizationPlugin.isSingular,
    addRule: pluralizationPlugin.addPluralRule,
    addIrregular: pluralizationPlugin.addIrregular,
    addUncountable: pluralizationPlugin.addUncountable,
  },

  /**
   * Diff methods
   */
  diff: {
    diff: diffPlugin.diff,
    diffChars: diffPlugin.diffChars,
    diffWords: diffPlugin.diffWords,
    diffLines: diffPlugin.diffLines,
    createPatch: diffPlugin.createPatch,
    applyPatch: diffPlugin.applyPatch,
    reversePatch: diffPlugin.reversePatch,
  },

  /**
   * Search methods
   */
  search: {
    contains: searchPlugin.contains,
    startsWith: searchPlugin.startsWith,
    endsWith: searchPlugin.endsWith,
    indexOf: searchPlugin.indexOf,
    lastIndexOf: searchPlugin.lastIndexOf,
    countOccurrences: searchPlugin.countOccurrences,
    positions: searchPlugin.positions,
    match: searchPlugin.match,
    matchAll: searchPlugin.matchAll,
    extract: searchPlugin.extract,
    extractAll: searchPlugin.extractAll,
  },
};
