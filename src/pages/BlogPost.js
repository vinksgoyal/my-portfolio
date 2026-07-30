// src/pages/BlogPost.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const parseInline = (text) => {
  if (!text) return text;
  
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
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

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (line.trim() === '---') {
      elements.push(<hr key={i} className="post-divider" />);
      i++;
      continue;
    }

    if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      elements.push(
        <h2 key={i} className="post-subheading">
          {line.trim().slice(2, -2)}
        </h2>
      );
      i++;
      continue;
    }

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
        <Link to="/blog">← Back</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Vinks Goyal</title>
        <meta name="description" content={post.content?.substring(0, 160) || post.title} />
        <link rel="canonical" href={`https://divyanshgoyal.me/blog/${post.slug}`} />
      </Helmet>

      <div className="blog-post-page">
        <div className="blog-post-container">

          <Link to="/blog" className="back-link">← Back</Link>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span>{post.date}</span>
          </div>

          <hr className="post-divider post-divider--top" />

          <div className="post-body">
            {renderContent(post.content)}
          </div>

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

        .post-body a {
          color: var(--fg);
          text-decoration: underline;
          text-underline-offset: 2px;
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
