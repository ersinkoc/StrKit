/// <reference types="vitest/globals" />
import {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
  sentenceCase,
  constantCase,
  dotCase,
  pathCase,
  headerCase,
  swapCase,
  toUpper,
  toLower,
  capitalize,
  decapitalize,
} from '../../../src/plugins/case/index.js';

describe('Case Plugin', () => {
  describe('camelCase', () => {
    it('should convert space-separated words', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
    });

    it('should convert kebab-case', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert snake_case', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
    });

    it('should convert PascalCase', () => {
      expect(camelCase('HelloWorld')).toBe('helloWorld');
    });

    it('should handle empty string', () => {
      expect(camelCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(camelCase('hello')).toBe('hello');
    });

    it('should handle multiple spaces', () => {
      expect(camelCase('hello   world')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
    });

    it('should convert PascalCase', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });

    it('should convert spaces', () => {
      expect(kebabCase('hello world')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(kebabCase('')).toBe('');
    });
  });

  describe('snakeCase', () => {
    it('should convert camelCase', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
    });

    it('should convert spaces', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
    });

    it('should handle empty string', () => {
      expect(snakeCase('')).toBe('');
    });
  });

  describe('pascalCase', () => {
    it('should convert camelCase', () => {
      expect(pascalCase('helloWorld')).toBe('HelloWorld');
    });

    it('should convert spaces', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
    });

    it('should handle empty string', () => {
      expect(pascalCase('')).toBe('');
    });
  });

  describe('titleCase', () => {
    it('should convert spaces', () => {
      expect(titleCase('hello world')).toBe('Hello World');
    });

    it('should convert camelCase', () => {
      expect(titleCase('helloWorld')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(titleCase('')).toBe('');
    });
  });

  describe('sentenceCase', () => {
    it('should capitalize first letter only', () => {
      expect(sentenceCase('hello world')).toBe('Hello world');
    });

    it('should handle UPPERCASE', () => {
      expect(sentenceCase('HELLO WORLD')).toBe('Hello world');
    });

    it('should handle empty string', () => {
      expect(sentenceCase('')).toBe('');
    });
  });

  describe('constantCase', () => {
    it('should convert to uppercase with underscores', () => {
      expect(constantCase('hello world')).toBe('HELLO_WORLD');
    });

    it('should convert camelCase', () => {
      expect(constantCase('helloWorld')).toBe('HELLO_WORLD');
    });

    it('should handle empty string', () => {
      expect(constantCase('')).toBe('');
    });
  });

  describe('dotCase', () => {
    it('should convert to dot-separated lowercase', () => {
      expect(dotCase('hello world')).toBe('hello.world');
    });

    it('should convert camelCase', () => {
      expect(dotCase('helloWorld')).toBe('hello.world');
    });

    it('should handle empty string', () => {
      expect(dotCase('')).toBe('');
    });
  });

  describe('pathCase', () => {
    it('should convert to path-separated lowercase', () => {
      expect(pathCase('hello world')).toBe('hello/world');
    });

    it('should convert camelCase', () => {
      expect(pathCase('helloWorld')).toBe('hello/world');
    });

    it('should handle empty string', () => {
      expect(pathCase('')).toBe('');
    });
  });

  describe('headerCase', () => {
    it('should convert to Header-Case', () => {
      expect(headerCase('hello world')).toBe('Hello-World');
    });

    it('should convert camelCase', () => {
      expect(headerCase('helloWorld')).toBe('Hello-World');
    });

    it('should handle empty string', () => {
      expect(headerCase('')).toBe('');
    });
  });

  describe('swapCase', () => {
    it('should swap case of each character', () => {
      expect(swapCase('Hello World')).toBe('hELLO wORLD');
    });

    it('should handle empty string', () => {
      expect(swapCase('')).toBe('');
    });
  });

  describe('toUpper', () => {
    it('should convert to uppercase', () => {
      expect(toUpper('hello')).toBe('HELLO');
    });

    it('should handle empty string', () => {
      expect(toUpper('')).toBe('');
    });

    it('should handle locale', () => {
      expect(toUpper('istanbul', { locale: 'tr' })).toBe('İSTANBUL');
    });
  });

  describe('toLower', () => {
    it('should convert to lowercase', () => {
      expect(toLower('HELLO')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(toLower('')).toBe('');
    });

    it('should handle locale', () => {
      expect(toLower('ISTANBUL', { locale: 'tr' })).toBe('ıstanbul');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('decapitalize', () => {
    it('should lowercase first letter', () => {
      expect(decapitalize('Hello')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(decapitalize('')).toBe('');
    });
  });
});
