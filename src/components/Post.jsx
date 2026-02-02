import React from 'react';
import styles from './Post.module.css';
import Interaction from './Interaction';

function Post({ username, detail }) {
    return (
        <div className={styles.postCard}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.userDetail}>
                        <div className={styles.username}>{username || "username"}</div>
                    </div>
                </div>
                <button className={styles.moreBtn}>•••</button>
            </div>
            <div className={styles.imageContainer}>
                <div>Image</div>
            </div>
            <Interaction username={username} detail={detail} />
        </div>
    );
}

export default Post;