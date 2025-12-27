/// <reference types="vitest/globals" />
// Import locales to register them for locale-aware tests
import '../../../src/locales/index.js';
import {
  template,
  sprintf,
  mask,
  unmask,
  ordinalize,
  formatCurrency,
  formatNumber,
} from '../../../src/plugins/formatting/index.js';

describe('Formatting Plugin', () => {
  describe('template', () => {
    it('should replace placeholders', () => {
      expect(template('Hello, {{name}}!', { name: 'World' })).toBe('Hello, World!');
    });

    it('should handle multiple placeholders', () => {
      expect(template('{{a}} + {{b}} = {{c}}', { a: '1', b: '2', c: '3' })).toBe('1 + 2 = 3');
    });

    it('should handle nested properties', () => {
      expect(template('{{user.name}} is {{user.age}}', { user: { name: 'John', age: 30 } })).toBe(
        'John is 30'
      );
    });

    it('should handle missing values', () => {
      expect(template('Hello, {{name}}!', {})).toBe('Hello, !');
    });

    it('should handle custom delimiters', () => {
      expect(
        template('Hello, <%= name %>!', { name: 'World' }, { openDelimiter: '<%=', closeDelimiter: '%>' })
      ).toBe('Hello, World!');
    });

    it('should handle empty input', () => {
      expect(template('', {})).toBe('');
    });

    it('should handle whitespace in placeholders', () => {
      expect(template('Hello, {{ name }}!', { name: 'World' })).toBe('Hello, World!');
    });
  });

  describe('sprintf', () => {
    it('should format string', () => {
      expect(sprintf('%s has %d apples', 'John', 5)).toBe('John has 5 apples');
    });

    it('should format integers', () => {
      expect(sprintf('%d', 42)).toBe('42');
      expect(sprintf('%i', 42)).toBe('42');
    });

    it('should format floats', () => {
      expect(sprintf('%f', 3.14159)).toContain('3.14');
    });

    it('should format with precision', () => {
      expect(sprintf('%.2f', 3.14159)).toBe('3.14');
      expect(sprintf('%.3s', 'hello')).toBe('hel');
    });

    it('should format hex', () => {
      expect(sprintf('%x', 255)).toBe('ff');
      expect(sprintf('%X', 255)).toBe('FF');
    });

    it('should format octal', () => {
      expect(sprintf('%o', 8)).toBe('10');
    });

    it('should format binary', () => {
      expect(sprintf('%b', 5)).toBe('101');
    });

    it('should handle percent escape', () => {
      expect(sprintf('100%% done')).toBe('100% done');
    });

    it('should handle width', () => {
      expect(sprintf('%5d', 42)).toBe('   42');
    });

    it('should handle zero padding', () => {
      expect(sprintf('%05d', 42)).toBe('00042');
    });

    it('should handle left align', () => {
      expect(sprintf('%-5d', 42)).toBe('42   ');
    });

    it('should handle sign', () => {
      expect(sprintf('%+d', 42)).toBe('+42');
      expect(sprintf('%+d', -42)).toBe('-42');
    });

    it('should handle space sign', () => {
      expect(sprintf('% d', 42)).toBe(' 42');
    });

    it('should handle empty format', () => {
      expect(sprintf('')).toBe('');
    });

    it('should handle char format', () => {
      expect(sprintf('%c', 65)).toBe('A');
      expect(sprintf('%c', 'B')).toBe('B');
    });

    it('should handle negative numbers', () => {
      expect(sprintf('%d', -42)).toBe('-42');
      expect(sprintf('%f', -3.14)).toBe('-3.14');
    });

    it('should handle zero padding with sign', () => {
      expect(sprintf('%+05d', 42)).toBe('+0042');
      expect(sprintf('%05d', -42)).toBe('-0042');
    });
  });

  describe('mask', () => {
    it('should apply mask pattern', () => {
      expect(mask('1234567890', '(###) ###-####')).toBe('(123) 456-7890');
    });

    it('should handle credit card format', () => {
      expect(mask('4111111111111111', '#### #### #### ####')).toBe('4111 1111 1111 1111');
    });

    it('should handle custom mask char', () => {
      expect(mask('12345', '**-**-*', { maskChar: '*' })).toBe('12-34-5');
    });

    it('should handle input shorter than mask', () => {
      expect(mask('123', '(###) ###-####')).toBe('(123) ');
    });

    it('should handle empty input', () => {
      expect(mask('', '###')).toBe('');
    });

    it('should handle empty pattern', () => {
      expect(mask('123', '')).toBe('123');
    });
  });

  describe('unmask', () => {
    it('should remove mask pattern', () => {
      expect(unmask('(123) 456-7890', '(###) ###-####')).toBe('1234567890');
    });

    it('should handle credit card format', () => {
      expect(unmask('4111 1111 1111 1111', '#### #### #### ####')).toBe('4111111111111111');
    });

    it('should handle custom mask char', () => {
      expect(unmask('12-34-5', '**-**-*', { maskChar: '*' })).toBe('12345');
    });

    it('should handle empty input', () => {
      expect(unmask('', '###')).toBe('');
    });

    it('should handle empty pattern', () => {
      expect(unmask('123', '')).toBe('123');
    });
  });

  describe('ordinalize', () => {
    it('should add ordinal suffix', () => {
      expect(ordinalize(1)).toBe('1st');
      expect(ordinalize(2)).toBe('2nd');
      expect(ordinalize(3)).toBe('3rd');
      expect(ordinalize(4)).toBe('4th');
    });

    it('should handle teens', () => {
      expect(ordinalize(11)).toBe('11th');
      expect(ordinalize(12)).toBe('12th');
      expect(ordinalize(13)).toBe('13th');
    });

    it('should handle larger numbers', () => {
      expect(ordinalize(21)).toBe('21st');
      expect(ordinalize(22)).toBe('22nd');
      expect(ordinalize(23)).toBe('23rd');
      expect(ordinalize(100)).toBe('100th');
      expect(ordinalize(101)).toBe('101st');
      expect(ordinalize(111)).toBe('111th');
      expect(ordinalize(112)).toBe('112th');
      expect(ordinalize(113)).toBe('113th');
    });

    it('should handle negative numbers', () => {
      expect(ordinalize(-1)).toBe('-1st');
      expect(ordinalize(-2)).toBe('-2nd');
    });

    it('should handle locale with function rules', () => {
      // English locale uses function rules for ordinals
      expect(ordinalize(1, 'en')).toBe('1st');
      expect(ordinalize(2, 'en')).toBe('2nd');
      expect(ordinalize(3, 'en')).toBe('3rd');
      expect(ordinalize(4, 'en')).toBe('4th');
      expect(ordinalize(11, 'en')).toBe('11th');
      expect(ordinalize(21, 'en')).toBe('21st');
    });

    it('should handle locale with simple default', () => {
      // Turkish locale uses simple '.' suffix
      expect(ordinalize(1, 'tr')).toBe('1.');
      expect(ordinalize(5, 'tr')).toBe('5.');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1');
      expect(result).toContain('234');
    });

    it('should handle different locales', () => {
      const result = formatCurrency(1234.56, { locale: 'en-US', currency: 'USD' });
      expect(result).toContain('$');
    });

    it('should handle custom symbol', () => {
      const result = formatCurrency(1234.56, { symbol: '€' });
      expect(result).toContain('€');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0');
    });

    it('should handle negative amounts', () => {
      const result = formatCurrency(-1234.56);
      expect(result).toContain('1');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousands separator', () => {
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    it('should handle different decimal places', () => {
      expect(formatNumber(1234.567, { decimals: 2 })).toBe('1,234.57');
      expect(formatNumber(1234, { decimals: 2 })).toBe('1,234.00');
    });

    it('should handle custom separators', () => {
      expect(formatNumber(1234567.89, { thousands: '.', decimal: ',' })).toBe('1.234.567,89');
    });

    it('should handle string input', () => {
      expect(formatNumber('1234.56')).toBe('1,234.56');
    });

    it('should handle invalid input', () => {
      expect(formatNumber('not a number')).toBe('not a number');
    });

    it('should handle integer input', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(123)).toBe('123');
      expect(formatNumber(12)).toBe('12');
    });
  });
});
