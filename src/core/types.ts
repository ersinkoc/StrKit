/**
 * Base options interface for most StrKit methods
 */
export interface StrKitOptions {
  /** Locale code for locale-aware operations (e.g., 'en', 'tr', 'de') */
  locale?: string;
  /** Whether the operation is case-sensitive (default: true) */
  caseSensitive?: boolean;
}

/**
 * Options for truncate operations
 */
export interface TruncateOptions extends StrKitOptions {
  /** String to append when truncating (default: '...') */
  ellipsis?: string;
  /** Where to place ellipsis: 'end', 'middle', or 'start' (default: 'end') */
  position?: 'end' | 'middle' | 'start';
}

/**
 * Options for slugify operations
 */
export interface SlugifyOptions extends StrKitOptions {
  /** Separator character (default: '-') */
  separator?: string;
  /** Convert to lowercase (default: true) */
  lowercase?: boolean;
  /** Remove all non-alphanumeric characters (default: false) */
  strict?: boolean;
}

/**
 * Options for template interpolation
 */
export interface TemplateOptions extends StrKitOptions {
  /** Opening delimiter (default: '{{') */
  openDelimiter?: string;
  /** Closing delimiter (default: '}}') */
  closeDelimiter?: string;
}

/**
 * Options for similarity algorithms
 */
export interface SimilarityOptions extends StrKitOptions {
  /** Algorithm to use for similarity calculation */
  algorithm?: 'levenshtein' | 'dice' | 'jaroWinkler' | 'hamming' | 'cosine';
  /** Minimum similarity threshold (0-1) for filtering results */
  threshold?: number;
}

/**
 * Options for diff operations
 */
export interface DiffOptions extends StrKitOptions {
  /** Level of granularity: 'char', 'word', or 'line' */
  granularity?: 'char' | 'word' | 'line';
  /** Ignore whitespace differences (default: false) */
  ignoreWhitespace?: boolean;
}

/**
 * Result of a diff operation
 */
export interface DiffResult {
  /** Type of change: 'equal', 'add', or 'remove' */
  type: 'equal' | 'add' | 'remove';
  /** The text content of this diff segment */
  value: string;
}

/**
 * Result of a similarity match operation
 */
export interface MatchResult {
  /** The matched string */
  match: string;
  /** Similarity score (0-1) */
  score: number;
  /** Index of the match in the candidates array */
  index: number;
}

/**
 * Result of frequency analysis
 */
export interface FrequencyResult {
  [key: string]: number;
}

/**
 * Options for currency formatting
 */
export interface CurrencyOptions {
  /** Locale for number formatting (e.g., 'en-US', 'tr-TR') */
  locale?: string;
  /** ISO 4217 currency code (e.g., 'USD', 'EUR', 'TRY') */
  currency?: string;
  /** Custom currency symbol to use instead of default */
  symbol?: string;
}

/**
 * Options for mask operations
 */
export interface MaskOptions {
  /** Character used in pattern to represent input characters (default: '#') */
  maskChar?: string;
}

/**
 * Options for text analysis
 */
export interface AnalysisOptions {
  /** Ignore spaces in count (default: false) */
  ignoreSpaces?: boolean;
  /** Ignore newlines in count (default: false) */
  ignoreNewlines?: boolean;
}

/**
 * Options for search operations
 */
export interface SearchOptions extends StrKitOptions {
  /** Starting index for search */
  fromIndex?: number;
}

/**
 * A single hunk in a patch
 */
export interface PatchHunk {
  /** Starting line number in old file */
  oldStart: number;
  /** Number of lines from old file */
  oldLines: number;
  /** Starting line number in new file */
  newStart: number;
  /** Number of lines in new file */
  newLines: number;
  /** Lines of the patch */
  lines: string[];
}

/**
 * Result of patch creation
 */
export interface PatchResult {
  /** Array of diff hunks */
  hunks: PatchHunk[];
  /** Original file name */
  oldFileName?: string;
  /** New file name */
  newFileName?: string;
}

/**
 * Locale data structure for internationalization
 */
export interface StrKitLocale {
  /** ISO 639-1 language code */
  code: string;
  /** Human-readable language name */
  name: string;

  /** Case conversion rules */
  case: {
    /** Special uppercase mappings (e.g., Turkish i -> I) */
    upper: Record<string, string>;
    /** Special lowercase mappings (e.g., Turkish I -> i) */
    lower: Record<string, string>;
  };

  /** Pluralization rules */
  plural: {
    /** Pluralization rules as [regex, replacement] pairs */
    rules: Array<[RegExp, string]>;
    /** Irregular singular-plural mappings */
    irregulars: Record<string, string>;
    /** Words that don't change in plural form */
    uncountables: string[];
  };

  /** Character transliteration map */
  transliterate: Record<string, string>;

  /** Number formatting */
  numbers: {
    /** Decimal separator (e.g., '.' or ',') */
    decimal: string;
    /** Thousands separator (e.g., ',' or '.') */
    thousands: string;
  };

  /** Ordinal number formatting */
  ordinals: {
    /** Default ordinal suffix */
    default: string;
    /** Rules for specific numbers or ranges */
    rules: Array<[number | ((n: number) => boolean), string]>;
  };
}

/**
 * Plugin interface for extending StrKit
 */
export interface StrKitPlugin {
  /** Unique plugin name */
  name: string;
  /** Plugin version (semver) */
  version: string;
  /** Methods provided by the plugin */
  methods: Record<string, (...args: unknown[]) => unknown>;
  /** Chain methods for S() API */
  chainMethods?: Record<string, (...args: unknown[]) => unknown>;
  /** Initialization function called when plugin is registered */
  init?: (kernel: StrKitKernel) => void;
  /** Dependencies on other plugins */
  dependencies?: string[];
}

/**
 * Kernel interface for plugin management
 */
export interface StrKitKernel {
  /** Register a new plugin */
  register(plugin: StrKitPlugin): void;
  /** Get a method by path (e.g., 'case.camel') */
  getMethod(path: string): ((...args: unknown[]) => unknown) | undefined;
  /** Get all methods for a plugin */
  getPluginMethods(pluginName: string): Record<string, (...args: unknown[]) => unknown>;
  /** Check if a plugin is registered */
  hasPlugin(name: string): boolean;
  /** Get all registered plugins */
  getPlugins(): StrKitPlugin[];
  /** Get current locale */
  getLocale(): string;
  /** Set current locale */
  setLocale(locale: string): void;
}

/**
 * Configuration for StrKit
 */
export interface StrKitConfig {
  /** Default locale */
  locale: string;
}
