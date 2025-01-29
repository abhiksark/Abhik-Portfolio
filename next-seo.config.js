// SEO Configuration
export default {
  titleTemplate: '%s - Abhik Sarkar',
  defaultTitle: 'Abhik Sarkar - Machine Learning & Computer Vision Expert',
  description: 'Machine Learning Engineer specializing in Computer Vision and Deep Learning. Leading ML teams and building innovative solutions for safety and security.',
  canonical: 'https://www.abhik.xyz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.abhik.xyz',
    siteName: 'Abhik Sarkar',
    images: [
      {
        url: 'https://og.abhik.xyz/api/og?title=Abhik Sarkar&desc=Machine Learning Engineer and Software Developer',
        width: 1200,
        height: 630,
        alt: 'Abhik Sarkar',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@abhiksark',
    site: '@abhiksark',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
  ]
}