# @oxog/strkit - Complete Package Specification

## Overview

**Package Name:** `@oxog/strkit`
**Version:** `1.0.0`
**License:** MIT
**Author:** ersinkoc
**Repository:** https://github.com/ersinkoc/strkit
**Documentation:** https://strkit.oxog.dev

Zero-dependency string manipulation toolkit for JavaScript/TypeScript with 115+ methods across 10 categories.

---

## Table of Contents

1. [Core Types](#core-types)
2. [API Styles](#api-styles)
3. [Plugin Categories](#plugin-categories)
   - [Case Conversion](#1-case-conversion)
   - [Manipulation](#2-manipulation)
   - [Validation](#3-validation)
   - [Sanitization](#4-sanitization)
   - [Formatting](#5-formatting)
   - [Similarity](#6-similarity)
   - [Analysis](#7-analysis)
   - [Pluralization](#8-pluralization)
   - [Diff](#9-diff)
   - [Search](#10-search)
4. [Locale System](#locale-system)
5. [Plugin System](#plugin-system)
6. [Chain API](#chain-api)

---

## Core Types

```typescript
// Base options for most methods
export interface StrKitOptions {
  locale?: string;
  caseSensitive?: boolean;
}

// Truncation options
export interface TruncateOptions extends StrKitOptions {
  ellipsis?: string;           // Default: "..."
  position?: 'end' | 'middle' | 'start';  // Default: "end"
}

// Slugify options
export interface SlugifyOptions extends StrKitOptions {
  separator?: string;          // Default: "-"
  lowercase?: boolean;         // Default: true
  strict?: boolean;            // Default: false (remove special chars)
}

// Template options
export interface TemplateOptions extends StrKitOptions {
  openDelimiter?: string;      // Default: "{{"
  closeDelimiter?: string;     // Default: "}}"
}

// Similarity options
export interface SimilarityOptions extends StrKitOptions {
  algorithm?: 'levenshtein' | 'dice' | 'jaroWinkler' | 'hamming' | 'cosine';
  threshold?: number;          // Default: 0.0
}

// Diff options
export interface DiffOptions extends StrKitOptions {
  granularity?: 'char' | 'word' | 'line';  // Default: "char"
  ignoreWhitespace?: boolean;  // Default: false
}

// Diff result
export interface DiffResult {
  type: 'equal' | 'add' | 'remove';
  value: string;
}

// Match result for similarity
export interface MatchResult {
  match: string;
  score: number;
  index: number;
}

// Frequency result
export interface FrequencyResult {
  [key: string]: number;
}

// Currency format options
export interface CurrencyOptions {
  locale?: string;
  currency?: string;           // ISO 4217 currency code
  symbol?: string;             // Custom symbol override
}

// Mask options
export interface MaskOptions {
  maskChar?: string;           // Default: "#"
}

// Analysis options
export interface AnalysisOptions {
  ignoreSpaces?: boolean;
  ignoreNewlines?: boolean;
}

// Search options
export interface SearchOptions extends StrKitOptions {
  fromIndex?: number;
}

// Patch format
export interface PatchResult {
  hunks: PatchHunk[];
  oldFileName?: string;
  newFileName?: string;
}

export interface PatchHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: string[];
}
```

---

## API Styles

### Style 1: Namespace API (`str.*`)

```typescript
import { str } from '@oxog/strkit';

str.case.camel(input: string): string;
str.validate.email(input: string): boolean;
str.similarity.levenshtein(a: string, b: string): number;
```

### Style 2: Direct Import (Tree-Shakeable)

```typescript
import { camelCase, isEmail, levenshtein } from '@oxog/strkit';

camelCase(input: string): string;
isEmail(input: string): boolean;
levenshtein(a: string, b: string): number;
```

### Style 3: Chainable API (`S()`)

```typescript
import { S } from '@oxog/strkit';

S(input: string)
  .trim()
  .camelCase()
  .value(): string;
```

### Style 4: Prototype Extension (Opt-in)

```typescript
import '@oxog/strkit/extend';

'hello world'.camelCase(): string;
'test@test.com'.isEmail(): boolean;
```

---

## Plugin Categories

### 1. Case Conversion

**Namespace:** `str.case.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `camel` | `(input: string, options?: StrKitOptions) => string` | Convert to camelCase |
| `kebab` | `(input: string, options?: StrKitOptions) => string` | Convert to kebab-case |
| `snake` | `(input: string, options?: StrKitOptions) => string` | Convert to snake_case |
| `pascal` | `(input: string, options?: StrKitOptions) => string` | Convert to PascalCase |
| `title` | `(input: string, options?: StrKitOptions) => string` | Convert to Title Case |
| `sentence` | `(input: string, options?: StrKitOptions) => string` | Convert to Sentence case |
| `constant` | `(input: string, options?: StrKitOptions) => string` | Convert to CONSTANT_CASE |
| `dot` | `(input: string, options?: StrKitOptions) => string` | Convert to dot.case |
| `path` | `(input: string, options?: StrKitOptions) => string` | Convert to path/case |
| `header` | `(input: string, options?: StrKitOptions) => string` | Convert to Header-Case |
| `swap` | `(input: string, options?: StrKitOptions) => string` | Swap case of each character |
| `upper` | `(input: string, options?: StrKitOptions) => string` | Convert to UPPERCASE |
| `lower` | `(input: string, options?: StrKitOptions) => string` | Convert to lowercase |
| `capitalize` | `(input: string, options?: StrKitOptions) => string` | Capitalize first letter |
| `decapitalize` | `(input: string, options?: StrKitOptions) => string` | Lowercase first letter |

**Direct Exports:**
- `camelCase`, `kebabCase`, `snakeCase`, `pascalCase`, `titleCase`
- `sentenceCase`, `constantCase`, `dotCase`, `pathCase`, `headerCase`
- `swapCase`, `toUpper`, `toLower`, `capitalize`, `decapitalize`

---

### 2. Manipulation

**Namespace:** `str.manipulation.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `trim` | `(input: string, chars?: string) => string` | Trim whitespace or specified chars |
| `trimStart` | `(input: string, chars?: string) => string` | Trim from start |
| `trimEnd` | `(input: string, chars?: string) => string` | Trim from end |
| `pad` | `(input: string, length: number, char?: string) => string` | Pad both sides |
| `padStart` | `(input: string, length: number, char?: string) => string` | Pad start |
| `padEnd` | `(input: string, length: number, char?: string) => string` | Pad end |
| `repeat` | `(input: string, count: number) => string` | Repeat string |
| `reverse` | `(input: string) => string` | Reverse string (Unicode-aware) |
| `truncate` | `(input: string, length: number, options?: TruncateOptions) => string` | Truncate with ellipsis |
| `wrap` | `(input: string, wrapper: string, end?: string) => string` | Wrap with chars |
| `unwrap` | `(input: string, wrapper: string, end?: string) => string` | Remove wrapping chars |
| `splice` | `(input: string, start: number, deleteCount: number, insert?: string) => string` | Splice string |
| `insert` | `(input: string, index: number, str: string) => string` | Insert at position |
| `remove` | `(input: string, start: number, count: number) => string` | Remove characters |
| `replace` | `(input: string, search: string \| RegExp, replacement: string) => string` | Replace first |
| `replaceAll` | `(input: string, search: string \| RegExp, replacement: string) => string` | Replace all |
| `between` | `(input: string, start: string, end: string) => string` | Get string between delimiters |
| `before` | `(input: string, search: string) => string` | Get string before match |
| `after` | `(input: string, search: string) => string` | Get string after match |
| `beforeLast` | `(input: string, search: string) => string` | Get string before last match |
| `afterLast` | `(input: string, search: string) => string` | Get string after last match |
| `append` | `(input: string, ...strings: string[]) => string` | Append strings |
| `prepend` | `(input: string, ...strings: string[]) => string` | Prepend strings |
| `surround` | `(input: string, wrapper: string) => string` | Surround with string |
| `collapseWhitespace` | `(input: string) => string` | Collapse multiple spaces |
| `lines` | `(input: string) => string[]` | Split into lines |
| `words` | `(input: string) => string[]` | Split into words |
| `chars` | `(input: string) => string[]` | Split into characters (Unicode-aware) |

**Direct Exports:**
- `trim`, `trimStart`, `trimEnd`, `pad`, `padStart`, `padEnd`
- `repeat`, `reverse`, `truncate`, `wrap`, `unwrap`
- `splice`, `insert`, `remove`, `replace`, `replaceAll`
- `between`, `before`, `after`, `beforeLast`, `afterLast`
- `append`, `prepend`, `surround`, `collapseWhitespace`
- `lines`, `words`, `chars`

---

### 3. Validation

**Namespace:** `str.validate.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `email` | `(input: string) => boolean` | Validate email address |
| `url` | `(input: string) => boolean` | Validate URL |
| `uuid` | `(input: string, version?: 1\|3\|4\|5) => boolean` | Validate UUID |
| `ip` | `(input: string) => boolean` | Validate IP (v4 or v6) |
| `ipv4` | `(input: string) => boolean` | Validate IPv4 |
| `ipv6` | `(input: string) => boolean` | Validate IPv6 |
| `phone` | `(input: string) => boolean` | Validate phone number |
| `creditCard` | `(input: string) => boolean` | Validate credit card (Luhn) |
| `empty` | `(input: string) => boolean` | Check if empty |
| `blank` | `(input: string) => boolean` | Check if blank (whitespace only) |
| `alpha` | `(input: string) => boolean` | Check if alphabetic only |
| `numeric` | `(input: string) => boolean` | Check if numeric only |
| `alphanumeric` | `(input: string) => boolean` | Check if alphanumeric |
| `hex` | `(input: string) => boolean` | Check if valid hex |
| `base64` | `(input: string) => boolean` | Check if valid base64 |
| `json` | `(input: string) => boolean` | Check if valid JSON |
| `upperCase` | `(input: string) => boolean` | Check if all uppercase |
| `lowerCase` | `(input: string) => boolean` | Check if all lowercase |
| `contains` | `(input: string, search: string, options?: StrKitOptions) => boolean` | Check if contains substring |
| `startsWith` | `(input: string, search: string) => boolean` | Check if starts with |
| `endsWith` | `(input: string, search: string) => boolean` | Check if ends with |
| `equals` | `(input: string, other: string, options?: StrKitOptions) => boolean` | Check equality |
| `matches` | `(input: string, pattern: RegExp) => boolean` | Check if matches pattern |

**Direct Exports (with `is` prefix):**
- `isEmail`, `isUrl`, `isUuid`, `isIp`, `isIpv4`, `isIpv6`
- `isPhone`, `isCreditCard`, `isEmpty`, `isBlank`
- `isAlpha`, `isNumeric`, `isAlphanumeric`
- `isHex`, `isBase64`, `isJson`
- `isUpperCase`, `isLowerCase`
- `contains`, `startsWith`, `endsWith`, `equals`, `matches`

---

### 4. Sanitization

**Namespace:** `str.sanitize.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `escape` | `(input: string) => string` | Escape special chars |
| `unescape` | `(input: string) => string` | Unescape special chars |
| `escapeHtml` | `(input: string) => string` | Escape HTML entities |
| `unescapeHtml` | `(input: string) => string` | Unescape HTML entities |
| `escapeRegex` | `(input: string) => string` | Escape regex special chars |
| `slugify` | `(input: string, options?: SlugifyOptions) => string` | Create URL slug |
| `filename` | `(input: string) => string` | Sanitize for filename |
| `stripHtml` | `(input: string) => string` | Remove all HTML tags |
| `stripTags` | `(input: string, allowed?: string[]) => string` | Remove HTML except allowed |
| `clean` | `(input: string) => string` | Normalize whitespace |
| `normalize` | `(input: string) => string` | Unicode normalization (NFC) |
| `latinise` | `(input: string) => string` | Convert to ASCII equivalents |
| `transliterate` | `(input: string, locale?: string) => string` | Transliterate to Latin |

**Direct Exports:**
- `escape`, `unescape`, `escapeHtml`, `unescapeHtml`, `escapeRegex`
- `slugify`, `sanitizeFilename`, `stripHtml`, `stripTags`
- `clean`, `normalize`, `latinise`, `transliterate`

---

### 5. Formatting

**Namespace:** `str.format.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `template` | `(input: string, data: Record<string, unknown>, options?: TemplateOptions) => string` | Template interpolation |
| `sprintf` | `(format: string, ...args: unknown[]) => string` | Printf-style formatting |
| `mask` | `(input: string, pattern: string, options?: MaskOptions) => string` | Apply mask pattern |
| `unmask` | `(input: string, pattern: string, options?: MaskOptions) => string` | Remove mask |
| `ordinalize` | `(num: number, locale?: string) => string` | Number to ordinal |
| `currency` | `(amount: number, options?: CurrencyOptions) => string` | Format as currency |
| `number` | `(input: string \| number, options?: { decimals?: number, thousands?: string, decimal?: string }) => string` | Format number |
| `pad` | `(input: string, length: number, char?: string, position?: 'left' \| 'right' \| 'both') => string` | Pad string |

**Direct Exports:**
- `template`, `sprintf`, `mask`, `unmask`
- `ordinalize`, `formatCurrency`, `formatNumber`

---

### 6. Similarity

**Namespace:** `str.similarity.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `levenshtein` | `(a: string, b: string) => number` | Levenshtein edit distance |
| `levenshteinRatio` | `(a: string, b: string) => number` | Normalized 0-1 ratio |
| `dice` | `(a: string, b: string) => number` | Dice coefficient |
| `jaroWinkler` | `(a: string, b: string) => number` | Jaro-Winkler similarity |
| `hamming` | `(a: string, b: string) => number` | Hamming distance |
| `cosine` | `(a: string, b: string) => number` | Cosine similarity |
| `lcs` | `(a: string, b: string) => string` | Longest common subsequence |
| `lcsLength` | `(a: string, b: string) => number` | LCS length |
| `bestMatch` | `(input: string, candidates: string[], options?: SimilarityOptions) => MatchResult` | Find best match |
| `findSimilar` | `(input: string, candidates: string[], options?: SimilarityOptions) => MatchResult[]` | Find all above threshold |

**Direct Exports:**
- `levenshtein`, `levenshteinRatio`, `diceCoefficient`
- `jaroWinkler`, `hammingDistance`, `cosineSimilarity`
- `lcs`, `lcsLength`, `bestMatch`, `findSimilar`

---

### 7. Analysis

**Namespace:** `str.analysis.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `wordCount` | `(input: string) => number` | Count words |
| `charCount` | `(input: string, options?: AnalysisOptions) => number` | Count characters |
| `lineCount` | `(input: string) => number` | Count lines |
| `sentenceCount` | `(input: string) => number` | Count sentences |
| `paragraphCount` | `(input: string) => number` | Count paragraphs |
| `byteSize` | `(input: string) => number` | UTF-8 byte size |
| `entropy` | `(input: string) => number` | Shannon entropy |
| `frequency` | `(input: string, options?: { type?: 'char' \| 'word' }) => FrequencyResult` | Character/word frequency |
| `readingTime` | `(input: string, options?: { wordsPerMinute?: number }) => number` | Estimated reading time (minutes) |
| `speakingTime` | `(input: string, options?: { wordsPerMinute?: number }) => number` | Estimated speaking time (minutes) |

**Direct Exports:**
- `wordCount`, `charCount`, `lineCount`, `sentenceCount`, `paragraphCount`
- `byteSize`, `entropy`, `frequency`, `readingTime`, `speakingTime`

---

### 8. Pluralization

**Namespace:** `str.plural.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `plural` | `(input: string, count?: number, showCount?: boolean, options?: StrKitOptions) => string` | Pluralize word |
| `singular` | `(input: string, options?: StrKitOptions) => string` | Singularize word |
| `isPlural` | `(input: string, options?: StrKitOptions) => boolean` | Check if plural |
| `isSingular` | `(input: string, options?: StrKitOptions) => boolean` | Check if singular |
| `addRule` | `(rule: RegExp, replacement: string) => void` | Add pluralization rule |
| `addIrregular` | `(singular: string, plural: string) => void` | Add irregular word |
| `addUncountable` | `(word: string) => void` | Add uncountable word |

**Direct Exports:**
- `pluralize`, `singularize`, `isPlural`, `isSingular`
- `addPluralRule`, `addIrregular`, `addUncountable`

---

### 9. Diff

**Namespace:** `str.diff.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `diff` | `(oldStr: string, newStr: string, options?: DiffOptions) => DiffResult[]` | Generic diff |
| `diffChars` | `(oldStr: string, newStr: string) => DiffResult[]` | Character-level diff |
| `diffWords` | `(oldStr: string, newStr: string) => DiffResult[]` | Word-level diff |
| `diffLines` | `(oldStr: string, newStr: string) => DiffResult[]` | Line-level diff |
| `createPatch` | `(fileName: string, oldStr: string, newStr: string, options?: DiffOptions) => string` | Create unified patch |
| `applyPatch` | `(input: string, patch: string) => string` | Apply patch |
| `reversePatch` | `(patch: string) => string` | Reverse patch direction |

**Direct Exports:**
- `diff`, `diffChars`, `diffWords`, `diffLines`
- `createPatch`, `applyPatch`, `reversePatch`

---

### 10. Search

**Namespace:** `str.search.*`

| Method | Signature | Description |
|--------|-----------|-------------|
| `contains` | `(input: string, search: string, options?: StrKitOptions) => boolean` | Check if contains |
| `startsWith` | `(input: string, search: string) => boolean` | Check if starts with |
| `endsWith` | `(input: string, search: string) => boolean` | Check if ends with |
| `indexOf` | `(input: string, search: string, options?: SearchOptions) => number` | Find first index |
| `lastIndexOf` | `(input: string, search: string, options?: SearchOptions) => number` | Find last index |
| `countOccurrences` | `(input: string, search: string, options?: StrKitOptions) => number` | Count occurrences |
| `positions` | `(input: string, search: string, options?: StrKitOptions) => number[]` | Get all positions |
| `match` | `(input: string, pattern: RegExp) => string \| null` | Get first match |
| `matchAll` | `(input: string, pattern: RegExp) => string[]` | Get all matches |
| `extract` | `(input: string, pattern: RegExp) => RegExpMatchArray \| null` | Extract with groups |
| `extractAll` | `(input: string, pattern: RegExp) => RegExpMatchArray[]` | Extract all with groups |

**Direct Exports:**
- `indexOf`, `lastIndexOf`, `countOccurrences`, `positions`
- `match`, `matchAll`, `extract`, `extractAll`

---

## Locale System

### Supported Locales

1. `en` - English (default)
2. `tr` - Turkish
3. `de` - German
4. `fr` - French
5. `es` - Spanish
6. `pt` - Portuguese
7. `it` - Italian
8. `nl` - Dutch
9. `pl` - Polish
10. `ru` - Russian
11. `ar` - Arabic
12. `zh` - Chinese
13. `ja` - Japanese
14. `ko` - Korean

### Locale Interface

```typescript
export interface StrKitLocale {
  code: string;
  name: string;

  // Case conversion mappings
  case: {
    upper: Record<string, string>;  // Special uppercase mappings
    lower: Record<string, string>;  // Special lowercase mappings
  };

  // Pluralization rules
  plural: {
    rules: Array<[RegExp, string]>;
    irregulars: Record<string, string>;
    uncountables: string[];
  };

  // Transliteration map
  transliterate: Record<string, string>;

  // Number formatting
  numbers: {
    decimal: string;      // Decimal separator
    thousands: string;    // Thousands separator
  };

  // Ordinal suffixes
  ordinals: {
    default: string;
    rules: Array<[number | ((n: number) => boolean), string]>;
  };
}
```

### Locale API

```typescript
// Set global locale
setLocale(locale: string): void;

// Get current locale
getLocale(): string;

// Register custom locale
registerLocale(locale: StrKitLocale): void;

// Get available locales
getAvailableLocales(): string[];
```

---

## Plugin System

### Plugin Interface

```typescript
export interface StrKitPlugin {
  name: string;
  version: string;
  methods: Record<string, Function>;
  chainMethods?: Record<string, Function>;
  init?: (kernel: StrKitKernel) => void;
  dependencies?: string[];
}
```

### Plugin API

```typescript
// Register plugin
registerPlugin(plugin: StrKitPlugin): void;

// Get registered plugins
getPlugins(): StrKitPlugin[];

// Check if plugin exists
hasPlugin(name: string): boolean;
```

---

## Chain API

### Chain Interface

```typescript
export interface StrKitChain {
  // Properties
  readonly length: number;
  readonly s: string;

  // Core methods
  value(): string;
  toString(): string;
  clone(): StrKitChain;

  // All methods from plugins return StrKitChain
  // Validation methods return boolean
  // Analysis methods return number/object

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
  append(...strings: string[]): StrKitChain;
  prepend(...strings: string[]): StrKitChain;

  // Sanitization methods
  escape(): StrKitChain;
  unescape(): StrKitChain;
  escapeHtml(): StrKitChain;
  unescapeHtml(): StrKitChain;
  escapeRegex(): StrKitChain;
  slugify(options?: SlugifyOptions): StrKitChain;
  filename(): StrKitChain;
  stripHtml(): StrKitChain;
  clean(): StrKitChain;
  normalize(): StrKitChain;
  latinise(): StrKitChain;
  transliterate(locale?: string): StrKitChain;

  // Formatting methods
  template(data: Record<string, unknown>): StrKitChain;
  sprintf(...args: unknown[]): StrKitChain;
  mask(pattern: string): StrKitChain;
  unmask(pattern: string): StrKitChain;

  // Validation methods (return boolean)
  isEmail(): boolean;
  isUrl(): boolean;
  isUuid(): boolean;
  isIp(): boolean;
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
  dice(other: string): number;
  jaroWinkler(other: string): number;
  similarity(other: string, options?: SimilarityOptions): number;

  // Diff methods
  diffChars(other: string): DiffResult[];
  diffWords(other: string): DiffResult[];
  diff(other: string, options?: DiffOptions): DiffResult[];

  // Pluralization
  plural(count?: number, showCount?: boolean): StrKitChain;
  singular(): StrKitChain;
  isPlural(): boolean;
  isSingular(): boolean;
}
```

---

## Build Targets

### Output Formats

- **ESM**: `dist/index.mjs` - ES Modules for modern bundlers
- **CJS**: `dist/index.cjs` - CommonJS for Node.js
- **UMD**: `dist/index.umd.js` - Universal Module Definition
- **Types**: `dist/index.d.ts` - TypeScript declarations

### Bundle Size Targets

- Full bundle: < 15KB gzipped
- Tree-shaken single method: < 1KB gzipped

---

## Compatibility

- **Node.js**: >= 16.0.0
- **Browsers**: ES2020+ (Chrome 80+, Firefox 74+, Safari 13.1+, Edge 80+)
- **TypeScript**: >= 4.7.0

---

## Exports Map

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./extend": {
      "import": "./dist/extend.mjs",
      "require": "./dist/extend.cjs",
      "types": "./dist/extend.d.ts"
    }
  }
}
```
