'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SkeuoContact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const skeuoPanel = {
    background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
    boxShadow: '8px 8px 16px #b8b0a8, -8px -8px 16px #ffffff, inset 0 1px 0 rgba(255,255,255,0.6)',
    border: '1px solid #c4bbb2',
    borderRadius: '24px',
  }

  const skeuoInput = {
    background: 'linear-gradient(145deg, #d8d0c8, #e8e0d8)',
    boxShadow: 'inset 3px 3px 6px #b8b0a8, inset -3px -3px 6px #ffffff',
    borderRadius: '12px',
    border: '1px solid #c4bbb2',
    color: '#3a2f25',
    fontFamily: 'Georgia, serif',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="p-6 md:p-8 mb-8" style={skeuoPanel}>
            <div className="p-6 mb-6" style={{
              background: 'linear-gradient(145deg, #6b5540, #5a4a35)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3)',
              borderRadius: '16px',
              border: '1px solid #4a3a25',
            }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center" style={{
                color: '#f0ebe5',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontFamily: 'Georgia, serif',
              }}>
                Get In Touch
              </h1>
            </div>

            {submitted ? (
              <div className="p-8 text-center" style={{
                background: 'linear-gradient(145deg, #f5f0ea, #e8e0d8)',
                boxShadow: 'inset 3px 3px 6px #b8b0a8, inset -3px -3px 6px #ffffff',
                borderRadius: '16px',
                border: '1px solid #d0c8c0',
              }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
                  background: 'linear-gradient(145deg, #55b855, #3a8b3a)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)',
                  border: '1px solid #2a6b2a',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2" style={{
                  color: '#3a2f25',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  fontFamily: 'Georgia, serif',
                }}>Message Sent</h2>
                <p className="text-sm" style={{ color: '#6a5f55' }}>Thank you for reaching out. We will get back to you shortly.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-4 px-6 py-2 rounded-xl font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(180deg, #8b7355, #6b5540)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    border: '1px solid #5a4a35',
                    color: '#f5f0ea',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{
                      color: '#5a4f45',
                      textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                    }}>Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 text-sm focus:outline-none"
                      style={skeuoInput}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{
                      color: '#5a4f45',
                      textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                    }}>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 text-sm focus:outline-none"
                      style={skeuoInput}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{
                    color: '#5a4f45',
                    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  }}>Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 text-sm focus:outline-none"
                    style={skeuoInput}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{
                    color: '#5a4f45',
                    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                  }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                    style={skeuoInput}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm"
                  style={{
                    background: 'linear-gradient(180deg, #8b7355, #6b5540)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)',
                    border: '1px solid #5a4a35',
                    color: '#f5f0ea',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Email', value: 'haziq.built', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'Instagram', value: '@haziq.built', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { title: 'Response', value: 'Within 2 hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item, i) => (
              <div key={i} className="p-5 text-center" style={{
                background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
                boxShadow: '6px 6px 12px #b8b0a8, -6px -6px 12px #ffffff',
                borderRadius: '16px',
                border: '1px solid #c4bbb2',
              }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{
                  background: 'linear-gradient(145deg, #8b7355, #6b5540)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                  border: '1px solid #5a4a35',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="2" strokeLinecap="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-sm" style={{
                  color: '#3a2f25',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                }}>{item.title}</h3>
                <p className="text-xs mt-1" style={{ color: '#6a5f55' }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/skeuomorphism/gallery" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(145deg, #f0ebe5, #ddd5cd)',
              boxShadow: '4px 4px 8px #b8b0a8, -4px -4px 8px #ffffff',
              border: '1px solid #c4bbb2',
              color: '#5a4f45',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
            }}>
              Gallery
            </Link>
            <Link href="/" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{
              background: 'linear-gradient(180deg, #8b7355, #6b5540)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #5a4a35',
              color: '#f5f0ea',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
