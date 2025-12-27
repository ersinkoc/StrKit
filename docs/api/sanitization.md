# Sanitization

Clean and sanitize strings.

## escapeHtml / unescapeHtml

Escape or unescape HTML entities.

```typescript
escapeHtml(input: string): string
unescapeHtml(input: string): string
```

**Example:**
```typescript
str.escapeHtml('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

str.unescapeHtml('&lt;div&gt;');  // '<div>'
```

## escape / unescape

Escape or unescape special characters for string literals.

```typescript
escape(input: string): string
unescape(input: string): string
```

**Example:**
```typescript
str.escape('Hello "World"');        // 'Hello \\"World\\"'
str.escape('line1\nline2');         // 'line1\\nline2'
str.unescape('Hello \\"World\\"');  // 'Hello "World"'
```

## escapeRegex

Escape regex special characters.

```typescript
escapeRegex(input: string): string
```

**Example:**
```typescript
str.escapeRegex('a.b*c?');          // 'a\\.b\\*c\\?'
```

## slugify

Create URL-safe slug.

```typescript
slugify(input: string, options?: SlugifyOptions): string

interface SlugifyOptions {
  separator?: string;   // Default: '-'
  lowercase?: boolean;  // Default: true
  strict?: boolean;     // Default: false
  locale?: string;
}
```

**Example:**
```typescript
str.slugify('Hello World!');        // 'hello-world'
str.slugify('Héllo Wörld');         // 'hello-world'
str.slugify('Türkçe İçerik');       // 'turkce-icerik'
str.slugify('Hello World', { separator: '_' });  // 'hello_world'
```

## sanitizeFilename

Remove unsafe characters from filename.

```typescript
sanitizeFilename(input: string): string
```

**Example:**
```typescript
str.sanitizeFilename('file<>:"/\\|?*.txt');  // 'file.txt'
```

## stripHtml / stripTags

Remove HTML tags.

```typescript
stripHtml(input: string): string
stripTags(input: string, allowed?: string[]): string
```

**Example:**
```typescript
str.stripHtml('<p>Hello <b>World</b></p>');  // 'Hello World'
str.stripTags('<p>Hello <b>World</b></p>', ['p']);  // '<p>Hello World</p>'
```

## clean

Normalize whitespace.

```typescript
clean(input: string): string
```

**Example:**
```typescript
str.clean('hello   world\n\ntest');  // 'hello world test'
```

## latinise

Convert accented characters to ASCII.

```typescript
latinise(input: string): string
```

**Example:**
```typescript
str.latinise('Héllo Wörld');        // 'Hello World'
str.latinise('Cześć');              // 'Czesc'
str.latinise('Türkçe');             // 'Turkce'
```

## transliterate

Transliterate with locale-specific rules.

```typescript
transliterate(input: string, locale?: string): string
```

**Example:**
```typescript
str.transliterate('Привет', 'ru');  // 'Privet'
str.transliterate('Héllo');         // 'Hello' (falls back to latinise)
```
