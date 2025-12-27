# @oxog/strkit - Zero-Dependency String Toolkit

## Package Identity

- **NPM Package**: `@oxog/strkit`
- **GitHub Repository**: `https://github.com/ersinkoc/strkit`
- **Documentation Site**: `https://strkit.oxog.dev`
- **License**: MIT
- **Author**: ersinkoc

**NO social media, Discord, email, or external links. Only GitHub repo and documentation site.**

## Package Description

The ultimate zero-dependency string manipulation toolkit for JavaScript/TypeScript. Provides 115+ methods across 10 categories with 4 flexible API styles, i18n support, and a micro-kernel plugin architecture.

StrKit consolidates functionality from dozens of string libraries (voca, string.js, validator, slugify, pluralize, string-similarity, etc.) into a single, cohesive, zero-dependency package with consistent API design and full TypeScript support.

---

## NON-NEGOTIABLE RULES

These rules are ABSOLUTE and must be followed without exception:

### 1. ZERO DEPENDENCIES
```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```
Implement EVERYTHING from scratch. No runtime dependencies allowed. This includes:
- All string algorithms (Levenshtein, Dice, Jaro-Winkler, etc.)
- All validation logic (email, URL, UUID, etc.)
- All i18n/locale handling
- All diff algorithms

### 2. 100% TEST COVERAGE
- Every line of code must be tested
- Every branch must be tested
- All tests must pass (100% success rate)
- Use Vitest for testing
- Test all 4 API styles
- Test all locales
- Test edge cases: empty strings, unicode, emojis, RTL text

### 3. DEVELOPMENT WORKFLOW
Create these documents FIRST, before any code:
1. **SPECIFICATION.md** - Complete package specification
2. **IMPLEMENTATION.md** - Architecture and design decisions
3. **TASKS.md** - Ordered task list with dependencies

Only after these documents are complete, implement the code following TASKS.md sequentially.

### 4. TYPESCRIPT STRICT MODE
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 5. NO EXTERNAL LINKS
- ❌ No social media (Twitter, LinkedIn, etc.)
- ❌ No Discord/Slack links
- ❌ No email addresses
- ❌ No donation/sponsor links
- ✅ Only GitHub repo: github.com/ersinkoc/strkit
- ✅ Only docs site: strkit.oxog.dev

---

## ARCHITECTURE: MICRO-KERNEL + CORE PLUGINS

```
src/
├── core/
│   ├── kernel.ts          # Plugin registry, loader, initialization
│   ├── chain.ts           # Immutable S() chainable wrapper
│   ├── types.ts           # Core type definitions
│   ├── locale.ts          # i18n manager
│   └── utils.ts           # Internal utilities (not exported)
├── plugins/
│   ├── case/
│   │   ├── index.ts       # Plugin entry
│   │   ├── camel.ts
│   │   ├── kebab.ts
│   │   ├── snake.ts
│   │   ├── pascal.ts
│   │   ├── title.ts
│   │   ├── sentence.ts
│   │   ├── constant.ts
│   │   ├── dot.ts
│   │   ├── path.ts
│   │   ├── header.ts
│   │   ├── swap.ts
│   │   ├── upper.ts
│   │   ├── lower.ts
│   │   └── capitalize.ts
│   ├── manipulation/
│   │   ├── index.ts
│   │   ├── trim.ts
│   │   ├── pad.ts
│   │   ├── repeat.ts
│   │   ├── reverse.ts
│   │   ├── truncate.ts
│   │   ├── wrap.ts
│   │   ├── splice.ts
│   │   ├── insert.ts
│   │   ├── remove.ts
│   │   ├── replace.ts
│   │   ├── between.ts
│   │   ├── before.ts
│   │   └── after.ts
│   ├── validation/
│   │   ├── index.ts
│   │   ├── email.ts
│   │   ├── url.ts
│   │   ├── uuid.ts
│   │   ├── ip.ts
│   │   ├── phone.ts
│   │   ├── creditCard.ts
│   │   ├── empty.ts
│   │   ├── alpha.ts
│   │   ├── numeric.ts
│   │   ├── hex.ts
│   │   ├── base64.ts
│   │   └── json.ts
│   ├── sanitization/
│   │   ├── index.ts
│   │   ├── escape.ts
│   │   ├── escapeHtml.ts
│   │   ├── escapeRegex.ts
│   │   ├── slugify.ts
│   │   ├── filename.ts
│   │   ├── stripHtml.ts
│   │   ├── clean.ts
│   │   ├── normalize.ts
│   │   ├── latinise.ts
│   │   └── transliterate.ts
│   ├── formatting/
│   │   ├── index.ts
│   │   ├── template.ts
│   │   ├── sprintf.ts
│   │   ├── mask.ts
│   │   ├── ordinalize.ts
│   │   └── currency.ts
│   ├── similarity/
│   │   ├── index.ts
│   │   ├── levenshtein.ts
│   │   ├── dice.ts
│   │   ├── jaroWinkler.ts
│   │   ├── hamming.ts
│   │   ├── cosine.ts
│   │   ├── lcs.ts
│   │   ├── bestMatch.ts
│   │   └── findSimilar.ts
│   ├── analysis/
│   │   ├── index.ts
│   │   ├── wordCount.ts
│   │   ├── charCount.ts
│   │   ├── lineCount.ts
│   │   ├── sentenceCount.ts
│   │   ├── paragraphCount.ts
│   │   ├── byteSize.ts
│   │   ├── entropy.ts
│   │   └── frequency.ts
│   ├── pluralization/
│   │   ├── index.ts
│   │   ├── plural.ts
│   │   ├── singular.ts
│   │   ├── rules.ts
│   │   └── irregulars.ts
│   ├── diff/
│   │   ├── index.ts
│   │   ├── diff.ts
│   │   ├── diffWords.ts
│   │   ├── diffChars.ts
│   │   ├── diffLines.ts
│   │   ├── patch.ts
│   │   └── createPatch.ts
│   └── search/
│       ├── index.ts
│       ├── contains.ts
│       ├── startsWith.ts
│       ├── endsWith.ts
│       ├── indexOf.ts
│       ├── countOccurrences.ts
│       ├── positions.ts
│       └── match.ts
├── locales/
│   ├── index.ts           # Locale registry
│   ├── en.ts
│   ├── tr.ts
│   ├── de.ts
│   ├── fr.ts
│   ├── es.ts
│   ├── pt.ts
│   ├── it.ts
│   ├── nl.ts
│   ├── pl.ts
│   ├── ru.ts
│   ├── ar.ts
│   ├── zh.ts
│   ├── ja.ts
│   └── ko.ts
├── extend.ts              # Optional prototype extension
└── index.ts               # Public API exports
```

---

## CORE FEATURES

### 1. Case Conversion (~14 methods)

```typescript
import { S, str, camelCase } from '@oxog/strkit';

// Namespace
str.case.camel('hello world');       // "helloWorld"
str.case.kebab('helloWorld');        // "hello-world"
str.case.snake('helloWorld');        // "hello_world"
str.case.pascal('hello world');      // "HelloWorld"
str.case.title('hello world');       // "Hello World"
str.case.sentence('hello world');    // "Hello world"
str.case.constant('hello world');    // "HELLO_WORLD"
str.case.dot('hello world');         // "hello.world"
str.case.path('hello world');        // "hello/world"
str.case.header('hello world');      // "Hello-World"
str.case.swap('Hello World');        // "hELLO wORLD"
str.case.upper('hello');             // "HELLO"
str.case.lower('HELLO');             // "hello"
str.case.capitalize('hello');        // "Hello"

// With locale support
str.case.upper('istanbul', { locale: 'tr' }); // "İSTANBUL" (not "ISTANBUL")
str.case.lower('ISTANBUL', { locale: 'tr' }); // "ıstanbul" (not "istanbul")

// Chainable
S('hello world').camelCase().value();

// Direct import
camelCase('hello world');
```

### 2. Manipulation (~20 methods)

```typescript
str.manipulation.trim('  hello  ');              // "hello"
str.manipulation.trimStart('  hello');           // "hello"
str.manipulation.trimEnd('hello  ');             // "hello"
str.manipulation.pad('hello', 10);               // "  hello   "
str.manipulation.padStart('5', 3, '0');          // "005"
str.manipulation.padEnd('5', 3, '0');            // "500"
str.manipulation.repeat('ab', 3);                // "ababab"
str.manipulation.reverse('hello');               // "olleh"
str.manipulation.truncate('hello world', 8);     // "hello..."
str.manipulation.truncate('hello world', 8, { 
  ellipsis: '…', 
  position: 'middle' 
}); // "hel…rld"
str.manipulation.wrap('hello', '"');             // '"hello"'
str.manipulation.wrap('hello', '[', ']');        // "[hello]"
str.manipulation.unwrap('"hello"', '"');         // "hello"
str.manipulation.splice('hello', 2, 2, 'XY');    // "heXYo"
str.manipulation.insert('hello', 2, 'XY');       // "heXYllo"
str.manipulation.remove('hello', 1, 3);          // "ho"
str.manipulation.replace('hello', 'l', 'L');     // "heLlo"
str.manipulation.replaceAll('hello', 'l', 'L');  // "heLLo"
str.manipulation.between('<tag>', '<', '>');     // "tag"
str.manipulation.before('hello@world', '@');     // "hello"
str.manipulation.after('hello@world', '@');      // "world"

// Chainable
S('  hello world  ')
  .trim()
  .truncate(8)
  .wrap('[', ']')
  .value(); // "[hello...]"
```

### 3. Validation (~18 methods)

```typescript
str.validate.email('test@example.com');      // true
str.validate.url('https://example.com');     // true
str.validate.uuid('550e8400-e29b-41d4-a716-446655440000'); // true
str.validate.ip('192.168.1.1');              // true
str.validate.ipv4('192.168.1.1');            // true
str.validate.ipv6('::1');                    // true
str.validate.phone('+1-555-555-5555');       // true
str.validate.creditCard('4111111111111111'); // true
str.validate.empty('');                      // true
str.validate.blank('   ');                   // true
str.validate.alpha('hello');                 // true
str.validate.numeric('12345');               // true
str.validate.alphanumeric('hello123');       // true
str.validate.hex('ff00ff');                  // true
str.validate.base64('aGVsbG8=');             // true
str.validate.json('{"key":"value"}');        // true
str.validate.upperCase('HELLO');             // true
str.validate.lowerCase('hello');             // true

// Direct import with is* prefix
import { isEmail, isUrl, isUuid } from '@oxog/strkit';
isEmail('test@example.com'); // true

// Chainable returns boolean
S('test@example.com').isEmail(); // true
```

### 4. Sanitization (~13 methods)

```typescript
str.sanitize.escape('Hello "World"');           // "Hello \"World\""
str.sanitize.unescape('Hello \\"World\\"');     // 'Hello "World"'
str.sanitize.escapeHtml('<script>alert("xss")</script>'); 
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
str.sanitize.unescapeHtml('&lt;div&gt;');       // "<div>"
str.sanitize.escapeRegex('a.b*c?');             // "a\\.b\\*c\\?"
str.sanitize.slugify('Héllo Wörld!');           // "hello-world"
str.sanitize.slugify('Merhaba Dünya!', { locale: 'tr' }); // "merhaba-dunya"
str.sanitize.filename('file<>:"/\\|?*.txt');    // "file.txt"
str.sanitize.stripHtml('<p>Hello <b>World</b></p>'); // "Hello World"
str.sanitize.stripTags('<p>Hello</p>', ['p']);  // "Hello" (keeps p content)
str.sanitize.clean('hello   world\n\n\ntest');  // "hello world test"
str.sanitize.normalize('Ⅷ ① ﬁ');               // "VIII 1 fi"
str.sanitize.latinise('Cześć');                 // "Czesc"
str.sanitize.transliterate('Привет', 'ru');     // "Privet"

// Chainable
S('  <p>Héllo Wörld!</p>  ')
  .trim()
  .stripHtml()
  .slugify()
  .value(); // "hello-world"
```

### 5. Formatting (~8 methods)

```typescript
// Template interpolation
str.format.template('Hello, {{name}}!', { name: 'World' }); // "Hello, World!"
str.format.template('{{user.name}} is {{user.age}}', { 
  user: { name: 'John', age: 30 } 
}); // "John is 30"

// Printf-style formatting
str.format.sprintf('%s has %d apples', 'John', 5);  // "John has 5 apples"
str.format.sprintf('%05d', 42);                      // "00042"
str.format.sprintf('%.2f', 3.14159);                 // "3.14"
str.format.sprintf('%x', 255);                       // "ff"

// Masking
str.format.mask('1234567890', '(###) ###-####');    // "(123) 456-7890"
str.format.mask('4111111111111111', '#### #### #### ####'); // "4111 1111 1111 1111"
str.format.unmask('(123) 456-7890', '(###) ###-####'); // "1234567890"

// Ordinalize
str.format.ordinalize(1);   // "1st"
str.format.ordinalize(2);   // "2nd"
str.format.ordinalize(3);   // "3rd"
str.format.ordinalize(4);   // "4th"
str.format.ordinalize(11);  // "11th"
str.format.ordinalize(21);  // "21st"

// Currency
str.format.currency(1234.56, { locale: 'en-US', currency: 'USD' }); // "$1,234.56"
str.format.currency(1234.56, { locale: 'tr-TR', currency: 'TRY' }); // "₺1.234,56"

// Chainable
S('Hello, {{name}}!').template({ name: 'World' }).value();
```

### 6. Similarity (~8 methods)

```typescript
// Levenshtein distance (edit distance)
str.similarity.levenshtein('kitten', 'sitting');     // 3
str.similarity.levenshteinRatio('kitten', 'sitting'); // 0.571...

// Dice coefficient
str.similarity.dice('night', 'nacht');               // 0.25

// Jaro-Winkler similarity
str.similarity.jaroWinkler('DWAYNE', 'DUANE');       // 0.84

// Hamming distance (same length strings)
str.similarity.hamming('karolin', 'kathrin');        // 3

// Cosine similarity (based on word frequency)
str.similarity.cosine('hello world', 'world hello'); // 1.0

// Longest Common Subsequence
str.similarity.lcs('ABCDGH', 'AEDFHR');              // "ADH"
str.similarity.lcsLength('ABCDGH', 'AEDFHR');        // 3

// Find best match from array
str.similarity.bestMatch('hello', ['hallo', 'hullo', 'hey']);
// { match: 'hallo', score: 0.8, index: 0 }

// Find all similar strings above threshold
str.similarity.findSimilar('apple', ['apply', 'maple', 'banana'], { 
  threshold: 0.5, 
  algorithm: 'levenshtein' 
});
// [{ match: 'apply', score: 0.8 }, { match: 'maple', score: 0.6 }]
```

### 7. Analysis (~10 methods)

```typescript
str.analysis.wordCount('Hello world, how are you?');      // 5
str.analysis.charCount('Hello');                          // 5
str.analysis.charCount('Hello', { ignoreSpaces: true });  // 5
str.analysis.lineCount('line1\nline2\nline3');            // 3
str.analysis.sentenceCount('Hello. How are you? Fine!');  // 3
str.analysis.paragraphCount('Para 1\n\nPara 2');          // 2
str.analysis.byteSize('Hello');                           // 5
str.analysis.byteSize('Merhaba');                         // 7 (UTF-8)
str.analysis.entropy('password');                         // ~2.75 (low entropy)
str.analysis.entropy('xK#9$mP@2q');                       // ~3.32 (high entropy)
str.analysis.frequency('hello');  
// { h: 1, e: 1, l: 2, o: 1 }
str.analysis.frequency('hello world', { type: 'word' });
// { hello: 1, world: 1 }

// Chainable
S('Hello world').wordCount(); // 2
```

### 8. Pluralization (~7 methods)

```typescript
str.plural.plural('apple');              // "apples"
str.plural.plural('child');              // "children"
str.plural.plural('person');             // "people"
str.plural.plural('apple', 0);           // "apples"
str.plural.plural('apple', 1);           // "apple"
str.plural.plural('apple', 5);           // "apples"
str.plural.plural('apple', 5, true);     // "5 apples"

str.plural.singular('apples');           // "apple"
str.plural.singular('children');         // "child"
str.plural.singular('people');           // "person"

str.plural.isPlural('apples');           // true
str.plural.isSingular('apple');          // true

// Custom rules
str.plural.addRule(/gex$/i, 'gexii');
str.plural.plural('regex');              // "regexii"

str.plural.addIrregular('opus', 'opera');
str.plural.plural('opus');               // "opera"

str.plural.addUncountable('sheep');
str.plural.plural('sheep');              // "sheep"

// With locale (Turkish example)
str.plural.plural('elma', 5, true, { locale: 'tr' }); // "5 elma"
```

### 9. Diff (~7 methods)

```typescript
// Character-level diff
str.diff.diffChars('hello', 'hallo');
// [
//   { type: 'equal', value: 'h' },
//   { type: 'remove', value: 'e' },
//   { type: 'add', value: 'a' },
//   { type: 'equal', value: 'llo' }
// ]

// Word-level diff
str.diff.diffWords('hello world', 'hello there world');
// [
//   { type: 'equal', value: 'hello ' },
//   { type: 'add', value: 'there ' },
//   { type: 'equal', value: 'world' }
// ]

// Line-level diff
str.diff.diffLines('line1\nline2', 'line1\nline3');

// Generic diff
str.diff.diff('old text', 'new text', { granularity: 'word' });

// Create unified patch
str.diff.createPatch('file.txt', 'old content', 'new content');
// Returns unified diff format string

// Apply patch
str.diff.patch(originalText, patchString);

// Reverse patch
str.diff.unpatch(patchedText, patchString);
```

### 10. Search (~10 methods)

```typescript
str.search.contains('hello world', 'world');        // true
str.search.contains('hello world', 'World', { 
  caseSensitive: false 
}); // true

str.search.startsWith('hello world', 'hello');      // true
str.search.endsWith('hello world', 'world');        // true

str.search.indexOf('hello world', 'o');             // 4
str.search.lastIndexOf('hello world', 'o');         // 7
str.search.indexOf('hello world', 'o', { fromIndex: 5 }); // 7

str.search.countOccurrences('abracadabra', 'a');    // 5
str.search.countOccurrences('hello hello', 'hello'); // 2

str.search.positions('abracadabra', 'a');           // [0, 3, 5, 7, 10]

str.search.match('hello 123 world 456', /\d+/);     // "123"
str.search.matchAll('hello 123 world 456', /\d+/g); // ["123", "456"]
```

---

## API STYLES

### Style 1: Namespace (str.*)

```typescript
import { str } from '@oxog/strkit';

str.case.camel('hello world');
str.validate.email('test@test.com');
str.similarity.levenshtein('cat', 'bat');
```

### Style 2: Direct Import (Tree-Shakeable)

```typescript
import { 
  camelCase, 
  isEmail, 
  levenshtein,
  slugify 
} from '@oxog/strkit';

camelCase('hello world');
isEmail('test@test.com');
```

### Style 3: Chainable (Immutable)

```typescript
import { S } from '@oxog/strkit';

const result = S('  Hello World  ')
  .trim()
  .lower()
  .camelCase()
  .truncate(8)
  .value();

// Immutable - each operation returns new instance
const a = S('hello');
const b = a.upper();
console.log(a.value()); // "hello" (unchanged)
console.log(b.value()); // "HELLO"

// Multiple ways to get value
S('hello').value();     // "hello"
S('hello').toString();  // "hello"
S('hello').s;           // "hello" (shorthand)
```

### Style 4: Prototype Extension (Opt-in)

```typescript
import '@oxog/strkit/extend';

'hello world'.camelCase();     // "helloWorld"
'test@test.com'.isEmail();     // true
'  hello  '.trim().upper();    // "HELLO"
```

---

## PLUGIN SYSTEM

### Plugin Interface

```typescript
interface StrKitPlugin {
  name: string;
  version: string;
  methods: Record<string, Function>;
  chainMethods?: Record<string, Function>;
  init?: (kernel: StrKitKernel) => void;
}
```

### Creating a Plugin

```typescript
const myPlugin: StrKitPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  methods: {
    myMethod: (str: string) => str.split('').reverse().join('')
  },
  chainMethods: {
    myMethod: function(this: StrKitChain) {
      return this._create(this._value.split('').reverse().join(''));
    }
  }
};
```

### Registering a Plugin

```typescript
import { registerPlugin, str, S } from '@oxog/strkit';

registerPlugin(myPlugin);

// Now available as:
str.myPlugin.myMethod('hello');  // "olleh"
S('hello').myMethod().value();   // "olleh"
```

---

## i18n SUPPORT

### Setting Locale

```typescript
import { setLocale, getLocale } from '@oxog/strkit';

setLocale('tr');
console.log(getLocale()); // 'tr'

// Per-operation locale override
str.case.upper('istanbul', { locale: 'tr' }); // "İSTANBUL"
str.case.upper('istanbul', { locale: 'en' }); // "ISTANBUL"
```

### Locale Data Structure

```typescript
interface StrKitLocale {
  code: string;
  name: string;
  
  // Case conversion rules
  case: {
    upper: Record<string, string>;  // ı -> I (en), ı -> İ (tr)
    lower: Record<string, string>;  // I -> i (en), I -> ı (tr)
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
    decimal: string;
    thousands: string;
  };
}
```

### Core Locales

Implement these 14 locales:
- en (English) - default
- tr (Turkish)
- de (German)
- fr (French)
- es (Spanish)
- pt (Portuguese)
- it (Italian)
- nl (Dutch)
- pl (Polish)
- ru (Russian)
- ar (Arabic)
- zh (Chinese)
- ja (Japanese)
- ko (Korean)

---

## TYPE DEFINITIONS

```typescript
// Core types
export interface StrKitOptions {
  locale?: string;
  caseSensitive?: boolean;
}

export interface TruncateOptions extends StrKitOptions {
  ellipsis?: string;
  position?: 'end' | 'middle' | 'start';
}

export interface SimilarityOptions extends StrKitOptions {
  algorithm?: 'levenshtein' | 'dice' | 'jaroWinkler' | 'hamming' | 'cosine';
  threshold?: number;
}

export interface DiffResult {
  type: 'equal' | 'add' | 'remove';
  value: string;
}

export interface MatchResult {
  match: string;
  score: number;
  index: number;
}

// Chain type with all methods
export interface StrKitChain {
  // Properties
  readonly length: number;
  readonly s: string;
  
  // Core
  value(): string;
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
  
  // Manipulation methods
  trim(): StrKitChain;
  trimStart(): StrKitChain;
  trimEnd(): StrKitChain;
  pad(length: number, char?: string): StrKitChain;
  padStart(length: number, char?: string): StrKitChain;
  padEnd(length: number, char?: string): StrKitChain;
  repeat(count: number): StrKitChain;
  reverse(): StrKitChain;
  truncate(length: number, options?: TruncateOptions): StrKitChain;
  wrap(wrapper: string, end?: string): StrKitChain;
  unwrap(wrapper: string, end?: string): StrKitChain;
  append(str: string): StrKitChain;
  prepend(str: string): StrKitChain;
  insert(index: number, str: string): StrKitChain;
  remove(start: number, count: number): StrKitChain;
  replace(search: string | RegExp, replacement: string): StrKitChain;
  replaceAll(search: string | RegExp, replacement: string): StrKitChain;
  between(start: string, end: string): StrKitChain;
  before(search: string): StrKitChain;
  after(search: string): StrKitChain;
  
  // Sanitization methods
  escape(): StrKitChain;
  unescape(): StrKitChain;
  escapeHtml(): StrKitChain;
  unescapeHtml(): StrKitChain;
  escapeRegex(): StrKitChain;
  slugify(options?: StrKitOptions): StrKitChain;
  filename(): StrKitChain;
  stripHtml(): StrKitChain;
  clean(): StrKitChain;
  normalize(): StrKitChain;
  latinise(): StrKitChain;
  transliterate(): StrKitChain;
  
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
  charCount(options?: { ignoreSpaces?: boolean }): number;
  lineCount(): number;
  sentenceCount(): number;
  paragraphCount(): number;
  byteSize(): number;
  entropy(): number;
  frequency(): Record<string, number>;
  
  // Search methods
  contains(search: string, options?: StrKitOptions): boolean;
  startsWith(search: string): boolean;
  endsWith(search: string): boolean;
  indexOf(search: string, options?: { fromIndex?: number }): number;
  lastIndexOf(search: string): number;
  countOccurrences(search: string): number;
  positions(search: string): number[];
  match(pattern: RegExp): string | null;
  matchAll(pattern: RegExp): string[];
  
  // Similarity methods (return primitives)
  levenshtein(other: string): number;
  dice(other: string): number;
  jaroWinkler(other: string): number;
  similarity(other: string, options?: SimilarityOptions): number;
  
  // Diff methods
  diffChars(other: string): DiffResult[];
  diffWords(other: string): DiffResult[];
  diff(other: string, options?: { granularity?: 'char' | 'word' | 'line' }): DiffResult[];
  
  // Pluralization
  plural(count?: number, showCount?: boolean): StrKitChain;
  singular(): StrKitChain;
  isPlural(): boolean;
  isSingular(): boolean;
}
```

---

## PROJECT STRUCTURE

```
strkit/
├── src/
│   ├── core/
│   │   ├── kernel.ts
│   │   ├── chain.ts
│   │   ├── types.ts
│   │   ├── locale.ts
│   │   └── utils.ts
│   ├── plugins/
│   │   ├── case/
│   │   ├── manipulation/
│   │   ├── validation/
│   │   ├── sanitization/
│   │   ├── formatting/
│   │   ├── similarity/
│   │   ├── analysis/
│   │   ├── pluralization/
│   │   ├── diff/
│   │   └── search/
│   ├── locales/
│   │   ├── index.ts
│   │   ├── en.ts
│   │   ├── tr.ts
│   │   └── ... (12 more)
│   ├── extend.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   ├── plugins/
│   │   └── locales/
│   ├── integration/
│   │   ├── chain.test.ts
│   │   ├── namespace.test.ts
│   │   ├── direct-import.test.ts
│   │   └── extend.test.ts
│   └── fixtures/
├── examples/
│   ├── basic/
│   │   ├── case-conversion.ts
│   │   ├── validation.ts
│   │   └── chaining.ts
│   └── advanced/
│       ├── custom-plugin.ts
│       ├── i18n.ts
│       └── diff-patch.ts
├── website/                  # GitHub Pages / strkit.oxog.dev
│   ├── index.html           # Landing page
│   ├── docs/
│   │   ├── index.html
│   │   ├── getting-started.html
│   │   ├── api/
│   │   │   ├── index.html
│   │   │   ├── case.html
│   │   │   ├── manipulation.html
│   │   │   ├── validation.html
│   │   │   ├── sanitization.html
│   │   │   ├── formatting.html
│   │   │   ├── similarity.html
│   │   │   ├── analysis.html
│   │   │   ├── pluralization.html
│   │   │   ├── diff.html
│   │   │   └── search.html
│   │   ├── examples/
│   │   └── playground/
│   │       └── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── 404.html
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
└── .gitignore
```

---

## DOCUMENTATION WEBSITE

Build a complete documentation site at `strkit.oxog.dev` using:
- **Tailwind CSS** (via CDN)
- **Alpine.js** (via CDN)
- **Prism.js** for syntax highlighting

### Required Pages

1. **Landing Page** (index.html)
   - Hero with "The Ultimate String Toolkit"
   - Install commands (npm/yarn/pnpm tabs)
   - Feature highlights (10 categories)
   - Quick example showing all 4 API styles
   - Bundle size badges (< 15KB)
   - Zero dependencies badge

2. **Getting Started**
   - Installation
   - Quick start with all 4 API styles
   - Configuration (locale, etc.)

3. **API Reference** (per category)
   - Each method with signature
   - Parameters with types
   - Return values
   - Examples
   - Notes on locale support

4. **Examples**
   - Basic usage
   - Chaining patterns
   - i18n/locale examples
   - Custom plugins
   - Real-world scenarios

5. **Interactive Playground**
   - Code editor (Monaco or CodeMirror)
   - Live output
   - Preset examples dropdown
   - Share functionality

### Design Requirements
- Dark theme (primary)
- Mobile responsive
- Fast loading (< 1.5s FCP)
- Syntax highlighted code blocks
- Copy-to-clipboard buttons
- Sticky navigation

---

## IMPLEMENTATION CHECKLIST

### Before starting implementation:
- [ ] Create SPECIFICATION.md with complete package spec
- [ ] Create IMPLEMENTATION.md with architecture design
- [ ] Create TASKS.md with ordered task list (100+ tasks expected)

### During implementation:
- [ ] Implement micro-kernel first (plugin registry, loader)
- [ ] Implement immutable chain wrapper (S())
- [ ] Implement each plugin category one by one
- [ ] Maintain 100% test coverage throughout
- [ ] Write JSDoc for all public APIs
- [ ] Implement all 14 locales
- [ ] Create examples for each feature

### Before completion:
- [ ] All tests passing (100% success)
- [ ] Coverage report shows 100%
- [ ] README.md complete with all sections
- [ ] CHANGELOG.md initialized
- [ ] Website functional at strkit.oxog.dev
- [ ] Package builds without errors
- [ ] All 4 API styles working
- [ ] Tree-shaking verified
- [ ] Bundle size < 15KB gzipped

---

## QUALITY STANDARDS

- Zero runtime dependencies
- TypeScript strict mode
- 100% test coverage
- 100% test success
- JSDoc on every public export
- ESLint + Prettier
- Git hooks for quality checks
- Performance benchmarks included

---

## BEGIN IMPLEMENTATION

Start by creating SPECIFICATION.md with the complete package specification based on the features and API design above. Include every method signature, every type, every option. This document should be comprehensive enough that implementation becomes straightforward.

Then proceed with IMPLEMENTATION.md documenting:
- Micro-kernel architecture details
- Plugin loading mechanism
- Immutable chain implementation
- i18n system design
- Tree-shaking strategy

Finally, create TASKS.md with 100+ granular tasks covering:
- Core infrastructure
- Each plugin category
- Each locale
- Documentation website
- Examples
- Tests

Remember: This is a comprehensive string toolkit that will replace dozens of packages. It must be perfect. Zero dependencies, 100% test coverage, complete documentation, professional website.