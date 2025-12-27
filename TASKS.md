# @oxog/strkit - Task List

## Overview

Total Tasks: 150+
Dependencies are noted with `depends:` tag.

---

## Phase 1: Project Infrastructure (10 tasks)

### 1.1 Basic Setup

- [ ] **T001**: Create package.json with correct metadata
- [ ] **T002**: Create tsconfig.json with strict mode
- [ ] **T003**: Create tsup.config.ts for bundling
- [ ] **T004**: Create vitest.config.ts for testing
- [ ] **T005**: Create .gitignore file
- [ ] **T006**: Create .npmignore file
- [ ] **T007**: Create LICENSE file (MIT)
- [ ] **T008**: Create initial README.md
- [ ] **T009**: Setup ESLint configuration
- [ ] **T010**: Setup Prettier configuration

---

## Phase 2: Core Infrastructure (15 tasks)

### 2.1 Core Types

- [ ] **T011**: Create src/core/types.ts - Base interfaces
  - StrKitOptions, TruncateOptions, SlugifyOptions
  - TemplateOptions, SimilarityOptions, DiffOptions
  - DiffResult, MatchResult, FrequencyResult
  - CurrencyOptions, MaskOptions, AnalysisOptions
  - SearchOptions, PatchResult, PatchHunk

- [ ] **T012**: Create src/core/types.ts - Plugin interfaces
  - StrKitPlugin, StrKitKernel, StrKitChain

- [ ] **T013**: Create src/core/types.ts - Locale interface
  - StrKitLocale

### 2.2 Core Utilities

- [ ] **T014**: Create src/core/utils.ts - String utilities
  - splitChars(), reverseString(), splitWords()
  - isAscii(), normalizeWhitespace()

`depends: T011`

### 2.3 Locale Manager

- [ ] **T015**: Create src/core/locale.ts - LocaleManager class
  - register(), get(), setLocale(), getLocale()
  - getAvailableLocales()

`depends: T013`

### 2.4 Kernel

- [ ] **T016**: Create src/core/kernel.ts - StrKitKernel class
  - Plugin registration and lifecycle
  - Method resolution
  - Global configuration

`depends: T011, T012`

### 2.5 Chain

- [ ] **T017**: Create src/core/chain.ts - StrKitChainImpl class
  - Immutable wrapper implementation
  - value(), toString(), clone()
  - length, s properties

`depends: T011, T016`

- [ ] **T018**: Add case methods to chain
- [ ] **T019**: Add manipulation methods to chain
- [ ] **T020**: Add validation methods to chain
- [ ] **T021**: Add sanitization methods to chain
- [ ] **T022**: Add formatting methods to chain
- [ ] **T023**: Add similarity methods to chain
- [ ] **T024**: Add analysis methods to chain
- [ ] **T025**: Add pluralization methods to chain

`depends: T017, Phase 3`

---

## Phase 3: Plugin Implementation (80 tasks)

### 3.1 Case Plugin (15 methods)

- [ ] **T026**: Create src/plugins/case/index.ts - Plugin entry
- [ ] **T027**: Implement camel.ts - camelCase()
- [ ] **T028**: Implement kebab.ts - kebabCase()
- [ ] **T029**: Implement snake.ts - snakeCase()
- [ ] **T030**: Implement pascal.ts - pascalCase()
- [ ] **T031**: Implement title.ts - titleCase()
- [ ] **T032**: Implement sentence.ts - sentenceCase()
- [ ] **T033**: Implement constant.ts - constantCase()
- [ ] **T034**: Implement dot.ts - dotCase()
- [ ] **T035**: Implement path.ts - pathCase()
- [ ] **T036**: Implement header.ts - headerCase()
- [ ] **T037**: Implement swap.ts - swapCase()
- [ ] **T038**: Implement upper.ts - toUpper() with locale support
- [ ] **T039**: Implement lower.ts - toLower() with locale support
- [ ] **T040**: Implement capitalize.ts - capitalize(), decapitalize()

`depends: T014, T015`

### 3.2 Manipulation Plugin (27 methods)

- [ ] **T041**: Create src/plugins/manipulation/index.ts - Plugin entry
- [ ] **T042**: Implement trim.ts - trim(), trimStart(), trimEnd()
- [ ] **T043**: Implement pad.ts - pad(), padStart(), padEnd()
- [ ] **T044**: Implement repeat.ts - repeat()
- [ ] **T045**: Implement reverse.ts - reverse() (Unicode-aware)
- [ ] **T046**: Implement truncate.ts - truncate() with options
- [ ] **T047**: Implement wrap.ts - wrap(), unwrap()
- [ ] **T048**: Implement splice.ts - splice()
- [ ] **T049**: Implement insert.ts - insert()
- [ ] **T050**: Implement remove.ts - remove()
- [ ] **T051**: Implement replace.ts - replace(), replaceAll()
- [ ] **T052**: Implement between.ts - between()
- [ ] **T053**: Implement before.ts - before(), beforeLast()
- [ ] **T054**: Implement after.ts - after(), afterLast()
- [ ] **T055**: Implement append.ts - append(), prepend()
- [ ] **T056**: Implement surround.ts - surround()
- [ ] **T057**: Implement collapse.ts - collapseWhitespace()
- [ ] **T058**: Implement split.ts - lines(), words(), chars()

`depends: T014`

### 3.3 Validation Plugin (23 methods)

- [ ] **T059**: Create src/plugins/validation/index.ts - Plugin entry
- [ ] **T060**: Implement email.ts - isEmail()
- [ ] **T061**: Implement url.ts - isUrl()
- [ ] **T062**: Implement uuid.ts - isUuid() with version support
- [ ] **T063**: Implement ip.ts - isIp(), isIpv4(), isIpv6()
- [ ] **T064**: Implement phone.ts - isPhone()
- [ ] **T065**: Implement creditCard.ts - isCreditCard() (Luhn algorithm)
- [ ] **T066**: Implement empty.ts - isEmpty(), isBlank()
- [ ] **T067**: Implement alpha.ts - isAlpha(), isAlphanumeric()
- [ ] **T068**: Implement numeric.ts - isNumeric()
- [ ] **T069**: Implement hex.ts - isHex()
- [ ] **T070**: Implement base64.ts - isBase64()
- [ ] **T071**: Implement json.ts - isJson()
- [ ] **T072**: Implement case-check.ts - isUpperCase(), isLowerCase()
- [ ] **T073**: Implement contains.ts - contains()
- [ ] **T074**: Implement bounds.ts - startsWith(), endsWith()
- [ ] **T075**: Implement equals.ts - equals()
- [ ] **T076**: Implement matches.ts - matches()

`depends: T014`

### 3.4 Sanitization Plugin (13 methods)

- [ ] **T077**: Create src/plugins/sanitization/index.ts - Plugin entry
- [ ] **T078**: Implement escape.ts - escape(), unescape()
- [ ] **T079**: Implement escapeHtml.ts - escapeHtml(), unescapeHtml()
- [ ] **T080**: Implement escapeRegex.ts - escapeRegex()
- [ ] **T081**: Implement slugify.ts - slugify() with locale support
- [ ] **T082**: Implement filename.ts - sanitizeFilename()
- [ ] **T083**: Implement stripHtml.ts - stripHtml(), stripTags()
- [ ] **T084**: Implement clean.ts - clean()
- [ ] **T085**: Implement normalize.ts - normalize()
- [ ] **T086**: Implement latinise.ts - latinise()
- [ ] **T087**: Implement transliterate.ts - transliterate() with locale

`depends: T014, T015`

### 3.5 Formatting Plugin (8 methods)

- [ ] **T088**: Create src/plugins/formatting/index.ts - Plugin entry
- [ ] **T089**: Implement template.ts - template() with nested paths
- [ ] **T090**: Implement sprintf.ts - sprintf() with format specifiers
- [ ] **T091**: Implement mask.ts - mask(), unmask()
- [ ] **T092**: Implement ordinalize.ts - ordinalize() with locale
- [ ] **T093**: Implement currency.ts - formatCurrency() with locale
- [ ] **T094**: Implement number.ts - formatNumber()

`depends: T014, T015`

### 3.6 Similarity Plugin (10 methods)

- [ ] **T095**: Create src/plugins/similarity/index.ts - Plugin entry
- [ ] **T096**: Implement levenshtein.ts - levenshtein(), levenshteinRatio()
- [ ] **T097**: Implement dice.ts - diceCoefficient()
- [ ] **T098**: Implement jaroWinkler.ts - jaroWinkler()
- [ ] **T099**: Implement hamming.ts - hammingDistance()
- [ ] **T100**: Implement cosine.ts - cosineSimilarity()
- [ ] **T101**: Implement lcs.ts - lcs(), lcsLength()
- [ ] **T102**: Implement bestMatch.ts - bestMatch()
- [ ] **T103**: Implement findSimilar.ts - findSimilar()

`depends: T014`

### 3.7 Analysis Plugin (10 methods)

- [ ] **T104**: Create src/plugins/analysis/index.ts - Plugin entry
- [ ] **T105**: Implement wordCount.ts - wordCount()
- [ ] **T106**: Implement charCount.ts - charCount() with options
- [ ] **T107**: Implement lineCount.ts - lineCount()
- [ ] **T108**: Implement sentenceCount.ts - sentenceCount()
- [ ] **T109**: Implement paragraphCount.ts - paragraphCount()
- [ ] **T110**: Implement byteSize.ts - byteSize() (UTF-8)
- [ ] **T111**: Implement entropy.ts - entropy() (Shannon)
- [ ] **T112**: Implement frequency.ts - frequency() char/word
- [ ] **T113**: Implement readingTime.ts - readingTime(), speakingTime()

`depends: T014`

### 3.8 Pluralization Plugin (7 methods)

- [ ] **T114**: Create src/plugins/pluralization/index.ts - Plugin entry
- [ ] **T115**: Implement rules.ts - English pluralization rules
- [ ] **T116**: Implement irregulars.ts - Irregular word mappings
- [ ] **T117**: Implement plural.ts - pluralize()
- [ ] **T118**: Implement singular.ts - singularize()
- [ ] **T119**: Implement checks.ts - isPlural(), isSingular()
- [ ] **T120**: Implement custom.ts - addRule(), addIrregular(), addUncountable()

`depends: T014, T015`

### 3.9 Diff Plugin (7 methods)

- [ ] **T121**: Create src/plugins/diff/index.ts - Plugin entry
- [ ] **T122**: Implement diff.ts - diff() with Myers algorithm
- [ ] **T123**: Implement diffChars.ts - diffChars()
- [ ] **T124**: Implement diffWords.ts - diffWords()
- [ ] **T125**: Implement diffLines.ts - diffLines()
- [ ] **T126**: Implement patch.ts - createPatch()
- [ ] **T127**: Implement apply.ts - applyPatch(), reversePatch()

`depends: T014`

### 3.10 Search Plugin (11 methods)

- [ ] **T128**: Create src/plugins/search/index.ts - Plugin entry
- [ ] **T129**: Implement contains.ts - contains()
- [ ] **T130**: Implement startsWith.ts - startsWith()
- [ ] **T131**: Implement endsWith.ts - endsWith()
- [ ] **T132**: Implement indexOf.ts - indexOf(), lastIndexOf()
- [ ] **T133**: Implement countOccurrences.ts - countOccurrences()
- [ ] **T134**: Implement positions.ts - positions()
- [ ] **T135**: Implement match.ts - match(), matchAll()
- [ ] **T136**: Implement extract.ts - extract(), extractAll()

`depends: T014`

---

## Phase 4: Locale Implementation (14 tasks)

- [ ] **T137**: Create src/locales/index.ts - Locale registry
- [ ] **T138**: Implement src/locales/en.ts - English (default)
- [ ] **T139**: Implement src/locales/tr.ts - Turkish (special i/I handling)
- [ ] **T140**: Implement src/locales/de.ts - German (ß handling)
- [ ] **T141**: Implement src/locales/fr.ts - French
- [ ] **T142**: Implement src/locales/es.ts - Spanish
- [ ] **T143**: Implement src/locales/pt.ts - Portuguese
- [ ] **T144**: Implement src/locales/it.ts - Italian
- [ ] **T145**: Implement src/locales/nl.ts - Dutch
- [ ] **T146**: Implement src/locales/pl.ts - Polish
- [ ] **T147**: Implement src/locales/ru.ts - Russian (Cyrillic)
- [ ] **T148**: Implement src/locales/ar.ts - Arabic (RTL)
- [ ] **T149**: Implement src/locales/zh.ts - Chinese
- [ ] **T150**: Implement src/locales/ja.ts - Japanese
- [ ] **T151**: Implement src/locales/ko.ts - Korean

`depends: T013, T015`

---

## Phase 5: Public API (5 tasks)

- [ ] **T152**: Create src/index.ts - Main entry with all exports
- [ ] **T153**: Create src/namespace.ts - str.* namespace object
- [ ] **T154**: Create src/extend.ts - Prototype extensions
- [ ] **T155**: Update chain.ts with all plugin methods
- [ ] **T156**: Verify tree-shaking works correctly

`depends: Phase 3, Phase 4`

---

## Phase 6: Testing (20 tasks)

### 6.1 Unit Tests - Plugins

- [ ] **T157**: Tests for case plugin (all 15 methods)
- [ ] **T158**: Tests for manipulation plugin (all 27 methods)
- [ ] **T159**: Tests for validation plugin (all 23 methods)
- [ ] **T160**: Tests for sanitization plugin (all 13 methods)
- [ ] **T161**: Tests for formatting plugin (all 8 methods)
- [ ] **T162**: Tests for similarity plugin (all 10 methods)
- [ ] **T163**: Tests for analysis plugin (all 10 methods)
- [ ] **T164**: Tests for pluralization plugin (all 7 methods)
- [ ] **T165**: Tests for diff plugin (all 7 methods)
- [ ] **T166**: Tests for search plugin (all 11 methods)

### 6.2 Unit Tests - Core

- [ ] **T167**: Tests for kernel.ts
- [ ] **T168**: Tests for chain.ts
- [ ] **T169**: Tests for locale.ts
- [ ] **T170**: Tests for utils.ts

### 6.3 Unit Tests - Locales

- [ ] **T171**: Tests for all 14 locales

### 6.4 Integration Tests

- [ ] **T172**: Tests for namespace API (str.*)
- [ ] **T173**: Tests for chain API (S())
- [ ] **T174**: Tests for direct imports
- [ ] **T175**: Tests for prototype extensions

### 6.5 Edge Case Tests

- [ ] **T176**: Tests for empty strings
- [ ] **T177**: Tests for unicode/emoji handling
- [ ] **T178**: Tests for RTL text (Arabic)
- [ ] **T179**: Tests for very long strings

`depends: Phase 5`

---

## Phase 7: Documentation Website (15 tasks)

### 7.1 Website Structure

- [ ] **T180**: Create website/index.html - Landing page
- [ ] **T181**: Create website/docs/index.html - Docs landing
- [ ] **T182**: Create website/docs/getting-started.html
- [ ] **T183**: Create website/assets/css/style.css - Tailwind styles

### 7.2 API Documentation

- [ ] **T184**: Create website/docs/api/case.html
- [ ] **T185**: Create website/docs/api/manipulation.html
- [ ] **T186**: Create website/docs/api/validation.html
- [ ] **T187**: Create website/docs/api/sanitization.html
- [ ] **T188**: Create website/docs/api/formatting.html
- [ ] **T189**: Create website/docs/api/similarity.html
- [ ] **T190**: Create website/docs/api/analysis.html
- [ ] **T191**: Create website/docs/api/pluralization.html
- [ ] **T192**: Create website/docs/api/diff.html
- [ ] **T193**: Create website/docs/api/search.html

### 7.3 Interactive Features

- [ ] **T194**: Create website/docs/playground/index.html

`depends: Phase 5`

---

## Phase 8: Finalization (10 tasks)

- [ ] **T195**: Complete README.md with full documentation
- [ ] **T196**: Create CHANGELOG.md
- [ ] **T197**: Verify 100% test coverage
- [ ] **T198**: Run full test suite - ensure 100% pass
- [ ] **T199**: Build package - verify no errors
- [ ] **T200**: Verify bundle size < 15KB gzipped
- [ ] **T201**: Test all 4 API styles
- [ ] **T202**: Final code review
- [ ] **T203**: Create examples/basic/ demos
- [ ] **T204**: Create examples/advanced/ demos

`depends: Phase 6, Phase 7`

---

## Task Dependencies Summary

```
Phase 1 (T001-T010) → Infrastructure
    ↓
Phase 2 (T011-T025) → Core
    ↓
Phase 3 (T026-T136) → Plugins
    ↓
Phase 4 (T137-T151) → Locales
    ↓
Phase 5 (T152-T156) → Public API
    ↓
Phase 6 (T157-T179) → Testing
    ↓
Phase 7 (T180-T194) → Documentation
    ↓
Phase 8 (T195-T204) → Finalization
```

---

## Priority Order

Execute tasks in this order:

1. **Critical Path**: T001 → T011 → T014 → T026-T040 → T152
   - Basic setup, types, utils, case plugin, public API

2. **Core Functionality**: T041-T136
   - All other plugins

3. **Internationalization**: T137-T151
   - All locales

4. **Quality Assurance**: T157-T179
   - All tests

5. **Documentation**: T180-T194
   - Website

6. **Polish**: T195-T204
   - Final touches
