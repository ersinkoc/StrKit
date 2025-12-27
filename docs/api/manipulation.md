# Manipulation

Transform and modify strings.

## trim / trimStart / trimEnd

Remove characters from string ends.

```typescript
trim(input: string, chars?: string): string
trimStart(input: string, chars?: string): string
trimEnd(input: string, chars?: string): string
```

**Example:**
```typescript
str.trim('  hello  ');              // 'hello'
str.trim('***hello***', '*');       // 'hello'
str.trimStart('  hello');           // 'hello'
str.trimEnd('hello  ');             // 'hello'
```

## pad / padStart / padEnd

Pad string to target length.

```typescript
pad(input: string, length: number, char?: string): string
padStart(input: string, length: number, char?: string): string
padEnd(input: string, length: number, char?: string): string
```

**Example:**
```typescript
str.pad('hello', 11);               // '   hello   '
str.pad('hello', 11, '*');          // '***hello***'
str.padStart('5', 3, '0');          // '005'
str.padEnd('hello', 10, '.');       // 'hello.....'
```

## reverse

Reverse a string (Unicode-aware).

```typescript
reverse(input: string): string
```

**Example:**
```typescript
str.reverse('hello');               // 'olleh'
str.reverse('👋🌍');                 // '🌍👋'
```

## truncate

Truncate string to specified length.

```typescript
truncate(input: string, length: number, options?: TruncateOptions): string

interface TruncateOptions {
  ellipsis?: string;    // Default: '...'
  position?: 'end' | 'middle' | 'start';  // Default: 'end'
}
```

**Example:**
```typescript
str.truncate('Hello World', 8);                    // 'Hello...'
str.truncate('Hello World', 8, { ellipsis: '…' }); // 'Hello W…'
str.truncate('Hello World', 8, { position: 'middle' });  // 'Hel...ld'
str.truncate('Hello World', 8, { position: 'start' });   // '...World'
```

## wrap / unwrap

Wrap or unwrap a string.

```typescript
wrap(input: string, wrapper: string, end?: string): string
unwrap(input: string, wrapper: string, end?: string): string
```

**Example:**
```typescript
str.wrap('hello', '"');             // '"hello"'
str.wrap('hello', '<', '>');        // '<hello>'
str.unwrap('"hello"', '"');         // 'hello'
str.unwrap('<hello>', '<', '>');    // 'hello'
```

## insert / remove

Insert or remove characters at position.

```typescript
insert(input: string, index: number, str: string): string
remove(input: string, start: number, count: number): string
```

**Example:**
```typescript
str.insert('hello', 2, 'X');        // 'heXllo'
str.insert('hello', 0, 'X');        // 'Xhello'
str.remove('hello', 1, 2);          // 'hlo'
```

## replaceAll

Replace all occurrences.

```typescript
replaceAll(input: string, search: string | RegExp, replacement: string): string
```

**Example:**
```typescript
str.replaceAll('hello hello', 'hello', 'hi');  // 'hi hi'
str.replaceAll('a1b2c3', /\d/g, 'X');          // 'aXbXcX'
```

## between / before / after

Extract string parts.

```typescript
between(input: string, start: string, end: string): string
before(input: string, search: string): string
after(input: string, search: string): string
beforeLast(input: string, search: string): string
afterLast(input: string, search: string): string
```

**Example:**
```typescript
str.between('[hello]', '[', ']');   // 'hello'
str.before('hello world', ' ');     // 'hello'
str.after('hello world', ' ');      // 'world'
str.beforeLast('a/b/c', '/');       // 'a/b'
str.afterLast('a/b/c', '/');        // 'c'
```

## append / prepend / surround

Add to string.

```typescript
append(input: string, ...strings: string[]): string
prepend(input: string, ...strings: string[]): string
surround(input: string, wrapper: string): string
```

**Example:**
```typescript
str.append('hello', ' ', 'world');  // 'hello world'
str.prepend('world', 'hello', ' '); // 'hello world'
str.surround('hello', '*');         // '*hello*'
```

## lines / words / chars

Split string into arrays.

```typescript
lines(input: string): string[]
words(input: string): string[]
chars(input: string): string[]
```

**Example:**
```typescript
str.lines('a\nb\nc');               // ['a', 'b', 'c']
str.words('hello world');           // ['hello', 'world']
str.chars('abc');                   // ['a', 'b', 'c']
str.chars('👋🌍');                   // ['👋', '🌍']
```

## repeat

Repeat a string.

```typescript
repeat(input: string, count: number): string
```

**Example:**
```typescript
str.repeat('ab', 3);                // 'ababab'
str.repeat('-', 10);                // '----------'
```

## collapseWhitespace

Collapse multiple whitespace to single space.

```typescript
collapseWhitespace(input: string): string
```

**Example:**
```typescript
str.collapseWhitespace('hello   world');    // 'hello world'
str.collapseWhitespace('hello\n\nworld');   // 'hello world'
```
