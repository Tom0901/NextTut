import React from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link';

function Blog({title, description, slug}) {
    return (
        <Link href={"/posts/" + slug}>
            <a className={styles.card}>
                <h2>{title}</h2>
                <p>{description}</p>
            </a>
        </Link>
    )
}

export default Blog
