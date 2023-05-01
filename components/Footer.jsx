import { socialLinks } from '../const'
import styles from '../styles/Home.module.css'
import React from 'react'

export default function Footer () {
  return (
        <footer className={styles.footer}>
        <ul className={styles.social}>
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </footer>
  )
}
