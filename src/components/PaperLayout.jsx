import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import siteMeta from '@/data/siteMeta'

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

export function PaperLayout({ children, meta, previousPathname }) {
  let router = useRouter()

  // Wait for router to be ready
  if (!router.isReady) {
    return null
  }

  // Get the path and ensure it's valid
  const path = router.asPath || ''
  const canonicalUrl = path ? `${siteMeta.siteUrl}${path}` : `${siteMeta.siteUrl}/papers`

  return (
    <>
      <NextSeo
        title={`${meta.title} - Paper Review by Abhik`}
        description={meta.description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: meta.title,
          description: meta.description,
          article: {
            publishedTime: meta.date,
            authors: [meta.author],
            tags: meta.tags || [],
          },
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=${encodeURIComponent(meta.title)}&desc=${encodeURIComponent(meta.description)}`,
              width: 1200,
              height: 600,
              alt: meta.title,
              type: 'image/jpeg',
            }
          ],
          siteName: 'abhik.xyz',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: (meta.tags || []).join(', ')
          },
          {
            name: 'author',
            content: meta.author
          }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
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
            "datePublished": meta.date,
            "dateModified": meta.date,
            "keywords": meta.tags || [],
            "image": `https://og.abhik.xyz/api/og?title=${encodeURIComponent(meta.title)}&desc=${encodeURIComponent(meta.description)}`,
            "isBasedOn": {
              "@type": "ScholarlyArticle",
              "name": meta.title,
              "author": meta.authors?.map(author => ({
                "@type": "Person",
                "name": author
              })),
              "datePublished": meta.year_published?.toString(),
              "url": meta.paper_url
            }
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
                aria-label="Go back to papers"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="relative">
                {/* Paper Context & Tags */}
                <div className="mb-8 sm:mb-12">
                  {/* Posted Date */}
                  <div className="mb-6">
                    <time dateTime={meta.date} className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      <span className="w-3.5 h-3.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                      Posted on {formatDate(meta.date)}
                    </time>
                  </div>

                  {/* Tags */}
                  {meta.tags && meta.tags.length > 0 && (
                    <div className="flex flex-col gap-2 relative z-20">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium flex items-center">
                        <span className="w-3.5 h-3.5 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                          </svg>
                        </span>
                        Topics
                      </span>
                      <div className="flex flex-wrap gap-2 ml-5">
                        {meta.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                              bg-zinc-200/80 text-zinc-900
                              dark:bg-zinc-700/80 dark:text-zinc-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title Section */}
                <div className="mb-8 sm:mb-12">
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl md:text-5xl lg:text-6xl">
                    {meta.title}
                  </h1>
                </div>

                {/* Authors & Paper Info */}
                <div className="mb-8 sm:mb-12 lg:grid lg:grid-cols-4 lg:gap-8">
                  <div className="lg:col-span-3">
                    {meta.description && (
                      <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {meta.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:col-span-1">
                    <div className="flex flex-col space-y-4 text-sm">
                      {meta.authors && (
                        <div className="flex flex-col">
                          <span className="text-zinc-500 dark:text-zinc-400 mb-1 font-medium">Authors</span>
                          <span className="text-zinc-900 dark:text-zinc-100">
                            {meta.authors?.join(', ')}
                          </span>
                        </div>
                      )}
                      {meta.year_published && (
                        <div className="flex flex-col">
                          <span className="text-zinc-500 dark:text-zinc-400 mb-1 font-medium">Published</span>
                          <span className="text-zinc-900 dark:text-zinc-100">
                            {meta.year_published}
                          </span>
                        </div>
                      )}
                      {meta.paper_url && (
                        <div className="flex flex-col">
                          <span className="text-zinc-500 dark:text-zinc-400 mb-1 font-medium">Original Paper</span>
                          <a 
                            href={meta.paper_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-150"
                          >
                            View Paper
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visual Separator */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-200 dark:border-zinc-700/50"></div>
                  </div>
                </div>
              </header>

              <div className="mt-12 prose prose-zinc dark:prose-invert prose-lg prose-headings:font-semibold prose-a:text-teal-500 hover:prose-a:text-teal-600">
                <p className="text-sm italic text-zinc-600 dark:text-zinc-400 !mt-0 !mb-8">
                  Note: These paper reviews are best viewed on web for optimal reading experience.
                </p>
                {children}
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}