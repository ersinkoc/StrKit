/// <reference types="vitest/globals" />
import {
  diff,
  diffChars,
  diffWords,
  diffLines,
  createPatch,
  applyPatch,
  reversePatch,
} from '../../../src/plugins/diff/index.js';

describe('Diff Plugin', () => {
  describe('diffChars', () => {
    it('should diff identical strings', () => {
      expect(diffChars('hello', 'hello')).toEqual([{ type: 'equal', value: 'hello' }]);
    });

    it('should diff different strings', () => {
      const result = diffChars('hello', 'hallo');
      expect(result.some((d) => d.type === 'remove' && d.value === 'e')).toBe(true);
      expect(result.some((d) => d.type === 'add' && d.value === 'a')).toBe(true);
    });

    it('should handle empty strings', () => {
      expect(diffChars('', '')).toEqual([]);
      expect(diffChars('', 'hello')).toEqual([{ type: 'add', value: 'hello' }]);
      expect(diffChars('hello', '')).toEqual([{ type: 'remove', value: 'hello' }]);
    });
  });

  describe('diffWords', () => {
    it('should diff identical strings', () => {
      expect(diffWords('hello world', 'hello world')).toEqual([
        { type: 'equal', value: 'hello world' },
      ]);
    });

    it('should diff different strings', () => {
      const result = diffWords('hello world', 'hello there world');
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle empty strings', () => {
      expect(diffWords('', '')).toEqual([]);
    });
  });

  describe('diffLines', () => {
    it('should diff identical strings', () => {
      expect(diffLines('line1\nline2', 'line1\nline2')).toEqual([
        { type: 'equal', value: 'line1\nline2' },
      ]);
    });

    it('should diff different lines', () => {
      const result = diffLines('line1\nline2', 'line1\nline3');
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle empty strings', () => {
      expect(diffLines('', '')).toEqual([]);
    });
  });

  describe('diff', () => {
    it('should default to char granularity', () => {
      const result = diff('hello', 'hallo');
      expect(result).toEqual(diffChars('hello', 'hallo'));
    });

    it('should support word granularity', () => {
      const result = diff('hello world', 'hello there', { granularity: 'word' });
      expect(result).toEqual(diffWords('hello world', 'hello there'));
    });

    it('should support line granularity', () => {
      const result = diff('line1\nline2', 'line1\nline3', { granularity: 'line' });
      expect(result).toEqual(diffLines('line1\nline2', 'line1\nline3'));
    });
  });

  describe('createPatch', () => {
    it('should create patch for different content', () => {
      const patch = createPatch('file.txt', 'old content', 'new content');
      expect(patch).toContain('--- a/file.txt');
      expect(patch).toContain('+++ b/file.txt');
      expect(patch).toContain('@@');
    });

    it('should return empty for identical content', () => {
      const patch = createPatch('file.txt', 'same content', 'same content');
      expect(patch).toBe('');
    });

    it('should handle multi-line content', () => {
      const patch = createPatch('file.txt', 'line1\nline2\nline3', 'line1\nmodified\nline3');
      expect(patch).toContain('-line2');
      expect(patch).toContain('+modified');
    });
  });

  describe('applyPatch', () => {
    it('should apply patch to original content', () => {
      const original = 'old content';
      const modified = 'new content';
      const patch = createPatch('file.txt', original, modified);
      const result = applyPatch(original, patch);
      expect(result).toBe(modified);
    });

    it('should handle multi-line patches', () => {
      const original = 'line1\nline2\nline3';
      const modified = 'line1\nmodified\nline3';
      const patch = createPatch('file.txt', original, modified);
      const result = applyPatch(original, patch);
      expect(result).toBe(modified);
    });

    it('should skip empty patch lines', () => {
      const result = applyPatch('hello', '');
      expect(result).toBe('hello');
    });
  });

  describe('reversePatch', () => {
    it('should reverse a patch', () => {
      const patch = createPatch('file.txt', 'old', 'new');
      const reversed = reversePatch(patch);
      expect(reversed).toContain('--- b/file.txt');
      expect(reversed).toContain('+++ a/file.txt');
    });

    it('should swap add and remove', () => {
      const patch = '-removed\n+added';
      const reversed = reversePatch(patch);
      expect(reversed).toContain('+removed');
      expect(reversed).toContain('-added');
    });
  });
});
