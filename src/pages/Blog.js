// src/pages/Blog.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const Blog = () => {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, slug, date, content')
        .order('created_at', { ascending: false });
      if (!error && data) setWritings(data);
      else console.error(error);
      setLoading(false);
    };
    fetchWritings();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog — Vinks Goyal</title>
        <meta name="description" content="Thoughts on coding, design, and building things that matter." />
        <link rel="canonical" href="https://divyanshgoyal.me/blog" />
      </Helmet>

      <div className="blog-page">
        <div className="container">
          <div className="blog-header">
            <h1>Latest writings</h1>
          </div>

          {loading ? (
            <p className="no-results">Loading posts...</p>
          ) : (
            <div className="posts-list">
              {writings.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="post-item">
                  <div>
                    <span className="post-title">{post.title}</span>
                    {post.content && (
                      <p className="post-excerpt" style={{ 
                        color: 'var(--muted)', 
                        fontSize: '0.85rem', 
                        marginTop: '0.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.content.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                  <span className="post-date">{post.date}</span>
                </Link>
              ))}
              {writings.length === 0 && (
                <p className="no-results">No writings yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
