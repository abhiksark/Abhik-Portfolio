// app/blog/[id].jsx

"use client";
import React from 'react';
import { useRouter } from 'next/router';
import blogs from '../../data/blogs'; // Adjust the import path according to your project structure
import styles from '../../styles/Home.module.css';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const blog = blogs.find(post => post.id.toString() === id);

  if (!blog) return <div className={styles.container}>Blog not found</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.section}>
          <h1 className={styles.sectionTitle}>{blog.title}</h1>
          {blog.featuredImage && (
            <img src={blog.featuredImage} alt={blog.title} className={styles.featuredImage} />
          )}
          <div className={styles.blogContent}>
            <p>{blog.content}</p>
          </div>
          <div className={styles.blogDetails}>
            <span>Written by {blog.author}</span> | <span>Published on {blog.datePublished}</span>
            {blog.categories && (
              <div className={styles.blogTags}>
                {blog.categories.map(category => (
                  <span key={category} className={styles.blogTag}>{category}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
