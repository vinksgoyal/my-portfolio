// src/pages/Blog.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const Blog = () => {
  const [writings, setWritings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, slug, date')
        .order('created_at', { ascending: false });
      if (!error && data) setWritings(data);
      else console.error(error);
      setLoading(false);
    };
    fetchWritings();
  }, []);

  const filtered = writings.filter(w =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Blog | Divyansh Goyal — Full Stack Engineer</title>
        <meta name="description" content="Thoughts on coding, design, and building things that matter." />
      </Helmet>

      <div className="blog-page">
        <div className="container">
          <div className="blog-header">
            <h1>Latest writings</h1>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="blog-search"
            />
          </div>

          {loading ? (
            <p className="no-results">Loading posts...</p>
          ) : (
            <div className="posts-list">
              {filtered.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="post-item">
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">{post.date}</span>
                </Link>
              ))}
              {filtered.length === 0 && (
                <p className="no-results">No matching articles.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
