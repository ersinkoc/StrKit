/**
 * Similarity Plugin
 * Provides methods for computing string similarity and distance
 */

import type { SimilarityOptions, MatchResult } from '../../core/types.js';
import { createBigrams, tokenize } from '../../core/utils.js';

/**
 * Calculate Levenshtein edit distance
 * @example levenshtein('kitten', 'sitting') // 3
 */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Use two-row optimization for memory efficiency
  let prevRow = new Array<number>(b.length + 1);
  let currRow = new Array<number>(b.length + 1);

  // Initialize first row
  for (let j = 0; j <= b.length; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    currRow[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        (prevRow[j] ?? 0) + 1, // deletion
        (currRow[j - 1] ?? 0) + 1, // insertion
        (prevRow[j - 1] ?? 0) + cost // substitution
      );
    }

    // Swap rows
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[b.length] ?? 0;
}

/**
 * Calculate normalized Levenshtein similarity ratio (0-1)
 * @example levenshteinRatio('kitten', 'sitting') // 0.571...
 */
export function levenshteinRatio(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 && b.length === 0) return 1;

  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;

  const distance = levenshtein(a, b);
  return 1 - distance / maxLen;
}

/**
 * Calculate Dice coefficient (bigram similarity)
 * @example dice('night', 'nacht') // 0.25
 */
export function dice(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;

  const aBigrams = createBigrams(a);
  const bBigrams = createBigrams(b);

  let intersections = 0;
  let totalBigrams = 0;

  for (const [bigram, count] of aBigrams) {
    totalBigrams += count;
    const bCount = bBigrams.get(bigram) ?? 0;
    intersections += Math.min(count, bCount);
  }

  for (const [, count] of bBigrams) {
    totalBigrams += count;
  }

  if (totalBigrams === 0) return 0;

  return (2 * intersections) / totalBigrams;
}

/**
 * Calculate Jaro-Winkler similarity
 * @example jaroWinkler('DWAYNE', 'DUANE') // ~0.84
 */
export function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;

  const matchWindow = Math.floor(Math.max(a.length, b.length) / 2) - 1;
  const aMatches = new Array<boolean>(a.length).fill(false);
  const bMatches = new Array<boolean>(b.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  // Find matches
  for (let i = 0; i < a.length; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, b.length);

    for (let j = start; j < end; j++) {
      if (bMatches[j] || a[i] !== b[j]) continue;
      aMatches[i] = true;
      bMatches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0;

  // Count transpositions
  let k = 0;
  for (let i = 0; i < a.length; i++) {
    if (!aMatches[i]) continue;
    while (!bMatches[k]) k++;
    if (a[i] !== b[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / a.length + matches / b.length + (matches - transpositions / 2) / matches) / 3;

  // Winkler modification - boost for common prefix
  let prefix = 0;
  for (let i = 0; i < Math.min(4, a.length, b.length); i++) {
    if (a[i] === b[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1 - jaro);
}

/**
 * Calculate Hamming distance (for equal-length strings)
 * @example hamming('karolin', 'kathrin') // 3
 */
export function hamming(a: string, b: string): number {
  if (a.length !== b.length) {
    throw new Error('Hamming distance requires strings of equal length');
  }

  let distance = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) distance++;
  }

  return distance;
}

/**
 * Calculate cosine similarity based on word frequency
 * @example cosine('hello world', 'world hello') // 1.0
 */
export function cosine(a: string, b: string): number {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);

  if (tokensA.length === 0 && tokensB.length === 0) return 1;
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  // Build frequency maps
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();

  for (const token of tokensA) {
    freqA.set(token, (freqA.get(token) ?? 0) + 1);
  }

  for (const token of tokensB) {
    freqB.set(token, (freqB.get(token) ?? 0) + 1);
  }

  // Calculate dot product and magnitudes
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  // Get all unique tokens
  const allTokens = new Set([...freqA.keys(), ...freqB.keys()]);

  for (const token of allTokens) {
    const countA = freqA.get(token) ?? 0;
    const countB = freqB.get(token) ?? 0;

    dotProduct += countA * countB;
    magnitudeA += countA * countA;
    magnitudeB += countB * countB;
  }

  const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

  if (magnitude === 0) return 0;

  return dotProduct / magnitude;
}

/**
 * Find the longest common subsequence
 * @example lcs('ABCDGH', 'AEDFHR') // 'ADH'
 */
export function lcs(a: string, b: string): string {
  if (a.length === 0 || b.length === 0) return '';

  // Build LCS table
  const dp: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(0) as number[]);

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i]![j] = (dp[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        dp[i]![j] = Math.max(dp[i - 1]?.[j] ?? 0, dp[i]?.[j - 1] ?? 0);
      }
    }
  }

  // Backtrack to find the actual subsequence
  let result = '';
  let i = a.length;
  let j = b.length;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result = a[i - 1] + result;
      i--;
      j--;
    } else if ((dp[i - 1]?.[j] ?? 0) > (dp[i]?.[j - 1] ?? 0)) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

/**
 * Get the length of the longest common subsequence
 * @example lcsLength('ABCDGH', 'AEDFHR') // 3
 */
export function lcsLength(a: string, b: string): number {
  return lcs(a, b).length;
}

/**
 * Calculate similarity using specified algorithm
 */
export function similarity(a: string, b: string, options?: SimilarityOptions): number {
  const algorithm = options?.algorithm ?? 'levenshtein';

  switch (algorithm) {
    case 'levenshtein':
      return levenshteinRatio(a, b);
    case 'dice':
      return dice(a, b);
    case 'jaroWinkler':
      return jaroWinkler(a, b);
    case 'hamming':
      if (a.length !== b.length) return 0;
      return 1 - hamming(a, b) / a.length;
    case 'cosine':
      return cosine(a, b);
    default:
      return levenshteinRatio(a, b);
  }
}

/**
 * Find the best match from an array of candidates
 * @example bestMatch('hello', ['hallo', 'hullo', 'hey']) // { match: 'hallo', score: 0.8, index: 0 }
 */
export function bestMatch(
  input: string,
  candidates: string[],
  options?: SimilarityOptions
): MatchResult | null {
  if (!candidates || candidates.length === 0) return null;

  let bestScore = -1;
  let bestIndex = -1;
  let bestMatchStr = '';

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (candidate === undefined) continue;

    const score = similarity(input, candidate, options);

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
      bestMatchStr = candidate;
    }
  }

  if (bestIndex === -1) return null;

  const threshold = options?.threshold ?? 0;
  if (bestScore < threshold) return null;

  return {
    match: bestMatchStr,
    score: bestScore,
    index: bestIndex,
  };
}

/**
 * Find all matches above a threshold
 * @example findSimilar('apple', ['apply', 'maple', 'banana'], { threshold: 0.5 })
 */
export function findSimilar(
  input: string,
  candidates: string[],
  options?: SimilarityOptions
): MatchResult[] {
  if (!candidates || candidates.length === 0) return [];

  const threshold = options?.threshold ?? 0;
  const results: MatchResult[] = [];

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (candidate === undefined) continue;

    const score = similarity(input, candidate, options);

    if (score >= threshold) {
      results.push({
        match: candidate,
        score,
        index: i,
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

// Export plugin
export const similarityPlugin = {
  name: 'similarity',
  version: '1.0.0',
  methods: {
    levenshtein,
    levenshteinRatio,
    dice,
    jaroWinkler,
    hamming,
    cosine,
    lcs,
    lcsLength,
    similarity,
    bestMatch,
    findSimilar,
  },
};
