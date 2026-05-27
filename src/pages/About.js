// src/pages/About.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <Helmet>
        <title>About | Divyansh Goyal</title>
        <meta name="description" content="Learn more about Divyansh Goyal – full stack engineer, founder, and builder." />
      </Helmet>

      {/* Lightbox */}
      {lightbox && (
        <div className="about-lightbox" onClick={() => setLightbox(false)}>
          <button className="about-lightbox__close" onClick={() => setLightbox(false)}>✕</button>
          <div className="about-lightbox__inner" onClick={e => e.stopPropagation()}>
            <img src="/divyansh.jpg" alt="Divyansh Goyal"
              onError={e => { e.target.src = 'https://placehold.co/600x600?text=Divyansh'; }} />
            <p className="about-lightbox__caption">Divyansh Goyal</p>
          </div>
        </div>
      )}

      <div className="about-page">
        <div className="container">

          {/* Full-width title */}
          <h1 className="about-title">About Divyansh Goyal</h1>

          {/* Two-column: text left, photo right */}
          <div className="about-row">
            <div className="about-left">
              <p className="about-intro">
                <strong>Divyansh Goyal</strong> is a full‑stack engineer and founder from India.
                I've been building digital products since I was 8 — from small websites to
                platforms used by thousands.
              </p>
              <p className="about-intro">
                Currently working on <strong>Zinux Platforms</strong>, a web development agency,
                and taking on freelance projects that challenge me to create meaningful experiences.
              </p>

              <div className="about-links">
                <a href="/resume" className="about-link">View Resume →</a>
              
              </div>

              <div className="about-stack">
                <h2>Tech I work with</h2>
                <div className="stack-list">
                  {['React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'Tailwind', 'MongoDB', 'PostgreSQL'].map(tech => (
                    <span key={tech} className="stack-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-right">
              <img
                className="about-photo"
                src="/divyansh.jpg"
                alt="Divyansh Goyal"
                onClick={() => setLightbox(true)}
                onError={e => { e.target.src = 'https://placehold.co/400x400?text=Divyansh'; }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
