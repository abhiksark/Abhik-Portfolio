import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'

function RelatedContent({ currentSlug, tags, articles, papers }) {
  // Filter related content based on matching tags
  const relatedPapers = papers
    .filter(paper => paper.slug !== currentSlug && 
      paper.tags?.some(t => tags.includes(t)))
    .slice(0, 3)
  
  const relatedArticles = articles
    .filter(article => article.keywords?.some(k => tags.includes(k)))
    .slice(0, 3)

  if (relatedPapers.length === 0 && relatedArticles.length === 0) return null

  return (
    <div className="mt-8">
      {relatedPapers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Related Papers
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-4">
            {relatedPapers.map((paper) => (
              <li key={paper.slug}>
                <Card.Title href={`/papers/${paper.slug}`} className="text-base">
                  {paper.title}
                </Card.Title>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Related Articles
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-4">
            {relatedArticles.map((article) => (
              <li key={article.slug}>
                <Card.Title href={`/articles/${article.slug}`} className="text-base">
                  {article.title}
                </Card.Title>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Paper({ paper, papers, articles }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/papers/${paper.slug}`}>
          {paper.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={paper.date}
          className="md:hidden"
          decorate
        >
          {formatDate(paper.date)}
        </Card.Eyebrow>
        <Card.Description>{paper.description}</Card.Description>
        <Card.Cta>Read review</Card.Cta>
        <RelatedContent 
          currentSlug={paper.slug}
          tags={paper.tags || []}
          papers={papers}
          articles={articles}
        />
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

export default function Papers({ papers, articles }) {
  const title = "Paper Reviews and Analysis"
  const description = "In-depth reviews of influential papers in machine learning, computer vision, and deep learning. I break down complex research into digestible insights and share my perspective on their practical applications."
  
  // Get all unique tags from papers
  const allTags = [...new Set(papers.flatMap(paper => paper.tags || []))]
  
  // Get all unique research areas
  const researchAreas = allTags.slice(0, 5).join(', ')

  return (
    <>
      <NextSeo
        title="ML Paper Reviews by Abhik - Deep Learning Research Analysis"
        description={`${description} Covering ${researchAreas} and more.`}
        canonical={`${siteMeta.siteUrl}/papers`}
        openGraph={{
          type: 'website',
          url: `${siteMeta.siteUrl}/papers`,
          title: 'ML Paper Reviews by Abhik',
          description: description,
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=Paper Reviews&desc=${encodeURIComponent(description)}`,
              width: 1200,
              height: 600,
              alt: 'ML Paper Reviews by Abhik',
              type: 'image/jpeg',
            }
          ],
          siteName: siteMeta.SITE_NAME,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: allTags.join(', ')
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
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteMeta.siteUrl}/papers`
            },
            "name": "ML Paper Reviews by Abhik",
            "description": description,
            "author": {
              "@type": "Person",
              "name": siteMeta.author.name,
              "url": siteMeta.siteUrl
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": papers.map((paper, index) => ({
                "@type": "ScholarlyArticle",
                "position": index + 1,
                "url": `${siteMeta.siteUrl}/papers/${paper.slug}`,
                "name": paper.title,
                "description": paper.description,
                "datePublished": paper.date,
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
      <SimpleLayout
        title={title}
        intro={description}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {papers.map((paper) => (
              <Paper key={paper.slug} paper={paper} papers={papers} articles={articles} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const papers = await getAllPapers()
  const articles = await getAllArticles()

  return {
    props: {
      papers,
      articles,
    },
  }
}