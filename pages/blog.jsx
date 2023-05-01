import Footer from '../components/Footer'
import MyHead from '../components/MyHead'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

import React from 'react'

export default function Home () {
  return (
    <div className={styles.container}>
      <MyHead/>
      <Navbar/>

      <main className={styles.main}>
      </main>

      <Footer />
    </div>
  )
}
