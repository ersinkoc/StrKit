# @oxog/strkit - Implementation Guide

## Architecture Overview

StrKit uses a **micro-kernel architecture** with a plugin-based design. The core is minimal and extensible, with all functionality provided through internal plugins.

```
┌────────────────────────────────────────────────────────────┐
│                      Public API Layer                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │   str.*  │ │  S()     │ │  Direct  │ │  Prototype   │  │
│  │Namespace │ │  Chain   │ │  Import  │ │  Extension   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
├────────────────────────────────────────────────────────────┤
│                       Kernel Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    StrKitKernel                       │  │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────────────┐  │  │
│  │  │  Plugin    │ │  Locale    │ │  Configuration   │  │  │
│  │  │  Registry  │ │  Manager   │ │     Store        │  │  │
│  │  └────────────┘ └────────────┘ └──────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│                      Plugin Layer                           │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │  Case  │ │Manipu- │ │Valida- │ │Saniti- │ │Format- │   │
│  │        │ │lation  │ │tion    │ │zation  │ │ting    │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Similar-│ │Analy-  │ │Plural- │ │  Diff  │ │ Search │   │
│  │ity     │ │sis     │ │ization │ │        │ │        │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
├────────────────────────────────────────────────────────────┤
│                      Locale Layer                           │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│  │ en │ │ tr │ │ de │ │ fr │ │ es │ │ pt │ │... │        │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘        │
└────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Kernel (`src/core/kernel.ts`)

The kernel is the central hub that manages:
- Plugin registration and lifecycle
- Method resolution
- Global configuration

```typescript
class StrKitKernel {
  private plugins: Map<string, StrKitPlugin> = new Map();
  private methods: Map<string, Function> = new Map();
  private config: StrKitConfig = { locale: 'en' };

  // Register a plugin
  register(plugin: StrKitPlugin): void {
    // Validate plugin
    this.validatePlugin(plugin);

    // Check dependencies
    this.checkDependencies(plugin);

    // Store plugin
    this.plugins.set(plugin.name, plugin);

    // Register all methods
    for (const [name, fn] of Object.entries(plugin.methods)) {
      this.methods.set(`${plugin.name}.${name}`, fn);
    }

    // Call init hook if exists
    plugin.init?.(this);
  }

  // Get method by path (e.g., "case.camel")
  getMethod(path: string): Function | undefined {
    return this.methods.get(path);
  }

  // Get all methods for a plugin
  getPluginMethods(pluginName: string): Record<string, Function> {
    const plugin = this.plugins.get(pluginName);
    return plugin?.methods ?? {};
  }
}

// Singleton instance
export const kernel = new StrKitKernel();
```

### 2. Chain (`src/core/chain.ts`)

The immutable chain wrapper provides fluent API:

```typescript
class StrKitChainImpl implements StrKitChain {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  // Create new instance (immutability)
  private _create(value: string): StrKitChain {
    return new StrKitChainImpl(value);
  }

  // Get raw value
  value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }

  get s(): string {
    return this._value;
  }

  get length(): number {
    return this._value.length;
  }

  clone(): StrKitChain {
    return this._create(this._value);
  }

  // Example method - delegates to plugin
  camelCase(): StrKitChain {
    return this._create(camelCase(this._value));
  }

  // Validation methods return boolean directly
  isEmail(): boolean {
    return isEmail(this._value);
  }

  // Analysis methods return primitives
  wordCount(): number {
    return wordCount(this._value);
  }
}

// Factory function
export function S(value: string): StrKitChain {
  return new StrKitChainImpl(value);
}
```

### 3. Locale Manager (`src/core/locale.ts`)

Manages internationalization:

```typescript
class LocaleManager {
  private locales: Map<string, StrKitLocale> = new Map();
  private currentLocale: string = 'en';

  register(locale: StrKitLocale): void {
    this.locales.set(locale.code, locale);
  }

  get(code?: string): StrKitLocale {
    const localeCode = code ?? this.currentLocale;
    return this.locales.get(localeCode) ?? this.locales.get('en')!;
  }

  setLocale(code: string): void {
    if (!this.locales.has(code)) {
      throw new Error(`Locale '${code}' not found`);
    }
    this.currentLocale = code;
  }

  getLocale(): string {
    return this.currentLocale;
  }

  getAvailableLocales(): string[] {
    return Array.from(this.locales.keys());
  }
}

export const localeManager = new LocaleManager();
```

### 4. Types (`src/core/types.ts`)

All TypeScript interfaces and types are defined here.

### 5. Utils (`src/core/utils.ts`)

Internal utilities (not exported):

```typescript
// Unicode-aware character splitting
export function splitChars(str: string): string[] {
  return [...str];
}

// Unicode-aware string reversal
export function reverseString(str: string): string {
  return [...str].reverse().join('');
}

// Word boundary detection
export function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_./\\]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Check if string is ASCII
export function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}
```

---

## Plugin Design

### Plugin Structure

Each plugin follows this structure:

```
plugins/
└── case/
    ├── index.ts      # Plugin entry - exports plugin object
    ├── camel.ts      # Individual method
    ├── kebab.ts
    └── ...
```

### Plugin Entry (`plugins/case/index.ts`)

```typescript
import { camelCase } from './camel';
import { kebabCase } from './kebab';
import { snakeCase } from './snake';
// ... other imports

export const casePlugin: StrKitPlugin = {
  name: 'case',
  version: '1.0.0',
  methods: {
    camel: camelCase,
    kebab: kebabCase,
    snake: snakeCase,
    pascal: pascalCase,
    title: titleCase,
    sentence: sentenceCase,
    constant: constantCase,
    dot: dotCase,
    path: pathCase,
    header: headerCase,
    swap: swapCase,
    upper: toUpper,
    lower: toLower,
    capitalize: capitalize,
    decapitalize: decapitalize,
  },
  chainMethods: {
    camelCase: function(this: StrKitChain) {
      return this._create(camelCase(this._value));
    },
    // ... other chain methods
  },
};

// Direct exports for tree-shaking
export { camelCase, kebabCase, snakeCase, pascalCase, titleCase };
export { sentenceCase, constantCase, dotCase, pathCase, headerCase };
export { swapCase, toUpper, toLower, capitalize, decapitalize };
```

### Method Implementation (`plugins/case/camel.ts`)

```typescript
import { splitWords } from '../../core/utils';
import type { StrKitOptions } from '../../core/types';

export function camelCase(input: string, options?: StrKitOptions): string {
  if (!input) return '';

  const words = splitWords(input);
  if (words.length === 0) return '';

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}
```

---

## Tree-Shaking Strategy

### Entry Points

```typescript
// src/index.ts - Main entry

// Re-export everything for tree-shaking
export * from './plugins/case';
export * from './plugins/manipulation';
export * from './plugins/validation';
export * from './plugins/sanitization';
export * from './plugins/formatting';
export * from './plugins/similarity';
export * from './plugins/analysis';
export * from './plugins/pluralization';
export * from './plugins/diff';
export * from './plugins/search';

// Export chain
export { S } from './core/chain';

// Export namespace (not tree-shakeable but convenient)
export { str } from './namespace';

// Export locale utilities
export { setLocale, getLocale, registerLocale } from './core/locale';

// Export plugin utilities
export { registerPlugin } from './core/kernel';

// Export types
export type * from './core/types';
```

### Namespace Object (`src/namespace.ts`)

```typescript
import * as casePlugin from './plugins/case';
import * as manipulationPlugin from './plugins/manipulation';
// ... other imports

export const str = {
  case: {
    camel: casePlugin.camelCase,
    kebab: casePlugin.kebabCase,
    // ... all case methods
  },
  manipulation: {
    trim: manipulationPlugin.trim,
    pad: manipulationPlugin.pad,
    // ... all manipulation methods
  },
  validate: {
    email: validationPlugin.isEmail,
    url: validationPlugin.isUrl,
    // ... all validation methods
  },
  sanitize: {
    escape: sanitizationPlugin.escape,
    slugify: sanitizationPlugin.slugify,
    // ... all sanitization methods
  },
  format: {
    template: formattingPlugin.template,
    sprintf: formattingPlugin.sprintf,
    // ... all formatting methods
  },
  similarity: {
    levenshtein: similarityPlugin.levenshtein,
    dice: similarityPlugin.dice,
    // ... all similarity methods
  },
  analysis: {
    wordCount: analysisPlugin.wordCount,
    charCount: analysisPlugin.charCount,
    // ... all analysis methods
  },
  plural: {
    plural: pluralizationPlugin.pluralize,
    singular: pluralizationPlugin.singularize,
    // ... all pluralization methods
  },
  diff: {
    diff: diffPlugin.diff,
    diffChars: diffPlugin.diffChars,
    // ... all diff methods
  },
  search: {
    contains: searchPlugin.contains,
    indexOf: searchPlugin.indexOf,
    // ... all search methods
  },
};
```

---

## Algorithm Implementations

### Levenshtein Distance

```typescript
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Use two-row optimization for memory efficiency
  let prevRow = new Array(b.length + 1);
  let currRow = new Array(b.length + 1);

  // Initialize first row
  for (let j = 0; j <= b.length; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    currRow[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,      // deletion
        currRow[j - 1] + 1,  // insertion
        prevRow[j - 1] + cost // substitution
      );
    }

    // Swap rows
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[b.length];
}
```

### Jaro-Winkler Similarity

```typescript
export function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;

  const matchWindow = Math.floor(Math.max(a.length, b.length) / 2) - 1;
  const aMatches = new Array(a.length).fill(false);
  const bMatches = new Array(b.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  // Find matches
  for (let i = 0; i < a.length; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, b.length);

    for (let j = start; j < end; j++) {
      if (bMatches[j] || a[i] !== b[j]) continue;
      aMatches[i] = true;
      bMatches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0;

  // Count transpositions
  let k = 0;
  for (let i = 0; i < a.length; i++) {
    if (!aMatches[i]) continue;
    while (!bMatches[k]) k++;
    if (a[i] !== b[k]) transpositions++;
    k++;
  }

  const jaro = (
    matches / a.length +
    matches / b.length +
    (matches - transpositions / 2) / matches
  ) / 3;

  // Winkler modification - boost for common prefix
  let prefix = 0;
  for (let i = 0; i < Math.min(4, a.length, b.length); i++) {
    if (a[i] === b[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1 - jaro);
}
```

### Dice Coefficient

```typescript
export function dice(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;

  const aBigrams = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i++) {
    const bigram = a.substring(i, i + 2);
    aBigrams.set(bigram, (aBigrams.get(bigram) ?? 0) + 1);
  }

  let intersections = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const bigram = b.substring(i, i + 2);
    const count = aBigrams.get(bigram) ?? 0;
    if (count > 0) {
      aBigrams.set(bigram, count - 1);
      intersections++;
    }
  }

  return (2 * intersections) / (a.length + b.length - 2);
}
```

### LCS (Longest Common Subsequence)

```typescript
export function lcs(a: string, b: string): string {
  if (a.length === 0 || b.length === 0) return '';

  const dp: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the actual subsequence
  let result = '';
  let i = a.length, j = b.length;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result = a[i - 1] + result;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}
```

### Diff Algorithm (Myers)

```typescript
export function diffChars(oldStr: string, newStr: string): DiffResult[] {
  if (oldStr === newStr) {
    return oldStr ? [{ type: 'equal', value: oldStr }] : [];
  }

  const oldChars = [...oldStr];
  const newChars = [...newStr];
  const n = oldChars.length;
  const m = newChars.length;
  const max = n + m;

  const v: Record<number, number> = { 1: 0 };
  const trace: Record<number, number>[] = [];

  // Myers algorithm
  for (let d = 0; d <= max; d++) {
    trace.push({ ...v });

    for (let k = -d; k <= d; k += 2) {
      let x: number;
      if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
        x = v[k + 1];
      } else {
        x = v[k - 1] + 1;
      }

      let y = x - k;

      while (x < n && y < m && oldChars[x] === newChars[y]) {
        x++;
        y++;
      }

      v[k] = x;

      if (x >= n && y >= m) {
        return buildDiff(oldChars, newChars, trace, d);
      }
    }
  }

  return [];
}

function buildDiff(
  oldChars: string[],
  newChars: string[],
  trace: Record<number, number>[],
  d: number
): DiffResult[] {
  // Backtrack through trace to build diff
  const result: DiffResult[] = [];
  let x = oldChars.length;
  let y = newChars.length;

  for (let i = d; i > 0; i--) {
    const v = trace[i - 1];
    const k = x - y;

    let prevK: number;
    if (k === -i || (k !== i && v[k - 1] < v[k + 1])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevX = v[prevK];
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      x--;
      y--;
      result.unshift({ type: 'equal', value: oldChars[x] });
    }

    if (i > 0) {
      if (x === prevX) {
        result.unshift({ type: 'add', value: newChars[y - 1] });
        y--;
      } else {
        result.unshift({ type: 'remove', value: oldChars[x - 1] });
        x--;
      }
    }
  }

  while (x > 0 && y > 0 && oldChars[x - 1] === newChars[y - 1]) {
    x--;
    y--;
    result.unshift({ type: 'equal', value: oldChars[x] });
  }

  // Merge consecutive same-type results
  return mergeDiffResults(result);
}

function mergeDiffResults(results: DiffResult[]): DiffResult[] {
  if (results.length === 0) return [];

  const merged: DiffResult[] = [];
  let current = { ...results[0] };

  for (let i = 1; i < results.length; i++) {
    if (results[i].type === current.type) {
      current.value += results[i].value;
    } else {
      merged.push(current);
      current = { ...results[i] };
    }
  }
  merged.push(current);

  return merged;
}
```

---

## Validation Implementations

### Email Validation

```typescript
export function isEmail(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // RFC 5322 compliant regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(input)) return false;

  // Additional checks
  const [local, domain] = input.split('@');
  if (!local || !domain) return false;
  if (local.length > 64) return false;
  if (domain.length > 253) return false;

  return true;
}
```

### UUID Validation

```typescript
export function isUuid(input: string, version?: 1 | 3 | 4 | 5): boolean {
  if (!input || typeof input !== 'string') return false;

  const patterns: Record<number | 'any', RegExp> = {
    1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    any: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  };

  return patterns[version ?? 'any'].test(input);
}
```

### Credit Card Validation (Luhn)

```typescript
export function isCreditCard(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  // Remove spaces and dashes
  const cleaned = input.replace(/[\s-]/g, '');

  // Must be 13-19 digits
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}
```

---

## Pluralization Rules

### English Pluralization

```typescript
const pluralRules: Array<[RegExp, string]> = [
  // Irregular
  [/^(m|wom)an$/i, '$1en'],
  [/^(child)$/i, '$1ren'],
  [/^(person)$/i, 'people'],
  [/^(ox)$/i, '$1en'],
  [/^(goose)$/i, 'geese'],
  [/^(tooth)$/i, 'teeth'],
  [/^(foot)$/i, 'feet'],
  [/^(mouse)$/i, 'mice'],

  // Sibilants
  [/(s|ss|sh|ch|x|z)$/i, '$1es'],

  // Consonant + y
  [/([^aeiou])y$/i, '$1ies'],

  // -f/-fe
  [/(?:([^f])fe|([lr])f)$/i, '$1$2ves'],

  // -o
  [/(hero|potato|tomato|echo|veto)$/i, '$1es'],
  [/o$/i, '$1os'],

  // Default
  [/$/, 's'],
];

const uncountables = [
  'sheep', 'fish', 'deer', 'series', 'species', 'money',
  'rice', 'information', 'equipment', 'news', 'aircraft',
];

export function pluralize(word: string, count?: number): string {
  if (count === 1) return word;
  if (uncountables.includes(word.toLowerCase())) return word;

  for (const [rule, replacement] of pluralRules) {
    if (rule.test(word)) {
      return word.replace(rule, replacement);
    }
  }

  return word;
}
```

---

## Build Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### tsup.config.ts

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    extend: 'src/extend.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  treeshake: true,
  target: 'es2020',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

---

## Prototype Extension

### extend.ts

```typescript
import { S } from './core/chain';

declare global {
  interface String {
    // Case methods
    camelCase(): string;
    kebabCase(): string;
    snakeCase(): string;
    pascalCase(): string;
    titleCase(): string;
    // ... all other methods

    // Validation methods
    isEmail(): boolean;
    isUrl(): boolean;
    // ... all validation methods
  }
}

// Case methods
String.prototype.camelCase = function(): string {
  return S(this.toString()).camelCase().value();
};

String.prototype.kebabCase = function(): string {
  return S(this.toString()).kebabCase().value();
};

// ... implement all other methods

export {};
```

---

## Testing Strategy

### Unit Tests

Each method has dedicated unit tests:

```typescript
// tests/unit/plugins/case/camel.test.ts
import { describe, it, expect } from 'vitest';
import { camelCase } from '../../../../src/plugins/case/camel';

describe('camelCase', () => {
  it('should convert space-separated words', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
  });

  it('should convert kebab-case', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
  });

  it('should convert snake_case', () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
  });

  it('should convert PascalCase', () => {
    expect(camelCase('HelloWorld')).toBe('helloWorld');
  });

  it('should handle empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should handle single word', () => {
    expect(camelCase('hello')).toBe('hello');
  });

  it('should handle unicode', () => {
    expect(camelCase('héllo wörld')).toBe('hélloWörld');
  });
});
```

### Integration Tests

Test all API styles work correctly:

```typescript
// tests/integration/chain.test.ts
import { describe, it, expect } from 'vitest';
import { S } from '../../src';

describe('Chain API', () => {
  it('should chain multiple operations', () => {
    const result = S('  Hello World  ')
      .trim()
      .lower()
      .camelCase()
      .value();

    expect(result).toBe('helloWorld');
  });

  it('should be immutable', () => {
    const a = S('hello');
    const b = a.upper();

    expect(a.value()).toBe('hello');
    expect(b.value()).toBe('HELLO');
  });
});
```

---

## Performance Considerations

1. **Lazy Evaluation**: Chain operations are applied only when `.value()` is called
2. **Memory Efficiency**: Use two-row arrays for dynamic programming algorithms
3. **Unicode Handling**: Use `[...str]` for proper Unicode character splitting
4. **Regex Caching**: Cache compiled regexes where possible
5. **Early Returns**: Return early for empty strings and edge cases

---

## Error Handling

1. **Type Safety**: TypeScript strict mode catches most errors at compile time
2. **Runtime Validation**: Validate inputs at public API boundaries
3. **Graceful Degradation**: Return sensible defaults for invalid inputs
4. **No Throws**: Methods don't throw exceptions, return empty/false instead
