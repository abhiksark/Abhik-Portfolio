export function generateMetadata({ title, description, path = '', ogImage = null }) {
  // Remove any trailing slashes and query parameters
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const url = `https://www.abhik.xyz${cleanPath}`;
  const ogImageUrl = ogImage || `https://og.abhik.xyz/api/og?title=${title}&desc=${description}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'Abhik Sarkar',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
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