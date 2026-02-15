import React, { useState } from 'react';
import styles from './Search.module.css';

const USER_DATA = [
    { id: '1', name: 'Junhyung Park', bio: 'Game Developer' },
    { id: '2', name: 'John Doe', bio: 'Frontend Developer' },
    { id: '3', name: 'Alpha Beta', bio: 'Math Developer' },
    { id: '4', name: 'Boiler Class', bio: 'Backend Developer' },
    { id: '5', name: 'Like Lion', bio: 'Web Application Developer' },
];

function Search() {

    const [searchUser, setSearchUser] = useState("");
    const filteredUsers = USER_DATA.filter((user) =>
        user.id.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.name.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className={styles.searchPage}>
            <div className={styles.userContainer}>
                <input 
                    type="text" 
                    placeholder="search" 
                    className={styles.searchInput}
                    value={searchUser}
                    onChange={(event) => setSearchUser(event.target.value)}
                />
            </div>
            <div className={styles.resultsList}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className={styles.userItem}>
                            <div className={styles.userImage}></div>
                            <div className={styles.userBox}>
                                <span className={styles.userId}>{user.id}</span>
                                <span className={styles.userName}>{user.name}</span>
                                <span className={styles.userBio}>{user.bio}</span>
                            </div>
                        </div>
                    ))
                ) : (
                <p className={styles.notFound}>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default Search;