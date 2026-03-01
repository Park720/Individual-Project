import { useState } from 'react';
import styles from './Interaction.module.css';
import { usePosts } from '../context/PostsContext';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from './Icons';

const MY_USERNAME = 'junhyung_park';

function Interaction({ id, username, detail, comments = [], likes = 0, likedBy = [] }) {
    const { savedPostIds, savePost, unsavePost, addComment, toggleLike } = usePosts();

    const [comment, setComment] = useState('');

    const isSaved = savedPostIds.includes(id);
    const isLiked = likedBy.includes(MY_USERNAME); 

    const handleCommentUpload = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        addComment(id, comment.trim());
        setComment('');
    };

    return (
        <div className={styles.interactionContainer}>
            <div className={styles.iconSection}>
                <button onClick={() => toggleLike(id)} className={`${styles.iconBtn} ${isLiked ? styles.liked : ''}`}>
                    <HeartIcon filled={isLiked} />
                </button>
                {likes > 0 && <span className={styles.iconCount}>{likes}</span>}

                <button className={styles.iconBtn}>
                    <CommentIcon />
                </button>
                {comments.length > 0 && <span className={styles.iconCount}>{comments.length}</span>}

                <button className={styles.iconBtn}><ShareIcon /></button>
                <div className={styles.spacer} />
                <button onClick={() => isSaved ? unsavePost(id) : savePost(id)} className={`${styles.iconBtn} ${isSaved ? styles.saved : ''}`}>
                    <BookmarkIcon filled={isSaved} />
                </button>
            </div>

            <div className={styles.description}><strong>{username}</strong> {detail}</div>

            {comments.length > 0 && (
                <div className={styles.commentList}>
                    {comments.map((item, index) => (
                        <p key={index} className={styles.commentItem}>
                            <strong>{MY_USERNAME}</strong> {item}
                        </p>
                    ))}
                </div>
            )}

            <form onSubmit={handleCommentUpload} className={styles.commentForm}>
                <input
                    type="text" placeholder="Comment..."
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    className={styles.commentInput}
                />
                <button type="submit" className={`${styles.submitBtn} ${comment.trim() ? styles.active : ''}`}>
                    Post
                </button>
            </form>
        </div>
    );
}

export default Interaction;