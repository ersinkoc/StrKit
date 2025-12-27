/// <reference types="vitest/globals" />
import {
  splitChars,
  reverseString,
  splitWords,
  isAscii,
  normalizeWhitespace,
  escapeRegExp,
  getByteLength,
  capitalizeFirst,
  lowercaseFirst,
  toLower,
  toUpper,
  isLetter,
  isUpperCase,
  isLowerCase,
  ensureString,
  getNestedProperty,
  createBigrams,
  tokenize,
} from '../../../src/core/utils.js';

describe('Utils', () => {
  describe('splitChars', () => {
    it('should split ASCII string into characters', () => {
      expect(splitChars('hello')).toEqual(['h', 'e', 'l', 'l', 'o']);
    });

    it('should handle emoji correctly', () => {
      expect(splitChars('👋🌍')).toEqual(['👋', '🌍']);
    });

    it('should handle Chinese characters', () => {
      expect(splitChars('你好')).toEqual(['你', '好']);
    });
  });

  describe('reverseString', () => {
    it('should reverse ASCII string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });

    it('should handle emoji correctly', () => {
      expect(reverseString('👋🌍')).toBe('🌍👋');
    });
  });

  describe('splitWords', () => {
    it('should split camelCase', () => {
      expect(splitWords('camelCase')).toEqual(['camel', 'Case']);
    });

    it('should split PascalCase', () => {
      expect(splitWords('PascalCase')).toEqual(['Pascal', 'Case']);
    });

    it('should split kebab-case', () => {
      expect(splitWords('kebab-case')).toEqual(['kebab', 'case']);
    });

    it('should split snake_case', () => {
      expect(splitWords('snake_case')).toEqual(['snake', 'case']);
    });

    it('should split dot.case', () => {
      expect(splitWords('dot.case')).toEqual(['dot', 'case']);
    });

    it('should split path/case', () => {
      expect(splitWords('path/case')).toEqual(['path', 'case']);
    });

    it('should handle empty string', () => {
      expect(splitWords('')).toEqual([]);
    });

    it('should handle uppercase acronyms', () => {
      expect(splitWords('XMLParser')).toEqual(['XML', 'Parser']);
    });
  });

  describe('isAscii', () => {
    it('should return true for ASCII string', () => {
      expect(isAscii('hello')).toBe(true);
    });

    it('should return false for non-ASCII string', () => {
      expect(isAscii('héllo')).toBe(false);
    });

    it('should handle empty string', () => {
      expect(isAscii('')).toBe(true);
    });
  });

  describe('normalizeWhitespace', () => {
    it('should collapse multiple spaces', () => {
      expect(normalizeWhitespace('hello   world')).toBe('hello world');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(normalizeWhitespace('  hello world  ')).toBe('hello world');
    });

    it('should handle tabs and newlines', () => {
      expect(normalizeWhitespace('hello\t\nworld')).toBe('hello world');
    });
  });

  describe('escapeRegExp', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegExp('a.b*c?')).toBe('a\\.b\\*c\\?');
    });
  });

  describe('getByteLength', () => {
    it('should return correct byte length for ASCII', () => {
      expect(getByteLength('hello')).toBe(5);
    });

    it('should return correct byte length for 2-byte chars', () => {
      expect(getByteLength('ü')).toBe(2);
    });

    it('should return correct byte length for 3-byte chars', () => {
      expect(getByteLength('你')).toBe(3);
    });

    it('should return correct byte length for emoji (4 bytes)', () => {
      expect(getByteLength('👋')).toBe(4);
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize first character', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('');
    });

    it('should handle locale-specific case', () => {
      expect(capitalizeFirst('istanbul', 'tr')).toBe('İstanbul');
    });
  });

  describe('lowercaseFirst', () => {
    it('should lowercase first character', () => {
      expect(lowercaseFirst('Hello')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(lowercaseFirst('')).toBe('');
    });

    it('should handle locale-specific case', () => {
      expect(lowercaseFirst('Istanbul', 'tr')).toBe('ıstanbul');
    });
  });

  describe('toLower', () => {
    it('should convert to lowercase', () => {
      expect(toLower('HELLO')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(toLower('')).toBe('');
    });

    it('should handle locale-specific case', () => {
      expect(toLower('I', 'tr')).toBe('ı');
    });
  });

  describe('toUpper', () => {
    it('should convert to uppercase', () => {
      expect(toUpper('hello')).toBe('HELLO');
    });

    it('should handle empty string', () => {
      expect(toUpper('')).toBe('');
    });

    it('should handle locale-specific case', () => {
      expect(toUpper('i', 'tr')).toBe('İ');
    });
  });

  describe('isLetter', () => {
    it('should return true for letters', () => {
      expect(isLetter('a')).toBe(true);
      expect(isLetter('Z')).toBe(true);
    });

    it('should return false for non-letters', () => {
      expect(isLetter('1')).toBe(false);
      expect(isLetter(' ')).toBe(false);
    });

    it('should handle unicode letters', () => {
      expect(isLetter('é')).toBe(true);
      expect(isLetter('中')).toBe(true);
    });
  });

  describe('isUpperCase', () => {
    it('should return true for uppercase', () => {
      expect(isUpperCase('A')).toBe(true);
    });

    it('should return false for lowercase', () => {
      expect(isUpperCase('a')).toBe(false);
    });

    it('should return false for non-letters', () => {
      expect(isUpperCase('1')).toBe(false);
    });
  });

  describe('isLowerCase', () => {
    it('should return true for lowercase', () => {
      expect(isLowerCase('a')).toBe(true);
    });

    it('should return false for uppercase', () => {
      expect(isLowerCase('A')).toBe(false);
    });

    it('should return false for non-letters', () => {
      expect(isLowerCase('1')).toBe(false);
    });
  });

  describe('ensureString', () => {
    it('should return string as-is', () => {
      expect(ensureString('hello')).toBe('hello');
    });

    it('should convert number to string', () => {
      expect(ensureString(123)).toBe('123');
    });

    it('should return empty string for null', () => {
      expect(ensureString(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(ensureString(undefined)).toBe('');
    });
  });

  describe('getNestedProperty', () => {
    it('should get nested property', () => {
      const obj = { a: { b: { c: 'value' } } };
      expect(getNestedProperty(obj, 'a.b.c')).toBe('value');
    });

    it('should return undefined for missing path', () => {
      const obj = { a: { b: 1 } };
      expect(getNestedProperty(obj, 'a.b.c')).toBeUndefined();
    });

    it('should handle null in path', () => {
      const obj = { a: null } as Record<string, unknown>;
      expect(getNestedProperty(obj, 'a.b')).toBeUndefined();
    });
  });

  describe('createBigrams', () => {
    it('should create bigrams', () => {
      const bigrams = createBigrams('hello');
      expect(bigrams.get('he')).toBe(1);
      expect(bigrams.get('el')).toBe(1);
      expect(bigrams.get('ll')).toBe(1);
      expect(bigrams.get('lo')).toBe(1);
    });

    it('should be case insensitive', () => {
      const bigrams = createBigrams('Hello');
      expect(bigrams.get('he')).toBe(1);
    });
  });

  describe('tokenize', () => {
    it('should split into tokens', () => {
      expect(tokenize('hello world')).toEqual(['hello', 'world']);
    });

    it('should handle multiple spaces', () => {
      expect(tokenize('hello   world')).toEqual(['hello', 'world']);
    });

    it('should be lowercase', () => {
      expect(tokenize('Hello World')).toEqual(['hello', 'world']);
    });
  });
});
