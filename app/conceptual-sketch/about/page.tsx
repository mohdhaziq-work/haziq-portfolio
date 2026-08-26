'use client'

import Link from 'next/link'

export default function ConceptualSketchAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '32px 28px', marginBottom: '24px' }}>
        <h1 style={{ color: '#333', fontSize: '40px', fontWeight: 400, marginBottom: '14px' }}>About Sketch</h1>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.8, marginBottom: '10px' }}>We create designs that look like they were born on paper. Quick strokes, rough edges, and authentic character.</p>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.8 }}>Every sketch tells a story of the creative process.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Bring the sketchbook to the screen.' },
          { title: 'Vision', desc: 'A web that feels hand-drawn and real.' },
          { title: 'Values', desc: 'Raw. Authentic. Quick. Real.' },
          { title: 'Process', desc: 'Sketch fast, digitize rough, deliver real.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', border: '2px dashed #ccc', borderRadius: '8px', padding: '18px' }}>
            <h3 style={{ color: '#333', fontSize: '18px', fontWeight: 400, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'Projects' },
          { value: '5+', label: 'Years' },
          { value: '50+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#f8f8f8', border: '2px dashed #ccc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#333', fontSize: '24px', fontWeight: 400 }}>{s.value}</p>
            <p style={{ color: '#999', fontSize: '10px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/conceptual-sketch" style={{ padding: '12px 28px', color: '#666', fontSize: '16px', fontWeight: 400, textDecoration: 'none', borderRadius: '8px', border: '2px dashed #ccc' }}>Back Home</Link>
      </div>
    </div>
  )
}
