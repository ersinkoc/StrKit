# Validation

Validate string formats and content.

## isEmail

Check if string is a valid email address.

```typescript
isEmail(input: string): boolean
```

**Example:**
```typescript
str.isEmail('test@example.com');     // true
str.isEmail('user.name+tag@example.co.uk');  // true
str.isEmail('invalid');              // false
str.isEmail('');                     // false
```

## isUrl

Check if string is a valid URL.

```typescript
isUrl(input: string): boolean
```

**Example:**
```typescript
str.isUrl('https://example.com');    // true
str.isUrl('http://localhost:3000');  // true
str.isUrl('ftp://files.example.com');  // true
str.isUrl('not a url');              // false
```

## isUuid

Check if string is a valid UUID.

```typescript
isUuid(input: string, version?: 1 | 3 | 4 | 5): boolean
```

**Example:**
```typescript
str.isUuid('550e8400-e29b-41d4-a716-446655440000');  // true
str.isUuid('550e8400-e29b-41d4-a716-446655440000', 4);  // true (UUID v4)
str.isUuid('invalid');               // false
```

## isIp / isIpv4 / isIpv6

Check if string is a valid IP address.

```typescript
isIp(input: string): boolean
isIpv4(input: string): boolean
isIpv6(input: string): boolean
```

**Example:**
```typescript
str.isIp('192.168.1.1');            // true
str.isIpv4('192.168.1.1');          // true
str.isIpv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');  // true
str.isIp('::1');                    // true (IPv6 loopback)
```

## isPhone

Check if string is a valid phone number.

```typescript
isPhone(input: string): boolean
```

**Example:**
```typescript
str.isPhone('+1-555-555-5555');     // true
str.isPhone('(555) 555-5555');      // true
str.isPhone('+44 20 7946 0958');    // true
str.isPhone('invalid');             // false
```

## isCreditCard

Check if string is a valid credit card number (Luhn algorithm).

```typescript
isCreditCard(input: string): boolean
```

**Example:**
```typescript
str.isCreditCard('4111111111111111');  // true (Visa test)
str.isCreditCard('5500000000000004');  // true (Mastercard test)
str.isCreditCard('1234567890123456');  // false
```

## isEmpty / isBlank

Check if string is empty or contains only whitespace.

```typescript
isEmpty(input: string): boolean
isBlank(input: string): boolean
```

**Example:**
```typescript
str.isEmpty('');                    // true
str.isEmpty('   ');                 // false
str.isBlank('');                    // true
str.isBlank('   ');                 // true
str.isBlank('\t\n');                // true
```

## isAlpha / isNumeric / isAlphanumeric

Check character composition.

```typescript
isAlpha(input: string): boolean
isNumeric(input: string): boolean
isAlphanumeric(input: string): boolean
```

**Example:**
```typescript
str.isAlpha('hello');               // true
str.isAlpha('hello123');            // false
str.isNumeric('12345');             // true
str.isNumeric('12.34');             // false (no decimals)
str.isAlphanumeric('hello123');     // true
```

## isHex

Check if string is a valid hexadecimal.

```typescript
isHex(input: string): boolean
```

**Example:**
```typescript
str.isHex('ff00ff');                // true
str.isHex('FF00FF');                // true
str.isHex('#ff00ff');               // false (has #)
str.isHex('ghijkl');                // false
```

## isBase64

Check if string is valid Base64.

```typescript
isBase64(input: string): boolean
```

**Example:**
```typescript
str.isBase64('SGVsbG8gV29ybGQ=');   // true
str.isBase64('not base64!');        // false
```

## isJson

Check if string is valid JSON.

```typescript
isJson(input: string): boolean
```

**Example:**
```typescript
str.isJson('{"key": "value"}');     // true
str.isJson('[1, 2, 3]');            // true
str.isJson('{invalid}');            // false
```

## isUpperCase / isLowerCase

Check if string is all uppercase or lowercase.

```typescript
isUpperCase(input: string): boolean
isLowerCase(input: string): boolean
```

**Example:**
```typescript
str.isUpperCase('HELLO');           // true
str.isUpperCase('Hello');           // false
str.isLowerCase('hello');           // true
str.isLowerCase('Hello');           // false
```
