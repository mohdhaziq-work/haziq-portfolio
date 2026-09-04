import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Mohd Haziq Web Development. Learn how we collect, use, and protect your personal information.',
}

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'google-signin', title: 'Google Sign-In' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
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
            <span className="text-sm text-gray-500">Privacy Policy</span>
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
                  Privacy Policy
                </h1>
                <p className="text-base text-gray-500">
                  Last updated: {lastUpdated}
                </p>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm text-blue-800">
                    This Privacy Policy describes how Mohd Haziq Web Development collects, uses, and protects your personal information when you use our website and services.
                  </p>
                </div>
              </div>

              {/* Section 1: Introduction */}
              <section id="introduction" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to Mohd Haziq Web Development (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>mohdhaziq-portfolio.onrender.com</strong> (the &quot;Website&quot;) or use our services. By accessing or using our Website, you agree to the terms of this Privacy Policy.
                </p>
              </section>

              {/* Section 2: Information We Collect */}
              <section id="information-we-collect" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  2. Information We Collect
                </h2>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you sign in with Google or contact us, we may collect:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Email address',
                    'Full name',
                    'Profile picture (if provided by Google)',
                    'Phone number (if provided voluntarily)',
                    'Project details and requirements',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  2.2 Automatically Collected Information
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you visit our Website, we may automatically collect:
                </p>
                <ul className="space-y-2">
                  {[
                    'IP address',
                    'Browser type and version',
                    'Operating system',
                    'Pages visited and time spent',
                    'Referring website addresses',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 3: How We Use */}
              <section id="how-we-use" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {[
                      'To provide and maintain our services',
                      'To communicate with you about your projects',
                      'To send welcome and update emails',
                      'To respond to your inquiries and support requests',
                      'To improve our Website and services',
                      'To comply with legal obligations',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Section 4: Google Sign-In */}
              <section id="google-signin" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  4. Google Sign-In
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you sign in using Google Sign-In, we receive the following information from Google:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: '📧', label: 'Email address' },
                    { icon: '👤', label: 'Full name' },
                    { icon: '🖼️', label: 'Profile picture URL' },
                  ].map((item, i) => (
                    <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <span className="text-sm text-blue-800 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">We do NOT access:</p>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Your Google contacts</li>
                    <li>• Your Google Drive files</li>
                    <li>• Your Google Calendar</li>
                    <li>• Any other Google services or data</li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We only use your Google account information to identify you and communicate with you about your projects. We do not share this information with third parties.
                </p>
              </section>

              {/* Section 5: Data Security */}
              <section id="data-security" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  5. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { icon: '🔒', title: 'HTTPS Encryption', desc: 'Secure data transmission' },
                    { icon: '🛡️', title: 'Firebase Auth', desc: 'Secure user management' },
                    { icon: '🔐', title: 'Security Rules', desc: 'Protected database access' },
                    { icon: '🔄', title: 'Regular Audits', desc: 'Continuous security updates' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* Section 6: Data Retention */}
              <section id="data-retention" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  6. Data Retention
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will securely delete or anonymize it.
                </p>
              </section>

              {/* Section 7: Your Rights */}
              <section id="your-rights" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  7. Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <div className="space-y-3">
                  {[
                    { title: 'Access', desc: 'You can request a copy of your personal data' },
                    { title: 'Correction', desc: 'You can request correction of inaccurate data' },
                    { title: 'Deletion', desc: 'You can request deletion of your personal data' },
                    { title: 'Withdrawal', desc: 'You can withdraw consent at any time' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 8: Cookies */}
              <section id="cookies" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  8. Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our Website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.
                </p>
              </section>

              {/* Section 9: Third-Party Services */}
              <section id="third-party" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  9. Third-Party Services
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the following third-party services:
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Google Firebase', purpose: 'Authentication and database services' },
                    { name: 'Google Analytics', purpose: 'Website analytics' },
                    { name: 'Vercel / Render', purpose: 'Website hosting' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-xs">{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  These third-party services have their own privacy policies. We encourage you to review their privacy policies.
                </p>
              </section>

              {/* Section 10: Children */}
              <section id="children" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  10. Children&apos;s Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take steps to remove that information.
                </p>
              </section>

              {/* Section 11: Changes */}
              <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  11. Changes to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Section 12: Contact */}
              <section id="contact" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  12. Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
