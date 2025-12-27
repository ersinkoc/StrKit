# @oxog/strkit

The ultimate zero-dependency string manipulation toolkit for JavaScript/TypeScript.

[![npm version](https://img.shields.io/npm/v/@oxog/strkit.svg)](https://www.npmjs.com/package/@oxog/strkit)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@oxog/strkit)](https://bundlephobia.com/package/@oxog/strkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Zero Dependencies** - No external dependencies, everything implemented from scratch
- **115+ Methods** - Comprehensive string manipulation across 10 categories
- **4 API Styles** - Namespace, Direct Import, Chainable, and Prototype Extension
- **TypeScript First** - Full TypeScript support with strict mode
- **Tree-Shakeable** - Import only what you need
- **i18n Support** - 14 locales with locale-aware operations
- **Plugin Architecture** - Extend with custom plugins

## Installation

```bash
npm install @oxog/strkit
```

```bash
yarn add @oxog/strkit
```

```bash
pnpm add @oxog/strkit
```

## Quick Start

### Style 1: Namespace API

```typescript
import { str } from '@oxog/strkit';

str.case.camel('hello world');        // 'helloWorld'
str.validate.email('test@test.com');  // true
str.similarity.levenshtein('cat', 'bat'); // 1
```

### Style 2: Direct Import (Tree-Shakeable)

```typescript
import { camelCase, isEmail, levenshtein } from '@oxog/strkit';

camelCase('hello world');  // 'helloWorld'
isEmail('test@test.com');  // true
levenshtein('cat', 'bat'); // 1
```

### Style 3: Chainable API

```typescript
import { S } from '@oxog/strkit';

S('  Hello World  ')
  .trim()
  .camelCase()
  .truncate(8)
  .value; // 'helloW...'

// Immutable - each operation returns a new instance
const a = S('hello');
const b = a.upper();
console.log(a.value); // 'hello'
console.log(b.value); // 'HELLO'
```

### Style 4: Prototype Extension (Opt-in)

```typescript
import '@oxog/strkit/extend';

'hello world'.camelCase();  // 'helloWorld'
'test@test.com'.isEmail();  // true
```

## Categories

### Case Conversion

```typescript
str.case.camel('hello world');     // 'helloWorld'
str.case.kebab('helloWorld');      // 'hello-world'
str.case.snake('helloWorld');      // 'hello_world'
str.case.pascal('hello world');    // 'HelloWorld'
str.case.title('hello world');     // 'Hello World'
str.case.constant('hello world');  // 'HELLO_WORLD'
str.case.upper('hello');           // 'HELLO'
str.case.lower('HELLO');           // 'hello'

// Locale support
str.case.upper('istanbul', { locale: 'tr' }); // 'İSTANBUL'
```

### Manipulation

```typescript
str.manipulation.trim('  hello  ');           // 'hello'
str.manipulation.truncate('hello world', 8);  // 'hello...'
str.manipulation.reverse('hello');            // 'olleh'
str.manipulation.wrap('hello', '"');          // '"hello"'
str.manipulation.between('<tag>', '<', '>');  // 'tag'
str.manipulation.before('hello@world', '@');  // 'hello'
str.manipulation.after('hello@world', '@');   // 'world'
```

### Validation

```typescript
str.validate.email('test@example.com');       // true
str.validate.url('https://example.com');      // true
str.validate.uuid('550e8400-e29b-...');       // true
str.validate.ip('192.168.1.1');               // true
str.validate.creditCard('4111111111111111');  // true
str.validate.json('{"key":"value"}');         // true
```

### Sanitization

```typescript
str.sanitize.slugify('Hello World!');         // 'hello-world'
str.sanitize.escapeHtml('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
str.sanitize.stripHtml('<p>Hello <b>World</b></p>');  // 'Hello World'
str.sanitize.latinise('Héllo Wörld');         // 'Hello World'
```

### Formatting

```typescript
str.format.template('Hello, {{name}}!', { name: 'World' });
// 'Hello, World!'

str.format.sprintf('%s has %d apples', 'John', 5);
// 'John has 5 apples'

str.format.mask('1234567890', '(###) ###-####');
// '(123) 456-7890'

str.format.ordinalize(1);   // '1st'
str.format.ordinalize(2);   // '2nd'
str.format.ordinalize(3);   // '3rd'
```

### Similarity

```typescript
str.similarity.levenshtein('kitten', 'sitting');  // 3
str.similarity.dice('night', 'nacht');            // 0.25
str.similarity.jaroWinkler('DWAYNE', 'DUANE');    // 0.84
str.similarity.lcs('ABCDGH', 'AEDFHR');           // 'ADH'

str.similarity.bestMatch('hello', ['hallo', 'hullo', 'hey']);
// { match: 'hallo', score: 0.8, index: 0 }
```

### Analysis

```typescript
str.analysis.wordCount('Hello world');      // 2
str.analysis.charCount('Hello');            // 5
str.analysis.lineCount('a\nb\nc');          // 3
str.analysis.entropy('password');           // ~2.75
str.analysis.frequency('hello');            // { h: 1, e: 1, l: 2, o: 1 }
```

### Pluralization

```typescript
str.plural.plural('apple');           // 'apples'
str.plural.plural('child');           // 'children'
str.plural.plural('apple', 5, true);  // '5 apples'
str.plural.singular('apples');        // 'apple'
str.plural.isPlural('apples');        // true
```

### Diff

```typescript
str.diff.diffChars('hello', 'hallo');
// [{ type: 'equal', value: 'h' }, { type: 'remove', value: 'e' },
//  { type: 'add', value: 'a' }, { type: 'equal', value: 'llo' }]

str.diff.createPatch('file.txt', 'old', 'new');
// Unified diff format
```

### Search

```typescript
str.search.contains('hello world', 'world');     // true
str.search.indexOf('hello', 'l');                // 2
str.search.countOccurrences('abracadabra', 'a'); // 5
str.search.positions('abracadabra', 'a');        // [0, 3, 5, 7, 10]
```

## i18n Support

```typescript
import { setLocale, getLocale } from '@oxog/strkit';

setLocale('tr');
str.case.upper('istanbul');  // 'İSTANBUL'

// Per-operation locale
str.case.upper('istanbul', { locale: 'en' });  // 'ISTANBUL'
str.case.upper('istanbul', { locale: 'tr' });  // 'İSTANBUL'
```

### Supported Locales

- English (en) - default
- Turkish (tr)
- German (de)
- French (fr)
- Spanish (es)
- Portuguese (pt)
- Italian (it)
- Dutch (nl)
- Polish (pl)
- Russian (ru)
- Arabic (ar)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)

## Plugin System

```typescript
import { registerPlugin } from '@oxog/strkit';

const myPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  methods: {
    reverse: (str) => str.split('').reverse().join(''),
  },
};

registerPlugin(myPlugin);
```

## TypeScript

Full TypeScript support with strict mode enabled:

```typescript
import { S, str, type StrKitChain, type DiffResult } from '@oxog/strkit';

const chain: StrKitChain = S('hello');
const result: DiffResult[] = str.diff.diffChars('a', 'b');
```

## License

MIT - see [LICENSE](LICENSE) for details.

## Links

- [Documentation](https://strkit.oxog.dev)
- [GitHub Repository](https://github.com/ersinkoc/strkit)
