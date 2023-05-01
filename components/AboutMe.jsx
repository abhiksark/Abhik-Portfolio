import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { aboutMe } from '../const'
import styles from '../styles/Home.module.css'
import React from 'react'

import AboutMeAnimation from './AboutMeAnimation'

export default function AboutMe () {
  return (
    <section className={styles.section}>
      <AboutMeAnimation />
      <div className={styles.sectionContent}>
        <div className={styles.aboutMe}>
          <div className={styles.aboutMeText}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <ReactMarkdown>{aboutMe}</ReactMarkdown>
          </div>
          <div className="flex justify-center items-center lg:ml-auto">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden">
              <Image
                src="/my-photo.jpg"
                alt="My Photo"
                width={300}
                height={300}
                quality={100}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
