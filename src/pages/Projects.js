// src/pages/Projects.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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

  return (
    <>
      <Helmet>
        <title>Projects | Divyansh Goyal</title>
        <meta name="description" content="A showcase of web applications, open source contributions, and client work." />
      </Helmet>

      <div className="projects-page">
        <div className="container">
          <h1>Projects</h1>
          <p className="projects-sub">Things I've built, contributed to, or am currently working on.</p>

          {loading ? (
            <p className="no-results">Loading projects...</p>
          ) : (
            <div className="projects-grid">
              {projects.map(project => (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  <div className="project-thumb">
                    {project.thumb_emoji ? (
                      <span style={{ fontSize: '3rem' }}>{project.thumb_emoji}</span>
                    ) : (
                      <span>📁</span>
                    )}
                  </div>
                  <div className="project-body">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags && project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="project-link">View project →</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
