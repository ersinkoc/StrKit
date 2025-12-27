/**
 * @oxog/strkit - Zero-Dependency String Toolkit
 *
 * The ultimate string manipulation toolkit for JavaScript/TypeScript.
 * 115+ methods across 10 categories with 4 flexible API styles.
 *
 * @author ersinkoc
 * @license MIT
 * @see https://strkit.oxog.dev
 * @see https://github.com/ersinkoc/strkit
 */

// Initialize locales
import './locales/index.js';

// Export chain API
export { S } from './core/chain.js';
export type { StrKitChain } from './core/chain.js';

// Export namespace API
export { str } from './namespace.js';

// Export locale utilities
export {
  setLocale,
  getLocale,
  registerLocale,
  getAvailableLocales,
} from './core/locale.js';

// Export plugin utilities
export { registerPlugin, getPlugins, hasPlugin } from './core/kernel.js';

// Export types
export type {
  StrKitOptions,
  TruncateOptions,
  SlugifyOptions,
  TemplateOptions,
  SimilarityOptions,
  DiffOptions,
  DiffResult,
  MatchResult,
  FrequencyResult,
  CurrencyOptions,
  MaskOptions,
  AnalysisOptions,
  SearchOptions,
  PatchHunk,
  PatchResult,
  StrKitLocale,
  StrKitPlugin,
  StrKitKernel,
  StrKitConfig,
} from './core/types.js';

// Export case functions (direct import)
export {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
  sentenceCase,
  constantCase,
  dotCase,
  pathCase,
  headerCase,
  swapCase,
  toUpper,
  toLower,
  capitalize,
  decapitalize,
} from './plugins/case/index.js';

// Export manipulation functions
export {
  trim,
  trimStart,
  trimEnd,
  pad,
  padStart,
  padEnd,
  repeat,
  reverse,
  truncate,
  wrap,
  unwrap,
  splice,
  insert,
  remove,
  replace,
  replaceAll,
  between,
  before,
  after,
  beforeLast,
  afterLast,
  append,
  prepend,
  surround,
  collapseWhitespace,
  lines,
  words,
  chars,
} from './plugins/manipulation/index.js';

// Export validation functions
export {
  isEmail,
  isUrl,
  isUuid,
  isIp,
  isIpv4,
  isIpv6,
  isPhone,
  isCreditCard,
  isEmpty,
  isBlank,
  isAlpha,
  isNumeric,
  isAlphanumeric,
  isHex,
  isBase64,
  isJson,
  isUpperCase,
  isLowerCase,
  contains,
  startsWith,
  endsWith,
  equals,
  matches,
} from './plugins/validation/index.js';

// Export sanitization functions
export {
  escape,
  unescape,
  escapeHtml,
  unescapeHtml,
  escapeRegex,
  slugify,
  sanitizeFilename,
  stripHtml,
  stripTags,
  clean,
  normalize,
  latinise,
  transliterate,
} from './plugins/sanitization/index.js';

// Export formatting functions
export {
  template,
  sprintf,
  mask,
  unmask,
  ordinalize,
  formatCurrency,
  formatNumber,
} from './plugins/formatting/index.js';

// Export similarity functions
export {
  levenshtein,
  levenshteinRatio,
  dice,
  jaroWinkler,
  hamming,
  cosine,
  lcs,
  lcsLength,
  similarity,
  bestMatch,
  findSimilar,
} from './plugins/similarity/index.js';

// Export analysis functions
export {
  wordCount,
  charCount,
  lineCount,
  sentenceCount,
  paragraphCount,
  byteSize,
  entropy,
  frequency,
  readingTime,
  speakingTime,
} from './plugins/analysis/index.js';

// Export pluralization functions
export {
  pluralize,
  singularize,
  isPlural,
  isSingular,
  addPluralRule,
  addIrregular,
  addUncountable,
} from './plugins/pluralization/index.js';

// Export diff functions
export {
  diff,
  diffChars,
  diffWords,
  diffLines,
  createPatch,
  applyPatch,
  reversePatch,
} from './plugins/diff/index.js';

// Export search functions
export {
  indexOf,
  lastIndexOf,
  countOccurrences,
  positions,
  match,
  matchAll,
  extract,
  extractAll,
} from './plugins/search/index.js';
