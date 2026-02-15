import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/" className={styles.logo}>Instagram</Link>
                <input type="text" placeholder="search" className={styles.search} />
                <div className={styles.icons}>
                    <Link to="/">⌂ Home</Link>
                    <Link to="/search">⌕ Search</Link>
                    <Link to="/profile">ጸ Profile</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;