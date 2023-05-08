import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

import { suggestedVideos } from '../const'

export default function Home () {
  const [clickedLink, setClickedLink] = useState(null)

  const readingItemsByType = suggestedVideos.reduce((acc, readingItem) => {
    if (!acc[readingItem.type]) {
      acc[readingItem.type] = {}
    }
    if (!acc[readingItem.type][readingItem.subType]) {
      acc[readingItem.type][readingItem.subType] = []
    }
    acc[readingItem.type][readingItem.subType].push(readingItem)
    return acc
  }, {})

  const handleClick = (type, subType, index) => {
    setClickedLink(`${type}_${subType}_${index}`)
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {Object.keys(readingItemsByType).map((type) => (
          <section key={type} className={styles.section}>
            <h2 className={styles.sectionTitle}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            {Object.keys(readingItemsByType[type]).map((subType) => (
              <div key={subType} className={styles.sectionContent}>
                <h3 className={styles.sectionSubTitle}>{subType.charAt(0).toUpperCase() + subType.slice(1)}</h3>
                <ul className={`${styles.publicationsList} list-outside ml-4`}>
                  {readingItemsByType[type][subType].map((readingItem, index) => {
                    const linkKey = `${type}_${subType}_${index}`
                    return (
                      <li key={linkKey} className={styles.publicationsItem} onClick={() => handleClick(type, subType, index)}>
                        <a
                          href={readingItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.publicationsItemTitle} ${
                            clickedLink === linkKey ? styles.activeLink : ''
                          }`}
                        >
                          {readingItem.title.charAt(0).toUpperCase() + readingItem.title.slice(1)}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>

    </div>
  )
}
