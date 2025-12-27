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
});
