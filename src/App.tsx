import { useState, useEffect } from 'react'
import './App.css'

// Importing all modular portfolio components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import CodeShowcase from './components/CodeShowcase'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * Main App Component - Portfolio root container
 * Manages global theme state (Dark/Light mode), active section tracking (ScrollSpy),
 * and global toast notifications.
 */
function App() {
  // 1. Theme State: Initializes from LocalStorage or defaults to 'dark'
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('anand_portfolio_theme')
    return saved ? saved === 'dark' : true
  })

  // 2. Active Section State: Tracks current visible section for Navbar link highlighting
  const [activeSection, setActiveSection] = useState<string>('home')

  // 3. Toast Message State: Displays popup alerts (e.g. Email/Phone copied)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Sync theme changes with LocalStorage
  useEffect(() => {
    localStorage.setItem('anand_portfolio_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Function to toggle between Dark and Light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  // Function to trigger a toast notification (auto disappears after 3.5 seconds)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Helper function to copy email address to clipboard with feedback
  const handleCopyEmail = () => {
    const email = 'anandmishra02.com@gmail.com'
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied: anandmishra02.com@gmail.com')
      }).catch(() => {
        showToast('Email: anandmishra02.com@gmail.com')
      })
    } else {
      showToast('Email: anandmishra02.com@gmail.com')
    }
  }

  // Helper function to copy phone number to clipboard with feedback
  const handleCopyPhone = () => {
    const phone = '+919576989908'
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone).then(() => {
        showToast('✓ Phone copied: +91 95769 89908')
      }).catch(() => {
        showToast('Phone: +91 95769 89908')
      })
    } else {
      showToast('Phone: +91 95769 89908')
    }
  }

  // ScrollSpy Effect: Dynamically updates the active navigation link as user scrolls
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'certifications', 'projects', 'code-showcase', 'contact']
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollSpy)
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Fixed Sticky Header Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 0. Hero / Home Section */}
        <Hero />

        {/* 1. About Anand & Education Roadmap */}
        <About />

        {/* 2. Work & Internship Experience */}
        <Experience />

        {/* 3. Technical Skills Matrix */}
        <Skills />

        {/* 4. Industry Certifications */}
        <Certifications />

        {/* 5. Featured Projects Showcase */}
        <Projects />

        {/* 6. Clean Code & Architecture Samples */}
        <CodeShowcase />

        {/* 7. Contact & Direct Message Form */}
        <Contact onCopyEmail={handleCopyEmail} onCopyPhone={handleCopyPhone} showToast={showToast} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/919576989908?text=Hi%20Anand,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat with Anand on WhatsApp"
      >
        <span className="whatsapp-pulse"></span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="floating-tooltip">Chat on WhatsApp</span>
      </a>

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="toast-container" role="status" aria-live="polite">
          <div className="toast-item">
            <span className="toast-icon">⚡</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App