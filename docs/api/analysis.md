# Analysis

Analyze string content.

## wordCount

Count words in a string.

```typescript
wordCount(input: string): number
```

**Example:**
```typescript
str.wordCount('Hello world');           // 2
str.wordCount('Hello, how are you?');   // 4
str.wordCount('');                      // 0
```

## charCount

Count characters (Unicode-aware).

```typescript
charCount(input: string, options?: AnalysisOptions): number

interface AnalysisOptions {
  ignoreSpaces?: boolean;
  ignoreNewlines?: boolean;
}
```

**Example:**
```typescript
str.charCount('Hello');                 // 5
str.charCount('Hello World');           // 11
str.charCount('Hello World', { ignoreSpaces: true });  // 10
str.charCount('👋🌍');                   // 2
```

## lineCount

Count lines.

```typescript
lineCount(input: string): number
```

**Example:**
```typescript
str.lineCount('line1\nline2\nline3');   // 3
str.lineCount('single line');           // 1
```

## sentenceCount

Count sentences.

```typescript
sentenceCount(input: string): number
```

**Example:**
```typescript
str.sentenceCount('Hello. How are you? Fine!');  // 3
```

## paragraphCount

Count paragraphs.

```typescript
paragraphCount(input: string): number
```

**Example:**
```typescript
str.paragraphCount('Para 1\n\nPara 2');  // 2
```

## byteSize

Get UTF-8 byte size.

```typescript
byteSize(input: string): number
```

**Example:**
```typescript
str.byteSize('Hello');   // 5
str.byteSize('ü');       // 2
str.byteSize('你');      // 3
str.byteSize('👋');      // 4
```

## entropy

Calculate Shannon entropy (randomness measure).

```typescript
entropy(input: string): number
```

**Example:**
```typescript
str.entropy('aaaa');     // 0 (no randomness)
str.entropy('abcd');     // 2 (high randomness)
str.entropy('password'); // ~2.75
```

## frequency

Get character or word frequency.

```typescript
frequency(input: string, options?: { type?: 'char' | 'word' }): Record<string, number>
```

**Example:**
```typescript
str.frequency('hello');  // { h: 1, e: 1, l: 2, o: 1 }
str.frequency('hello world hello', { type: 'word' });  // { hello: 2, world: 1 }
```

## readingTime / speakingTime

Estimate reading or speaking time.

```typescript
readingTime(input: string, options?: { wordsPerMinute?: number }): number
speakingTime(input: string, options?: { wordsPerMinute?: number }): number
```

**Example:**
```typescript
str.readingTime(longText);    // Time in minutes (200 wpm default)
str.speakingTime(longText);   // Time in minutes (150 wpm default)
str.readingTime(longText, { wordsPerMinute: 250 });
```
