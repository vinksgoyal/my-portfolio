// src/pages/Admin.js – Supabase Auth version
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === 'writings') {
        const { data } = await supabase.from('writings').select('*').order('created_at', { ascending: false });
        if (data) setWritings(data);
      } else if (activeTab === 'experience') {
        const { data } = await supabase.from('experience').select('*').order('sort_order');
        if (data) setExperience(data);
      } else if (activeTab === 'projects') {
        const { data } = await supabase.from('projects').select('*').order('sort_order');
        if (data) setProjects(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [session, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleDelete = async (table, id) => {
    if (!window.confirm('Delete permanently?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) alert(error.message);
    else {
      if (table === 'writings') setWritings(writings.filter(w => w.id !== id));
      else if (table === 'experience') setExperience(experience.filter(e => e.id !== id));
      else setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const table = activeTab;
    let result;
    if (editingItem) {
      result = await supabase.from(table).update(formData).eq('id', editingItem.id);
    } else {
      result = await supabase.from(table).insert([formData]);
    }
    if (result.error) alert(result.error.message);
    else {
      setEditingItem(null);
      setFormData({});
      const { data } = await supabase.from(table).select('*').order(table === 'writings' ? 'created_at' : 'sort_order');
      if (table === 'writings') setWritings(data);
      else if (table === 'experience') setExperience(data);
      else setProjects(data);
    }
  };

  const renderForm = () => {
    if (activeTab === 'writings') {
      return (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h3>{editingItem ? 'Edit Writing' : 'New Writing'}</h3>
          <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input type="text" placeholder="Slug" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} required />
          <input type="text" placeholder="Date (e.g., Apr 20)" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} required />
          <textarea placeholder="Content" rows="6" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
          <button type="submit">Save</button>
          {editingItem && <button type="button" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
        </form>
      );
    }
    if (activeTab === 'experience') {
      return (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h3>{editingItem ? 'Edit Experience' : 'New Experience'}</h3>
          <input type="text" placeholder="Year" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} required />
          <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <textarea placeholder="Description" rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <input type="number" placeholder="Sort order" value={formData.sort_order || 0} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} />
          <button type="submit">Save</button>
          {editingItem && <button type="button" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
        </form>
      );
    }
    if (activeTab === 'projects') {
      return (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h3>{editingItem ? 'Edit Project' : 'New Project'}</h3>
          <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <textarea placeholder="Description" rows="2" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <input type="text" placeholder="Tags (comma separated)" value={formData.tags ? formData.tags.join(', ') : ''} onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})} />
          <input type="url" placeholder="Project link" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
          <input type="text" placeholder="Thumb emoji" value={formData.thumb_emoji || ''} onChange={e => setFormData({...formData, thumb_emoji: e.target.value})} />
          <input type="number" placeholder="Sort order" value={formData.sort_order || 0} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} />
          <button type="submit">Save</button>
          {editingItem && <button type="button" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
        </form>
      );
    }
    return null;
  };

  if (!session) {
    return (
      <div className="container" style={{ padding: '4rem 0', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} style={{ padding: '0.3rem 0.8rem' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
        <button onClick={() => setActiveTab('writings')} style={tabButtonStyle(activeTab === 'writings')}>Writings</button>
        <button onClick={() => setActiveTab('experience')} style={tabButtonStyle(activeTab === 'experience')}>Experience</button>
        <button onClick={() => setActiveTab('projects')} style={tabButtonStyle(activeTab === 'projects')}>Projects</button>
      </div>

      {renderForm()}

      <hr style={{ margin: '2rem 0' }} />
      <h3>Existing Items</h3>
      {loading && <p>Loading...</p>}
      {activeTab === 'writings' && writings.map(w => (
        <div key={w.id} style={listItemStyle}>
          <span><strong>{w.title}</strong> ({w.date}) – {w.slug}</span>
          <div>
            <button onClick={() => handleEdit(w)} style={editBtnStyle}>Edit</button>
            <button onClick={() => handleDelete('writings', w.id)} style={deleteBtnStyle}>Delete</button>
          </div>
        </div>
      ))}
      {activeTab === 'experience' && experience.map(e => (
        <div key={e.id} style={listItemStyle}>
          <span><strong>{e.year}</strong> – {e.title} (order: {e.sort_order})</span>
          <div>
            <button onClick={() => handleEdit(e)} style={editBtnStyle}>Edit</button>
            <button onClick={() => handleDelete('experience', e.id)} style={deleteBtnStyle}>Delete</button>
          </div>
        </div>
      ))}
      {activeTab === 'projects' && projects.map(p => (
        <div key={p.id} style={listItemStyle}>
          <span><strong>{p.name}</strong> – {p.description.substring(0, 60)}…</span>
          <div>
            <button onClick={() => handleEdit(p)} style={editBtnStyle}>Edit</button>
            <button onClick={() => handleDelete('projects', p.id)} style={deleteBtnStyle}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Styles (same as before)
const formStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};
const tabButtonStyle = (active) => ({
  background: active ? 'var(--fg)' : 'transparent',
  color: active ? 'var(--bg)' : 'var(--fg)',
  border: 'none',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  borderRadius: '0.3rem',
});
const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid var(--border)',
};
const editBtnStyle = { marginRight: '0.5rem', padding: '0.25rem 0.75rem', cursor: 'pointer' };
const deleteBtnStyle = { padding: '0.25rem 0.75rem', cursor: 'pointer', background: '#b91c1c', color: 'white', border: 'none', borderRadius: '0.25rem' };

export default Admin;
