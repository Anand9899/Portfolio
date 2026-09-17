/**
 * Experience Component - Industry Training & Full Stack Internship
 * Highlights professional experience at Sysslan IT Solutions with tech stack,
 * core responsibilities, and certificate credentials.
 */
function Experience() {
  const experiences = [
    {
      role: 'Full Stack Development Intern',
      company: 'Sysslan IT Solutions',
      period: 'Aug 2026 – Sep 2026',
      type: 'Internship',
      location: 'Noida, UP / Remote',
      certificate: 'Sysslan IT Solutions | Full Stack Development Sep 2026',
      summary: 'Completed an intensive Full Stack Development Internship focusing on end-to-end web application architecture, responsive user interface engineering, and robust backend REST API integrations.',
      bullets: [
        'Completed a Full Stack Development Internship involving practical web application development.',
        'Worked on responsive user interface development and frontend application development using modern web standards.',
        'Gained practical exposure to backend services and RESTful APIs architecture.',
        'Worked with database integration, authentication, debugging, and testing.'
      ],
      skills: [
        'ASP.NET Core',
        'C#',
        'RESTful APIs',
        'HTML5',
        'CSS3',
        'JavaScript',
        'Bootstrap',
        'SQL Server',
        'CRUD Operations',
        'Git & GitHub',
        'Postman'
      ],
      highlights: [
        { label: 'Domain', val: 'Full Stack Web Development' },
        { label: 'Role Type', val: 'Practical Industry Internship' },
        { label: 'Focus', val: 'Frontend UI & REST API Integration' }
      ]
    }
  ]

  return (
    <section id="experience" className="section-wrapper experience-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>02</span>
          <span className="tag-line"></span>
          <span>WORK &amp; INTERNSHIP</span>
        </div>
        <h2 className="section-title">
          Work <span>Experience</span>
        </h2>
        <p className="section-subtitle">
          Practical industry training, full-stack software development, and real-world web application exposure.
        </p>
      </div>

      {/* Experience Showcase Card */}
      <div className="experience-container">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            {/* Top Bar: Company, Role & Duration */}
            <div className="experience-card-header">
              <div className="exp-company-info">
                <div className="exp-icon-box">🏢</div>
                <div>
                  <h3 className="exp-role-title">{exp.role}</h3>
                  <div className="exp-company-name">
                    <span>{exp.company}</span>
                    <span className="exp-dot-sep">•</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="exp-meta-badges">
                <span className="exp-period-badge">{exp.period}</span>
                <span className="exp-type-badge">✓ Verified {exp.type}</span>
              </div>
            </div>

            {/* Overview Summary */}
            <p className="exp-summary-text">{exp.summary}</p>

            {/* Key Responsibilities & Bullet Points */}
            <div className="exp-responsibilities">
              <h4 className="exp-subheading">Key Contributions &amp; Responsibilities:</h4>
              <ul className="exp-bullets-list">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="exp-bullet-item">
                    <span className="exp-bullet-icon">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Metrics / Highlights Row */}
            <div className="exp-highlights-row">
              {exp.highlights.map((h, hIdx) => (
                <div key={hIdx} className="exp-highlight-chip">
                  <span className="chip-label">{h.label}:</span>
                  <span className="chip-val">{h.val}</span>
                </div>
              ))}
            </div>

            {/* Technologies Used Pills */}
            <div className="exp-skills-section">
              <span className="skills-title">Technologies &amp; Tools Used:</span>
              <div className="exp-skills-pills">
                {exp.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="exp-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate Verification Footer */}
            <div className="exp-certificate-banner">
              <div className="cert-banner-left">
                <span className="cert-badge-icon">📜</span>
                <div>
                  <span className="cert-banner-title">Internship Credential</span>
                  <span className="cert-banner-desc">{exp.certificate}</span>
                </div>
              </div>
              <span className="cert-status-tag">Verified Certificate</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
