export function generatePaperMetadata({ paper, path }) {
  // Remove any trailing slashes and query parameters
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const url = `https://www.abhik.xyz${cleanPath}`;
  const ogImageUrl = `https://og.abhik.xyz/api/og?title=${paper.title}&desc=${paper.description}`;

  return {
    title: paper.title,
    description: paper.description,
    keywords: paper.tags || [],
    authors: [{ name: paper.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: paper.title,
      description: paper.description,
      url: url,
      siteName: 'Abhik Sarkar',
      locale: 'en_US',
      type: 'article',
      publishedTime: paper.date,
      authors: paper.authors,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: paper.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description: paper.description,
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