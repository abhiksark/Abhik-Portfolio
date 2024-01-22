import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import  siteMeta from '@/data/siteMeta'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event }) {
  return (
    <Card as="article">
      <Card.Title as="h3">
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      {/* <Card.Cta>{cta}</Card.Cta> */}
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
    <NextSeo
      title="Speaking - Abhik"
      description={siteMeta.description}
      canonical="https://abhik.xyz/speaking"
      openGraph={{
        url: 'https://abhik.xyz/speaking',
        images: [
          {
            url: `https://og.brian.dev/api/og?title=Speaking&desc=I’ve spoken at events all around the world and been interviewed for many podcasts.`,
            width: 1200,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          }
        ],
        siteName: 'abhik.xyz',
      }}
    />
      <SimpleLayout
        title="I’ve spoken at some events want to expand more."
        intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
      >
        <div className="space-y-20">
          <SpeakingSection title="Conferences">
          <Appearance
              title="The Age of Digital Da Vinci: All About Image Generation"
              description="Under Machine Learning and Data Science Track: Evolution of Image Generation Encoder Decoder, VAEs, GANs, and Stable Diffusion."
              event="Devfest 2023"
            />
            <Appearance
              title="Speeding up Python with Cython"
              description="Under Machine Learning and Data Science Track: Basics of Cython, how to speed up Python codr, how it helps in Preprocessing and Postprocessing of data with Object Detection."
              event="Devfest 2022"
            />
            <Appearance
              title="Introduction to Machine Learning"
              description="As a guest speaker, I gave a talk on Introduction to Machine Learning and how it is used in the real world."
              event="KJ Somaiya, Mumbai Techfest  2019"
            />

          </SpeakingSection>
          
        </div>
      </SimpleLayout>
    </>
  )
}
