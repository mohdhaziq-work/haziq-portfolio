import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Mohd Haziq Web Development services. Read our terms and conditions before using our services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-display text-text-primary mb-4">Terms of Service</h1>
        <p className="text-body-md text-text-secondary">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">1. Agreement to Terms</h2>
          <p className="text-body-md text-text-secondary mb-4">
            By accessing or using the website <strong>mohdhaziq-portfolio.onrender.com</strong> (the &quot;Website&quot;) operated by Mohd Haziq Web Development (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, then you may not access the Website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">2. Services</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We provide professional web development services, including:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>Custom website design and development</li>
            <li>Business website development</li>
            <li>Restaurant website development</li>
            <li>Coaching center website development</li>
            <li>Gym and fitness website development</li>
            <li>E-commerce website development</li>
            <li>Landing page development</li>
            <li>Website maintenance and support</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">3. User Accounts</h2>
          <p className="text-body-md text-text-secondary mb-4">
            When you create an account with us through Google Sign-In, you must provide accurate and complete information. You are responsible for safeguarding your account and for all activities that occur under your account.
          </p>
          <p className="text-body-md text-text-secondary">
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">4. Intellectual Property</h2>
          <p className="text-body-md text-text-secondary mb-4">
            The Website and its original content, features, and functionality are owned by Mohd Haziq Web Development and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p className="text-body-md text-text-secondary">
            Upon full payment for our services, you receive a non-exclusive license to use the delivered website and its content for your business purposes. We retain the right to showcase the work in our portfolio unless otherwise agreed in writing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">5. Payment Terms</h2>
          <p className="text-body-md text-text-secondary mb-4">
            Our pricing is as follows:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li><strong>Starter Website:</strong> ₹2,500 (single page)</li>
            <li><strong>Business Website:</strong> ₹6,000 (multi-page)</li>
            <li><strong>Premium Website:</strong> ₹12,000 (full-stack application)</li>
          </ul>
          <p className="text-body-md text-text-secondary mb-4">
            Payment terms:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li>50% advance payment required before work begins</li>
            <li>Remaining 50% upon completion and before delivery</li>
            <li>Payments are non-refundable once work has begun</li>
            <li>We accept payments via bank transfer, UPI, or other agreed methods</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">6. Project Timeline</h2>
          <p className="text-body-md text-text-secondary mb-4">
            Estimated project timelines:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li><strong>Starter Website:</strong> 3 business days</li>
            <li><strong>Business Website:</strong> 7 business days</li>
            <li><strong>Premium Website:</strong> 14 business days</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            Timelines may vary based on project complexity and client responsiveness. Delays in providing required content or feedback may extend the timeline.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">7. Revisions</h2>
          <p className="text-body-md text-text-secondary mb-4">
            We offer the following revisions:
          </p>
          <ul className="list-disc list-inside text-body-md text-text-secondary space-y-2 mb-4">
            <li><strong>Starter Website:</strong> 2 revision rounds</li>
            <li><strong>Business Website:</strong> 3 revision rounds</li>
            <li><strong>Premium Website:</strong> 5 revision rounds</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            Additional revisions beyond the included rounds may incur additional charges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">8. Limitation of Liability</h2>
          <p className="text-body-md text-text-secondary">
            In no event shall Mohd Haziq Web Development, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Website; (ii) any conduct or content of any third party on the Website; (iii) any content obtained from the Website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">9. Disclaimer</h2>
          <p className="text-body-md text-text-secondary">
            Your use of the Website is at your sole risk. The Website is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Website is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">10. Governing Law</h2>
          <p className="text-body-md text-text-secondary">
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Lucknow, Uttar Pradesh, India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">11. Changes to Terms</h2>
          <p className="text-body-md text-text-secondary">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-headline text-text-primary mb-4">12. Contact Us</h2>
          <p className="text-body-md text-text-secondary mb-4">
            If you have any questions about these Terms, please contact us:
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
