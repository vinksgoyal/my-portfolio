// src/components/SearchModal.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all writings titles/slugs once when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const fetchWritings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, slug, date')
        .order('created_at', { ascending: false });
      if (!error && data) setWritings(data);
      setLoading(false);
    };
    fetchWritings();
  }, [isOpen]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const results = writings.filter(w =>
    w.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="search-results">
          {loading ? (
            <p className="search-placeholder">Loading...</p>
          ) : query === '' ? (
            <p className="search-placeholder">Type to search writings...</p>
          ) : results.length === 0 ? (
            <p className="search-placeholder">No results found.</p>
          ) : (
            results.map(w => (
              <Link
                key={w.id}
                to={`/blog/${w.slug}`}
                onClick={onClose}
                className="search-result-item"
              >
                <span className="result-title">{w.title}</span>
                <span className="result-date">{w.date}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
