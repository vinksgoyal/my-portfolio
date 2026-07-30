// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--fg)'
    }}>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
