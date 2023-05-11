// Importing required modules and components
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ReactMarkdown from 'react-markdown'
import { aboutMe } from '../const'
import styles from '../styles/Home.module.css'
import React from 'react'

// AboutMeAnimation component
const AboutMeAnimation = () => {
  React.useEffect(() => {
    AOS.init({
      once: true, // animate only once
      duration: 1000 // animation duration in milliseconds
    })
  }, [])

  return (
    <div>
      <h1>
        <span
          className="inline md:block"
          data-aos="fade-right"
          data-aos-duration="1000"
          style={{ fontSize: '3rem' }} // Add this line to adjust font size
        >
          Hi <span className={'animate-wave'}>👋🏼</span> I&apos;m Abhik
        </span>
      </h1>
      <p
        data-aos="fade-right"
        data-aos-duration="1000"
        className="md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block md:mt-0 mt-2"
      >
        Welcome to my personal blog
      </p>
    </div>
  )
}

// AboutMeText component
const AboutMeText = () => (
  <div className={styles.aboutMeText}>
    <h2 className={styles.sectionTitle}>About Me</h2>
    <ReactMarkdown>{aboutMe}</ReactMarkdown>
  </div>
)

// ProfilePhoto component
const ProfilePhoto = () => (
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
)

// AboutMe component definition
export default function AboutMe () {
  // Rendered JSX for the AboutMe component
  return (
    <section className={styles.section}>
      {/* AboutMeAnimation component */}
      <AboutMeAnimation />

      {/* AboutMe content */}
      <div className={styles.sectionContent}>
        <div className={styles.aboutMe}>
          {/* AboutMeText component */}
          <AboutMeText />

          {/* ProfilePhoto component */}
          <ProfilePhoto />
        </div>
      </div>
    </section>
  )
}
