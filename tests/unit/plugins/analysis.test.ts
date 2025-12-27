/// <reference types="vitest/globals" />
import {
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
} from '../../../src/plugins/analysis/index.js';

describe('Analysis Plugin', () => {
  describe('wordCount', () => {
    it('should count words', () => {
      expect(wordCount('Hello world')).toBe(2);
      expect(wordCount('Hello world, how are you?')).toBe(5);
    });

    it('should handle empty string', () => {
      expect(wordCount('')).toBe(0);
    });

    it('should handle multiple spaces', () => {
      expect(wordCount('Hello   world')).toBe(2);
    });

    it('should handle leading/trailing spaces', () => {
      expect(wordCount('  Hello world  ')).toBe(2);
    });

    it('should handle tabs and newlines', () => {
      expect(wordCount('Hello\tworld\ntest')).toBe(3);
    });
  });

  describe('charCount', () => {
    it('should count characters', () => {
      expect(charCount('Hello')).toBe(5);
    });

    it('should handle empty string', () => {
      expect(charCount('')).toBe(0);
    });

    it('should count spaces by default', () => {
      expect(charCount('Hello World')).toBe(11);
    });

    it('should ignore spaces when option set', () => {
      expect(charCount('Hello World', { ignoreSpaces: true })).toBe(10);
    });

    it('should ignore newlines when option set', () => {
      expect(charCount('Hello\nWorld', { ignoreNewlines: true })).toBe(10);
    });

    it('should handle unicode characters', () => {
      expect(charCount('你好')).toBe(2);
      expect(charCount('👋🌍')).toBe(2);
    });
  });

  describe('lineCount', () => {
    it('should count lines', () => {
      expect(lineCount('line1\nline2\nline3')).toBe(3);
    });

    it('should handle empty string', () => {
      expect(lineCount('')).toBe(0);
    });

    it('should handle single line', () => {
      expect(lineCount('single line')).toBe(1);
    });

    it('should handle Windows line endings', () => {
      expect(lineCount('line1\r\nline2\r\nline3')).toBe(3);
    });
  });

  describe('sentenceCount', () => {
    it('should count sentences', () => {
      expect(sentenceCount('Hello. How are you? Fine!')).toBe(3);
    });

    it('should handle empty string', () => {
      expect(sentenceCount('')).toBe(0);
    });

    it('should handle single sentence', () => {
      expect(sentenceCount('Hello world')).toBe(1);
    });

    it('should handle sentence with multiple punctuation', () => {
      expect(sentenceCount('What?! Really?')).toBe(2);
    });
  });

  describe('paragraphCount', () => {
    it('should count paragraphs', () => {
      expect(paragraphCount('Para 1\n\nPara 2')).toBe(2);
    });

    it('should handle empty string', () => {
      expect(paragraphCount('')).toBe(0);
    });

    it('should handle single paragraph', () => {
      expect(paragraphCount('Single paragraph')).toBe(1);
    });

    it('should handle multiple blank lines', () => {
      expect(paragraphCount('Para 1\n\n\n\nPara 2')).toBe(2);
    });

    it('should handle whitespace between paragraphs', () => {
      expect(paragraphCount('Para 1\n  \nPara 2')).toBe(2);
    });
  });

  describe('byteSize', () => {
    it('should return byte size of ASCII string', () => {
      expect(byteSize('Hello')).toBe(5);
    });

    it('should handle empty string', () => {
      expect(byteSize('')).toBe(0);
    });

    it('should handle unicode characters', () => {
      expect(byteSize('Merhaba')).toBe(7);
      // Turkish ü is 2 bytes in UTF-8
      expect(byteSize('ü')).toBe(2);
    });

    it('should handle emojis', () => {
      // Emoji is 4 bytes
      expect(byteSize('👋')).toBe(4);
    });
  });

  describe('entropy', () => {
    it('should calculate entropy', () => {
      const e = entropy('password');
      expect(e).toBeGreaterThan(0);
      expect(e).toBeLessThan(4);
    });

    it('should return 0 for empty string', () => {
      expect(entropy('')).toBe(0);
    });

    it('should return 0 for single character', () => {
      expect(entropy('a')).toBe(0);
    });

    it('should have higher entropy for random-like strings', () => {
      const lowEntropy = entropy('aaaaaaa');
      const highEntropy = entropy('xK#9$mP@');
      expect(highEntropy).toBeGreaterThan(lowEntropy);
    });

    it('should have max entropy for unique characters', () => {
      // For 4 unique characters, max entropy is log2(4) = 2
      const e = entropy('abcd');
      expect(e).toBeCloseTo(2, 5);
    });
  });

  describe('frequency', () => {
    it('should count character frequency', () => {
      const result = frequency('hello');
      expect(result['h']).toBe(1);
      expect(result['e']).toBe(1);
      expect(result['l']).toBe(2);
      expect(result['o']).toBe(1);
    });

    it('should handle empty string', () => {
      expect(frequency('')).toEqual({});
    });

    it('should count word frequency', () => {
      const result = frequency('hello world hello', { type: 'word' });
      expect(result['hello']).toBe(2);
      expect(result['world']).toBe(1);
    });

    it('should be case insensitive for word frequency', () => {
      const result = frequency('Hello hello HELLO', { type: 'word' });
      expect(result['hello']).toBe(3);
    });
  });

  describe('readingTime', () => {
    it('should estimate reading time', () => {
      // 200 words at 200 wpm = 1 minute
      const text = Array(200).fill('word').join(' ');
      expect(readingTime(text)).toBeCloseTo(1, 1);
    });

    it('should return 0 for empty string', () => {
      expect(readingTime('')).toBe(0);
    });

    it('should respect custom words per minute', () => {
      const text = Array(100).fill('word').join(' ');
      // 100 words at 100 wpm = 1 minute
      expect(readingTime(text, { wordsPerMinute: 100 })).toBe(1);
    });
  });

  describe('speakingTime', () => {
    it('should estimate speaking time', () => {
      // 150 words at 150 wpm = 1 minute
      const text = Array(150).fill('word').join(' ');
      expect(speakingTime(text)).toBeCloseTo(1, 1);
    });

    it('should return 0 for empty string', () => {
      expect(speakingTime('')).toBe(0);
    });

    it('should respect custom words per minute', () => {
      const text = Array(100).fill('word').join(' ');
      // 100 words at 100 wpm = 1 minute
      expect(speakingTime(text, { wordsPerMinute: 100 })).toBe(1);
    });
  });
});
