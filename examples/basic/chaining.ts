/**
 * Chaining Examples
 * Demonstrates the fluent chainable API in @oxog/strkit
 */

import { S } from '@oxog/strkit';

// ============================================
// 1. Basic Chaining
// ============================================

console.log('=== Basic Chaining ===\n');

// Multiple transformations in one chain
const result1 = S('  Hello World  ')
  .trim()
  .lower()
  .camelCase()
  .value;

console.log('Trim + Lower + CamelCase:', result1);  // helloWorld

// Chain with manipulation
const result2 = S('hello')
  .upper()
  .wrap('[', ']')
  .repeat(2)
  .value;

console.log('Upper + Wrap + Repeat:', result2);  // [HELLO][HELLO]

// ============================================
// 2. Immutability
// ============================================

console.log('\n=== Immutability ===\n');

const original = S('hello world');
const step1 = original.upper();
const step2 = step1.kebabCase();
const step3 = step2.wrap('<', '>');

console.log('Original:', original.value);  // hello world
console.log('After upper:', step1.value);  // HELLO WORLD
console.log('After kebab:', step2.value);  // hello-world
console.log('After wrap:', step3.value);   // <hello-world>

// ============================================
// 3. Accessing Values
// ============================================

console.log('\n=== Accessing Values ===\n');

const chain = S('hello');

// Multiple ways to get the value
console.log('Using .value:', chain.value);
console.log('Using .s:', chain.s);
console.log('Using .toString():', chain.toString());
console.log('Using .getValue():', chain.getValue());

// Properties
console.log('Length:', chain.length);

// ============================================
// 4. Methods That Break The Chain
// ============================================

console.log('\n=== Methods That Return Primitives ===\n');

const text = S('Hello World, how are you?');

// These return numbers
console.log('Word count:', text.wordCount());      // 5
console.log('Char count:', text.charCount());      // 25
console.log('Line count:', text.lineCount());      // 1

// These return booleans
console.log('Is email:', S('test@test.com').isEmail());  // true
console.log('Is empty:', S('').isEmpty());               // true
console.log('Contains "World":', text.contains('World')); // true

// These return arrays
console.log('Words:', text.words());  // ['Hello', 'World', 'how', 'are', 'you']
console.log('Lines:', S('a\nb\nc').lines());  // ['a', 'b', 'c']
console.log('Chars:', S('abc').chars());  // ['a', 'b', 'c']

// ============================================
// 5. Complex Transformations
// ============================================

console.log('\n=== Complex Transformations ===\n');

// Sanitize user input for URL slug
const userInput = '  Héllo Wörld! This is a TEST  ';
const slug = S(userInput)
  .trim()
  .slugify()
  .value;

console.log('User input to slug:', slug);  // hello-world-this-is-a-test

// Format a template string
const template = S('Hello, {{name}}! You have {{count}} messages.')
  .template({ name: 'John', count: 5 })
  .value;

console.log('Template result:', template);  // Hello, John! You have 5 messages.

// Clean and normalize text
const messyText = '  This   has   extra    spaces  \n\n  and lines  ';
const cleaned = S(messyText)
  .collapseWhitespace()
  .trim()
  .value;

console.log('Cleaned text:', cleaned);  // This has extra spaces and lines

// ============================================
// 6. Cloning
// ============================================

console.log('\n=== Cloning ===\n');

const base = S('hello');
const clone = base.clone();

console.log('Are they equal?', base.value === clone.value);  // true
console.log('Are they same object?', base === clone);        // false

// ============================================
// 7. Similarity and Comparison
// ============================================

console.log('\n=== Similarity ===\n');

const str1 = S('hello');

console.log('Levenshtein distance to "hallo":', str1.levenshtein('hallo'));  // 1
console.log('Dice coefficient with "hallo":', str1.dice('hallo'));           // 0.5
console.log('Jaro-Winkler with "hallo":', str1.jaroWinkler('hallo').toFixed(3));

// ============================================
// 8. Diff
// ============================================

console.log('\n=== Diff ===\n');

const oldText = S('hello world');
const diff = oldText.diffWords('hello there');

console.log('Diff result:');
diff.forEach(part => {
  const prefix = part.added ? '+' : part.removed ? '-' : ' ';
  console.log(`  ${prefix} "${part.value}"`);
});

// ============================================
// 9. Real-World Pipeline
// ============================================

console.log('\n=== Real-World Pipeline ===\n');

// Process a blog post title
function processTitle(rawTitle: string): string {
  return S(rawTitle)
    .trim()
    .collapseWhitespace()
    .truncate(50, { ellipsis: '...' })
    .value;
}

// Generate URL-safe slug from title
function generateSlug(title: string): string {
  return S(title)
    .trim()
    .slugify()
    .value;
}

// Sanitize HTML content
function sanitizeContent(html: string): string {
  return S(html)
    .stripHtml()
    .trim()
    .collapseWhitespace()
    .value;
}

const rawTitle = '  This is a Very Long Blog Post Title That Should Be Truncated  ';
const htmlContent = '<p>Hello <b>World</b>!</p>  <script>alert("xss")</script>';

console.log('Processed title:', processTitle(rawTitle));
console.log('Generated slug:', generateSlug(rawTitle));
console.log('Sanitized content:', sanitizeContent(htmlContent));
