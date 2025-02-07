import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline" itemScope itemType="http://schema.org/BlogPosting">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`} itemProp="headline">
          {article.title}
        </Card.Title>
        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 mb-3 relative z-20" itemProp="keywords">
            {article.keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                  bg-zinc-200/80 text-zinc-900
                  dark:bg-zinc-700/80 dark:text-zinc-100"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
          itemProp="datePublished"
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description itemProp="description">{article.description}</Card.Description>
        <Card.Cta>Read full article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
        itemProp="dateModified"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
      <meta itemProp="author" content={siteMeta.author.name} />
      <meta itemProp="url" content={`${siteMeta.siteUrl}/articles/${article.slug}`} />
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  const router = useRouter();
  const title = "Technical Articles & Tutorials | Machine Learning & Software Engineering"
  const description = "In-depth technical articles and tutorials on machine learning, computer vision, and software engineering. Practical guides, implementation details, and real-world insights from industry experience."

  // Get all unique keywords from articles
  const allKeywords = [...new Set(articles.flatMap(article => article.keywords || []))]
  
  // Get all unique topics
  const topics = allKeywords.slice(0, 5).join(', ')

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
        "name": "Technical Articles",
        "item": `${siteMeta.siteUrl}/articles`
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
        "name": "What topics do you write about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I write about ${topics} and other topics in machine learning, software engineering, and computer vision. My articles focus on practical implementations and real-world applications.`
        }
      },
      {
        "@type": "Question",
        "name": "How technical are the articles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Articles range from beginner-friendly tutorials to advanced technical deep-dives, always focusing on practical implementation details and real-world use cases."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide code examples?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most articles include detailed code examples, implementation guides, and links to working repositories when applicable."
        }
      }
    ]
  }

  // Blog schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Technical Blog by Abhik Sarkar",
    "description": description,
    "keywords": allKeywords,
    "url": `${siteMeta.siteUrl}/articles`,
    "author": {
      "@type": "Person",
      "name": siteMeta.author.name,
      "url": siteMeta.siteUrl
    }
  }

  return (
    <>
      <Head>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Technical Articles RSS Feed"
          href="/articles/feed.xml" 
        />
        <link 
          rel="alternate" 
          type="application/json" 
          title="Technical Articles JSON Feed"
          href="/articles/feed.json" 
        />
        <meta name="google-news-tags" content="Machine Learning, Software Engineering, Technical Tutorials, Programming Guides" />
        <meta name="news_keywords" content={`${allKeywords.join(',')}, technical tutorials, programming guides, software engineering, machine learning`} />
        <link rel="preconnect" href="https://og.abhik.xyz" />
      </Head>
      <NextSeo
        title={title}
        titleTemplate="%s | Abhik Sarkar"
        description={description}
        canonical={`${siteMeta.siteUrl}${router.asPath}`}
        openGraph={{
          type: 'website',
          url: `${siteMeta.siteUrl}/articles`,
          title: title,
          description: description,
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`,
              width: 1200,
              height: 600,
              alt: 'Technical Articles and Tutorials by Abhik Sarkar',
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
          locale: 'en_US',
          article: {
            authors: [siteMeta.author.name],
            tags: [...allKeywords, 'technical tutorials', 'programming guides', 'software engineering']
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
              ...allKeywords,
              'technical tutorials',
              'programming guides',
              'software engineering tutorials',
              'machine learning guides',
              'coding tutorials',
              'development tips',
              'implementation guides',
              'software architecture',
              'best practices',
              'technical deep dives'
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
            href: `${siteMeta.siteUrl}/articles`
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
                "@id": `${siteMeta.siteUrl}/articles`
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
                "numberOfItems": articles.length,
                "itemListElement": articles.map((article, index) => ({
                  "@type": "BlogPosting",
                  "position": index + 1,
                  "url": `${siteMeta.siteUrl}/articles/${article.slug}`,
                  "name": article.title,
                  "headline": article.title,
                  "description": article.description,
                  "datePublished": article.date,
                  "dateModified": article.date,
                  "author": {
                    "@type": "Person",
                    "name": siteMeta.author.name
                  },
                  "keywords": article.keywords,
                  "articleBody": article.description
                }))
              }
            },
            breadcrumbSchema,
            faqSchema,
            blogSchema
          ])
        }}
      />
      <SimpleLayout
        title={title}
        intro={description}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="mb-8">
            <h1 className="sr-only">Technical Articles and Tutorials</h1>
            <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
              Practical guides and tutorials for developers and machine learning engineers.
            </p>
            <div className="mt-4">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Topics covered:</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {allKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium 
                      bg-zinc-200/80 text-zinc-900
                      dark:bg-zinc-700/80 dark:text-zinc-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllArticles()

  return {
    props: {
      articles,
    },
    revalidate: 3600 // Revalidate every hour
  }
}
