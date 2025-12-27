/**
 * Custom Plugin Example
 * Demonstrates how to create and register custom plugins in @oxog/strkit
 */

import { registerPlugin, str, S, type StrKitPlugin } from '@oxog/strkit';

// ============================================
// 1. Simple Plugin
// ============================================

console.log('=== Simple Plugin ===\n');

// Create a simple plugin with custom methods
const simplePlugin: StrKitPlugin = {
  name: 'simple',
  version: '1.0.0',
  methods: {
    // Reverse words in a string
    reverseWords: (input: string): string => {
      return input.split(' ').reverse().join(' ');
    },

    // Count vowels
    countVowels: (input: string): number => {
      return (input.match(/[aeiouAEIOU]/g) || []).length;
    },

    // Add prefix and suffix
    surround: (input: string, prefix: string, suffix: string): string => {
      return `${prefix}${input}${suffix}`;
    },
  },
};

// Register the plugin
registerPlugin(simplePlugin);

// Now use it via namespace
// console.log('Reverse words:', str.simple.reverseWords('hello world'));  // world hello
// console.log('Count vowels:', str.simple.countVowels('hello world'));     // 3

// ============================================
// 2. Text Analysis Plugin
// ============================================

console.log('\n=== Text Analysis Plugin ===\n');

interface TextStats {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  avgWordLength: number;
  longestWord: string;
}

const textAnalysisPlugin: StrKitPlugin = {
  name: 'textAnalysis',
  version: '1.0.0',
  methods: {
    // Get comprehensive text statistics
    getStats: (input: string): TextStats => {
      const words = input.trim().split(/\s+/).filter(w => w.length > 0);
      const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const paragraphs = input.split(/\n\n+/).filter(p => p.trim().length > 0);

      const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
      const avgWordLength = words.length > 0 ? totalWordLength / words.length : 0;

      const longestWord = words.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        ''
      );

      return {
        characters: input.length,
        words: words.length,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        avgWordLength: Math.round(avgWordLength * 100) / 100,
        longestWord,
      };
    },

    // Check if text is readable (Flesch-Kincaid)
    isReadable: (input: string, maxGradeLevel: number = 8): boolean => {
      const words = input.trim().split(/\s+/).filter(w => w.length > 0);
      const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);

      if (words.length === 0 || sentences.length === 0) return true;

      // Simplified syllable count (count vowel groups)
      const syllables = words.reduce((count, word) => {
        const matches = word.toLowerCase().match(/[aeiouy]+/g);
        return count + (matches ? matches.length : 1);
      }, 0);

      // Flesch-Kincaid Grade Level formula
      const gradeLevel =
        0.39 * (words.length / sentences.length) +
        11.8 * (syllables / words.length) -
        15.59;

      return gradeLevel <= maxGradeLevel;
    },

    // Extract key phrases (simple implementation)
    extractKeyPhrases: (input: string, count: number = 5): string[] => {
      const words = input
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3);

      // Count word frequency
      const freq: Record<string, number> = {};
      words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
      });

      // Sort by frequency and return top N
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([word]) => word);
    },
  },
};

registerPlugin(textAnalysisPlugin);

// Test the text analysis plugin
const sampleText = `
The quick brown fox jumps over the lazy dog. This is a sample paragraph
for testing text analysis. It contains multiple sentences and words.

Another paragraph here with more content. The text analysis plugin can
calculate various statistics about the text.
`;

// console.log('Text Stats:', str.textAnalysis.getStats(sampleText));
// console.log('Is Readable (grade 8):', str.textAnalysis.isReadable(sampleText, 8));
// console.log('Key Phrases:', str.textAnalysis.extractKeyPhrases(sampleText, 5));

// ============================================
// 3. Encoding Plugin
// ============================================

console.log('\n=== Encoding Plugin ===\n');

const encodingPlugin: StrKitPlugin = {
  name: 'encoding',
  version: '1.0.0',
  methods: {
    // ROT13 cipher
    rot13: (input: string): string => {
      return input.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });
    },

    // Simple Caesar cipher
    caesar: (input: string, shift: number): string => {
      return input.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        const normalizedShift = ((shift % 26) + 26) % 26;
        return String.fromCharCode(((code - base + normalizedShift) % 26) + base);
      });
    },

    // Morse code
    toMorse: (input: string): string => {
      const morseCode: Record<string, string> = {
        a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.',
        g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..',
        m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.',
        s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
        y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/',
      };

      return input
        .toLowerCase()
        .split('')
        .map(char => morseCode[char] || char)
        .join(' ');
    },

    // Binary encoding
    toBinary: (input: string): string => {
      return input
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
    },

    // Hex encoding
    toHex: (input: string): string => {
      return input
        .split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' ');
    },
  },
};

registerPlugin(encodingPlugin);

// Test encoding plugin
const message = 'Hello World';
// console.log('Original:', message);
// console.log('ROT13:', str.encoding.rot13(message));
// console.log('Caesar +3:', str.encoding.caesar(message, 3));
// console.log('Morse:', str.encoding.toMorse(message));
// console.log('Binary:', str.encoding.toBinary('Hi'));
// console.log('Hex:', str.encoding.toHex('Hi'));

// ============================================
// 4. Plugin with Initialization
// ============================================

console.log('\n=== Plugin with Init ===\n');

const configPlugin: StrKitPlugin = {
  name: 'config',
  version: '1.0.0',
  methods: {
    getVersion: (): string => '1.0.0',
  },
  init: (kernel) => {
    console.log('Config plugin initialized!');
    console.log('Registered plugins:', kernel.getPlugins().map(p => p.name));
  },
};

registerPlugin(configPlugin);

console.log('\n=== All Plugins Registered ===');
