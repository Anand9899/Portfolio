// Data structure for Certification cards
type CertificationItem = {
  title: string
  issuer: string
  year: string
  icon: string
  badgeColor: string
  skillsCovered: string[]
  description: string
}

/**
 * Certifications Component - Professional Credentials & Specialized Training
 * Displays industry certifications from Apna College, Ducat, and Skill Course.
 */
function Certifications() {
  // Certified technical credentials from Anand's official resume
  const certs: CertificationItem[] = [
    {
      title: 'Full Stack Web Development',
      issuer: 'Apna College',
      year: '2024',
      icon: '💻',
      badgeColor: '#f59e0b',
      skillsCovered: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Node & Express', 'MongoDB'],
      description: 'Comprehensive program covering frontend and backend engineering, modern JavaScript, component architectures, and responsive web design.'
    },
    {
      title: 'DSA with Java',
      issuer: 'Apna College',
      year: '2024',
      icon: '⚡',
      badgeColor: '#6366f1',
      skillsCovered: ['Data Structures', 'Algorithms', 'Time & Space Complexity', 'Recursion', 'OOP'],
      description: 'In-depth problem solving, algorithm design, arrays, linked lists, stacks, queues, trees, searching, sorting, and optimization.'
    },
    {
      title: 'Java Expert',
      issuer: 'Ducat',
      year: '2025',
      icon: '☕',
      badgeColor: '#ec4899',
      skillsCovered: ['Core Java', 'Advanced Java', 'JSP & Servlets', 'JDBC', 'Multi-threading', 'MVC'],
      description: 'Advanced enterprise Java application development, database connectivity via JDBC, server-side web components, and MVC architecture.'
    },
    {
      title: 'Microsoft Power BI',
      issuer: 'Skill Course',
      year: '2025',
      icon: '📊',
      badgeColor: '#10b981',
      skillsCovered: ['Data Modeling', 'DAX Queries', 'Business Intelligence', 'Interactive Dashboards', 'Reports'],
      description: 'Data transformation, relational analytics, building executive dashboards, and visual business intelligence reports.'
    }
  ]

  return (
    <section id="certifications" className="section-wrapper certifications-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>03</span>
          <span className="tag-line"></span>
          <span>PROFESSIONAL CREDENTIALS</span>
        </div>
        <h2 className="section-title">
          Certifications &amp; <span>Training</span>
        </h2>
        <p className="section-subtitle">
          Industry recognized certifications and specialized technical training completed from verified institutes.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="certifications-grid">
        {certs.map((cert, index) => (
          <div key={index} className="certification-card">
            {/* Card Header: Icon & Completion Year */}
            <div className="cert-card-header">
              <div className="cert-icon-box">{cert.icon}</div>
              <div className="cert-year-badge">{cert.year}</div>
            </div>

            {/* Title & Issuing Organization */}
            <h3 className="cert-title">{cert.title}</h3>
            <div className="cert-issuer">
              <span>Issued by:</span>
              <strong>{cert.issuer}</strong>
            </div>

            {/* Description */}
            <p className="cert-desc">{cert.description}</p>

            {/* Covered Skills Badges */}
            <div className="cert-tags">
              {cert.skillsCovered.map((s, idx) => (
                <span key={idx} className="cert-tag-pill">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
