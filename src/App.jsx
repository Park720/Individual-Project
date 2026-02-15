import React from 'react';
import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import Home from './pages/Home';
import Serach from './pages/Search';
import Profile from './pages/Profile';


function App() {
return (
  <HashRouter>
    <div className={styles.container}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Serach />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </HashRouter>
  );
}

export default App;