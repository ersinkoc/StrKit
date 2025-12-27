/// <reference types="vitest/globals" />
import {
  trim,
  trimStart,
  trimEnd,
  pad,
  padStart,
  padEnd,
  repeat,
  reverse,
  truncate,
  wrap,
  unwrap,
  splice,
  insert,
  remove,
  replace,
  replaceAll,
  between,
  before,
  after,
  beforeLast,
  afterLast,
  append,
  prepend,
  surround,
  collapseWhitespace,
  lines,
  words,
  chars,
} from '../../../src/plugins/manipulation/index.js';

describe('Manipulation Plugin', () => {
  describe('trim', () => {
    it('should trim whitespace', () => {
      expect(trim('  hello  ')).toBe('hello');
      expect(trim('\t\nhello\t\n')).toBe('hello');
    });

    it('should trim custom characters', () => {
      expect(trim('##hello##', '#')).toBe('hello');
      expect(trim('--hello--', '-')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(trim('')).toBe('');
    });
  });

  describe('trimStart', () => {
    it('should trim from start', () => {
      expect(trimStart('  hello')).toBe('hello');
      expect(trimStart('##hello', '#')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(trimStart('')).toBe('');
    });
  });

  describe('trimEnd', () => {
    it('should trim from end', () => {
      expect(trimEnd('hello  ')).toBe('hello');
      expect(trimEnd('hello##', '#')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(trimEnd('')).toBe('');
    });
  });

  describe('pad', () => {
    it('should pad both sides', () => {
      expect(pad('hello', 11, '-')).toBe('---hello---');
      expect(pad('hi', 6, '*')).toBe('**hi**');
    });

    it('should handle string already at length', () => {
      expect(pad('hello', 5)).toBe('hello');
      expect(pad('hello', 3)).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(pad('', 4, 'x')).toBe('xxxx');
    });
  });

  describe('padStart', () => {
    it('should pad at start', () => {
      expect(padStart('5', 3, '0')).toBe('005');
      expect(padStart('hello', 8, '-')).toBe('---hello');
    });

    it('should handle string already at length', () => {
      expect(padStart('hello', 5)).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(padStart('', 3, 'x')).toBe('xxx');
    });
  });

  describe('padEnd', () => {
    it('should pad at end', () => {
      expect(padEnd('5', 3, '0')).toBe('500');
      expect(padEnd('hello', 8, '-')).toBe('hello---');
    });

    it('should handle string already at length', () => {
      expect(padEnd('hello', 5)).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(padEnd('', 3, 'x')).toBe('xxx');
    });
  });

  describe('repeat', () => {
    it('should repeat string', () => {
      expect(repeat('ab', 3)).toBe('ababab');
      expect(repeat('x', 5)).toBe('xxxxx');
    });

    it('should handle zero count', () => {
      expect(repeat('hello', 0)).toBe('');
      expect(repeat('hello', -1)).toBe('');
    });

    it('should handle empty string', () => {
      expect(repeat('', 5)).toBe('');
    });
  });

  describe('reverse', () => {
    it('should reverse string', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('abc')).toBe('cba');
    });

    it('should handle empty string', () => {
      expect(reverse('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('should truncate with ellipsis at end', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    it('should truncate with ellipsis at start', () => {
      expect(truncate('hello world', 8, { position: 'start' })).toBe('...world');
    });

    it('should truncate with ellipsis in middle', () => {
      expect(truncate('hello world', 8, { position: 'middle' })).toBe('hel...ld');
    });

    it('should use custom ellipsis', () => {
      expect(truncate('hello world', 8, { ellipsis: '..' })).toBe('hello ..');
    });

    it('should handle string shorter than length', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('should handle length smaller than ellipsis', () => {
      expect(truncate('hello world', 2)).toBe('..');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('wrap', () => {
    it('should wrap with same character', () => {
      expect(wrap('hello', '"')).toBe('"hello"');
    });

    it('should wrap with different characters', () => {
      expect(wrap('hello', '[', ']')).toBe('[hello]');
      expect(wrap('hello', '(', ')')).toBe('(hello)');
    });

    it('should handle empty string', () => {
      expect(wrap('', '*')).toBe('**');
    });
  });

  describe('unwrap', () => {
    it('should unwrap with same character', () => {
      expect(unwrap('"hello"', '"')).toBe('hello');
    });

    it('should unwrap with different characters', () => {
      expect(unwrap('[hello]', '[', ']')).toBe('hello');
    });

    it('should not unwrap if not wrapped', () => {
      expect(unwrap('hello', '"')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(unwrap('', '"')).toBe('');
    });
  });

  describe('splice', () => {
    it('should splice string', () => {
      expect(splice('hello', 2, 2, 'XY')).toBe('heXYo');
      expect(splice('hello', 0, 2, 'XX')).toBe('XXllo');
    });

    it('should handle empty input', () => {
      expect(splice('', 0, 0, 'abc')).toBe('abc');
    });
  });

  describe('insert', () => {
    it('should insert at position', () => {
      expect(insert('hello', 2, 'XY')).toBe('heXYllo');
    });

    it('should insert at start', () => {
      expect(insert('hello', 0, 'XX')).toBe('XXhello');
      expect(insert('hello', -5, 'XX')).toBe('XXhello');
    });

    it('should insert at end', () => {
      expect(insert('hello', 100, 'XX')).toBe('helloXX');
    });

    it('should handle empty input', () => {
      expect(insert('', 0, 'abc')).toBe('abc');
    });
  });

  describe('remove', () => {
    it('should remove characters', () => {
      expect(remove('hello', 1, 3)).toBe('ho');
      expect(remove('hello', 0, 2)).toBe('llo');
    });

    it('should handle negative start', () => {
      expect(remove('hello', -5, 2)).toBe('llo');
    });

    it('should handle zero count', () => {
      expect(remove('hello', 2, 0)).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(remove('', 0, 5)).toBe('');
    });
  });

  describe('replace', () => {
    it('should replace first occurrence', () => {
      expect(replace('hello', 'l', 'L')).toBe('heLlo');
    });

    it('should replace with regex', () => {
      expect(replace('hello', /[aeiou]/, 'X')).toBe('hXllo');
    });

    it('should handle empty input', () => {
      expect(replace('', 'a', 'b')).toBe('');
    });
  });

  describe('replaceAll', () => {
    it('should replace all occurrences', () => {
      expect(replaceAll('hello', 'l', 'L')).toBe('heLLo');
    });

    it('should replace with regex', () => {
      expect(replaceAll('hello', /[aeiou]/g, 'X')).toBe('hXllX');
      expect(replaceAll('hello', /[aeiou]/, 'X')).toBe('hXllX');
    });

    it('should handle empty input', () => {
      expect(replaceAll('', 'a', 'b')).toBe('');
    });
  });

  describe('between', () => {
    it('should get string between delimiters', () => {
      expect(between('<tag>', '<', '>')).toBe('tag');
      expect(between('[hello]', '[', ']')).toBe('hello');
    });

    it('should return empty if delimiters not found', () => {
      expect(between('hello', '<', '>')).toBe('');
      expect(between('<hello', '<', '>')).toBe('');
    });

    it('should handle empty input', () => {
      expect(between('', '<', '>')).toBe('');
    });
  });

  describe('before', () => {
    it('should get string before first occurrence', () => {
      expect(before('hello@world', '@')).toBe('hello');
    });

    it('should return full string if not found', () => {
      expect(before('hello', '@')).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(before('', '@')).toBe('');
    });
  });

  describe('after', () => {
    it('should get string after first occurrence', () => {
      expect(after('hello@world', '@')).toBe('world');
    });

    it('should return empty if not found', () => {
      expect(after('hello', '@')).toBe('');
    });

    it('should handle empty input', () => {
      expect(after('', '@')).toBe('');
    });
  });

  describe('beforeLast', () => {
    it('should get string before last occurrence', () => {
      expect(beforeLast('hello@world@test', '@')).toBe('hello@world');
    });

    it('should return full string if not found', () => {
      expect(beforeLast('hello', '@')).toBe('hello');
    });

    it('should handle empty input', () => {
      expect(beforeLast('', '@')).toBe('');
    });
  });

  describe('afterLast', () => {
    it('should get string after last occurrence', () => {
      expect(afterLast('hello@world@test', '@')).toBe('test');
    });

    it('should return empty if not found', () => {
      expect(afterLast('hello', '@')).toBe('');
    });

    it('should handle empty input', () => {
      expect(afterLast('', '@')).toBe('');
    });
  });

  describe('append', () => {
    it('should append strings', () => {
      expect(append('hello', ' ', 'world')).toBe('hello world');
    });

    it('should handle null/undefined input', () => {
      expect(append(null as unknown as string, 'test')).toBe('test');
    });
  });

  describe('prepend', () => {
    it('should prepend strings', () => {
      expect(prepend('world', 'hello', ' ')).toBe('hello world');
    });

    it('should handle null/undefined input', () => {
      expect(prepend(null as unknown as string, 'test')).toBe('test');
    });
  });

  describe('surround', () => {
    it('should surround with string', () => {
      expect(surround('hello', '***')).toBe('***hello***');
    });

    it('should handle null/undefined input', () => {
      expect(surround(null as unknown as string, '*')).toBe('**');
    });
  });

  describe('collapseWhitespace', () => {
    it('should collapse whitespace', () => {
      expect(collapseWhitespace('hello   world\n\ntest')).toBe('hello world test');
    });

    it('should handle empty input', () => {
      expect(collapseWhitespace('')).toBe('');
    });
  });

  describe('lines', () => {
    it('should split into lines', () => {
      expect(lines('a\nb\nc')).toEqual(['a', 'b', 'c']);
      expect(lines('a\r\nb')).toEqual(['a', 'b']);
    });

    it('should handle empty input', () => {
      expect(lines('')).toEqual([]);
    });
  });

  describe('words', () => {
    it('should split into words', () => {
      expect(words('hello world')).toEqual(['hello', 'world']);
      expect(words('  hello   world  ')).toEqual(['hello', 'world']);
    });

    it('should handle empty input', () => {
      expect(words('')).toEqual([]);
    });
  });

  describe('chars', () => {
    it('should split into characters', () => {
      expect(chars('hello')).toEqual(['h', 'e', 'l', 'l', 'o']);
    });

    it('should handle empty input', () => {
      expect(chars('')).toEqual([]);
    });
  });
});
