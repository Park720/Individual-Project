import React, { useState, memo } from 'react';
import styles from './Post.module.css';
import Interaction from './Interaction';
import { usePosts } from '../context/PostsContext';

const MY_USERNAME = 'junhyung_park';

const Post = memo(function Post({ id, username, location, detail, image, timeAgo = '5h' }) {
    const { deletePost } = usePosts();
    const [menuOpen, setMenuOpen] = useState(false);

    const initial  = username ? username[0].toUpperCase() : 'U';
    const isMyPost = username === MY_USERNAME;

    const handleDelete = () => {
        if (window.confirm('Delete?')) {
            deletePost(id);
        }
        setMenuOpen(false);
    };

    return (
        <div className={styles.postCard}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        <div className={styles.avatarInner}>{initial}</div>
                    </div>
                    <div className={styles.userDetail}>
                        <div className={styles.username}>{username || 'username'}</div>
                        {location && <div className={styles.location}>{location}</div>}
                    </div>
                </div>
                <div className={styles.meta}>
                    <span>{timeAgo}</span>
                    <div className={styles.menuWrapper}>
                        <button className={styles.moreBtn} onClick={() => setMenuOpen(prev => !prev)}>•••</button>
                        {menuOpen && (
                            <>
                                <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)} />
                                <div className={styles.menu}>
                                    {isMyPost && (
                                        <button className={styles.menuItemDelete} onClick={handleDelete}>삭제</button>
                                    )}
                                    <button className={styles.menuItem} onClick={() => setMenuOpen(false)}>취소</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.imageContainer}>
                {image
                    ? <img src={image} alt="post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span>No Image</span>
                }
            </div>

            <Interaction id={id} username={username} detail={detail} />
        </div>
    );
});

export default Post;