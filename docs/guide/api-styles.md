# API Styles

StrKit provides four different API styles to match your coding preferences and project requirements.

## 1. Namespace API

The namespace API provides all methods under the `str` object:

```typescript
import { str } from '@oxog/strkit';

str.camelCase('hello world');
str.isEmail('test@example.com');
str.levenshtein('hello', 'hallo');
```

**Pros:**
- Clear namespace, no naming conflicts
- Easy to discover methods via autocomplete
- Good for projects using multiple utility libraries

**Cons:**
- Slightly more verbose
- Entire namespace is imported (though tree-shaking works)

## 2. Direct Imports

Import only the functions you need:

```typescript
import { camelCase, isEmail, levenshtein } from '@oxog/strkit';

camelCase('hello world');
isEmail('test@example.com');
levenshtein('hello', 'hallo');
```

**Pros:**
- Best tree-shaking - only import what you use
- Shortest syntax
- Explicit about dependencies

**Cons:**
- Potential naming conflicts with other libraries
- More imports to manage

## 3. Chainable API

The `S()` function returns a chainable wrapper:

```typescript
import { S } from '@oxog/strkit';

// Chain multiple operations
const result = S('  hello world  ')
  .trim()
  .camelCase()
  .append('!!')
  .value;  // 'helloWorld!!'

// Methods that return non-strings end the chain
const words = S('hello world').words();  // ['hello', 'world']
const count = S('hello').charCount();    // 5
const valid = S('test@test.com').isEmail();  // true
```

**Pros:**
- Fluent, readable syntax
- Great for complex transformations
- Immutable - each operation returns a new chain

**Cons:**
- Slightly more overhead
- Accessing final value requires `.value`

## 4. Prototype Extensions

Extend the native `String` prototype:

```typescript
import '@oxog/strkit/extend';

// Now all strings have StrKit methods
'hello world'.camelCase();
'test@example.com'.isEmail();
'Hello World'.truncate(8);
```

**Pros:**
- Most natural syntax
- Works on any string
- No imports needed after initial setup

**Cons:**
- Modifies global prototype (can conflict with other libraries)
- Not recommended for libraries
- Some methods renamed to avoid conflicts (e.g., `containsStr` instead of `contains`)

## Choosing an API Style

| Use Case | Recommended Style |
|----------|-------------------|
| Application code | Namespace or Chainable |
| Library development | Direct Imports |
| Quick scripts | Prototype Extensions |
| Complex transformations | Chainable |
| Bundle size critical | Direct Imports |

## Mixing Styles

You can mix styles in the same project:

```typescript
import { str, S, camelCase } from '@oxog/strkit';

// Use direct import for simple cases
const name = camelCase('hello world');

// Use chain for complex transformations
const formatted = S(name).append('!').value;

// Use namespace for discovery
const valid = str.isEmail(email);
```
