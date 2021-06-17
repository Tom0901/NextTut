import React from 'react'
import styles from '../styles/Blog.module.css'

function Blog({title, description}) {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p className={styles.read}>Stuff</p>
        </a>
    )
}

export default Blog
