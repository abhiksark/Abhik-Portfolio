import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Paper({ paper }) {
  const canonicalUrl = `${siteMeta.siteUrl}/papers/${paper.slug}`.toLowerCase();

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
      <meta itemProp="url" content={canonicalUrl} />
    </article>
  )
}

export function PaperSchema({ paper }) {
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          "name": paper.title,
          "description": paper.description,
          "datePublished": paper.date,
          "author": paper.authors.map(author => ({
            "@type": "Person",
            "name": author
          })),
          "publisher": {
            "@type": "Organization",
            "name": "Abhik's Research Reviews"
          },
          "image": paper.ogImageUrl,
          "isBasedOn": paper.paper_url ? {
            "@type": "ScholarlyArticle",
            "url": paper.paper_url
          } : undefined
        })
      }}
    />
  );
}

export function PaperSEO({ paper }) {
  return (
    <>
      <link rel="canonical" href={`/papers/${paper.slug}`} />
      <meta name="citation_title" content={paper.title} />
      <meta name="citation_author" content={paper.authors?.join('; ')} />
      <meta name="citation_publication_date" content={paper.date} />
      <meta name="citation_journal_title" content={paper.conference} />
      <PaperSchema paper={paper} />
    </>
  );
}

export default function Papers({ papers }) {
  const router = useRouter();
  const title = "ML Paper Reviews and Analysis by Abhik"
  const description = "Expert analysis and in-depth reviews of machine learning research papers. Covering computer vision, deep learning, and AI innovations with practical insights."
  
  // Get all unique tags from papers
  const allTags = [...new Set(papers.flatMap(paper => paper.tags || []))]
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
        titleTemplate="%s | Machine Learning Research"
        description={`${description} Featuring papers on ${researchAreas}.`}
        canonical={`${siteMeta.siteUrl}${router.asPath}`}
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
            content: [
              ...allTags,
              'machine learning paper reviews',
              'AI research analysis',
              'deep learning research breakdowns',
              'academic paper explanations'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl md:text-6xl mb-8">
            ML Paper Reviews and Analysis
          </h1>
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/" className="hover:text-teal-500 dark:hover:text-teal-400">Home</Link>
              </li>
              <li className="text-zinc-300 dark:text-zinc-600">/</li>
              <li className="font-medium text-zinc-900 dark:text-zinc-100" aria-current="page">
                Papers
              </li>
            </ol>
          </nav>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </header>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-8">
            Featured Research Papers
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <Paper key={paper.slug} paper={paper} />
            ))}
          </div>
        </div>
      </div>
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