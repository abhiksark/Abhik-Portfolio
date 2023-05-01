import React from 'react'
import { skills } from '../const'
import styles from '../styles/Home.module.css'
// import { getSkillColor } from './utils'
import CustomProgressBar from './CustomProgressBar'

export const getSkillColor = (level) => {
  const hue = 200 // Blue color hue
  const saturation = 80 // Saturation
  const lightness = 35 + ((level - 1) * 20) // Increasing lightness from 20% to 80%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const SkillsProgressBar = () => {
  return (
    <div className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <ul className={styles.skillsList}>
        {skills.map((skill) => (
          <li key={skill.name} className={styles.skillsItem}>
            <div className={styles.skillsItemInfo}>
              <span className={styles.skillsItemName}>{skill.name}</span>
            </div>
            <CustomProgressBar
              now={skill.progress}
              customColor={getSkillColor(skill.level)}
              className={styles.skillsItemProgressBar}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillsProgressBar
