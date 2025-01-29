import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { getAllArticles } from './getAllArticles'

export async function generateRssFeed() {
  let articles = await getAllArticles()
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  let author = {
    name: 'Abhik Sarkar',
    email: 'abhiksark@gmail.com',
    link: 'https://twitter.com/abhiksark'
  }

  let feed = new Feed({
    title: "Abhik Sarkar's Blog",
    description: 'Machine Learning, Computer Vision, and Software Engineering insights',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Abhik Sarkar`,
    author: author,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`
    }
  })

  for (let article of articles) {
    let url = `${siteUrl}/articles/${article.slug}`
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: article.description,
      author: [author],
      date: new Date(article.date),
      image: article.image,
      category: article.tags?.map(tag => ({ name: tag }))
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2()),
    writeFile('./public/rss/feed.json', feed.json1()),
    writeFile('./public/rss/atom.xml', feed.atom1())
  ])
}