export function generatePaperMetadata({ paper, path }) {
  // Remove any trailing slashes and query parameters
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const url = `https://www.abhik.xyz${cleanPath}`;
  const ogImageUrl = `https://og.abhik.xyz/api/og?title=${encodeURIComponent(paper.title)}&desc=${encodeURIComponent(paper.description)}`;
  const fullTitle = `${paper.title} - ML Paper Review by Abhik`;

  // Enhanced keywords with LSI terms
  const enhancedKeywords = [
    ...(paper.tags || []),
    'machine learning',
    'paper review',
    'research analysis',
    'deep learning',
    'AI research',
    'ML papers',
    'research papers',
    'paper summary',
    'technical analysis',
    paper.title.toLowerCase(),
    ...(paper.authors?.map(author => author.toLowerCase()) || [])
  ];

  return {
    title: fullTitle,
    description: paper.description,
    keywords: enhancedKeywords,
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
          alt: `Paper Review: ${paper.title}`,
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
      'notranslate': true,
      'max-image-preview': 'large',
      'googlebot': 'index,follow',
      'googlebot-news': 'index,follow'
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION
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
      },
      {
        name: 'citation_journal_title',
        content: 'ML Paper Reviews by Abhik'
      },
      {
        name: 'citation_language',
        content: 'en'
      },
      {
        name: 'news_keywords',
        content: enhancedKeywords.join(', ')
      }
    ]
  };
}