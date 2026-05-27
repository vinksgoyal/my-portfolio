// src/pages/BlogPost.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

// Simple inline markdown parser
const parseInline = (text) => {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderContent = (content) => {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Horizontal rule: ---
    if (line.trim() === '---') {
      elements.push(<hr key={i} className="post-divider" />);
      i++;
      continue;
    }

    // Sub-heading: **Heading** on its own line (entire line is bold)
    if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      elements.push(
        <h2 key={i} className="post-subheading">
          {line.trim().slice(2, -2)}
        </h2>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="post-paragraph">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return elements;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('writings')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) setPost(data);
      else console.error(error);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--muted)' }}>
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '3rem 0' }}>
        <p>Post not found.</p>
        <Link to="/blog">← Back to blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Divyansh Goyal</title>
        <meta name="description" content={post.content?.substring(0, 160)} />
      </Helmet>

      <div className="blog-post-page">
        <div className="blog-post-container">

          {/* Back link */}
          <Link to="/blog" className="back-link">← Back to blog</Link>

          {/* Title */}
          <h1 className="post-title">{post.title}</h1>

          {/* Date */}
          <p className="post-meta">{post.date}</p>

          {/* Divider under meta */}
          <hr className="post-divider post-divider--top" />

          {/* Content */}
          <div className="post-body">
            {renderContent(post.content)}
          </div>

          {/* Bottom nav */}
          <div className="post-footer">
            <Link to="/blog" className="back-link">← All writings</Link>
          </div>

        </div>
      </div>

      <style>{`
        .blog-post-page {
          padding: 3rem 0 6rem;
        }

        .blog-post-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .back-link {
          font-size: 0.82rem;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: var(--fg);
        }

        .post-title {
          margin-top: 1.8rem;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: var(--fg);
        }

        .post-meta {
          margin-top: 0.5rem;
          font-size: 0.82rem;
          color: var(--muted);
          letter-spacing: 0.02em;
        }

        .post-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 1.5rem 0;
        }

        .post-divider--top {
          margin-top: 1.2rem;
          margin-bottom: 2rem;
        }

        .post-body {
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--fg);
        }

        .post-paragraph {
          margin-bottom: 1.3rem;
          color: var(--fg);
        }

        .post-subheading {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 2.5rem;
          margin-bottom: 0.8rem;
          padding-left: 0.8rem;
          border-left: 2px solid var(--fg);
        }

        .post-body strong {
          font-weight: 650;
          color: var(--fg);
        }

        .post-footer {
          margin-top: 4rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
      `}</style>
    </>
  );
};

export default BlogPost;
