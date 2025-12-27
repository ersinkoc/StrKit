import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'StrKit',
  description: 'Zero-dependency string manipulation toolkit for JavaScript/TypeScript',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/ersinkoc/strkit' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'API Styles', link: '/guide/api-styles' },
            { text: 'Internationalization', link: '/guide/i18n' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Plugin System', link: '/guide/plugins' },
            { text: 'Examples', link: '/guide/examples' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Case', link: '/api/case' },
            { text: 'Manipulation', link: '/api/manipulation' },
            { text: 'Validation', link: '/api/validation' },
            { text: 'Sanitization', link: '/api/sanitization' },
            { text: 'Formatting', link: '/api/formatting' },
            { text: 'Similarity', link: '/api/similarity' },
            { text: 'Analysis', link: '/api/analysis' },
            { text: 'Pluralization', link: '/api/pluralization' },
            { text: 'Diff', link: '/api/diff' },
            { text: 'Search', link: '/api/search' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ersinkoc/strkit' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@oxog/strkit' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2024 OXOG',
    },

    search: {
      provider: 'local',
    },
  },
});
