# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-27

### Added

#### Core Features
- Zero-dependency implementation - all algorithms built from scratch
- Micro-kernel plugin architecture with 10 core plugins
- 4 API styles: Namespace, Direct Import, Chainable (S()), Prototype Extension
- Full TypeScript support with strict mode
- Tree-shakeable ESM and CJS builds

#### Case Conversion (14 methods)
- `camelCase`, `kebabCase`, `snakeCase`, `pascalCase`
- `titleCase`, `sentenceCase`, `constantCase`
- `dotCase`, `pathCase`, `headerCase`
- `swapCase`, `upper`, `lower`, `capitalize`, `decapitalize`
- Locale-aware case conversion (Turkish i/I handling)

#### Manipulation (20+ methods)
- `trim`, `trimStart`, `trimEnd`
- `pad`, `padStart`, `padEnd`
- `repeat`, `reverse`, `truncate`
- `wrap`, `unwrap`, `surround`
- `splice`, `insert`, `remove`
- `replace`, `replaceAll`
- `between`, `before`, `after`, `beforeLast`, `afterLast`
- `append`, `prepend`, `collapseWhitespace`
- `lines`, `words`, `chars`

#### Validation (18 methods)
- `isEmail`, `isUrl`, `isUuid`
- `isIp`, `isIpv4`, `isIpv6`
- `isPhone`, `isCreditCard`
- `isEmpty`, `isBlank`
- `isAlpha`, `isNumeric`, `isAlphanumeric`
- `isHex`, `isBase64`, `isJson`
- `isUpperCase`, `isLowerCase`

#### Sanitization (13 methods)
- `escape`, `unescape`
- `escapeHtml`, `unescapeHtml`
- `escapeRegex`
- `slugify` (with locale support)
- `sanitizeFilename`
- `stripHtml`, `stripTags`
- `clean`, `normalize`
- `latinise`, `transliterate`

#### Formatting (8 methods)
- `template` - Mustache-style interpolation with nested property support
- `sprintf` - Printf-style formatting (%s, %d, %f, %x, %o, %b, %c)
- `mask`, `unmask` - Pattern-based masking
- `ordinalize` - Number to ordinal (1st, 2nd, 3rd)
- `formatCurrency` - Locale-aware currency formatting
- `formatNumber` - Number formatting with thousands separator

#### Similarity (10 methods)
- `levenshtein`, `levenshteinRatio` - Edit distance
- `dice` - Dice coefficient
- `jaroWinkler` - Jaro-Winkler similarity
- `hamming` - Hamming distance
- `cosine` - Cosine similarity
- `lcs`, `lcsLength` - Longest Common Subsequence
- `similarity` - Generic similarity with algorithm option
- `bestMatch`, `findSimilar` - Find similar strings

#### Analysis (10 methods)
- `wordCount`, `charCount`, `lineCount`
- `sentenceCount`, `paragraphCount`
- `byteSize` - UTF-8 byte size
- `entropy` - Shannon entropy
- `frequency` - Character/word frequency
- `readingTime`, `speakingTime`

#### Pluralization (7 methods)
- `pluralize`, `singularize`
- `isPlural`, `isSingular`
- `addPluralRule`, `addIrregular`, `addUncountable`
- 200+ built-in irregular plurals

#### Diff (7 methods)
- `diffChars`, `diffWords`, `diffLines`
- `diff` - Generic diff with granularity option
- `createPatch` - Unified diff format
- `applyPatch`, `reversePatch`

#### Search (11 methods)
- `contains`, `startsWith`, `endsWith`
- `indexOf`, `lastIndexOf`
- `countOccurrences`, `positions`
- `match`, `matchAll`
- `extract`, `extractAll`

#### i18n Support
- 14 locales: en, tr, de, fr, es, pt, it, nl, pl, ru, ar, zh, ja, ko
- Per-operation locale override
- Locale-aware case conversion
- Locale-aware slugify
- Transliteration support

#### Documentation
- VitePress documentation site
- Complete API reference
- Getting started guide
- API styles guide
- i18n guide

### Technical Details
- Bundle size: ~37KB minified (ESM)
- 656 unit tests
- 96%+ code coverage
- Node.js >= 16.0.0
- TypeScript >= 5.3.0

[1.0.0]: https://github.com/ersinkoc/strkit/releases/tag/v1.0.0
