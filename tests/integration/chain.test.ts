/// <reference types="vitest/globals" />
import { S } from '../../src/index.js';

describe('Chain API (S)', () => {
  describe('basic operations', () => {
    it('should create a chain from string', () => {
      const chain = S('hello');
      expect(chain.value).toBe('hello');
      expect(chain.toString()).toBe('hello');
      expect(chain.s).toBe('hello');
    });

    it('should have length property', () => {
      expect(S('hello').length).toBe(5);
    });

    it('should clone', () => {
      const a = S('hello');
      const b = a.clone();
      expect(b.value).toBe('hello');
      expect(a).not.toBe(b);
    });
  });

  describe('immutability', () => {
    it('should be immutable', () => {
      const a = S('hello');
      const b = a.upper();
      expect(a.value).toBe('hello');
      expect(b.value).toBe('HELLO');
    });
  });

  describe('chaining', () => {
    it('should chain multiple operations', () => {
      const result = S('  Hello World  ')
        .trim()
        .lower()
        .camelCase()
        .value;

      expect(result).toBe('helloWorld');
    });

    it('should chain manipulation operations', () => {
      const result = S('hello')
        .upper()
        .wrap('[', ']')
        .value;

      expect(result).toBe('[HELLO]');
    });
  });

  describe('case methods', () => {
    it('should support camelCase', () => {
      expect(S('hello world').camelCase().value).toBe('helloWorld');
    });

    it('should support kebabCase', () => {
      expect(S('helloWorld').kebabCase().value).toBe('hello-world');
    });

    it('should support snakeCase', () => {
      expect(S('helloWorld').snakeCase().value).toBe('hello_world');
    });

    it('should support pascalCase', () => {
      expect(S('hello world').pascalCase().value).toBe('HelloWorld');
    });

    it('should support upper/lower', () => {
      expect(S('Hello').upper().value).toBe('HELLO');
      expect(S('Hello').lower().value).toBe('hello');
    });

    it('should support capitalize', () => {
      expect(S('hello').capitalize().value).toBe('Hello');
    });
  });

  describe('manipulation methods', () => {
    it('should support trim', () => {
      expect(S('  hello  ').trim().value).toBe('hello');
    });

    it('should support pad', () => {
      expect(S('5').padStart(3, '0').value).toBe('005');
      expect(S('5').padEnd(3, '0').value).toBe('500');
    });

    it('should support truncate', () => {
      expect(S('hello world').truncate(8).value).toBe('hello...');
    });

    it('should support wrap/unwrap', () => {
      expect(S('hello').wrap('"').value).toBe('"hello"');
      expect(S('"hello"').unwrap('"').value).toBe('hello');
    });

    it('should support between/before/after', () => {
      expect(S('<tag>').between('<', '>').value).toBe('tag');
      expect(S('hello@world').before('@').value).toBe('hello');
      expect(S('hello@world').after('@').value).toBe('world');
    });
  });

  describe('validation methods', () => {
    it('should support isEmail', () => {
      expect(S('test@example.com').isEmail()).toBe(true);
      expect(S('invalid').isEmail()).toBe(false);
    });

    it('should support isUrl', () => {
      expect(S('https://example.com').isUrl()).toBe(true);
      expect(S('not-a-url').isUrl()).toBe(false);
    });

    it('should support isEmpty/isBlank', () => {
      expect(S('').isEmpty()).toBe(true);
      expect(S('   ').isBlank()).toBe(true);
    });
  });

  describe('analysis methods', () => {
    it('should support wordCount', () => {
      expect(S('hello world').wordCount()).toBe(2);
    });

    it('should support charCount', () => {
      expect(S('hello').charCount()).toBe(5);
    });

    it('should support lineCount', () => {
      expect(S('a\nb\nc').lineCount()).toBe(3);
    });
  });

  describe('similarity methods', () => {
    it('should support levenshtein', () => {
      expect(S('hello').levenshtein('hallo')).toBe(1);
    });

    it('should support dice', () => {
      expect(S('hello').dice('hello')).toBe(1);
    });
  });

  describe('sanitization methods', () => {
    it('should support slugify', () => {
      expect(S('Hello World!').slugify().value).toBe('hello-world');
    });

    it('should support escapeHtml', () => {
      expect(S('<script>').escapeHtml().value).toBe('&lt;script&gt;');
    });

    it('should support stripHtml', () => {
      expect(S('<p>Hello</p>').stripHtml().value).toBe('Hello');
    });
  });

  describe('pluralization methods', () => {
    it('should support plural', () => {
      expect(S('apple').plural().value).toBe('apples');
      expect(S('child').plural().value).toBe('children');
    });

    it('should support singular', () => {
      expect(S('apples').singular().value).toBe('apple');
    });
  });

  describe('split methods', () => {
    it('should support lines', () => {
      expect(S('a\nb\nc').lines()).toEqual(['a', 'b', 'c']);
    });

    it('should support words', () => {
      expect(S('hello world').words()).toEqual(['hello', 'world']);
    });

    it('should support chars', () => {
      expect(S('hello').chars()).toEqual(['h', 'e', 'l', 'l', 'o']);
    });
  });

  describe('additional case methods', () => {
    it('should support titleCase', () => {
      expect(S('hello world').titleCase().value).toBe('Hello World');
    });

    it('should support sentenceCase', () => {
      expect(S('hello world').sentenceCase().value).toBe('Hello world');
    });

    it('should support constantCase', () => {
      expect(S('hello world').constantCase().value).toBe('HELLO_WORLD');
    });

    it('should support dotCase', () => {
      expect(S('hello world').dotCase().value).toBe('hello.world');
    });

    it('should support pathCase', () => {
      expect(S('hello world').pathCase().value).toBe('hello/world');
    });

    it('should support headerCase', () => {
      expect(S('hello world').headerCase().value).toBe('Hello-World');
    });

    it('should support swapCase', () => {
      expect(S('Hello World').swapCase().value).toBe('hELLO wORLD');
    });

    it('should support decapitalize', () => {
      expect(S('Hello').decapitalize().value).toBe('hello');
    });
  });

  describe('additional manipulation methods', () => {
    it('should support trimStart/trimEnd', () => {
      expect(S('  hello').trimStart().value).toBe('hello');
      expect(S('hello  ').trimEnd().value).toBe('hello');
    });

    it('should support repeat', () => {
      expect(S('ab').repeat(3).value).toBe('ababab');
    });

    it('should support reverse', () => {
      expect(S('hello').reverse().value).toBe('olleh');
    });

    it('should support insert/remove', () => {
      expect(S('hello').insert(2, 'XX').value).toBe('heXXllo');
      expect(S('hello').remove(1, 2).value).toBe('hlo');
    });

    it('should support replace/replaceAll', () => {
      expect(S('hello').replace('l', 'L').value).toBe('heLlo');
      expect(S('hello').replaceAll('l', 'L').value).toBe('heLLo');
    });

    it('should support beforeLast/afterLast', () => {
      expect(S('a@b@c').beforeLast('@').value).toBe('a@b');
      expect(S('a@b@c').afterLast('@').value).toBe('c');
    });

    it('should support append/prepend', () => {
      expect(S('hello').append(' world').value).toBe('hello world');
      expect(S('world').prepend('hello ').value).toBe('hello world');
    });

    it('should support surround', () => {
      expect(S('hello').surround('*').value).toBe('*hello*');
    });

    it('should support collapseWhitespace', () => {
      expect(S('hello   world').collapseWhitespace().value).toBe('hello world');
    });
  });

  describe('additional validation methods', () => {
    it('should support isUuid', () => {
      expect(S('550e8400-e29b-41d4-a716-446655440000').isUuid()).toBe(true);
    });

    it('should support isIp', () => {
      expect(S('192.168.1.1').isIp()).toBe(true);
    });

    it('should support isPhone', () => {
      expect(S('+1-555-555-5555').isPhone()).toBe(true);
      expect(S('invalid').isPhone()).toBe(false);
    });

    it('should support isCreditCard', () => {
      expect(S('4111111111111111').isCreditCard()).toBe(true);
      expect(S('invalid').isCreditCard()).toBe(false);
    });

    it('should support isAlpha/isNumeric/isAlphanumeric', () => {
      expect(S('hello').isAlpha()).toBe(true);
      expect(S('123').isNumeric()).toBe(true);
      expect(S('hello123').isAlphanumeric()).toBe(true);
    });

    it('should support isHex/isBase64/isJson', () => {
      expect(S('ff00ff').isHex()).toBe(true);
      expect(S('aGVsbG8=').isBase64()).toBe(true);
      expect(S('{"key":"value"}').isJson()).toBe(true);
    });

    it('should support isUpperCase/isLowerCase', () => {
      expect(S('HELLO').isUpperCase()).toBe(true);
      expect(S('hello').isLowerCase()).toBe(true);
    });
  });

  describe('additional sanitization methods', () => {
    it('should support escape/unescape', () => {
      expect(S('hello"world').escape().value).toBe('hello\\"world');
    });

    it('should support unescapeHtml', () => {
      expect(S('&lt;div&gt;').unescapeHtml().value).toBe('<div>');
    });

    it('should support escapeRegex', () => {
      expect(S('a.b*c').escapeRegex().value).toBe('a\\.b\\*c');
    });

    it('should support filename', () => {
      expect(S('file<>name.txt').filename().value).toBe('filename.txt');
    });

    it('should support stripTags', () => {
      expect(S('<p>Hello</p>').stripTags().value).toBe('Hello');
    });

    it('should support clean', () => {
      expect(S('hello   world').clean().value).toBe('hello world');
    });

    it('should support normalize', () => {
      // normalize uses Unicode NFC normalization
      const result = S('café').normalize().value;
      expect(typeof result).toBe('string');
    });

    it('should support latinise', () => {
      expect(S('Héllo').latinise().value).toBe('Hello');
    });

    it('should support transliterate', () => {
      expect(typeof S('Hello').transliterate().value).toBe('string');
    });
  });

  describe('additional formatting methods', () => {
    it('should support template', () => {
      expect(S('Hello, {{name}}!').template({ name: 'World' }).value).toBe('Hello, World!');
    });

    it('should support sprintf', () => {
      expect(S('%s has %d apples').sprintf('John', 5).value).toBe('John has 5 apples');
    });

    it('should support mask/unmask', () => {
      expect(S('1234567890').mask('(###) ###-####').value).toBe('(123) 456-7890');
      expect(S('(123) 456-7890').unmask('(###) ###-####').value).toBe('1234567890');
    });
  });

  describe('additional analysis methods', () => {
    it('should support sentenceCount', () => {
      expect(S('Hello. World!').sentenceCount()).toBe(2);
    });

    it('should support paragraphCount', () => {
      expect(S('Para 1\n\nPara 2').paragraphCount()).toBe(2);
    });

    it('should support byteSize', () => {
      expect(S('Hello').byteSize()).toBe(5);
    });

    it('should support entropy', () => {
      expect(S('aaaa').entropy()).toBe(0);
    });

    it('should support frequency', () => {
      expect(S('hello').frequency()).toEqual({ h: 1, e: 1, l: 2, o: 1 });
    });

    it('should support readingTime/speakingTime', () => {
      const longText = 'word '.repeat(200);
      expect(S(longText).readingTime()).toBeGreaterThan(0);
      expect(S(longText).speakingTime()).toBeGreaterThan(0);
    });
  });

  describe('additional search methods', () => {
    it('should support contains', () => {
      expect(S('hello world').contains('world')).toBe(true);
    });

    it('should support startsWith/endsWith', () => {
      expect(S('hello').startsWith('he')).toBe(true);
      expect(S('hello').endsWith('lo')).toBe(true);
    });

    it('should support indexOf/lastIndexOf', () => {
      expect(S('hello').indexOf('l')).toBe(2);
      expect(S('hello').lastIndexOf('l')).toBe(3);
    });

    it('should support countOccurrences', () => {
      expect(S('hello').countOccurrences('l')).toBe(2);
    });

    it('should support positions', () => {
      expect(S('hello').positions('l')).toEqual([2, 3]);
    });

    it('should support match/matchAll', () => {
      expect(S('hello 123').match(/\d+/)).toBe('123');
      expect(S('hello 123 world 456').matchAll(/\d+/g)).toEqual(['123', '456']);
    });
  });

  describe('additional similarity methods', () => {
    it('should support levenshteinRatio', () => {
      expect(S('hello').levenshteinRatio('hello')).toBe(1);
    });

    it('should support jaroWinkler', () => {
      expect(S('hello').jaroWinkler('hallo')).toBeGreaterThan(0);
    });

    it('should support hamming', () => {
      expect(S('hello').hamming('hallo')).toBe(1);
    });

    it('should support cosine', () => {
      expect(S('hello world').cosine('hello world')).toBeCloseTo(1);
    });

    it('should support similarity', () => {
      expect(S('hello').similarity('hallo')).toBeGreaterThan(0);
    });
  });

  describe('diff methods', () => {
    it('should support diffChars', () => {
      const diff = S('hello').diffChars('hallo');
      expect(diff.length).toBeGreaterThan(0);
    });

    it('should support diffWords', () => {
      const diff = S('hello world').diffWords('hello there');
      expect(diff.length).toBeGreaterThan(0);
    });

    it('should support diffLines', () => {
      const diff = S('line1\nline2').diffLines('line1\nline3');
      expect(diff.length).toBeGreaterThan(0);
    });

    it('should support diff', () => {
      const diff = S('hello').diff('hallo');
      expect(diff.length).toBeGreaterThan(0);
    });
  });

  describe('pluralization methods', () => {
    it('should support isPlural/isSingular', () => {
      expect(S('apples').isPlural()).toBe(true);
      expect(S('apple').isSingular()).toBe(true);
    });
  });
});
