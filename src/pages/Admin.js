// src/pages/Admin.js – Beautiful Admin Panel with Modern Form Design
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

// SVG Icons
const Icons = {
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Delete: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Writings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Experience: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Projects: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Admin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Title: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h10M4 18h6" />
    </svg>
  ),
  Link: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Tag: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Image: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="14" y1="3" x2="12" y2="21" />
    </svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Company: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  GitHub: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
};

const Admin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('writings');
  const [writings, setWritings] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (loginAttempts >= 5) {
      setIsLocked(true);
      showToast('Too many failed attempts. Please wait 15 minutes.', 'error');
      const timer = setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
      }, 900000);
      setLockTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [loginAttempts]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (err) {
        showToast('Session verification failed', 'error');
      }
    };
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
      if (lockTimer) clearTimeout(lockTimer);
    };
  }, [lockTimer]);

  const fetchData = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      if (activeTab === 'writings') {
        const { data, error } = await supabase.from('writings').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setWritings(data || []);
      } else if (activeTab === 'experience') {
        const { data, error } = await supabase.from('experience').select('*').order('sort_order');
        if (error) throw error;
        setExperience(data || []);
      } else if (activeTab === 'projects') {
        const { data, error } = await supabase.from('projects').select('*').order('sort_order');
        if (error) throw error;
        setProjects(data || []);
      }
    } catch (err) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [session, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) {
      showToast('Account locked. Please wait 15 minutes.', 'error');
      return;
    }
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setLoginAttempts(prev => prev + 1);
        throw error;
      }
      setLoginAttempts(0);
      showToast('Login successful!', 'success');
      setPassword('');
    } catch (err) {
      showToast(err.message || 'Login failed. Please try again.', 'error');
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await supabase.auth.signOut();
        setSession(null);
        showToast('Logged out successfully', 'success');
      } catch (err) {
        showToast('Logout failed', 'error');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleDelete = async (table, id) => {
    if (!window.confirm('Delete permanently?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      showToast('Item deleted successfully', 'success');
      if (table === 'writings') setWritings(writings.filter(w => w.id !== id));
      else if (table === 'experience') setExperience(experience.filter(e => e.id !== id));
      else setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'writings' && !formData.title) {
      showToast('Title is required', 'error');
      return;
    }
    if (activeTab === 'experience' && !formData.title) {
      showToast('Title is required', 'error');
      return;
    }
    if (activeTab === 'projects' && !formData.name) {
      showToast('Project name is required', 'error');
      return;
    }
    try {
      const table = activeTab;
      let result;
      if (editingItem) {
        result = await supabase.from(table).update(formData).eq('id', editingItem.id);
      } else {
        result = await supabase.from(table).insert([formData]);
      }
      if (result.error) throw result.error;
      showToast(editingItem ? 'Item updated!' : 'Item created!', 'success');
      setEditingItem(null);
      setFormData({});
      await fetchData();
    } catch (err) {
      showToast(err.message || 'Save failed', 'error');
    }
  };

  const renderForm = () => {
    const fields = {
      writings: (
        <>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Title /></span>
              Title
            </label>
            <input 
              type="text" 
              placeholder="Enter the blog post title" 
              value={formData.title || ''} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Hash /></span>
              Slug
            </label>
            <input 
              type="text" 
              placeholder="my-awesome-article" 
              value={formData.slug || ''} 
              onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
              required 
            />
            <span className="field-hint">URL-friendly version of the title</span>
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Calendar /></span>
              Date
            </label>
            <input 
              type="text" 
              placeholder="Apr 20, 2024" 
              value={formData.date || ''} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">📝</span>
              Content
            </label>
            <textarea 
              placeholder="Write your blog post content here (Markdown supported)" 
              rows="8" 
              value={formData.content || ''} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">📄</span>
              Excerpt
            </label>
            <input 
              type="text" 
              placeholder="Brief summary of the post" 
              value={formData.excerpt || ''} 
              onChange={e => setFormData({...formData, excerpt: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Image /></span>
              Featured Image
            </label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              value={formData.featured_image || ''} 
              onChange={e => setFormData({...formData, featured_image: e.target.value})} 
            />
          </div>
        </>
      ),
      experience: (
        <>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Calendar /></span>
              Year
            </label>
            <input 
              type="text" 
              placeholder="2023" 
              value={formData.year || ''} 
              onChange={e => setFormData({...formData, year: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Title /></span>
              Title / Role
            </label>
            <input 
              type="text" 
              placeholder="Senior Full Stack Developer" 
              value={formData.title || ''} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Company /></span>
              Company
            </label>
            <input 
              type="text" 
              placeholder="Google" 
              value={formData.company || ''} 
              onChange={e => setFormData({...formData, company: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Location /></span>
              Location
            </label>
            <input 
              type="text" 
              placeholder="San Francisco, CA" 
              value={formData.location || ''} 
              onChange={e => setFormData({...formData, location: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">📄</span>
              Description
            </label>
            <textarea 
              placeholder="Describe your experience, achievements, and responsibilities" 
              rows="4" 
              value={formData.description || ''} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">🔢</span>
              Sort Order
            </label>
            <input 
              type="number" 
              placeholder="0" 
              value={formData.sort_order || 0} 
              onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} 
            />
            <span className="field-hint">Lower numbers appear first</span>
          </div>
        </>
      ),
      projects: (
        <>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Title /></span>
              Project Name
            </label>
            <input 
              type="text" 
              placeholder="My Awesome Project" 
              value={formData.name || ''} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">📄</span>
              Description
            </label>
            <textarea 
              placeholder="Brief description of your project" 
              rows="3" 
              value={formData.description || ''} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Tag /></span>
              Tags
            </label>
            <input 
              type="text" 
              placeholder="React, Node.js, Supabase" 
              value={formData.tags ? formData.tags.join(', ') : ''} 
              onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} 
            />
            <span className="field-hint">Comma separated values</span>
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.Link /></span>
              Live Demo
            </label>
            <input 
              type="url" 
              placeholder="https://your-project.com" 
              value={formData.link || ''} 
              onChange={e => setFormData({...formData, link: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon"><Icons.GitHub /></span>
              GitHub
            </label>
            <input 
              type="url" 
              placeholder="https://github.com/username/repo" 
              value={formData.github || ''} 
              onChange={e => setFormData({...formData, github: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">🎨</span>
              Thumb Emoji
            </label>
            <input 
              type="text" 
              placeholder="🚀" 
              value={formData.thumb_emoji || ''} 
              onChange={e => setFormData({...formData, thumb_emoji: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="label-icon">🔢</span>
              Sort Order
            </label>
            <input 
              type="number" 
              placeholder="0" 
              value={formData.sort_order || 0} 
              onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} 
            />
            <span className="field-hint">Lower numbers appear first</span>
          </div>
        </>
      )
    };

    return (
      <div className="form-card">
        <div className="form-card-header">
          <h3>{editingItem ? '✏️ Edit' : '✨ New'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
          {editingItem && (
            <button className="btn-ghost" onClick={() => { setEditingItem(null); setFormData({}); }}>
              Cancel
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          {fields[activeTab]}
          <button type="submit" className="btn-primary">
            {editingItem ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    );
  };

  if (!session) {
    return (
      <>
        <Helmet><title>Admin - Vinks Goyal</title><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="login-page">
          <div className="login-container">
            <div className="login-header">
              <div className="login-icon"><Icons.Admin /></div>
              <h1>Admin Login</h1>
              <p>Sign in to manage your content</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <span className="input-icon"><Icons.Mail /></span>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="input-icon"><Icons.Lock /></span>
                  <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>
              {isLocked && <div className="lock-message"><Icons.X /> Account locked. Please wait 15 minutes.</div>}
              <button type="submit" className="btn-primary" disabled={isLocked}>
                {isLocked ? 'Locked' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <span className="toast-icon">{toast.type === 'success' ? <Icons.Check /> : <Icons.X />}</span>
            <span>{toast.message}</span>
          </div>
        )}
        <style>{`
          .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 1.5rem; }
          .login-container { width: 100%; max-width: 400px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 2.5rem; }
          .login-header { text-align: center; margin-bottom: 2rem; }
          .login-icon { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: var(--bg); border: 2px solid var(--border); border-radius: 50%; margin-bottom: 1rem; color: var(--fg); }
          .login-header h1 { font-size: 1.75rem; margin: 0 0 0.5rem; color: var(--fg); }
          .login-header p { color: var(--muted); font-size: 0.95rem; margin: 0; }
          .input-wrapper { display: flex; align-items: center; background: var(--bg); border: 2px solid var(--border); border-radius: 8px; transition: all 0.3s; }
          .input-wrapper:focus-within { border-color: var(--fg); box-shadow: 0 0 0 3px rgba(0,0,0,0.05); }
          .input-icon { padding: 0 0 0 1rem; display: flex; align-items: center; opacity: 0.6; color: var(--muted); }
          .input-wrapper input { width: 100%; padding: 0.75rem 1rem; background: transparent; border: none; outline: none; color: var(--fg); font-size: 1rem; }
          .lock-message { padding: 0.75rem; background: rgba(220,38,38,0.1); color: #dc2626; border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
          .btn-primary { width: 100%; padding: 0.75rem; background: var(--fg); color: var(--bg); border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
          .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
          .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px); padding: 1rem 1.5rem; border-radius: 12px; color: white; font-weight: 500; display: flex; align-items: center; gap: 0.75rem; box-shadow: 0 10px 40px rgba(0,0,0,0.2); animation: slideUp 0.5s ease forwards; z-index: 9999; max-width: 90%; min-width: 280px; }
          .toast-success { background: #16a34a; }
          .toast-error { background: #dc2626; }
          .toast-icon { display: flex; align-items: center; color: white; }
          @keyframes slideUp { 0% { transform: translateX(-50%) translateY(100px); opacity: 0; } 100% { transform: translateX(-50%) translateY(0); opacity: 1; } }
          @media (max-width: 480px) { .login-container { padding: 1.5rem; } .toast { min-width: auto; width: 90%; bottom: 1rem; } }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin Panel - Vinks Goyal</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      
      <div className="admin-panel">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-brand">
            <Icons.Admin />
            <h1>Admin</h1>
          </div>
          <div className="admin-actions">
            <span className="admin-user">
              <Icons.User /> {session?.user?.email}
            </span>
            <button onClick={handleLogout} className="btn-logout">
              <Icons.Logout /> Logout
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'writings' ? 'active' : ''}`} onClick={() => setActiveTab('writings')}>
            <Icons.Writings /> Writings
          </button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            <Icons.Experience /> Experience
          </button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Icons.Projects /> Projects
          </button>
        </div>

        {/* Content */}
        <div className="admin-content">
          {renderForm()}

          {/* Items List */}
          <div className="items-section">
            <h3 className="items-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h3>
            
            {loading && <div className="loading">Loading...</div>}

            <div className="items-grid">
              {activeTab === 'writings' && writings.map(w => (
                <div key={w.id} className="item-card">
                  <div className="item-content">
                    <div className="item-title">{w.title}</div>
                    <div className="item-meta">
                      <span>{w.date}</span>
                      <span className="item-slug">/blog/{w.slug}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon" onClick={() => handleEdit(w)}><Icons.Edit /></button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete('writings', w.id)}><Icons.Delete /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'experience' && experience.map(e => (
                <div key={e.id} className="item-card">
                  <div className="item-content">
                    <div className="item-title">{e.year} – {e.title}</div>
                    <div className="item-meta">
                      {e.company && <span>@{e.company}</span>}
                      <span>Order: {e.sort_order}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon" onClick={() => handleEdit(e)}><Icons.Edit /></button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete('experience', e.id)}><Icons.Delete /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'projects' && projects.map(p => (
                <div key={p.id} className="item-card">
                  <div className="item-content">
                    <div className="item-title">{p.name}</div>
                    <div className="item-meta">
                      <span>{p.description?.substring(0, 50)}…</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon" onClick={() => handleEdit(p)}><Icons.Edit /></button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete('projects', p.id)}><Icons.Delete /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? <Icons.Check /> : <Icons.X />}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <style>{`
        .admin-panel {
          max-width: 960px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          min-height: 100vh;
        }

        /* Header */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--border);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .admin-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--fg);
        }

        .admin-brand h1 {
          font-size: 1.5rem;
          margin: 0;
          font-weight: 700;
          background: linear-gradient(135deg, var(--fg), var(--muted));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .admin-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--muted);
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          background: var(--bg);
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 2px solid var(--border);
          border-radius: 8px;
          color: var(--fg);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-logout:hover {
          background: var(--border);
          transform: translateY(-1px);
        }

        /* Tabs */
        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 10px;
          color: var(--muted);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          font-size: 0.95rem;
        }

        .tab-btn:hover {
          color: var(--fg);
          background: var(--bg);
          border-color: var(--border);
        }

        .tab-btn.active {
          background: var(--fg);
          color: var(--bg);
          border-color: var(--fg);
        }

        /* Form Card */
        .form-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          transition: all 0.3s;
        }

        .form-card:hover {
          border-color: var(--fg);
        }

        .form-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .form-card-header h3 {
          margin: 0;
          font-size: 1.2rem;
          color: var(--fg);
        }

        .btn-ghost {
          padding: 0.4rem 1rem;
          background: transparent;
          border: 2px solid var(--border);
          border-radius: 8px;
          color: var(--muted);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s;
        }

        .btn-ghost:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        /* Form Groups - Beautiful Styling */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--fg);
          font-size: 0.9rem;
        }

        .label-icon {
          display: flex;
          align-items: center;
          color: var(--muted);
          opacity: 0.7;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--bg);
          border: 2px solid var(--border);
          border-radius: 10px;
          color: var(--fg);
          font-size: 0.95rem;
          transition: all 0.3s;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--fg);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.04);
          transform: translateY(-1px);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--muted);
          opacity: 0.5;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.6;
        }

        .field-hint {
          display: block;
          margin-top: 0.4rem;
          color: var(--muted);
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .btn-primary {
          width: 100%;
          padding: 0.85rem;
          background: var(--fg);
          color: var(--bg);
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 0.5rem;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        /* Items Section */
        .items-section {
          margin-top: 2rem;
        }

        .items-title {
          font-size: 1.1rem;
          color: var(--fg);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: var(--muted);
        }

        .items-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .item-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s;
          gap: 1rem;
        }

        .item-card:hover {
          border-color: var(--fg);
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .item-content {
          flex: 1;
          min-width: 0;
        }

        .item-title {
          font-weight: 600;
          color: var(--fg);
          font-size: 0.95rem;
        }

        .item-meta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.2rem;
        }

        .item-meta span {
          font-size: 0.8rem;
          color: var(--muted);
        }

        .item-slug {
          background: var(--bg);
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .item-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem 0.6rem;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          color: var(--fg);
          transition: all 0.3s;
        }

        .btn-icon:hover {
          background: var(--border);
          transform: scale(1.05);
        }

        .btn-danger {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
        }

        .btn-danger:hover {
          background: #b91c1c;
          border-color: #b91c1c;
        }

        /* Toast */
        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          animation: slideUp 0.5s ease forwards;
          z-index: 9999;
          max-width: 90%;
          min-width: 280px;
        }

        .toast-success { background: #16a34a; }
        .toast-error { background: #dc2626; }
        .toast-icon { display: flex; align-items: center; color: white; }

        @keyframes slideUp {
          0% { transform: translateX(-50%) translateY(100px); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .admin-panel { padding: 1rem; }
          .admin-header { flex-direction: column; align-items: stretch; }
          .admin-actions { justify-content: space-between; }
          .admin-user { font-size: 0.8rem; padding: 0.4rem 0.8rem; }
          .form-card { padding: 1.25rem; }
          .item-card { flex-wrap: wrap; }
          .item-actions { width: 100%; justify-content: flex-end; }
        }

        @media (max-width: 480px) {
          .admin-tabs { justify-content: stretch; }
          .tab-btn { flex: 1; justify-content: center; font-size: 0.85rem; padding: 0.5rem; }
          .form-card-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .btn-ghost { width: 100%; text-align: center; }
          .toast { min-width: auto; width: 90%; bottom: 1rem; }
          .form-group input, .form-group textarea { font-size: 0.9rem; padding: 0.6rem 0.8rem; }
        }
      `}</style>
    </>
  );
};

export default Admin;
