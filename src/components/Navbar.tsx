import { useState, useEffect } from 'react'

// Props interface for Navbar component
type NavbarProps = {
  darkMode: boolean           // Current theme status
  toggleTheme: () => void     // Function to switch dark/light mode
  activeSection: string       // Currently viewed section ID from ScrollSpy
}

/**
 * Navbar Component
 * Features:
 * - Brand logo with .NET badge
 * - Desktop navigation with active section indicator
 * - Dark/Light theme toggle switch
 * - Mobile responsive hamburger toggle and drawer menu
 * - Blur backdrop on scroll
 */
function Navbar({ darkMode, toggleTheme, activeSection }: NavbarProps) {
  // State for mobile drawer open/close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // State to apply blur & shadow when page is scrolled down
  const [scrolled, setScrolled] = useState(false)

  // Detect window scroll position to toggle header background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation Links configuration
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About & Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'code-showcase', label: 'Architecture' },
    { id: 'contact', label: 'Contact' },
  ]

  // Close mobile drawer when a nav link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="navbar-logo" onClick={handleLinkClick}>
          <span className="logo-badge">.NET</span>
          <span className="logo-name">ANAND<span>.</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : ''}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Switch & Mobile Hamburger */}
        <div className="navbar-actions">
          {/* Theme Toggle Button (Sun/Moon icons) */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : ''}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar