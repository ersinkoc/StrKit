/// <reference types="vitest/globals" />
import {
  setLocale,
  getLocale,
  registerLocale,
  getAvailableLocales,
  getLocaleData,
  localeManager,
} from '../../../src/core/locale.js';
import type { StrKitLocale } from '../../../src/core/types.js';

// Import locales to register them
import '../../../src/locales/index.js';

describe('Locale Module', () => {
  describe('setLocale and getLocale', () => {
    afterEach(() => {
      // Reset to English after each test
      setLocale('en');
    });

    it('should set and get locale', () => {
      setLocale('tr');
      expect(getLocale()).toBe('tr');
    });

    it('should throw for invalid locale', () => {
      expect(() => setLocale('invalid')).toThrow();
    });
  });

  describe('registerLocale', () => {
    it('should register a custom locale', () => {
      const customLocale: StrKitLocale = {
        code: 'custom',
        name: 'Custom Locale',
        case: { upper: {}, lower: {} },
        plural: { rules: [], irregulars: {}, uncountables: [] },
        transliterate: {},
        numbers: { decimal: '.', thousands: ',' },
        ordinals: { default: 'th', rules: [] },
      };

      registerLocale(customLocale);
      expect(getAvailableLocales()).toContain('custom');
    });
  });

  describe('getAvailableLocales', () => {
    it('should return available locales', () => {
      const locales = getAvailableLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('tr');
      expect(locales).toContain('de');
      expect(locales).toContain('fr');
    });

    it('should include all 14 locales', () => {
      const locales = getAvailableLocales();
      const expected = ['en', 'tr', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'pl', 'ru', 'ar', 'zh', 'ja', 'ko'];
      for (const locale of expected) {
        expect(locales).toContain(locale);
      }
    });
  });

  describe('getLocaleData', () => {
    it('should get locale data for current locale', () => {
      setLocale('en');
      const data = getLocaleData();
      expect(data.code).toBe('en');
    });

    it('should get locale data for specific locale', () => {
      const data = getLocaleData('tr');
      expect(data.code).toBe('tr');
    });

    it('should fall back to English for unknown locale', () => {
      const data = getLocaleData('unknown');
      expect(data.code).toBe('en');
    });
  });

  describe('localeManager', () => {
    it('should check if locale exists', () => {
      expect(localeManager.hasLocale('en')).toBe(true);
      expect(localeManager.hasLocale('nonexistent')).toBe(false);
    });
  });
});
