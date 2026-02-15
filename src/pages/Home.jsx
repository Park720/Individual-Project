import React from 'react';
import Post from '../components/Post'; 
import styles from '../App.module.css';

function Home() {
    return (
        <div className={styles.content}>
            <div className={styles.feed}>
            <Post 
                username="Junhyung Park" 
                location="Seoul, Korea" 
                detail="아 배고프다"
            />
            <Post 
                username="Park Junhyung" 
                location="West Lafayette, IN" 
                detail="아 졸리다"
            />
            </div>
        </div>
    );
}

export default Home;