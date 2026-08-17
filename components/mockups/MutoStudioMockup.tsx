'use client'

/**
 * Muto's Studio — Free website mockup preview (wedding photography).
 * Renders a polished visual preview so the client can see their design.
 */
export default function MutoStudioMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-white">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 bg-background rounded-md px-3 py-1 text-xs text-text-tertiary">
          mutosstudio.com
        </div>
      </div>

      <div className="p-6 sm:p-10 bg-[#faf7f2]">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-serif font-semibold text-stone-900">
            Muto&apos;s <span className="text-[#c9a227]">Studio</span>
          </div>
          <div className="hidden sm:flex gap-6 text-xs font-medium text-stone-500">
            <span>Home</span><span>Gallery</span><span>Packages</span><span>About</span><span>Contact</span>
          </div>
          <div className="bg-stone-900 text-white text-xs px-4 py-2 rounded-full">Book a Date</div>
        </div>

        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 text-center py-14 px-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_30%_20%,rgba(201,162,39,.18),transparent)]" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.25em] text-[#c9a227] uppercase font-semibold mb-4">
              Wedding &amp; Pre-Wedding Photography
            </div>
            <div className="font-serif text-white text-3xl sm:text-4xl mb-4">
              Capturing your love story, <em className="text-[#c9a227]">frame by frame.</em>
            </div>
            <div className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
              Every wedding is a once-in-a-lifetime story. We turn yours into timeless photographs.
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-[#c9a227] text-white text-xs px-5 py-2.5 rounded-full font-semibold">View Our Work</div>
              <div className="border border-white/40 text-white text-xs px-5 py-2.5 rounded-full">Book a Date →</div>
            </div>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="text-center mb-4">
          <div className="text-[10px] tracking-[0.25em] text-[#a9871a] uppercase font-semibold mb-2">Our Work</div>
          <div className="font-serif text-2xl text-stone-900 mb-4">Moments we&apos;ve captured</div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`rounded-xl aspect-[4/5] ${i % 2 ? 'bg-gradient-to-br from-[#5b4036] to-[#2c1e18]' : 'bg-gradient-to-br from-[#374b45] to-[#1b2622]'} flex items-center justify-center text-white/70 text-xs font-serif italic`}>
              Photo {i}
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="text-center mb-4">
          <div className="font-serif text-2xl text-stone-900">Packages &amp; Pricing</div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { name: 'Essential', price: '₹25,000', feat: ['4 hrs', '200+ photos', 'Online gallery'] },
            { name: 'Signature', price: '₹40,000', feat: ['8 hrs', '500+ photos', 'Album', 'Engagement shoot'], hot: true },
            { name: 'Cinematic', price: '₹60,000', feat: ['Full day', '800+ photos', 'Highlight film', 'Drone'] },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl p-4 bg-white border ${p.hot ? 'border-[#c9a227] shadow-md' : 'border-stone-200'}`}>
              <div className="font-serif font-semibold text-stone-900 mb-1">{p.name}</div>
              <div className="text-lg font-bold text-stone-900 mb-2">{p.price}</div>
              {p.feat.map((f) => (
                <div key={f} className="text-[11px] text-stone-500 flex gap-1.5 items-center">
                  <span className="text-[#c9a227]">✓</span>{f}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 p-6 text-center">
          <div className="font-serif text-white text-xl mb-2">Let&apos;s capture <em className="text-[#c9a227]">your</em> love story</div>
          <div className="text-stone-400 text-xs mb-4">Booking via 📞 +91 99116 68617 · 📸 @mutosstudio</div>
          <div className="inline-block bg-[#c9a227] text-white text-xs px-6 py-2.5 rounded-full font-semibold">Request Booking →</div>
        </div>
      </div>
    </div>
  )
}
