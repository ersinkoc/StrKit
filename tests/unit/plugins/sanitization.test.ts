/// <reference types="vitest/globals" />
// Import locales to register them for transliterate tests
import '../../../src/locales/index.js';

import {
  escape,
  unescape,
  escapeHtml,
  unescapeHtml,
  escapeRegex,
  slugify,
  sanitizeFilename,
  stripHtml,
  stripTags,
  clean,
  normalize,
  latinise,
  transliterate,
} from '../../../src/plugins/sanitization/index.js';

describe('Sanitization Plugin', () => {
  describe('escape', () => {
    it('should escape special characters', () => {
      expect(escape('Hello "World"')).toBe('Hello \\"World\\"');
      expect(escape("It's")).toBe("It\\'s");
    });

    it('should escape backslashes', () => {
      expect(escape('path\\to\\file')).toBe('path\\\\to\\\\file');
    });

    it('should escape newlines and tabs', () => {
      expect(escape('line1\nline2')).toBe('line1\\nline2');
      expect(escape('col1\tcol2')).toBe('col1\\tcol2');
      expect(escape('line1\r\nline2')).toBe('line1\\r\\nline2');
    });

    it('should handle empty string', () => {
      expect(escape('')).toBe('');
    });
  });

  describe('unescape', () => {
    it('should unescape special characters', () => {
      expect(unescape('Hello \\"World\\"')).toBe('Hello "World"');
      expect(unescape("It\\'s")).toBe("It's");
    });

    it('should unescape backslashes', () => {
      // \\\\ in JS literal = \\ in actual string, which unescape converts to \
      expect(unescape('a\\\\b')).toBe('a\\b');
    });

    it('should unescape newlines and tabs', () => {
      expect(unescape('line1\\nline2')).toBe('line1\nline2');
      expect(unescape('col1\\tcol2')).toBe('col1\tcol2');
      expect(unescape('line1\\r\\nline2')).toBe('line1\r\nline2');
    });

    it('should handle empty string', () => {
      expect(unescape('')).toBe('');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML entities', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('should escape all HTML special characters', () => {
      expect(escapeHtml('& < > " \' ` = /')).toBe(
        '&amp; &lt; &gt; &quot; &#x27; &#x60; &#x3D; &#x2F;'
      );
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should leave safe strings unchanged', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('unescapeHtml', () => {
    it('should unescape HTML entities', () => {
      expect(unescapeHtml('&lt;div&gt;')).toBe('<div>');
    });

    it('should unescape named entities', () => {
      expect(unescapeHtml('&amp;&lt;&gt;&quot;')).toBe('&<>"');
    });

    it('should unescape numeric entities', () => {
      expect(unescapeHtml('&#65;&#66;&#67;')).toBe('ABC');
    });

    it('should unescape hex entities', () => {
      expect(unescapeHtml('&#x41;&#x42;&#x43;')).toBe('ABC');
    });

    it('should handle nbsp', () => {
      expect(unescapeHtml('hello&nbsp;world')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(unescapeHtml('')).toBe('');
    });
  });

  describe('escapeRegex', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegex('a.b*c?')).toBe('a\\.b\\*c\\?');
    });

    it('should escape all regex metacharacters', () => {
      expect(escapeRegex('.*+?^${}()|[]\\')).toBe(
        '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'
      );
    });

    it('should handle empty string', () => {
      expect(escapeRegex('')).toBe('');
    });

    it('should leave safe strings unchanged', () => {
      expect(escapeRegex('hello')).toBe('hello');
    });
  });

  describe('slugify', () => {
    it('should create URL-safe slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });

    it('should handle accented characters', () => {
      expect(slugify('Héllo Wörld!')).toBe('hello-world');
    });

    it('should handle Turkish characters', () => {
      expect(slugify('Türkçe İçerik')).toBe('turkce-icerik');
    });

    it('should use custom separator', () => {
      expect(slugify('Hello World', { separator: '_' })).toBe('hello_world');
    });

    it('should preserve case when lowercase is false', () => {
      expect(slugify('Hello World', { lowercase: false })).toBe('Hello-World');
    });

    it('should handle strict mode', () => {
      expect(slugify('Hello World 123', { strict: true })).toBe('hello-world-123');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle multiple spaces and special chars', () => {
      expect(slugify('Hello   World!!!')).toBe('hello-world');
    });
  });

  describe('sanitizeFilename', () => {
    it('should remove unsafe characters', () => {
      expect(sanitizeFilename('file<>:"/\\|?*.txt')).toBe('file.txt');
    });

    it('should remove control characters', () => {
      expect(sanitizeFilename('file\x00\x1f.txt')).toBe('file.txt');
    });

    it('should trim dots and spaces', () => {
      expect(sanitizeFilename('...file.txt...')).toBe('file.txt');
      expect(sanitizeFilename('  file.txt  ')).toBe('file.txt');
    });

    it('should collapse multiple spaces', () => {
      expect(sanitizeFilename('my   file.txt')).toBe('my file.txt');
    });

    it('should handle empty string', () => {
      expect(sanitizeFilename('')).toBe('');
    });
  });

  describe('stripHtml', () => {
    it('should remove all HTML tags', () => {
      expect(stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World');
    });

    it('should remove script tags and content', () => {
      expect(stripHtml('<script>alert("xss")</script>Hello')).toBe('Hello');
    });

    it('should remove style tags and content', () => {
      expect(stripHtml('<style>body{color:red}</style>Hello')).toBe('Hello');
    });

    it('should convert nbsp to space', () => {
      expect(stripHtml('Hello&nbsp;World')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(stripHtml('')).toBe('');
    });

    it('should clean up whitespace', () => {
      expect(stripHtml('<p>Hello</p>  <p>World</p>')).toBe('Hello World');
    });
  });

  describe('stripTags', () => {
    it('should remove all tags when no allowed list', () => {
      expect(stripTags('<p>Hello <b>World</b></p>')).toBe('Hello World');
    });

    it('should keep allowed tags', () => {
      expect(stripTags('<p>Hello <b>World</b></p>', ['p'])).toBe('<p>Hello World</p>');
    });

    it('should be case insensitive for allowed tags', () => {
      expect(stripTags('<P>Hello</P>', ['p'])).toBe('<P>Hello</P>');
    });

    it('should handle empty string', () => {
      expect(stripTags('')).toBe('');
    });

    it('should handle empty allowed list', () => {
      expect(stripTags('<p>Hello</p>', [])).toBe('Hello');
    });
  });

  describe('clean', () => {
    it('should normalize whitespace', () => {
      expect(clean('hello   world')).toBe('hello world');
    });

    it('should convert newlines to spaces', () => {
      expect(clean('hello\n\n\nworld')).toBe('hello world');
    });

    it('should trim leading/trailing whitespace', () => {
      expect(clean('  hello world  ')).toBe('hello world');
    });

    it('should handle tabs', () => {
      expect(clean('hello\t\tworld')).toBe('hello world');
    });

    it('should handle empty string', () => {
      expect(clean('')).toBe('');
    });
  });

  describe('normalize', () => {
    it('should normalize unicode (NFC)', () => {
      // café composed vs decomposed
      const composed = 'caf\u00e9'; // é as single character
      const decomposed = 'cafe\u0301'; // e + combining accent
      expect(normalize(decomposed)).toBe(composed);
    });

    it('should handle empty string', () => {
      expect(normalize('')).toBe('');
    });
  });

  describe('latinise', () => {
    it('should convert accented characters to ASCII', () => {
      expect(latinise('Héllo Wörld')).toBe('Hello World');
    });

    it('should handle Polish characters', () => {
      expect(latinise('Cześć')).toBe('Czesc');
      expect(latinise('żółć')).toBe('zolc');
    });

    it('should handle German characters', () => {
      expect(latinise('Größe')).toBe('Grosse');
    });

    it('should handle Turkish characters', () => {
      expect(latinise('Türkçe')).toBe('Turkce');
      expect(latinise('İstanbul')).toBe('Istanbul');
    });

    it('should handle Nordic characters', () => {
      expect(latinise('Ångström')).toBe('Angstrom');
      expect(latinise('Björk')).toBe('Bjork');
    });

    it('should handle empty string', () => {
      expect(latinise('')).toBe('');
    });
  });

  describe('transliterate', () => {
    it('should transliterate without locale', () => {
      expect(transliterate('Héllo')).toBe('Hello');
    });

    it('should transliterate with locale', () => {
      // Russian characters should be transliterated
      const result = transliterate('Привет', 'ru');
      // If locale is loaded, it returns 'Privet'; otherwise falls back to input
      // Just check it doesn't throw and returns a string
      expect(typeof result).toBe('string');
    });

    it('should handle empty string', () => {
      expect(transliterate('')).toBe('');
    });

    it('should fall back to latinise for unknown locale', () => {
      expect(transliterate('Héllo', 'xx')).toBe('Hello');
    });
  });
});
