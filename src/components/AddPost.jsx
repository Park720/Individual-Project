import React, { useState, useRef, useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import styles from './AddPost.module.css';

const AddPost = ({ onSubmitDone }) => {
    const { addPost } = usePosts();

    const [detail, setDetail]   = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage]     = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError]     = useState('');

    const detailRef    = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (detailRef.current) detailRef.current.focus();
    }, []);

    const handleImageClick = () => fileInputRef.current.click();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setError('Image has to be smaller than 5MB');
            return;
        }
        setError('');
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!detail.trim()) {
            setError('Detail is required');
            if (detailRef.current) detailRef.current.focus();
            return;
        }

        addPost({
            id: Date.now(),
            username: 'junhyung_park',
            location: location.trim() || null,
            detail: detail.trim(),
            image: preview,
            timeAgo: 'Now',
        });

        setDetail('');
        setLocation('');
        setImage(null);
        setPreview(null);
        setError('');
        fileInputRef.current.value = '';

        if (onSubmitDone) onSubmitDone();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <div className={styles.avatar}>J</div>
                <textarea
                    ref={detailRef}
                    className={styles.detailInput}
                    placeholder=" Write a caption..."
                    value={detail}
                    onChange={e => setDetail(e.target.value)}
                    rows={3}
                />
            </div>

            {preview && (
                <div className={styles.previewWrapper}>
                    <img src={preview} alt="preview" className={styles.preview} />
                    <button type="button" className={styles.removeBtn} onClick={handleRemoveImage}>✕</button>
                </div>
            )}

            <div className={styles.footer}>
                <input
                    ref={fileInputRef}
                    type="file" accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <button type="button" className={styles.imageBtn} onClick={handleImageClick}>
                    🖼️ {image ? image.name : 'Add Image'}
                </button>

                <input
                    className={styles.locationInput}
                    placeholder="📍 Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />

                <button type="submit" className={styles.submitBtn} disabled={!detail.trim()}>
                    Post
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
};

export default AddPost;