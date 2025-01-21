import glob from 'fast-glob'
import * as path from 'path'
import { readFile } from 'fs/promises'

async function importPaper(paperFilename) {
  const { meta } = await import(`../pages/papers/${paperFilename}`)
  return {
    slug: paperFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
  }
}

export async function getAllPapers() {
  const paperFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/papers'),
  })

  const papers = await Promise.all(paperFilenames.map(importPaper))

  return papers.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    return new Date(b.date) - new Date(a.date)
  })
}