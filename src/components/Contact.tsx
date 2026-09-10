import { useState } from 'react'

// Props passed down from App component
type ContactProps = {
  onCopyEmail: () => void     // Handler to copy email and trigger toast
  onCopyPhone: () => void     // Handler to copy phone and trigger toast
  showToast: (msg: string) => void // Handler to display custom toast
}

/**
 * Contact Component - Contact Anand & Direct Messaging Form
 * Features:
 * - "Open for Opportunities" hiring status card
 * - Direct contact cards (Phone & WhatsApp with 1-click copy, Email with 1-click copy, Noida UP location)
 * - Interactive direct message form that opens the user's email client with prefilled data
 */
function Contact({ onCopyEmail, onCopyPhone, showToast }: ContactProps) {
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
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Contact)`,
          to_email: 'anandmishra02.com@gmail.com'
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        showToast('Message sent successfully to Anand!')
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
          <span>06</span>
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
            {/* Phone & WhatsApp Card with Copy Action */}
            <div className="channel-card highlight-channel">
              <div className="channel-icon">📞</div>
              <div className="channel-details">
                <span className="channel-label">Phone &amp; WhatsApp</span>
                <a href="tel:+919576989908" className="channel-value">
                  +91-95769 89908
                </a>
              </div>
              <button
                onClick={onCopyPhone}
                className="channel-action-btn"
                title="Copy phone number"
              >
                Copy
              </button>
            </div>

            {/* Email Address Card with Copy Action */}
            <div className="channel-card">
              <div className="channel-icon">📧</div>
              <div className="channel-details">
                <span className="channel-label">Email Address</span>
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
                <span className="channel-label">Current Location</span>
                <span className="channel-value">Noida, UP, India</span>
              </div>
              <span className="channel-location-tag">Active</span>
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
                  placeholder="e.g. Hiring Manager / Tech Lead"
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
                  placeholder="name@company.com"
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
                  placeholder=".NET Developer Opportunity / Project Discussion"
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
                  placeholder="Hi Anand, I came across your portfolio and would like to discuss an opportunity..."
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
                  ✓ Message sent successfully! It has been delivered directly to Anand's inbox.
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
