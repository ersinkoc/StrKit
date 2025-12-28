# @oxog/strkit - LLM Documentation

> The ultimate zero-dependency string manipulation toolkit for JavaScript/TypeScript. 115+ methods across 10 categories with 4 flexible API styles, i18n support, and micro-kernel plugin architecture.

**Version:** 1.0.0
**License:** MIT
**Repository:** https://github.com/ersinkoc/strkit
**Documentation:** https://strkit.oxog.dev
**Author:** ersinkoc

---

## Quick Reference

### Installation

```bash
npm install @oxog/strkit
# or
yarn add @oxog/strkit
# or
pnpm add @oxog/strkit
```

### Quick Start

```typescript
// Style 1: Namespace API
import { str } from '@oxog/strkit';
str.case.camel('hello world');  // 'helloWorld'

// Style 2: Direct Import (Tree-Shakeable)
import { camelCase, isEmail } from '@oxog/strkit';
camelCase('hello world');  // 'helloWorld'

// Style 3: Chainable API
import { S } from '@oxog/strkit';
S('  Hello World  ').trim().camelCase().value;  // 'helloWorld'

// Style 4: Prototype Extension
import '@oxog/strkit/extend';
'hello world'.camelCase();  // 'helloWorld'
```

---

## Package Overview

### Purpose

StrKit solves the problem of fragmented string manipulation in JavaScript by providing a comprehensive, zero-dependency toolkit with 115+ methods. It eliminates the need for multiple small packages like `lodash.camelcase`, `slugify`, `string-similarity`, etc., offering a unified API with consistent behavior, full TypeScript support, and i18n capabilities.

### Key Features

- **Zero Dependencies**: All algorithms implemented from scratch, no external runtime dependencies
- **115+ Methods**: Comprehensive coverage across 10 categories (case, manipulation, validation, sanitization, formatting, similarity, analysis, pluralization, diff, search)
- **4 API Styles**: Namespace (`str.case.camel()`), Direct Import, Chainable (`S()`), Prototype Extension
- **TypeScript First**: Full type definitions with strict mode, generics support
- **Tree-Shakeable**: ESM build allows importing only what you need
- **i18n Support**: 14 locales with locale-aware operations (case conversion, pluralization, transliteration)
- **Plugin Architecture**: Micro-kernel design allows extending with custom plugins

### Architecture

StrKit uses a micro-kernel plugin architecture:

```
┌─────────────────────────────────────────────────────────┐
│                      User Code                          │
├──────────────┬──────────────┬──────────────┬────────────┤
│ str.* API    │ Direct Import│ S() Chain    │ Prototype  │
├──────────────┴──────────────┴──────────────┴────────────┤
│                    Core Kernel                          │
│  (Plugin Registry, Locale Manager, Method Resolution)   │
├─────────────────────────────────────────────────────────┤
│  case │ manipulation │ validation │ sanitization │ ...  │
│       │              │            │              │       │
│              Built-in Plugins (10 total)                │
└─────────────────────────────────────────────────────────┘
```

### Dependencies

- **Runtime:** Zero runtime dependencies
- **Peer:** None
- **Dev Only:** TypeScript, Vitest, ESLint, tsup, VitePress

### Bundle Size

- **Full ESM:** ~37KB minified
- **Tree-shakeable:** Yes - import only what you need
- **Gzipped:** ~12KB estimated

---

## API Reference

### Exports Summary

| Export | Type | Description |
|--------|------|-------------|
| `str` | object | Namespace API with all methods organized by category |
| `S` | function | Chainable string wrapper factory |
| `camelCase`, `kebabCase`, etc. | function | Direct function imports (tree-shakeable) |
| `setLocale`, `getLocale` | function | Locale management utilities |
| `registerPlugin` | function | Register custom plugins |
| Types: `StrKitChain`, `DiffResult`, etc. | type | TypeScript type definitions |

---

## Category: Case Conversion (15 methods)

### Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `camelCase(str)` | Convert to camelCase | `'hello world'` → `'helloWorld'` |
| `kebabCase(str)` | Convert to kebab-case | `'helloWorld'` → `'hello-world'` |
| `snakeCase(str)` | Convert to snake_case | `'helloWorld'` → `'hello_world'` |
| `pascalCase(str)` | Convert to PascalCase | `'hello world'` → `'HelloWorld'` |
| `titleCase(str)` | Convert to Title Case | `'hello world'` → `'Hello World'` |
| `sentenceCase(str)` | Convert to Sentence case | `'HELLO WORLD'` → `'Hello world'` |
| `constantCase(str)` | Convert to CONSTANT_CASE | `'hello world'` → `'HELLO_WORLD'` |
| `dotCase(str)` | Convert to dot.case | `'hello world'` → `'hello.world'` |
| `pathCase(str)` | Convert to path/case | `'hello world'` → `'hello/world'` |
| `headerCase(str)` | Convert to Header-Case | `'hello world'` → `'Hello-World'` |
| `swapCase(str)` | Swap case of each character | `'Hello'` → `'hELLO'` |
| `toUpper(str)` | Convert to UPPERCASE | `'hello'` → `'HELLO'` |
| `toLower(str)` | Convert to lowercase | `'HELLO'` → `'hello'` |
| `capitalize(str)` | Capitalize first letter | `'hello'` → `'Hello'` |
| `decapitalize(str)` | Lowercase first letter | `'Hello'` → `'hello'` |

### Locale Support

All case methods support locale-aware conversion:

```typescript
import { toUpper, setLocale } from '@oxog/strkit';

// Turkish locale handles i/I correctly
toUpper('istanbul', { locale: 'tr' });  // 'İSTANBUL'
toUpper('istanbul', { locale: 'en' });  // 'ISTANBUL'

// Set global locale
setLocale('tr');
toUpper('istanbul');  // Uses Turkish rules globally
```

### Function Signatures

```typescript
function camelCase(input: string, options?: StrKitOptions): string;
function kebabCase(input: string, options?: StrKitOptions): string;
function snakeCase(input: string, options?: StrKitOptions): string;
function pascalCase(input: string, options?: StrKitOptions): string;
function titleCase(input: string, options?: StrKitOptions): string;
function sentenceCase(input: string, options?: StrKitOptions): string;
function constantCase(input: string, options?: StrKitOptions): string;
function dotCase(input: string, options?: StrKitOptions): string;
function pathCase(input: string, options?: StrKitOptions): string;
function headerCase(input: string, options?: StrKitOptions): string;
function swapCase(input: string, options?: StrKitOptions): string;
function toUpper(input: string, options?: StrKitOptions): string;
function toLower(input: string, options?: StrKitOptions): string;
function capitalize(input: string, options?: StrKitOptions): string;
function decapitalize(input: string, options?: StrKitOptions): string;

interface StrKitOptions {
  locale?: string;           // ISO 639-1 locale code
  caseSensitive?: boolean;   // For comparison operations
}
```

---

## Category: Manipulation (27 methods)

### Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `trim(str, chars?)` | Trim whitespace or chars from both ends | `'  hello  '` → `'hello'` |
| `trimStart(str, chars?)` | Trim from start | `'  hello'` → `'hello'` |
| `trimEnd(str, chars?)` | Trim from end | `'hello  '` → `'hello'` |
| `pad(str, len, char?)` | Pad both sides | `'5'` → `' 5 '` |
| `padStart(str, len, char?)` | Pad start | `'5'` → `'005'` |
| `padEnd(str, len, char?)` | Pad end | `'5'` → `'500'` |
| `repeat(str, count)` | Repeat string | `'ab'` → `'ababab'` |
| `reverse(str)` | Reverse string (Unicode-aware) | `'hello'` → `'olleh'` |
| `truncate(str, len, opts?)` | Truncate with ellipsis | `'hello world'` → `'hello...'` |
| `wrap(str, wrapper, end?)` | Wrap string | `'hello'` → `'"hello"'` |
| `unwrap(str, wrapper, end?)` | Remove wrapping | `'"hello"'` → `'hello'` |
| `splice(str, start, del, ins?)` | Splice like array | `'hello'` → `'heXYo'` |
| `insert(str, index, ins)` | Insert at position | `'helo'` → `'hello'` |
| `remove(str, start, count)` | Remove characters | `'hello'` → `'ho'` |
| `replace(str, search, repl)` | Replace first match | `'hello'` → `'heLlo'` |
| `replaceAll(str, search, repl)` | Replace all matches | `'hello'` → `'heLLo'` |
| `between(str, start, end)` | Extract between delimiters | `'<tag>'` → `'tag'` |
| `before(str, search)` | Get before first match | `'a@b'` → `'a'` |
| `after(str, search)` | Get after first match | `'a@b'` → `'b'` |
| `beforeLast(str, search)` | Get before last match | `'a@b@c'` → `'a@b'` |
| `afterLast(str, search)` | Get after last match | `'a@b@c'` → `'c'` |
| `append(str, ...strings)` | Append strings | `'hello'` + `' world'` |
| `prepend(str, ...strings)` | Prepend strings | `'world'` → `'hello world'` |
| `surround(str, wrapper)` | Surround with string | `'hello'` → `'***hello***'` |
| `collapseWhitespace(str)` | Collapse multiple spaces | `'a  b'` → `'a b'` |
| `lines(str)` | Split into lines | `'a\nb'` → `['a', 'b']` |
| `words(str)` | Split into words | `'hello world'` → `['hello', 'world']` |
| `chars(str)` | Split into characters | `'abc'` → `['a', 'b', 'c']` |

### Key Function Signatures

```typescript
function truncate(input: string, length: number, options?: TruncateOptions): string;

interface TruncateOptions {
  ellipsis?: string;                    // Default: '...'
  position?: 'end' | 'middle' | 'start'; // Where to place ellipsis
}

// Example: truncate at middle
truncate('hello world example', 12, { position: 'middle' });
// Result: 'hello...ample'
```

---

## Category: Validation (23 methods)

### Available Methods

| Method | Description | Example Result |
|--------|-------------|----------------|
| `isEmail(str)` | Validate email (RFC 5322) | `true` / `false` |
| `isUrl(str)` | Validate HTTP/HTTPS URL | `true` / `false` |
| `isUuid(str, version?)` | Validate UUID (v1-5) | `true` / `false` |
| `isIp(str)` | Validate IPv4 or IPv6 | `true` / `false` |
| `isIpv4(str)` | Validate IPv4 only | `true` / `false` |
| `isIpv6(str)` | Validate IPv6 only | `true` / `false` |
| `isPhone(str)` | Validate phone (international) | `true` / `false` |
| `isCreditCard(str)` | Validate credit card (Luhn) | `true` / `false` |
| `isEmpty(str)` | Check if empty string | `true` / `false` |
| `isBlank(str)` | Check if blank (whitespace only) | `true` / `false` |
| `isAlpha(str)` | Check if alphabetic only | `true` / `false` |
| `isNumeric(str)` | Check if numeric only | `true` / `false` |
| `isAlphanumeric(str)` | Check if alphanumeric | `true` / `false` |
| `isHex(str)` | Check if hexadecimal | `true` / `false` |
| `isBase64(str)` | Check if Base64 encoded | `true` / `false` |
| `isJson(str)` | Check if valid JSON | `true` / `false` |
| `isUpperCase(str)` | Check if all uppercase | `true` / `false` |
| `isLowerCase(str)` | Check if all lowercase | `true` / `false` |
| `contains(str, search, opts?)` | Check if contains substring | `true` / `false` |
| `startsWith(str, search)` | Check if starts with | `true` / `false` |
| `endsWith(str, search)` | Check if ends with | `true` / `false` |
| `equals(str1, str2, opts?)` | Check equality | `true` / `false` |
| `matches(str, pattern)` | Check regex match | `true` / `false` |

### Validation Examples

```typescript
import { isEmail, isUrl, isUuid, isCreditCard, isJson } from '@oxog/strkit';

// Email validation (RFC 5322 compliant)
isEmail('user@example.com');     // true
isEmail('invalid.email');        // false

// URL validation (http/https only)
isUrl('https://example.com');    // true
isUrl('ftp://files.com');        // false (not http/https)

// UUID validation with optional version
isUuid('550e8400-e29b-41d4-a716-446655440000');      // true (any version)
isUuid('550e8400-e29b-41d4-a716-446655440000', 4);   // true (v4 specifically)

// Credit card with Luhn algorithm
isCreditCard('4111111111111111');  // true (valid Visa test number)
isCreditCard('1234567890123456');  // false

// JSON validation
isJson('{"key": "value"}');  // true
isJson('{invalid}');         // false

// Case-insensitive contains
contains('Hello World', 'world', { caseSensitive: false });  // true
```

---

## Category: Sanitization (13 methods)

### Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `escape(str)` | Escape for string literals | `'"'` → `'\\"'` |
| `unescape(str)` | Unescape string literals | `'\\"'` → `'"'` |
| `escapeHtml(str)` | Escape HTML entities | `'<script>'` → `'&lt;script&gt;'` |
| `unescapeHtml(str)` | Unescape HTML entities | `'&lt;'` → `'<'` |
| `escapeRegex(str)` | Escape regex special chars | `'a.b*c'` → `'a\\.b\\*c'` |
| `slugify(str, opts?)` | Create URL-safe slug | `'Hello World!'` → `'hello-world'` |
| `sanitizeFilename(str)` | Sanitize filename | `'file<>:.txt'` → `'file.txt'` |
| `stripHtml(str)` | Remove all HTML tags | `'<p>Hi</p>'` → `'Hi'` |
| `stripTags(str, allowed?)` | Remove HTML except allowed | Keep `<p>`, remove `<script>` |
| `clean(str)` | Normalize whitespace | `'a  b'` → `'a b'` |
| `normalize(str)` | Unicode NFC normalization | Composing characters |
| `latinise(str)` | Convert to ASCII | `'Héllo'` → `'Hello'` |
| `transliterate(str, locale?)` | Transliterate with locale | `'Привет'` → `'Privet'` |

### Slugify Options

```typescript
function slugify(input: string, options?: SlugifyOptions): string;

interface SlugifyOptions {
  separator?: string;    // Default: '-'
  lowercase?: boolean;   // Default: true
  strict?: boolean;      // Remove all non-alphanumeric (default: false)
  locale?: string;       // For locale-aware conversion
}

// Examples
slugify('Hello World!');                      // 'hello-world'
slugify('Hello World!', { separator: '_' });  // 'hello_world'
slugify('Héllo Wörld', { strict: true });     // 'hello-world'
```

### XSS Prevention Example

```typescript
import { escapeHtml, stripHtml } from '@oxog/strkit';

// Escape user input for safe HTML display
const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml(userInput);
// Result: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

// Or strip all HTML entirely
const stripped = stripHtml(userInput);
// Result: 'alert("xss")'  (removes all tags, keeps text)
```

---

## Category: Formatting (7 methods)

### Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `template(str, data, opts?)` | Mustache-style interpolation | `'Hello, {{name}}'` → `'Hello, John'` |
| `sprintf(format, ...args)` | Printf-style formatting | `'%s has %d apples'` |
| `mask(str, pattern)` | Apply mask pattern | `'1234567890'` → `'(123) 456-7890'` |
| `unmask(str, pattern)` | Remove mask pattern | `'(123) 456-7890'` → `'1234567890'` |
| `ordinalize(num, locale?)` | Number to ordinal | `1` → `'1st'` |
| `formatCurrency(amt, opts?)` | Format as currency | `1234.56` → `'$1,234.56'` |
| `formatNumber(num, opts?)` | Format with separators | `1234567` → `'1,234,567'` |

### Template Interpolation

```typescript
import { template } from '@oxog/strkit';

// Basic usage
template('Hello, {{name}}!', { name: 'World' });
// Result: 'Hello, World!'

// Nested properties
template('{{user.name}} is {{user.age}} years old', {
  user: { name: 'John', age: 30 }
});
// Result: 'John is 30 years old'

// Custom delimiters
template('Hello, <%name%>!', { name: 'World' }, {
  openDelimiter: '<%',
  closeDelimiter: '%>'
});
// Result: 'Hello, World!'
```

### Printf-Style Formatting

```typescript
import { sprintf } from '@oxog/strkit';

sprintf('%s has %d apples', 'John', 5);       // 'John has 5 apples'
sprintf('%05d', 42);                           // '00042'
sprintf('%.2f', 3.14159);                      // '3.14'
sprintf('%x', 255);                            // 'ff'
sprintf('%X', 255);                            // 'FF'
sprintf('%b', 5);                              // '101'
sprintf('%+d', 42);                            // '+42'

// Supported format specifiers:
// %s - string
// %d, %i - integer
// %f - float (with precision: %.2f)
// %x, %X - hexadecimal (lower/upper)
// %o - octal
// %b - binary
// %c - character from code
// %% - literal percent
```

### Masking

```typescript
import { mask, unmask } from '@oxog/strkit';

// Phone number
mask('1234567890', '(###) ###-####');
// Result: '(123) 456-7890'

// Credit card
mask('4111111111111111', '#### #### #### ####');
// Result: '4111 1111 1111 1111'

// Unmask to get raw value
unmask('(123) 456-7890', '(###) ###-####');
// Result: '1234567890'
```

---

## Category: Similarity (11 methods)

### Available Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `levenshtein(a, b)` | Edit distance | Number (0+) |
| `levenshteinRatio(a, b)` | Normalized similarity | Number (0-1) |
| `dice(a, b)` | Dice coefficient (bigram) | Number (0-1) |
| `jaroWinkler(a, b)` | Jaro-Winkler similarity | Number (0-1) |
| `hamming(a, b)` | Hamming distance | Number (requires equal length) |
| `cosine(a, b)` | Cosine similarity | Number (0-1) |
| `lcs(a, b)` | Longest common subsequence | String |
| `lcsLength(a, b)` | LCS length | Number |
| `similarity(a, b, opts?)` | Generic similarity | Number (0-1) |
| `bestMatch(str, candidates, opts?)` | Find best match | MatchResult |
| `findSimilar(str, candidates, opts?)` | Find all similar | MatchResult[] |

### Similarity Examples

```typescript
import { levenshtein, dice, jaroWinkler, bestMatch, findSimilar } from '@oxog/strkit';

// Levenshtein edit distance
levenshtein('kitten', 'sitting');  // 3 (k→s, e→i, +g)

// Dice coefficient (bigram-based)
dice('night', 'nacht');  // 0.25

// Jaro-Winkler (good for names)
jaroWinkler('DWAYNE', 'DUANE');  // ~0.84

// Find best match from candidates
bestMatch('hello', ['hallo', 'hullo', 'hey']);
// Result: { match: 'hallo', score: 0.8, index: 0 }

// Find all matches above threshold
findSimilar('apple', ['apply', 'maple', 'banana'], { threshold: 0.5 });
// Result: [{ match: 'apply', score: 0.8, index: 0 }, { match: 'maple', score: 0.6, index: 1 }]
```

### Similarity Options

```typescript
interface SimilarityOptions {
  algorithm?: 'levenshtein' | 'dice' | 'jaroWinkler' | 'hamming' | 'cosine';
  threshold?: number;  // 0-1, minimum score for filtering
}

// Use specific algorithm
similarity('hello', 'hallo', { algorithm: 'dice' });
```

---

## Category: Analysis (10 methods)

### Available Methods

| Method | Description | Example Result |
|--------|-------------|----------------|
| `wordCount(str)` | Count words | `5` |
| `charCount(str, opts?)` | Count characters | `25` |
| `lineCount(str)` | Count lines | `3` |
| `sentenceCount(str)` | Count sentences | `2` |
| `paragraphCount(str)` | Count paragraphs | `2` |
| `byteSize(str)` | UTF-8 byte size | `7` |
| `entropy(str)` | Shannon entropy | `~2.75` |
| `frequency(str, opts?)` | Character/word frequency | `{ h: 1, e: 1, l: 2, o: 1 }` |
| `readingTime(str, opts?)` | Reading time (minutes) | `2.5` |
| `speakingTime(str, opts?)` | Speaking time (minutes) | `3.3` |

### Analysis Examples

```typescript
import { wordCount, entropy, frequency, readingTime } from '@oxog/strkit';

const text = 'Hello world, how are you today?';

wordCount(text);     // 6
charCount(text);     // 31
charCount(text, { ignoreSpaces: true });  // 26

// Entropy (higher = more random/unpredictable)
entropy('password');       // ~2.75 (low entropy, predictable)
entropy('xK#9$mP@2q');     // ~3.32 (high entropy, random)

// Character frequency
frequency('hello');  // { h: 1, e: 1, l: 2, o: 1 }

// Word frequency
frequency('the quick brown fox jumps over the lazy dog', { type: 'word' });
// { the: 2, quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 1 }

// Estimated reading time
readingTime(longArticle);  // 2.5 (minutes at 200 wpm)
readingTime(longArticle, { wordsPerMinute: 250 });  // 2.0 (faster reader)
```

---

## Category: Pluralization (7 methods)

### Available Methods

| Method | Description | Example |
|--------|-------------|---------|
| `pluralize(word, count?, show?)` | Pluralize word | `'apple'` → `'apples'` |
| `singularize(word)` | Singularize word | `'apples'` → `'apple'` |
| `isPlural(word)` | Check if plural | `true` / `false` |
| `isSingular(word)` | Check if singular | `true` / `false` |
| `addPluralRule(regex, repl)` | Add custom rule | For custom words |
| `addIrregular(sing, plur)` | Add irregular word | `'opus'` → `'opera'` |
| `addUncountable(word)` | Add uncountable | `'sheep'`, `'fish'` |

### Pluralization Examples

```typescript
import { pluralize, singularize, addIrregular, addUncountable } from '@oxog/strkit';

// Basic pluralization
pluralize('apple');      // 'apples'
pluralize('child');      // 'children' (irregular)
pluralize('analysis');   // 'analyses' (Latin)

// With count
pluralize('apple', 1);           // 'apple' (singular when count is 1)
pluralize('apple', 5);           // 'apples'
pluralize('apple', 5, true);     // '5 apples' (show count)

// Singularization
singularize('apples');    // 'apple'
singularize('children');  // 'child'
singularize('analyses');  // 'analysis'

// Built-in irregulars include:
// child/children, man/men, woman/women, person/people
// tooth/teeth, foot/feet, goose/geese, mouse/mice
// criterion/criteria, phenomenon/phenomena, etc.

// Add custom irregular
addIrregular('opus', 'opera');
pluralize('opus');  // 'opera'

// Add uncountable
addUncountable('software');
pluralize('software');  // 'software' (unchanged)
```

---

## Category: Diff (7 methods)

### Available Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `diffChars(old, new)` | Character-level diff | `DiffResult[]` |
| `diffWords(old, new)` | Word-level diff | `DiffResult[]` |
| `diffLines(old, new)` | Line-level diff | `DiffResult[]` |
| `diff(old, new, opts?)` | Generic diff | `DiffResult[]` |
| `createPatch(name, old, new)` | Create unified diff | `string` |
| `applyPatch(str, patch)` | Apply patch | `string` |
| `reversePatch(patch)` | Reverse patch | `string` |

### Diff Result Structure

```typescript
interface DiffResult {
  type: 'equal' | 'add' | 'remove';
  value: string;
}
```

### Diff Examples

```typescript
import { diffChars, diffWords, createPatch, applyPatch } from '@oxog/strkit';

// Character-level diff
diffChars('hello', 'hallo');
// Result: [
//   { type: 'equal', value: 'h' },
//   { type: 'remove', value: 'e' },
//   { type: 'add', value: 'a' },
//   { type: 'equal', value: 'llo' }
// ]

// Word-level diff
diffWords('hello world', 'hello there world');
// Result: [
//   { type: 'equal', value: 'hello ' },
//   { type: 'add', value: 'there ' },
//   { type: 'equal', value: 'world' }
// ]

// Create unified diff patch
const patch = createPatch('file.txt', 'old content', 'new content');
// Returns standard unified diff format:
// --- a/file.txt
// +++ b/file.txt
// @@ -1,1 +1,1 @@
// -old content
// +new content

// Apply patch
const result = applyPatch(originalContent, patch);
```

---

## Category: Search (11 methods)

### Available Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `contains(str, search, opts?)` | Check if contains | `boolean` |
| `startsWith(str, search)` | Check if starts with | `boolean` |
| `endsWith(str, search)` | Check if ends with | `boolean` |
| `indexOf(str, search, opts?)` | First index of | `number` (-1 if not found) |
| `lastIndexOf(str, search, opts?)` | Last index of | `number` (-1 if not found) |
| `countOccurrences(str, search, opts?)` | Count occurrences | `number` |
| `positions(str, search, opts?)` | All positions | `number[]` |
| `match(str, pattern)` | First regex match | `string \| null` |
| `matchAll(str, pattern)` | All regex matches | `string[]` |
| `extract(str, pattern)` | Extract with groups | `RegExpMatchArray \| null` |
| `extractAll(str, pattern)` | Extract all with groups | `RegExpMatchArray[]` |

### Search Examples

```typescript
import { indexOf, countOccurrences, positions, matchAll, extract } from '@oxog/strkit';

const text = 'abracadabra';

// Find position
indexOf(text, 'a');                    // 0
indexOf(text, 'a', { fromIndex: 1 });  // 3

// Count occurrences
countOccurrences(text, 'a');  // 5
countOccurrences(text, 'ab'); // 2

// Get all positions
positions(text, 'a');  // [0, 3, 5, 7, 10]

// Regex matching
const str = 'hello 123 world 456';
matchAll(str, /\d+/g);  // ['123', '456']

// Extract with capture groups
extract('John: 30', /(\w+): (\d+)/);
// Result: ['John: 30', 'John', '30'] (full match + groups)

// Case-insensitive search
contains('Hello World', 'world', { caseSensitive: false });  // true
```

---

## The Chainable API (S)

The `S()` function creates an immutable chainable wrapper:

```typescript
import { S } from '@oxog/strkit';

// Basic chaining
const result = S('  Hello World  ')
  .trim()
  .lower()
  .camelCase()
  .value;  // 'helloWorld'

// Immutability - original unchanged
const a = S('hello');
const b = a.upper();
console.log(a.value);  // 'hello' (unchanged)
console.log(b.value);  // 'HELLO'

// Access value multiple ways
const chain = S('hello');
chain.value;       // 'hello'
chain.s;           // 'hello' (shorthand)
chain.toString();  // 'hello'
chain.getValue();  // 'hello'

// Properties
chain.length;      // 5

// Clone
const clone = chain.clone();
```

### Chain Interface

```typescript
interface StrKitChain {
  // Properties
  readonly value: string;
  readonly s: string;
  readonly length: number;

  // Core
  getValue(): string;
  toString(): string;
  clone(): StrKitChain;

  // Case methods (return StrKitChain)
  camelCase(): StrKitChain;
  kebabCase(): StrKitChain;
  // ... all case methods

  // Manipulation methods (return StrKitChain)
  trim(chars?: string): StrKitChain;
  truncate(length: number, options?: TruncateOptions): StrKitChain;
  // ... all manipulation methods

  // Validation methods (return boolean)
  isEmail(): boolean;
  isUrl(): boolean;
  // ... all validation methods

  // Analysis methods (return number/object)
  wordCount(): number;
  charCount(options?: AnalysisOptions): number;
  frequency(options?: { type?: 'char' | 'word' }): FrequencyResult;
  // ... all analysis methods

  // Similarity methods (return number)
  levenshtein(other: string): number;
  dice(other: string): number;
  // ... all similarity methods

  // Split methods (return arrays)
  lines(): string[];
  words(): string[];
  chars(): string[];

  // Diff methods (return DiffResult[])
  diffChars(other: string): DiffResult[];
  diffWords(other: string): DiffResult[];
  diffLines(other: string): DiffResult[];
}
```

---

## Prototype Extension

For those who prefer extending the String prototype:

```typescript
import '@oxog/strkit/extend';

// Now all strings have StrKit methods
'hello world'.camelCase();           // 'helloWorld'
'test@example.com'.isEmail();        // true
'hello'.levenshtein('hallo');        // 1
'  hello  '.trimChars();             // 'hello'

// Note: Some methods are renamed to avoid conflicts:
// trim() → trimChars()
// normalize() → normalizeStr()
// contains() → containsStr()
// match() → matchStr()
// matchAll() → matchAllStr()
// replaceAll() → replaceAllStr()
```

---

## i18n Support

### Supported Locales

| Code | Language | Special Features |
|------|----------|------------------|
| `en` | English | Default locale |
| `tr` | Turkish | i/I case handling, special pluralization |
| `de` | German | ß handling, special pluralization |
| `fr` | French | Accented character handling |
| `es` | Spanish | ñ handling |
| `pt` | Portuguese | Accented characters |
| `it` | Italian | Accented characters |
| `nl` | Dutch | ij handling |
| `pl` | Polish | Special characters (ą, ę, ł, etc.) |
| `ru` | Russian | Cyrillic transliteration |
| `ar` | Arabic | RTL support, transliteration |
| `zh` | Chinese | Pinyin transliteration |
| `ja` | Japanese | Romaji transliteration |
| `ko` | Korean | Romanization |

### Locale Usage

```typescript
import { setLocale, getLocale, getAvailableLocales } from '@oxog/strkit';

// Get available locales
getAvailableLocales();  // ['en', 'tr', 'de', 'fr', ...]

// Set global locale
setLocale('tr');
toUpper('istanbul');  // 'İSTANBUL' (Turkish rules)

// Per-operation locale (overrides global)
toUpper('istanbul', { locale: 'en' });  // 'ISTANBUL'
toUpper('istanbul', { locale: 'tr' });  // 'İSTANBUL'

// Get current locale
getLocale();  // 'tr'
```

---

## Plugin System

### Creating a Custom Plugin

```typescript
import { registerPlugin, type StrKitPlugin } from '@oxog/strkit';

const myPlugin: StrKitPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  methods: {
    reverseWords: (input: string): string => {
      return input.split(' ').reverse().join(' ');
    },
    countVowels: (input: string): number => {
      return (input.match(/[aeiouAEIOU]/g) || []).length;
    },
  },
  // Optional initialization
  init: (kernel) => {
    console.log('Plugin initialized!');
    console.log('Current locale:', kernel.getLocale());
  },
  // Optional dependencies
  dependencies: [],  // List of required plugin names
};

registerPlugin(myPlugin);

// Use via str.pluginName.method()
// str.myPlugin.reverseWords('hello world');  // 'world hello'
```

### Plugin Interface

```typescript
interface StrKitPlugin {
  name: string;                    // Unique plugin name
  version: string;                 // Semver version
  methods: Record<string, (...args: unknown[]) => unknown>;
  chainMethods?: Record<string, (...args: unknown[]) => unknown>;
  init?: (kernel: StrKitKernel) => void;
  dependencies?: string[];
}

interface StrKitKernel {
  register(plugin: StrKitPlugin): void;
  getMethod(path: string): Function | undefined;
  getPluginMethods(pluginName: string): Record<string, Function>;
  hasPlugin(name: string): boolean;
  getPlugins(): StrKitPlugin[];
  getLocale(): string;
  setLocale(locale: string): void;
}
```

---

## Types & Interfaces

### Core Types

```typescript
// Base options for most methods
interface StrKitOptions {
  locale?: string;           // ISO 639-1 locale code
  caseSensitive?: boolean;   // Default: true
}

// Truncate options
interface TruncateOptions extends StrKitOptions {
  ellipsis?: string;                     // Default: '...'
  position?: 'end' | 'middle' | 'start'; // Default: 'end'
}

// Slugify options
interface SlugifyOptions extends StrKitOptions {
  separator?: string;    // Default: '-'
  lowercase?: boolean;   // Default: true
  strict?: boolean;      // Default: false
}

// Template options
interface TemplateOptions extends StrKitOptions {
  openDelimiter?: string;   // Default: '{{'
  closeDelimiter?: string;  // Default: '}}'
}

// Similarity options
interface SimilarityOptions extends StrKitOptions {
  algorithm?: 'levenshtein' | 'dice' | 'jaroWinkler' | 'hamming' | 'cosine';
  threshold?: number;  // 0-1, for filtering
}

// Diff options
interface DiffOptions extends StrKitOptions {
  granularity?: 'char' | 'word' | 'line';
  ignoreWhitespace?: boolean;
}

// Diff result
interface DiffResult {
  type: 'equal' | 'add' | 'remove';
  value: string;
}

// Match result (for similarity)
interface MatchResult {
  match: string;
  score: number;
  index: number;
}

// Frequency result
interface FrequencyResult {
  [key: string]: number;
}

// Currency options
interface CurrencyOptions {
  locale?: string;    // e.g., 'en-US'
  currency?: string;  // ISO 4217 code, e.g., 'USD'
  symbol?: string;    // Custom symbol override
}

// Analysis options
interface AnalysisOptions {
  ignoreSpaces?: boolean;
  ignoreNewlines?: boolean;
}

// Search options
interface SearchOptions extends StrKitOptions {
  fromIndex?: number;
}
```

### Type Imports

```typescript
import type {
  StrKitChain,
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
  AnalysisOptions,
  SearchOptions,
  StrKitPlugin,
  StrKitKernel,
  StrKitLocale,
} from '@oxog/strkit';
```

---

## Usage Patterns

### Pattern 1: Data Sanitization Pipeline

**Use Case:** Processing user input for storage or display

```typescript
import { S } from '@oxog/strkit';

function sanitizeUserInput(input: string): string {
  return S(input)
    .trim()
    .collapseWhitespace()
    .escapeHtml()
    .value;
}

function createSlug(title: string): string {
  return S(title)
    .trim()
    .slugify()
    .value;
}

function sanitizeFilename(name: string): string {
  return S(name)
    .sanitizeFilename()
    .value;
}
```

### Pattern 2: Form Validation

**Use Case:** Validating form inputs

```typescript
import { isEmail, isUrl, isPhone, isEmpty, isBlank } from '@oxog/strkit';

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function validateContactForm(data: {
  email: string;
  website?: string;
  phone?: string;
  message: string;
}): ValidationResult {
  const errors: string[] = [];

  if (isEmpty(data.email) || !isEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (data.website && !isUrl(data.website)) {
    errors.push('Invalid website URL');
  }

  if (data.phone && !isPhone(data.phone)) {
    errors.push('Invalid phone number');
  }

  if (isBlank(data.message)) {
    errors.push('Message cannot be empty');
  }

  return { valid: errors.length === 0, errors };
}
```

### Pattern 3: Text Analysis

**Use Case:** Analyzing content for SEO or readability

```typescript
import { wordCount, sentenceCount, readingTime, entropy } from '@oxog/strkit';

interface ContentStats {
  words: number;
  sentences: number;
  avgWordsPerSentence: number;
  readingTimeMinutes: number;
  passwordStrength: 'weak' | 'medium' | 'strong';
}

function analyzeContent(text: string): ContentStats {
  const words = wordCount(text);
  const sentences = sentenceCount(text);

  return {
    words,
    sentences,
    avgWordsPerSentence: sentences > 0 ? words / sentences : 0,
    readingTimeMinutes: readingTime(text),
    passwordStrength: getPasswordStrength(text),
  };
}

function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  const e = entropy(password);
  if (e < 2.5) return 'weak';
  if (e < 3.5) return 'medium';
  return 'strong';
}
```

### Pattern 4: Fuzzy Search

**Use Case:** Implementing search with typo tolerance

```typescript
import { findSimilar, type MatchResult } from '@oxog/strkit';

function fuzzySearch(
  query: string,
  items: string[],
  minScore: number = 0.6
): MatchResult[] {
  return findSimilar(query, items, {
    algorithm: 'jaroWinkler',
    threshold: minScore,
  });
}

// Usage
const products = ['iPhone 15', 'iPhone 14 Pro', 'iPad Air', 'MacBook Pro'];
const results = fuzzySearch('iphone pro', products, 0.5);
// Returns matches sorted by score
```

### Pattern 5: Internationalized Content Processing

**Use Case:** Processing content with proper locale handling

```typescript
import { setLocale, slugify, pluralize, toUpper } from '@oxog/strkit';

function processForLocale(
  content: { title: string; count: number },
  locale: string
): { slug: string; displayCount: string; upperTitle: string } {
  setLocale(locale);

  return {
    slug: slugify(content.title),
    displayCount: pluralize('item', content.count, true),
    upperTitle: toUpper(content.title),
  };
}

// Turkish locale example
processForLocale({ title: 'İstanbul Rehberi', count: 5 }, 'tr');
// { slug: 'istanbul-rehberi', displayCount: '5 items', upperTitle: 'İSTANBUL REHBERİ' }
```

---

## Integration Examples

### With React

```typescript
import { useState } from 'react';
import { S, isEmail, slugify } from '@oxog/strkit';

function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');

  // Auto-generate slug from title
  const slug = S(title).trim().slugify().value;

  // Validate email
  const emailValid = email === '' || isEmail(email);

  return (
    <form>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <p>Slug: {slug}</p>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Author email"
        className={emailValid ? '' : 'error'}
      />
    </form>
  );
}
```

### With Node.js/Express

```typescript
import express from 'express';
import { escapeHtml, isEmail, sanitizeFilename, slugify } from '@oxog/strkit';

const app = express();
app.use(express.json());

// Middleware for sanitizing request body
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = escapeHtml(req.body[key]);
      }
    }
  }
  next();
});

// Blog post creation with slug generation
app.post('/api/posts', (req, res) => {
  const { title, content, authorEmail } = req.body;

  if (!isEmail(authorEmail)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const post = {
    title,
    slug: slugify(title),
    content,
    authorEmail,
  };

  // Save post...
  res.json(post);
});

// File upload with sanitized filename
app.post('/api/upload', (req, res) => {
  const originalName = req.body.filename;
  const safeName = sanitizeFilename(originalName);

  // Save file with safe name...
  res.json({ filename: safeName });
});
```

### With Next.js

```typescript
// pages/api/validate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { isEmail, isUrl, isPhone } from '@oxog/strkit';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, website, phone } = req.body;

  const validation = {
    email: isEmail(email),
    website: !website || isUrl(website),
    phone: !phone || isPhone(phone),
  };

  const isValid = Object.values(validation).every(Boolean);

  res.json({ valid: isValid, fields: validation });
}

// components/SlugPreview.tsx
'use client';

import { useState, useMemo } from 'react';
import { slugify } from '@oxog/strkit';

export function SlugPreview() {
  const [title, setTitle] = useState('');
  const slug = useMemo(() => slugify(title), [title]);

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <p>URL: /blog/{slug || 'your-post-slug'}</p>
    </div>
  );
}
```

---

## Error Handling

### Error Types

Most StrKit methods handle edge cases gracefully:

```typescript
// Empty/null input handling
camelCase('');           // ''
camelCase(null as any);  // ''
isEmail('');             // false
wordCount('');           // 0

// Hamming distance requires equal length
import { hamming } from '@oxog/strkit';

try {
  hamming('hello', 'hi');  // Throws Error
} catch (e) {
  console.error(e.message);  // 'Hamming distance requires strings of equal length'
}

// Safe alternative using levenshtein
import { levenshtein } from '@oxog/strkit';
levenshtein('hello', 'hi');  // Works with any length
```

### Safe Patterns

```typescript
import { isJson, isEmail, isUrl } from '@oxog/strkit';

// Validate before parsing
function safeParseJson<T>(input: string): T | null {
  if (!isJson(input)) return null;
  return JSON.parse(input) as T;
}

// Validate user input
function validateUrl(input: string): string | null {
  return isUrl(input) ? input : null;
}
```

---

## Performance Considerations

### Bundle Size Optimization

```typescript
// ❌ Imports entire library
import { str } from '@oxog/strkit';
str.case.camel('hello');

// ✅ Tree-shakeable - only imports what you use
import { camelCase, isEmail } from '@oxog/strkit';
camelCase('hello');
isEmail('test@test.com');
```

### Algorithm Complexity

| Method | Time Complexity | Space Complexity |
|--------|-----------------|------------------|
| `camelCase` | O(n) | O(n) |
| `levenshtein` | O(n×m) | O(min(n,m)) |
| `dice` | O(n+m) | O(n+m) |
| `jaroWinkler` | O(n×m) | O(n+m) |
| `lcs` | O(n×m) | O(n×m) |
| `diffChars` | O(n×m) | O(n×m) |

### Optimization Tips

1. **Use direct imports** for tree-shaking in production builds
2. **Cache chain instances** if reusing the same string
3. **Use appropriate similarity algorithm**:
   - `jaroWinkler` for names (O(n×m) but optimized for short strings)
   - `dice` for longer texts (O(n+m))
   - `levenshtein` for edit distance needs

---

## FAQ

### Q: How do I handle null/undefined values?

**A:** All methods handle null/undefined gracefully by returning empty string or false:

```typescript
camelCase(null as any);  // ''
isEmail(undefined as any);  // false
```

### Q: Does StrKit work in browsers?

**A:** Yes, StrKit works in all modern browsers. It uses standard JavaScript/TypeScript with no Node.js-specific APIs.

### Q: How do I add support for a new locale?

**A:** Use `registerLocale`:

```typescript
import { registerLocale, type StrKitLocale } from '@oxog/strkit';

const myLocale: StrKitLocale = {
  code: 'xx',
  name: 'My Language',
  case: { upper: {}, lower: {} },
  plural: { rules: [], irregulars: {}, uncountables: [] },
  transliterate: {},
  numbers: { decimal: '.', thousands: ',' },
  ordinals: { default: 'th', rules: [] },
};

registerLocale(myLocale);
```

### Q: Is the prototype extension safe to use?

**A:** The prototype extension is opt-in and generally safe. It's designed to not conflict with native String methods. However, for library code that will be used by others, prefer direct imports to avoid global pollution.

### Q: How do I migrate from lodash string methods?

**A:** Most methods have direct equivalents:

```typescript
// lodash → strkit
_.camelCase(s)  →  camelCase(s)
_.kebabCase(s)  →  kebabCase(s)
_.snakeCase(s)  →  snakeCase(s)
_.capitalize(s) →  capitalize(s)
_.trim(s)       →  trim(s)
_.truncate(s, { length: 10 }) → truncate(s, 10)
```

---

## Changelog (v1.0.0)

### Added (2024-12-27)

- Zero-dependency implementation with 115+ methods
- 10 plugin categories: case, manipulation, validation, sanitization, formatting, similarity, analysis, pluralization, diff, search
- 4 API styles: Namespace, Direct Import, Chainable, Prototype Extension
- 14 locales with i18n support
- Full TypeScript support with strict mode
- Tree-shakeable ESM and CJS builds
- VitePress documentation site
- 656+ unit tests with 96%+ coverage

---

## Links

- **NPM:** https://www.npmjs.com/package/@oxog/strkit
- **GitHub:** https://github.com/ersinkoc/strkit
- **Documentation:** https://strkit.oxog.dev
- **Issues:** https://github.com/ersinkoc/strkit/issues
- **Changelog:** https://github.com/ersinkoc/strkit/blob/main/CHANGELOG.md

---

## LLM Usage Notes

### Recommended Prompts

When helping users with @oxog/strkit:

1. "Help me validate form inputs using @oxog/strkit"
2. "Convert this string to different case formats"
3. "Implement fuzzy search with strkit similarity"
4. "Sanitize user input for XSS prevention"
5. "Create URL slugs from titles"
6. "Generate text diffs between two strings"

### Common Misconceptions

1. **Misconception:** StrKit requires lodash or other dependencies
   **Reality:** Zero runtime dependencies - all algorithms implemented from scratch

2. **Misconception:** The `S()` chain mutates the original string
   **Reality:** All chain operations are immutable - each method returns a new chain instance

3. **Misconception:** Prototype extension is automatic
   **Reality:** You must explicitly import `'@oxog/strkit/extend'` to enable prototype methods

4. **Misconception:** All methods work the same across locales
   **Reality:** Case conversion, pluralization, and transliteration are locale-aware

### Code Generation Guidelines

When generating code for @oxog/strkit:

- **Prefer direct imports** for production code (tree-shaking)
- **Use the `S()` chain** for multiple transformations
- **Always validate user input** before processing
- **Include proper TypeScript types** when applicable
- **Handle edge cases** (empty strings, null values)
- **Use appropriate similarity algorithm** for the use case
- **Set locale explicitly** when i18n matters

---

## Document Metadata

- **Generated:** 2024-12-28
- **Package Version:** 1.0.0
- **Documentation Version:** 1.0
- **Format:** LLM-Optimized Markdown
- **Estimated Tokens:** ~12,000
