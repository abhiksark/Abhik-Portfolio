import AOS from 'aos'
import 'aos/dist/aos.css'
import React from 'react'

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

export default AboutMeAnimation
