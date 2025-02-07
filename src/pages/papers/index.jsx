import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Paper({ paper }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline" itemScope itemType="http://schema.org/ScholarlyArticle">
      <Card className="md:col-span-3">
        <Card.Title href={`/papers/${paper.slug}`} itemProp="name">
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
                itemProp="keywords"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Card.Description itemProp="description">{paper.description}</Card.Description>
        <Card.Cta>Read review</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={paper.date}
        className="mt-1 hidden md:block"
        itemProp="datePublished"
      >
        {formatDate(paper.date)}
      </Card.Eyebrow>
      <meta itemProp="author" content={paper.author} />
      <meta itemProp="dateModified" content={paper.date} />
      <meta itemProp="url" content={`${siteMeta.siteUrl}/papers/${paper.slug}`} />
    </article>
  )
}

export default function Papers({ papers }) {
  const router = useRouter();
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

  // FAQ Schema for better search visibility
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What kind of papers do you review?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We review papers in ${researchAreas} and other machine learning topics.`
        }
      },
      {
        "@type": "Question",
        "name": "How often are new paper reviews published?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New paper reviews are published regularly, focusing on the most influential and recent research in machine learning and computer vision."
        }
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
        <link 
          rel="alternate" 
          type="application/json" 
          title="ML Paper Reviews JSON Feed"
          href="/papers/feed.json" 
        />
        <meta name="google-news-tags" content="Machine Learning, Research Papers, AI Technology" />
        <meta name="news_keywords" content={allTags.join(',')} />
        <link rel="preconnect" href="https://og.abhik.xyz" />
      </Head>
      <NextSeo
        title={title}
        titleTemplate="%s | Abhik Sarkar"
        description={`${description} Covering ${researchAreas} and more.`}
        canonical={`${siteMeta.siteUrl}${router.asPath}`}
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
          locale: 'en_US',
          article: {
            authors: [siteMeta.author.name],
            tags: allTags
          }
        }}
        twitter={{
          handle: siteMeta.author.twitter,
          site: siteMeta.author.twitter,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: [...allTags, 'machine learning', 'paper reviews', 'research analysis', 'deep learning', 'AI research', 'ML papers', 'technical analysis'].join(', ')
          },
          {
            name: 'author',
            content: siteMeta.author.name
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          },
          {
            name: 'googlebot',
            content: 'index,follow'
          },
          {
            name: 'googlebot-news',
            content: 'index,follow'
          },
          {
            property: 'article:publisher',
            content: siteMeta.author.twitter
          }
        ]}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: `${siteMeta.siteUrl}/papers`
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
              "url": siteMeta.siteUrl,
              "sameAs": [
                siteMeta.author.twitter,
                siteMeta.author.github,
                siteMeta.author.linkedin
              ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <SimpleLayout
        title={title}
        intro={description}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="mb-8">
            <h1 className="sr-only">ML Paper Reviews and Analysis</h1>
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