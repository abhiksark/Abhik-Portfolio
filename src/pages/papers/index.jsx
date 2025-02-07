import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'

function Paper({ paper }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/papers/${paper.slug}`}>
          {paper.title}
        </Card.Title>
        {paper.tags && paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 mb-3 relative z-20">
            {paper.tags.map((tag) => (
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
        )}
        <Card.Description>{paper.description}</Card.Description>
        <Card.Cta>Read review</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={paper.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(paper.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function Papers({ papers }) {
  const title = "ML Paper Reviews and Analysis"
  const description = "In-depth reviews of influential papers in machine learning, computer vision, and deep learning. Breaking down complex research into digestible insights with practical applications."
  
  // Get all unique tags from papers
  const allTags = [...new Set(papers.flatMap(paper => paper.tags || []))]
  
  // Get all unique research areas
  const researchAreas = allTags.slice(0, 5).join(', ')

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteMeta.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Paper Reviews",
        "item": `${siteMeta.siteUrl}/papers`
      }
    ]
  }

  return (
    <>
      <Head>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="ML Paper Reviews RSS Feed"
          href="/papers/feed.xml" 
        />
      </Head>
      <NextSeo
        title={title}
        titleTemplate="%s | Abhik Sarkar"
        description={`${description} Covering ${researchAreas} and more.`}
        canonical={`${siteMeta.siteUrl}/papers`}
        openGraph={{
          type: 'website',
          url: `${siteMeta.siteUrl}/papers`,
          title: title,
          description: description,
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`,
              width: 1200,
              height: 600,
              alt: title,
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
        }}
        twitter={{
          handle: siteMeta.author.twitter,
          site: siteMeta.author.twitter,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: [...allTags, 'machine learning', 'paper reviews', 'research analysis', 'deep learning'].join(', ')
          },
          {
            name: 'author',
            content: siteMeta.author.name
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteMeta.siteUrl}/papers`
            },
            "name": title,
            "description": description,
            "author": {
              "@type": "Person",
              "name": siteMeta.author.name,
              "url": siteMeta.siteUrl
            },
            "publisher": {
              "@type": "Organization",
              "name": siteMeta.SITE_NAME,
              "logo": {
                "@type": "ImageObject",
                "url": `${siteMeta.siteUrl}/logo.png`
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": papers.length,
              "itemListElement": papers.map((paper, index) => ({
                "@type": "ScholarlyArticle",
                "position": index + 1,
                "url": `${siteMeta.siteUrl}/papers/${paper.slug}`,
                "name": paper.title,
                "headline": paper.title,
                "description": paper.description,
                "datePublished": paper.date,
                "dateModified": paper.date,
                "author": {
                  "@type": "Person",
                  "name": paper.author || siteMeta.author.name
                },
                "keywords": paper.tags,
                "isBasedOn": paper.paper_url ? {
                  "@type": "ScholarlyArticle",
                  "name": paper.title,
                  "author": paper.authors?.map(author => ({
                    "@type": "Person",
                    "name": author
                  })),
                  "datePublished": paper.year_published?.toString(),
                  "url": paper.paper_url
                } : undefined
              }))
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <SimpleLayout
        title={title}
        intro={description}
      >
        <h1 className="sr-only">ML Paper Reviews and Analysis</h1>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="mb-8">
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
              Note: These paper reviews are best viewed on web for optimal reading experience.
            </p>
            <div className="mt-4">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Topics covered:</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags.map((tag) => (
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
          </div>
          <div className="flex max-w-3xl flex-col space-y-16">
            {papers.map((paper) => (
              <Paper key={paper.slug} paper={paper} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const papers = await getAllPapers()

  return {
    props: {
      papers,
    },
    revalidate: 3600 // Revalidate every hour
  }
}