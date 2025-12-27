/// <reference types="vitest/globals" />
import { str } from '../../src/index.js';

describe('Namespace API (str.*)', () => {
  describe('str.case', () => {
    it('should have case methods', () => {
      expect(str.case.camel('hello world')).toBe('helloWorld');
      expect(str.case.kebab('helloWorld')).toBe('hello-world');
      expect(str.case.snake('helloWorld')).toBe('hello_world');
      expect(str.case.pascal('hello world')).toBe('HelloWorld');
      expect(str.case.title('hello world')).toBe('Hello World');
      expect(str.case.constant('hello world')).toBe('HELLO_WORLD');
    });
  });

  describe('str.manipulation', () => {
    it('should have manipulation methods', () => {
      expect(str.manipulation.trim('  hello  ')).toBe('hello');
      expect(str.manipulation.reverse('hello')).toBe('olleh');
      expect(str.manipulation.repeat('ab', 3)).toBe('ababab');
      expect(str.manipulation.truncate('hello world', 8)).toBe('hello...');
    });
  });

  describe('str.validate', () => {
    it('should have validation methods', () => {
      expect(str.validate.email('test@test.com')).toBe(true);
      expect(str.validate.url('https://example.com')).toBe(true);
      expect(str.validate.empty('')).toBe(true);
      expect(str.validate.blank('   ')).toBe(true);
    });
  });

  describe('str.sanitize', () => {
    it('should have sanitization methods', () => {
      expect(str.sanitize.slugify('Hello World!')).toBe('hello-world');
      expect(str.sanitize.escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(str.sanitize.stripHtml('<p>Hello</p>')).toBe('Hello');
    });
  });

  describe('str.format', () => {
    it('should have formatting methods', () => {
      expect(str.format.template('Hello, {{name}}!', { name: 'World' })).toBe('Hello, World!');
      expect(str.format.sprintf('%s has %d apples', 'John', 5)).toBe('John has 5 apples');
      expect(str.format.mask('1234567890', '(###) ###-####')).toBe('(123) 456-7890');
    });
  });

  describe('str.similarity', () => {
    it('should have similarity methods', () => {
      expect(str.similarity.levenshtein('kitten', 'sitting')).toBe(3);
      expect(str.similarity.dice('hello', 'hello')).toBe(1);
    });
  });

  describe('str.analysis', () => {
    it('should have analysis methods', () => {
      expect(str.analysis.wordCount('hello world')).toBe(2);
      expect(str.analysis.charCount('hello')).toBe(5);
      expect(str.analysis.lineCount('a\nb\nc')).toBe(3);
    });
  });

  describe('str.plural', () => {
    it('should have pluralization methods', () => {
      expect(str.plural.plural('apple')).toBe('apples');
      expect(str.plural.singular('apples')).toBe('apple');
      expect(str.plural.isPlural('apples')).toBe(true);
    });
  });

  describe('str.diff', () => {
    it('should have diff methods', () => {
      const result = str.diff.diffChars('hello', 'hallo');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('str.search', () => {
    it('should have search methods', () => {
      expect(str.search.contains('hello world', 'world')).toBe(true);
      expect(str.search.indexOf('hello', 'l')).toBe(2);
      expect(str.search.countOccurrences('abracadabra', 'a')).toBe(5);
    });
  });
});
