# Examples

This page showcases common use cases and patterns with StrKit.

## Basic Usage

### Case Conversion

```typescript
import { S, str, camelCase, kebabCase } from '@oxog/strkit';

// Namespace API
str.case.camel('hello world');     // 'helloWorld'
str.case.kebab('helloWorld');      // 'hello-world'
str.case.snake('helloWorld');      // 'hello_world'
str.case.pascal('hello world');    // 'HelloWorld'

// Direct imports
camelCase('hello world');          // 'helloWorld'
kebabCase('HelloWorld');           // 'hello-world'

// Chainable API
S('hello world').camelCase().value;    // 'helloWorld'
S('hello_world').pascalCase().value;   // 'HelloWorld'
```

### Form Validation

```typescript
import { str, S } from '@oxog/strkit';

function validateForm(data: { email: string; website: string; phone: string }) {
  const errors: string[] = [];

  if (!str.validate.email(data.email)) {
    errors.push('Invalid email address');
  }

  if (!str.validate.url(data.website)) {
    errors.push('Invalid website URL');
  }

  if (!str.validate.phone(data.phone)) {
    errors.push('Invalid phone number');
  }

  return { valid: errors.length === 0, errors };
}

// Or with chainable API
const isValid = S('test@example.com').isEmail();  // true
```

### URL Slug Generation

```typescript
import { S, str } from '@oxog/strkit';

// Create SEO-friendly URLs
const title = 'Hello World! This is a Blog Post';
const slug = str.sanitize.slugify(title);  // 'hello-world-this-is-a-blog-post'

// With locale support for proper transliteration
const turkishTitle = 'Türkçe Başlık Örneği';
const turkishSlug = str.sanitize.slugify(turkishTitle, { locale: 'tr' });
// 'turkce-baslik-ornegi'

// Chained with other operations
const result = S('  Hello World!  ')
  .trim()
  .slugify()
  .value;  // 'hello-world'
```

## Advanced Patterns

### Text Processing Pipeline

```typescript
import { S } from '@oxog/strkit';

function processUserInput(input: string): string {
  return S(input)
    .trim()                    // Remove whitespace
    .collapseWhitespace()      // Normalize spaces
    .stripHtml()               // Remove HTML tags
    .escapeHtml()              // Escape special characters
    .truncate(100)             // Limit length
    .value;
}

const userInput = '  <script>alert("xss")</script>  Hello   World  ';
processUserInput(userInput);
// 'alert(&quot;xss&quot;) Hello World'
```

### Fuzzy Search

```typescript
import { str } from '@oxog/strkit';

const products = [
  'iPhone 15 Pro',
  'iPhone 15',
  'iPad Pro',
  'MacBook Pro',
  'AirPods Pro',
];

function fuzzySearch(query: string, items: string[], threshold = 0.3) {
  const results = str.similarity.findSimilar(query, items, { threshold });
  return results.map(r => r.match);
}

fuzzySearch('iphone', products);
// ['iPhone 15 Pro', 'iPhone 15']

// Find best match
const best = str.similarity.bestMatch('macbook', products);
// { match: 'MacBook Pro', score: 0.64, index: 3 }
```

### Template Rendering

```typescript
import { str } from '@oxog/strkit';

// Simple template
const greeting = str.format.template('Hello, {{name}}!', { name: 'World' });
// 'Hello, World!'

// Nested objects
const email = str.format.template(
  'Dear {{user.name}}, your order #{{order.id}} is {{order.status}}.',
  {
    user: { name: 'John' },
    order: { id: 12345, status: 'shipped' },
  }
);
// 'Dear John, your order #12345 is shipped.'

// Printf-style formatting
const log = str.format.sprintf('[%s] %s: %d errors', 'ERROR', 'Database', 5);
// '[ERROR] Database: 5 errors'
```

### Text Analysis

```typescript
import { S, str } from '@oxog/strkit';

const article = `
  The quick brown fox jumps over the lazy dog.
  This is a sample text for analysis.
`;

// Get statistics
const stats = {
  words: str.analysis.wordCount(article),       // 16
  sentences: str.analysis.sentenceCount(article), // 2
  chars: str.analysis.charCount(article),       // 77
  readingTime: str.analysis.readingTime(article), // ~0.08 minutes
};

// Character frequency
const freq = str.analysis.frequency('hello');
// { h: 1, e: 1, l: 2, o: 1 }

// Entropy (password strength indicator)
const weak = str.analysis.entropy('password');     // ~2.75
const strong = str.analysis.entropy('xK#9$mP@2q'); // ~3.32
```

### Diff and Patch

```typescript
import { str } from '@oxog/strkit';

const oldText = 'The quick brown fox';
const newText = 'The slow brown dog';

// Character-level diff
const charDiff = str.diff.diffChars(oldText, newText);
// [
//   { type: 'equal', value: 'The ' },
//   { type: 'remove', value: 'quick' },
//   { type: 'add', value: 'slow' },
//   { type: 'equal', value: ' brown ' },
//   { type: 'remove', value: 'fox' },
//   { type: 'add', value: 'dog' }
// ]

// Word-level diff
const wordDiff = str.diff.diffWords(oldText, newText);

// Create unified patch
const patch = str.diff.createPatch('file.txt', oldText, newText);
```

### Pluralization

```typescript
import { str } from '@oxog/strkit';

function formatCount(count: number, noun: string): string {
  return str.plural.plural(noun, count, true);
}

formatCount(0, 'apple');   // '0 apples'
formatCount(1, 'apple');   // '1 apple'
formatCount(5, 'apple');   // '5 apples'
formatCount(3, 'child');   // '3 children'
formatCount(2, 'person');  // '2 people'

// Check plural/singular
str.plural.isPlural('apples');   // true
str.plural.isSingular('apple');  // true
```

### Data Masking

```typescript
import { str } from '@oxog/strkit';

// Phone number formatting
const phone = str.format.mask('1234567890', '(###) ###-####');
// '(123) 456-7890'

// Credit card formatting
const card = str.format.mask('4111111111111111', '#### #### #### ####');
// '4111 1111 1111 1111'

// SSN formatting
const ssn = str.format.mask('123456789', '###-##-####');
// '123-45-6789'

// Unmasking
const unmasked = str.format.unmask('(123) 456-7890', '(###) ###-####');
// '1234567890'
```

### Internationalization

```typescript
import { str, setLocale } from '@oxog/strkit';

// Turkish locale example
setLocale('tr');
str.case.upper('istanbul');  // 'İSTANBUL' (with dotted İ)
str.case.lower('ISTANBUL');  // 'ıstanbul' (with dotless ı)

// Per-operation locale override
str.case.upper('istanbul', { locale: 'en' });  // 'ISTANBUL'
str.case.upper('istanbul', { locale: 'tr' });  // 'İSTANBUL'

// Transliteration
str.sanitize.transliterate('Привет мир', 'ru');  // 'Privet mir'
str.sanitize.transliterate('你好世界', 'zh');    // 'ni hao shi jie'

// Currency formatting
str.format.currency(1234.56, { locale: 'en-US', currency: 'USD' });
// '$1,234.56'
str.format.currency(1234.56, { locale: 'de-DE', currency: 'EUR' });
// '1.234,56 €'
```

## Real-World Use Cases

### Blog Post Processing

```typescript
import { S, str } from '@oxog/strkit';

interface BlogPost {
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  readingTime: number;
  wordCount: number;
}

function processBlogPost(title: string, content: string): BlogPost {
  const cleanContent = S(content).stripHtml().collapseWhitespace().value;

  return {
    title: str.case.title(title),
    content,
    slug: str.sanitize.slugify(title),
    excerpt: str.manipulation.truncate(cleanContent, 160),
    readingTime: str.analysis.readingTime(cleanContent),
    wordCount: str.analysis.wordCount(cleanContent),
  };
}
```

### Search Autocomplete

```typescript
import { str } from '@oxog/strkit';

const suggestions = [
  'JavaScript',
  'TypeScript',
  'Java',
  'Python',
  'Ruby',
  'Rust',
];

function autocomplete(query: string): string[] {
  if (!query) return [];

  // First, try prefix matching
  const prefixMatches = suggestions.filter(s =>
    str.search.startsWith(s.toLowerCase(), query.toLowerCase())
  );

  if (prefixMatches.length > 0) return prefixMatches;

  // Fall back to fuzzy matching
  return str.similarity.findSimilar(query, suggestions, {
    threshold: 0.4
  }).map(r => r.match);
}

autocomplete('java');  // ['JavaScript', 'Java']
autocomplete('typ');   // ['TypeScript']
autocomplete('pythn'); // ['Python'] (fuzzy match)
```

### Password Strength Checker

```typescript
import { str, S } from '@oxog/strkit';

interface PasswordStrength {
  score: number;
  label: string;
  suggestions: string[];
}

function checkPasswordStrength(password: string): PasswordStrength {
  const suggestions: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length < 8) suggestions.push('Use at least 8 characters');

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (!/[A-Z]/.test(password)) suggestions.push('Add uppercase letters');
  if (!/[0-9]/.test(password)) suggestions.push('Add numbers');
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push('Add special characters');

  // Entropy check
  const entropy = str.analysis.entropy(password);
  if (entropy > 3) score += 1;
  if (entropy > 4) score += 1;

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const label = labels[Math.min(Math.floor(score / 1.5), labels.length - 1)] || 'Very Weak';

  return { score, label, suggestions };
}
```
