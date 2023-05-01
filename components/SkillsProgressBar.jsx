// SkillsProgressBar.js
import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import { skills } from '../const'
import styles from '../styles/Home.module.css'

const SkillsProgressBar = () => {
  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <ul className={styles.skillsList}>
        {skills.map((skill) => (
          <li key={skill.name} className={styles.skillsItem}>
            <div className={styles.skillsItemInfo}>
              <span className={styles.skillsItemName}>{skill.name}</span>
              <span className={styles.skillsItemProgress}>{skill.progress}%</span>
            </div>
            <ProgressBar
              now={skill.progress}
              className={styles.skillsItemProgressBar}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillsProgressBar
