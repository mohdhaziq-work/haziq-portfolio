'use client'

/**
 * Wings of Fire — Free website mockup preview (rooftop restaurant & lounge).
 * Renders a polished visual preview so the client can see their design.
 */
export default function WingsOfFireMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-white">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 bg-background rounded-md px-3 py-1 text-xs text-text-tertiary">
          wingsoffirehazratganj.com
        </div>
      </div>

      <div className="p-6 sm:p-10 bg-[#0d0a07] text-white">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-serif font-semibold">
            Wings <span className="text-[#e0863a]">of Fire</span>
          </div>
          <div className="hidden sm:flex gap-6 text-xs font-medium text-stone-400">
            <span>Home</span><span>Menu</span><span>Gallery</span><span>Private Parties</span><span>Contact</span>
          </div>
          <div className="bg-[#e0863a] text-black text-xs px-4 py-2 rounded-full font-bold">Book a Table</div>
        </div>

        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-[#3a1d10] to-[#120c07] text-center py-14 px-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_70%_20%,rgba(224,134,58,.22),transparent)]" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.25em] text-[#e0863a] uppercase font-semibold mb-4">
              Rooftop Restaurant &amp; Lounge · Hazratganj, Lucknow
            </div>
            <div className="font-serif text-3xl sm:text-4xl mb-4">
              Good food. <em className="text-[#e0863a]">Great vibes.</em> Rooftop evenings.
            </div>
            <div className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
              North Indian · Chinese · Continental · Live music · Private parties on a beautiful rooftop.
            </div>
            <div className="flex gap-3 justify-center">
              <div className="bg-[#e0863a] text-black text-xs px-5 py-2.5 rounded-full font-bold">Explore the Menu</div>
              <div className="border border-white/40 text-white text-xs px-5 py-2.5 rounded-full">View Ambience</div>
            </div>
          </div>
        </div>

        {/* Signature dishes */}
        <div className="text-center mb-4">
          <div className="text-[10px] tracking-[0.25em] text-[#e0863a] uppercase font-semibold mb-2">Chef&apos;s Favourites</div>
          <div className="font-serif text-2xl mb-4">Must-try dishes</div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { n: 'Awadhi Chaap', c: 'Continental · Veg' },
            { n: 'Wood-fired Pizza', c: 'Continental' },
            { n: 'Kung Pao Chicken', c: 'Chinese' },
            { n: 'Mughlai Platter', c: 'North Indian' },
            { n: 'Signature Mocktails', c: 'Beverages' },
            { n: 'Dessert Trio', c: 'Desserts' },
          ].map((d) => (
            <div key={d.n} className="rounded-xl aspect-square bg-gradient-to-br from-[#4a2a18] to-[#1d120b] flex flex-col items-center justify-center text-center p-3">
              <div className="text-sm font-serif font-semibold mb-1">{d.n}</div>
              <div className="text-[10px] text-orange-200/60">{d.c}</div>
            </div>
          ))}
        </div>

        {/* Ambience / features */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          {[
            ['🌇', 'Rooftop Seating'],
            ['🎵', 'Live Music & DJ'],
            ['🎉', 'Parties up to 50'],
          ].map(([icon, label]) => (
            <div key={label} className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs text-stone-200">{label}</div>
            </div>
          ))}
        </div>

        {/* Booking */}
        <div className="rounded-2xl bg-gradient-to-br from-[#3a1d10] to-[#120c07] p-6 text-center">
          <div className="font-serif text-xl mb-2">Reserve your <em className="text-[#e0863a]">rooftop table</em></div>
          <div className="text-stone-400 text-xs mb-4">4-A, Meerabai Marg, Shri Hari Tower, Hazratganj · 📞 +91 73100 34000</div>
          <div className="inline-block bg-[#e0863a] text-black text-xs px-6 py-2.5 rounded-full font-bold">Book Now →</div>
        </div>
      </div>
    </div>
  )
}
