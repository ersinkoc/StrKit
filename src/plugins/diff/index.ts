/**
 * Diff Plugin
 * Provides methods for computing differences between strings
 */

import type { DiffResult, DiffOptions } from '../../core/types.js';

/**
 * Character-level diff using Myers algorithm
 * @example diffChars('hello', 'hallo') // [{ type: 'equal', value: 'h' }, { type: 'remove', value: 'e' }, { type: 'add', value: 'a' }, { type: 'equal', value: 'llo' }]
 */
export function diffChars(oldStr: string, newStr: string): DiffResult[] {
  if (oldStr === newStr) {
    return oldStr ? [{ type: 'equal', value: oldStr }] : [];
  }

  if (!oldStr) {
    return newStr ? [{ type: 'add', value: newStr }] : [];
  }

  if (!newStr) {
    return [{ type: 'remove', value: oldStr }];
  }

  return computeDiff([...oldStr], [...newStr]);
}

/**
 * Word-level diff
 * @example diffWords('hello world', 'hello there world') // [{ type: 'equal', value: 'hello ' }, { type: 'add', value: 'there ' }, { type: 'equal', value: 'world' }]
 */
export function diffWords(oldStr: string, newStr: string): DiffResult[] {
  if (oldStr === newStr) {
    return oldStr ? [{ type: 'equal', value: oldStr }] : [];
  }

  // Split into words while preserving whitespace
  const splitIntoWords = (str: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inWord = false;

    for (const char of str) {
      const isSpace = /\s/.test(char);

      if (isSpace) {
        if (inWord) {
          result.push(current);
          current = '';
          inWord = false;
        }
        current += char;
      } else {
        if (!inWord && current) {
          result.push(current);
          current = '';
        }
        current += char;
        inWord = true;
      }
    }

    if (current) {
      result.push(current);
    }

    return result;
  };

  const oldWords = splitIntoWords(oldStr);
  const newWords = splitIntoWords(newStr);

  const diffResult = computeDiff(oldWords, newWords);

  // Merge consecutive tokens back into strings
  return diffResult.map((item) => ({
    type: item.type,
    value: Array.isArray(item.value) ? (item.value as string[]).join('') : item.value,
  }));
}

/**
 * Line-level diff
 * @example diffLines('line1\nline2', 'line1\nline3') // [{ type: 'equal', value: 'line1\n' }, { type: 'remove', value: 'line2' }, { type: 'add', value: 'line3' }]
 */
export function diffLines(oldStr: string, newStr: string): DiffResult[] {
  if (oldStr === newStr) {
    return oldStr ? [{ type: 'equal', value: oldStr }] : [];
  }

  // Split into lines while preserving newlines
  const splitIntoLines = (str: string): string[] => {
    const lines: string[] = [];
    let current = '';

    for (let i = 0; i < str.length; i++) {
      current += str[i];
      if (str[i] === '\n' || i === str.length - 1) {
        lines.push(current);
        current = '';
      }
    }

    return lines;
  };

  const oldLines = splitIntoLines(oldStr);
  const newLines = splitIntoLines(newStr);

  const diffResult = computeDiff(oldLines, newLines);

  // Merge consecutive tokens back into strings
  return diffResult.map((item) => ({
    type: item.type,
    value: Array.isArray(item.value) ? (item.value as string[]).join('') : item.value,
  }));
}

/**
 * Generic diff with configurable granularity
 */
export function diff(oldStr: string, newStr: string, options?: DiffOptions): DiffResult[] {
  const granularity = options?.granularity ?? 'char';

  switch (granularity) {
    case 'word':
      return diffWords(oldStr, newStr);
    case 'line':
      return diffLines(oldStr, newStr);
    case 'char':
    default:
      return diffChars(oldStr, newStr);
  }
}

/**
 * Create a unified diff patch
 * @example createPatch('file.txt', 'old content', 'new content')
 */
export function createPatch(
  fileName: string,
  oldStr: string,
  newStr: string,
  _options?: DiffOptions
): string {
  const oldLines = oldStr.split('\n');
  const newLines = newStr.split('\n');

  const diffResult = computeDiff(oldLines, newLines);

  const hunks: string[] = [];
  let oldLineNum = 1;
  let newLineNum = 1;
  let hunkLines: string[] = [];
  let hunkOldStart = 0;
  let hunkNewStart = 0;
  let hunkOldCount = 0;
  let hunkNewCount = 0;
  let inHunk = false;

  const flushHunk = (): void => {
    if (hunkLines.length > 0) {
      hunks.push(`@@ -${hunkOldStart},${hunkOldCount} +${hunkNewStart},${hunkNewCount} @@`);
      hunks.push(...hunkLines);
      hunkLines = [];
      inHunk = false;
    }
  };

  for (const item of diffResult) {
    const lines = Array.isArray(item.value)
      ? (item.value as string[])
      : [item.value as string];

    for (const line of lines) {
      if (item.type === 'equal') {
        if (inHunk) {
          hunkLines.push(' ' + line);
          hunkOldCount++;
          hunkNewCount++;
        }
        oldLineNum++;
        newLineNum++;
      } else if (item.type === 'remove') {
        if (!inHunk) {
          hunkOldStart = oldLineNum;
          hunkNewStart = newLineNum;
          inHunk = true;
        }
        hunkLines.push('-' + line);
        hunkOldCount++;
        oldLineNum++;
      } else if (item.type === 'add') {
        if (!inHunk) {
          hunkOldStart = oldLineNum;
          hunkNewStart = newLineNum;
          inHunk = true;
        }
        hunkLines.push('+' + line);
        hunkNewCount++;
        newLineNum++;
      }
    }
  }

  flushHunk();

  if (hunks.length === 0) {
    return '';
  }

  const header = [
    `--- a/${fileName}`,
    `+++ b/${fileName}`,
  ];

  return [...header, ...hunks].join('\n');
}

/**
 * Apply a patch to a string
 * @example applyPatch(originalText, patchString)
 */
export function applyPatch(input: string, patch: string): string {
  const lines = input.split('\n');
  const patchLines = patch.split('\n');

  let lineIndex = 0;
  const result: string[] = [];

  for (let i = 0; i < patchLines.length; i++) {
    const patchLine = patchLines[i];
    if (!patchLine) continue;

    // Skip header lines
    if (patchLine.startsWith('---') || patchLine.startsWith('+++')) {
      continue;
    }

    // Parse hunk header
    const hunkMatch = patchLine.match(/@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@/);
    if (hunkMatch) {
      const oldStart = parseInt(hunkMatch[1]!, 10) - 1;

      // Copy lines before the hunk
      while (lineIndex < oldStart) {
        result.push(lines[lineIndex]!);
        lineIndex++;
      }

      continue;
    }

    // Apply patch line
    if (patchLine.startsWith(' ')) {
      result.push(lines[lineIndex]!);
      lineIndex++;
    } else if (patchLine.startsWith('-')) {
      lineIndex++;
    } else if (patchLine.startsWith('+')) {
      result.push(patchLine.slice(1));
    }
  }

  // Copy remaining lines
  while (lineIndex < lines.length) {
    result.push(lines[lineIndex]!);
    lineIndex++;
  }

  return result.join('\n');
}

/**
 * Reverse a patch (swap add and remove)
 */
export function reversePatch(patch: string): string {
  const lines = patch.split('\n');

  return lines
    .map((line) => {
      if (line.startsWith('---')) {
        return line.replace('--- a/', '--- b/');
      }
      if (line.startsWith('+++')) {
        return line.replace('+++ b/', '+++ a/');
      }
      if (line.startsWith('-') && !line.startsWith('---')) {
        return '+' + line.slice(1);
      }
      if (line.startsWith('+') && !line.startsWith('+++')) {
        return '-' + line.slice(1);
      }
      return line;
    })
    .join('\n');
}

/**
 * Compute diff using a simplified Myers algorithm
 */
function computeDiff<T>(oldArr: T[], newArr: T[]): DiffResult[] {
  const n = oldArr.length;
  const m = newArr.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) return [{ type: 'add', value: newArr.join('') }];
  if (m === 0) return [{ type: 'remove', value: oldArr.join('') }];

  // Use LCS-based approach for simplicity
  const lcsMatrix: number[][] = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(0) as number[]);

  // Build LCS matrix
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (oldArr[i - 1] === newArr[j - 1]) {
        lcsMatrix[i]![j] = (lcsMatrix[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        lcsMatrix[i]![j] = Math.max(
          lcsMatrix[i - 1]?.[j] ?? 0,
          lcsMatrix[i]?.[j - 1] ?? 0
        );
      }
    }
  }

  // Backtrack to build diff
  const result: DiffResult[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldArr[i - 1] === newArr[j - 1]) {
      result.unshift({ type: 'equal', value: String(oldArr[i - 1]) });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || (lcsMatrix[i]?.[j - 1] ?? 0) >= (lcsMatrix[i - 1]?.[j] ?? 0))) {
      result.unshift({ type: 'add', value: String(newArr[j - 1]) });
      j--;
    } else if (i > 0) {
      result.unshift({ type: 'remove', value: String(oldArr[i - 1]) });
      i--;
    }
  }

  // Merge consecutive same-type results
  return mergeDiffResults(result);
}

/**
 * Merge consecutive diff results of the same type
 */
function mergeDiffResults(results: DiffResult[]): DiffResult[] {
  if (results.length === 0) return [];

  const merged: DiffResult[] = [];
  let current: DiffResult = { ...results[0]! };

  for (let i = 1; i < results.length; i++) {
    const next = results[i]!;
    if (next.type === current.type) {
      current.value += next.value;
    } else {
      merged.push(current);
      current = { ...next };
    }
  }

  merged.push(current);
  return merged;
}

// Export plugin
export const diffPlugin = {
  name: 'diff',
  version: '1.0.0',
  methods: {
    diff,
    diffChars,
    diffWords,
    diffLines,
    createPatch,
    applyPatch,
    reversePatch,
  },
};
