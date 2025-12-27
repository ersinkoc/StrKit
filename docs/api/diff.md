# Diff

Compare and diff strings.

## diffChars

Diff by characters.

```typescript
diffChars(a: string, b: string): DiffResult[]

interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}
```

**Example:**
```typescript
str.diffChars('abc', 'abd');
// [
//   { value: 'ab' },
//   { value: 'c', removed: true },
//   { value: 'd', added: true }
// ]
```

## diffWords

Diff by words.

```typescript
diffWords(a: string, b: string): DiffResult[]
```

**Example:**
```typescript
str.diffWords('hello world', 'hello there');
// [
//   { value: 'hello ' },
//   { value: 'world', removed: true },
//   { value: 'there', added: true }
// ]
```

## diffLines

Diff by lines.

```typescript
diffLines(a: string, b: string): DiffResult[]
```

**Example:**
```typescript
str.diffLines('line1\nline2', 'line1\nline3');
// [
//   { value: 'line1\n' },
//   { value: 'line2', removed: true },
//   { value: 'line3', added: true }
// ]
```

## diff

Generic diff with options.

```typescript
diff(a: string, b: string, options?: DiffOptions): DiffResult[]

interface DiffOptions {
  type?: 'chars' | 'words' | 'lines';
}
```

**Example:**
```typescript
str.diff('abc', 'abd', { type: 'chars' });
str.diff('hello world', 'hello there', { type: 'words' });
```

## patch

Apply diff to recreate string.

```typescript
patch(original: string, diff: DiffResult[]): string
```

**Example:**
```typescript
const original = 'hello world';
const changes = str.diffWords(original, 'hello there');
str.patch(original, changes);  // 'hello there'
```
