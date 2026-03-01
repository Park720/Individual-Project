import React, { memo } from 'react';
import styles from './Story.module.css';

const STORIES = [
    { id: 1, username: 'baseballko...', emoji: '⚾', seen: false },
    { id: 2, username: 'hanwhaea...', emoji: '🦅', seen: false },
    { id: 3, username: 'chihyangd...', emoji: '😎', seen: false },
    { id: 4, username: 'orange_ha...', emoji: '🍊', seen: true },
    { id: 5, username: 'landmark_...', emoji: '🏢', seen: true },
    { id: 6, username: 'doosanbe...', emoji: '🐻', seen: false },
];

const Story = memo(function Story() {
    return (
        <div className={styles.storiesRow}>
            {STORIES.map((story) => (
                <div key={story.id} className={styles.storyItem}>
                    <div className={`${styles.storyRing} ${story.seen ? styles.seen : ''}`}>
                        <div className={styles.storyAvatar}>
                            {story.emoji}
                        </div>
                    </div>
                    <span className={styles.storyUsername}>{story.username}</span>
                </div>
            ))}
        </div>
    );
});

export default Story;