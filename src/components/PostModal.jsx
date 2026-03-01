import React, { useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import AddPost from './AddPost';
import styles from './PostModal.module.css';

function PostModal() {
    const { isModalOpen, closeModal } = usePosts();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <span>Make New Post</span>
                    <button className={styles.closeBtn} onClick={closeModal}>✕</button>
                </div>
                <div className={styles.body}>
                    <AddPost onSubmitDone={closeModal} />
                </div>
            </div>
        </div>
    );
}

export default PostModal;