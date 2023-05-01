// Skills.js
import styles from '../styles/Home.module.css'
import SkillsGrid from './SkillsGrid'
import React from 'react'

const Skills = () => {
  return (
    <section className={styles.section}>
      {/* <SkillsProgressBar /> */}

      <div className={styles.line}></div> {/* Vertical line */}

      <SkillsGrid />
    </section>
  )
}

export default Skills
