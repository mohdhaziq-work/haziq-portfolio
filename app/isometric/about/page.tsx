'use client'

import Link from 'next/link'

export default function IsometricAbout() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#16213e', border: '2px solid #e94560', padding: '32px 28px', marginBottom: '24px', transform: 'skewY(-2deg)' }}>
        <div style={{ transform: 'skewY(2deg)' }}>
          <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 800, marginBottom: '14px', letterSpacing: '2px' }}>ABOUT ISOMETRIC</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>We create designs with depth and dimension. Isometric perspective transforms flat screens into 3D worlds.</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8 }}>Every angle is intentional, every shadow calculated.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { title: 'Mission', desc: 'Add depth to flat digital experiences.' },
          { title: 'Vision', desc: 'A web where every element has dimension.' },
          { title: 'Values', desc: 'Depth. Angle. Perspective. Precision.' },
          { title: 'Process', desc: 'Sketch isometric, code transforms, add shadows.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#16213e', border: '2px solid #0f3460', padding: '18px', transform: 'skewY(-1deg)' }}>
            <div style={{ transform: 'skewY(1deg)' }}>
              <h3 style={{ color: '#e94560', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { value: '100+', label: 'PROJECTS' },
          { value: '5+', label: 'YEARS' },
          { value: '50+', label: 'CLIENTS' },
          { value: '24/7', label: 'SUPPORT' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#16213e', border: '2px solid #e94560', padding: '16px', textAlign: 'center', transform: 'skewX(-5deg)' }}>
            <p style={{ color: '#e94560', fontSize: '22px', fontWeight: 800 }}>{s.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', letterSpacing: '2px', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/isometric" style={{ padding: '12px 28px', color: '#e94560', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '2px solid #e94560', transform: 'skewX(-10deg)', letterSpacing: '1px' }}>Back Home</Link>
      </div>
    </div>
  )
}
