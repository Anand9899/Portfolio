import { useState, useMemo } from 'react'

type ProjectCategory = 'all' | 'fullstack' | 'dotnet' | 'nodejs' | 'frontend' | 'ai' | 'java'

// Structure of each project showcase item
export type ProjectItem = {
  id: string
  number: string
  title: string
  subtitle: string
  category: ProjectCategory
  categories: ProjectCategory[]
  categoryLabel: string
  description: string
  resumeBullets: string[]
  techStack: string[]
  githubUrl: string
  liveUrl?: string
  featured: boolean
}

/**
 * Projects Component - Featured GitHub & Engineering Work
 * Showcases all public repositories and engineering projects from https://github.com/Anand9899
 */
function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Complete list of projects from Anand's GitHub profile (github.com/Anand9899)
  const projects: ProjectItem[] = [
    {
      id: 'application-form-management-system',
      number: '01',
      title: 'Application-Form-Management-System',
      subtitle: 'Clean Architecture employment recruitment platform built with React 19, ASP.NET Core 10 & SQL Server',
      category: 'dotnet',
      categories: ['fullstack', 'dotnet'],
      categoryLabel: 'Full Stack .NET & React 19',
      description: 'An enterprise-grade employment application and recruitment tracking system engineered with Clean Architecture principles, React 19 frontend, ASP.NET Core backend, Entity Framework Core, and SQL Server for end-to-end applicant tracking.',
      resumeBullets: [
        'Architected using Clean Architecture separating Domain, Application, Infrastructure, and API layers.',
        'Engineered responsive React 19 UI with multi-step candidate application workflows and real-time validation.',
        'Implemented ASP.NET Core REST APIs with Entity Framework Core code-first database migrations.',
        'Integrated relational SQL Server schemas with indexed queries and recruiter review dashboards.'
      ],
      techStack: ['React 19', 'ASP.NET Core', 'C#', 'Clean Architecture', 'Entity Framework Core', 'SQL Server', 'REST API', 'TypeScript'],
      githubUrl: 'https://github.com/Anand9899/Application-Form-Management-System',
      featured: true
    },
    {
      id: 'ecommerce-web-application',
      number: '02',
      title: 'E-Commerce',
      subtitle: 'Full-stack retail web application engineered with ASP.NET Core 8, C#, EF Core & SQL Server',
      category: 'fullstack',
      categories: ['fullstack', 'dotnet'],
      categoryLabel: 'Full Stack .NET 8',
      description: 'A robust, full-stack e-commerce web application engineered with ASP.NET Core 8 and C#, featuring role-based authorization, catalog management, dynamic shopping cart, wishlist, coupons, and SQL Server persistence.',
      resumeBullets: [
        'Developed a full-stack e-commerce web application using ASP.NET Core 8, C#, and Entity Framework Core.',
        'Implemented user authentication, role-based authorization, product management, shopping cart, and wishlist functionalities.',
        'Designed responsive UI using HTML5, CSS3, JavaScript, and Bootstrap 5.',
        'Integrated SQL Server database with Entity Framework Core for efficient CRUD operations and data management.',
        'Applied MVC and layered architecture concepts to maintain clean, scalable, and maintainable code structure.'
      ],
      techStack: ['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'SQL Server', 'Bootstrap 5', 'JavaScript', 'HTML5', 'CSS3', 'MVC Architecture', 'Role-Based Auth'],
      githubUrl: 'https://github.com/Anand9899/E-Commerce',
      featured: true
    },
    {
      id: 'hireflow',
      number: '03',
      title: 'HireFlow',
      subtitle: 'Full-stack applicant portal engineered with ASP.NET Core Web API, EF Core & SQLite',
      category: 'dotnet',
      categories: ['fullstack', 'dotnet'],
      categoryLabel: 'Full Stack .NET & SQLite',
      description: 'A recruitment and applicant tracking portal engineered with C#, ASP.NET Core Web API, Entity Framework Core, and SQLite with a responsive frontend featuring resume document validation and applicant status pipelines.',
      resumeBullets: [
        'Engineered RESTful endpoints in ASP.NET Core for job posting, candidate registration, and application lifecycle tracking.',
        'Implemented secure resume upload handling with MIME type validation for PDF and DOCX files.',
        'Designed intuitive recruiter dashboard to review candidates, filter job categories, and update hiring stages.',
        'Implemented lightweight, cross-platform persistence using Entity Framework Core with SQLite.'
      ],
      techStack: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQLite', 'RESTful API', 'JavaScript', 'HTML5', 'CSS3', 'Document Upload'],
      githubUrl: 'https://github.com/Anand9899/HireFlow',
      featured: true
    },
    {
      id: 'event-feedback-management-system',
      number: '04',
      title: 'EventFeedbackManagementSystem',
      subtitle: 'Full-stack attendee evaluation platform engineered with Node.js, Express, MongoDB & JWT',
      category: 'nodejs',
      categories: ['fullstack', 'nodejs'],
      categoryLabel: 'Full Stack Node.js & MongoDB',
      description: 'A full-stack Event Feedback Management System built with Node.js, Express.js, MongoDB, and JWT authentication. It enables attendees to submit granular event evaluations and provides an authenticated admin dashboard for analytics.',
      resumeBullets: [
        'Architected RESTful backend with Express.js and Node.js implementing secure JSON Web Token (JWT) authentication.',
        'Configured MongoDB with Mongoose schemas for flexible event definitions and participant survey feedback.',
        'Developed protected administrator dashboard to visualize real-time feedback submissions and sentiment ratings.',
        'Built responsive frontend views with client-side form validation and interactive star ratings.'
      ],
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication', 'REST API', 'JavaScript', 'HTML5', 'CSS3'],
      githubUrl: 'https://github.com/Anand9899/EventFeedbackManagementSystem',
      featured: true
    },
    {
      id: 'crn-product-api',
      number: '05',
      title: 'CRN.ProductAPI',
      subtitle: 'RESTful API engineered with ASP.NET Core, EF Core, SQL Server, Docker & Swagger',
      category: 'dotnet',
      categories: ['dotnet'],
      categoryLabel: 'ASP.NET Core Web API',
      description: 'Enterprise RESTful Web API for product catalog and inventory management, featuring token authentication, Code-First migrations, automated Swagger documentation, and Docker containerization.',
      resumeBullets: [
        'Built using ASP.NET Core .NET 8, C#, and Entity Framework Core with Code-First database migrations.',
        'Implemented secure JWT Bearer Token authentication and claims-based endpoint authorization.',
        'Automated Swagger OpenAPI interactive documentation and containerized environment via Docker.',
        'Integrated comprehensive unit and endpoint test suites ensuring high availability and reliability.'
      ],
      techStack: ['.NET 8', 'ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'JWT Auth', 'Docker', 'Swagger OpenAPI'],
      githubUrl: 'https://github.com/Anand9899/CRN.ProductAPI',
      featured: false
    },
    {
      id: 'e-tutorial',
      number: '06',
      title: 'E-Tutorial-',
      subtitle: 'Web-based learning portal built with Java Servlets, JSP, JDBC, and MySQL',
      category: 'java',
      categories: ['fullstack', 'java'],
      categoryLabel: 'Full Stack Java Developer',
      description: 'Dynamic education platform utilizing Java Servlets, JSP, JDBC, and MySQL for course publishing, notes access, student enrollment, and academic content management.',
      resumeBullets: [
        'Developed backend using Java Servlets, Java Server Pages (JSP), and JDBC database connectivity.',
        'Implemented student course enrollment, downloadable study material, and administrative content authoring.',
        'Designed normalized relational MySQL database schemas with relational integrity constraints.',
        'Configured secure session management and authentication filters for role-based access control.'
      ],
      techStack: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'MVC Architecture', 'HTML5', 'CSS3'],
      githubUrl: 'https://github.com/Anand9899/E-Tutorial-',
      featured: false
    },
    {
      id: 'ai-assistance',
      number: '07',
      title: 'AI-Assistance',
      subtitle: 'Hands-free browser AI assistant with real-time speech recognition & voice synthesis',
      category: 'ai',
      categories: ['ai'],
      categoryLabel: 'AI & Web Speech API',
      description: 'A responsive voice-controlled AI web assistant leveraging modern browser Speech Recognition and Speech Synthesis APIs to execute voice commands, perform web searches, and provide audible feedback.',
      resumeBullets: [
        'Integrated browser Web Speech API (webkitSpeechRecognition) for hands-free audio command capture.',
        'Implemented SpeechSynthesisUtterance for dynamic, lifelike vocal output and conversational responses.',
        'Engineered intent parsing engine for queries like weather, Google searches, YouTube navigation, and time/date.',
        'Designed futuristic voice visualizer UI with audio pulse feedback during active listening states.'
      ],
      techStack: ['JavaScript (ES6+)', 'Web Speech API', 'Speech Recognition', 'Speech Synthesis', 'DOM API', 'CSS3 Animations'],
      githubUrl: 'https://github.com/Anand9899/AI-Assistance',
      featured: false
    },
    {
      id: 'portfolio-showcase',
      number: '08',
      title: 'Portfolio',
      subtitle: 'Modern personal portfolio website with dark/light themes, animations & interactive UI',
      category: 'frontend',
      categories: ['frontend'],
      categoryLabel: 'React 19 & TypeScript',
      description: 'The very portfolio website you are browsing! Engineered with React 19, TypeScript, and Vite, featuring custom glassmorphism design tokens, interactive project filters, dark/light theme switching, and responsive layouts.',
      resumeBullets: [
        'Built with React 19, TypeScript, and Vite for blazing-fast development and build performance.',
        'Engineered dual dark and light theme toggle with persistent LocalStorage state.',
        'Implemented responsive glassmorphism UI system with zero heavy CSS framework bloat.',
        'Designed interactive code showcases, skill meters, and direct GitHub repository integrations.'
      ],
      techStack: ['React 19', 'TypeScript', 'Vite', 'HTML5', 'CSS3 Custom Properties', 'Responsive UI', 'Vercel'],
      githubUrl: 'https://github.com/Anand9899/Portfolio',
      liveUrl: 'https://portfolio-anand9899.vercel.app',
      featured: false
    },
    {
      id: 'birthday-celebration-gala',
      number: '09',
      title: 'birthday-celebration-gala',
      subtitle: 'Rich celebration portal with dynamic cake, audio jukebox, theme switcher & fireworks',
      category: 'frontend',
      categories: ['frontend'],
      categoryLabel: 'Interactive Web & Audio',
      description: 'An interactive, visually rich celebration web application featuring customizable cake & age candles, multi-track background audio jukebox, dynamic themes, particle fireworks simulation, and interactive balloon game.',
      resumeBullets: [
        'Engineered particle physics system on HTML5 Canvas for real-time celebration fireworks & confetti.',
        'Built custom multi-track Web Audio jukebox with playlist controls, play/pause, and volume fades.',
        'Designed interactive cake with blow-out candle interactions and customizable celebration themes.',
        'Implemented dynamic state management in vanilla JavaScript for instant theme and sound transitions.'
      ],
      techStack: ['JavaScript (ES6+)', 'HTML5 Canvas', 'Web Audio API', 'CSS3 Keyframes', 'Interactive UI', 'Responsive Design'],
      githubUrl: 'https://github.com/Anand9899/birthday-celebration-gala',
      featured: false
    },
    {
      id: 'simon-game',
      number: '10',
      title: 'Simon-Game',
      subtitle: 'Dynamic browser memory game with pattern sequence generation and audio cues',
      category: 'frontend',
      categories: ['frontend'],
      categoryLabel: 'HTML, CSS & JS',
      description: 'An interactive Simon memory game built with HTML, CSS, and JavaScript, implementing random color sequence generation, audio feedback, DOM event handling, and level progression.',
      resumeBullets: [
        'Implemented algorithmic random color sequence generation and user input comparison logic.',
        'Applied DOM Manipulation and Event Listeners for sub-millisecond click response and sound triggers.',
        'Designed a responsive and visually engaging interface with progressive difficulty levels and game-over state.',
        'Integrated cross-browser audio cues and flashing animation states on user interaction.'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'DOM Manipulation', 'Event Handling', 'Audio Synthesis'],
      githubUrl: 'https://github.com/Anand9899/Simon-Game',
      featured: false
    },
    {
      id: 'digital-clock',
      number: '11',
      title: 'Digital-Clock',
      subtitle: 'Sleek neon glowing clock with live 24h/12h time tracking and date synchronization',
      category: 'frontend',
      categories: ['frontend'],
      categoryLabel: 'JavaScript & CSS3',
      description: 'A modern digital clock web application with glowing neon aesthetics, real-time seconds ticking, AM/PM calculation, and formatted date calendar display.',
      resumeBullets: [
        'Implemented JavaScript setInterval and Date object synchronization for precision timekeeping.',
        'Styled with custom CSS neon glow filters, typography styling, and glassmorphic card containers.',
        'Designed lightweight and accessible responsive layout compatible with mobile and desktop.'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3 Glow Effects', 'Date API', 'Responsive Layout'],
      githubUrl: 'https://github.com/Anand9899/Digital-Clock',
      featured: false
    },
    {
      id: 'kids-app',
      number: '12',
      title: 'Kids-App',
      subtitle: 'Educational interactive web application designed for children to learn alphabets & numbers',
      category: 'frontend',
      categories: ['frontend'],
      categoryLabel: 'Interactive Learning',
      description: 'A colorful, interactive learning application designed for children, featuring audio pronunciation, alphabet/number flashcards, and playful animations.',
      resumeBullets: [
        'Created engaging child-friendly interface with vibrant colors, rounded shapes, and playful typography.',
        'Implemented interactive click sound effects and voice pronunciation on alphabet cards.',
        'Engineered responsive layout adaptable for touchscreens, tablets, and desktop browsers.'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3 Animations', 'Audio Integration', 'Touch-friendly UI'],
      githubUrl: 'https://github.com/Anand9899/Kids-App',
      featured: false
    }
  ]

  // Filter projects according to category tab and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category match: checks if current filter is 'all' or in project's categories array
      const matchesCategory = filter === 'all' || project.categories.includes(filter)

      // Search query match across title, subtitle, description, tech stack, and category
      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.categoryLabel.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [projects, filter, searchQuery])

  // Count helper based on categories list
  const getCount = (cat: ProjectCategory) => {
    if (cat === 'all') return projects.length
    return projects.filter((p) => p.categories.includes(cat)).length
  }

  return (
    <section id="projects" className="section-wrapper projects-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>05</span>
          <span className="tag-line"></span>
          <span>KEY PROJECTS &amp; GITHUB REPOSITORIES</span>
        </div>
        <h2 className="section-title">
          GitHub &amp; <span>Engineering Projects</span>
        </h2>
        <p className="section-subtitle">
          Explore complete production codebases, enterprise architectures, APIs, and interactive web applications from my GitHub profile.
        </p>
      </div>

      {/* GitHub Profile Stat Banner */}
      <div className="github-stats-banner">
        <div className="github-banner-left">
          <div className="github-avatar-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
          <div className="github-banner-info">
            <div className="github-profile-name">
              <span className="profile-handle">github.com/Anand9899</span>
              <span className="live-repo-count">{projects.length} Repositories Documented</span>
            </div>
            <p className="github-profile-desc">
              All projects are open-source and include Clean Architecture, REST APIs, unit tests, and relational databases.
            </p>
          </div>
        </div>
        <a
          href="https://github.com/Anand9899"
          target="_blank"
          rel="noreferrer"
          className="github-profile-link-btn"
          title="Open Anand Mishra's GitHub Profile"
        >
          <span>Visit GitHub Profile</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      {/* Toolbar: Search & Filter Tabs */}
      <div className="projects-toolbar">
        {/* Search input */}
        <div className="projects-search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="projects-search-input"
            placeholder="Search projects by name, language, or tech (e.g. React, .NET, MongoDB, Java)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="projects-filter-tabs">
          <button
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({getCount('all')})
          </button>
          <button
            className={`filter-tab-btn ${filter === 'dotnet' ? 'active' : ''}`}
            onClick={() => setFilter('dotnet')}
          >
            Full Stack .NET Developer ({getCount('dotnet')})
          </button>
          <button
            className={`filter-tab-btn ${filter === 'java' ? 'active' : ''}`}
            onClick={() => setFilter('java')}
          >
            Full Stack Java Developer ({getCount('java')})
          </button>
          <button
            className={`filter-tab-btn ${filter === 'nodejs' ? 'active' : ''}`}
            onClick={() => setFilter('nodejs')}
          >
            Node.js &amp; MongoDB ({getCount('nodejs')})
          </button>
          <button
            className={`filter-tab-btn ${filter === 'frontend' ? 'active' : ''}`}
            onClick={() => setFilter('frontend')}
          >
            Frontend ({getCount('frontend')})
          </button>
          <button
            className={`filter-tab-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            AI ({getCount('ai')})
          </button>
        </div>
      </div>

      {/* Projects Cards Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className={`project-showcase-card ${project.featured ? 'featured-card' : ''}`}>
              {/* Card Header: Meta Category Badge & GitHub Link */}
              <div className="project-card-header">
                <div className="project-meta">
                  <span className="project-index">{project.number}</span>
                  <span className={`project-badge badge-${project.category}`}>{project.categoryLabel}</span>
                  {project.featured && <span className="featured-pill">★ Key Project</span>}
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="github-icon-btn"
                  title="View repository on GitHub"
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

              {/* Card Footer: GitHub Link Action & Optional Live Demo */}
              <div className="project-card-footer">
                <div className="project-actions-row">
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

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-live"
                      title="Open Live Application"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="projects-empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No projects found</h3>
          <p>No project matches your search query &ldquo;{searchQuery}&rdquo;.</p>
          <button
            className="reset-filter-btn"
            onClick={() => {
              setSearchQuery('')
              setFilter('all')
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects
