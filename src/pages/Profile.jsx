import React, { useState, useMemo } from 'react';
import { usePosts } from '../context/PostsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styles from './Profile.module.css';

const initialUsername = 'junhyung_park';

function Profile() {
    const { posts, savedPostIds } = usePosts();

    useDocumentTitle(`${initialUsername} · Instagram`);

    const myPosts = useMemo(() => posts.filter(post => post.username === initialUsername), [posts]);
    const savedPosts = useMemo(() => posts.filter(post => savedPostIds.includes(post.id)), [posts, savedPostIds]);

    const [activeTab, setActiveTab] = useState('posts');

    const renderGrid = (items) => (
        items.length > 0 ? (
            <div className={styles.grid}>
                {items.map(post => (
                    <div key={post.id} className={styles.gridItem}>
                        {post.image
                            ? <img src={post.image} alt="post" className={styles.gridImg} />
                            : <div className={styles.gridPlaceholder}>
                                <span className={styles.gridDetail}>{post.detail}</span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        ) : (
            <div className={styles.empty}>
                <p className={styles.emptyIcon}>{activeTab === 'posts' ? '📷' : '🔖'}</p>
                <p className={styles.emptyText}>
                    {activeTab === 'posts' ? 'No posts yet' : 'No saved posts'}
                </p>
                {activeTab === 'posts' && (
                    <p className={styles.emptySubText}>Create a post to get started</p>
                )}
            </div>
        )
    );

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileHeader}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>J</div>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.usernameRow}>
                        <h2 className={styles.username}>{initialUsername}</h2>
                        <button className={styles.editBtn}>Edit Profile</button>
                    </div>
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>{myPosts.length}</span>
                            <span className={styles.statLabel}>Posts</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>123</span>
                            <span className={styles.statLabel}>Followers</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>123</span>
                            <span className={styles.statLabel}>Following</span>
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <p className={styles.displayName}>Junhyung Park</p>
                        <p>@ Purdue 🎓</p>
                        <p>West Lafayette, IN 📍</p>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('posts')}
                >▦ Posts</button>
                <button
                    className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    🔖 Saved {savedPosts.length > 0 && <span className={styles.badge}>{savedPosts.length}</span>}
                </button>
            </div>

            {activeTab === 'posts' && renderGrid(myPosts)}
            {activeTab === 'saved' && renderGrid(savedPosts)}
        </div>
    );
}

export default Profile;