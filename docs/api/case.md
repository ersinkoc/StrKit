# Case

Convert between different naming conventions.

## camelCase

Convert to camelCase.

```typescript
camelCase(input: string): string
```

**Example:**
```typescript
str.camelCase('hello world');     // 'helloWorld'
str.camelCase('Hello World');     // 'helloWorld'
str.camelCase('hello-world');     // 'helloWorld'
str.camelCase('hello_world');     // 'helloWorld'
str.camelCase('HelloWorld');      // 'helloWorld'
```

## kebabCase

Convert to kebab-case.

```typescript
kebabCase(input: string): string
```

**Example:**
```typescript
str.kebabCase('helloWorld');      // 'hello-world'
str.kebabCase('Hello World');     // 'hello-world'
str.kebabCase('hello_world');     // 'hello-world'
```

## snakeCase

Convert to snake_case.

```typescript
snakeCase(input: string): string
```

**Example:**
```typescript
str.snakeCase('helloWorld');      // 'hello_world'
str.snakeCase('Hello World');     // 'hello_world'
str.snakeCase('hello-world');     // 'hello_world'
```

## pascalCase

Convert to PascalCase.

```typescript
pascalCase(input: string): string
```

**Example:**
```typescript
str.pascalCase('hello world');    // 'HelloWorld'
str.pascalCase('hello-world');    // 'HelloWorld'
str.pascalCase('helloWorld');     // 'HelloWorld'
```

## titleCase

Convert to Title Case.

```typescript
titleCase(input: string): string
```

**Example:**
```typescript
str.titleCase('hello world');     // 'Hello World'
str.titleCase('helloWorld');      // 'Hello World'
str.titleCase('the quick brown fox');  // 'The Quick Brown Fox'
```

## sentenceCase

Convert to Sentence case.

```typescript
sentenceCase(input: string): string
```

**Example:**
```typescript
str.sentenceCase('hello world');  // 'Hello world'
str.sentenceCase('HELLO WORLD');  // 'Hello world'
```

## constantCase

Convert to CONSTANT_CASE.

```typescript
constantCase(input: string): string
```

**Example:**
```typescript
str.constantCase('hello world');  // 'HELLO_WORLD'
str.constantCase('helloWorld');   // 'HELLO_WORLD'
```

## dotCase

Convert to dot.case.

```typescript
dotCase(input: string): string
```

**Example:**
```typescript
str.dotCase('helloWorld');        // 'hello.world'
str.dotCase('Hello World');       // 'hello.world'
```

## pathCase

Convert to path/case.

```typescript
pathCase(input: string): string
```

**Example:**
```typescript
str.pathCase('helloWorld');       // 'hello/world'
str.pathCase('Hello World');      // 'hello/world'
```

## headerCase

Convert to Header-Case.

```typescript
headerCase(input: string): string
```

**Example:**
```typescript
str.headerCase('hello world');    // 'Hello-World'
str.headerCase('helloWorld');     // 'Hello-World'
```

## swapCase

Swap uppercase and lowercase.

```typescript
swapCase(input: string): string
```

**Example:**
```typescript
str.swapCase('Hello World');      // 'hELLO wORLD'
str.swapCase('hELLO');            // 'Hello'
```

## capitalize

Capitalize the first character.

```typescript
capitalize(input: string): string
```

**Example:**
```typescript
str.capitalize('hello');          // 'Hello'
str.capitalize('hello world');    // 'Hello world'
```

## decapitalize

Lowercase the first character.

```typescript
decapitalize(input: string): string
```

**Example:**
```typescript
str.decapitalize('Hello');        // 'hello'
str.decapitalize('HELLO');        // 'hELLO'
```

## toUpperCase / toLowerCase

Standard case conversion with locale support.

```typescript
toUpperCase(input: string, locale?: string): string
toLowerCase(input: string, locale?: string): string
```

**Example:**
```typescript
str.toUpperCase('hello');         // 'HELLO'
str.toLowerCase('HELLO');         // 'hello'

// Turkish locale
str.toUpperCase('istanbul', 'tr');  // 'İSTANBUL'
str.toLowerCase('ISTANBUL', 'tr');  // 'ıstanbul'
```
