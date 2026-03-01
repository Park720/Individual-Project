import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostModal from './components/PostModal';
import styles from './App.module.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ModeContext from './context/ModeContext';

function App() {
    const { theme } = React.useContext(ModeContext);

    return (
        <HashRouter>
            <div className={styles.container} data-theme={theme}>
                <Navbar />
                <div className={styles.main}>
                    <Routes>
                        <Route path="/"        element={<Home />} />
                        <Route path="/search"  element={<Search />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <PostModal />
            </div>
        </HashRouter>
    );
}

export default App;