import PropTypes from 'prop-types'
import { Analytics } from '@vercel/analytics/react'

import '../styles/globals.css'

import React from 'react'
import Footer from '../components/Footer'
import MyHead from '../components/MyHead'
import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <MyHead/>
      <Navbar/>
      <Component {...pageProps} />
      <Analytics />
      <Footer/>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
