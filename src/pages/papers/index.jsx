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
  return (
    <>
      <NextSeo
        title="Paper Reviews - Abhik"
        description="Deep dives into influential machine learning and computer vision papers"
        canonical="https://www.abhik.xyz/papers"
        openGraph={{
          url: 'https://www.abhik.xyz/papers',
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=Paper Reviews&desc=Deep dives into influential machine learning papers`,
              width: 1200,
              height: 600,
              alt: 'Paper Reviews',
              type: 'image/jpeg',
            }
          ],
          siteName: 'abhik.xyz',
        }}
      />
      <SimpleLayout
        title="Paper Reviews and Analysis"
        intro="In-depth reviews of influential papers in machine learning, computer vision, and deep learning. I break down complex research into digestible insights and share my perspective on their practical applications."
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