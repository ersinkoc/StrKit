/**
 * String Prototype Extensions
 *
 * This file adds StrKit methods to the String prototype.
 * Import this file to enable chained string methods on native strings.
 *
 * @example
 * import '@oxog/strkit/extend';
 *
 * 'hello world'.camelCase();  // 'helloWorld'
 * 'test@test.com'.isEmail();  // true
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

import type {
  TruncateOptions,
  SlugifyOptions,
  TemplateOptions,
  SimilarityOptions,
  DiffOptions,
  DiffResult,
  StrKitOptions,
  AnalysisOptions,
  FrequencyResult,
  SearchOptions,
} from './core/types.js';

// Initialize locales
import './locales/index.js';

declare global {
  interface String {
    // Case methods
    camelCase(): string;
    kebabCase(): string;
    snakeCase(): string;
    pascalCase(): string;
    titleCase(): string;
    sentenceCase(): string;
    constantCase(): string;
    dotCase(): string;
    pathCase(): string;
    headerCase(): string;
    swapCase(): string;
    toUpperCase(): string;
    toLowerCase(): string;
    capitalize(): string;
    decapitalize(): string;

    // Manipulation methods
    trimChars(chars?: string): string;
    trimStartChars(chars?: string): string;
    trimEndChars(chars?: string): string;
    padBoth(length: number, char?: string): string;
    reverse(): string;
    truncate(length: number, options?: TruncateOptions): string;
    wrap(wrapper: string, end?: string): string;
    unwrap(wrapper: string, end?: string): string;
    insert(index: number, str: string): string;
    remove(start: number, count: number): string;
    replaceAllStr(search: string | RegExp, replacement: string): string;
    between(start: string, end: string): string;
    before(search: string): string;
    after(search: string): string;
    beforeLast(search: string): string;
    afterLast(search: string): string;
    append(...strings: string[]): string;
    prepend(...strings: string[]): string;
    surround(wrapper: string): string;
    collapseWhitespace(): string;
    lines(): string[];
    words(): string[];
    chars(): string[];

    // Sanitization methods
    escape(): string;
    unescape(): string;
    escapeHtml(): string;
    unescapeHtml(): string;
    escapeRegex(): string;
    slugify(options?: SlugifyOptions): string;
    sanitizeFilename(): string;
    stripHtml(): string;
    stripTags(allowed?: string[]): string;
    clean(): string;
    normalizeStr(): string;
    latinise(): string;
    transliterate(locale?: string): string;

    // Formatting methods
    template(data: Record<string, unknown>, options?: TemplateOptions): string;
    sprintf(...args: unknown[]): string;
    mask(pattern: string): string;
    unmask(pattern: string): string;

    // Validation methods
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

    // Analysis methods
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
    containsStr(search: string, options?: StrKitOptions): boolean;
    indexOf(search: string, options?: SearchOptions): number;
    lastIndexOf(search: string): number;
    countOccurrences(search: string): number;
    positions(search: string): number[];
    matchStr(pattern: RegExp): string | null;
    matchAllStr(pattern: RegExp): string[];

    // Similarity methods
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

    // Pluralization methods
    pluralize(count?: number, showCount?: boolean): string;
    singularize(): string;
    isPlural(): boolean;
    isSingular(): boolean;
  }
}

// Case methods
String.prototype.camelCase = function (): string {
  return casePlugin.camelCase(this.toString());
};

String.prototype.kebabCase = function (): string {
  return casePlugin.kebabCase(this.toString());
};

String.prototype.snakeCase = function (): string {
  return casePlugin.snakeCase(this.toString());
};

String.prototype.pascalCase = function (): string {
  return casePlugin.pascalCase(this.toString());
};

String.prototype.titleCase = function (): string {
  return casePlugin.titleCase(this.toString());
};

String.prototype.sentenceCase = function (): string {
  return casePlugin.sentenceCase(this.toString());
};

String.prototype.constantCase = function (): string {
  return casePlugin.constantCase(this.toString());
};

String.prototype.dotCase = function (): string {
  return casePlugin.dotCase(this.toString());
};

String.prototype.pathCase = function (): string {
  return casePlugin.pathCase(this.toString());
};

String.prototype.headerCase = function (): string {
  return casePlugin.headerCase(this.toString());
};

String.prototype.swapCase = function (): string {
  return casePlugin.swapCase(this.toString());
};

String.prototype.capitalize = function (): string {
  return casePlugin.capitalize(this.toString());
};

String.prototype.decapitalize = function (): string {
  return casePlugin.decapitalize(this.toString());
};

// Manipulation methods
String.prototype.trimChars = function (chars?: string): string {
  return manipulationPlugin.trim(this.toString(), chars);
};

String.prototype.trimStartChars = function (chars?: string): string {
  return manipulationPlugin.trimStart(this.toString(), chars);
};

String.prototype.trimEndChars = function (chars?: string): string {
  return manipulationPlugin.trimEnd(this.toString(), chars);
};

String.prototype.padBoth = function (length: number, char?: string): string {
  return manipulationPlugin.pad(this.toString(), length, char);
};

String.prototype.reverse = function (): string {
  return manipulationPlugin.reverse(this.toString());
};

String.prototype.truncate = function (length: number, options?: TruncateOptions): string {
  return manipulationPlugin.truncate(this.toString(), length, options);
};

String.prototype.wrap = function (wrapper: string, end?: string): string {
  return manipulationPlugin.wrap(this.toString(), wrapper, end);
};

String.prototype.unwrap = function (wrapper: string, end?: string): string {
  return manipulationPlugin.unwrap(this.toString(), wrapper, end);
};

String.prototype.insert = function (index: number, str: string): string {
  return manipulationPlugin.insert(this.toString(), index, str);
};

String.prototype.remove = function (start: number, count: number): string {
  return manipulationPlugin.remove(this.toString(), start, count);
};

String.prototype.replaceAllStr = function (search: string | RegExp, replacement: string): string {
  return manipulationPlugin.replaceAll(this.toString(), search, replacement);
};

String.prototype.between = function (start: string, end: string): string {
  return manipulationPlugin.between(this.toString(), start, end);
};

String.prototype.before = function (search: string): string {
  return manipulationPlugin.before(this.toString(), search);
};

String.prototype.after = function (search: string): string {
  return manipulationPlugin.after(this.toString(), search);
};

String.prototype.beforeLast = function (search: string): string {
  return manipulationPlugin.beforeLast(this.toString(), search);
};

String.prototype.afterLast = function (search: string): string {
  return manipulationPlugin.afterLast(this.toString(), search);
};

String.prototype.append = function (...strings: string[]): string {
  return manipulationPlugin.append(this.toString(), ...strings);
};

String.prototype.prepend = function (...strings: string[]): string {
  return manipulationPlugin.prepend(this.toString(), ...strings);
};

String.prototype.surround = function (wrapper: string): string {
  return manipulationPlugin.surround(this.toString(), wrapper);
};

String.prototype.collapseWhitespace = function (): string {
  return manipulationPlugin.collapseWhitespace(this.toString());
};

String.prototype.lines = function (): string[] {
  return manipulationPlugin.lines(this.toString());
};

String.prototype.words = function (): string[] {
  return manipulationPlugin.words(this.toString());
};

String.prototype.chars = function (): string[] {
  return manipulationPlugin.chars(this.toString());
};

// Sanitization methods
String.prototype.escape = function (): string {
  return sanitizationPlugin.escape(this.toString());
};

String.prototype.unescape = function (): string {
  return sanitizationPlugin.unescape(this.toString());
};

String.prototype.escapeHtml = function (): string {
  return sanitizationPlugin.escapeHtml(this.toString());
};

String.prototype.unescapeHtml = function (): string {
  return sanitizationPlugin.unescapeHtml(this.toString());
};

String.prototype.escapeRegex = function (): string {
  return sanitizationPlugin.escapeRegex(this.toString());
};

String.prototype.slugify = function (options?: SlugifyOptions): string {
  return sanitizationPlugin.slugify(this.toString(), options);
};

String.prototype.sanitizeFilename = function (): string {
  return sanitizationPlugin.sanitizeFilename(this.toString());
};

String.prototype.stripHtml = function (): string {
  return sanitizationPlugin.stripHtml(this.toString());
};

String.prototype.stripTags = function (allowed?: string[]): string {
  return sanitizationPlugin.stripTags(this.toString(), allowed);
};

String.prototype.clean = function (): string {
  return sanitizationPlugin.clean(this.toString());
};

String.prototype.normalizeStr = function (): string {
  return sanitizationPlugin.normalize(this.toString());
};

String.prototype.latinise = function (): string {
  return sanitizationPlugin.latinise(this.toString());
};

String.prototype.transliterate = function (locale?: string): string {
  return sanitizationPlugin.transliterate(this.toString(), locale);
};

// Formatting methods
String.prototype.template = function (data: Record<string, unknown>, options?: TemplateOptions): string {
  return formattingPlugin.template(this.toString(), data, options);
};

String.prototype.sprintf = function (...args: unknown[]): string {
  return formattingPlugin.sprintf(this.toString(), ...args);
};

String.prototype.mask = function (pattern: string): string {
  return formattingPlugin.mask(this.toString(), pattern);
};

String.prototype.unmask = function (pattern: string): string {
  return formattingPlugin.unmask(this.toString(), pattern);
};

// Validation methods
String.prototype.isEmail = function (): boolean {
  return validationPlugin.isEmail(this.toString());
};

String.prototype.isUrl = function (): boolean {
  return validationPlugin.isUrl(this.toString());
};

String.prototype.isUuid = function (version?: 1 | 3 | 4 | 5): boolean {
  return validationPlugin.isUuid(this.toString(), version);
};

String.prototype.isIp = function (): boolean {
  return validationPlugin.isIp(this.toString());
};

String.prototype.isIpv4 = function (): boolean {
  return validationPlugin.isIpv4(this.toString());
};

String.prototype.isIpv6 = function (): boolean {
  return validationPlugin.isIpv6(this.toString());
};

String.prototype.isPhone = function (): boolean {
  return validationPlugin.isPhone(this.toString());
};

String.prototype.isCreditCard = function (): boolean {
  return validationPlugin.isCreditCard(this.toString());
};

String.prototype.isEmpty = function (): boolean {
  return validationPlugin.isEmpty(this.toString());
};

String.prototype.isBlank = function (): boolean {
  return validationPlugin.isBlank(this.toString());
};

String.prototype.isAlpha = function (): boolean {
  return validationPlugin.isAlpha(this.toString());
};

String.prototype.isNumeric = function (): boolean {
  return validationPlugin.isNumeric(this.toString());
};

String.prototype.isAlphanumeric = function (): boolean {
  return validationPlugin.isAlphanumeric(this.toString());
};

String.prototype.isHex = function (): boolean {
  return validationPlugin.isHex(this.toString());
};

String.prototype.isBase64 = function (): boolean {
  return validationPlugin.isBase64(this.toString());
};

String.prototype.isJson = function (): boolean {
  return validationPlugin.isJson(this.toString());
};

String.prototype.isUpperCase = function (): boolean {
  return validationPlugin.isUpperCase(this.toString());
};

String.prototype.isLowerCase = function (): boolean {
  return validationPlugin.isLowerCase(this.toString());
};

// Analysis methods
String.prototype.wordCount = function (): number {
  return analysisPlugin.wordCount(this.toString());
};

String.prototype.charCount = function (options?: AnalysisOptions): number {
  return analysisPlugin.charCount(this.toString(), options);
};

String.prototype.lineCount = function (): number {
  return analysisPlugin.lineCount(this.toString());
};

String.prototype.sentenceCount = function (): number {
  return analysisPlugin.sentenceCount(this.toString());
};

String.prototype.paragraphCount = function (): number {
  return analysisPlugin.paragraphCount(this.toString());
};

String.prototype.byteSize = function (): number {
  return analysisPlugin.byteSize(this.toString());
};

String.prototype.entropy = function (): number {
  return analysisPlugin.entropy(this.toString());
};

String.prototype.frequency = function (options?: { type?: 'char' | 'word' }): FrequencyResult {
  return analysisPlugin.frequency(this.toString(), options);
};

String.prototype.readingTime = function (options?: { wordsPerMinute?: number }): number {
  return analysisPlugin.readingTime(this.toString(), options);
};

String.prototype.speakingTime = function (options?: { wordsPerMinute?: number }): number {
  return analysisPlugin.speakingTime(this.toString(), options);
};

// Search methods
String.prototype.containsStr = function (search: string, options?: StrKitOptions): boolean {
  return searchPlugin.contains(this.toString(), search, options);
};

String.prototype.countOccurrences = function (search: string): number {
  return searchPlugin.countOccurrences(this.toString(), search);
};

String.prototype.positions = function (search: string): number[] {
  return searchPlugin.positions(this.toString(), search);
};

String.prototype.matchStr = function (pattern: RegExp): string | null {
  return searchPlugin.match(this.toString(), pattern);
};

String.prototype.matchAllStr = function (pattern: RegExp): string[] {
  return searchPlugin.matchAll(this.toString(), pattern);
};

// Similarity methods
String.prototype.levenshtein = function (other: string): number {
  return similarityPlugin.levenshtein(this.toString(), other);
};

String.prototype.levenshteinRatio = function (other: string): number {
  return similarityPlugin.levenshteinRatio(this.toString(), other);
};

String.prototype.dice = function (other: string): number {
  return similarityPlugin.dice(this.toString(), other);
};

String.prototype.jaroWinkler = function (other: string): number {
  return similarityPlugin.jaroWinkler(this.toString(), other);
};

String.prototype.hamming = function (other: string): number {
  return similarityPlugin.hamming(this.toString(), other);
};

String.prototype.cosine = function (other: string): number {
  return similarityPlugin.cosine(this.toString(), other);
};

String.prototype.similarity = function (other: string, options?: SimilarityOptions): number {
  return similarityPlugin.similarity(this.toString(), other, options);
};

// Diff methods
String.prototype.diffChars = function (other: string): DiffResult[] {
  return diffPlugin.diffChars(this.toString(), other);
};

String.prototype.diffWords = function (other: string): DiffResult[] {
  return diffPlugin.diffWords(this.toString(), other);
};

String.prototype.diffLines = function (other: string): DiffResult[] {
  return diffPlugin.diffLines(this.toString(), other);
};

String.prototype.diff = function (other: string, options?: DiffOptions): DiffResult[] {
  return diffPlugin.diff(this.toString(), other, options);
};

// Pluralization methods
String.prototype.pluralize = function (count?: number, showCount?: boolean): string {
  return pluralizationPlugin.pluralize(this.toString(), count, showCount);
};

String.prototype.singularize = function (): string {
  return pluralizationPlugin.singularize(this.toString());
};

String.prototype.isPlural = function (): boolean {
  return pluralizationPlugin.isPlural(this.toString());
};

String.prototype.isSingular = function (): boolean {
  return pluralizationPlugin.isSingular(this.toString());
};

export {};
