// src/pages/Home.js
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [latestWritings, setLatestWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: expData, error: expError } = await supabase
          .from('experience')
          .select('*')
          .order('sort_order', { ascending: true });

        if (expError) throw expError;
        setExperienceData(expData || []);

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
    if (!loading && experienceData.length > 0) {
      const raf = requestAnimationFrame(() => {
        if (timelineRef.current) {
          timelineRef.current.classList.add('timeline-reveal');
        }
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [loading, experienceData]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 1000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
          }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'fixed', top: 20, right: 24, background: 'none',
              border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
            }}
          >✕</button>
          <img
            src="/profile.jpg"
            alt="Divyansh Goyal"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(500px, 90vw)', maxHeight: '80vh',
              objectFit: 'cover', borderRadius: 12
            }}
          />
          <p style={{ color: '#eee', fontStyle: 'italic', marginTop: 12, fontSize: '0.9rem' }}>
            Divyansh Goyal
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="squircle-wrapper">
              <img
                src="/profile.jpg"
                alt="Divyansh Goyal"
                className="profile-img"
                onClick={() => setLightbox(true)}
                style={{ cursor: 'zoom-in' }}
                onError={e => {
                  e.target.style.display = 'none';
                  const el = e.target.parentElement;
                  el.style.cssText += ';background:var(--card);display:flex;align-items:center;justify-content:center;';
                  el.innerHTML = '<span style="font-size:4rem;opacity:0.12;font-weight:700">D</span>';
                }}
              />
            </div>

            <div className="hero-content">
              <h1>Hi, I'm Divyansh.</h1>
              <p className="role">Developer | Founder | Linux Systems Engineer.</p>
              <div className="hero-divider" />
              <p className="description">
  I'm a full-stack developer and founder of{' '}
  <a href="https://zinux.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textUnderlineOffset: '2px', textDecorationColor: 'var(--muted)' }}>Zinux Platforms</a>
  , building websites for local businesses and shipping software products.
  Constantly shipping, learning, and iterating.
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
                <a href="mailto:dvyshgyl@gmail.com" className="hero-social-icon" aria-label="Email">
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
      <section className="writings-section">
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

      {/* Experience timeline */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline-scroll-wrapper">
            <div className="timeline tree-timeline" ref={timelineRef}>
              {experienceData.map((item, idx) => (
                <div
                  className="timeline-item"
                  key={item.id}
                  style={{ transitionDelay: `${idx * 0.07}s` }}
                >
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-phase">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
