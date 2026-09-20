import React from 'react';

const Resume = () => (
  <div className="resume-page">
    <div className="container">
      <h1>Resume</h1>
      <p className="resume-meta">Divyansh Goyal — Full-Stack Developer & Founder</p>

    <a
        href="/Divyansh's_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-dl-btn"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        View Resume
      </a>

      {/* Experience */}
      <div className="resume-section">
        <h2>Experience</h2>

        <div className="resume-item">
          <div className="resume-item-header">
            <span className="resume-item-title">Founder & Lead Developer</span>
            <span className="resume-item-date">2024 – Present</span>
          </div>
          <div className="resume-item-sub">Zinux Platforms · Amritsar, Punjab</div>
          <div className="resume-item-desc">
            <ul>
              <li>Built and delivered 4+ production client websites (schools, salons, businesses).</li>
              <li>Architected a Mobile Shop Management SaaS with IMEI tracking and Supabase backend.</li>
              <li>Repositioned agency from product-company to full-service web dev agency.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="resume-section">
        <h2>Selected Projects</h2>

       

        <div className="resume-item">
          <div className="resume-item-header">
            <span className="resume-item-title">InfiniChat</span>
            <span className="resume-item-date">2024</span>
          </div>
          <div className="resume-item-desc">MERN-stack AI web app — AI chat, image search, GIF search, text-to-image generation, Tailwind UI.</div>
        </div>

        <div className="resume-item">
          <div className="resume-item-header">
            <span className="resume-item-title">CityFix</span>
            <span className="resume-item-date">2024</span>
          </div>
          <div className="resume-item-desc">Civic-tech platform for geo-tagged issue reporting with real-time maps integration.</div>
        </div>

        <div className="resume-item">
          <div className="resume-item-header">
            <span className="resume-item-title">WriteNest</span>
            <span className="resume-item-date">2024</span>
          </div>
          <div className="resume-item-desc">Full MERN blogging platform with JWT auth, Tailwind CSS, clean editor and reader experience.</div>
        </div>
      </div>

      {/* Education */}
      <div className="resume-section">
        <h2>Education</h2>

        <div className="resume-item">
          <div className="resume-item-header">
            <span className="resume-item-title">Class 10 ICSE</span>
            <span className="resume-item-date">2026-27</span>
          </div>
          <div className="resume-item-sub">CS Sophomore Graduate</div>
        </div>
      </div>

      {/* Skills */}
      <div className="resume-section">
        <h2>Skills</h2>
        <div className="resume-item-desc">
          React, Next.js, Node.js, Express, MongoDB, Supabase, Tailwind CSS,
          JavaScript, TypeScript, C++, Python, Git, Netlify, Cursor, v0.dev
        </div>
      </div>

    </div>
  </div>
);

export default Resume;
