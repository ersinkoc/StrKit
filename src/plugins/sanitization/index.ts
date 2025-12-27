/**
 * Sanitization Plugin
 * Provides methods for sanitizing and cleaning strings
 */

import type { SlugifyOptions } from '../../core/types.js';
import { getLocaleData } from '../../core/locale.js';

/**
 * HTML entity map for escaping
 */
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * HTML entity map for unescaping
 */
const HTML_UNESCAPE_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/',
  '&#x60;': '`',
  '&#x3D;': '=',
  '&#39;': "'",
  '&apos;': "'",
  '&#47;': '/',
  '&nbsp;': ' ',
};

/**
 * Latin character mappings for latinise
 */
const LATIN_MAP: Record<string, string> = {
  // Acute accents
  'á': 'a', 'Á': 'A', 'é': 'e', 'É': 'E', 'í': 'i', 'Í': 'I',
  'ó': 'o', 'Ó': 'O', 'ú': 'u', 'Ú': 'U', 'ý': 'y', 'Ý': 'Y',
  // Grave accents
  'à': 'a', 'À': 'A', 'è': 'e', 'È': 'E', 'ì': 'i', 'Ì': 'I',
  'ò': 'o', 'Ò': 'O', 'ù': 'u', 'Ù': 'U',
  // Circumflex
  'â': 'a', 'Â': 'A', 'ê': 'e', 'Ê': 'E', 'î': 'i', 'Î': 'I',
  'ô': 'o', 'Ô': 'O', 'û': 'u', 'Û': 'U',
  // Umlaut/Diaeresis
  'ä': 'a', 'Ä': 'A', 'ë': 'e', 'Ë': 'E', 'ï': 'i', 'Ï': 'I',
  'ö': 'o', 'Ö': 'O', 'ü': 'u', 'Ü': 'U', 'ÿ': 'y', 'Ÿ': 'Y',
  // Tilde
  'ã': 'a', 'Ã': 'A', 'ñ': 'n', 'Ñ': 'N', 'õ': 'o', 'Õ': 'O',
  // Cedilla
  'ç': 'c', 'Ç': 'C',
  // Special characters
  'ß': 'ss', 'æ': 'ae', 'Æ': 'AE', 'œ': 'oe', 'Œ': 'OE',
  'ø': 'o', 'Ø': 'O', 'å': 'a', 'Å': 'A',
  // Turkish special characters
  'ğ': 'g', 'Ğ': 'G', 'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I',
  // Polish
  'ą': 'a', 'Ą': 'A', 'ć': 'c', 'Ć': 'C', 'ę': 'e', 'Ę': 'E',
  'ł': 'l', 'Ł': 'L', 'ń': 'n', 'Ń': 'N', 'ś': 's', 'Ś': 'S',
  'ź': 'z', 'Ź': 'Z', 'ż': 'z', 'Ż': 'Z',
  // Czech/Slovak
  'č': 'c', 'Č': 'C', 'ď': 'd', 'Ď': 'D', 'ě': 'e', 'Ě': 'E',
  'ň': 'n', 'Ň': 'N', 'ř': 'r', 'Ř': 'R', 'š': 's', 'Š': 'S',
  'ť': 't', 'Ť': 'T', 'ů': 'u', 'Ů': 'U', 'ž': 'z', 'Ž': 'Z',
  // Hungarian
  'ő': 'o', 'Ő': 'O', 'ű': 'u', 'Ű': 'U',
  // Romanian
  'ă': 'a', 'Ă': 'A', 'ș': 's', 'Ș': 'S', 'ț': 't', 'Ț': 'T',
  // Nordic
  'ð': 'd', 'Ð': 'D', 'þ': 'th', 'Þ': 'Th',
  // Greek (basic)
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z',
  'η': 'h', 'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm',
  'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's',
  'ς': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
};

/**
 * Escape special characters for string literals
 * @example escape('Hello "World"') // 'Hello \\"World\\"'
 */
export function escape(input: string): string {
  if (!input) return '';

  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Unescape special characters
 * @example unescape('Hello \\"World\\"') // 'Hello "World"'
 */
export function unescape(input: string): string {
  if (!input) return '';

  return input
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

/**
 * Escape HTML entities
 * @example escapeHtml('<script>alert("xss")</script>') // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(input: string): string {
  if (!input) return '';

  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/**
 * Unescape HTML entities
 * @example unescapeHtml('&lt;div&gt;') // '<div>'
 */
export function unescapeHtml(input: string): string {
  if (!input) return '';

  // Handle numeric entities
  let result = input.replace(/&#(\d+);/g, (_, dec: string) =>
    String.fromCharCode(parseInt(dec, 10))
  );
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  // Handle named entities
  for (const [entity, char] of Object.entries(HTML_UNESCAPE_MAP)) {
    result = result.split(entity).join(char);
  }

  return result;
}

/**
 * Escape regex special characters
 * @example escapeRegex('a.b*c?') // 'a\\.b\\*c\\?'
 */
export function escapeRegex(input: string): string {
  if (!input) return '';
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Create URL-safe slug
 * @example slugify('Hello World!') // 'hello-world'
 * @example slugify('Héllo Wörld!') // 'hello-world'
 */
export function slugify(input: string, options?: SlugifyOptions): string {
  if (!input) return '';

  const separator = options?.separator ?? '-';
  const lowercase = options?.lowercase !== false;

  // Latinise first
  let result = latinise(input);

  // Convert to lowercase if needed
  if (lowercase) {
    result = options?.locale
      ? result.toLocaleLowerCase(options.locale)
      : result.toLowerCase();
  }

  // Replace spaces and special chars with separator
  result = result
    .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
    .replace(/[\s_-]+/g, separator) // Replace spaces, underscores, hyphens with separator
    .replace(new RegExp(`^${escapeRegex(separator)}+|${escapeRegex(separator)}+$`, 'g'), ''); // Trim separators

  if (options?.strict) {
    result = result.replace(/[^a-z0-9-]/gi, '');
  }

  return result;
}

/**
 * Sanitize filename (remove unsafe characters)
 * @example sanitizeFilename('file<>:"/\\|?*.txt') // 'file.txt'
 */
export function sanitizeFilename(input: string): string {
  if (!input) return '';

  return input
    // Remove control characters
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1f\x80-\x9f]/g, '')
    // Remove reserved characters for Windows/Unix
    .replace(/[<>:"/\\|?*]/g, '')
    // Remove leading/trailing dots and spaces
    .replace(/^[\s.]+|[\s.]+$/g, '')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    // Truncate to reasonable length (255 is common filesystem limit)
    .slice(0, 255);
}

/**
 * Remove all HTML tags
 * @example stripHtml('<p>Hello <b>World</b></p>') // 'Hello World'
 */
export function stripHtml(input: string): string {
  if (!input) return '';

  return input
    // Remove script and style contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode entities
    .replace(/&nbsp;/g, ' ')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Remove HTML tags except allowed ones
 * @example stripTags('<p>Hello <b>World</b></p>', ['p']) // '<p>Hello World</p>'
 */
export function stripTags(input: string, allowed?: string[]): string {
  if (!input) return '';
  if (!allowed || allowed.length === 0) return stripHtml(input);

  const allowedLower = allowed.map((t) => t.toLowerCase());

  // Remove tags that are not in the allowed list
  return input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag: string) => {
    return allowedLower.includes(tag.toLowerCase()) ? match : '';
  });
}

/**
 * Clean string (normalize whitespace)
 * @example clean('hello   world\n\n\ntest') // 'hello world test'
 */
export function clean(input: string): string {
  if (!input) return '';

  return input
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Unicode normalization (NFC form)
 * @example normalize('café') // 'café' (composed form)
 */
export function normalize(input: string): string {
  if (!input) return '';
  return input.normalize('NFC');
}

/**
 * Convert accented characters to ASCII equivalents
 * @example latinise('Héllo Wörld') // 'Hello World'
 * @example latinise('Cześć') // 'Czesc'
 */
export function latinise(input: string): string {
  if (!input) return '';

  let result = '';
  for (const char of input) {
    result += LATIN_MAP[char] ?? char;
  }

  return result;
}

/**
 * Transliterate to Latin characters using locale-specific rules
 * @example transliterate('Привет', 'ru') // 'Privet'
 */
export function transliterate(input: string, locale?: string): string {
  if (!input) return '';

  // First try locale-specific transliteration
  if (locale) {
    const localeData = getLocaleData(locale);
    if (localeData.transliterate && Object.keys(localeData.transliterate).length > 0) {
      let result = '';
      for (const char of input) {
        result += localeData.transliterate[char] ?? char;
      }
      return latinise(result); // Apply general latinisation as fallback
    }
  }

  // Fallback to general latinisation
  return latinise(input);
}

// Export plugin
export const sanitizationPlugin = {
  name: 'sanitization',
  version: '1.0.0',
  methods: {
    escape,
    unescape,
    escapeHtml,
    unescapeHtml,
    escapeRegex,
    slugify,
    filename: sanitizeFilename,
    stripHtml,
    stripTags,
    clean,
    normalize,
    latinise,
    transliterate,
  },
};
