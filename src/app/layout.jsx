import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.abhik.xyz'),
  title: {
    default: 'Abhik Sarkar - Machine Learning & Computer Vision Expert',
    template: '%s | Abhik Sarkar'
  },
  alternates: {
    canonical: 'https://www.abhik.xyz',
  },
  description: 'Machine Learning Engineer specializing in Computer Vision and Deep Learning. Leading ML teams and building innovative solutions for safety and security.',
  keywords: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'AI', 'Software Engineering'],
  authors: [{ name: 'Abhik Sarkar' }],
  creator: 'Abhik Sarkar',
  publisher: 'Abhik Sarkar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ]
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.abhik.xyz',
    siteName: 'Abhik Sarkar',
    title: 'Abhik Sarkar - Machine Learning & Computer Vision Expert',
    description: 'Machine Learning Engineer specializing in Computer Vision and Deep Learning',
    images: [
      {
        url: 'https://og.abhik.xyz/api/og?title=Abhik Sarkar&desc=Machine Learning Engineer',
        width: 1200,
        height: 630,
        alt: 'Abhik Sarkar'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abhiksark',
    creator: '@abhiksark',
    title: 'Abhik Sarkar - Machine Learning & Computer Vision Expert',
    description: 'Machine Learning Engineer specializing in Computer Vision and Deep Learning',
    images: ['https://og.abhik.xyz/api/og?title=Abhik Sarkar&desc=Machine Learning Engineer']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" />
      </Head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}