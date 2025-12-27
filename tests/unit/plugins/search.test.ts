/// <reference types="vitest/globals" />
import {
  contains,
  startsWith,
  endsWith,
  indexOf,
  lastIndexOf,
  countOccurrences,
  positions,
  match,
  matchAll,
  extract,
  extractAll,
} from '../../../src/plugins/search/index.js';

describe('Search Plugin', () => {
  describe('contains', () => {
    it('should check if string contains substring', () => {
      expect(contains('hello world', 'world')).toBe(true);
      expect(contains('hello world', 'foo')).toBe(false);
    });

    it('should handle empty search', () => {
      expect(contains('hello', '')).toBe(true);
    });

    it('should handle empty input', () => {
      expect(contains('', 'hello')).toBe(false);
    });

    it('should be case sensitive by default', () => {
      expect(contains('Hello World', 'world')).toBe(false);
    });

    it('should support case insensitive search', () => {
      expect(contains('Hello World', 'world', { caseSensitive: false })).toBe(true);
    });
  });

  describe('startsWith', () => {
    it('should check if string starts with substring', () => {
      expect(startsWith('hello world', 'hello')).toBe(true);
      expect(startsWith('hello world', 'world')).toBe(false);
    });

    it('should handle empty input', () => {
      expect(startsWith('', 'hello')).toBe(false);
    });

    it('should handle empty search', () => {
      expect(startsWith('hello', '')).toBe(true);
    });
  });

  describe('endsWith', () => {
    it('should check if string ends with substring', () => {
      expect(endsWith('hello world', 'world')).toBe(true);
      expect(endsWith('hello world', 'hello')).toBe(false);
    });

    it('should handle empty input', () => {
      expect(endsWith('', 'hello')).toBe(false);
    });

    it('should handle empty search', () => {
      expect(endsWith('hello', '')).toBe(true);
    });
  });

  describe('indexOf', () => {
    it('should find first index of substring', () => {
      expect(indexOf('hello world', 'o')).toBe(4);
    });

    it('should return -1 if not found', () => {
      expect(indexOf('hello world', 'z')).toBe(-1);
    });

    it('should handle empty input', () => {
      expect(indexOf('', 'hello')).toBe(-1);
    });

    it('should support fromIndex option', () => {
      expect(indexOf('hello world', 'o', { fromIndex: 5 })).toBe(7);
    });

    it('should support case insensitive search', () => {
      expect(indexOf('Hello World', 'o', { caseSensitive: false })).toBe(4);
    });
  });

  describe('lastIndexOf', () => {
    it('should find last index of substring', () => {
      expect(lastIndexOf('hello world', 'o')).toBe(7);
    });

    it('should return -1 if not found', () => {
      expect(lastIndexOf('hello world', 'z')).toBe(-1);
    });

    it('should handle empty input', () => {
      expect(lastIndexOf('', 'hello')).toBe(-1);
    });

    it('should support fromIndex option', () => {
      expect(lastIndexOf('hello world', 'o', { fromIndex: 5 })).toBe(4);
    });

    it('should support case insensitive search', () => {
      expect(lastIndexOf('Hello World', 'O', { caseSensitive: false })).toBe(7);
    });
  });

  describe('countOccurrences', () => {
    it('should count occurrences of substring', () => {
      expect(countOccurrences('abracadabra', 'a')).toBe(5);
      expect(countOccurrences('hello hello', 'hello')).toBe(2);
    });

    it('should return 0 for no match', () => {
      expect(countOccurrences('hello', 'z')).toBe(0);
    });

    it('should handle empty input', () => {
      expect(countOccurrences('', 'hello')).toBe(0);
    });

    it('should handle empty search', () => {
      expect(countOccurrences('hello', '')).toBe(0);
    });

    it('should support case insensitive search', () => {
      expect(countOccurrences('Hello HELLO hello', 'hello', { caseSensitive: false })).toBe(3);
    });
  });

  describe('positions', () => {
    it('should return all positions of substring', () => {
      expect(positions('abracadabra', 'a')).toEqual([0, 3, 5, 7, 10]);
    });

    it('should return empty array for no match', () => {
      expect(positions('hello', 'z')).toEqual([]);
    });

    it('should handle empty input', () => {
      expect(positions('', 'hello')).toEqual([]);
    });

    it('should handle empty search', () => {
      expect(positions('hello', '')).toEqual([]);
    });

    it('should support case insensitive search', () => {
      expect(positions('AbABA', 'a', { caseSensitive: false })).toEqual([0, 2, 4]);
    });
  });

  describe('match', () => {
    it('should return first match', () => {
      expect(match('hello 123 world 456', /\d+/)).toBe('123');
    });

    it('should return null for no match', () => {
      expect(match('hello world', /\d+/)).toBe(null);
    });

    it('should handle empty input', () => {
      expect(match('', /\d+/)).toBe(null);
    });
  });

  describe('matchAll', () => {
    it('should return all matches', () => {
      expect(matchAll('hello 123 world 456', /\d+/g)).toEqual(['123', '456']);
    });

    it('should add global flag if missing', () => {
      expect(matchAll('hello 123 world 456', /\d+/)).toEqual(['123', '456']);
    });

    it('should return empty array for no match', () => {
      expect(matchAll('hello world', /\d+/g)).toEqual([]);
    });

    it('should handle empty input', () => {
      expect(matchAll('', /\d+/g)).toEqual([]);
    });

    it('should handle zero-length matches', () => {
      const result = matchAll('abc', /(?:)/g);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('extract', () => {
    it('should extract with regex groups', () => {
      const result = extract('hello world', /(\w+) (\w+)/);
      expect(result).not.toBeNull();
      expect(result![0]).toBe('hello world');
      expect(result![1]).toBe('hello');
      expect(result![2]).toBe('world');
    });

    it('should return null for no match', () => {
      expect(extract('hello', /(\d+)/)).toBe(null);
    });

    it('should handle empty input', () => {
      expect(extract('', /(\w+)/)).toBe(null);
    });
  });

  describe('extractAll', () => {
    it('should extract all with regex groups', () => {
      const result = extractAll('a1 b2 c3', /([a-z])(\d)/g);
      expect(result.length).toBe(3);
      expect(result[0][0]).toBe('a1');
      expect(result[0][1]).toBe('a');
      expect(result[0][2]).toBe('1');
    });

    it('should add global flag if missing', () => {
      const result = extractAll('a1 b2 c3', /([a-z])(\d)/);
      expect(result.length).toBe(3);
    });

    it('should return empty array for no match', () => {
      expect(extractAll('hello', /(\d+)/g)).toEqual([]);
    });

    it('should handle empty input', () => {
      expect(extractAll('', /(\w+)/g)).toEqual([]);
    });

    it('should handle zero-length matches', () => {
      const result = extractAll('abc', /(?:)/g);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
