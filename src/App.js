// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Search from './Search';
import Favorites from './Favorites';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
