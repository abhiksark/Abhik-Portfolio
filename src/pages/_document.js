import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Default OpenGraph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="abhik.xyz" />
        <meta property="og:locale" content="en_US" />
        
        {/* Default Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@abhiksark" />
        <meta name="twitter:creator" content="@abhiksark" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" href="/rss/feed.xml" />
        <link rel="alternate" type="application/feed+json" href="/rss/feed.json" />
        
        {/* Mastodon Verification */}
        <link rel="me" href="https://www.abhik.xyz" />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
        <div style={{ display: 'none' }}>
          <a rel="me" href="https://mastodon.social/@abhiksark">Mastodon</a>
        </div>
      </body>
    </Html>
  )
} 