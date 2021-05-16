import React from 'react'
import styles from '../styles/Blog.module.css'

function Blog(title, authorAndDate, description ) {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
            <p className={styles.read}>Read More</p>
        </a>
    )
}

export default Blog
