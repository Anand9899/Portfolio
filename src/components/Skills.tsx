import { useState } from 'react'

// Available Skill Categories matching the resume sections
type SkillCategory = 'all' | 'backend' | 'frontend' | 'concepts' | 'database' | 'tools'

// Skill data structure
type SkillItem = {
  name: string
  category: 'backend' | 'frontend' | 'concepts' | 'database' | 'tools'
  categoryLabel: string
  level: string
  proficiency: number
  icon: string
  desc: string
}

/**
 * Skills Component - Technical Arsenal Matrix
 * Features:
 * - Dynamic Category Filtering Tabs (All, Backend, Frontend, Concepts, SQL, Tools)
 * - Visual proficiency progress indicators
 * - Level badges (Advanced / Proficient)
 * - Exact skills directly from Anand's official resume
 */
function Skills() {
  // State for active filter tab (defaults to 'all')
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all')

  // Comprehensive skills list
  const skills: SkillItem[] = [
    // 1. Backend & .NET Skills
    {
      name: 'ASP.NET Core',
      category: 'backend',
      categoryLabel: 'Backend',
      level: 'Advanced',
      proficiency: 92,
      icon: '⚡',
      desc: 'High-performance cross-platform web APIs, dependency injection, and asynchronous request pipelines.'
    },
    {
      name: 'ASP.NET MVC 5',
      category: 'backend',
      categoryLabel: 'Backend',
      level: 'Advanced',
      proficiency: 90,
      icon: '📐',
      desc: 'Model-View-Controller pattern, Razor views, routing, session handling, and authentication filters.'
    },
    {
      name: 'ASP.NET Core Web API',
      category: 'backend',
      categoryLabel: 'Backend',
      level: 'Advanced',
      proficiency: 92,
      icon: '🌐',
      desc: 'Designing and building secure RESTful APIs, Swagger integration, and JSON data transfer.'
    },
    {
      name: 'C# (C Sharp)',
      category: 'backend',
      categoryLabel: 'Backend',
      level: 'Advanced',
      proficiency: 94,
      icon: '🔷',
      desc: 'Object-Oriented Programming (OOP), LINQ queries, Generics, Async/Await, and modern C# features.'
    },
    {
      name: 'ASP.NET Web Forms',
      category: 'backend',
      categoryLabel: 'Backend',
      level: 'Proficient',
      proficiency: 82,
      icon: '📄',
      desc: 'Server controls, event-driven web development, view state management, and legacy maintenance.'
    },

    // 2. Frontend Skills
    {
      name: 'HTML & HTML5',
      category: 'frontend',
      categoryLabel: 'Frontend',
      level: 'Advanced',
      proficiency: 95,
      icon: '🌐',
      desc: 'Semantic web layouts, accessible forms, multimedia elements, and clean document structure.'
    },
    {
      name: 'CSS & CSS3',
      category: 'frontend',
      categoryLabel: 'Frontend',
      level: 'Advanced',
      proficiency: 90,
      icon: '🎨',
      desc: 'Responsive web design, Flexbox, CSS Grid, media queries, animations, and custom styling.'
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      categoryLabel: 'Frontend',
      level: 'Advanced',
      proficiency: 88,
      icon: '📜',
      desc: 'DOM manipulation, event handling, asynchronous JavaScript, Fetch API, and dynamic UI interactions.'
    },
    {
      name: 'Bootstrap 5',
      category: 'frontend',
      categoryLabel: 'Frontend',
      level: 'Advanced',
      proficiency: 92,
      icon: '🅱️',
      desc: 'Rapid mobile-first responsive layout design, utility classes, navigation bars, and modals.'
    },

    // 3. Core Concepts & Architecture
    {
      name: 'MVC Architecture',
      category: 'concepts',
      categoryLabel: 'Core Concepts',
      level: 'Advanced',
      proficiency: 92,
      icon: '🏛️',
      desc: 'Clear separation of concerns between Model (Data/Logic), View (UI), and Controller (Flow).'
    },
    {
      name: 'RESTful APIs',
      category: 'concepts',
      categoryLabel: 'Core Concepts',
      level: 'Advanced',
      proficiency: 92,
      icon: '🔗',
      desc: 'Stateless HTTP methods (GET, POST, PUT, DELETE), standard status codes, and URI design.'
    },
    {
      name: 'CRUD Operations',
      category: 'concepts',
      categoryLabel: 'Core Concepts',
      level: 'Advanced',
      proficiency: 95,
      icon: '🔄',
      desc: 'Create, Read, Update, Delete workflows across relational databases and frontend interfaces.'
    },
    {
      name: 'OOP (Object-Oriented Programming)',
      category: 'concepts',
      categoryLabel: 'Core Concepts',
      level: 'Advanced',
      proficiency: 94,
      icon: '🧩',
      desc: 'Encapsulation, Inheritance, Polymorphism, Abstraction, and Clean Code principles.'
    },

    // 4. Databases & SQL
    {
      name: 'Microsoft SQL Server',
      category: 'database',
      categoryLabel: 'Databases',
      level: 'Advanced',
      proficiency: 90,
      icon: '🗄️',
      desc: 'T-SQL queries, table relationships, foreign keys, stored procedures, and data integrity.'
    },
    {
      name: 'MySQL',
      category: 'database',
      categoryLabel: 'Databases',
      level: 'Advanced',
      proficiency: 88,
      icon: '🐬',
      desc: 'Relational schema design, normalization, query optimization, and structured database operations.'
    },

    // 5. Tools & Platforms
    {
      name: 'Visual Studio 2019 / 2022',
      category: 'tools',
      categoryLabel: 'Tools & Platforms',
      level: 'Advanced',
      proficiency: 94,
      icon: '💻',
      desc: 'Enterprise .NET development, step-by-step debugging, profiling, and NuGet package management.'
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      categoryLabel: 'Tools & Platforms',
      level: 'Advanced',
      proficiency: 90,
      icon: '🐙',
      desc: 'Version control, commit history, repository branching, pull requests, and remote workflows.'
    },
    {
      name: 'Postman',
      category: 'tools',
      categoryLabel: 'Tools & Platforms',
      level: 'Advanced',
      proficiency: 92,
      icon: '🚀',
      desc: 'API endpoint testing, request payloads, headers inspection, and automated API verification.'
    }
  ]

  // Filter skills based on selected category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  // Category counts and metadata
  const categories: { id: SkillCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Skills', count: skills.length },
    { id: 'backend', label: 'Backend (.NET & C#)', count: skills.filter(s => s.category === 'backend').length },
    { id: 'frontend', label: 'Frontend', count: skills.filter(s => s.category === 'frontend').length },
    { id: 'concepts', label: 'Concepts & Architecture', count: skills.filter(s => s.category === 'concepts').length },
    { id: 'database', label: 'SQL & Databases', count: skills.filter(s => s.category === 'database').length },
    { id: 'tools', label: 'Tools & Platforms', count: skills.filter(s => s.category === 'tools').length },
  ]

  return (
    <section id="skills" className="section-wrapper skills-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>02</span>
          <span className="tag-line"></span>
          <span>TECHNICAL SKILLS</span>
        </div>
        <h2 className="section-title">
          Skills &amp; <span>Proficiencies</span>
        </h2>
        <p className="section-subtitle">
          Direct technical capabilities based on hands-on project implementations and formal computer science training.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="skills-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.label}</span>
            <span className="tab-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Skills Matrix Cards Grid */}
      <div className="skills-matrix-grid">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="skill-matrix-card">
            {/* Card Header: Icon & Level Badge */}
            <div className="skill-card-top">
              <div className="skill-icon-bubble">{skill.icon}</div>
              <div className="skill-badge-level">{skill.level}</div>
            </div>

            {/* Skill Name & Summary */}
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-description">{skill.desc}</p>

            {/* Proficiency Meter */}
            <div className="skill-progress-wrapper">
              <div className="progress-info">
                <span className="progress-text">{skill.categoryLabel}</span>
                <span className="progress-pct">{skill.proficiency}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
