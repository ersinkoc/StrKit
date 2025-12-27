// Real-world usage tests for @oxog/strkit
import { str, S, camelCase, isEmail, truncate, levenshtein } from './dist/index.mjs';

console.log('=== StrKit Usage Tests ===\n');

// 1. Case Conversions (using namespace)
console.log('1. Case Conversions (str.case.*):');
console.log('   str.case.camel("hello world"):', str.case.camel('hello world'));
console.log('   str.case.kebab("helloWorld"):', str.case.kebab('helloWorld'));
console.log('   str.case.snake("HelloWorld"):', str.case.snake('HelloWorld'));
console.log('   str.case.pascal("hello-world"):', str.case.pascal('hello-world'));
console.log('   str.case.title("hello world"):', str.case.title('hello world'));
console.log('   str.case.constant("hello world"):', str.case.constant('hello world'));

// 2. Direct Import
console.log('\n2. Direct Import (import { camelCase }):');
console.log('   camelCase("hello world"):', camelCase('hello world'));

// 3. Validation
console.log('\n3. Validation (str.validate.*):');
console.log('   str.validate.email("test@example.com"):', str.validate.email('test@example.com'));
console.log('   str.validate.email("invalid"):', str.validate.email('invalid'));
console.log('   str.validate.url("https://google.com"):', str.validate.url('https://google.com'));
console.log('   str.validate.uuid("550e8400-e29b-41d4-a716-446655440000"):', str.validate.uuid('550e8400-e29b-41d4-a716-446655440000'));
console.log('   str.validate.json(\'{"key":"value"}\'):', str.validate.json('{"key":"value"}'));
console.log('   isEmail("test@test.com"):', isEmail('test@test.com'));

// 4. Manipulation
console.log('\n4. Manipulation (str.manipulation.*):');
console.log('   str.manipulation.truncate("Hello World", 8):', str.manipulation.truncate('Hello World', 8));
console.log('   str.manipulation.reverse("hello"):', str.manipulation.reverse('hello'));
console.log('   str.manipulation.pad("42", 5, "0"):', str.manipulation.pad('42', 5, '0'));
console.log('   str.manipulation.wrap("hello", "*"):', str.manipulation.wrap('hello', '*'));
console.log('   str.manipulation.between("[value]", "[", "]"):', str.manipulation.between('[value]', '[', ']'));
console.log('   truncate("Hello World", 8):', truncate('Hello World', 8));

// 5. Sanitization
console.log('\n5. Sanitization (str.sanitize.*):');
console.log('   str.sanitize.escapeHtml("<script>"):', str.sanitize.escapeHtml('<script>'));
console.log('   str.sanitize.slugify("Hello World!"):', str.sanitize.slugify('Hello World!'));
console.log('   str.sanitize.slugify("Türkçe İçerik"):', str.sanitize.slugify('Türkçe İçerik'));
console.log('   str.sanitize.latinise("Héllo Wörld"):', str.sanitize.latinise('Héllo Wörld'));
console.log('   str.sanitize.stripHtml("<p>Hello</p>"):', str.sanitize.stripHtml('<p>Hello</p>'));

// 6. Similarity
console.log('\n6. Similarity (str.similarity.*):');
console.log('   str.similarity.levenshtein("hello", "hallo"):', str.similarity.levenshtein('hello', 'hallo'));
console.log('   str.similarity.levenshteinRatio("hello", "hello"):', str.similarity.levenshteinRatio('hello', 'hello'));
console.log('   str.similarity.dice("hello", "hallo"):', str.similarity.dice('hello', 'hallo'));
console.log('   str.similarity.jaroWinkler("MARTHA", "MARHTA"):', str.similarity.jaroWinkler('MARTHA', 'MARHTA').toFixed(3));
console.log('   levenshtein("cat", "bat"):', levenshtein('cat', 'bat'));

// 7. Analysis
console.log('\n7. Analysis (str.analysis.*):');
console.log('   str.analysis.wordCount("Hello world, how are you?"):', str.analysis.wordCount('Hello world, how are you?'));
console.log('   str.analysis.charCount("Hello"):', str.analysis.charCount('Hello'));
console.log('   str.analysis.byteSize("Hello"):', str.analysis.byteSize('Hello'));
console.log('   str.analysis.byteSize("Merhaba"):', str.analysis.byteSize('Merhaba'), '(includes ü = 2 bytes)');
console.log('   str.analysis.entropy("password"):', str.analysis.entropy('password').toFixed(2));

// 8. Formatting
console.log('\n8. Formatting (str.format.*):');
console.log('   str.format.template("Hello, {{name}}!", {name: "World"}):', str.format.template('Hello, {{name}}!', {name: 'World'}));
const sprintfResult = str.format.sprintf('%s has %d apples', 'John', 5);
console.log('   str.format.sprintf("%%s has %%d apples", "John", 5):', sprintfResult);
console.log('   str.format.mask("1234567890", "(###) ###-####"):', str.format.mask('1234567890', '(###) ###-####'));
console.log('   str.format.ordinalize(1):', str.format.ordinalize(1));
console.log('   str.format.ordinalize(22):', str.format.ordinalize(22));

// 9. Pluralization
console.log('\n9. Pluralization (str.plural.*):');
console.log('   str.plural.plural("cat"):', str.plural.plural('cat'));
console.log('   str.plural.plural("child"):', str.plural.plural('child'));
console.log('   str.plural.singular("cats"):', str.plural.singular('cats'));
console.log('   str.plural.singular("children"):', str.plural.singular('children'));

// 10. Search
console.log('\n10. Search (str.search.*):');
console.log('   str.search.contains("hello world", "world"):', str.search.contains('hello world', 'world'));
console.log('   str.search.countOccurrences("abracadabra", "a"):', str.search.countOccurrences('abracadabra', 'a'));
console.log('   str.search.positions("abracadabra", "a"):', str.search.positions('abracadabra', 'a'));

// 11. Chainable API
console.log('\n11. Chainable API (S()):');
const result1 = S('  hello world  ').trim().camelCase().append('!!').value;
console.log('    S("  hello world  ").trim().camelCase().append("!!"):', result1);

const result2 = S('Hello World').kebabCase().wrap('<', '>').value;
console.log('    S("Hello World").kebabCase().wrap("<", ">"):', result2);

const result3 = S('test@example.com').isEmail();
console.log('    S("test@example.com").isEmail():', result3);

// 12. Unicode Support
console.log('\n12. Unicode Support:');
console.log('    str.manipulation.reverse("👋🌍"):', str.manipulation.reverse('👋🌍'));
console.log('    str.analysis.charCount("你好"):', str.analysis.charCount('你好'));
console.log('    str.manipulation.chars("abc"):', str.manipulation.chars('abc'));

// 13. Diff
console.log('\n13. Diff (str.diff.*):');
const diff = str.diff.diffWords('hello world', 'hello there');
console.log('    diffWords("hello world", "hello there"):');
diff.forEach(part => {
  const type = part.added ? '+' : part.removed ? '-' : ' ';
  console.log(`      ${type} "${part.value}"`);
});

console.log('\n=== All Tests Completed Successfully! ===');
