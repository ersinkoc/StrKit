/**
 * Analysis Plugin
 * Provides methods for analyzing string content
 */

import type { AnalysisOptions, FrequencyResult } from '../../core/types.js';
import { splitChars, getByteLength } from '../../core/utils.js';

/**
 * Count words in a string
 * @example wordCount('Hello world, how are you?') // 5
 */
export function wordCount(input: string): number {
  if (!input) return 0;

  // Split on whitespace and filter empty strings
  const words = input.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Count characters in a string
 * @example charCount('Hello') // 5
 * @example charCount('Hello World', { ignoreSpaces: true }) // 10
 */
export function charCount(input: string, options?: AnalysisOptions): number {
  if (!input) return 0;

  let str = input;

  if (options?.ignoreSpaces) {
    str = str.replace(/\s/g, '');
  }

  if (options?.ignoreNewlines) {
    str = str.replace(/[\r\n]/g, '');
  }

  // Use Unicode-aware character count
  return splitChars(str).length;
}

/**
 * Count lines in a string
 * @example lineCount('line1\nline2\nline3') // 3
 */
export function lineCount(input: string): number {
  if (!input) return 0;

  // Split on newlines
  const lines = input.split(/\r?\n/);
  return lines.length;
}

/**
 * Count sentences in a string
 * @example sentenceCount('Hello. How are you? Fine!') // 3
 */
export function sentenceCount(input: string): number {
  if (!input) return 0;

  // Match sentence-ending punctuation followed by space or end of string
  const sentences = input
    .replace(/([.!?])\s*(?=[A-Z]|$)/g, '$1|')
    .split('|')
    .filter((s) => s.trim().length > 0);

  return sentences.length;
}

/**
 * Count paragraphs in a string
 * @example paragraphCount('Para 1\n\nPara 2') // 2
 */
export function paragraphCount(input: string): number {
  if (!input) return 0;

  // Split on double newlines (with optional extra whitespace)
  const paragraphs = input
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return paragraphs.length;
}

/**
 * Get UTF-8 byte size of a string
 * @example byteSize('Hello') // 5
 * @example byteSize('Merhaba') // 7 (Turkish ü takes 2 bytes)
 */
export function byteSize(input: string): number {
  if (!input) return 0;
  return getByteLength(input);
}

/**
 * Calculate Shannon entropy of a string
 * Higher entropy = more randomness/unpredictability
 * @example entropy('password') // ~2.75 (low entropy)
 * @example entropy('xK#9$mP@2q') // ~3.32 (high entropy)
 */
export function entropy(input: string): number {
  if (!input || input.length === 0) return 0;

  // Calculate character frequencies
  const freq = new Map<string, number>();
  for (const char of input) {
    freq.set(char, (freq.get(char) ?? 0) + 1);
  }

  // Calculate entropy
  const len = input.length;
  let entropy = 0;

  for (const count of freq.values()) {
    const probability = count / len;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

/**
 * Get character or word frequency
 * @example frequency('hello') // { h: 1, e: 1, l: 2, o: 1 }
 * @example frequency('hello world', { type: 'word' }) // { hello: 1, world: 1 }
 */
export function frequency(
  input: string,
  options?: { type?: 'char' | 'word' }
): FrequencyResult {
  if (!input) return {};

  const type = options?.type ?? 'char';
  const result: FrequencyResult = {};

  if (type === 'word') {
    const words = input.toLowerCase().split(/\s+/).filter(Boolean);
    for (const word of words) {
      result[word] = (result[word] ?? 0) + 1;
    }
  } else {
    for (const char of input) {
      result[char] = (result[char] ?? 0) + 1;
    }
  }

  return result;
}

/**
 * Estimate reading time in minutes
 * @example readingTime('Lorem ipsum...') // time in minutes
 */
export function readingTime(
  input: string,
  options?: { wordsPerMinute?: number }
): number {
  if (!input) return 0;

  const wordsPerMinute = options?.wordsPerMinute ?? 200;
  const words = wordCount(input);

  return words / wordsPerMinute;
}

/**
 * Estimate speaking time in minutes
 * @example speakingTime('Lorem ipsum...') // time in minutes
 */
export function speakingTime(
  input: string,
  options?: { wordsPerMinute?: number }
): number {
  if (!input) return 0;

  const wordsPerMinute = options?.wordsPerMinute ?? 150;
  const words = wordCount(input);

  return words / wordsPerMinute;
}

// Export plugin
export const analysisPlugin = {
  name: 'analysis',
  version: '1.0.0',
  methods: {
    wordCount,
    charCount,
    lineCount,
    sentenceCount,
    paragraphCount,
    byteSize,
    entropy,
    frequency,
    readingTime,
    speakingTime,
  },
};
