import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPapers } from '@/lib/getAllPapers'
import { NextSeo } from 'next-seo'
import siteMeta from '@/data/siteMeta'

function Paper({ paper }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="relative z-10 md:col-span-3">
        <div className="mt-2 flex flex-wrap gap-2 mb-4">
          {paper.tags?.map((tag) => (
            <span
              key={tag}
              className="relative inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                !bg-zinc-100 !text-zinc-800 
                dark:!bg-zinc-800 dark:!text-zinc-100
                hover:!bg-zinc-100 dark:hover:!bg-zinc-800
                z-20"
            >
              {tag}
            </span>
          ))}
        </div>
        <Card className="md:col-span-3">
          <Card.Title href={`/papers/${paper.slug}`}>
            {paper.title}
          </Card.Title>
          <Card.Eyebrow decorate>
            {paper.conference} ({paper.year})
          </Card.Eyebrow>
          <Card.Description>{paper.description}</Card.Description>
          <Card.Cta>Read review</Card.Cta>
        </Card>
      </div>
    </article>
  )
}

export default function Papers({ papers }) {
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
        canonical="https://www.abhik.xyz/papers"
        openGraph={{
          type: 'website',
          url: 'https://www.abhik.xyz/papers',
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
          siteName: 'abhik.xyz',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: allTags.join(', ')
          },
          {
            name: 'author',
            content: 'Abhik Sarkar'
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
              "itemListElement": papers.map((paper, index) => ({
                "@type": "ScholarlyArticle",
                "position": index + 1,
                "url": `https://www.abhik.xyz/papers/${paper.slug}`,
                "name": paper.title,
                "description": paper.description,
                "datePublished": paper.date,
                "author": {
                  "@type": "Person",
                  "name": paper.author
                },
                "about": paper.tags,
                "isBasedOn": {
                  "@type": "ScholarlyArticle",
                  "name": paper.title,
                  "author": paper.authors?.map(author => ({
                    "@type": "Person",
                    "name": author
                  })),
                  "datePublished": paper.year_published?.toString()
                }
              }))
            },
            "name": "ML Paper Reviews by Abhik",
            "description": description,
            "author": {
              "@type": "Person",
              "name": "Abhik Sarkar"
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
              <Paper key={paper.slug} paper={paper} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      papers: await getAllPapers(),
    },
  }
}