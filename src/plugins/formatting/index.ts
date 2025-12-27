/**
 * Formatting Plugin
 * Provides methods for formatting strings
 */

import type { TemplateOptions, CurrencyOptions, MaskOptions } from '../../core/types.js';
import { getNestedProperty } from '../../core/utils.js';
import { getLocaleData } from '../../core/locale.js';

/**
 * Template interpolation with nested property support
 * @example template('Hello, {{name}}!', { name: 'World' }) // 'Hello, World!'
 * @example template('{{user.name}} is {{user.age}}', { user: { name: 'John', age: 30 } }) // 'John is 30'
 */
export function template(
  input: string,
  data: Record<string, unknown>,
  options?: TemplateOptions
): string {
  if (!input) return '';

  const openDelimiter = options?.openDelimiter ?? '{{';
  const closeDelimiter = options?.closeDelimiter ?? '}}';

  const escapedOpen = openDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedClose = closeDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regex = new RegExp(`${escapedOpen}\\s*([\\w.]+)\\s*${escapedClose}`, 'g');

  return input.replace(regex, (_, path: string) => {
    const value = getNestedProperty(data, path);
    return value !== undefined ? String(value) : '';
  });
}

/**
 * Printf-style formatting
 * Supports: %s (string), %d (integer), %f (float), %x (hex), %o (octal), %b (binary)
 * @example sprintf('%s has %d apples', 'John', 5) // 'John has 5 apples'
 * @example sprintf('%05d', 42) // '00042'
 * @example sprintf('%.2f', 3.14159) // '3.14'
 */
export function sprintf(format: string, ...args: unknown[]): string {
  if (!format) return '';

  let argIndex = 0;

  return format.replace(
    /%([+\-0 #]*)(\d+)?(?:\.(\d+))?([sdifoxXbc%])/g,
    (_match, flags: string, widthStr: string, precisionStr: string, type: string) => {
      if (type === '%') return '%';

      const arg = args[argIndex++];
      const width = widthStr ? parseInt(widthStr, 10) : 0;
      const precision = precisionStr ? parseInt(precisionStr, 10) : undefined;

      const zeroPad = flags.includes('0');
      const leftAlign = flags.includes('-');
      const showSign = flags.includes('+');
      const spaceSign = flags.includes(' ');

      let result = '';

      switch (type) {
        case 's': {
          result = String(arg ?? '');
          if (precision !== undefined) {
            result = result.slice(0, precision);
          }
          break;
        }

        case 'd':
        case 'i': {
          const num = Math.trunc(Number(arg) || 0);
          const sign = num < 0 ? '-' : showSign ? '+' : spaceSign ? ' ' : '';
          result = sign + Math.abs(num).toString();
          break;
        }

        case 'f': {
          const num = Number(arg) || 0;
          const sign = num < 0 ? '-' : showSign ? '+' : spaceSign ? ' ' : '';
          const absNum = Math.abs(num);
          result = sign + (precision !== undefined ? absNum.toFixed(precision) : absNum.toString());
          break;
        }

        case 'x': {
          const num = Math.trunc(Number(arg) || 0);
          result = Math.abs(num).toString(16);
          break;
        }

        case 'X': {
          const num = Math.trunc(Number(arg) || 0);
          result = Math.abs(num).toString(16).toUpperCase();
          break;
        }

        case 'o': {
          const num = Math.trunc(Number(arg) || 0);
          result = Math.abs(num).toString(8);
          break;
        }

        case 'b': {
          const num = Math.trunc(Number(arg) || 0);
          result = Math.abs(num).toString(2);
          break;
        }

        case 'c': {
          const code = typeof arg === 'number' ? arg : (typeof arg === 'string' ? arg.charCodeAt(0) : 0);
          result = String.fromCharCode(code);
          break;
        }

        default:
          result = String(arg ?? '');
      }

      // Apply width padding
      if (width > 0 && result.length < width) {
        const padChar = zeroPad && !leftAlign ? '0' : ' ';
        const padding = padChar.repeat(width - result.length);

        // For zero padding with sign, insert padding after sign
        if (zeroPad && (result.startsWith('-') || result.startsWith('+') || result.startsWith(' '))) {
          result = result[0] + padding + result.slice(1);
        } else if (leftAlign) {
          result = result + padding;
        } else {
          result = padding + result;
        }
      }

      return result;
    }
  );
}

/**
 * Apply mask pattern to string
 * @example mask('1234567890', '(###) ###-####') // '(123) 456-7890'
 * @example mask('4111111111111111', '#### #### #### ####') // '4111 1111 1111 1111'
 */
export function mask(input: string, pattern: string, options?: MaskOptions): string {
  if (!input || !pattern) return input ?? '';

  const maskChar = options?.maskChar ?? '#';
  let inputIndex = 0;
  let result = '';

  for (const char of pattern) {
    if (char === maskChar) {
      if (inputIndex < input.length) {
        result += input[inputIndex];
        inputIndex++;
      } else {
        break;
      }
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Remove mask pattern from string
 * @example unmask('(123) 456-7890', '(###) ###-####') // '1234567890'
 */
export function unmask(input: string, pattern: string, options?: MaskOptions): string {
  if (!input || !pattern) return input ?? '';

  const maskChar = options?.maskChar ?? '#';
  let result = '';
  let patternIndex = 0;

  for (let i = 0; i < input.length && patternIndex < pattern.length; i++) {
    const patternChar = pattern[patternIndex];

    if (patternChar === maskChar) {
      result += input[i];
      patternIndex++;
    } else if (input[i] === patternChar) {
      patternIndex++;
    }
  }

  return result;
}

/**
 * Convert number to ordinal string
 * @example ordinalize(1) // '1st'
 * @example ordinalize(2) // '2nd'
 * @example ordinalize(11) // '11th'
 */
export function ordinalize(num: number, locale?: string): string {
  const absNum = Math.abs(Math.floor(num));

  if (locale) {
    const localeData = getLocaleData(locale);
    const { ordinals } = localeData;

    for (const [rule, suffix] of ordinals.rules) {
      if (typeof rule === 'function') {
        if (rule(absNum)) {
          return `${num}${suffix}`;
        }
      } else if (rule === absNum) {
        return `${num}${suffix}`;
      }
    }

    return `${num}${ordinals.default}`;
  }

  // Default English ordinals
  const mod10 = absNum % 10;
  const mod100 = absNum % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return `${num}th`;
  }

  switch (mod10) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

/**
 * Format number as currency
 * @example formatCurrency(1234.56, { locale: 'en-US', currency: 'USD' }) // '$1,234.56'
 */
export function formatCurrency(amount: number, options?: CurrencyOptions): string {
  const locale = options?.locale ?? 'en-US';
  const currency = options?.currency ?? 'USD';

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });

    let result = formatter.format(amount);

    // Override symbol if provided
    if (options?.symbol) {
      // Get the currency symbol from formatted result and replace it
      const parts = formatter.formatToParts(amount);
      const currencyPart = parts.find((p) => p.type === 'currency');
      if (currencyPart) {
        result = result.replace(currencyPart.value, options.symbol);
      }
    }

    return result;
  } catch {
    // Fallback for environments without Intl
    const localeData = getLocaleData(locale.split('-')[0] ?? 'en');
    const formatted = formatNumber(amount, {
      decimals: 2,
      thousands: localeData.numbers.thousands,
      decimal: localeData.numbers.decimal,
    });
    return `${options?.symbol ?? '$'}${formatted}`;
  }
}

/**
 * Format number with thousands separator
 * @example formatNumber(1234567.89) // '1,234,567.89'
 * @example formatNumber(1234567.89, { thousands: '.', decimal: ',' }) // '1.234.567,89'
 */
export function formatNumber(
  input: string | number,
  options?: { decimals?: number; thousands?: string; decimal?: string }
): string {
  const num = typeof input === 'string' ? parseFloat(input) : input;

  if (isNaN(num)) return String(input);

  const decimals = options?.decimals;
  const thousands = options?.thousands ?? ',';
  const decimal = options?.decimal ?? '.';

  // Format number
  let numStr: string;
  if (decimals !== undefined) {
    numStr = num.toFixed(decimals);
  } else {
    numStr = num.toString();
  }

  // Split integer and decimal parts
  const [intPart, decPart] = numStr.split('.');

  // Add thousands separator
  const formattedInt = (intPart ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

  // Combine parts
  if (decPart !== undefined) {
    return formattedInt + decimal + decPart;
  }

  return formattedInt;
}

// Export plugin
export const formattingPlugin = {
  name: 'formatting',
  version: '1.0.0',
  methods: {
    template,
    sprintf,
    mask,
    unmask,
    ordinalize,
    currency: formatCurrency,
    number: formatNumber,
  },
};
