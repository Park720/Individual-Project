import React from "react";
import styles from './Interaction.module.css';

function Interaction({ username, detail }) {

    const [likes , setLikes] = React.useState(0);
    const [liked, setLiked] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleCommentUpload = (event) => {
        event.preventDefault();
        if (comment.trim() === "") {
            alert("Please enter a comment.");
        } else {
            setCommentList([...commentList, comment]);
            setComment("");
        }
    };

    return (
        <div className={styles.interactionContainer}>
            <div className={styles.iconSection}>
                <button 
                    onClick={handleLike} 
                    className={liked ? styles.likedHeart : styles.emptyHeart}
                >
                    {liked ? '♥️' : '🤍'}
                </button>
                <span className={styles.likeCount}>Like {likes}</span>
            </div>
            <div className={styles.description}>
                <p>{detail}</p>
            </div>
            <div className={styles.commentList}>
                {commentList.map((item, index) => (
                    <p key={index} className={styles.commentItem}>
                    <strong>June</strong> {item}
                    </p>
                ))}
            </div>
            <form onSubmit={handleCommentUpload} className={styles.commentForm}>
                <input 
                    type="text" 
                    placeholder="댓글 달기..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.commentInput}
                />
            <button type="submit" className={styles.submitBtn}>Post</button>
        </form>
    </div>
    );
}


export default Interaction;