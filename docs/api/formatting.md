# Formatting

Format and template strings.

## template

Simple template replacement.

```typescript
template(input: string, data: Record<string, unknown>, options?: TemplateOptions): string

interface TemplateOptions {
  openDelimiter?: string;   // Default: '{{'
  closeDelimiter?: string;  // Default: '}}'
}
```

**Example:**
```typescript
str.template('Hello, {{name}}!', { name: 'World' });  // 'Hello, World!'
str.template('{{user.name}} is {{user.age}}', { user: { name: 'John', age: 30 } });
// 'John is 30'

str.template('Hello, <%= name %>!', { name: 'World' }, {
  openDelimiter: '<%=',
  closeDelimiter: '%>'
});  // 'Hello, World!'
```

## sprintf

C-style string formatting.

```typescript
sprintf(format: string, ...args: unknown[]): string
```

**Example:**
```typescript
str.sprintf('%s has %d apples', 'John', 5);  // 'John has 5 apples'
str.sprintf('%05d', 42);                     // '00042'
str.sprintf('%.2f', 3.14159);                // '3.14'
str.sprintf('%x', 255);                      // 'ff'
str.sprintf('%+d', 42);                      // '+42'
```

**Format specifiers:**
- `%s` - String
- `%d`, `%i` - Integer
- `%f` - Float
- `%x`, `%X` - Hexadecimal (lower/upper)
- `%o` - Octal
- `%b` - Binary
- `%c` - Character
- `%%` - Literal percent

## mask / unmask

Apply or remove a mask pattern.

```typescript
mask(input: string, pattern: string, options?: MaskOptions): string
unmask(input: string, pattern: string, options?: MaskOptions): string

interface MaskOptions {
  maskChar?: string;  // Default: '#'
}
```

**Example:**
```typescript
str.mask('1234567890', '(###) ###-####');  // '(123) 456-7890'
str.mask('4111111111111111', '#### #### #### ####');  // '4111 1111 1111 1111'
str.unmask('(123) 456-7890', '(###) ###-####');  // '1234567890'
```

## ordinalize

Add ordinal suffix to number.

```typescript
ordinalize(num: number): string
```

**Example:**
```typescript
str.ordinalize(1);   // '1st'
str.ordinalize(2);   // '2nd'
str.ordinalize(3);   // '3rd'
str.ordinalize(4);   // '4th'
str.ordinalize(11);  // '11th'
str.ordinalize(21);  // '21st'
```

## formatNumber

Format number with separators.

```typescript
formatNumber(input: number | string, options?: NumberFormatOptions): string

interface NumberFormatOptions {
  decimals?: number;
  thousands?: string;  // Default: ','
  decimal?: string;    // Default: '.'
}
```

**Example:**
```typescript
str.formatNumber(1234567.89);  // '1,234,567.89'
str.formatNumber(1234.567, { decimals: 2 });  // '1,234.57'
str.formatNumber(1234567.89, { thousands: '.', decimal: ',' });  // '1.234.567,89'
```

## formatCurrency

Format as currency.

```typescript
formatCurrency(amount: number, options?: CurrencyOptions): string

interface CurrencyOptions {
  locale?: string;
  currency?: string;
  symbol?: string;
}
```

**Example:**
```typescript
str.formatCurrency(1234.56);  // '$1,234.56' (default)
str.formatCurrency(1234.56, { locale: 'en-US', currency: 'USD' });  // '$1,234.56'
str.formatCurrency(1234.56, { symbol: '€' });  // '€1,234.56'
```
