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
          <div className="flex flex-wrap gap-2 mt-2 mb-3 relative z-20" itemProp="keywords">
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
        <Card.Description itemProp="abstract">{paper.description}</Card.Description>
        <Card.Cta>Read detailed analysis</Card.Cta>
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
      {paper.paper_url && <meta itemProp="sameAs" content={paper.paper_url} />}
      {paper.doi && <meta itemProp="doi" content={paper.doi} />}
    </article>
  )
}

export default function Papers({ papers }) {
  const router = useRouter();
  const title = "Machine Learning Paper Reviews & Analysis | Research Insights"
  const description = "Expert analysis of cutting-edge machine learning papers, covering deep learning, computer vision, and AI research. Detailed technical reviews with practical implementations and code examples."
  
  // Get all unique tags from papers
  const allTags = [...new Set(papers.flatMap(paper => paper.tags || []))]
  
  // Get all unique research areas
  const researchAreas = allTags.slice(0, 5).join(', ')

  // Enhanced breadcrumb schema
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
        "name": "Research Paper Reviews",
        "item": `${siteMeta.siteUrl}/papers`
      }
    ]
  }

  // Enhanced FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of machine learning papers do you review?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We provide in-depth analysis of papers in ${researchAreas} and other cutting-edge machine learning topics, focusing on practical implementations and real-world applications.`
        }
      },
      {
        "@type": "Question",
        "name": "How detailed are the paper reviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each review includes comprehensive technical analysis, implementation details, code examples, and practical insights for applying the research in real-world scenarios."
        }
      },
      {
        "@type": "Question",
        "name": "How often are new paper reviews published?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New paper reviews are published regularly, focusing on breakthrough research in machine learning, deep learning, and artificial intelligence. Subscribe to our RSS feed for updates."
        }
      }
    ]
  }

  // Research topics schema
  const researchTopicsSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Machine Learning Research Papers Collection",
    "description": `Comprehensive collection of research paper reviews in ${researchAreas}`,
    "keywords": allTags,
    "creator": {
      "@type": "Person",
      "name": siteMeta.author.name
    },
    "license": "https://creativecommons.org/licenses/by/4.0/"
  }

  return (
    <>
      <Head>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Machine Learning Paper Reviews RSS Feed"
          href="/papers/feed.xml" 
        />
        <link 
          rel="alternate" 
          type="application/json" 
          title="Machine Learning Paper Reviews JSON Feed"
          href="/papers/feed.json" 
        />
        <meta name="google-news-tags" content="Machine Learning Research, AI Papers, Deep Learning Analysis, Computer Vision Research" />
        <meta name="news_keywords" content={`${allTags.join(',')}, machine learning research, AI papers, deep learning analysis`} />
        <link rel="preconnect" href="https://og.abhik.xyz" />
      </Head>
      <NextSeo
        title={title}
        titleTemplate="%s | Abhik Sarkar"
        description={description}
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
              alt: 'Machine Learning Paper Reviews and Analysis',
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
          locale: 'en_US',
          article: {
            authors: [siteMeta.author.name],
            tags: [...allTags, 'machine learning research', 'AI papers', 'deep learning']
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
            content: [
              ...allTags, 
              'machine learning papers',
              'AI research analysis',
              'deep learning papers',
              'computer vision research',
              'ML paper reviews',
              'technical paper analysis',
              'research implementation',
              'AI paper summaries',
              'machine learning insights'
            ].join(', ')
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
          __html: JSON.stringify([
            {
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
                    "url": paper.paper_url,
                    "doi": paper.doi
                  } : undefined
                }))
              }
            },
            breadcrumbSchema,
            faqSchema,
            researchTopicsSchema
          ])
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