/// <reference types="vitest/globals" />
import { S, str } from '../../src/index.js';
import { registerPlugin } from '../../src/core/kernel.js';
import type { StrKitPlugin } from '../../src/core/types.js';

/**
 * Tests specifically targeting coverage gaps
 */

describe('Coverage Gap Tests', () => {
  describe('Chain API - IPv4/IPv6 validation', () => {
    it('should validate IPv4 via chain', () => {
      expect(S('192.168.1.1').isIpv4()).toBe(true);
      expect(S('256.1.1.1').isIpv4()).toBe(false);
      expect(S('not-an-ip').isIpv4()).toBe(false);
    });

    it('should validate IPv6 via chain', () => {
      expect(S('2001:0db8:85a3:0000:0000:8a2e:0370:7334').isIpv6()).toBe(true);
      expect(S('::1').isIpv6()).toBe(true);
      expect(S('not-an-ip').isIpv6()).toBe(false);
    });
  });

  describe('Kernel - Plugin validation', () => {
    it('should throw error for plugin without methods object (null)', () => {
      const badPlugin = {
        name: 'bad-plugin-null-methods-test',
        version: '1.0.0',
        methods: null as any,
      };
      expect(() => registerPlugin(badPlugin as StrKitPlugin)).toThrow(
        "Plugin 'bad-plugin-null-methods-test' must have a methods object"
      );
    });

    it('should throw error for plugin with non-object methods (string)', () => {
      const badPlugin = {
        name: 'bad-plugin-string-methods-test',
        version: '1.0.0',
        methods: 'not-an-object' as any,
      };
      expect(() => registerPlugin(badPlugin as StrKitPlugin)).toThrow(
        "Plugin 'bad-plugin-string-methods-test' must have a methods object"
      );
    });

    it('should handle plugin with undefined dependencies', () => {
      const plugin: StrKitPlugin = {
        name: 'no-deps-plugin-coverage-test',
        version: '1.0.0',
        methods: { test: () => 'test' },
        // dependencies is undefined - this should be fine
      };
      expect(() => registerPlugin(plugin)).not.toThrow();
    });
  });

  describe('Case Plugin - swapCase with locale', () => {
    it('should swap case with Turkish locale', () => {
      // Turkish has special i/I handling
      const result = str.case.swap('Hello', { locale: 'tr' });
      expect(result).toBe('hELLO');
    });

    it('should swap case with locale option', () => {
      const result = str.case.swap('HeLLo', { locale: 'en' });
      expect(result).toBe('hEllO');
    });

    it('should swap case with German locale', () => {
      // ß character in German
      const result = str.case.swap('Abc', { locale: 'de' });
      expect(result).toBe('aBC');
    });
  });

  describe('Diff Plugin - createPatch with add operations', () => {
    it('should create patch with added lines at start', () => {
      const original = 'line2\nline3';
      const modified = 'line1\nline2\nline3';
      const patch = str.diff.createPatch('file.txt', original, modified);
      expect(patch).toContain('+line1');
    });

    it('should create patch with only additions', () => {
      const original = '';
      const modified = 'new line';
      const patch = str.diff.createPatch('file.txt', original, modified);
      expect(patch).toContain('+new line');
    });

    it('should handle additions at the end', () => {
      const original = 'line1';
      const modified = 'line1\nline2';
      const patch = str.diff.createPatch('file.txt', original, modified);
      expect(patch).toContain('+line2');
    });
  });

  describe('Formatting Plugin - ordinalize with locale rules', () => {
    it('should format ordinal with Spanish locale', () => {
      // Spanish uses 'o' suffix: 1o, 2o, etc.
      const result = str.format.ordinalize(1, 'es');
      expect(result).toBe('1o');
    });

    it('should format ordinal with French locale', () => {
      // French: 1er, 2e, 3e...
      const result1 = str.format.ordinalize(1, 'fr');
      expect(result1).toBe('1er');

      const result2 = str.format.ordinalize(2, 'fr');
      expect(result2).toBe('2e');
    });

    it('should format ordinal with German locale', () => {
      // German: 1., 2., 3.
      const result = str.format.ordinalize(1, 'de');
      expect(result).toBe('1.');
    });

    it('should format ordinal with Turkish locale', () => {
      // Turkish: 1., 2., 3.
      const result = str.format.ordinalize(1, 'tr');
      expect(result).toBe('1.');
    });
  });

  describe('Formatting Plugin - formatCurrency', () => {
    it('should format currency with USD', () => {
      const result = str.format.currency(1234.56, { currency: 'USD', locale: 'en-US' });
      expect(result).toContain('1,234.56');
    });

    it('should format currency with EUR and German locale', () => {
      const result = str.format.currency(1234.56, { currency: 'EUR', locale: 'de-DE' });
      // German uses comma for decimal
      expect(result).toMatch(/1[.,]234[.,]56/);
    });

    it('should format currency with symbol option', () => {
      const result = str.format.currency(100, { currency: 'GBP', symbol: '£' });
      expect(result).toContain('£');
    });
  });

  describe('Pluralization Plugin - isPlural/isSingular with custom uncountables', () => {
    it('should handle custom uncountables in isPlural', () => {
      str.plural.addUncountable('middleware');
      expect(str.plural.isPlural('middleware')).toBe(true);
    });

    it('should handle custom uncountables in isSingular', () => {
      str.plural.addUncountable('firmware');
      expect(str.plural.isSingular('firmware')).toBe(true);
    });

    it('should handle built-in uncountables', () => {
      expect(str.plural.isPlural('sheep')).toBe(true);
      expect(str.plural.isSingular('sheep')).toBe(true);
    });
  });

  describe('Sanitization Plugin - slugify with locale', () => {
    it('should slugify with locale option for lowercase', () => {
      // The locale option affects the toLocaleLowerCase call
      const result = str.sanitize.slugify('HELLO WORLD', {
        lowercase: true,
        locale: 'en',
      });
      expect(result).toBe('hello-world');
    });

    it('should slugify without locale uses toLowerCase', () => {
      const result = str.sanitize.slugify('HELLO WORLD', {
        lowercase: true,
      });
      expect(result).toBe('hello-world');
    });
  });

  describe('Search Plugin - lastIndexOf with options', () => {
    it('should find lastIndexOf case-insensitive with fromIndex', () => {
      const result = str.search.lastIndexOf('Hello HELLO hello', 'HELLO', {
        caseSensitive: false,
        fromIndex: 10,
      });
      expect(result).toBe(6);
    });

    it('should find lastIndexOf case-insensitive without fromIndex', () => {
      const result = str.search.lastIndexOf('Hello HELLO', 'hello', {
        caseSensitive: false,
      });
      expect(result).toBe(6);
    });

    it('should return -1 when not found case-insensitive', () => {
      const result = str.search.lastIndexOf('Hello World', 'xyz', {
        caseSensitive: false,
      });
      expect(result).toBe(-1);
    });
  });

  describe('Chain API - Additional methods coverage', () => {
    it('should use pad() method in chain', () => {
      const result = S('hi').pad(6, '*').value;
      expect(result).toBe('**hi**');
    });

    it('should use unescape() method in chain', () => {
      const result = S('&lt;div&gt;').unescapeHtml().value;
      expect(result).toBe('<div>');
    });

    it('should use escape() method in chain', () => {
      const result = S("Hello 'World'").escape().value;
      expect(result).toContain('\\');
    });

    it('should use unescape for special chars', () => {
      const result = S("\\'test\\'").unescape().value;
      expect(result).toBe("'test'");
    });
  });

  describe('Pluralization Plugin - singularize custom irregulars', () => {
    it('should singularize custom irregular plural', () => {
      // Add a custom irregular: cactus -> cacti
      str.plural.addIrregular('cactus', 'cacti');
      // When we singularize 'cacti', it should return 'cactus'
      const result = str.plural.singular('cacti');
      expect(result).toBe('cactus');
    });

    it('should handle built-in reversed irregulars in singularize', () => {
      const result = str.plural.singular('people');
      expect(result).toBe('person');
    });
  });

  describe('Formatting Plugin - sprintf edge cases', () => {
    it('should handle sprintf with null argument', () => {
      const result = str.format.sprintf('Value: %s', null);
      expect(result).toBe('Value: ');
    });

    it('should handle sprintf with undefined argument', () => {
      const result = str.format.sprintf('Value: %s', undefined);
      expect(result).toBe('Value: ');
    });

    it('should handle sprintf with unknown format specifier', () => {
      // 'q' is not a valid specifier, kept as-is
      const result = str.format.sprintf('Value: %q', 'test');
      expect(result).toBe('Value: %q');
    });
  });

  describe('Chain API - getValue legacy method', () => {
    it('should use getValue() legacy method', () => {
      const chain = S('hello');
      expect(chain.getValue()).toBe('hello');
    });
  });

  describe('Pluralization - count edge cases', () => {
    it('should pluralize with count=1 and showCount=true', () => {
      const result = str.plural.plural('apple', 1, true);
      expect(result).toBe('1 apple');
    });

    it('should pluralize with count=1 and showCount=false', () => {
      const result = str.plural.plural('apple', 1, false);
      expect(result).toBe('apple');
    });

    it('should pluralize with count=0 and showCount=true', () => {
      const result = str.plural.plural('apple', 0, true);
      expect(result).toBe('0 apples');
    });

    it('should add s when no special rule matches', () => {
      // A word that doesn't match any special pluralization rule gets default 's' suffix
      const result = str.plural.plural('xyz123', 2);
      expect(result).toBe('xyz123s');
    });
  });

  describe('Kernel - Plugin with satisfied dependencies', () => {
    it('should register plugin with satisfied dependencies', () => {
      // First register a base plugin
      const basePlugin: StrKitPlugin = {
        name: 'base-plugin-for-deps',
        version: '1.0.0',
        methods: { base: () => 'base' },
      };
      registerPlugin(basePlugin);

      // Then register a plugin that depends on it
      const dependentPlugin: StrKitPlugin = {
        name: 'dependent-plugin-test',
        version: '1.0.0',
        methods: { dep: () => 'dep' },
        dependencies: ['base-plugin-for-deps'],
      };
      expect(() => registerPlugin(dependentPlugin)).not.toThrow();
    });
  });

  describe('Case Plugin - locale branch coverage', () => {
    it('should handle titleCase with locale', () => {
      const result = str.case.title('hello world', { locale: 'en' });
      expect(result).toBe('Hello World');
    });

    it('should handle pascalCase with locale', () => {
      const result = str.case.pascal('hello world', { locale: 'en' });
      expect(result).toBe('HelloWorld');
    });

    it('should handle headerCase with locale', () => {
      const result = str.case.header('hello world', { locale: 'en' });
      expect(result).toBe('Hello-World');
    });

    it('should handle capitalize with locale', () => {
      const result = str.case.capitalize('hello', { locale: 'tr' });
      expect(result).toBe('Hello');
    });

    it('should handle decapitalize with locale', () => {
      const result = str.case.decapitalize('Hello', { locale: 'tr' });
      expect(result).toBe('hello');
    });
  });

  describe('Similarity Plugin - edge cases', () => {
    it('should handle jaroWinkler with empty strings', () => {
      expect(str.similarity.jaroWinkler('', '')).toBe(1);
      expect(str.similarity.jaroWinkler('abc', '')).toBe(0);
      expect(str.similarity.jaroWinkler('', 'abc')).toBe(0);
    });

    it('should handle jaroWinkler with identical strings', () => {
      expect(str.similarity.jaroWinkler('hello', 'hello')).toBe(1);
    });

    it('should handle cosine with empty strings', () => {
      expect(str.similarity.cosine('', '')).toBe(1);
      expect(str.similarity.cosine('abc', '')).toBe(0);
    });

    it('should handle hamming with different lengths', () => {
      expect(() => str.similarity.hamming('abc', 'abcd')).toThrow('Hamming distance requires strings of equal length');
    });

    it('should handle hamming with equal length strings', () => {
      expect(str.similarity.hamming('abc', 'abc')).toBe(0);
      expect(str.similarity.hamming('abc', 'abd')).toBe(1);
    });
  });

  describe('Validation Plugin - edge cases', () => {
    it('should validate phone formats', () => {
      expect(str.validate.phone('+1-555-555-5555')).toBe(true);
      expect(str.validate.phone('invalid')).toBe(false);
    });

    it('should validate credit card formats', () => {
      expect(str.validate.creditCard('4111111111111111')).toBe(true);
      expect(str.validate.creditCard('invalid')).toBe(false);
    });

    it('should validate hex format', () => {
      expect(str.validate.hex('ff00ff')).toBe(true);
      expect(str.validate.hex('zzzzzz')).toBe(false);
    });

    it('should validate base64 format', () => {
      expect(str.validate.base64('SGVsbG8gV29ybGQ=')).toBe(true);
      expect(str.validate.base64('not base64!!!')).toBe(false);
    });
  });

  describe('Manipulation Plugin - edge cases', () => {
    it('should handle wrap with custom break', () => {
      const result = str.manipulation.wrap('hello world test string', 12);
      expect(typeof result).toBe('string');
    });

    it('should handle insert with index', () => {
      const result = str.manipulation.insert('hello', 5, ' world');
      expect(result).toBe('hello world');
    });
  });

  describe('Diff Plugin - additional edge cases', () => {
    it('should handle createPatch with modifications', () => {
      const original = 'line1\nline2\nline3';
      const modified = 'line1\nmodified\nline3';
      const result = str.diff.createPatch('test.txt', original, modified);
      expect(result).toContain('-line2');
      expect(result).toContain('+modified');
    });

    it('should handle diffWords with punctuation', () => {
      const result = str.diff.diffWords('Hello, world!', 'Hello, universe!');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Search Plugin - additional edge cases', () => {
    it('should handle findSimilar with threshold', () => {
      const result = str.similarity.findSimilar('helo', ['hello', 'world', 'help'], { threshold: 0.5 });
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle indexOf with fromIndex beyond string length', () => {
      const result = str.search.indexOf('hello', 'l', { fromIndex: 100 });
      expect(result).toBe(-1);
    });
  });

  describe('Sanitization Plugin - additional edge cases', () => {
    it('should handle stripHtml with nested tags', () => {
      const result = str.sanitize.stripHtml('<div><p>Hello</p></div>');
      expect(result).toBe('Hello');
    });

    it('should handle escapeHtml with all special chars', () => {
      const result = str.sanitize.escapeHtml('<>&"\'/');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('Pluralization Plugin - additional edge cases', () => {
    it('should handle words ending in -y preceded by consonant', () => {
      expect(str.plural.plural('baby')).toBe('babies');
      expect(str.plural.singular('babies')).toBe('baby');
    });

    it('should handle words ending in -y preceded by vowel', () => {
      expect(str.plural.plural('day')).toBe('days');
    });

    it('should handle words ending in -o', () => {
      expect(str.plural.plural('hero')).toBe('heroes');
      expect(str.plural.plural('photo')).toBe('photos');
    });
  });

  describe('Chain API - comprehensive method coverage', () => {
    it('should chain multiple case methods', () => {
      const result = S('  HELLO WORLD  ')
        .trim()
        .camelCase()
        .value;
      expect(result).toBe('helloWorld');
    });

    it('should chain validation methods', () => {
      expect(S('test@example.com').isEmail()).toBe(true);
      expect(S('https://example.com').isUrl()).toBe(true);
      expect(S('192.168.1.1').isIp()).toBe(true);
    });

    it('should chain manipulation and formatting', () => {
      const result = S('hello')
        .padStart(10, '*')
        .reverse()
        .value;
      expect(result).toBe('olleh*****');
    });

    it('should use words() method', () => {
      const result = S('hello world').words();
      expect(result).toEqual(['hello', 'world']);
    });

    it('should use chars() method', () => {
      const result = S('hi').chars();
      expect(result).toEqual(['h', 'i']);
    });

    it('should use lines() method', () => {
      const result = S('line1\nline2').lines();
      expect(result).toEqual(['line1', 'line2']);
    });
  });
});
