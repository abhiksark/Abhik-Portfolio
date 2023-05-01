// SkillsGrid.js
import React from 'react'
import { skillsMap } from '../const'
import styles from '../styles/Home.module.css'

const getSkillColor = (level) => {
  switch (level) {
    case 1:
      return 'rgba(0, 0, 255, 0.8)'
    case 2:
      return 'rgba(255, 0, 0, 0.8)'
    case 3:
      return 'rgba(0, 0, 0, 0.8)'
    default:
      return 'rgba(0, 0, 0, 0.8)'
  }
}

const SkillsGrid = () => {
  return (
    <div className={styles.skillsGrid}>
      {skillsMap.map((skill) => (
        <div key={skill.name} className={styles.skillsGridItem}>
          <skill.Icon
            className={styles.skillsLogo}
            style={{ color: getSkillColor(skill.level) }}
          />
          <p>{skill.name}</p>
        </div>
      ))}
    </div>
  )
}

export default SkillsGrid
