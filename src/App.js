import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import About from './pages/About';
import Admin from './pages/Admin';
import './App.css';

const getSavedThemeOrDefault = () => {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  // Always default to dark, for all devices
  return 'dark';
};

const App = () => {
  const [theme, setTheme] = useState(getSavedThemeOrDefault);
  const [animateBrand, setAnimateBrand] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  // Theme
  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const apply = () => document.documentElement.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
      apply();
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Mount flag for animations
  useEffect(() => {
    let raf;
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(() => setMounted(true));
    }, 50);
    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Trigger letter animation after hero blur finishes (~0.9s after mount)
  useEffect(() => {
    const timer = setTimeout(() => setAnimateBrand(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Header animateBrand={animateBrand} />
      <main>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home mounted={mounted} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default App;
