/*import { Contact } from './About'
export default Contact
*/
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/contact/submit`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #253d6b 100%)',
        color: '#fff', padding: '4rem 0', textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Get in Touch</h1>
          <p style={{ color: '#94a3b8', maxWidth: '440px', margin: '0 auto' }}>
            Questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4rem', maxWidth: '900px', margin: '0 auto'
        }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Contact Info</h2>
            {[
              ['📧', 'Email',   'support@shopgenie.com'],
              ['📞', 'Phone',   '+91 98765 43210'],
              ['📍', 'Address', 'Mumbai, Maharashtra, India'],
              ['🕐', 'Hours',   'Mon–Sat, 9 AM – 6 PM'],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{label}</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
                required
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.9rem' }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message ✉️"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;