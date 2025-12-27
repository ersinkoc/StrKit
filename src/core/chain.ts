import type {
  TruncateOptions,
  SlugifyOptions,
  DiffOptions,
  DiffResult,
  SimilarityOptions,
  StrKitOptions,
  AnalysisOptions,
  FrequencyResult,
  SearchOptions,
  TemplateOptions,
} from './types.js';

// Import all plugin methods (will be created later)
// These imports will be added as plugins are implemented

/**
 * StrKit Chain Interface
 * Provides a fluent, immutable API for string manipulation
 */
export interface StrKitChain {
  // Properties
  readonly length: number;
  readonly s: string;

  // Core methods
  readonly value: string;
  getValue(): string;
  toString(): string;
  clone(): StrKitChain;

  // Case methods
  camelCase(): StrKitChain;
  kebabCase(): StrKitChain;
  snakeCase(): StrKitChain;
  pascalCase(): StrKitChain;
  titleCase(): StrKitChain;
  sentenceCase(): StrKitChain;
  constantCase(): StrKitChain;
  dotCase(): StrKitChain;
  pathCase(): StrKitChain;
  headerCase(): StrKitChain;
  swapCase(): StrKitChain;
  upper(): StrKitChain;
  lower(): StrKitChain;
  capitalize(): StrKitChain;
  decapitalize(): StrKitChain;

  // Manipulation methods
  trim(chars?: string): StrKitChain;
  trimStart(chars?: string): StrKitChain;
  trimEnd(chars?: string): StrKitChain;
  pad(length: number, char?: string): StrKitChain;
  padStart(length: number, char?: string): StrKitChain;
  padEnd(length: number, char?: string): StrKitChain;
  repeat(count: number): StrKitChain;
  reverse(): StrKitChain;
  truncate(length: number, options?: TruncateOptions): StrKitChain;
  wrap(wrapper: string, end?: string): StrKitChain;
  unwrap(wrapper: string, end?: string): StrKitChain;
  insert(index: number, str: string): StrKitChain;
  remove(start: number, count: number): StrKitChain;
  replace(search: string | RegExp, replacement: string): StrKitChain;
  replaceAll(search: string | RegExp, replacement: string): StrKitChain;
  between(start: string, end: string): StrKitChain;
  before(search: string): StrKitChain;
  after(search: string): StrKitChain;
  beforeLast(search: string): StrKitChain;
  afterLast(search: string): StrKitChain;
  append(...strings: string[]): StrKitChain;
  prepend(...strings: string[]): StrKitChain;
  surround(wrapper: string): StrKitChain;
  collapseWhitespace(): StrKitChain;

  // Sanitization methods
  escape(): StrKitChain;
  unescape(): StrKitChain;
  escapeHtml(): StrKitChain;
  unescapeHtml(): StrKitChain;
  escapeRegex(): StrKitChain;
  slugify(options?: SlugifyOptions): StrKitChain;
  filename(): StrKitChain;
  stripHtml(): StrKitChain;
  stripTags(allowed?: string[]): StrKitChain;
  clean(): StrKitChain;
  normalize(): StrKitChain;
  latinise(): StrKitChain;
  transliterate(locale?: string): StrKitChain;

  // Formatting methods
  template(data: Record<string, unknown>, options?: TemplateOptions): StrKitChain;
  sprintf(...args: unknown[]): StrKitChain;
  mask(pattern: string): StrKitChain;
  unmask(pattern: string): StrKitChain;

  // Validation methods (return boolean)
  isEmail(): boolean;
  isUrl(): boolean;
  isUuid(version?: 1 | 3 | 4 | 5): boolean;
  isIp(): boolean;
  isIpv4(): boolean;
  isIpv6(): boolean;
  isPhone(): boolean;
  isCreditCard(): boolean;
  isEmpty(): boolean;
  isBlank(): boolean;
  isAlpha(): boolean;
  isNumeric(): boolean;
  isAlphanumeric(): boolean;
  isHex(): boolean;
  isBase64(): boolean;
  isJson(): boolean;
  isUpperCase(): boolean;
  isLowerCase(): boolean;

  // Analysis methods (return primitives)
  wordCount(): number;
  charCount(options?: AnalysisOptions): number;
  lineCount(): number;
  sentenceCount(): number;
  paragraphCount(): number;
  byteSize(): number;
  entropy(): number;
  frequency(options?: { type?: 'char' | 'word' }): FrequencyResult;
  readingTime(options?: { wordsPerMinute?: number }): number;
  speakingTime(options?: { wordsPerMinute?: number }): number;

  // Search methods
  contains(search: string, options?: StrKitOptions): boolean;
  startsWith(search: string): boolean;
  endsWith(search: string): boolean;
  indexOf(search: string, options?: SearchOptions): number;
  lastIndexOf(search: string): number;
  countOccurrences(search: string): number;
  positions(search: string): number[];
  match(pattern: RegExp): string | null;
  matchAll(pattern: RegExp): string[];

  // Similarity methods (return number)
  levenshtein(other: string): number;
  levenshteinRatio(other: string): number;
  dice(other: string): number;
  jaroWinkler(other: string): number;
  hamming(other: string): number;
  cosine(other: string): number;
  similarity(other: string, options?: SimilarityOptions): number;

  // Diff methods
  diffChars(other: string): DiffResult[];
  diffWords(other: string): DiffResult[];
  diffLines(other: string): DiffResult[];
  diff(other: string, options?: DiffOptions): DiffResult[];

  // Pluralization
  plural(count?: number, showCount?: boolean): StrKitChain;
  singular(): StrKitChain;
  isPlural(): boolean;
  isSingular(): boolean;

  // Split methods
  lines(): string[];
  words(): string[];
  chars(): string[];
}

/**
 * StrKit Chain Implementation
 * Immutable wrapper for string operations
 */
class StrKitChainImpl implements StrKitChain {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  /**
   * Create a new chain instance (maintains immutability)
   */
  private _create(value: string): StrKitChain {
    return new StrKitChainImpl(value);
  }

  // Properties
  get length(): number {
    return this._value.length;
  }

  get s(): string {
    return this._value;
  }

  get value(): string {
    return this._value;
  }

  // Core methods - getValue kept for backwards compatibility
  getValue(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }

  clone(): StrKitChain {
    return this._create(this._value);
  }

  // Case methods - placeholders, will be implemented with plugins
  camelCase(): StrKitChain {
    return this._create(casePlugin.camelCase(this._value));
  }

  kebabCase(): StrKitChain {
    return this._create(casePlugin.kebabCase(this._value));
  }

  snakeCase(): StrKitChain {
    return this._create(casePlugin.snakeCase(this._value));
  }

  pascalCase(): StrKitChain {
    return this._create(casePlugin.pascalCase(this._value));
  }

  titleCase(): StrKitChain {
    return this._create(casePlugin.titleCase(this._value));
  }

  sentenceCase(): StrKitChain {
    return this._create(casePlugin.sentenceCase(this._value));
  }

  constantCase(): StrKitChain {
    return this._create(casePlugin.constantCase(this._value));
  }

  dotCase(): StrKitChain {
    return this._create(casePlugin.dotCase(this._value));
  }

  pathCase(): StrKitChain {
    return this._create(casePlugin.pathCase(this._value));
  }

  headerCase(): StrKitChain {
    return this._create(casePlugin.headerCase(this._value));
  }

  swapCase(): StrKitChain {
    return this._create(casePlugin.swapCase(this._value));
  }

  upper(): StrKitChain {
    return this._create(casePlugin.toUpper(this._value));
  }

  lower(): StrKitChain {
    return this._create(casePlugin.toLower(this._value));
  }

  capitalize(): StrKitChain {
    return this._create(casePlugin.capitalize(this._value));
  }

  decapitalize(): StrKitChain {
    return this._create(casePlugin.decapitalize(this._value));
  }

  // Manipulation methods
  trim(chars?: string): StrKitChain {
    return this._create(manipulationPlugin.trim(this._value, chars));
  }

  trimStart(chars?: string): StrKitChain {
    return this._create(manipulationPlugin.trimStart(this._value, chars));
  }

  trimEnd(chars?: string): StrKitChain {
    return this._create(manipulationPlugin.trimEnd(this._value, chars));
  }

  pad(length: number, char?: string): StrKitChain {
    return this._create(manipulationPlugin.pad(this._value, length, char));
  }

  padStart(length: number, char?: string): StrKitChain {
    return this._create(manipulationPlugin.padStart(this._value, length, char));
  }

  padEnd(length: number, char?: string): StrKitChain {
    return this._create(manipulationPlugin.padEnd(this._value, length, char));
  }

  repeat(count: number): StrKitChain {
    return this._create(manipulationPlugin.repeat(this._value, count));
  }

  reverse(): StrKitChain {
    return this._create(manipulationPlugin.reverse(this._value));
  }

  truncate(length: number, options?: TruncateOptions): StrKitChain {
    return this._create(manipulationPlugin.truncate(this._value, length, options));
  }

  wrap(wrapper: string, end?: string): StrKitChain {
    return this._create(manipulationPlugin.wrap(this._value, wrapper, end));
  }

  unwrap(wrapper: string, end?: string): StrKitChain {
    return this._create(manipulationPlugin.unwrap(this._value, wrapper, end));
  }

  insert(index: number, str: string): StrKitChain {
    return this._create(manipulationPlugin.insert(this._value, index, str));
  }

  remove(start: number, count: number): StrKitChain {
    return this._create(manipulationPlugin.remove(this._value, start, count));
  }

  replace(search: string | RegExp, replacement: string): StrKitChain {
    return this._create(manipulationPlugin.replace(this._value, search, replacement));
  }

  replaceAll(search: string | RegExp, replacement: string): StrKitChain {
    return this._create(manipulationPlugin.replaceAll(this._value, search, replacement));
  }

  between(start: string, end: string): StrKitChain {
    return this._create(manipulationPlugin.between(this._value, start, end));
  }

  before(search: string): StrKitChain {
    return this._create(manipulationPlugin.before(this._value, search));
  }

  after(search: string): StrKitChain {
    return this._create(manipulationPlugin.after(this._value, search));
  }

  beforeLast(search: string): StrKitChain {
    return this._create(manipulationPlugin.beforeLast(this._value, search));
  }

  afterLast(search: string): StrKitChain {
    return this._create(manipulationPlugin.afterLast(this._value, search));
  }

  append(...strings: string[]): StrKitChain {
    return this._create(manipulationPlugin.append(this._value, ...strings));
  }

  prepend(...strings: string[]): StrKitChain {
    return this._create(manipulationPlugin.prepend(this._value, ...strings));
  }

  surround(wrapper: string): StrKitChain {
    return this._create(manipulationPlugin.surround(this._value, wrapper));
  }

  collapseWhitespace(): StrKitChain {
    return this._create(manipulationPlugin.collapseWhitespace(this._value));
  }

  // Sanitization methods
  escape(): StrKitChain {
    return this._create(sanitizationPlugin.escape(this._value));
  }

  unescape(): StrKitChain {
    return this._create(sanitizationPlugin.unescape(this._value));
  }

  escapeHtml(): StrKitChain {
    return this._create(sanitizationPlugin.escapeHtml(this._value));
  }

  unescapeHtml(): StrKitChain {
    return this._create(sanitizationPlugin.unescapeHtml(this._value));
  }

  escapeRegex(): StrKitChain {
    return this._create(sanitizationPlugin.escapeRegex(this._value));
  }

  slugify(options?: SlugifyOptions): StrKitChain {
    return this._create(sanitizationPlugin.slugify(this._value, options));
  }

  filename(): StrKitChain {
    return this._create(sanitizationPlugin.sanitizeFilename(this._value));
  }

  stripHtml(): StrKitChain {
    return this._create(sanitizationPlugin.stripHtml(this._value));
  }

  stripTags(allowed?: string[]): StrKitChain {
    return this._create(sanitizationPlugin.stripTags(this._value, allowed));
  }

  clean(): StrKitChain {
    return this._create(sanitizationPlugin.clean(this._value));
  }

  normalize(): StrKitChain {
    return this._create(sanitizationPlugin.normalize(this._value));
  }

  latinise(): StrKitChain {
    return this._create(sanitizationPlugin.latinise(this._value));
  }

  transliterate(locale?: string): StrKitChain {
    return this._create(sanitizationPlugin.transliterate(this._value, locale));
  }

  // Formatting methods
  template(data: Record<string, unknown>, options?: TemplateOptions): StrKitChain {
    return this._create(formattingPlugin.template(this._value, data, options));
  }

  sprintf(...args: unknown[]): StrKitChain {
    return this._create(formattingPlugin.sprintf(this._value, ...args));
  }

  mask(pattern: string): StrKitChain {
    return this._create(formattingPlugin.mask(this._value, pattern));
  }

  unmask(pattern: string): StrKitChain {
    return this._create(formattingPlugin.unmask(this._value, pattern));
  }

  // Validation methods
  isEmail(): boolean {
    return validationPlugin.isEmail(this._value);
  }

  isUrl(): boolean {
    return validationPlugin.isUrl(this._value);
  }

  isUuid(version?: 1 | 3 | 4 | 5): boolean {
    return validationPlugin.isUuid(this._value, version);
  }

  isIp(): boolean {
    return validationPlugin.isIp(this._value);
  }

  isIpv4(): boolean {
    return validationPlugin.isIpv4(this._value);
  }

  isIpv6(): boolean {
    return validationPlugin.isIpv6(this._value);
  }

  isPhone(): boolean {
    return validationPlugin.isPhone(this._value);
  }

  isCreditCard(): boolean {
    return validationPlugin.isCreditCard(this._value);
  }

  isEmpty(): boolean {
    return validationPlugin.isEmpty(this._value);
  }

  isBlank(): boolean {
    return validationPlugin.isBlank(this._value);
  }

  isAlpha(): boolean {
    return validationPlugin.isAlpha(this._value);
  }

  isNumeric(): boolean {
    return validationPlugin.isNumeric(this._value);
  }

  isAlphanumeric(): boolean {
    return validationPlugin.isAlphanumeric(this._value);
  }

  isHex(): boolean {
    return validationPlugin.isHex(this._value);
  }

  isBase64(): boolean {
    return validationPlugin.isBase64(this._value);
  }

  isJson(): boolean {
    return validationPlugin.isJson(this._value);
  }

  isUpperCase(): boolean {
    return validationPlugin.isUpperCase(this._value);
  }

  isLowerCase(): boolean {
    return validationPlugin.isLowerCase(this._value);
  }

  // Analysis methods
  wordCount(): number {
    return analysisPlugin.wordCount(this._value);
  }

  charCount(options?: AnalysisOptions): number {
    return analysisPlugin.charCount(this._value, options);
  }

  lineCount(): number {
    return analysisPlugin.lineCount(this._value);
  }

  sentenceCount(): number {
    return analysisPlugin.sentenceCount(this._value);
  }

  paragraphCount(): number {
    return analysisPlugin.paragraphCount(this._value);
  }

  byteSize(): number {
    return analysisPlugin.byteSize(this._value);
  }

  entropy(): number {
    return analysisPlugin.entropy(this._value);
  }

  frequency(options?: { type?: 'char' | 'word' }): FrequencyResult {
    return analysisPlugin.frequency(this._value, options);
  }

  readingTime(options?: { wordsPerMinute?: number }): number {
    return analysisPlugin.readingTime(this._value, options);
  }

  speakingTime(options?: { wordsPerMinute?: number }): number {
    return analysisPlugin.speakingTime(this._value, options);
  }

  // Search methods
  contains(search: string, options?: StrKitOptions): boolean {
    return searchPlugin.contains(this._value, search, options);
  }

  startsWith(search: string): boolean {
    return searchPlugin.startsWith(this._value, search);
  }

  endsWith(search: string): boolean {
    return searchPlugin.endsWith(this._value, search);
  }

  indexOf(search: string, options?: SearchOptions): number {
    return searchPlugin.indexOf(this._value, search, options);
  }

  lastIndexOf(search: string): number {
    return searchPlugin.lastIndexOf(this._value, search);
  }

  countOccurrences(search: string): number {
    return searchPlugin.countOccurrences(this._value, search);
  }

  positions(search: string): number[] {
    return searchPlugin.positions(this._value, search);
  }

  match(pattern: RegExp): string | null {
    return searchPlugin.match(this._value, pattern);
  }

  matchAll(pattern: RegExp): string[] {
    return searchPlugin.matchAll(this._value, pattern);
  }

  // Similarity methods
  levenshtein(other: string): number {
    return similarityPlugin.levenshtein(this._value, other);
  }

  levenshteinRatio(other: string): number {
    return similarityPlugin.levenshteinRatio(this._value, other);
  }

  dice(other: string): number {
    return similarityPlugin.dice(this._value, other);
  }

  jaroWinkler(other: string): number {
    return similarityPlugin.jaroWinkler(this._value, other);
  }

  hamming(other: string): number {
    return similarityPlugin.hamming(this._value, other);
  }

  cosine(other: string): number {
    return similarityPlugin.cosine(this._value, other);
  }

  similarity(other: string, options?: SimilarityOptions): number {
    return similarityPlugin.similarity(this._value, other, options);
  }

  // Diff methods
  diffChars(other: string): DiffResult[] {
    return diffPlugin.diffChars(this._value, other);
  }

  diffWords(other: string): DiffResult[] {
    return diffPlugin.diffWords(this._value, other);
  }

  diffLines(other: string): DiffResult[] {
    return diffPlugin.diffLines(this._value, other);
  }

  diff(other: string, options?: DiffOptions): DiffResult[] {
    return diffPlugin.diff(this._value, other, options);
  }

  // Pluralization methods
  plural(count?: number, showCount?: boolean): StrKitChain {
    return this._create(pluralizationPlugin.pluralize(this._value, count, showCount));
  }

  singular(): StrKitChain {
    return this._create(pluralizationPlugin.singularize(this._value));
  }

  isPlural(): boolean {
    return pluralizationPlugin.isPlural(this._value);
  }

  isSingular(): boolean {
    return pluralizationPlugin.isSingular(this._value);
  }

  // Split methods
  lines(): string[] {
    return manipulationPlugin.lines(this._value);
  }

  words(): string[] {
    return manipulationPlugin.words(this._value);
  }

  chars(): string[] {
    return manipulationPlugin.chars(this._value);
  }
}

// Plugin references that will be populated when plugins are loaded
// These are defined in the respective plugin files and imported

import * as casePlugin from '../plugins/case/index.js';
import * as manipulationPlugin from '../plugins/manipulation/index.js';
import * as validationPlugin from '../plugins/validation/index.js';
import * as sanitizationPlugin from '../plugins/sanitization/index.js';
import * as formattingPlugin from '../plugins/formatting/index.js';
import * as similarityPlugin from '../plugins/similarity/index.js';
import * as analysisPlugin from '../plugins/analysis/index.js';
import * as pluralizationPlugin from '../plugins/pluralization/index.js';
import * as diffPlugin from '../plugins/diff/index.js';
import * as searchPlugin from '../plugins/search/index.js';

/**
 * Create a new StrKit chain
 * @param value - The string to wrap
 * @returns A chainable string wrapper
 */
export function S(value: string): StrKitChain {
  return new StrKitChainImpl(value);
}
