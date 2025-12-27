/// <reference types="vite/client" />

declare module '*.css' {
  const content: string
  export default content
}

declare module '/dist/index.mjs' {
  export const str: {
    case: Record<string, (...args: unknown[]) => unknown>
    validate: Record<string, (...args: unknown[]) => unknown>
    manipulation: Record<string, (...args: unknown[]) => unknown>
    similarity: Record<string, (...args: unknown[]) => unknown>
    sanitize: Record<string, (...args: unknown[]) => unknown>
    format: Record<string, (...args: unknown[]) => unknown>
    analysis: Record<string, (...args: unknown[]) => unknown>
    plural: Record<string, (...args: unknown[]) => unknown>
    diff: Record<string, (...args: unknown[]) => unknown>
    search: Record<string, (...args: unknown[]) => unknown>
  }
  export const S: (input: string) => {
    trim: () => ReturnType<typeof S>
    camelCase: () => ReturnType<typeof S>
    kebabCase: () => ReturnType<typeof S>
    snakeCase: () => ReturnType<typeof S>
    pascalCase: () => ReturnType<typeof S>
    titleCase: () => ReturnType<typeof S>
    truncate: (length: number) => ReturnType<typeof S>
    upper: () => ReturnType<typeof S>
    lower: () => ReturnType<typeof S>
    value: string
  }
}
