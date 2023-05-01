import PropTypes from 'prop-types'
import { Analytics } from '@vercel/analytics/react'

import '../styles/globals.css'

import React from 'react'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
