# Search

Search within strings.

## contains

Check if string contains substring.

```typescript
contains(input: string, search: string, options?: StrKitOptions): boolean

interface StrKitOptions {
  caseSensitive?: boolean;  // Default: true
}
```

**Example:**
```typescript
str.contains('hello world', 'world');  // true
str.contains('Hello World', 'world');  // false
str.contains('Hello World', 'world', { caseSensitive: false });  // true
```

## startsWith / endsWith

Check string start or end.

```typescript
startsWith(input: string, search: string): boolean
endsWith(input: string, search: string): boolean
```

**Example:**
```typescript
str.startsWith('hello world', 'hello');  // true
str.endsWith('hello world', 'world');    // true
```

## indexOf / lastIndexOf

Find position of substring.

```typescript
indexOf(input: string, search: string, options?: SearchOptions): number
lastIndexOf(input: string, search: string, options?: SearchOptions): number

interface SearchOptions {
  fromIndex?: number;
  caseSensitive?: boolean;
}
```

**Example:**
```typescript
str.indexOf('hello world', 'o');         // 4
str.indexOf('hello world', 'o', { fromIndex: 5 });  // 7
str.lastIndexOf('hello world', 'o');     // 7
```

## countOccurrences

Count occurrences of substring.

```typescript
countOccurrences(input: string, search: string, options?: StrKitOptions): number
```

**Example:**
```typescript
str.countOccurrences('abracadabra', 'a');  // 5
str.countOccurrences('hello hello', 'hello');  // 2
```

## positions

Get all positions of substring.

```typescript
positions(input: string, search: string, options?: StrKitOptions): number[]
```

**Example:**
```typescript
str.positions('abracadabra', 'a');  // [0, 3, 5, 7, 10]
```

## match

Get first regex match.

```typescript
match(input: string, pattern: RegExp): string | null
```

**Example:**
```typescript
str.match('hello 123 world 456', /\d+/);  // '123'
str.match('hello world', /\d+/);          // null
```

## matchAll

Get all regex matches.

```typescript
matchAll(input: string, pattern: RegExp): string[]
```

**Example:**
```typescript
str.matchAll('hello 123 world 456', /\d+/g);  // ['123', '456']
```

## extract

Extract with regex groups.

```typescript
extract(input: string, pattern: RegExp): RegExpMatchArray | null
```

**Example:**
```typescript
str.extract('hello world', /(\w+) (\w+)/);
// ['hello world', 'hello', 'world']
```

## extractAll

Extract all with regex groups.

```typescript
extractAll(input: string, pattern: RegExp): RegExpMatchArray[]
```

**Example:**
```typescript
str.extractAll('a1 b2 c3', /([a-z])(\d)/g);
// [['a1', 'a', '1'], ['b2', 'b', '2'], ['c3', 'c', '3']]
```
