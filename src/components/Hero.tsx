import { useState, useEffect } from 'react'

/**
 * Hero Component - Home Landing Section
 * Features:
 * - Live pulsating availability status badge (Noida, UP)
 * - Animated rotating role headlines (.NET Developer, ASP.NET Core Specialist, etc.)
 * - Professional bio summary
 * - Key Action Buttons: "View Projects" and "Download Resume"
 * - Quick metric counters (MCA '27, BCA '25, 4+ Certifications, Location)
 * - Interactive C# / JSON Developer Terminal Widget
 */
function Hero() {
  // Dynamic animated rotating roles
  const roles = [
    'Full Stack .NET Developer',
    'ASP.NET Core & Web API Developer',
    'ASP.NET MVC 5 & C# Specialist',
    'Final Year MCA Student (2027)'
  ]

  // State to track current role index for the slider
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // State for the interactive code terminal tabs ('csharp' or 'json')
  const [activeTab, setActiveTab] = useState<'csharp' | 'json'>('csharp')

  // Timer interval to cycle through role titles every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section id="home" className="hero-section">
      {/* Ambient background glow effects */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="hero-grid">
        {/* Left Column: Introduction & CTAs */}
        <div className="hero-content">
          {/* Availability Status Badge */}
          <div className="status-pill">
            <span className="pulse-dot"></span>
            <span className="status-text">Available for Full-time Roles &amp; Internships • India &amp; Remote</span>
          </div>

          {/* Subheading Greeting */}
          <div className="hero-greeting">
            <span className="greeting-line"></span>
            <span>HELLO, WORLD! I AM</span>
          </div>

          {/* Hero Name Heading */}
          <h1 className="hero-title">
            Anand Kumar
            <span className="gradient-text"> Mishra</span>
            <span className="dot-accent">.</span>
          </h1>

          {/* Animated Dynamic Role Subtitle */}
          <div className="role-slider-wrapper">
            <span className="role-prefix">&gt; </span>
            <span className="role-dynamic">{roles[currentRoleIndex]}</span>
          </div>

          {/* Professional Summary Paragraph */}
          <p className="hero-bio">
            Final-year MCA student (Expected 2027) at <strong>Mangalayatan University, Aligarh</strong> specializing in 
            <strong> Full Stack .NET Development</strong>. Skilled in <strong>ASP.NET Core, ASP.NET MVC 5, C#, Web API, SQL Server, MySQL, HTML, CSS, JavaScript, and Bootstrap</strong>. Passionate about engineering scalable, responsive, and user-friendly web applications using <strong>MVC Architecture, RESTful APIs, and CRUD operations</strong>.
          </p>

          {/* Main Action Buttons */}
          <div className="hero-cta-group">
            {/* Smooth scroll to Projects section */}
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* Direct Resume Download Link */}
            <a
              href="/Anand%20Kumar%20Mishra.pdf"
              download="Anand_Kumar_Mishra_Resume.pdf"
              className="btn-secondary"
              title="Download Anand's official Resume PDF"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          {/* Quick Metrics & Summary Cards */}
          <div className="hero-stats-row">
            <div className="stat-card">
              <span className="stat-number">MCA '27</span>
              <span className="stat-label">Mangalayatan Univ</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">BCA '25</span>
              <span className="stat-label">MMHAPU Patna</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4+</span>
              <span className="stat-label">Industry Certifications</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Noida, UP</span>
              <span className="stat-label">Current Location</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Terminal Card */}
        <div className="hero-terminal-wrapper">
          <div className="code-terminal">
            {/* Terminal Window Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">
                <span className="terminal-file-icon">⚡</span>
                <span>AnandMishra.cs</span>
              </div>
              <div className="terminal-tabs">
                <button
                  className={`tab-btn ${activeTab === 'csharp' ? 'active' : ''}`}
                  onClick={() => setActiveTab('csharp')}
                >
                  C#
                </button>
                <button
                  className={`tab-btn ${activeTab === 'json' ? 'active' : ''}`}
                  onClick={() => setActiveTab('json')}
                >
                  JSON
                </button>
              </div>
            </div>

            {/* Terminal Code Viewer with Syntax Highlights */}
            <div className="terminal-body font-mono">
              {activeTab === 'csharp' ? (
                <div className="code-content">
                  <div className="code-line"><span className="c-keyword">using</span> <span className="c-namespace">Microsoft.AspNetCore.Mvc</span>;</div>
                  <div className="code-line"><span className="c-keyword">using</span> <span className="c-namespace">Anand.Portfolio.Models</span>;</div>
                  <div className="code-line">&nbsp;</div>
                  <div className="code-line"><span className="c-attr">[ApiController]</span></div>
                  <div className="code-line"><span className="c-attr">[Route(</span><span className="c-str">"api/v1/developer"</span><span className="c-attr">)]</span></div>
                  <div className="code-line"><span className="c-keyword">public class</span> <span className="c-class">ProfileController</span> : <span className="c-class">ControllerBase</span></div>
                  <div className="code-line">{'{'}</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-attr">[HttpGet(</span><span className="c-str">"resume-details"</span><span className="c-attr">)]</span></div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-keyword">public</span> <span className="c-class">ActionResult</span>&lt;<span className="c-class">Candidate</span>&gt; <span className="c-method">GetDetails</span>()</div>
                  <div className="code-line">&nbsp;&nbsp;{'{'}</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-keyword">return</span> <span className="c-method">Ok</span>(<span className="c-keyword">new</span> <span className="c-class">Candidate</span></div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;{'{'}</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name = <span className="c-str">"Anand Kumar Mishra"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Role = <span className="c-str">"Full Stack .NET Developer"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Phone = <span className="c-str">"+91-95769 89908"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email = <span className="c-str">"anandmishra02.com@gmail.com"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location = <span className="c-str">"Noida, UP"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Education = <span className="c-str">"MCA (Mangalayatan University, 2027)"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skills = <span className="c-keyword">new</span>[] {'{'} <span className="c-str">"ASP.NET Core"</span>, <span className="c-str">"C#"</span>, <span className="c-str">"SQL Server"</span>, <span className="c-str">"MVC"</span> {'}'}</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;{'}'});</div>
                  <div className="code-line">&nbsp;&nbsp;{'}'}</div>
                  <div className="code-line">{'}'}</div>
                </div>
              ) : (
                <div className="code-content">
                  <div className="code-line">{'{'}</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-prop">"name"</span>: <span className="c-str">"Anand Kumar Mishra"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-prop">"designation"</span>: <span className="c-str">"Full Stack .NET Developer"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-prop">"contact"</span>: {'{'}</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-prop">"phone"</span>: <span className="c-str">"+91-9576989908"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-prop">"email"</span>: <span className="c-str">"anandmishra02.com@gmail.com"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-prop">"location"</span>: <span className="c-str">"Noida, UP, India"</span></div>
                  <div className="code-line">&nbsp;&nbsp;{'}'},</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-prop">"degrees"</span>: [</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"MCA - Mangalayatan University (2027)"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"BCA - MMHAPU Patna (2025)"</span></div>
                  <div className="code-line">&nbsp;&nbsp;],</div>
                  <div className="code-line">&nbsp;&nbsp;<span className="c-prop">"certifications"</span>: [</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"Full Stack Web Dev (Apna College 2024)"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"DSA with Java (Apna College 2024)"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"Java Expert (Ducat 2025)"</span>,</div>
                  <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-str">"Power BI (Skill Course 2025)"</span></div>
                  <div className="code-line">&nbsp;&nbsp;]</div>
                  <div className="code-line">{'}'}</div>
                </div>
              )}
            </div>

            {/* Terminal Window Footer */}
            <div className="terminal-footer">
              <span className="footer-status">● Build: Succeeded | .NET 8.0 SDK</span>
              <a
                href="https://github.com/Anand9899"
                target="_blank"
                rel="noreferrer"
                className="terminal-link"
              >
                github.com/Anand9899 ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
