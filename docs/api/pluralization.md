# Pluralization

Handle singular/plural forms.

## pluralize

Convert to plural form.

```typescript
pluralize(input: string, count?: number, showCount?: boolean): string
```

**Example:**
```typescript
str.pluralize('cat');           // 'cats'
str.pluralize('dog', 1);        // 'dog'
str.pluralize('dog', 2);        // 'dogs'
str.pluralize('cat', 5, true);  // '5 cats'
str.pluralize('child');         // 'children'
str.pluralize('person');        // 'people'
```

## singularize

Convert to singular form.

```typescript
singularize(input: string): string
```

**Example:**
```typescript
str.singularize('cats');        // 'cat'
str.singularize('dogs');        // 'dog'
str.singularize('children');    // 'child'
str.singularize('people');      // 'person'
```

## isPlural / isSingular

Check if word is plural or singular.

```typescript
isPlural(input: string): boolean
isSingular(input: string): boolean
```

**Example:**
```typescript
str.isPlural('cats');           // true
str.isPlural('cat');            // false
str.isSingular('cat');          // true
str.isSingular('cats');         // false
```

## addPluralRule

Add custom pluralization rule.

```typescript
addPluralRule(singular: RegExp, plural: string): void
```

**Example:**
```typescript
str.addPluralRule(/^(ox)$/i, '$1en');
str.pluralize('ox');  // 'oxen'
```

## addIrregular

Add irregular plural.

```typescript
addIrregular(singular: string, plural: string): void
```

**Example:**
```typescript
str.addIrregular('goose', 'geese');
str.pluralize('goose');  // 'geese'
```

## addUncountable

Add uncountable word.

```typescript
addUncountable(word: string): void
```

**Example:**
```typescript
str.addUncountable('equipment');
str.pluralize('equipment');  // 'equipment'
```
