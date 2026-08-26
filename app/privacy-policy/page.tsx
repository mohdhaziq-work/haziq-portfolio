import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Mohd Haziq Web Development services. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-display text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-body-md text-text-secondary">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">1. Introduction</h2>
          <p className="text-body-md text-text-secondary mb-4">
            Welcome to Mohd Haziq Web Development (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>mohdhaziq-portfolio.onrender.com</strong> (the &quot;Website&quot;) or use our services.
          </p>
          <p className="text-body-md text-text-secondary">
            By accessing or using our Website, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">2. Information We Collect</h2>
          
          <h3 className="text-title text-text-primary mb-3 mt-6">2.1 Personal Information</h3>
          <p className="text-body-md text-text-secondary mb-4">
            When you sign in with Google or contact us, we may collect the following personal information:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>Email address</li>
            <li>Full name</li>
            <li>Profile picture (if provided by Google)</li>
            <li>Phone number (if provided voluntarily)</li>
            <li>Project details and requirements (if submitted through contact forms)</li>
          </ul>

          <h3 className="text-title text-text-primary mb-3 mt-6">2.2 Automatically Collected Information</h3>
          <p className="text-body-md text-text-secondary mb-4">
            When you visit our Website, we may automatically collect certain information, including:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website addresses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">3. How We Use Your Information</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>To provide and maintain our services</li>
            <li>To communicate with you about your projects</li>
            <li>To send welcome and update emails</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To improve our Website and services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">4. Google Sign-In</h2>
          <p className="text-body-md text-text-secondary mb-4">
            When you sign in using Google Sign-In, we receive the following information from Google:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>Your email address</li>
            <li>Your full name</li>
            <li>Your profile picture URL</li>
          </ul>
          <p className="text-body-md text-text-secondary mb-4">
            <strong>We do NOT access:</strong>
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>Your Google contacts</li>
            <li>Your Google Drive files</li>
            <li>Your Google Calendar</li>
            <li>Any other Google services or data</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            We only use your Google account information to identify you and communicate with you about your projects. We do not share this information with third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">5. Data Security</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We implement appropriate security measures to protect your personal information, including:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>Secure HTTPS encryption for all data transmission</li>
            <li>Firebase Authentication for secure user management</li>
            <li>Firebase Firestore security rules to protect your data</li>
            <li>Regular security audits and updates</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">6. Data Retention</h2>
          <p className="text-body-md text-text-secondary">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">7. Your Rights</h2>
          <p className="text-body-md text-text-secondary mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li><strong>Access:</strong> You can request a copy of your personal data</li>
            <li><strong>Correction:</strong> You can request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> You can request deletion of your personal data</li>
            <li><strong>Withdrawal:</strong> You can withdraw consent at any time</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            To exercise any of these rights, please contact us at the email address provided below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">8. Cookies</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We use cookies and similar tracking technologies to track activity on our Website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
          </p>
          <p className="text-body-md text-text-secondary">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">9. Third-Party Services</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We use the following third-party services:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li><strong>Google Firebase:</strong> For authentication and database services</li>
            <li><strong>Google Analytics:</strong> For website analytics (if enabled)</li>
            <li><strong>Vercel/Render:</strong> For website hosting</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            These third-party services have their own privacy policies. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">10. Children&apos;s Privacy</h2>
          <p className="text-body-md text-text-secondary">
            Our Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take steps to remove that information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">11. Changes to This Privacy Policy</h2>
          <p className="text-body-md text-text-secondary">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">12. Contact Us</h2>
          <p className="text-body-md text-text-secondary mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-body-md text-text-primary font-medium mb-2">Mohd Haziq Web Development</p>
            <p className="text-body-md text-text-secondary">Email: mohdhaziq1962@gmail.com</p>
            <p className="text-body-md text-text-secondary">Instagram: @haziq.built</p>
            <p className="text-body-md text-text-secondary">Location: Lucknow, Uttar Pradesh, India</p>
          </div>
        </section>
      </div>
    </div>
  )
}
