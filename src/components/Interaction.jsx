import { useState } from 'react';
import styles from './Interaction.module.css';
import { usePosts } from '../context/PostsContext';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from './Icons';

function Interaction({ id, username, detail }) {
    const { savedPostIds, savePost, unsavePost } = usePosts();

    const [likes, setLikes]             = useState(0);
    const [liked, setLiked]             = useState(false);
    const [comment, setComment]         = useState('');
    const [commentList, setCommentList] = useState([]);

    const isSaved    = savedPostIds.includes(id);
    const handleLike = () => { setLikes(liked ? likes - 1 : likes + 1); setLiked(!liked); };
    const handleSave = () => isSaved ? unsavePost(id) : savePost(id);
    const handleCommentUpload = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setCommentList([...commentList, comment]);
        setComment('');
    };

    return (
        <div className={styles.interactionContainer}>
            <div className={styles.iconSection}>

                <button onClick={handleLike} className={`${styles.iconBtn} ${liked ? styles.liked : ''}`}>
                    <HeartIcon filled={liked} />
                </button>
                {likes > 0 && <span className={styles.iconCount}>{likes}</span>}

                <button className={styles.iconBtn}>
                    <CommentIcon />
                </button>
                {commentList.length > 0 && <span className={styles.iconCount}>{commentList.length}</span>}

                <button className={styles.iconBtn}><ShareIcon /></button>
                <div className={styles.spacer} />
                <button onClick={handleSave} className={`${styles.iconBtn} ${isSaved ? styles.saved : ''}`}>
                    <BookmarkIcon filled={isSaved} />
                </button>
            </div>

            <div className={styles.description}><strong>{username}</strong> {detail}</div>

            {commentList.length > 0 && (
                <div className={styles.commentList}>
                    {commentList.map((item, index) => (
                        <p key={index} className={styles.commentItem}>
                            <strong>junhyung</strong> {item}
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