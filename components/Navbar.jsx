import Link from 'next/link'
import { navbarLinks } from '../const'
import styles from '../styles/Navbar.module.css'
import React from 'react'

function Navbar () {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Abhik Sarkar</h1>
      <nav>
        <ul className={styles.nav}>
          {navbarLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <span className={styles.link}>
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
