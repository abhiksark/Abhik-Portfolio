import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  const title = "Articles & Technical Blog Posts"
  const description = "Deep dives into machine learning, computer vision, and software engineering. I write about technical concepts, implementation details, and practical insights from my work."

  // Get all unique keywords from articles
  const allKeywords = [...new Set(articles.flatMap(article => article.keywords || []))]
  
  // Get all unique topics
  const topics = allKeywords.slice(0, 5).join(', ')

  return (
    <>
      <NextSeo
        title="Technical Articles by Abhik - ML & Software Engineering Blog"
        description={`${description} Covering ${topics} and more.`}
        canonical={`${siteMeta.siteUrl}/articles`}
        openGraph={{
          type: 'website',
          url: `${siteMeta.siteUrl}/articles`,
          title: 'Technical Articles by Abhik',
          description: description,
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=Articles&desc=${encodeURIComponent(description)}`,
              width: 1200,
              height: 600,
              alt: 'Technical Articles by Abhik',
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
        }}
        twitter={{
          handle: '@abhiksark',
          site: '@abhiksark',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: allKeywords.join(', ')
          },
          {
            name: 'author',
            content: siteMeta.author.name
          }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": articles.map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${siteMeta.siteUrl}/articles/${article.slug}`,
                "name": article.title,
                "description": article.description,
                "datePublished": article.date
              }))
            },
            "name": "Technical Articles by Abhik",
            "description": description,
            "author": {
              "@type": "Person",
              "name": siteMeta.author.name
            }
          })
        }}
      />
      <SimpleLayout
        title={title}
        intro={description}
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl md:text-6xl mb-8">
          Articles & Technical Blog Posts
        </h1>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
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
  }
}
