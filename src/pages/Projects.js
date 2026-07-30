// src/pages/Projects.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) setProjects(data);
      else console.error(error);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // SIMPLIFIED: Always use local school image for now
  const getImagePath = () => {
    return '/schoolsite.jpg';
  };

  return (
    <>
      <Helmet>
        <title>Projects — Vinks Goyal</title>
        <meta name="description" content="A showcase of web applications, open source contributions, and client work." />
        <link rel="canonical" href="https://divyanshgoyal.me/projects" />
      </Helmet>

      <div className="projects-page">
        <div className="container">
          <h1>Projects</h1>
          <p className="projects-sub">Things I've built, contributed to, or am currently working on.</p>

          {/* Static School Site Project */}
          <div className="projects-grid" style={{ marginTop: '1rem' }}>
            <a 
              href="https://alexandraschool.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-card"
            >
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
              <div className="project-body">
                <h3 className="project-name">School Site</h3>
                <p className="project-desc">A school website for my own school.</p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Node.js</span>
                  <span className="project-tag">Supabase</span>
                </div>
              </div>
            </a>
          </div>

          {/* Dynamic Projects from Supabase */}
          {loading ? (
            <p className="no-results">Loading projects...</p>
          ) : (
            <div className="projects-masonry">
              {projects.map(project => {
                return (
                  <a
                    key={project.id}
                    href={project.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-masonry-card"
                  >
                    <div className="project-masonry-image-wrapper">
                      <img 
                        src="/schoolsite.jpg" 
                        alt={project.name}
                        className="project-masonry-image"
                        loading="lazy"
                      />
                      <div className="project-masonry-overlay"></div>
                    </div>
                    
                    <div className="project-masonry-content">
                      <h3 className="project-masonry-name">{project.name}</h3>
                      <p className="project-masonry-desc">{project.description}</p>
                      <div className="project-masonry-tags">
                        {project.tags && project.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="project-masonry-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Static Project Card Styles */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .project-card {
          background: var(--card);
          border-radius: 1rem;
          border: 1px solid var(--border);
          overflow: hidden;
          text-decoration: none;
          color: var(--fg);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--fg);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .project-thumb {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--bg);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-card:hover .project-thumb img {
          transform: scale(1.05);
        }

        .project-body {
          padding: 1.25rem 1.5rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.3rem 0;
          color: var(--fg);
          font-family: 'Playfair Display', serif;
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0 0 0.8rem 0;
          line-height: 1.5;
          flex: 1;
          font-family: 'Lora', serif;
        }

        .project-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .project-tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.7rem;
          background: var(--border);
          border-radius: 0.25rem;
          color: var(--muted);
          font-weight: 500;
          letter-spacing: 0.02em;
          font-family: 'Lora', serif;
        }

        /* Masonry Grid Styles (for dynamic projects) */
        .projects-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .project-masonry-card {
          background: var(--card);
          border-radius: 1rem;
          border: 1px solid var(--border);
          overflow: hidden;
          text-decoration: none;
          color: var(--fg);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .project-masonry-card:hover {
          transform: translateY(-6px);
          border-color: var(--fg);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .project-masonry-image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--bg);
          position: relative;
        }

        .project-masonry-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-masonry-card:hover .project-masonry-image {
          transform: scale(1.05);
        }

        .project-masonry-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-masonry-card:hover .project-masonry-overlay {
          opacity: 1;
        }

        .project-masonry-content {
          padding: 1.25rem 1.5rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-masonry-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.3rem 0;
          color: var(--fg);
          font-family: 'Playfair Display', serif;
        }

        .project-masonry-desc {
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0 0 0.8rem 0;
          line-height: 1.5;
          flex: 1;
          font-family: 'Lora', serif;
        }

        .project-masonry-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .project-masonry-tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.7rem;
          background: var(--border);
          border-radius: 0.25rem;
          color: var(--muted);
          font-weight: 500;
          letter-spacing: 0.02em;
          font-family: 'Lora', serif;
        }

        .no-results {
          text-align: center;
          color: var(--muted);
          padding: 3rem 0;
          font-family: 'Lora', serif;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .projects-grid,
          .projects-masonry {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .projects-grid,
          .projects-masonry {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .project-thumb,
          .project-masonry-image-wrapper {
            height: 150px;
          }

          .project-body,
          .project-masonry-content {
            padding: 1rem 1.25rem 1.25rem;
          }

          .project-name,
          .project-masonry-name {
            font-size: 1rem;
          }

          .project-desc,
          .project-masonry-desc {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .projects-grid,
          .projects-masonry {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .project-thumb,
          .project-masonry-image-wrapper {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
};

export default Projects;
