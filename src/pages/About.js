// src/pages/About.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const About = () => {
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setLightbox(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <Helmet>
        <title>About — Vinks Goyal</title>
        <meta name="description" content="Full stack engineer and founder of Zinux Platforms. Building digital products since age 8." />
        <link rel="canonical" href="https://divyanshgoyal.me/about" />
      </Helmet>

      {lightbox && (
        <div 
          className="about-lightbox" 
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-label="Profile image lightbox"
        >
          <button 
            className="about-lightbox__close" 
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >✕</button>
          <div className="about-lightbox__inner" onClick={e => e.stopPropagation()}>
            <img 
              src="/vinks2.jpg" 
              alt="Vinks Goyal" 
              loading="lazy"
              onError={e => { 
                e.target.src = 'https://placehold.co/600x600?text=Vinks'; 
              }} 
            />
            <p className="about-lightbox__caption">Vinks Goyal</p>
          </div>
        </div>
      )}

      <div className="about-page">
        <div className="container">
          <h1 className="about-title">About</h1>

          <div className="about-row">
            <div className="about-left">
              <p className="about-intro"> 
                I'm a full‑stack engineer and founder of <strong>Zinux Platforms</strong>.
                I've been building digital products since I was 7 — from small websites to platforms used by thousands.
              </p>
              <p className="about-intro">
                Currently leading a web development agency and taking on freelance projects that challenge me to create meaningful experiences.
                <Link to="/projects" style={{ marginLeft: '0.5rem', color: 'var(--fg)' }}>View my work →</Link>
              </p>
              
               
             <h1 className="about-title">The Name</h1>
              <div className="about-intro">
                <p>
                  During my early coding days, I was deep into scripting and tinkering with Arch Linux. 
                  Somewhere along that journey, I stumbled upon the word "vinks" — it stuck. I named my 
                  laptop after it, and eventually, it became how people know me.
                </p>
              </div>
              
              

     

              <div className="about-stack">
                <h2>Tech I work with</h2>
                <div className="stack-list">
                  {['React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Supabase'].map(tech => (
                    <span key={tech} className="stack-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-right">
              <img
                className="about-photo"
                src="/vinks2.jpg"
                alt="Vinks Goyal"
                onClick={() => setLightbox(true)}
                loading="lazy"
                onError={e => { 
                  e.target.src = 'https://placehold.co/400x400?text=Vinks'; 
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
