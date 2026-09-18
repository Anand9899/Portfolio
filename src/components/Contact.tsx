import { useState } from 'react'

// Props passed down from App component
type ContactProps = {
  onCopyEmail: () => void     // Handler to copy email and trigger toast
  onCopyPhone?: () => void    // Optional handler to copy phone
  showToast: (msg: string) => void // Handler to display custom toast
}

/**
 * Contact Component - Contact Anand & Direct Messaging Form
 * Features:
 * - "Open for Opportunities" hiring status card
 * - Direct contact cards (Phone & WhatsApp with direct Call & Chat Now, Email with 1-click copy, Noida UP location)
 * - Interactive direct message form that sends email via Web3Forms API
 */
function Contact({ onCopyEmail, showToast }: ContactProps) {
  // Form input state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  // Submission status flags
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Form submit handler - Sends message directly to email via Web3Forms API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Web3Forms API Endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'bf109ef7-0c67-4c92-a867-61ac4a6c4627',
          name: formData.name,
          email: formData.email,
          subject: formData.subject ? `Portfolio Contact: ${formData.subject}` : `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: formData.name
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        showToast('Message sent successfully!!')
      } else {
        // If API key is not yet set or invalid, fallback gracefully
        if (result.message?.includes('Access Key') || result.message?.includes('Invalid')) {
          setErrorMessage('Please configure your Web3Forms Access Key to receive emails directly.')
        } else {
          setErrorMessage(result.message || 'Failed to send message. Please try again.')
        }
        showToast('Could not send message. Please check error.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage('Network error occurred while sending message. Please try again.')
      showToast('Network error while sending message.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-wrapper contact-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>07</span>
          <span className="tag-line"></span>
          <span>GET IN TOUCH</span>
        </div>
        <h2 className="section-title">
          <span>Contact</span>
        </h2>
        <p className="section-subtitle">
          Passionate about building scalable and impactful solutions as a Full Stack .NET Developer in a collaborative, growth-oriented environment. Open to opportunities across India and remote, with a willingness to relocate for the right opportunity.
        </p>
      </div>

      {/* Contact Grid: Left Contact Info & Right Form */}
      <div className="contact-layout-grid">
        {/* Left Column: Direct Contact Info & Status */}
        <div className="contact-info-panel">
          {/* Availability Card */}
          <div className="availability-card">
            <div className="avail-status">
              <span className="avail-pulse"></span>
              <span className="avail-title">Open for Opportunities</span>
            </div>
            <p className="avail-desc">
              Final-year MCA student (Expected 2027) with hands-on experience in Full Stack .NET Development. Ready for full-time developer roles, internships, and collaborative software projects.
            </p>
          </div>

          {/* Contact Details Cards */}
          <div className="contact-channels">
            {/* Mobile & WhatsApp Combined Card */}
            <div className="channel-card">
              <div className="channel-icon">📱</div>
              <div className="channel-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="channel-label">Mobile & WhatsApp</span>
                  <span className="whatsapp-live-dot" title="Available for Calls & WhatsApp"></span>
                </div>
                <a href="tel:+919576989908" className="channel-value">
                  +91-95769 89908
                </a>
              </div>
              <div className="channel-actions">
                <a
                  href="tel:+919576989908"
                  className="channel-action-btn"
                  title="Direct Call on Phone"
                >
                  Call
                </a>
                <a
                  href="https://wa.me/919576989908?text=Hi%20Anand,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-action-btn"
                  title="Chat directly on WhatsApp"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Email Address Card with Copy Action */}
            <div className="channel-card">
              <div className="channel-icon">📧</div>
              <div className="channel-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="channel-label">Email ID</span>
                  <span className="whatsapp-live-dot" title="Actively responding"></span>
                </div>
                <a href="mailto:anandmishra02.com@gmail.com" className="channel-value">
                  anandmishra02.com@gmail.com
                </a>
              </div>
              <button
                onClick={onCopyEmail}
                className="channel-action-btn"
                title="Copy email address"
              >
                Copy
              </button>
            </div>

            {/* Current Location Card */}
            <div className="channel-card">
              <div className="channel-icon">📍</div>
              <div className="channel-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="channel-label">Current Location</span>
                  <span className="whatsapp-live-dot" title="Active in Noida, UP"></span>
                </div>
                <span className="channel-value">Noida, UP, India</span>
              </div>
              <span className="channel-location-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span className="whatsapp-live-dot" style={{ width: '6px', height: '6px' }}></span>
                <span>Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="contact-form-panel">
          <div className="form-card">
            <h3 className="form-title">Send a Direct Message</h3>
            <p className="form-subtitle">
              Feel free to reach out regarding job openings, freelance inquiries, or Full Stack .NET Development discussions.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Subject Input */}
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Enter Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              {/* Message Textarea */}
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter A Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              {/* Send Button */}
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <span className="btn-spinner"></span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              {/* Success Banner */}
              {submitted && (
                <div className="form-success-banner">
                  ✓ Message sent successfully!!
                </div>
              )}

              {/* Error Banner */}
              {errorMessage && (
                <div className="form-error-banner">
                  ⚠️ {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
