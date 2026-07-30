import React from 'react';

const Footer = ({ theme, setTheme }) => {
  return (
    <>
      {/* Contact section – clean, no buttons */}
      <section className="contact-section">
        <div className="container">
          <h2 className="contact-title">Let's Build Something Together</h2>
          <p className="contact-sub">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
          <div className="contact-links">
            <a href="mailto:vinksgoyal@gmail.com" className="contact-email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 7L2 7" />
              </svg>
              vinksgoyal@gmail.com
            </a>
            {/* Swapped Link for a standard anchor tag to force a new tab */}
            <a 
              href="/Divyansh's_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-resume"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Resume →
            </a>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-copy">© {new Date().getFullYear()} VinksG.</span>
          {setTheme && (
            <div className="footer-themes">
              <button className={`theme-btn${theme === 'light' ? ' active' : ''}`} onClick={() => setTheme('light')} aria-label="Light mode">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </button>
              <button className={`theme-btn${theme === 'dark' ? ' active' : ''}`} onClick={() => setTheme('dark')} aria-label="Dark mode">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </button>
              <button className={`theme-btn${theme === 'system' ? ' active' : ''}`} onClick={() => setTheme('system')} aria-label="System theme">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
