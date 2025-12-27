# Getting Started

## Installation

::: code-group

```bash [npm]
npm install @oxog/strkit
```

```bash [yarn]
yarn add @oxog/strkit
```

```bash [pnpm]
pnpm add @oxog/strkit
```

:::

## Quick Start

### Using the Namespace API

```typescript
import { str } from '@oxog/strkit';

// Case conversion
str.camelCase('hello world');     // 'helloWorld'
str.kebabCase('helloWorld');      // 'hello-world'
str.titleCase('hello world');     // 'Hello World'

// Validation
str.isEmail('test@example.com');  // true
str.isUrl('https://example.com'); // true

// Manipulation
str.truncate('Hello World', 8);   // 'Hello...'
str.reverse('hello');             // 'olleh'
```

### Using Direct Imports

```typescript
import { camelCase, isEmail, truncate } from '@oxog/strkit';

camelCase('hello world');         // 'helloWorld'
isEmail('test@example.com');      // true
truncate('Hello World', 8);       // 'Hello...'
```

### Using the Chainable API

```typescript
import { S } from '@oxog/strkit';

S('hello world')
  .camelCase()
  .append('!!')
  .value;  // 'helloWorld!!'

S('  HELLO WORLD  ')
  .trim()
  .toLowerCase()
  .words();  // ['hello', 'world']
```

### Using Prototype Extensions

```typescript
import '@oxog/strkit/extend';

'hello world'.camelCase();        // 'helloWorld'
'test@example.com'.isEmail();     // true
'Hello World'.truncate(8);        // 'Hello...'
```

## What's Included

StrKit provides 115+ methods across 10 categories:

| Category | Methods |
|----------|---------|
| **Case** | camelCase, kebabCase, snakeCase, pascalCase, titleCase, etc. |
| **Manipulation** | trim, pad, truncate, reverse, wrap, insert, remove, etc. |
| **Validation** | isEmail, isUrl, isUuid, isIp, isPhone, isCreditCard, etc. |
| **Sanitization** | escapeHtml, slugify, stripHtml, latinise, transliterate, etc. |
| **Formatting** | template, sprintf, mask, unmask, formatNumber, etc. |
| **Similarity** | levenshtein, dice, jaroWinkler, cosine, hamming, etc. |
| **Analysis** | wordCount, charCount, entropy, frequency, readingTime, etc. |
| **Pluralization** | pluralize, singularize, isPlural, isSingular |
| **Diff** | diffChars, diffWords, diffLines |
| **Search** | contains, indexOf, countOccurrences, match, matchAll, etc. |

## TypeScript Support

StrKit is written in TypeScript and provides full type definitions out of the box:

```typescript
import { str, S, type StrKitChain } from '@oxog/strkit';

// All methods are fully typed
const result: string = str.camelCase('hello world');

// Chain type is preserved
const chain: StrKitChain = S('hello').camelCase();
```

## Browser Support

StrKit supports all modern browsers and Node.js 16+:

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+
- Node.js 16+
