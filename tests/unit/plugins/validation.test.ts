/// <reference types="vitest/globals" />
import {
  isEmail,
  isUrl,
  isUuid,
  isIp,
  isIpv4,
  isIpv6,
  isPhone,
  isCreditCard,
  isEmpty,
  isBlank,
  isAlpha,
  isNumeric,
  isAlphanumeric,
  isHex,
  isBase64,
  isJson,
  isUpperCase,
  isLowerCase,
  contains,
  startsWith,
  endsWith,
  equals,
  matches,
} from '../../../src/plugins/validation/index.js';

describe('Validation Plugin', () => {
  describe('isEmail', () => {
    it('should validate correct emails', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('test.name@example.co.uk')).toBe(true);
      expect(isEmail('test+tag@example.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isEmail('test')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@example')).toBe(false);
      expect(isEmail('')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate correct URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://example.com/path?query=1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isUrl('example.com')).toBe(false);
      expect(isUrl('ftp://example.com')).toBe(false);
      expect(isUrl('')).toBe(false);
    });
  });

  describe('isUuid', () => {
    it('should validate UUIDs', () => {
      expect(isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isUuid('550e8400-e29b-41d4-a716-446655440000', 4)).toBe(true);
    });

    it('should reject invalid UUIDs', () => {
      expect(isUuid('not-a-uuid')).toBe(false);
      expect(isUuid('')).toBe(false);
    });
  });

  describe('isIp', () => {
    it('should validate IPv4', () => {
      expect(isIp('192.168.1.1')).toBe(true);
      expect(isIp('0.0.0.0')).toBe(true);
      expect(isIp('255.255.255.255')).toBe(true);
    });

    it('should validate IPv6', () => {
      expect(isIp('::1')).toBe(true);
      expect(isIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });

    it('should reject invalid IPs', () => {
      expect(isIp('256.0.0.1')).toBe(false);
      expect(isIp('not-an-ip')).toBe(false);
      expect(isIp('')).toBe(false);
    });
  });

  describe('isIpv4', () => {
    it('should validate IPv4', () => {
      expect(isIpv4('192.168.1.1')).toBe(true);
      expect(isIpv4('0.0.0.0')).toBe(true);
    });

    it('should reject non-IPv4', () => {
      expect(isIpv4('::1')).toBe(false);
      expect(isIpv4('256.0.0.1')).toBe(false);
    });
  });

  describe('isIpv6', () => {
    it('should validate IPv6', () => {
      expect(isIpv6('::1')).toBe(true);
      expect(isIpv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });

    it('should reject non-IPv6', () => {
      expect(isIpv6('192.168.1.1')).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should validate phone numbers', () => {
      expect(isPhone('+1-555-555-5555')).toBe(true);
      expect(isPhone('5555555555')).toBe(true);
      expect(isPhone('+44 20 7946 0958')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isPhone('123')).toBe(false);
      expect(isPhone('')).toBe(false);
    });
  });

  describe('isCreditCard', () => {
    it('should validate credit cards with Luhn', () => {
      expect(isCreditCard('4111111111111111')).toBe(true);
      expect(isCreditCard('4111-1111-1111-1111')).toBe(true);
      expect(isCreditCard('4111 1111 1111 1111')).toBe(true);
    });

    it('should reject invalid credit cards', () => {
      expect(isCreditCard('4111111111111112')).toBe(false);
      expect(isCreditCard('123')).toBe(false);
      expect(isCreditCard('')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return false for non-empty', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' ')).toBe(false);
    });
  });

  describe('isBlank', () => {
    it('should return true for blank strings', () => {
      expect(isBlank('')).toBe(true);
      expect(isBlank('   ')).toBe(true);
      expect(isBlank('\t\n')).toBe(true);
    });

    it('should return false for non-blank', () => {
      expect(isBlank('hello')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    it('should validate alphabetic strings', () => {
      expect(isAlpha('hello')).toBe(true);
      expect(isAlpha('Hello')).toBe(true);
    });

    it('should reject non-alphabetic', () => {
      expect(isAlpha('hello123')).toBe(false);
      expect(isAlpha('hello world')).toBe(false);
      expect(isAlpha('')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should validate numeric strings', () => {
      expect(isNumeric('12345')).toBe(true);
      expect(isNumeric('0')).toBe(true);
    });

    it('should reject non-numeric', () => {
      expect(isNumeric('12.34')).toBe(false);
      expect(isNumeric('hello')).toBe(false);
      expect(isNumeric('')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    it('should validate alphanumeric strings', () => {
      expect(isAlphanumeric('hello123')).toBe(true);
      expect(isAlphanumeric('abc')).toBe(true);
      expect(isAlphanumeric('123')).toBe(true);
    });

    it('should reject non-alphanumeric', () => {
      expect(isAlphanumeric('hello-123')).toBe(false);
      expect(isAlphanumeric('')).toBe(false);
    });
  });

  describe('isHex', () => {
    it('should validate hex strings', () => {
      expect(isHex('ff00ff')).toBe(true);
      expect(isHex('0xFF00FF')).toBe(true);
      expect(isHex('123abc')).toBe(true);
    });

    it('should reject non-hex', () => {
      expect(isHex('gggg')).toBe(false);
      expect(isHex('')).toBe(false);
    });
  });

  describe('isBase64', () => {
    it('should validate base64 strings', () => {
      expect(isBase64('aGVsbG8=')).toBe(true);
      expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
    });

    it('should reject non-base64', () => {
      expect(isBase64('hello')).toBe(false);
      expect(isBase64('')).toBe(false);
    });
  });

  describe('isJson', () => {
    it('should validate JSON strings', () => {
      expect(isJson('{"key":"value"}')).toBe(true);
      expect(isJson('[1,2,3]')).toBe(true);
      expect(isJson('"string"')).toBe(true);
    });

    it('should reject non-JSON', () => {
      expect(isJson('not json')).toBe(false);
      expect(isJson('')).toBe(false);
    });
  });

  describe('isUpperCase', () => {
    it('should validate uppercase strings', () => {
      expect(isUpperCase('HELLO')).toBe(true);
      expect(isUpperCase('HELLO123')).toBe(true);
    });

    it('should reject non-uppercase', () => {
      expect(isUpperCase('Hello')).toBe(false);
      expect(isUpperCase('')).toBe(false);
    });
  });

  describe('isLowerCase', () => {
    it('should validate lowercase strings', () => {
      expect(isLowerCase('hello')).toBe(true);
      expect(isLowerCase('hello123')).toBe(true);
    });

    it('should reject non-lowercase', () => {
      expect(isLowerCase('Hello')).toBe(false);
      expect(isLowerCase('')).toBe(false);
    });
  });

  describe('contains', () => {
    it('should find substrings', () => {
      expect(contains('hello world', 'world')).toBe(true);
      expect(contains('hello world', 'hello')).toBe(true);
    });

    it('should support case insensitive', () => {
      expect(contains('Hello World', 'world', { caseSensitive: false })).toBe(true);
    });

    it('should return false for missing substrings', () => {
      expect(contains('hello world', 'foo')).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('should check string start', () => {
      expect(startsWith('hello world', 'hello')).toBe(true);
      expect(startsWith('hello world', 'world')).toBe(false);
    });
  });

  describe('endsWith', () => {
    it('should check string end', () => {
      expect(endsWith('hello world', 'world')).toBe(true);
      expect(endsWith('hello world', 'hello')).toBe(false);
    });
  });

  describe('equals', () => {
    it('should check string equality', () => {
      expect(equals('hello', 'hello')).toBe(true);
      expect(equals('hello', 'world')).toBe(false);
    });

    it('should handle case insensitive comparison', () => {
      expect(equals('Hello', 'hello', { caseSensitive: false })).toBe(true);
      expect(equals('HELLO', 'hello', { caseSensitive: false })).toBe(true);
    });

    it('should handle null/undefined', () => {
      expect(equals(null as unknown as string, 'hello')).toBe(false);
      expect(equals('hello', null as unknown as string)).toBe(false);
      expect(equals(undefined as unknown as string, 'hello')).toBe(false);
    });
  });

  describe('matches', () => {
    it('should match regex patterns', () => {
      expect(matches('hello123', /^[a-z]+\d+$/)).toBe(true);
      expect(matches('123abc', /^\d+[a-z]+$/)).toBe(true);
    });

    it('should reject non-matching patterns', () => {
      expect(matches('hello', /^\d+$/)).toBe(false);
      expect(matches('', /\w+/)).toBe(false);
    });
  });
});
