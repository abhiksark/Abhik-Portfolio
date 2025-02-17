import { useEffect, useRef } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import SEO from '../../next-seo.config'
import { DefaultSeo } from 'next-seo';
import '@/styles/tailwind.css'
import 'focus-visible'
import { MDXProvider } from '@mdx-js/react'
import Pre from '@/components/Pre'
import { Analytics } from '@vercel/analytics/react'

const components = {
  pre: Pre,
}

function usePrevious(value) {
  let ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)
  const canonicalUrl = `https://www.abhik.xyz${router.asPath.split('?')[0].split('#')[0]}`.replace(/\/$/, '')

  return (
    <>
      <DefaultSeo
        {...SEO}
        canonical={canonicalUrl}
        openGraph={{
          ...SEO.openGraph,
          url: canonicalUrl,
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Abhik Sarkar'
          },
          {
            name: 'application-name',
            content: 'Abhik Sarkar'
          },
          {
            name: 'msapplication-TileColor',
            content: '#2b5797'
          },
          {
            name: 'theme-color',
            content: '#ffffff'
          }
        ]}
      />
      <MDXProvider components={components}>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Analytics />
          <Footer />
        </div>
      </MDXProvider>
    </>
  )
}