/**
 * Case Conversion Examples
 * Demonstrates all case conversion methods in @oxog/strkit
 */

import { str, S, camelCase, kebabCase, snakeCase } from '@oxog/strkit';

// ============================================
// 1. Namespace API (str.case.*)
// ============================================

console.log('=== Namespace API ===\n');

// Basic case conversions
console.log('camelCase:', str.case.camel('hello world'));        // helloWorld
console.log('kebabCase:', str.case.kebab('helloWorld'));         // hello-world
console.log('snakeCase:', str.case.snake('HelloWorld'));         // hello_world
console.log('pascalCase:', str.case.pascal('hello-world'));      // HelloWorld
console.log('titleCase:', str.case.title('hello world'));        // Hello World
console.log('sentenceCase:', str.case.sentence('hello world'));  // Hello world
console.log('constantCase:', str.case.constant('hello world'));  // HELLO_WORLD
console.log('dotCase:', str.case.dot('hello world'));            // hello.world
console.log('pathCase:', str.case.path('hello world'));          // hello/world
console.log('headerCase:', str.case.header('hello world'));      // Hello-World
console.log('swapCase:', str.case.swap('Hello World'));          // hELLO wORLD

// Simple transformations
console.log('upper:', str.case.upper('hello'));                  // HELLO
console.log('lower:', str.case.lower('HELLO'));                  // hello
console.log('capitalize:', str.case.capitalize('hello'));        // Hello
console.log('decapitalize:', str.case.decapitalize('Hello'));    // hello

// ============================================
// 2. Direct Import (Tree-Shakeable)
// ============================================

console.log('\n=== Direct Import ===\n');

console.log('camelCase:', camelCase('hello world'));   // helloWorld
console.log('kebabCase:', kebabCase('helloWorld'));    // hello-world
console.log('snakeCase:', snakeCase('HelloWorld'));    // hello_world

// ============================================
// 3. Chainable API (S())
// ============================================

console.log('\n=== Chainable API ===\n');

// Chain multiple case operations
const result = S('  HELLO world  ')
  .trim()
  .lower()
  .camelCase()
  .value;

console.log('Chained result:', result);  // helloWorld

// Immutability demonstration
const original = S('hello');
const modified = original.upper();
console.log('Original:', original.value);  // hello (unchanged)
console.log('Modified:', modified.value);  // HELLO

// ============================================
// 4. Locale-Aware Case Conversion
// ============================================

console.log('\n=== Locale Support ===\n');

// Turkish locale - special i/I handling
console.log('Turkish upper:', str.case.upper('istanbul', { locale: 'tr' }));  // İSTANBUL
console.log('English upper:', str.case.upper('istanbul', { locale: 'en' }));  // ISTANBUL

console.log('Turkish lower:', str.case.lower('ISTANBUL', { locale: 'tr' }));  // ıstanbul
console.log('English lower:', str.case.lower('ISTANBUL', { locale: 'en' }));  // istanbul

// ============================================
// 5. Real-World Examples
// ============================================

console.log('\n=== Real-World Examples ===\n');

// Convert API response to camelCase
const apiField = 'user_first_name';
console.log('API to JS:', str.case.camel(apiField));  // userFirstName

// Convert JS to CSS class
const componentName = 'UserProfileCard';
console.log('Component to CSS:', str.case.kebab(componentName));  // user-profile-card

// Convert to environment variable
const configKey = 'databaseUrl';
console.log('Config to ENV:', str.case.constant(configKey));  // DATABASE_URL

// Convert URL slug to title
const slug = 'hello-world-example';
console.log('Slug to Title:', str.case.title(slug.replace(/-/g, ' ')));  // Hello World Example
