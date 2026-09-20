// src/pages/Home.js - With Featured Projects using images

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [latestWritings, setLatestWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: writingsData, error: writesError } = await supabase
          .from('writings')
          .select('id, title, slug, date')
          .order('created_at', { ascending: false })
          .limit(5);

        if (writesError) throw writesError;
        setLatestWritings(writingsData || []);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setLightbox(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://divyanshgoyal.me/#person",
    "name": "Vinks Goyal",
    "alternateName": ["vinksgoyal"],
    "url": "https://divyanshgoyal.me",
    "jobTitle": "Full Stack Engineer & Founder",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://zinux.dev/#organization",
      "name": "Zinux Platforms"
    },
    "sameAs": [
      "https://github.com/vinksgoyal",
      "https://linkedin.com/in/vinksgoyal",
      "https://twitter.com/vinksgoyal",
      "https://instagram.com/vinksgoyal"
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Vinks Goyal — Full Stack Engineer & Founder</title>
        <meta name="description" content="Full stack engineer and founder of Zinux Platforms. Building websites and shipping software products." />
        <link rel="canonical" href="https://divyanshgoyal.me/" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 1000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
          }}
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-label="Profile image lightbox"
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'fixed', top: 20, right: 24, background: 'none',
              border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
            }}
            aria-label="Close lightbox"
          >✕</button>
          <img
            src="/vinks.jpg"
            alt="Vinks Goyal"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(500px, 90vw)', maxHeight: '80vh',
              objectFit: 'cover', borderRadius: 12
            }}
            loading="lazy"
          />
          <p style={{ color: '#eee', fontStyle: 'italic', marginTop: 12, fontSize: '0.9rem' }}>
            Vinks Goyal
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="hero" aria-label="Introduction">
        <div className="container">
          <div className="hero-grid">
            <div className="squircle-wrapper">
              <img
                src="/vinks.jpg"
                alt="Vinks Goyal"
                className="profile-img"
                onClick={() => setLightbox(true)}
                style={{ cursor: 'zoom-in' }}
                loading="lazy"
                onError={e => {
                  e.target.style.display = 'none';
                  const el = e.target.parentElement;
                  el.style.cssText += ';background:var(--card);display:flex;align-items:center;justify-content:center;';
                  el.innerHTML = '<span style="font-size:4rem;opacity:0.12;font-weight:700">V</span>';
                }}
              />
            </div>

            <div className="hero-content">
              <h1 style={{ marginBottom: '0.25rem' }}>Hi, I'm Vinks.</h1>
              <p className="role">Full Stack Engineer · Founder · Writer</p>
              <div className="hero-divider" />
              <p className="description">
                I build web applications and lead <a 
                  href="https://zinux.dev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--fg)', textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'var(--muted)' }}
                >Zinux Platforms</a>.
                <Link to="/about" style={{ marginLeft: '0.5rem', color: 'var(--fg)' }}>More about me →</Link>
              </p>
              <div className="hero-social">
                <a href="https://github.com/vinksgoyal" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="https://twitter.com/vinksgoyal" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="https://instagram.com/vinksgoyal" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37a4 4 0 1 1-7.74 1.23 4 4 0 0 1 7.74-1.23z"/>
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/vinksgoyal" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="mailto:vinksgoyal@gmail.com" className="hero-social-icon" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 7L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest writings */}
      <section className="writings-section" aria-label="Latest blog posts">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest writings</h2>
            <Link to="/blog" className="read-all-link">Read all →</Link>
          </div>
          <div className="posts-list">
            {latestWritings.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No writings yet.</p>
            ) : (
              latestWritings.map(w => (
                <Link key={w.id} to={`/blog/${w.slug}`} className="post-item">
                  <span className="post-title">{w.title}</span>
                  <span className="post-date">{w.date}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects with Images - Exactly 2 in a row */}
      <section className="projects-section" aria-label="Featured projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured projects</h2>
            <Link to="/projects" className="read-all-link">View all →</Link>
          </div>
          <div className="projects-grid" style={{ 
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {/* Project 1 - School Site */}
            <div className="project-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="project-thumb">
                <img 
                  src="/projects/schoolsite.png" 
                  alt="School Site"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'var(--border)';
                    e.target.parentElement.innerHTML = '<span style="font-size:3rem;opacity:0.3;">⚡</span>';
                  }}
                />
              </div>
              <div className="project-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="project-name">School Site</h3>
                <p className="project-desc" style={{ flex: 1 }}>A school website for my own school.</p>
                <div className="project-buttons" style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  marginTop: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                 
                  <a 
                    href="https://alexandraschool.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 1rem',
                      background: 'var(--fg)',
                      color: 'var(--bg)',
                      border: '1px solid var(--fg)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>   
            
            {/* Project 2 - Arrange */}
            <div className="project-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="project-thumb">
                <img 
                  src="/projects/arrange.png" 
                  alt="Arrange"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'var(--border)';
                    e.target.parentElement.innerHTML = '<span style="font-size:3rem;opacity:0.3;">⚡</span>';
                  }}
                />
              </div>
              <div className="project-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="project-name">Arrange</h3>
                <p className="project-desc" style={{ flex: 1 }}>Transform multiple images into clean, print-ready PDFs in seconds.</p>
                <div className="project-buttons" style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  marginTop: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  <a 
                    href="https://github.com/vinksgoyal/arrange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 1rem',
                      background: 'var(--bg)',
                      color: 'var(--fg)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--border)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--bg)';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href="https://arrange.vinksgoyal.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 1rem',
                      background: 'var(--fg)',
                      color: 'var(--bg)',
                      border: '1px solid var(--fg)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>   
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
