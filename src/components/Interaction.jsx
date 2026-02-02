import React from "react";
import styles from './Interaction.module.css';

function Interaction({ username, detail }) {
    return (
        <div className={styles.container}>
            <div className={styles.reaction}>
                <div>Like</div> <div>Comment</div> <div>Share</div> 
            </div>
            <div>Liked by 999+ people</div>
            <div className={styles.comments}>
                <div><b>{username} </b> {detail}</div>
                <div className={styles.viewAll}>View all comments</div>
            </div>
            < div className={styles.inputComment}>
                <input type="text" value="Add a comment..."/>
                <button className={styles.postBtn}>Post</button>
            </div>
        </div>
    );
}

export default Interaction;