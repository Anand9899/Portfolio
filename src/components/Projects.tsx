import { useState } from 'react'

// Available Project Categories for filtering
type ProjectCategory = 'all' | 'fullstack' | 'dotnet' | 'frontend' | 'java'

// Structure of each project showcase item
type ProjectItem = {
  id: string
  number: string
  title: string
  subtitle: string
  category: 'fullstack' | 'dotnet' | 'frontend' | 'java'
  categoryLabel: string
  description: string
  resumeBullets: string[]
  techStack: string[]
  githubUrl: string
  featured: boolean
}

/**
 * Projects Component - Featured Engineering Work
 * Features:
 * - Interactive filter tabs (Full Stack, .NET, Frontend/JS, Java/SQL)
 * - Exact resume implementation bullet points
 * - Tech stack pill tags
 * - Direct GitHub repository buttons
 */
function Projects() {
  // State for project filtering (defaults to 'all')
  const [filter, setFilter] = useState<ProjectCategory>('all')

  // Real projects list from Anand's resume and GitHub
  const projects: ProjectItem[] = [
    {
      id: 'event-feedback-management-system',
      number: '01',
      title: 'Event Feedback Management System',
      subtitle: 'Full-stack event discovery & feedback platform with JWT Authentication',
      category: 'fullstack',
      categoryLabel: 'Node.js & MongoDB',
      description: 'A full-stack Event Feedback Management System built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication. It allows users to explore events, submit feedback, and provide ratings.',
      resumeBullets: [
        'Architected a full-stack Event Feedback Management System using Node.js, Express.js, and MongoDB.',
        'Implemented secure user authentication and authorization using JSON Web Tokens (JWT) and password hashing.',
        'Designed responsive UI using HTML5, CSS3, and modern JavaScript for event discovery and feedback submission.',
        'Engineered RESTful API endpoints for managing events, feedback ratings, and user reviews.',
        'Structured MongoDB database schemas with Mongoose for efficient data modeling and persistence.'
      ],
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'REST APIs', 'Mongoose'],
      githubUrl: 'https://github.com/Anand9899/EventFeedbackManagementSystem',
      featured: true
    },
    {
      id: 'simon-game',
      number: '02',
      title: 'Simon Game (Interactive Web App)',
      subtitle: 'Dynamic browser game with pattern sequence generation and audio-visual feedback',
      category: 'frontend',
      categoryLabel: 'HTML, CSS & JS',
      description: 'An engaging interactive Simon memory game built with vanilla web technologies, implementing sequence matching algorithms and event handling.',
      resumeBullets: [
        'Developed an interactive Simon Game using HTML, CSS, and JavaScript.',
        'Implemented random color sequence generation and user input validation for gameplay.',
        'Applied DOM Manipulation and Event Handling to create an interactive user experience.',
        'Designed a responsive and visually engaging interface with level progression and game-over functionality.'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'DOM Manipulation', 'Event Handling'],
      githubUrl: 'https://github.com/Anand9899/Simon-Game',
      featured: true
    },
    {
      id: 'crn-product-api',
      number: '03',
      title: 'CRN Product API (.NET 8)',
      subtitle: 'RESTful API engineered with ASP.NET Core, EF Core, SQL Server & JWT',
      category: 'dotnet',
      categoryLabel: 'ASP.NET Core Web API',
      description: 'Enterprise RESTful Web API for product catalog and inventory management, featuring token authentication, Swagger documentation, and Docker support.',
      resumeBullets: [
        'Built using ASP.NET Core .NET 8, C#, and Entity Framework Core.',
        'Implemented secure JWT Bearer Token authentication and authorization.',
        'Configured SQL Server database with Code-First migrations.',
        'Automated Swagger OpenAPI documentation and Docker containerization.'
      ],
      techStack: ['.NET 8', 'ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'JWT Auth', 'Docker', 'Swagger'],
      githubUrl: 'https://github.com/Anand9899/CRN.ProductAPI',
      featured: false
    },
    {
      id: 'e-tutorial',
      number: '04',
      title: 'E-Tutorial Learning Management Platform',
      subtitle: 'Full-featured web portal for online learning and student course management',
      category: 'java',
      categoryLabel: 'Java & MySQL',
      description: 'Dynamic education platform utilizing Java Servlets, JSP, JDBC, and MySQL for course publishing, notes access, and student record management.',
      resumeBullets: [
        'Developed using Java Servlets, JSP, JDBC, and MySQL.',
        'Implemented student course enrollment and administrative content publishing.',
        'Designed normalized relational MySQL database schemas.',
        'Secure session management and user authentication filters.'
      ],
      techStack: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/Anand9899/E-Tutorial-',
      featured: false
    }
  ]

  // Filter projects according to the selected tab
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section-wrapper projects-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>04</span>
          <span className="tag-line"></span>
          <span>KEY PROJECTS</span>
        </div>
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        <p className="section-subtitle">
          Real-world applications showcasing expertise in Full Stack Development, ASP.NET Core, Node.js, MongoDB, SQL Server, and modern web interfaces.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="projects-filter-tabs">
        <button
          className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects ({projects.length})
        </button>
        <button
          className={`filter-tab-btn ${filter === 'fullstack' ? 'active' : ''}`}
          onClick={() => setFilter('fullstack')}
        >
          Full Stack ({projects.filter(p => p.category === 'fullstack').length})
        </button>
        <button
          className={`filter-tab-btn ${filter === 'dotnet' ? 'active' : ''}`}
          onClick={() => setFilter('dotnet')}
        >
          ASP.NET &amp; C# ({projects.filter(p => p.category === 'dotnet').length})
        </button>
        <button
          className={`filter-tab-btn ${filter === 'frontend' ? 'active' : ''}`}
          onClick={() => setFilter('frontend')}
        >
          Frontend &amp; JS ({projects.filter(p => p.category === 'frontend').length})
        </button>
        <button
          className={`filter-tab-btn ${filter === 'java' ? 'active' : ''}`}
          onClick={() => setFilter('java')}
        >
          Java &amp; SQL ({projects.filter(p => p.category === 'java').length})
        </button>
      </div>

      {/* Projects Cards Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className={`project-showcase-card ${project.featured ? 'featured-card' : ''}`}>
            {/* Card Header: Meta Category Badge & GitHub Link */}
            <div className="project-card-header">
              <div className="project-meta">
                <span className="project-index">{project.number}</span>
                <span className="project-badge">{project.categoryLabel}</span>
                {project.featured && <span className="featured-pill">★ Key Project</span>}
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="github-icon-btn"
                title="View on GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>

            {/* Card Body: Title, Subtitle, Description & Highlights */}
            <div className="project-card-body">
              <h3 className="project-heading">{project.title}</h3>
              <h4 className="project-tagline">{project.subtitle}</h4>
              <p className="project-desc">{project.description}</p>

              {/* Exact Resume Implementation Bullets */}
              <div className="project-highlights">
                <span className="highlights-title">Implementation Highlights:</span>
                <ul>
                  {project.resumeBullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="project-tech-tags">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>

            {/* Card Footer: GitHub Link Action */}
            <div className="project-card-footer">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-link-primary"
                title="View Source Code on GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>SOURCE CODE</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
