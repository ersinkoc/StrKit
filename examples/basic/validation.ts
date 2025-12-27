/**
 * Validation Examples
 * Demonstrates all validation methods in @oxog/strkit
 */

import { str, S, isEmail, isUrl, isUuid } from '@oxog/strkit';

// ============================================
// 1. Email Validation
// ============================================

console.log('=== Email Validation ===\n');

const emails = [
  'user@example.com',
  'user.name+tag@example.co.uk',
  'invalid-email',
  '@missing-local.com',
  'missing@domain',
];

emails.forEach(email => {
  console.log(`${email}: ${str.validate.email(email)}`);
});

// ============================================
// 2. URL Validation
// ============================================

console.log('\n=== URL Validation ===\n');

const urls = [
  'https://example.com',
  'http://localhost:3000',
  'ftp://files.example.com/path',
  'not-a-url',
  'example.com',  // missing protocol
];

urls.forEach(url => {
  console.log(`${url}: ${str.validate.url(url)}`);
});

// ============================================
// 3. UUID Validation
// ============================================

console.log('\n=== UUID Validation ===\n');

const uuids = [
  '550e8400-e29b-41d4-a716-446655440000',  // valid v4
  '550e8400-e29b-11d4-a716-446655440000',  // valid v1
  'not-a-uuid',
  '550e8400-e29b-41d4-a716',  // incomplete
];

uuids.forEach(uuid => {
  console.log(`${uuid}: ${str.validate.uuid(uuid)}`);
});

// ============================================
// 4. IP Address Validation
// ============================================

console.log('\n=== IP Address Validation ===\n');

const ips = [
  '192.168.1.1',
  '10.0.0.1',
  '255.255.255.255',
  '256.1.1.1',  // invalid
  '::1',  // IPv6 loopback
  '2001:0db8:85a3:0000:0000:8a2e:0370:7334',  // IPv6
];

ips.forEach(ip => {
  console.log(`${ip}: ipv4=${str.validate.ipv4(ip)}, ipv6=${str.validate.ipv6(ip)}`);
});

// ============================================
// 5. Credit Card Validation
// ============================================

console.log('\n=== Credit Card Validation ===\n');

const cards = [
  '4111111111111111',  // Visa test
  '5500000000000004',  // Mastercard test
  '340000000000009',   // Amex test
  '1234567890123456',  // Invalid
];

cards.forEach(card => {
  console.log(`${card}: ${str.validate.creditCard(card)}`);
});

// ============================================
// 6. String Content Validation
// ============================================

console.log('\n=== Content Validation ===\n');

console.log('isEmpty(""):', str.validate.empty(''));
console.log('isEmpty("hello"):', str.validate.empty('hello'));
console.log('isBlank("   "):', str.validate.blank('   '));
console.log('isBlank("  x  "):', str.validate.blank('  x  '));

console.log('isAlpha("hello"):', str.validate.alpha('hello'));
console.log('isAlpha("hello123"):', str.validate.alpha('hello123'));
console.log('isNumeric("12345"):', str.validate.numeric('12345'));
console.log('isNumeric("12.34"):', str.validate.numeric('12.34'));
console.log('isAlphanumeric("hello123"):', str.validate.alphanumeric('hello123'));

console.log('isHex("ff00ff"):', str.validate.hex('ff00ff'));
console.log('isHex("gg00gg"):', str.validate.hex('gg00gg'));

console.log('isBase64("aGVsbG8="):', str.validate.base64('aGVsbG8='));
console.log('isJson(\'{"key":"value"}\'):', str.validate.json('{"key":"value"}'));
console.log('isJson("not json"):', str.validate.json('not json'));

// ============================================
// 7. Case Validation
// ============================================

console.log('\n=== Case Validation ===\n');

console.log('isUpperCase("HELLO"):', str.validate.upperCase('HELLO'));
console.log('isUpperCase("Hello"):', str.validate.upperCase('Hello'));
console.log('isLowerCase("hello"):', str.validate.lowerCase('hello'));
console.log('isLowerCase("Hello"):', str.validate.lowerCase('Hello'));

// ============================================
// 8. Chainable Validation
// ============================================

console.log('\n=== Chainable Validation ===\n');

// Using S() for validation
console.log('S("test@test.com").isEmail():', S('test@test.com').isEmail());
console.log('S("https://example.com").isUrl():', S('https://example.com').isUrl());
console.log('S("").isEmpty():', S('').isEmpty());
console.log('S("   ").isBlank():', S('   ').isBlank());

// ============================================
// 9. Direct Import
// ============================================

console.log('\n=== Direct Import ===\n');

console.log('isEmail("user@example.com"):', isEmail('user@example.com'));
console.log('isUrl("https://example.com"):', isUrl('https://example.com'));
console.log('isUuid("550e8400-e29b-41d4-a716-446655440000"):', isUuid('550e8400-e29b-41d4-a716-446655440000'));

// ============================================
// 10. Real-World Form Validation
// ============================================

console.log('\n=== Form Validation Example ===\n');

interface FormData {
  email: string;
  website: string;
  phone: string;
}

function validateForm(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!str.validate.email(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (data.website && !str.validate.url(data.website)) {
    errors.website = 'Invalid URL';
  }

  if (data.phone && !str.validate.phone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  return errors;
}

const formData: FormData = {
  email: 'user@example.com',
  website: 'not-a-url',
  phone: '+1-555-555-5555',
};

const errors = validateForm(formData);
console.log('Form data:', formData);
console.log('Validation errors:', Object.keys(errors).length ? errors : 'None');
