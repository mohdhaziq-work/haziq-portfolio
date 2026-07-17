import type { Tutorial } from './TutorialPlayer'

const THUM = 'https://image.thum.io/get/width/1280/wait/3/crop/720/https://haziq-portfolio.onrender.com'

export const TUTORIALS: Tutorial[] = [
  {
    id: 'website-tour',
    title: 'Website Tour',
    description: 'Take a complete tour of the portfolio website. See all pages, features, and what makes this site stand out.',
    duration: '~1 min',
    color: 'bg-accent',
    steps: [
      {
        title: 'Welcome to the Homepage',
        description: 'This is the hero section of the website. It introduces Mohd Haziq as a Web Developer from Sultanpur, UP. The clean, minimal design follows Google Labs style. Notice the call-to-action buttons and availability status.',
        screenshotUrl: `${THUM}/`,
        highlight: {
          top: '8%', left: '5%', width: '90%', height: '35%',
          label: 'Hero Section',
        },
        duration: 5000,
      },
      {
        title: 'Explore the Projects',
        description: 'Scroll down to see the project showcase. Each project card shows a real screenshot, category, and tech stack. Click "View Live" to visit the actual deployed project website.',
        screenshotUrl: `${THUM}/`,
        highlight: {
          top: '48%', left: '5%', width: '90%', height: '25%',
          label: 'Project Showcase',
        },
        duration: 5000,
      },
      {
        title: 'Services & Pricing',
        description: 'The Services page shows three transparent plans: Starter at 2,500, Business at 6,000, and Premium at 12,000. Each plan lists exactly what you get. No hidden fees.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '30%', left: '5%', width: '90%', height: '40%',
          label: 'Pricing Plans',
        },
        duration: 5000,
      },
      {
        title: 'About the Developer',
        description: 'The About page shares the story, skills, and philosophy. Every website is built with conversion in mind - designed to bring more customers to your business.',
        screenshotUrl: `${THUM}/about`,
        highlight: {
          top: '20%', left: '5%', width: '90%', height: '30%',
          label: 'About Section',
        },
        duration: 4000,
      },
      {
        title: 'Real Demo Projects',
        description: 'Visit the Projects page to see 3 fully-built demo websites. Each one is a multi-page site with unique design, animations, and real functionality. Click any project to see it live.',
        screenshotUrl: `${THUM}/projects`,
        highlight: {
          top: '30%', left: '5%', width: '90%', height: '35%',
          label: 'Live Demo Projects',
        },
        duration: 5000,
      },
      {
        title: 'Mobile Responsive',
        description: 'The entire website is mobile-first. Open it on any phone and it works perfectly. The sidebar navigation, buttons, forms - everything adapts to your screen size.',
        screenshotUrl: `${THUM}/`,
        duration: 4000,
      },
    ],
  },
  {
    id: 'how-to-contact',
    title: 'How to Contact Me',
    description: 'Learn the different ways to reach out - via the contact form, Instagram DM button, or the quick DM button in the header.',
    duration: '~45 sec',
    color: 'bg-success',
    steps: [
      {
        title: 'Click "DM Me" Button',
        description: 'The fastest way to contact is the "DM Me" button in the header. It opens Instagram DM directly to @haziq.built - your message goes straight to the developer.',
        screenshotUrl: `${THUM}/`,
        highlight: {
          top: '2%', left: '60%', width: '35%', height: '6%',
          label: 'DM Me Button',
        },
        duration: 5000,
      },
      {
        title: 'Visit the Contact Page',
        description: 'Click "Contact" in the navigation to go to the full contact page. Here you will find the contact form, Instagram DM info, location, and response time details.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '12%', left: '5%', width: '90%', height: '50%',
          label: 'Contact Page',
        },
        duration: 5000,
      },
      {
        title: 'Fill Out the Form',
        description: 'Enter your full name, business name, Instagram handle, select a service plan, and describe your business. The form requires Google Sign-In so you can track your project later.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '22%', left: '5%', width: '45%', height: '50%',
          label: 'Contact Form',
        },
        duration: 6000,
      },
      {
        title: 'Sign In with Google',
        description: 'Before submitting, you will be asked to sign in with Google. This creates your account so you can track project progress, see updates, and manage your requests.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '55%', left: '12%', width: '30%', height: '8%',
          label: 'Google Sign-In Required',
        },
        duration: 5000,
      },
      {
        title: 'Message Sent!',
        description: 'After submitting, your message is saved and you are redirected to Instagram DM for a direct conversation. You will get a reply within 2 hours during working hours.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '30%', left: '55%', width: '40%', height: '25%',
          label: 'Response Within 2 Hours',
        },
        duration: 4000,
      },
    ],
  },
  {
    id: 'request-website',
    title: 'How to Request a Website',
    description: 'Step-by-step guide on how to submit a project request, from sign-in to tracking your project progress.',
    duration: '~1 min',
    color: 'bg-warning',
    steps: [
      {
        title: 'Sign In First',
        description: 'Click the Google "G" icon in the header to sign in. Choose your Google account. This is required so you can submit projects and track their progress in your portal.',
        screenshotUrl: `${THUM}/`,
        highlight: {
          top: '2%', left: '50%', width: '15%', height: '6%',
          label: 'Sign In Button',
        },
        duration: 5000,
      },
      {
        title: 'Open the Contact Form',
        description: 'Go to the Contact page and fill out the form with your details. Select the plan that fits your budget. Describe your business and what kind of website you need.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '20%', left: '5%', width: '45%', height: '55%',
          label: 'Fill the Form',
        },
        duration: 6000,
      },
      {
        title: 'Or Use Client Portal',
        description: 'After signing in, click your profile photo in the header to open the User Panel. Go to "New Project" tab to submit a project request directly from your portal.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '2%', left: '45%', width: '15%', height: '6%',
          label: 'Your Profile / Portal',
        },
        duration: 5000,
      },
      {
        title: 'Enter Project Details',
        description: 'In the New Project form, enter your business name, select a plan, mention your budget, and describe what you need. Click "Submit Project Request" when ready.',
        screenshotUrl: `${THUM}/services`,
        duration: 5000,
      },
      {
        title: 'Track Your Request',
        description: 'After submitting, go to "My Projects" tab in your portal. You will see your project with status updates, progress bar, delivery date, and notes from the developer.',
        screenshotUrl: `${THUM}/services`,
        duration: 5000,
      },
      {
        title: 'Chat on Instagram',
        description: 'For quick discussions, use the Instagram DM button. Share your requirements, ask questions, and get a free mockup of your website before committing.',
        screenshotUrl: `${THUM}/contact`,
        highlight: {
          top: '30%', left: '55%', width: '40%', height: '20%',
          label: 'Free Mockup Offer',
        },
        duration: 4000,
      },
    ],
  },
  {
    id: 'plans-pricing',
    title: 'Plans & Pricing Overview',
    description: 'Understand all three plans - Starter, Business, and Premium. See exactly what each plan includes and choose the right one for your business.',
    duration: '~50 sec',
    color: 'bg-lavender',
    steps: [
      {
        title: 'Three Transparent Plans',
        description: 'The Services page shows three plans with clear pricing. No hidden fees, no surprises. Each plan is designed for a different level of business need.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '28%', left: '5%', width: '90%', height: '40%',
          label: 'All Plans',
        },
        duration: 5000,
      },
      {
        title: 'Starter Plan - 2,500',
        description: 'Perfect for getting online quickly. Includes a single-page design, mobile responsive layout, Instagram DM integration, basic SEO, 1 revision round, and 3-day delivery.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '30%', left: '5%', width: '28%', height: '38%',
          label: 'Starter - 2,500',
        },
        duration: 6000,
      },
      {
        title: 'Business Plan - 6,000 (Most Popular)',
        description: 'The best value plan. Up to 5 pages, SEO optimization, contact form, Instagram DM, scroll animations, 2 revision rounds, and 7-day delivery. Marked as "Most Popular".',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '30%', left: '36%', width: '28%', height: '38%',
          label: 'Business - 6,000',
        },
        duration: 6000,
      },
      {
        title: 'Premium Plan - 12,000',
        description: 'For businesses that need the full package. Unlimited pages, custom dashboard, database integration, admin panel, custom tools, 3 revision rounds, and 14-day delivery.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '30%', left: '67%', width: '28%', height: '38%',
          label: 'Premium - 12,000',
        },
        duration: 6000,
      },
      {
        title: 'How We Work Together',
        description: 'Every project follows a clear 4-step process: Discovery Call to understand your needs, Free Design Mockup for your approval, Development with modern tech, and Launch with post-launch support.',
        screenshotUrl: `${THUM}/services`,
        highlight: {
          top: '70%', left: '5%', width: '90%', height: '15%',
          label: '4-Step Process',
        },
        duration: 5000,
      },
    ],
  },
  {
    id: 'track-project',
    title: 'Track Your Project Progress',
    description: 'See how clients can track their project status, progress percentage, delivery dates, and developer notes in real-time.',
    duration: '~45 sec',
    color: 'bg-coral',
    steps: [
      {
        title: 'Open Your Portal',
        description: 'After signing in, click your profile photo or avatar in the header. This opens the User Panel on the right side where you can see all your project details.',
        screenshotUrl: `${THUM}/`,
        highlight: {
          top: '2%', left: '50%', width: '15%', height: '6%',
          label: 'Click Your Avatar',
        },
        duration: 5000,
      },
      {
        title: 'My Projects Tab',
        description: 'The "My Projects" tab shows all your submitted projects. Each project card displays the business name, plan type, and current status with a colored badge.',
        screenshotUrl: `${THUM}/services`,
        duration: 5000,
      },
      {
        title: 'Progress Bar & Percentage',
        description: 'Each project has a real-time progress bar. The color changes as progress increases: gray for early stages, orange for mid-way, blue for almost done, and green for near completion.',
        screenshotUrl: `${THUM}/services`,
        duration: 5000,
      },
      {
        title: 'Status Updates',
        description: 'Project status moves through clear stages: Inquiry Received, Under Discussion, Confirmed, In Progress, Ready for Review, and Delivered. Each stage has a unique color for easy tracking.',
        screenshotUrl: `${THUM}/services`,
        duration: 5000,
      },
      {
        title: 'Developer Notes & Delivery Date',
        description: 'The developer can add notes visible to you, like "Homepage completed, working on contact form." The expected delivery date is also shown so you know exactly when to expect your website.',
        screenshotUrl: `${THUM}/services`,
        duration: 4000,
      },
    ],
  },
]
