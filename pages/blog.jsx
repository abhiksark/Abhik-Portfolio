// app/blog/page.jsx

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import blogs from '../data/blogs'; // Adjust the import path according to your project structure
import styles from '../styles/Home.module.css';

const POSTS_PER_PAGE = 2; // Set the number of posts per page

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {currentPosts.map(blog => (
          <article key={blog.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Link href={`/blog/${blog.id}`}>
                {blog.title}
              </Link>
            </h2>
            <p className={styles.blogMeta}>
              Posted by {blog.author} on {blog.datePublished} | {blog.categories.join(', ')}
            </p>
            {/* ... rest of the blog content */}
          </article>
        ))}
        <div className={styles.pagination}>
          {[...Array(Math.ceil(blogs.length / POSTS_PER_PAGE)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? styles.activePage : ''}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
