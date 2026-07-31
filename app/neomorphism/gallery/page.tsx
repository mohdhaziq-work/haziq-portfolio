'use client'
import Link from 'next/link'

export default function NeuoGallery() {
  const bg = '#e0e5ec'; const sl = '#ffffff'; const sd = '#a3b1c6'; const accent = '#6c63ff'
  const raised = { background: bg, boxShadow: `8px 8px 16px ${sd}, -8px -8px 16px ${sl}`, borderRadius: '24px' }
  const inset = { background: bg, boxShadow: `inset 4px 4px 8px ${sd}, inset -4px -4px 8px ${sl}`, borderRadius: '16px' }

  const items = [
    { title: 'Soft Calculator', desc: 'Neumorphic calculator with rounded buttons and inset display', color: '#6c63ff' },
    { title: 'Weather Widget', desc: 'Soft weather card with temperature, icons, and gradient accents', color: '#48bb78' },
    { title: 'Music Player', desc: 'Circular play controls, progress ring, and soft album art frame', color: '#8b5cf6' },
    { title: 'Task Manager', desc: 'Inset task cards with soft checkboxes and priority indicators', color: '#ecc94b' },
    { title: 'Profile Card', desc: 'Circular avatar, soft stats, and raised action buttons', color: '#f56565' },
    { title: 'Login Form', desc: 'Inset input fields with soft focus states and gradient submit', color: '#3182ce' },
  ]

  return (
    <div className="min-h-screen">
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 mb-8" style={raised}>
            <div className="p-6 mb-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 8px 24px ${accent}40` }}>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-white">Component Gallery</h1>
              <p className="text-center mt-2 text-white/80">Explore neumorphic UI components</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {items.map((item, i) => (
              <div key={i} className="p-6" style={raised}>
                <div className="aspect-video rounded-xl mb-4 flex items-center justify-center" style={inset}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{
                    background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`,
                  }}>
                    <span style={{ color: item.color, fontWeight: 700, fontSize: '24px' }}>{item.title[0]}</span>
                  </div>
                </div>
                <h3 className="font-bold" style={{ color: '#4a5568' }}>{item.title}</h3>
                <p className="text-sm mt-1" style={{ color: '#718096' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8" style={raised}>
            <h2 className="text-xl font-bold text-center mb-6" style={{ color: '#4a5568' }}>Color Palette</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Soft Purple', color: '#6c63ff' },
                { name: 'Mint', color: '#48bb78' },
                { name: 'Violet', color: '#8b5cf6' },
                { name: 'Gold', color: '#ecc94b' },
                { name: 'Coral', color: '#f56565' },
                { name: 'Ocean', color: '#3182ce' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-full aspect-square rounded-xl mb-2" style={{
                    background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div className="absolute inset-3 rounded-lg" style={{ background: s.color, boxShadow: `0 2px 6px ${s.color}40` }} />
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: '#6b7280' }}>{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/neomorphism/services" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: bg, boxShadow: `5px 5px 10px ${sd}, -5px -5px 10px ${sl}`, color: '#4a5568' }}>Services</Link>
            <Link href="/neomorphism/contact" className="px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)`, boxShadow: `0 4px 12px ${accent}40` }}>Contact</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
