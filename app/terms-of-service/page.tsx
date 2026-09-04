import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Mohd Haziq Web Development. Read our terms and conditions before using our services.',
}

const sections = [
  { id: 'agreement', title: 'Agreement to Terms' },
  { id: 'services', title: 'Services' },
  { id: 'accounts', title: 'User Accounts' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'payment', title: 'Payment Terms' },
  { id: 'timeline', title: 'Project Timeline' },
  { id: 'revisions', title: 'Revisions' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Us' },
]

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-gray-900 font-medium">Mohd Haziq</span>
            </div>
            <span className="text-sm text-gray-500">Terms of Service</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Contents
              </h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <article className="prose prose-gray max-w-none">
              {/* Title Section */}
              <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Terms of Service
                </h1>
                <p className="text-base text-gray-500">
                  Last updated: {lastUpdated}
                </p>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm text-amber-800">
                    Please read these Terms of Service carefully before using our website and services. By accessing or using our services, you agree to be bound by these terms.
                  </p>
                </div>
              </div>

              {/* Section 1: Agreement */}
              <section id="agreement" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. Agreement to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using the website <strong>mohdhaziq-portfolio.onrender.com</strong> (the &quot;Website&quot;) operated by Mohd Haziq Web Development (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, then you may not access the Website.
                </p>
              </section>

              {/* Section 2: Services */}
              <section id="services" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. Services
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We provide professional web development services, including:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Custom website design and development',
                    'Business website development',
                    'Restaurant website development',
                    'Coaching center website development',
                    'Gym and fitness website development',
                    'E-commerce website development',
                    'Landing page development',
                    'Website maintenance and support',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Accounts */}
              <section id="accounts" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. User Accounts
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create an account with us through Google Sign-In, you must provide accurate and complete information. You are responsible for safeguarding your account and for all activities that occur under your account.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>
              </section>

              {/* Section 4: Intellectual Property */}
              <section id="intellectual-property" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Website and its original content, features, and functionality are owned by Mohd Haziq Web Development and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm text-green-800">
                    <strong>Your License:</strong> Upon full payment for our services, you receive a non-exclusive license to use the delivered website and its content for your business purposes. We retain the right to showcase the work in our portfolio unless otherwise agreed in writing.
                  </p>
                </div>
              </section>

              {/* Section 5: Payment */}
              <section id="payment" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  5. Payment Terms
                </h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Pricing
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-xl mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Plan</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Starter</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹2,500</td>
                        <td className="px-4 py-3 text-sm text-gray-500">Single page website</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Business</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹6,000</td>
                        <td className="px-4 py-3 text-sm text-gray-500">Multi-page website</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Premium</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹12,000</td>
                        <td className="px-4 py-3 text-sm text-gray-500">Full-stack application</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Payment Terms
                </h3>
                <ul className="space-y-2">
                  {[
                    '50% advance payment required before work begins',
                    'Remaining 50% upon completion and before delivery',
                    'Payments are non-refundable once work has begun',
                    'We accept payments via bank transfer, UPI, or other agreed methods',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 6: Timeline */}
              <section id="timeline" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  6. Project Timeline
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Estimated project timelines:
                </p>
                <div className="space-y-3">
                  {[
                    { plan: 'Starter Website', time: '3 business days', color: 'bg-blue-100 text-blue-800' },
                    { plan: 'Business Website', time: '7 business days', color: 'bg-green-100 text-green-800' },
                    { plan: 'Premium Website', time: '14 business days', color: 'bg-purple-100 text-purple-800' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-900">{item.plan}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">
                  Timelines may vary based on project complexity and client responsiveness. Delays in providing required content or feedback may extend the timeline.
                </p>
              </section>

              {/* Section 7: Revisions */}
              <section id="revisions" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  7. Revisions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We offer the following revisions:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { plan: 'Starter', revisions: '2 rounds', icon: '🔄' },
                    { plan: 'Business', revisions: '3 rounds', icon: '🔄' },
                    { plan: 'Premium', revisions: '5 rounds', icon: '🔄' },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                      <span className="text-3xl block mb-3">{item.icon}</span>
                      <p className="font-medium text-gray-900 mb-1">{item.plan}</p>
                      <p className="text-sm text-gray-500">{item.revisions}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Additional revisions beyond the included rounds may incur additional charges.
                </p>
              </section>

              {/* Section 8: Liability */}
              <section id="liability" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  8. Limitation of Liability
                </h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall Mohd Haziq Web Development, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Website; (ii) any conduct or content of any third party on the Website; (iii) any content obtained from the Website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
                  </p>
                </div>
              </section>

              {/* Section 9: Disclaimer */}
              <section id="disclaimer" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  9. Disclaimer
                </h2>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    Your use of the Website is at your sole risk. The Website is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Website is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                  </p>
                </div>
              </section>

              {/* Section 10: Governing Law */}
              <section id="governing-law" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  10. Governing Law
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Sultanpur, Uttar Pradesh, India.
                </p>
              </section>

              {/* Section 11: Changes */}
              <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  11. Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              {/* Section 12: Contact */}
              <section id="contact" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  12. Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">H</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Mohd Haziq Web Development</p>
                      <p className="text-sm text-gray-500">Sultanpur, Uttar Pradesh, India</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📧 mohdhaziq1962@gmail.com</p>
                    <p>📸 @haziq.built</p>
                    <p>🌐 mohdhaziq-portfolio.onrender.com</p>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}
