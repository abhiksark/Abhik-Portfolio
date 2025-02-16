import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'

import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()
  
  if (isRssFeed) {
    return children
  }

  // Get the path and ensure it's valid
  const path = router.asPath || ''
  const canonicalUrl = path ? `${siteMeta.siteUrl}${path}` : `${siteMeta.siteUrl}/articles`
  
  // Generate a more detailed OG image URL with additional parameters
  const ogImageUrl = new URL('https://og.abhik.xyz/api/og')
  ogImageUrl.searchParams.set('title', encodeURIComponent(meta.title))
  ogImageUrl.searchParams.set('desc', encodeURIComponent(meta.description))
  ogImageUrl.searchParams.set('date', encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })))
  if (meta.keywords?.length > 0) {
    ogImageUrl.searchParams.set('tags', encodeURIComponent(meta.keywords.slice(0, 3).join(',')))
  }
  ogImageUrl.searchParams.set('author', encodeURIComponent(meta.author))
  ogImageUrl.searchParams.set('theme', 'dark')

  return (
    <>
      <Head>
        <title>{`${meta.title} - Abhik`}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={(meta.keywords || []).join(', ')} />
        <meta name="author" content={meta.author} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl.toString()} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:site_name" content="www.abhik.xyz" />
        <meta property="article:published_time" content={new Date(meta.date).toISOString()} />
        <meta property="article:author" content={meta.author} />
        <meta property="article:tag" content={(meta.keywords || []).join(', ')} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@abhiksark" />
        <meta name="twitter:creator" content="@abhiksark" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={ogImageUrl.toString()} />
      </Head>

      {/* Keep NextSeo for client-side SEO */}
      <NextSeo
        title={`${meta.title} - Abhik`}
        description={meta.description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: meta.title,
          description: meta.description,
          images: [
            {
              url: ogImageUrl.toString(),
              width: 1200,
              height: 600,
              alt: meta.title,
              type: 'image/jpeg',
            }
          ],
          article: {
            publishedTime: new Date(meta.date).toISOString(),
            authors: [meta.author],
            tags: meta.keywords || [],
          },
          siteName: 'www.abhik.xyz',
        }}
        twitter={{
          handle: '@abhiksark',
          site: '@abhiksark',
          cardType: 'summary_large_image',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "headline": meta.title,
            "description": meta.description,
            "author": {
              "@type": "Person",
              "name": meta.author
            },
            "datePublished": new Date(meta.date).toISOString(),
            "dateModified": new Date(meta.date).toISOString(),
            "image": ogImageUrl.toString(),
            "keywords": meta.keywords || [],
            "publisher": {
              "@type": "Organization",
              "name": "abhik.xyz",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteMeta.siteUrl}/logo.png`
              }
            },
            "wordCount": meta.wordCount,
            "articleBody": meta.articleSnippet
          })
        }}
      />
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-4xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article className="relative">
              <header className="flex flex-col space-y-6 text-center mb-12">
                <div className="flex items-center justify-center space-x-4">
                  <time
                    dateTime={meta.date}
                    className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    <span className="ml-3">{formatDate(meta.date)}</span>
                  </time>
                  {meta.readingTime && (
                    <span className="text-zinc-400 dark:text-zinc-500">
                      · {meta.readingTime} min read
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl md:text-6xl">
                  {meta.title}
                </h1>
                {meta.description && (
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                    {meta.description}
                  </p>
                )}
              </header>
              <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 italic text-center mb-8">
                Note: This article is best viewed on web for optimal reading experience.
              </div>
              <Prose className="mt-8 mx-auto prose-lg">
                {children}
              </Prose>
              {meta.keywords && (
                <div className="mt-16 flex flex-wrap gap-2 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                  {meta.keywords.map((keyword) => (
                    <span 
                      key={keyword}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
