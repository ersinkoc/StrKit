/**
 * i18n (Internationalization) Examples
 * Demonstrates locale support in @oxog/strkit
 */

import {
  str,
  S,
  setLocale,
  getLocale,
  getAvailableLocales,
} from '@oxog/strkit';

// ============================================
// 1. Available Locales
// ============================================

console.log('=== Available Locales ===\n');

const locales = getAvailableLocales();
console.log('Supported locales:', locales);
// ['en', 'tr', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'pl', 'ru', 'ar', 'zh', 'ja', 'ko']

console.log('Current locale:', getLocale());  // en (default)

// ============================================
// 2. Turkish Locale - Case Conversion
// ============================================

console.log('\n=== Turkish Locale ===\n');

// Turkish has special i/I handling
const turkishText = 'istanbul';

// English locale (default)
console.log('English upper:', str.case.upper(turkishText, { locale: 'en' }));
// ISTANBUL (wrong in Turkish context)

// Turkish locale
console.log('Turkish upper:', str.case.upper(turkishText, { locale: 'tr' }));
// İSTANBUL (correct - dotted İ)

// Lowercase with Turkish locale
console.log('Turkish lower of "ISTANBUL":', str.case.lower('ISTANBUL', { locale: 'tr' }));
// ıstanbul (correct - dotless ı)

// Set global locale
setLocale('tr');
console.log('\nGlobal locale set to:', getLocale());
console.log('Upper with global TR:', str.case.upper('istanbul'));  // İSTANBUL

// Reset to English
setLocale('en');

// ============================================
// 3. Slugify with Locale Support
// ============================================

console.log('\n=== Slugify with Locales ===\n');

const texts = [
  { text: 'Héllo Wörld', locale: 'de' },
  { text: 'Türkçe İçerik', locale: 'tr' },
  { text: 'Café résumé', locale: 'fr' },
  { text: 'Cześć świecie', locale: 'pl' },
  { text: 'Привет мир', locale: 'ru' },
];

texts.forEach(({ text, locale }) => {
  const slug = str.sanitize.slugify(text, { locale });
  console.log(`[${locale}] "${text}" → "${slug}"`);
});

// ============================================
// 4. Latinise (Remove Diacritics)
// ============================================

console.log('\n=== Latinise ===\n');

const diacriticTexts = [
  'Héllo Wörld',      // German umlauts
  'Cześć świecie',    // Polish
  'Ñoño español',     // Spanish
  'Café résumé',      // French accents
  'Türkçe metin',     // Turkish
];

diacriticTexts.forEach(text => {
  console.log(`"${text}" → "${str.sanitize.latinise(text)}"`);
});

// ============================================
// 5. Transliteration
// ============================================

console.log('\n=== Transliteration ===\n');

// Russian to Latin
const russianText = 'Привет мир';
console.log(`Russian: "${russianText}" → "${str.sanitize.transliterate(russianText, 'ru')}"`);

// Arabic transliteration
const arabicText = 'مرحبا';
console.log(`Arabic: "${arabicText}" → "${str.sanitize.transliterate(arabicText, 'ar')}"`);

// Chinese transliteration (Pinyin)
const chineseText = '你好世界';
console.log(`Chinese: "${chineseText}" → "${str.sanitize.transliterate(chineseText, 'zh')}"`);

// Japanese transliteration (Romaji)
const japaneseText = 'こんにちは';
console.log(`Japanese: "${japaneseText}" → "${str.sanitize.transliterate(japaneseText, 'ja')}"`);

// ============================================
// 6. Per-Operation Locale Override
// ============================================

console.log('\n=== Per-Operation Override ===\n');

// Set global locale to English
setLocale('en');

// Override for specific operations
console.log('Global locale:', getLocale());  // en

console.log('Default upper:', str.case.upper('istanbul'));  // ISTANBUL
console.log('Turkish upper:', str.case.upper('istanbul', { locale: 'tr' }));  // İSTANBUL
console.log('German slugify:', str.sanitize.slugify('Größe', { locale: 'de' }));  // groesse

// ============================================
// 7. Locale-Aware Number Formatting
// ============================================

console.log('\n=== Number Formatting ===\n');

const amount = 1234567.89;

// Different locale formats
console.log('US:', str.format.currency(amount, { locale: 'en-US', currency: 'USD' }));
// $1,234,567.89

console.log('Germany:', str.format.currency(amount, { locale: 'de-DE', currency: 'EUR' }));
// 1.234.567,89 €

console.log('Turkey:', str.format.currency(amount, { locale: 'tr-TR', currency: 'TRY' }));
// ₺1.234.567,89

// Number formatting with locale-specific separators
console.log('US number:', str.format.number(amount, { thousands: ',', decimal: '.' }));
console.log('EU number:', str.format.number(amount, { thousands: '.', decimal: ',' }));

// ============================================
// 8. Chainable with Locale
// ============================================

console.log('\n=== Chainable with Locale ===\n');

// Note: Chainable API uses current global locale
setLocale('tr');

const result = S('  İSTANBUL  ')
  .trim()
  .lower()  // Uses Turkish locale
  .value;

console.log('Chain result (TR):', result);  // ıstanbul

setLocale('en');  // Reset

// ============================================
// 9. Real-World i18n Example
// ============================================

console.log('\n=== Real-World Example ===\n');

interface LocalizedContent {
  title: string;
  slug: string;
  locale: string;
}

function createLocalizedContent(title: string, locale: string): LocalizedContent {
  return {
    title: str.case.title(title, { locale }),
    slug: str.sanitize.slugify(title, { locale }),
    locale,
  };
}

const contents = [
  createLocalizedContent('hello world', 'en'),
  createLocalizedContent('türkçe başlık', 'tr'),
  createLocalizedContent('titre français', 'fr'),
  createLocalizedContent('deutscher titel', 'de'),
];

console.log('Localized content:');
contents.forEach(content => {
  console.log(`  [${content.locale}] "${content.title}" → /${content.slug}`);
});
