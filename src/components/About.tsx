/**
 * About Component - Professional Background, Strengths & Education Journey
 * Features:
 * - Professional developer narrative
 * - Personal and technical strengths list
 * - Complete 4-tier education roadmap (MCA 2027, BCA 2025, 10+2 2021, 10th 2019)
 */
function About() {
  // Education milestones dataset from Anand's official resume
  const educationHistory = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Mangalayatan University, Aligarh',
      period: '2025 – Expected 2027',
      status: 'Pursuing (Final Year)',
      details: 'Specialization in Full Stack .NET Development, Enterprise Software Engineering, Distributed Architectures, and Database Systems.'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Maulana Mazharul Haque Arabic and Persian University, Patna (MMHAPU)',
      period: '2022 – 2025',
      status: 'Graduated',
      details: 'Core Computer Science foundation: Data Structures & Algorithms, Object-Oriented Programming with C# and Java, Web Technologies, and RDBMS.'
    },
    {
      degree: '10+2 (Intermediate - Science)',
      institution: 'Bihar Intermediate Education Council',
      period: '2019 – 2021',
      status: 'Completed',
      details: 'Higher Secondary education with focus on Mathematics, Physics, Chemistry, and Logic.'
    },
    {
      degree: '10th (High School)',
      institution: 'Central Board of Secondary Education (CBSE)',
      period: 'Completed 2019',
      status: 'Completed',
      details: 'Secondary School curriculum with strong fundamentals in Mathematics and Science.'
    }
  ]

  // Key core strengths from Anand's resume
  const strengths = [
    {
      title: 'Problem-Solving',
      desc: 'Analytical mindset capable of breaking down complex system requirements into modular, efficient code.'
    },
    {
      title: 'Effective Communication',
      desc: 'Clear and collaborative communication across team members, stakeholders, and technical leads.'
    },
    {
      title: 'Teamwork & Leadership',
      desc: 'Collaborative team player with demonstrated leadership and disciplined time management.'
    },
    {
      title: 'Quick Learner & Adaptable',
      desc: 'A quick learner who effortlessly adapts to emerging modern technologies, stacks, and agile environments.'
    }
  ]

  return (
    <section id="about" className="section-wrapper about-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>01</span>
          <span className="tag-line"></span>
          <span>BACKGROUND &amp; EDUCATION</span>
        </div>
        <h2 className="section-title">
          About &amp; <span>Education</span>
        </h2>
        <p className="section-subtitle">
          Final-year MCA student specializing in Full Stack .NET Development, passionate about building scalable, responsive, and user-friendly web applications.
        </p>
      </div>

      {/* Grid Layout: Left Story/Strengths & Right Education Timeline */}
      <div className="about-grid">
        {/* Left Column: Narrative Story & Strengths */}
        <div className="about-narrative">
          <h3 className="about-lead">
            Passionate .NET Developer building scalable web applications with ASP.NET Core, C#, and SQL Server.
          </h3>
          <p>
            I am <strong>Anand Kumar Mishra</strong>, based in <strong>Noida, UP</strong>. I am currently pursuing my 
            <strong> Master of Computer Applications (MCA)</strong> at <strong>Mangalayatan University, Aligarh (Expected 2027)</strong>, having completed my 
            <strong> Bachelor of Computer Applications (BCA)</strong> from <strong>MMHAPU Patna</strong> in 2025.
          </p>
          <p>
            My technical expertise encompasses hands-on development using <strong>ASP.NET Core, ASP.NET MVC 5, ASP.NET Core Web API, ASP.NET Web Forms, and C#</strong> for backend architectures, alongside <strong>SQL Server &amp; MySQL</strong> for transactional databases. On the frontend, I create modern, responsive interfaces using <strong>HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5</strong>.
          </p>
          <p>
            I have deep practical experience implementing <strong>MVC Architecture, RESTful APIs, and efficient CRUD operations</strong>, utilizing modern engineering tools like <strong>Visual Studio 2019/2022, Git, GitHub, and Postman</strong>.
          </p>

          {/* Core Strengths Grid */}
          <div className="strengths-wrapper">
            <h4 className="strengths-heading">Key Personal &amp; Technical Strengths</h4>
            <div className="strengths-grid">
              {strengths.map((s, idx) => (
                <div key={idx} className="strength-card">
                  <div className="strength-bullet">✓</div>
                  <div className="strength-content">
                    <h5>{s.title}</h5>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4-Tier Education Roadmap */}
        <div className="about-education-column">
          <div className="timeline-header-card">
            <div className="edu-badge">
              <span>🎓</span>
              <span>ACADEMIC ROADMAP</span>
            </div>
            <h4 className="timeline-title">Education Journey</h4>
          </div>

          <div className="education-timeline">
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  {idx < educationHistory.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="timeline-content-card">
                  <div className="timeline-period-badge">{edu.period}</div>
                  <h5 className="timeline-degree">{edu.degree}</h5>
                  <div className="timeline-institution">{edu.institution}</div>
                  <p className="timeline-details">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
