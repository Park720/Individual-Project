import React, { useState, useMemo } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import styles from './Search.module.css';

const USER_DATA = [
    { id: '1', name: 'Junhyung Park', bio: 'junhyung_p' },
    { id: '2', name: 'John Doe', bio: 'john_d_oe' },
    { id: '3', name: 'Alpha Beta', bio: 'a_bbb' },
    { id: '4', name: 'Boiler Class', bio: 'b_class' },
    { id: '5', name: 'Like Lion', bio: 'l_lion_ike' },
];

function Search() {
    const [searchUser, setSearchUser] = useState("");

    useDocumentTitle('Instagram - Search');

    const filteredUsers = useMemo(() =>
        USER_DATA.filter(user =>
            user.id.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.name.toLowerCase().includes(searchUser.toLowerCase())
        ),
    [searchUser]);

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
                    <p className={styles.notFound}>No User Found.</p>
                )}
            </div>
        </div>
    );
}

export default Search;