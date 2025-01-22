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

  return (
    <>
      <NextSeo
        title={`${meta.title} - Paper Review by Abhik`}
        description={meta.description}
        canonical={`${siteMeta.siteUrl}${router.asPath}`}
        openGraph={{
          type: 'article',
          url: `${siteMeta.siteUrl}${router.asPath}`,
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
              "@id": `${siteMeta.siteUrl}${router.asPath}`
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
          <div className="mx-auto max-w-2xl">
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
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {meta.title}
                </h1>
                <div className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meta.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="relative inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          !bg-zinc-100 !text-zinc-800 
                          dark:!bg-zinc-800 dark:!text-zinc-100
                          hover:!bg-zinc-100 dark:hover:!bg-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                  <span>•</span>
                  <span>By {meta.authors?.join(', ')}</span>
                  {meta.paper_url && (
                    <>
                      <span>•</span>
                      <a 
                        href={meta.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-teal-500"
                      >
                        Original Paper
                      </a>
                    </>
                  )}
                </div>
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}