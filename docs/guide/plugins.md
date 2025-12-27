# Plugin System

StrKit uses a micro-kernel architecture with a powerful plugin system that allows you to extend its functionality.

## Creating a Plugin

A plugin is an object that implements the `StrKitPlugin` interface:

```typescript
import { registerPlugin, type StrKitPlugin } from '@oxog/strkit';

const myPlugin: StrKitPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  methods: {
    // Your custom methods
    reverse: (str: string) => str.split('').reverse().join(''),
    countVowels: (str: string) => (str.match(/[aeiou]/gi) || []).length,
  },
  init: (kernel) => {
    // Optional initialization logic
    console.log('Plugin initialized!');
  },
};

registerPlugin(myPlugin);
```

## Plugin Interface

```typescript
interface StrKitPlugin {
  name: string;           // Unique plugin name
  version: string;        // Semantic version
  methods: Record<string, Function>;  // Plugin methods
  init?: (kernel: StrKitKernel) => void;  // Optional init function
}
```

## Using Plugin Methods

Once registered, plugin methods are available via the namespace API:

```typescript
import { str } from '@oxog/strkit';

// Access via str.pluginName.methodName
str.myPlugin.reverse('hello');      // 'olleh'
str.myPlugin.countVowels('hello');  // 2
```

## Example: Text Analysis Plugin

```typescript
const textAnalysisPlugin: StrKitPlugin = {
  name: 'textAnalysis',
  version: '1.0.0',
  methods: {
    // Get word frequency
    wordFrequency: (text: string): Record<string, number> => {
      const words = text.toLowerCase().split(/\s+/);
      return words.reduce((freq, word) => {
        freq[word] = (freq[word] || 0) + 1;
        return freq;
      }, {} as Record<string, number>);
    },

    // Calculate reading level (Flesch-Kincaid)
    readingLevel: (text: string): number => {
      const words = text.split(/\s+/);
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());
      const syllables = words.reduce((count, word) => {
        return count + (word.match(/[aeiouy]+/gi) || []).length;
      }, 0);

      if (words.length === 0 || sentences.length === 0) return 0;

      return (
        0.39 * (words.length / sentences.length) +
        11.8 * (syllables / words.length) -
        15.59
      );
    },

    // Extract key phrases
    keyPhrases: (text: string, count = 5): string[] => {
      const words = text.toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3);

      const freq: Record<string, number> = {};
      words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
      });

      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([word]) => word);
    },
  },
};

registerPlugin(textAnalysisPlugin);

// Usage
const text = 'The quick brown fox jumps over the lazy dog.';
str.textAnalysis.wordFrequency(text);
str.textAnalysis.readingLevel(text);
str.textAnalysis.keyPhrases(text, 3);
```

## Example: Encoding Plugin

```typescript
const encodingPlugin: StrKitPlugin = {
  name: 'encoding',
  version: '1.0.0',
  methods: {
    // ROT13 cipher
    rot13: (str: string): string => {
      return str.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });
    },

    // Caesar cipher with custom shift
    caesar: (str: string, shift: number): string => {
      return str.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        const normalizedShift = ((shift % 26) + 26) % 26;
        return String.fromCharCode(((code - base + normalizedShift) % 26) + base);
      });
    },

    // Convert to Morse code
    toMorse: (str: string): string => {
      const morse: Record<string, string> = {
        a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.',
        g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..',
        m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.',
        s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
        y: '-.--', z: '--..', ' ': '/',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.',
      };
      return str.toLowerCase().split('').map(c => morse[c] || c).join(' ');
    },
  },
};

registerPlugin(encodingPlugin);

// Usage
str.encoding.rot13('Hello');           // 'Uryyb'
str.encoding.caesar('Hello', 3);       // 'Khoor'
str.encoding.toMorse('SOS');           // '... --- ...'
```

## Built-in Plugins

StrKit comes with 10 built-in plugins:

| Plugin | Description |
|--------|-------------|
| `case` | Case conversion (camelCase, kebab-case, etc.) |
| `manipulation` | String manipulation (trim, truncate, wrap, etc.) |
| `validation` | Input validation (email, URL, UUID, etc.) |
| `sanitization` | String sanitization (slugify, escapeHtml, etc.) |
| `formatting` | String formatting (template, sprintf, mask) |
| `similarity` | String similarity (Levenshtein, Dice, etc.) |
| `analysis` | Text analysis (wordCount, entropy, etc.) |
| `pluralization` | Pluralization (plural, singular) |
| `diff` | Text diffing (diffChars, diffWords, etc.) |
| `search` | String searching (contains, indexOf, etc.) |

## Best Practices

1. **Unique Names**: Choose a unique plugin name to avoid conflicts
2. **Version Semantically**: Follow semantic versioning for your plugins
3. **Pure Functions**: Keep methods pure when possible for predictability
4. **Error Handling**: Handle edge cases (empty strings, null values)
5. **TypeScript**: Use TypeScript for better type safety

```typescript
// Good: Handle edge cases
const safePlugin: StrKitPlugin = {
  name: 'safe',
  version: '1.0.0',
  methods: {
    safeReverse: (str: string): string => {
      if (!str) return '';
      return str.split('').reverse().join('');
    },
  },
};
```
