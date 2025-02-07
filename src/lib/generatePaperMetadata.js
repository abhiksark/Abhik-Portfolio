export function generatePaperMetadata({ paper, path }) {
  // Remove any trailing slashes and query parameters
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const url = `https://www.abhik.xyz${cleanPath}`;
  const ogImageUrl = `https://og.abhik.xyz/api/og?title=${encodeURIComponent(paper.title)}&desc=${encodeURIComponent(paper.description)}`;
  const fullTitle = `${paper.title} - ML Paper Review by Abhik`;

  return {
    title: fullTitle,
    description: paper.description,
    keywords: [...(paper.tags || []), 'machine learning', 'paper review', 'research analysis', 'deep learning'],
    authors: [{ name: paper.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: paper.description,
      url: url,
      siteName: 'Abhik Sarkar',
      locale: 'en_US',
      type: 'article',
      publishedTime: paper.date,
      modifiedTime: paper.date,
      authors: paper.authors,
      section: 'Paper Reviews',
      tags: paper.tags || [],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: paper.title,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: paper.description,
      creator: '@abhiksark',
      site: '@abhiksark',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-image-preview': 'large',
      'notranslate': true
    },
    verification: {
      google: 'YOUR_GOOGLE_VERIFICATION_ID',
      yandex: 'YOUR_YANDEX_VERIFICATION_ID',
      bing: 'YOUR_BING_VERIFICATION_ID'
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: paper.author
      },
      {
        name: 'citation_title',
        content: paper.title
      },
      {
        name: 'citation_author',
        content: paper.authors?.join('; ')
      },
      {
        name: 'citation_publication_date',
        content: paper.year_published?.toString()
      },
      {
        name: 'citation_pdf_url',
        content: paper.paper_url
      },
      {
        name: 'dc.title',
        content: paper.title
      },
      {
        name: 'dc.creator',
        content: paper.author
      },
      {
        name: 'dc.date',
        content: paper.date
      },
      {
        name: 'dc.type',
        content: 'Paper Review'
      },
      {
        property: 'article:published_time',
        content: paper.date
      },
      {
        property: 'article:modified_time',
        content: paper.date
      },
      {
        property: 'article:author',
        content: paper.author
      },
      {
        property: 'article:section',
        content: 'Paper Reviews'
      },
      {
        property: 'article:tag',
        content: paper.tags?.join(', ')
      }
    ]
  };
}