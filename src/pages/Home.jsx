import React from 'react';
import Post from '../components/Post';
import Story from '../components/Story';
import { usePosts } from '../context/PostsContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styles from '../App.module.css';

function Home() {
    const { posts } = usePosts();

    useDocumentTitle(`Instagram (${posts.length})`);

    return (
        <div className={styles.content}>
            <Story />
            <div className={styles.feed}>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.username}
                        location={post.location}
                        detail={post.detail}
                        image={post.image}
                        timeAgo={post.timeAgo}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;