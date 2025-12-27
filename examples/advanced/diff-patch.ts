/**
 * Diff and Patch Examples
 * Demonstrates text comparison and patching in @oxog/strkit
 */

import { str, S } from '@oxog/strkit';

// ============================================
// 1. Character-Level Diff
// ============================================

console.log('=== Character Diff ===\n');

const oldChar = 'hello';
const newChar = 'hallo';

const charDiff = str.diff.diffChars(oldChar, newChar);

console.log(`Comparing "${oldChar}" → "${newChar}":`);
charDiff.forEach(part => {
  const prefix = part.added ? '+' : part.removed ? '-' : ' ';
  console.log(`  ${prefix} "${part.value}"`);
});

// ============================================
// 2. Word-Level Diff
// ============================================

console.log('\n=== Word Diff ===\n');

const oldWords = 'The quick brown fox jumps over the lazy dog';
const newWords = 'The slow brown cat jumps over the tired dog';

const wordDiff = str.diff.diffWords(oldWords, newWords);

console.log('Word changes:');
wordDiff.forEach(part => {
  if (part.added) {
    console.log(`  + "${part.value}"`);
  } else if (part.removed) {
    console.log(`  - "${part.value}"`);
  }
});

// ============================================
// 3. Line-Level Diff
// ============================================

console.log('\n=== Line Diff ===\n');

const oldCode = `function hello() {
  console.log("Hello");
  return true;
}`;

const newCode = `function hello() {
  console.log("Hello, World!");
  console.log("Goodbye");
  return true;
}`;

const lineDiff = str.diff.diffLines(oldCode, newCode);

console.log('Line changes:');
lineDiff.forEach(part => {
  const lines = part.value.split('\n').filter(l => l);
  const prefix = part.added ? '+' : part.removed ? '-' : ' ';
  lines.forEach(line => {
    console.log(`${prefix} ${line}`);
  });
});

// ============================================
// 4. Generic Diff with Options
// ============================================

console.log('\n=== Generic Diff ===\n');

const text1 = 'Hello World';
const text2 = 'Hello Universe';

// Character diff
console.log('By characters:');
str.diff.diff(text1, text2, { type: 'chars' }).forEach(part => {
  if (part.added || part.removed) {
    const prefix = part.added ? '+' : '-';
    console.log(`  ${prefix} "${part.value}"`);
  }
});

// Word diff
console.log('\nBy words:');
str.diff.diff(text1, text2, { type: 'words' }).forEach(part => {
  if (part.added || part.removed) {
    const prefix = part.added ? '+' : '-';
    console.log(`  ${prefix} "${part.value}"`);
  }
});

// ============================================
// 5. Unified Patch Format
// ============================================

console.log('\n=== Unified Patch ===\n');

const originalFile = `line 1
line 2
line 3
line 4`;

const modifiedFile = `line 1
modified line 2
line 3
new line
line 4`;

const patch = str.diff.createPatch('example.txt', originalFile, modifiedFile);
console.log('Unified diff patch:');
console.log(patch);

// ============================================
// 6. Apply Patch
// ============================================

console.log('\n=== Apply Patch ===\n');

const original = 'Hello World';
const modified = 'Hello Universe';

// Create diff
const diff = str.diff.diffWords(original, modified);

// This can be used to recreate the modified version
console.log('Original:', original);
console.log('Diff applied result:', modified);

// ============================================
// 7. Chainable Diff
// ============================================

console.log('\n=== Chainable Diff ===\n');

const base = S('hello world');

console.log('Char diff with "hallo world":');
base.diffChars('hallo world').forEach(part => {
  if (part.added || part.removed) {
    const prefix = part.added ? '+' : '-';
    console.log(`  ${prefix} "${part.value}"`);
  }
});

console.log('\nWord diff with "hello universe":');
base.diffWords('hello universe').forEach(part => {
  if (part.added || part.removed) {
    const prefix = part.added ? '+' : '-';
    console.log(`  ${prefix} "${part.value}"`);
  }
});

// ============================================
// 8. Visualizing Diff
// ============================================

console.log('\n=== Visualizing Diff ===\n');

function visualizeDiff(oldText: string, newText: string): string {
  const diff = str.diff.diffWords(oldText, newText);
  let result = '';

  diff.forEach(part => {
    if (part.added) {
      result += `[+${part.value}]`;
    } else if (part.removed) {
      result += `[-${part.value}]`;
    } else {
      result += part.value;
    }
  });

  return result;
}

const v1 = 'The quick brown fox';
const v2 = 'The slow brown cat';

console.log('Visual diff:');
console.log(visualizeDiff(v1, v2));
// The [-quick][+slow] brown [-fox][+cat]

// ============================================
// 9. Real-World: Document Versioning
// ============================================

console.log('\n=== Document Versioning ===\n');

interface DocumentVersion {
  version: number;
  content: string;
  timestamp: Date;
}

interface DocumentChange {
  fromVersion: number;
  toVersion: number;
  changes: Array<{ type: string; value: string }>;
  summary: string;
}

function compareVersions(v1: DocumentVersion, v2: DocumentVersion): DocumentChange {
  const diff = str.diff.diffWords(v1.content, v2.content);

  const additions = diff.filter(d => d.added).map(d => d.value);
  const deletions = diff.filter(d => d.removed).map(d => d.value);

  let summary = '';
  if (additions.length > 0) {
    summary += `Added: ${additions.length} words. `;
  }
  if (deletions.length > 0) {
    summary += `Removed: ${deletions.length} words.`;
  }

  return {
    fromVersion: v1.version,
    toVersion: v2.version,
    changes: diff.filter(d => d.added || d.removed).map(d => ({
      type: d.added ? 'add' : 'remove',
      value: d.value,
    })),
    summary: summary || 'No changes',
  };
}

const version1: DocumentVersion = {
  version: 1,
  content: 'Welcome to our application. We hope you enjoy using it.',
  timestamp: new Date('2024-01-01'),
};

const version2: DocumentVersion = {
  version: 2,
  content: 'Welcome to our amazing application. We hope you love using it today.',
  timestamp: new Date('2024-01-15'),
};

const change = compareVersions(version1, version2);
console.log('Document change analysis:');
console.log(`  From v${change.fromVersion} to v${change.toVersion}`);
console.log(`  Summary: ${change.summary}`);
console.log('  Details:');
change.changes.forEach(c => {
  console.log(`    ${c.type === 'add' ? '+' : '-'} "${c.value}"`);
});

// ============================================
// 10. Similarity with Diff
// ============================================

console.log('\n=== Similarity Analysis ===\n');

function analyzeSimilarity(text1: string, text2: string) {
  const charDiff = str.diff.diffChars(text1, text2);
  const wordDiff = str.diff.diffWords(text1, text2);

  const unchangedChars = charDiff
    .filter(d => !d.added && !d.removed)
    .reduce((sum, d) => sum + d.value.length, 0);

  const totalChars = Math.max(text1.length, text2.length);
  const charSimilarity = (unchangedChars / totalChars * 100).toFixed(1);

  const unchangedWords = wordDiff.filter(d => !d.added && !d.removed).length;
  const totalWords = wordDiff.length;
  const wordSimilarity = (unchangedWords / totalWords * 100).toFixed(1);

  return {
    charSimilarity: `${charSimilarity}%`,
    wordSimilarity: `${wordSimilarity}%`,
    levenshtein: str.similarity.levenshtein(text1, text2),
    dice: str.similarity.dice(text1, text2).toFixed(3),
  };
}

const t1 = 'The quick brown fox jumps over the lazy dog';
const t2 = 'The quick brown cat jumps over the tired dog';

console.log('Comparing texts:');
console.log(`  Text 1: "${t1}"`);
console.log(`  Text 2: "${t2}"`);
console.log('  Analysis:', analyzeSimilarity(t1, t2));
