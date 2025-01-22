import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCodeTitles from './src/lib/remark-code-title.mjs'
import rehypePresetMinify from 'rehype-preset-minify'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  trailingSlash: true,
  // Ensure proper static generation
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.abhik.xyz',
  },
  poweredByHeader: false,
  // Add static generation configuration
  staticPageGenerationTimeout: 180,
  compiler: {
    removeConsole: false,
  },
  // Configure static generation for SEO
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkCodeTitles],
    rehypePlugins: [rehypePrismPlus, rehypePresetMinify],
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'mdx'],
})
