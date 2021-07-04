import React from 'react'
import styles from '../styles/Header.module.css'
import Link from 'next/link';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.btnContainer}>
                <Link href="/">
                    <a className={styles.lnk}>
                        <button className={styles.btn}>
                            DEV.IO
                        </button>
                    </a>
                </Link>
            </div>
            <Link href="/">
                <a className={styles.lnk}>
                    Home
                </a>
            </Link>
            <Link href="/about">
                <a className={styles.lnk}>
                    About
                </a>
            </Link>
        </header>
    )
}

export default Header
    