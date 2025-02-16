import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  MastodonIcon,
  StackOverflowIcon
} from '@/components/SocialIcons'


import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import  siteMeta, {resume} from '@/data/siteMeta'
import { NextSeo } from 'next-seo';

import MailIcon from '@/components/icons/MailIcon'
import BriefcaseIcon from '@/components/icons/BriefcaseIcon'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Resume() {

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="https://linkedin.com/in/abhiksark" variant="secondary" className="group mt-6 w-full">
               More on LinkedIn 
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}


function TopmateMeeting() {
  return (
    <Link
      href="https://topmate.io/abhiksark"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed z-50 bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-center rounded-full bg-zinc-200 px-3 py-3 hover:px-4 text-zinc-800 shadow-lg transition-all duration-300 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600 border border-zinc-300/50 dark:border-zinc-500/50 hover:shadow-xl"
      aria-label="Schedule Meeting"
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
        <CalendarIcon className="w-full h-full" />
      </div>
      <span className="text-sm sm:text-base font-medium whitespace-nowrap overflow-hidden w-0 group-hover:w-auto group-hover:ml-2 transition-all duration-300">
        Schedule Meeting
      </span>
    </Link>
  );
}

export default function Home({ articles }) {
  return (
    <>
      <NextSeo
        title="Abhik Sarkar - Machine Learning & Computer Vision Expert"
        description={siteMeta.description}
        canonical="https://www.abhik.xyz/"
        openGraph={{
          url: 'https://www.abhik.xyz',
          title: 'Abhik Sarkar - Machine Learning & Computer Vision Expert',
          description: siteMeta.description,
          type: 'website',
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=${siteMeta.title}&desc=${siteMeta.description}`,
              width: 1200,
              height: 600,
              alt: 'Abhik Sarkar - Machine Learning Expert',
              type: 'image/jpeg',
            }
          ],
          siteName: 'abhik.xyz',
          profile: {
            firstName: 'Abhik',
            lastName: 'Sarkar',
            username: 'abhiksark',
            gender: 'male'
          }
        }}
        twitter={{
          handle: '@abhiksark',
          site: '@abhiksark',
          cardType: 'summary_large_image'
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Machine Learning, Computer Vision, Deep Learning, AI, Artificial Intelligence, ML Engineer, Tech Lead'
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
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Abhik Sarkar',
            jobTitle: 'Machine Learning Engineer',
            url: 'https://www.abhik.xyz',
            sameAs: [
              siteMeta.author.twitter,
              siteMeta.author.linkedin,
              siteMeta.author.github,
              siteMeta.author.stackoverflow
            ],
            description: siteMeta.description
          })
        }}
      />
      <Container className="mt-9">
        <div className="max-w-2xl text-lg">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Teaching Machine to be Smart
          </h1>
          <div className="mt-6 prose dark:prose-invert">
            <p className="mb-4">
              I&apos;m Abhik, and I lead the Machine Learning department at a high growth startup focused on computer vision.
            </p>
            <p className="mb-4">
              I blend deep learning and computer vision to craft innovative solutions for safety and security. My role involves team leadership, strategic hiring, and remote collaboration across 11 countries. I&apos;m driven by a passion for innovation and making a meaningful impact through technology.
            </p>
          </div>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={siteMeta.author.twitter}
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href={siteMeta.author.stackoverflow}
              aria-label="View on Stack Overflow"
              icon={StackOverflowIcon}
              rel="me"
            />
            <SocialLink
              href={siteMeta.author.instagram}
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href={siteMeta.author.github}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={siteMeta.author.linkedin}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
      <TopmateMeeting />
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}

export function generateArticleMetadata({ article, path }) {
  return {
    title: `${article.title} | ML Engineering`,
    // Limit title length to 60 chars
    openGraph: {
      title: article.title.length > 50 
        ? article.title.substring(0, 47) + '...'
        : article.title,
      // ... other meta
    }
  }
}
