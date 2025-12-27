# API Reference

StrKit provides 115+ methods across 10 categories.

## Categories

### [Case](/api/case)
Convert between different naming conventions.

```typescript
camelCase, kebabCase, snakeCase, pascalCase, titleCase,
sentenceCase, constantCase, dotCase, pathCase, headerCase,
swapCase, capitalize, decapitalize
```

### [Manipulation](/api/manipulation)
Transform and modify strings.

```typescript
trim, trimStart, trimEnd, pad, padStart, padEnd,
reverse, truncate, wrap, unwrap, insert, remove,
replaceAll, between, before, after, beforeLast, afterLast,
append, prepend, surround, collapseWhitespace, repeat,
lines, words, chars
```

### [Validation](/api/validation)
Validate string formats and content.

```typescript
isEmail, isUrl, isUuid, isIp, isIpv4, isIpv6,
isPhone, isCreditCard, isEmpty, isBlank, isAlpha,
isNumeric, isAlphanumeric, isHex, isBase64, isJson,
isUpperCase, isLowerCase, isAscii, hasWhitespace,
isMacAddress, isPostalCode
```

### [Sanitization](/api/sanitization)
Clean and sanitize strings.

```typescript
escape, unescape, escapeHtml, unescapeHtml, escapeRegex,
slugify, sanitizeFilename, stripHtml, stripTags, clean,
normalize, latinise, transliterate
```

### [Formatting](/api/formatting)
Format and template strings.

```typescript
template, sprintf, mask, unmask, ordinalize,
formatCurrency, formatNumber
```

### [Similarity](/api/similarity)
Compare string similarity.

```typescript
levenshtein, levenshteinRatio, dice, jaroWinkler,
hamming, cosine, similarity
```

### [Analysis](/api/analysis)
Analyze string content.

```typescript
wordCount, charCount, lineCount, sentenceCount,
paragraphCount, byteSize, entropy, frequency,
readingTime, speakingTime
```

### [Pluralization](/api/pluralization)
Handle singular/plural forms.

```typescript
pluralize, singularize, isPlural, isSingular,
addPluralRule, addIrregular, addUncountable
```

### [Diff](/api/diff)
Compare and diff strings.

```typescript
diffChars, diffWords, diffLines, diff, patch
```

### [Search](/api/search)
Search within strings.

```typescript
contains, startsWith, endsWith, indexOf, lastIndexOf,
countOccurrences, positions, match, matchAll,
extract, extractAll
```

## Common Patterns

### Empty String Handling

All methods handle empty strings gracefully:

```typescript
str.camelCase('');      // ''
str.wordCount('');      // 0
str.isEmail('');        // false
```

### Null/Undefined Safety

Methods treat `null` and `undefined` as empty strings:

```typescript
str.trim(null);         // ''
str.truncate(undefined, 10);  // ''
```

### Immutability

All operations return new strings, never mutating the original:

```typescript
const original = 'hello';
const upper = str.toUpperCase(original);
console.log(original);  // 'hello' (unchanged)
console.log(upper);     // 'HELLO'
```
