import './App.css';
import Header from './components/common/header/Header';
import Pages from './components/pages/pages';
import Footer from './components/common/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/pages/search';
import About from "./components/about/about.jsx";
import Donate from "./components/about/donate";
import Provider from './components/pages/provider.jsx';
import HostPage from './components/pages/hostPage.js';
import React from 'react';
import HostProfile from './components/pages/hostPersonal.jsx';

function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <Header />
        </nav>
        <div className='content'>
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Finder" element={<Provider />} />
            <Route path="/HostProfile" element={<HostProfile />} />
            <Route path="/About" element={<About />} />
            <Route path="/Donate" element={<Donate />} />
            <Route path='/HostPage' element={<HostPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
