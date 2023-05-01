import React from 'react'
import { skillsMap } from '../const'
import styles from '../styles/Home.module.css'

export const getSkillColor = (level) => {
  const hue = 200 // Blue color hue
  const saturation = 80 // Saturation
  const lightness = 35 + ((level - 1) * 20) // Increasing lightness from 20% to 80%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
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
