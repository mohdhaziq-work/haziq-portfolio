'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NeuoContact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const bg = '#e0e5ec'; const sl = '#ffffff'; const sd = '#a3b1c6'; const accent = '#6c63ff'
  const raised = { background: bg, boxShadow: `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`, borderRadius: '24px' }
  const inset = { background: bg, boxShadow: `inset 3px 3px 6px ${sd}, inset -3px -3px 6px ${sl}`, borderRadius: '12px', color: '#4a5568' }

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 mb-8" style={raised}>
            <div className="p-6 mb-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 8px 24px ${accent}40` }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-white">Get In Touch</h1>
            </div>

            {submitted ? (
              <div className="p-8 text-center" style={inset}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
                  background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`,
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#48bb78" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: '#4a5568' }}>Message Sent</h2>
                <p className="text-sm" style={{ color: '#718096' }}>We will get back to you shortly.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }} className="mt-4 px-6 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40` }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>Your Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" className="w-full px-4 py-3 text-sm focus:outline-none" style={inset} required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" className="w-full px-4 py-3 text-sm focus:outline-none" style={inset} required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>Subject</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Project Inquiry" className="w-full px-4 py-3 text-sm focus:outline-none" style={inset} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>Message</label>
                  <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project..." rows={5} className="w-full px-4 py-3 text-sm focus:outline-none resize-none" style={inset} required />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{
                  background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40`,
                }}>Send Message</button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Email', value: 'haziq.built', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'Instagram', value: '@haziq.built', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { title: 'Response', value: 'Within 2 hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item, i) => (
              <div key={i} className="p-5 text-center" style={raised}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={inset}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2"><path d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-sm" style={{ color: '#4a5568' }}>{item.title}</h3>
                <p className="text-xs mt-1" style={{ color: '#718096' }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Link href="/neomorphism/gallery" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, color: '#4a5568' }}>Gallery</Link>
            <Link href="/" className="px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40` }}>Back to Portfolio</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
