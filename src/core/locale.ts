import type { StrKitLocale } from './types.js';

/**
 * Default English locale
 */
const defaultLocale: StrKitLocale = {
  code: 'en',
  name: 'English',
  case: {
    upper: {},
    lower: {},
  },
  plural: {
    rules: [],
    irregulars: {},
    uncountables: [],
  },
  transliterate: {},
  numbers: {
    decimal: '.',
    thousands: ',',
  },
  ordinals: {
    default: 'th',
    rules: [
      [1, 'st'],
      [2, 'nd'],
      [3, 'rd'],
      [(n: number): boolean => n % 10 === 1 && n % 100 !== 11, 'st'],
      [(n: number): boolean => n % 10 === 2 && n % 100 !== 12, 'nd'],
      [(n: number): boolean => n % 10 === 3 && n % 100 !== 13, 'rd'],
    ],
  },
};

/**
 * Locale Manager class
 * Manages locale registration and retrieval
 */
class LocaleManager {
  private locales: Map<string, StrKitLocale> = new Map();
  private currentLocale: string = 'en';

  constructor() {
    // Register default English locale
    this.register(defaultLocale);
  }

  /**
   * Register a new locale
   */
  register(locale: StrKitLocale): void {
    this.locales.set(locale.code, locale);
  }

  /**
   * Get a locale by code
   * Falls back to English if not found
   */
  get(code?: string): StrKitLocale {
    const localeCode = code ?? this.currentLocale;
    return this.locales.get(localeCode) ?? this.locales.get('en') ?? defaultLocale;
  }

  /**
   * Set the current locale
   */
  setLocale(code: string): void {
    if (!this.locales.has(code)) {
      throw new Error(`Locale '${code}' not found. Available locales: ${this.getAvailableLocales().join(', ')}`);
    }
    this.currentLocale = code;
  }

  /**
   * Get the current locale code
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * Get all available locale codes
   */
  getAvailableLocales(): string[] {
    return Array.from(this.locales.keys());
  }

  /**
   * Check if a locale is registered
   */
  hasLocale(code: string): boolean {
    return this.locales.has(code);
  }
}

/**
 * Singleton instance of LocaleManager
 */
export const localeManager = new LocaleManager();

/**
 * Set the global locale
 */
export function setLocale(code: string): void {
  localeManager.setLocale(code);
}

/**
 * Get the current locale code
 */
export function getLocale(): string {
  return localeManager.getLocale();
}

/**
 * Register a custom locale
 */
export function registerLocale(locale: StrKitLocale): void {
  localeManager.register(locale);
}

/**
 * Get all available locale codes
 */
export function getAvailableLocales(): string[] {
  return localeManager.getAvailableLocales();
}

/**
 * Get locale data for a specific locale
 */
export function getLocaleData(code?: string): StrKitLocale {
  return localeManager.get(code);
}
