import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.nav}>
            <div className={styles.container}>
                <h2 className={styles.logo}>Instagram</h2>
                <input type="text" placeholder="Search" className={styles.search} />
                <div className={styles.icons}>
                    <div>Home</div> <div>Search</div> <div>Profile</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;