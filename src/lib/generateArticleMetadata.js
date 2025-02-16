export function generateArticleMetadata({ article, path, keywords = [] }) {
  // Remove any trailing slashes and query parameters
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const url = `https://www.abhik.xyz${cleanPath}`;
  const ogImageUrl = `https://og.abhik.xyz/api/og?title=${article.title}&desc=${article.description}&author=${article.author}`;

  // Combine provided keywords with default keywords
  const allKeywords = [...new Set([...(article.keywords || []), ...keywords])];

  return {
    title: article.title,
    description: article.description,
    keywords: allKeywords,
    authors: [{ name: article.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: url,
      siteName: 'Abhik Sarkar',
      locale: 'en_US',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      creator: '@abhiksark',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}