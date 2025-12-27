# Similarity

Compare string similarity using various algorithms.

## levenshtein

Calculate Levenshtein (edit) distance.

```typescript
levenshtein(a: string, b: string): number
```

**Example:**
```typescript
str.levenshtein('hello', 'hallo');  // 1
str.levenshtein('hello', 'hello');  // 0
str.levenshtein('hello', 'world');  // 4
```

## levenshteinRatio

Calculate similarity ratio (0-1) based on Levenshtein distance.

```typescript
levenshteinRatio(a: string, b: string): number
```

**Example:**
```typescript
str.levenshteinRatio('hello', 'hello');  // 1
str.levenshteinRatio('hello', 'hallo');  // 0.8
str.levenshteinRatio('hello', '');       // 0
```

## dice

Calculate Dice coefficient (bigram similarity).

```typescript
dice(a: string, b: string): number
```

**Example:**
```typescript
str.dice('hello', 'hello');         // 1
str.dice('hello', 'hallo');         // 0.5
str.dice('night', 'nacht');         // 0.25
```

## jaroWinkler

Calculate Jaro-Winkler similarity (good for names).

```typescript
jaroWinkler(a: string, b: string): number
```

**Example:**
```typescript
str.jaroWinkler('hello', 'hello');  // 1
str.jaroWinkler('hello', 'hallo');  // 0.88
str.jaroWinkler('MARTHA', 'MARHTA'); // 0.961
```

## hamming

Calculate Hamming distance (strings must be same length).

```typescript
hamming(a: string, b: string): number
```

**Example:**
```typescript
str.hamming('hello', 'hallo');      // 1
str.hamming('hello', 'world');      // 4
str.hamming('abc', 'abc');          // 0
```

## cosine

Calculate cosine similarity (based on word frequency).

```typescript
cosine(a: string, b: string): number
```

**Example:**
```typescript
str.cosine('hello world', 'hello world');  // 1
str.cosine('hello world', 'world hello');  // 1 (order independent)
str.cosine('hello', 'goodbye');            // 0
```

## similarity

Generic similarity with algorithm option.

```typescript
similarity(a: string, b: string, options?: SimilarityOptions): number

interface SimilarityOptions {
  algorithm?: 'levenshtein' | 'dice' | 'jaro' | 'jaroWinkler' | 'hamming' | 'cosine';
}
```

**Example:**
```typescript
str.similarity('hello', 'hallo');                        // Uses levenshteinRatio by default
str.similarity('hello', 'hallo', { algorithm: 'dice' }); // Uses Dice coefficient
```
