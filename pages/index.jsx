import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import { projects } from '../const'
import styles from '../styles/Home.module.css'

import React from 'react'

export default function Home () {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>

</h1>

        <AboutMe className={styles.aboutMe} />
        <Skills className={styles.skills} />

        <section className={styles.section} id="projects">
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.sectionContent}>
            {projects.map((proj) => (
              <div key={proj.title} className={styles.project}>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <p>Technologies: {proj.technologies.join(', ')}</p>
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}
