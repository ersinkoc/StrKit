/// <reference types="vitest/globals" />
import {
  levenshtein,
  levenshteinRatio,
  dice,
  jaroWinkler,
  hamming,
  cosine,
  lcs,
  lcsLength,
  bestMatch,
  findSimilar,
  similarity,
} from '../../../src/plugins/similarity/index.js';

describe('Similarity Plugin', () => {
  describe('levenshtein', () => {
    it('should calculate edit distance', () => {
      expect(levenshtein('kitten', 'sitting')).toBe(3);
      expect(levenshtein('hello', 'hello')).toBe(0);
      expect(levenshtein('', 'abc')).toBe(3);
      expect(levenshtein('abc', '')).toBe(3);
    });

    it('should handle empty strings', () => {
      expect(levenshtein('', '')).toBe(0);
    });
  });

  describe('levenshteinRatio', () => {
    it('should calculate normalized ratio', () => {
      expect(levenshteinRatio('hello', 'hello')).toBe(1);
      expect(levenshteinRatio('', '')).toBe(1);
      const ratio = levenshteinRatio('kitten', 'sitting');
      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThan(1);
    });
  });

  describe('dice', () => {
    it('should calculate dice coefficient', () => {
      expect(dice('hello', 'hello')).toBe(1);
      expect(dice('night', 'nacht')).toBeGreaterThan(0);
      expect(dice('abc', 'xyz')).toBe(0);
    });

    it('should handle short strings', () => {
      expect(dice('a', 'b')).toBe(0);
    });
  });

  describe('jaroWinkler', () => {
    it('should calculate Jaro-Winkler similarity', () => {
      expect(jaroWinkler('hello', 'hello')).toBe(1);
      expect(jaroWinkler('DWAYNE', 'DUANE')).toBeGreaterThan(0.8);
    });

    it('should handle empty strings', () => {
      expect(jaroWinkler('', 'hello')).toBe(0);
      expect(jaroWinkler('hello', '')).toBe(0);
    });
  });

  describe('hamming', () => {
    it('should calculate hamming distance', () => {
      expect(hamming('karolin', 'kathrin')).toBe(3);
      expect(hamming('hello', 'hello')).toBe(0);
    });

    it('should throw for unequal length strings', () => {
      expect(() => hamming('hello', 'hi')).toThrow();
    });
  });

  describe('cosine', () => {
    it('should calculate cosine similarity', () => {
      expect(cosine('hello world', 'world hello')).toBeCloseTo(1, 10);
      expect(cosine('hello', 'world')).toBe(0);
    });

    it('should handle empty strings', () => {
      expect(cosine('', '')).toBe(1);
      expect(cosine('hello', '')).toBe(0);
    });
  });

  describe('lcs', () => {
    it('should find longest common subsequence', () => {
      expect(lcs('ABCDGH', 'AEDFHR')).toBe('ADH');
      expect(lcs('hello', 'hello')).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(lcs('', 'hello')).toBe('');
      expect(lcs('hello', '')).toBe('');
    });
  });

  describe('lcsLength', () => {
    it('should return LCS length', () => {
      expect(lcsLength('ABCDGH', 'AEDFHR')).toBe(3);
      expect(lcsLength('hello', 'hello')).toBe(5);
    });
  });

  describe('bestMatch', () => {
    it('should find best match', () => {
      const result = bestMatch('hello', ['hallo', 'hullo', 'hey']);
      expect(result).not.toBeNull();
      expect(result?.match).toBe('hallo');
      expect(result?.index).toBe(0);
    });

    it('should return null for empty candidates', () => {
      expect(bestMatch('hello', [])).toBeNull();
    });
  });

  describe('findSimilar', () => {
    it('should find all similar strings above threshold', () => {
      const results = findSimilar('apple', ['apply', 'maple', 'banana'], { threshold: 0.5 });
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]?.score).toBeGreaterThanOrEqual(0.5);
    });

    it('should return empty for no matches', () => {
      const results = findSimilar('apple', ['xyz', '123'], { threshold: 0.9 });
      expect(results.length).toBe(0);
    });
  });

  describe('similarity', () => {
    it('should use levenshtein by default', () => {
      const result = similarity('hello', 'hallo');
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should support dice algorithm', () => {
      const result = similarity('hello', 'hello', { algorithm: 'dice' });
      expect(result).toBe(1);
    });

    it('should support jaroWinkler algorithm', () => {
      const result = similarity('hello', 'hallo', { algorithm: 'jaroWinkler' });
      expect(result).toBeGreaterThan(0);
    });

    it('should support hamming algorithm for same length strings', () => {
      const result = similarity('hello', 'hallo', { algorithm: 'hamming' });
      expect(result).toBeGreaterThan(0);
    });

    it('should return 0 for hamming with different length strings', () => {
      const result = similarity('hello', 'hi', { algorithm: 'hamming' });
      expect(result).toBe(0);
    });

    it('should support cosine algorithm', () => {
      const result = similarity('hello world', 'hello world', { algorithm: 'cosine' });
      expect(result).toBeCloseTo(1);
    });

    it('should use default algorithm for unknown algorithm', () => {
      // @ts-expect-error - testing invalid algorithm
      const result = similarity('hello', 'hallo', { algorithm: 'unknown' });
      expect(result).toBeGreaterThan(0);
    });
  });
});
