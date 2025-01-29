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
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['og.abhik.xyz'],
    minimumCacheTTL: 60,
    loader: 'default',
    path: '/_next/image'
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.abhik.xyz',
  },
  poweredByHeader: false,
  staticPageGenerationTimeout: 180,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    }
  ]
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