/**
 * Footer Component - Brand signature, social media links, quick navigation, and back-to-top button
 */
function Footer() {
  // Smooth scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="portfolio-footer">
      <div className="footer-container">
        {/* Brand & Social Column */}
        <div className="footer-brand-col">
          {/* Logo */}
          <div className="footer-logo">
            <span className="logo-badge">.NET</span>
            <span className="logo-name">ANAND<span>.</span></span>
          </div>
          
          {/* Bio Summary */}
          <p className="footer-bio">
            <strong>Anand Kumar Mishra</strong> | Full Stack .NET Developer &amp; Final-Year MCA Student (Expected 2027) at Mangalayatan University, Aligarh. Based in Noida, UP.
          </p>

          {/* Quick Direct Contacts */}
          <div className="footer-contact-direct">
            <span>📞 +91-95769 89908</span>
            <span>📧 anandmishra02.com@gmail.com</span>
          </div>

          {/* Social Icons Row (GitHub, LinkedIn, Email) */}
          <div className="footer-social-row">
            {/* GitHub Profile Link */}
            <a
              href="https://github.com/Anand9899"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="social-icon-btn"
              title="GitHub Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* LinkedIn Profile Link */}
            <a
              href="https://www.linkedin.com/in/anand-kumar-mishra-3b4a9717a/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="social-icon-btn"
              title="LinkedIn Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Direct Email Link */}
            <a
              href="mailto:anandmishra02.com@gmail.com"
              aria-label="Send Email"
              className="social-icon-btn"
              title="Send Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Navigation Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About &amp; Education</a></li>
            <li><a href="#skills">Technical Skills</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#projects">Key Projects</a></li>
            <li><a href="#code-showcase">Clean Architecture</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Projects & Repositories Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Projects &amp; Code</h4>
          <ul>
            <li>
              <a href="https://github.com/Anand9899" target="_blank" rel="noreferrer">
                GitHub: Anand9899 ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/Anand9899/CRN.ProductAPI" target="_blank" rel="noreferrer">
                CRN Product API (.NET 8) ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/Anand9899/EventFeedbackManagementSystem" target="_blank" rel="noreferrer">
                Event Feedback System ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/Anand9899/Simon-Game" target="_blank" rel="noreferrer">
                Simon Game Repo ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/Anand9899/E-Tutorial-" target="_blank" rel="noreferrer">
                E-Tutorial Portal Repo ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          {/* Copyright Notice */}
          <p className="copyright-text">
            © {new Date().getFullYear()} Anand Kumar Mishra. All rights reserved.
          </p>

          {/* Back to Top Smooth Button */}
          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
            <span>Back to Top</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
