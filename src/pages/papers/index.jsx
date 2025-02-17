import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'

function Paper({ paper }) {
  const canonicalUrl = `${siteMeta.siteUrl}/papers/${paper.slug}`.toLowerCase();

  return (
    <article 
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-50 p-6 transition-all duration-300 hover:shadow-lg dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50" 
      itemScope 
      itemType="http://schema.org/ScholarlyArticle"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <time
              dateTime={paper.date}
              className="text-sm text-zinc-600 dark:text-zinc-400"
              itemProp="datePublished"
            >
              {formatDate(paper.date)}
            </time>
          </div>
          
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3" itemProp="name">
            <a href={`/papers/${paper.slug}`} className="hover:text-teal-500 transition">
              {paper.title}
            </a>
          </h3>

          {paper.tags && paper.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    bg-teal-100/80 text-teal-900
                    dark:bg-teal-500/10 dark:text-teal-300"
                  itemProp="keywords"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3" itemProp="description">
            {paper.description}
          </p>
        </div>

        <div className="mt-auto">
          <a
            href={`/papers/${paper.slug}`}
            className="inline-flex items-center text-sm font-medium text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
          >
            Read review
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      
      <meta itemProp="author" content={paper.author} />
      <meta itemProp="dateModified" content={paper.date} />
      <meta itemProp="url" content={canonicalUrl} />
    </article>
  )
}

export default function Papers({ papers }) {
  const title = "ML Paper Reviews and Analysis by Abhik"
  const description = "Expert analysis and in-depth reviews of machine learning research papers. Covering computer vision, deep learning, and AI innovations with practical insights."
  
  // Get all unique tags from papers
  const allTags = [...new Set(papers.flatMap(paper => paper.tags || []))]
  const researchAreas = allTags.slice(0, 5).join(', ') || 'machine learning research' // Fallback for empty state

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

  const pageSchema = {
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
      "@type": "Person",
      "name": siteMeta.author.name,
      "url": siteMeta.siteUrl,
      "sameAs": [
        siteMeta.author.twitter,
        siteMeta.author.github,
        siteMeta.author.linkedin
      ]
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
          key="page-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          key="breadcrumb-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          key="faq-schema"
        />
      </Head>

      <NextSeo
        title={title}
        titleTemplate="%s | Machine Learning Research"
        description={`${description} Featuring papers on ${researchAreas}.`}
        canonical={`${siteMeta.siteUrl}/papers`}
        openGraph={{
          type: 'website',
          url: `${siteMeta.siteUrl}/papers`,
          title: title,
          description: description,
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent("Expert analysis of cutting-edge ML research papers")}`,
              width: 1200,
              height: 600,
              alt: "ML Paper Reviews and Analysis",
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
          locale: 'en_US'
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

      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-7xl">
                <span className="relative whitespace-nowrap">
                  <span className="relative">ML Paper Reviews</span>
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            <div className="mt-16">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {papers.map((paper) => (
                  <Paper key={paper.slug} paper={paper} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const papers = await getAllPapers()

  return {
    props: {
      papers: papers || [],
    },
    revalidate: 3600
  }
}