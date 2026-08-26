import type { TutorialData } from './TutorialContext'

export const TUTORIALS: TutorialData[] = [
  {
    id: 'website-tour',
    title: {
      en: 'Website Tour',
      hi: 'वेबसाइट टूर',
      hing: 'Website Tour',
    },
    description: {
      en: 'Take a complete tour of the portfolio. See all pages and features live.',
      hi: 'पोर्टफोलियो का पूरा टूर लें। सभी पेज और फीचर्स लाइव देखें।',
      hing: 'Portfolio ka poora tour lo. Saare pages aur features live dekho.',
    },
    color: 'bg-accent',
    device: 'all',
    steps: [
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Welcome to the Homepage', hi: 'होमपेज पर स्वागत है', hing: 'Homepage par swagat hai' },
        description: {
          en: 'This is the hero section. It introduces Mohd Haziq as a Web Developer. The clean design follows Google Labs style.',
          hi: 'यह हीरो सेक्शन है। यह मोहद हाजिक को सुलतानपुर, उप्र से वेब डेवलपर के रूप में परिचित कराता है।',
          hing: 'Ye hero section hai. Ye Mohd Haziq ko Web Developer ke roop mein introduce karta hai. Saaf design hai Google Labs jaisa.',
        },
        position: 'bottom',
      },
      {
        target: 'nav-links',
        page: '/',
        title: { en: 'Navigation Menu', hi: 'नेविगेशन मेनू', hing: 'Navigation Menu' },
        description: {
          en: 'Use the navigation to browse Home, About, Projects, Services, Tutorials, and Contact pages. Each page has its own purpose.',
          hi: 'नेविगेशन से होम, अबाउट, प्रोजेक्ट्स, सर्विसेज, ट्यूटोरियल्स और कॉन्टैक्ट पेज ब्राउज़ करें।',
          hing: 'Navigation se Home, About, Projects, Services, Tutorials aur Contact pages browse karo.',
        },
        position: 'bottom',
      },
      {
        target: 'dm-btn',
        page: '/',
        title: { en: 'Quick DM Button', hi: 'तुरंत DM बटन', hing: 'Quick DM Button' },
        description: {
          en: 'Click this button anytime to send a direct message on Instagram. It opens the DM directly to @haziq.built — the fastest way to reach out.',
          hi: 'कभी भी इंस्टाग्राम पर डायरेक्ट मैसेज भेजने के लिए यह बटन दबाएं। यह सीधे @haziq.built पर DM खोलता है।',
          hing: 'Kabhi bhi Instagram par direct message bhejne ke liye ye button dabao. Ye sidha @haziq.built par DM kholta hai — sabse fast tarika hai.',
        },
        position: 'bottom',
      },
      {
        target: 'projects-section',
        page: '/',
        title: { en: 'Live Demo Projects', hi: 'लाइव डेमो प्रोजेक्ट्स', hing: 'Live Demo Projects' },
        description: {
          en: 'Here are 3 fully-built demo websites — a restaurant, a coaching center, and a gym. Each has unique design, animations, and real functionality.',
          hi: 'यहाँ 3 पूरी तरह बनी डेमो वेबसाइट्स हैं — रेस्टोरेंट, कोचिंग सेंटर और जिम। हर एक का अपना डिज़ाइन है।',
          hing: 'Yahan 3 fully-built demo websites hain — restaurant, coaching center aur gym. Har ek ka unique design aur real functionality hai.',
        },
        position: 'top',
      },
      {
        target: 'services-section',
        page: '/',
        title: { en: 'Services Overview', hi: 'सेवाएं अवलोकन', hing: 'Services Overview' },
        description: {
          en: 'Three plans available: Starter at Rs 2,500, Business at Rs 6,000, and Premium at Rs 12,000. Transparent pricing with no hidden fees.',
          hi: 'तीन प्लान उपलब्ध: स्टार्टर 2,500 रुपये, बिज़नेस 6,000 रुपये, और प्रीमियम 12,000 रुपये। कोई छिपी फीस नहीं।',
          hing: 'Teen plans available: Starter 2,500 rupaye, Business 6,000 rupaye, aur Premium 12,000 rupaye. Transparent pricing, koi hidden fees nahi.',
        },
        position: 'top',
      },
      {
        target: 'cta-section',
        page: '/',
        title: { en: 'Free Mockup Offer', hi: 'मुफ़्त मॉकअप ऑफ़र', hing: 'Free Mockup Offer' },
        description: {
          en: 'Not sure yet? Get a free homepage mockup for your business. If you like it, we work together. No risk, no pressure.',
          hi: 'अभी तय नहीं है? अपने बिज़नेस के लिए मुफ़्त होमपेज मॉकअप पाएं। पसंद आए तो साथ काम करें। कोई जोखिम नहीं।',
          hing: 'Abhi decide nahi kar paaye? Apne business ke liye free homepage mockup pao. Pasand aaye toh saath kaam karo. Koi risk nahi.',
        },
        position: 'top',
      },
    ],
  },
  {
    id: 'how-to-contact',
    title: {
      en: 'How to Contact Me',
      hi: 'मुझसे कैसे संपर्क करें',
      hing: 'Mujhse kaise contact karein',
    },
    description: {
      en: 'Learn the fastest ways to reach out — DM button, contact form, or direct Instagram message.',
      hi: 'संपर्क के सबसे तेज़ तरीके सीखें — DM बटन, कॉन्टैक्ट फॉर्म, या सीधा इंस्टाग्राम मैसेज।',
      hing: 'Contact ke sabse fast tarike seekho — DM button, contact form, ya sidha Instagram message.',
    },
    color: 'bg-success',
    device: 'all',
    steps: [
      {
        target: 'dm-btn',
        page: '/',
        title: { en: 'The Fastest Way: DM Me', hi: 'सबसे तेज़ तरीका: DM करें', hing: 'Sabse fast tarika: DM karo' },
        description: {
          en: 'Click the "DM Me" button in the header. It opens Instagram DM directly to @haziq.built. You will get a reply within 2 hours.',
          hi: 'हेडर में "DM Me" बटन दबाएं। यह सीधे @haziq.built पर इंस्टाग्राम DM खोलता है। 2 घंटे में जवाब मिलेगा।',
          hing: 'Header mein "DM Me" button dabao. Ye sidha @haziq.built par Instagram DM kholta hai. 2 ghante mein reply milega.',
        },
        position: 'bottom',
      },
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Sign In First', hi: 'पहले साइन इन करें', hing: 'Pehle sign in karo' },
        description: {
          en: 'Click the Google "G" icon or "Sign In" button to sign in with your Google account. This is needed to submit the contact form and track your project.',
          hi: 'Google "G" आइकन या "Sign In" बटन दबाकर अपने Google खाते से साइन इन करें। फॉर्म भरने और प्रोजेक्ट ट्रैक करने के लिए ज़रूरी है।',
          hing: 'Google "G" icon ya "Sign In" button dabakar apne Google account se sign in karo. Form bharne aur project track karne ke liye zaroori hai.',
        },
        position: 'bottom',
      },
      {
        target: 'contact-form',
        page: '/contact',
        title: { en: 'Fill the Contact Form', hi: 'कॉन्टैक्ट फॉर्म भरें', hing: 'Contact form bharein' },
        description: {
          en: 'Enter your name, business name, Instagram handle, select a plan, and describe your business. Google Sign-In is required before submitting.',
          hi: 'अपना नाम, बिज़नेस नाम, इंस्टाग्राम हैंडल डालें, प्लान चुनें, और अपने बिज़नेस के बारे में बताएं। सबमिट करने से पहले Google Sign-In ज़रूरी है।',
          hing: 'Apna naam, business naam, Instagram handle dalo, plan chuno, aur apne business ke baare mein batao. Submit karne se pehle Google Sign-In zaroori hai.',
        },
        position: 'right',
      },
      {
        target: 'sign-in-notice',
        page: '/contact',
        title: { en: 'Why Sign In is Required', hi: 'साइन इन क्यों ज़रूरी है', hing: 'Sign in kyun zaroori hai' },
        description: {
          en: 'Signing in creates your account so you can track project progress, receive updates, and manage your requests. Your data stays safe and private.',
          hi: 'साइन इन करने से आपका खाता बनता है ताकि आप प्रोजेक्ट प्रगति ट्रैक कर सकें, अपडेट पा सकें, और अपने अनुरोध प्रबंधित कर सकें।',
          hing: 'Sign in karne se aapka account banta hai taaki aap project progress track kar sako, updates pa sako, aur apne requests manage kar sako.',
        },
        position: 'right',
      },
      {
        target: 'instagram-card',
        page: '/contact',
        title: { en: 'Direct Instagram Contact', hi: 'सीधा इंस्टाग्राम संपर्क', hing: 'Sidha Instagram contact' },
        description: {
          en: 'You can also reach out via the Instagram DM card. Click "Send a DM" to start a direct conversation. Usually replies within 2 hours.',
          hi: 'आप इंस्टाग्राम DM कार्ड से भी संपर्क कर सकते हैं। बातचीत शुरू करने के लिए "Send a DM" दबाएं। आमतौर पर 2 घंटे में जवाब।',
          hing: 'Aap Instagram DM card se bhi contact kar sakte ho. Baatcheet shuru karne ke liye "Send a DM" dabao. Usually 2 ghante mein reply.',
        },
        position: 'left',
      },
      {
        target: 'free-mockup',
        page: '/contact',
        title: { en: 'Free Mockup — No Risk', hi: 'मुफ़्त मॉकअप — कोई जोखिम नहीं', hing: 'Free Mockup — koi risk nahi' },
        description: {
          en: 'Not sure about a website? Get a free homepage mockup designed for your business. If you like it, we move forward. No commitment required.',
          hi: 'वेबसाइट को लेकर संशय? अपने बिज़नेस के लिए मुफ़्त होमपेज मॉकअप पाएं। पसंद आए तो आगे बढ़ें। कोई बाध्यता नहीं।',
          hing: 'Website ko lekar doubt? Apne business ke liye free homepage mockup pao. Pasand aaye toh aage badho. Koi commitment nahi.',
        },
        position: 'left',
      },
    ],
  },
  {
    id: 'request-website',
    title: {
      en: 'How to Request a Website',
      hi: 'वेबसाइट कैसे रिक्वेस्ट करें',
      hing: 'Website kaise request karein',
    },
    description: {
      en: 'Step-by-step: sign in, submit your project details, and start tracking progress.',
      hi: 'स्टेप-बाय-स्टेप: साइन इन करें, प्रोजेक्ट डिटेल्स सबमिट करें, और प्रगति ट्रैक करें।',
      hing: 'Step-by-step: sign in karo, project details submit karo, aur progress track karo.',
    },
    color: 'bg-warning',
    device: 'all',
    steps: [
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Step 1: Sign In with Google', hi: 'स्टेप 1: Google से साइन इन करें', hing: 'Step 1: Google se sign in karo' },
        description: {
          en: 'Click the Google "G" icon in the header. Choose your Google account. This creates your client portal so you can track projects.',
          hi: 'हेडर में Google "G" आइकन दबाएं। अपना Google खाता चुनें। इससे आपका क्लाइंट पोर्टल बनता है।',
          hing: 'Header mein Google "G" icon dabao. Apna Google account chuno. Isse aapka client portal banta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'contact-form',
        page: '/contact',
        title: { en: 'Step 2: Fill the Contact Form', hi: 'स्टेप 2: कॉन्टैक्ट फॉर्म भरें', hing: 'Step 2: Contact form bharein' },
        description: {
          en: 'Enter your full name, business name, Instagram handle, select a service plan, and describe what kind of website you need.',
          hi: 'अपना पूरा नाम, बिज़नेस नाम, इंस्टाग्राम हैंडल डालें, सर्विस प्लान चुनें, और बताएं कि कैसी वेबसाइट चाहिए।',
          hing: 'Apna poora naam, business naam, Instagram handle dalo, service plan chuno, aur batao ki kaisi website chahiye.',
        },
        position: 'right',
      },
      {
        target: 'sign-in-notice',
        page: '/contact',
        title: { en: 'Sign In Before Submitting', hi: 'सबमिट करने से पहले साइन इन करें', hing: 'Submit karne se pehle sign in karo' },
        description: {
          en: 'You must be signed in to submit. This links the form to your account so you can track the project in your portal later.',
          hi: 'सबमिट करने के लिए साइन इन ज़रूरी है। यह फॉर्म को आपके खाते से जोड़ता है ताकि बाद में प्रोजेक्ट ट्रैक कर सकें।',
          hing: 'Submit karne ke liye sign in zaroori hai. Ye form ko aapke account se jodta hai taaki baad mein project track kar sako.',
        },
        position: 'right',
      },
      {
        target: 'free-mockup',
        page: '/contact',
        title: { en: 'Or Request a Free Mockup', hi: 'या मुफ़्त मॉकअप रिक्वेस्ट करें', hing: 'Ya free mockup request karo' },
        description: {
          en: 'Not ready to commit? Request a free mockup of your homepage. See the design first, then decide. No pressure at all.',
          hi: 'तय नहीं हैं? अपने होमपेज का मुफ़्त मॉकअप रिक्वेस्ट करें। पहले डिज़ाइन देखें, फिर तय करें। कोई दबाव नहीं।',
          hing: 'Decide nahi kar paaye? Apne homepage ka free mockup request karo. Pehle design dekho, phir decide karo. Koi pressure nahi.',
        },
        position: 'left',
      },
    ],
  },
  {
    id: 'plans-pricing',
    title: {
      en: 'Plans & Pricing Overview',
      hi: 'प्लान और प्राइसिंग',
      hing: 'Plans aur Pricing',
    },
    description: {
      en: 'Understand all three plans — Starter, Business, and Premium — and choose what fits your business.',
      hi: 'तीनों प्लान समझें — स्टार्टर, बिज़नेस, और प्रीमियम — और चुनें जो आपके बिज़नेस के लिए सही हो।',
      hing: 'Teeno plans samjho — Starter, Business, aur Premium — aur chuno jo aapke business ke liye sahi ho.',
    },
    color: 'bg-lavender',
    device: 'all',
    steps: [
      {
        target: 'starter-plan',
        page: '/services',
        title: { en: 'Starter Plan — Rs 2,500', hi: 'स्टार्टर प्लान — 2,500 रुपये', hing: 'Starter Plan — 2,500 rupaye' },
        description: {
          en: 'Perfect for getting online quickly. Single page design, mobile responsive, Instagram DM, basic SEO, 1 revision round, 3-day delivery.',
          hi: 'जल्दी ऑनलाइन आने के लिए बिल्कुल सही। सिंगल पेज, मोबाइल रिस्पॉन्सिव, इंस्टाग्राम DM, बेसिक SEO, 1 रिवीज़न, 3 दिन डिलीवरी।',
          hing: 'Jaldi online aane ke liye bilkul sahi. Single page, mobile responsive, Instagram DM, basic SEO, 1 revision, 3 din delivery.',
        },
        position: 'right',
      },
      {
        target: 'business-plan',
        page: '/services',
        title: { en: 'Business Plan — Rs 6,000', hi: 'बिज़नेस प्लान — 6,000 रुपये', hing: 'Business Plan — 6,000 rupaye' },
        description: {
          en: 'Most popular! Up to 5 pages, SEO optimization, contact form, Instagram DM, scroll animations, 2 revision rounds, 7-day delivery.',
          hi: 'सबसे लोकप्रिय! 5 पेज तक, SEO ऑप्टिमाइज़ेशन, कॉन्टैक्ट फॉर्म, इंस्टाग्राम DM, स्क्रॉल एनिमेशन, 2 रिवीज़न, 7 दिन डिलीवरी।',
          hing: 'Sabse popular! 5 pages tak, SEO optimization, contact form, Instagram DM, scroll animations, 2 revisions, 7 din delivery.',
        },
        position: 'right',
      },
      {
        target: 'premium-plan',
        page: '/services',
        title: { en: 'Premium Plan — Rs 12,000', hi: 'प्रीमियम प्लान — 12,000 रुपये', hing: 'Premium Plan — 12,000 rupaye' },
        description: {
          en: 'The full package. Unlimited pages, custom dashboard, database, admin panel, custom tools, 3 revision rounds, 14-day delivery.',
          hi: 'पूरा पैकेज। अनलिमिटेड पेज, कस्टम डैशबोर्ड, डेटाबेस, एडमिन पैनल, कस्टम टूल्स, 3 रिवीज़न, 14 दिन डिलीवरी।',
          hing: 'Poora package. Unlimited pages, custom dashboard, database, admin panel, custom tools, 3 revisions, 14 din delivery.',
        },
        position: 'left',
      },
      {
        target: 'process-section',
        page: '/services',
        title: { en: 'How We Work Together', hi: 'हम साथ कैसे काम करते हैं', hing: 'Hum saath kaise kaam karte hain' },
        description: {
          en: '4 clear steps: 1) Discovery Call — discuss your needs, 2) Free Mockup — see the design, 3) Development — build with modern tech, 4) Launch — go live with support.',
          hi: '4 स्पष्ट स्टेप: 1) डिस्कवरी कॉल — ज़रूरतें बताएं, 2) मुफ़्त मॉकअप — डिज़ाइन देखें, 3) डेवलपमेंट — बिल्ड करें, 4) लॉन्च — सपोर्ट के साथ लाइव।',
          hing: '4 clear steps: 1) Discovery Call — zarooratein batao, 2) Free Mockup — design dekho, 3) Development — build karo, 4) Launch — support ke saath live.',
        },
        position: 'top',
      },
    ],
  },
  {
    id: 'track-project',
    title: {
      en: 'Track Your Project',
      hi: 'अपना प्रोजेक्ट ट्रैक करें',
      hing: 'Apna project track karo',
    },
    description: {
      en: 'See how to check project status, progress, delivery dates, and developer notes in your portal.',
      hi: 'जानें कि अपने पोर्टल में प्रोजेक्ट स्टेटस, प्रोग्रेस, डिलीवरी डेट और डेवलपर नोट्स कैसे देखें।',
      hing: 'Jaano ki apne portal mein project status, progress, delivery date aur developer notes kaise dekho.',
    },
    color: 'bg-coral',
    device: 'all',
    steps: [
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Open Your Portal', hi: 'अपना पोर्टल खोलें', hing: 'Apna portal kholo' },
        description: {
          en: 'After signing in, click your profile photo or avatar in the header. This opens the User Panel on the right side with your project details.',
          hi: 'साइन इन करने के बाद, हेडर में अपनी प्रोफ़ाइल फ़ोटो दबाएं। इससे दाईं ओर यूज़र पैनल खुलता है।',
          hing: 'Sign in karne ke baad, header mein apni profile photo dabao. Isse right side mein User Panel khulta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Your Projects Tab', hi: 'आपका प्रोजेक्ट्स टैब', hing: 'Aapka Projects tab' },
        description: {
          en: 'Inside the User Panel, the "My Projects" tab shows all your submitted projects. Each project displays business name, plan type, and current status.',
          hi: 'यूज़र पैनल में "My Projects" टैब आपके सभी सबमिट किए प्रोजेक्ट दिखाता है। हर प्रोजेक्ट में बिज़नेस नाम, प्लान और स्टेटस होता है।',
          hing: 'User Panel mein "My Projects" tab aapke saare submitted projects dikhata hai. Har project mein business naam, plan aur status hota hai.',
        },
        position: 'bottom',
      },
      {
        target: 'dm-btn',
        page: '/',
        title: { en: 'Progress & Status Updates', hi: 'प्रोग्रेस और स्टेटस अपडेट', hing: 'Progress aur status updates' },
        description: {
          en: 'Each project has a real-time progress bar with percentage. Status flows: Inquiry, Discussion, Confirmed, In Progress, Review, Delivered. Each stage has a unique color.',
          hi: 'हर प्रोजेक्ट में रियल-टाइम प्रोग्रेस बार होता है। स्टेटस: इन्क्वायरी, डिस्कशन, कन्फर्म्ड, इन प्रोग्रेस, रिव्यू, डिलीवर्ड। हर स्टेज का अलग रंग है।',
          hing: 'Har project mein real-time progress bar hota hai. Status: Inquiry, Discussion, Confirmed, In Progress, Review, Delivered. Har stage ka alag rang hai.',
        },
        position: 'bottom',
      },
      {
        target: 'nav-links',
        page: '/',
        title: { en: 'Developer Notes & Delivery', hi: 'डेवलपर नोट्स और डिलीवरी', hing: 'Developer notes aur delivery' },
        description: {
          en: 'The developer adds notes visible to you like "Homepage done, working on contact form." The expected delivery date is shown so you know when to expect your website.',
          hi: 'डेवलपर नोट्स जोड़ता है जैसे "होमपेज हो गया, कॉन्टैक्ट फॉर्म पर काम चल रहा है।" डिलीवरी डेट भी दिखता है।',
          hing: 'Developer notes jodta hai jaise "Homepage ho gaya, contact form par kaam chal raha hai." Delivery date bhi dikhta hai.',
        },
        position: 'bottom',
      },
    ],
  },
  // NEW TUTORIALS
  {
    id: 'design-showcase',
    title: {
      en: '29 Design Showcase',
      hi: '29 डिज़ाइन शोकेस',
      hing: '29 Design Showcase',
    },
    description: {
      en: 'Explore all 29 unique design styles — from Glassmorphism to Cyberpunk, each with full demo pages.',
      hi: 'सभी 29 यूनिक डिज़ाइन स्टाइल देखें — ग्लासमॉर्फिज्म से साइबरपंक तक, हर एक के साथ फुल डेमो पेज।',
      hing: 'Saare 29 unique design styles dekho — Glassmorphism se Cyberpunk tak, har ek ke saath full demo pages.',
    },
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    device: 'all',
    steps: [
      {
        target: 'nav-links',
        page: '/',
        title: { en: 'Go to Designs Page', hi: 'डिज़ाइन पेज पर जाएं', hing: 'Designs page par jao' },
        description: {
          en: 'Click "Designs" in the navigation menu. This opens the design showcase with all 29 unique design styles.',
          hi: 'नेविगेशन मेनू में "Designs" पर क्लिक करें। इससे 29 यूनिक डिज़ाइन स्टाइल वाला शोकेस खुलता है।',
          hing: 'Navigation menu mein "Designs" par click karo. Isse 29 unique design styles wala showcase khulta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Browse All Designs', hi: 'सभी डिज़ाइन ब्राउज़ करें', hing: 'Saare designs browse karo' },
        description: {
          en: 'Each design card shows a preview, name, and category. Click any design to see its full demo website with multiple pages.',
          hi: 'हर डिज़ाइन कार्ड में प्रीव्यू, नाम और कैटेगरी दिखती है। किसी भी डिज़ाइन पर क्लिक करें और फुल डेमो वेबसाइट देखें।',
          hing: 'Har design card mein preview, naam aur category dikhti hai. Kisi bhi design par click karo aur full demo website dekho.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Filter by Category', hi: 'कैटेगरी से फ़िल्टर करें', hing: 'Category se filter karo' },
        description: {
          en: 'Use category filters to find designs by style — Modern, Classic, Creative, Minimal, or Dark themes.',
          hi: 'कैटेगरी फ़िल्टर से स्टाइल के हिसाब से डिज़ाइन खोजें — मॉडर्न, क्लासिक, क्रिएटिव, मिनिमल, या डार्क थीम।',
          hing: 'Category filters se style ke hisaab se designs khojo — Modern, Classic, Creative, Minimal, ya Dark themes.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Each Design Has5 Pages', hi: 'हर डिज़ाइन में 5 पेज हैं', hing: 'Har design mein 5 pages hain' },
        description: {
          en: 'Every design includes Home, About, Gallery, Services, and Contact pages — all styled in that unique design language.',
          hi: 'हर डिज़ाइन में Home, About, Gallery, Services, और Contact पेज हैं — सभी उस यूनिक डिज़ाइन लैंग्वेज में स्टाइल्ड।',
          hing: 'Har design mein Home, About, Gallery, Services, aur Contact pages hain — sab us unique design language mein styled.',
        },
        position: 'bottom',
      },
    ],
  },
  {
    id: 'google-signin',
    title: {
      en: 'Google Sign-In & Privacy',
      hi: 'Google साइन-इन और प्राइवेसी',
      hing: 'Google Sign-In aur Privacy',
    },
    description: {
      en: 'Learn how Google Sign-In works, what data we access, and how your privacy is protected.',
      hi: 'जानें Google साइन-इन कैसे काम करता है, हम कौन सा डेटा एक्सेस करते हैं, और आपकी प्राइवेसी कैसे सुरक्षित है।',
      hing: 'Jaano Google Sign-In kaise kaam karta hai, hum kaun sa data access karte hain, aur aapki privacy kaise secure hai.',
    },
    color: 'bg-gradient-to-r from-blue-500 to-green-500',
    device: 'all',
    steps: [
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Click Sign In Button', hi: 'साइन इन बटन पर क्लिक करें', hing: 'Sign In button par click karo' },
        description: {
          en: 'Click the Google "G" icon or "Sign In" button in the header. A popup will appear asking you to choose your Google account.',
          hi: 'हेडर में Google "G" आइकन या "Sign In" बटन पर क्लिक करें। एक पॉपअप आएगा जो आपका Google अकाउंट चुनने को कहेगा।',
          hing: 'Header mein Google "G" icon ya "Sign In" button par click karo. Ek popup aayega jo aapka Google account chunne ko kahega.',
        },
        position: 'bottom',
      },
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'What Data We Access', hi: 'हम कौन सा डेटा एक्सेस करते हैं', hing: 'Hum kaun sa data access karte hain' },
        description: {
          en: 'We ONLY access: your email address, name, and profile photo. We do NOT access your contacts, files, calendar, or any other Google data.',
          hi: 'हम केवल एक्सेस करते हैं: आपका ईमेल, नाम और प्रोफ़ाइल फ़ोटो। हम आपके कॉन्टैक्ट्स, फ़ाइलें, कैलेंडर या कोई अन्य Google डेटा एक्सेस नहीं करते।',
          hing: 'Hum sirf access karte hain: aapka email, naam aur profile photo. Hum aapke contacts, files, calendar ya koi aur Google data access nahi karte.',
        },
        position: 'bottom',
      },
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Privacy Policy & Terms', hi: 'प्राइवेसी पॉलिसी और टर्म्स', hing: 'Privacy Policy aur Terms' },
        description: {
          en: 'Before signing in, you can read our Privacy Policy and Terms of Service. Links are available in the login popup and footer.',
          hi: 'साइन इन करने से पहले, आप हमारी प्राइवेसी पॉलिसी और टर्म्स ऑफ़ सर्विस पढ़ सकते हैं। लिंक लॉगिन पॉपअप में उपलब्ध हैं।',
          hing: 'Sign in karne se pehle, aap hamari Privacy Policy aur Terms of Service padh sakte ho. Links login popup mein available hain.',
        },
        position: 'bottom',
      },
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Your Data is Safe', hi: 'आपका डेटा सुरक्षित है', hing: 'Aapka data safe hai' },
        description: {
          en: 'Your data is stored securely in Firebase with encryption. We never share your information with third parties. You can delete your account anytime.',
          hi: 'आपका डेटा Firebase में एन्क्रिप्शन के साथ सुरक्षित रूप से स्टोर है। हम कभी भी आपकी जानकारी तीसरे पक्ष को साझा नहीं करते।',
          hing: 'Aapka data Firebase mein encryption ke saath secure store hai. Hum kabhi bhi aapki information third parties ko share nahi karte.',
        },
        position: 'bottom',
      },
    ],
  },
  {
    id: 'user-portal',
    title: {
      en: 'User Portal Guide',
      hi: 'यूज़र पोर्टल गाइड',
      hing: 'User Portal Guide',
    },
    description: {
      en: 'Learn how to use your client portal — track projects, view status, and manage your requests.',
      hi: 'अपना क्लाइंट पोर्टल कैसे उपयोग करें — प्रोजेक्ट ट्रैक करें, स्टेटस देखें, और अनुरोध प्रबंधित करें।',
      hing: 'Apna client portal kaise use karo — projects track karo, status dekho, aur requests manage karo.',
    },
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    device: 'all',
    steps: [
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Open User Panel', hi: 'यूज़र पैनल खोलें', hing: 'User Panel kholo' },
        description: {
          en: 'After signing in, click your profile photo in the header. This opens the User Panel sidebar on the right.',
          hi: 'साइन इन करने के बाद, हेडर में अपनी प्रोफ़ाइल फ़ोटो पर क्लिक करें। इससे दाईं ओर यूज़र पैनल साइडबार खुलता है।',
          hing: 'Sign in karne ke baad, header mein apni profile photo par click karo. Isse right side mein User Panel sidebar khulta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'My Projects Tab', hi: 'माय प्रोजेक्ट्स टैब', hing: 'My Projects tab' },
        description: {
          en: 'The "My Projects" tab shows all your submitted projects with business name, plan, status, and progress percentage.',
          hi: '"My Projects" टैब आपके सभी सबमिट किए प्रोजेक्ट दिखाता है — बिज़नेस नाम, प्लान, स्टेटस और प्रोग्रेस प्रतिशत।',
          hing: '"My Projects" tab aapke saare submitted projects dikhata hai — business naam, plan, status aur progress percentage.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Project Status Colors', hi: 'प्रोजेक्ट स्टेटस कलर', hing: 'Project status colors' },
        description: {
          en: 'Status colors: Yellow=Inquiry, Blue=Discussion, Purple=Confirmed, Orange=In Progress, Green=Review, Gold=Delivered.',
          hi: 'स्टेटस कलर: पीला=इन्क्वायरी, नीला=डिस्कशन, बैंगनी=कन्फर्म्ड, नारंगी=इन प्रोग्रेस, हरा=रिव्यू, सुनहरा=डिलीवर्ड।',
          hing: 'Status colors: Peela=Inquiry, Neela=Discussion, Baingani=Confirmed, Narangi=In Progress, Hara=Review, Sunhera=Delivered.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Developer Notes', hi: 'डेवलपर नोट्स', hing: 'Developer notes' },
        description: {
          en: 'The developer adds notes like "Homepage done, working on contact form." These appear in your project details so you know what\'s happening.',
          hi: 'डेवलपर नोट्स जोड़ता है जैसे "होमपेज हो गया, कॉन्टैक्ट फॉर्म पर काम चल रहा है।" ये आपकी प्रोजेक्ट डिटेल्स में दिखते हैं।',
          hing: 'Developer notes jodta hai jaise "Homepage ho gaya, contact form par kaam chal raha hai." Ye aapki project details mein dikhte hain.',
        },
        position: 'bottom',
      },
    ],
  },
  {
    id: 'cookie-consent',
    title: {
      en: 'Cookie Consent',
      hi: 'कुकी सहमति',
      hing: 'Cookie Consent',
    },
    description: {
      en: 'Understand how cookies work on this website and how to manage your preferences.',
      hi: 'समझें कि इस वेबसाइट पर कुकीज़ कैसे काम करती हैं और अपनी प्राथमिकताएं कैसे प्रबंधित करें।',
      hing: 'Samjho ki is website par cookies kaise kaam karti hain aur apni preferences kaise manage karo.',
    },
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    device: 'all',
    steps: [
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Cookie Banner Appears', hi: 'कुकी बैनर दिखता है', hing: 'Cookie banner dikhta hai' },
        description: {
          en: 'When you first visit, a cookie consent banner appears at the bottom. It explains that we use cookies for better experience.',
          hi: 'जब आप पहली बार विज़िट करते हैं, नीचे एक कुकी सहमति बैनर दिखता है। यह बताता है कि हम बेहतर अनुभव के लिए कुकीज़ का उपयोग करते हैं।',
          hing: 'Jab aap pehli baar visit karte ho, neeche ek cookie consent banner dikhta hai. Ye batata hai ki hum better experience ke liye cookies use karte hain.',
        },
        position: 'top',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Accept or Decline', hi: 'स्वीकार करें या अस्वीकार', hing: 'Accept karo ya Decline' },
        description: {
          en: 'Click "Accept All" to allow cookies for analytics and personalization. Click "Decline" to use the site without cookies.',
          hi: 'एनालिटिक्स और पर्सनलाइज़ेशन के लिए कुकीज़ की अनुमति देने के लिए "Accept All" पर क्लिक करें। बिना कुकीज़ के साइट उपयोग करने के लिए "Decline" पर क्लिक करें।',
          hing: 'Analytics aur personalization ke liye cookies ki permission dene ke liye "Accept All" par click karo. Bina cookies ke site use karne ke liye "Decline" par click karo.',
        },
        position: 'top',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Learn More in Privacy Policy', hi: 'प्राइवेसी पॉलिसी में और जानें', hing: 'Privacy Policy mein aur jaano' },
        description: {
          en: 'Click "Learn more" in the cookie banner to read our full Privacy Policy about how we use cookies and protect your data.',
          hi: 'कुकी बैनर में "Learn more" पर क्लिक करें और हमारी पूरी प्राइवेसी पॉलिसी पढ़ें।',
          hing: 'Cookie banner mein "Learn more" par click karo aur hamari full Privacy Policy padho.',
        },
        position: 'top',
      },
    ],
  },
]
