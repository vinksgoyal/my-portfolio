import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal';

const ParticleBrandSub = ({ animate }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const pts       = useRef([]);
  const live      = useRef(false);
  const textRef   = useRef(null);
  const [letterAnimationDone, setLetterAnimationDone] = useState(false);

  // Canvas particle system
  useEffect(() => {
    const cv  = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');

    const resize = () => {
      cv.width  = cv.offsetWidth  || 120;
      cv.height = cv.offsetHeight || 30;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => ({
      x: Math.random() * cv.width,
      y: cv.height + 2,
      vx: (Math.random() - 0.5) * 0.55,
      vy: -(Math.random() * 0.75 + 0.3),
      life: 1,
      decay: Math.random() * 0.02 + 0.008,
      r: Math.random() * 1.3 + 0.4,
    });

    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (live.current && pts.current.length < 38) pts.current.push(spawn());
      pts.current = pts.current.filter(p => p.life > 0);
      pts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,160,160,${(p.life * 0.65).toFixed(2)})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Letter animation + particles
  useEffect(() => {
    if (!animate || !textRef.current || letterAnimationDone) return;

    const text = "Zinux Platforms";
    const container = textRef.current;
    container.innerHTML = "";

    [...text].forEach((char, idx) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.className = "letter";
      span.style.animationDelay = `${idx * 0.05}s`;
      container.appendChild(span);
    });

    container.style.opacity = "1";
    setLetterAnimationDone(true);

    // Start particles
    live.current = true;
    const canvasElem = canvasRef.current;
    if (canvasElem) canvasElem.style.opacity = "1";

    // Stop after 2.5s
    const particleTimer = setTimeout(() => {
      live.current = false;
      if (canvasElem) canvasElem.style.opacity = "";
    }, 2500);

    // Optional sprinkles
    const sprinklesContainer = document.createElement("div");
    sprinklesContainer.className = "sprinkles-container";
    container.parentElement.style.position = "relative";
    container.parentElement.appendChild(sprinklesContainer);
    for (let i = 0; i < 12; i++) {
      const sprinkle = document.createElement("div");
      sprinkle.className = "sprinkle";
      const left = -10 + Math.random() * 120;
      const top = -40 + Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 0.5 + Math.random() * 0.5;
      sprinkle.style.left = `${left}%`;
      sprinkle.style.top = `${top}%`;
      sprinkle.style.animationDelay = `${delay}s`;
      sprinkle.style.animationDuration = `${duration}s`;
      sprinklesContainer.appendChild(sprinkle);
    }
    setTimeout(() => sprinklesContainer?.remove(), 1200);

    return () => clearTimeout(particleTimer);
  }, [animate, letterAnimationDone]);

  return (
    <a
      href="https://zinux.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="brand-sub"
      onMouseEnter={() => { live.current = true; }}
      onMouseLeave={() => { live.current = false; }}
    >
      <canvas ref={canvasRef} className="brand-sub-canvas" />
      <span ref={textRef} className="brand-sub-text">Zinux Platforms</span>
    </a>
  );
};

const Header = ({ animateBrand }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Navbar appears quickly (200ms) after hero blur starts
  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { to: '/blog', label: 'Blog' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <header className={`header ${headerVisible ? 'header--visible' : ''}`}>
        <div className="container header-inner">
          <div className="brand">
            <Link to="/" className="brand-name">DivyanshG.</Link>
            <ParticleBrandSub animate={animateBrand} />
          </div>
          <nav className="nav-desktop">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="nav-link">{l.label}</Link>
            ))}
          </nav>
          <div className="mobile-actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className={`mobile-menu-btn${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <nav className="nav-mobile open">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </nav>
      )}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
