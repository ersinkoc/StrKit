/// <reference types="vitest/globals" />
import '../../src/extend.js';

describe('String Prototype Extensions', () => {
  describe('Case methods', () => {
    it('should convert to camelCase', () => {
      expect('hello world'.camelCase()).toBe('helloWorld');
    });

    it('should convert to kebabCase', () => {
      expect('helloWorld'.kebabCase()).toBe('hello-world');
    });

    it('should convert to snakeCase', () => {
      expect('helloWorld'.snakeCase()).toBe('hello_world');
    });

    it('should convert to pascalCase', () => {
      expect('hello world'.pascalCase()).toBe('HelloWorld');
    });

    it('should convert to titleCase', () => {
      expect('hello world'.titleCase()).toBe('Hello World');
    });

    it('should convert to sentenceCase', () => {
      expect('hello world'.sentenceCase()).toBe('Hello world');
    });

    it('should convert to constantCase', () => {
      expect('hello world'.constantCase()).toBe('HELLO_WORLD');
    });

    it('should convert to dotCase', () => {
      expect('helloWorld'.dotCase()).toBe('hello.world');
    });

    it('should convert to pathCase', () => {
      expect('helloWorld'.pathCase()).toBe('hello/world');
    });

    it('should convert to headerCase', () => {
      expect('hello world'.headerCase()).toBe('Hello-World');
    });

    it('should swap case', () => {
      expect('Hello World'.swapCase()).toBe('hELLO wORLD');
    });

    it('should capitalize', () => {
      expect('hello'.capitalize()).toBe('Hello');
    });

    it('should decapitalize', () => {
      expect('Hello'.decapitalize()).toBe('hello');
    });
  });

  describe('Manipulation methods', () => {
    it('should trim custom characters', () => {
      expect('***hello***'.trimChars('*')).toBe('hello');
    });

    it('should trim start characters', () => {
      expect('***hello'.trimStartChars('*')).toBe('hello');
    });

    it('should trim end characters', () => {
      expect('hello***'.trimEndChars('*')).toBe('hello');
    });

    it('should pad both sides', () => {
      expect('hello'.padBoth(9)).toBe('  hello  ');
    });

    it('should reverse string', () => {
      expect('hello'.reverse()).toBe('olleh');
    });

    it('should truncate string', () => {
      expect('hello world'.truncate(8)).toBe('hello...');
    });

    it('should wrap string', () => {
      expect('hello'.wrap('"')).toBe('"hello"');
    });

    it('should unwrap string', () => {
      expect('"hello"'.unwrap('"')).toBe('hello');
    });

    it('should insert at position', () => {
      expect('hello'.insert(2, 'X')).toBe('heXllo');
    });

    it('should remove from position', () => {
      expect('hello'.remove(1, 2)).toBe('hlo');
    });

    it('should replace all occurrences', () => {
      expect('hello hello'.replaceAllStr('hello', 'hi')).toBe('hi hi');
    });

    it('should get between', () => {
      expect('(hello)'.between('(', ')')).toBe('hello');
    });

    it('should get before', () => {
      expect('hello world'.before(' ')).toBe('hello');
    });

    it('should get after', () => {
      expect('hello world'.after(' ')).toBe('world');
    });

    it('should get before last', () => {
      expect('a/b/c'.beforeLast('/')).toBe('a/b');
    });

    it('should get after last', () => {
      expect('a/b/c'.afterLast('/')).toBe('c');
    });

    it('should append strings', () => {
      expect('hello'.append(' ', 'world')).toBe('hello world');
    });

    it('should prepend strings', () => {
      expect('world'.prepend('hello', ' ')).toBe('hello world');
    });

    it('should surround string', () => {
      expect('hello'.surround('*')).toBe('*hello*');
    });

    it('should collapse whitespace', () => {
      expect('hello   world'.collapseWhitespace()).toBe('hello world');
    });

    it('should split into lines', () => {
      expect('a\nb\nc'.lines()).toEqual(['a', 'b', 'c']);
    });

    it('should split into words', () => {
      expect('hello world'.words()).toEqual(['hello', 'world']);
    });

    it('should split into chars', () => {
      expect('abc'.chars()).toEqual(['a', 'b', 'c']);
    });
  });

  describe('Sanitization methods', () => {
    it('should escape special characters', () => {
      expect('hello "world"'.escape()).toBe('hello \\"world\\"');
    });

    it('should unescape special characters', () => {
      expect('hello \\"world\\"'.unescape()).toBe('hello "world"');
    });

    it('should escape HTML', () => {
      expect('<div>'.escapeHtml()).toBe('&lt;div&gt;');
    });

    it('should unescape HTML', () => {
      expect('&lt;div&gt;'.unescapeHtml()).toBe('<div>');
    });

    it('should escape regex', () => {
      expect('a.b*c'.escapeRegex()).toBe('a\\.b\\*c');
    });

    it('should slugify', () => {
      expect('Hello World!'.slugify()).toBe('hello-world');
    });

    it('should sanitize filename', () => {
      expect('file:name?.txt'.sanitizeFilename()).toBe('filename.txt');
    });

    it('should strip HTML', () => {
      expect('<p>Hello</p>'.stripHtml()).toBe('Hello');
    });

    it('should strip tags', () => {
      expect('<p>Hello <b>World</b></p>'.stripTags(['p'])).toBe('<p>Hello World</p>');
    });

    it('should clean whitespace', () => {
      expect('hello   world'.clean()).toBe('hello world');
    });

    it('should normalize unicode', () => {
      const decomposed = 'cafe\u0301';
      expect(decomposed.normalizeStr()).toBe('café');
    });

    it('should latinise', () => {
      expect('Héllo'.latinise()).toBe('Hello');
    });

    it('should transliterate', () => {
      // Test latinise fallback (doesn't require locale registration)
      expect('Héllo'.transliterate()).toBe('Hello');
    });
  });

  describe('Formatting methods', () => {
    it('should template', () => {
      expect('Hello, {{name}}!'.template({ name: 'World' })).toBe('Hello, World!');
    });

    it('should sprintf', () => {
      expect('%s has %d apples'.sprintf('John', 5)).toBe('John has 5 apples');
    });

    it('should mask', () => {
      expect('1234567890'.mask('(###) ###-####')).toBe('(123) 456-7890');
    });

    it('should unmask', () => {
      expect('(123) 456-7890'.unmask('(###) ###-####')).toBe('1234567890');
    });
  });

  describe('Validation methods', () => {
    it('should validate email', () => {
      expect('test@example.com'.isEmail()).toBe(true);
      expect('invalid'.isEmail()).toBe(false);
    });

    it('should validate URL', () => {
      expect('https://example.com'.isUrl()).toBe(true);
      expect('invalid'.isUrl()).toBe(false);
    });

    it('should validate UUID', () => {
      expect('550e8400-e29b-41d4-a716-446655440000'.isUuid()).toBe(true);
    });

    it('should validate IP', () => {
      expect('192.168.1.1'.isIp()).toBe(true);
    });

    it('should validate IPv4', () => {
      expect('192.168.1.1'.isIpv4()).toBe(true);
    });

    it('should validate IPv6', () => {
      expect('2001:0db8:85a3:0000:0000:8a2e:0370:7334'.isIpv6()).toBe(true);
    });

    it('should validate phone', () => {
      expect('+1-555-555-5555'.isPhone()).toBe(true);
    });

    it('should validate credit card', () => {
      expect('4111111111111111'.isCreditCard()).toBe(true);
    });

    it('should check isEmpty', () => {
      expect(''.isEmpty()).toBe(true);
      expect('hello'.isEmpty()).toBe(false);
    });

    it('should check isBlank', () => {
      expect('   '.isBlank()).toBe(true);
      expect('hello'.isBlank()).toBe(false);
    });

    it('should validate alpha', () => {
      expect('hello'.isAlpha()).toBe(true);
      expect('hello123'.isAlpha()).toBe(false);
    });

    it('should validate numeric', () => {
      expect('123'.isNumeric()).toBe(true);
      // isNumeric only accepts integers, not decimals
      expect('12.34'.isNumeric()).toBe(false);
    });

    it('should validate alphanumeric', () => {
      expect('hello123'.isAlphanumeric()).toBe(true);
    });

    it('should validate hex', () => {
      expect('ff00ff'.isHex()).toBe(true);
    });

    it('should validate base64', () => {
      expect('SGVsbG8gV29ybGQ='.isBase64()).toBe(true);
    });

    it('should validate JSON', () => {
      expect('{"key":"value"}'.isJson()).toBe(true);
    });

    it('should check uppercase', () => {
      expect('HELLO'.isUpperCase()).toBe(true);
    });

    it('should check lowercase', () => {
      expect('hello'.isLowerCase()).toBe(true);
    });
  });

  describe('Analysis methods', () => {
    it('should count words', () => {
      expect('hello world'.wordCount()).toBe(2);
    });

    it('should count chars', () => {
      expect('hello'.charCount()).toBe(5);
    });

    it('should count lines', () => {
      expect('a\nb\nc'.lineCount()).toBe(3);
    });

    it('should count sentences', () => {
      expect('Hello. World!'.sentenceCount()).toBe(2);
    });

    it('should count paragraphs', () => {
      expect('Para 1\n\nPara 2'.paragraphCount()).toBe(2);
    });

    it('should get byte size', () => {
      expect('hello'.byteSize()).toBe(5);
    });

    it('should calculate entropy', () => {
      expect('aaaa'.entropy()).toBe(0);
      expect('abcd'.entropy()).toBeGreaterThan(0);
    });

    it('should get frequency', () => {
      const freq = 'hello'.frequency();
      expect(freq['l']).toBe(2);
    });

    it('should estimate reading time', () => {
      const text = Array(200).fill('word').join(' ');
      expect(text.readingTime()).toBeCloseTo(1, 1);
    });

    it('should estimate speaking time', () => {
      const text = Array(150).fill('word').join(' ');
      expect(text.speakingTime()).toBeCloseTo(1, 1);
    });
  });

  describe('Search methods', () => {
    it('should check contains', () => {
      expect('hello world'.containsStr('world')).toBe(true);
    });

    it('should count occurrences', () => {
      expect('abracadabra'.countOccurrences('a')).toBe(5);
    });

    it('should get positions', () => {
      expect('abracadabra'.positions('a')).toEqual([0, 3, 5, 7, 10]);
    });

    it('should match pattern', () => {
      expect('hello 123'.matchStr(/\d+/)).toBe('123');
    });

    it('should match all patterns', () => {
      expect('hello 123 world 456'.matchAllStr(/\d+/g)).toEqual(['123', '456']);
    });
  });

  describe('Similarity methods', () => {
    it('should calculate levenshtein distance', () => {
      expect('hello'.levenshtein('hallo')).toBe(1);
    });

    it('should calculate levenshtein ratio', () => {
      expect('hello'.levenshteinRatio('hello')).toBe(1);
    });

    it('should calculate dice coefficient', () => {
      expect('hello'.dice('hello')).toBe(1);
    });

    it('should calculate jaro-winkler', () => {
      expect('hello'.jaroWinkler('hello')).toBe(1);
    });

    it('should calculate hamming distance', () => {
      expect('hello'.hamming('hallo')).toBe(1);
    });

    it('should calculate cosine similarity', () => {
      expect('hello'.cosine('hello')).toBe(1);
    });

    it('should calculate similarity', () => {
      expect('hello'.similarity('hello')).toBe(1);
    });
  });

  describe('Diff methods', () => {
    it('should diff chars', () => {
      const result = 'abc'.diffChars('abd');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should diff words', () => {
      const result = 'hello world'.diffWords('hello there');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should diff lines', () => {
      const result = 'a\nb'.diffLines('a\nc');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should diff with options', () => {
      const result = 'abc'.diff('abd', { type: 'chars' });
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Pluralization methods', () => {
    it('should pluralize', () => {
      expect('cat'.pluralize()).toBe('cats');
    });

    it('should pluralize with count', () => {
      expect('cat'.pluralize(2, true)).toBe('2 cats');
    });

    it('should singularize', () => {
      expect('cats'.singularize()).toBe('cat');
    });

    it('should check isPlural', () => {
      expect('cats'.isPlural()).toBe(true);
    });

    it('should check isSingular', () => {
      expect('cat'.isSingular()).toBe(true);
    });
  });
});
