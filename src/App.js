// src/App.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    color: 'var(--muted)',
    fontSize: '1rem'
  }}>
    Loading...
  </div>
);

const getSavedThemeOrDefault = () => {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  return 'dark';
};

const App = () => {
  const [theme, setTheme] = useState(getSavedThemeOrDefault);
  const [animateBrand, setAnimateBrand] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  // Check if current route is admin
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin');

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
      {/* Only show Header if not on admin route */}
      {!isAdminRoute && <Header animateBrand={animateBrand} />}
      
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home mounted={mounted} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Only show Footer if not on admin route */}
      {!isAdminRoute && <Footer theme={theme} setTheme={setTheme} />}
    </div>
  );
};

export default App;
