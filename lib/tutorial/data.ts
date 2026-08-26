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
      en: 'Take a complete tour of the portfolio. See all pages, features, and demo projects live.',
      hi: 'पोर्टफोलियो का पूरा टूर लें। सभी पेज, फीचर्स और डेमो प्रोजेक्ट्स लाइव देखें।',
      hing: 'Portfolio ka poora tour lo. Saare pages, features aur demo projects live dekho.',
    },
    color: 'bg-accent',
    device: 'all',
    steps: [
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Welcome to the Homepage', hi: 'होमपेज पर स्वागत है', hing: 'Homepage par swagat hai' },
        description: {
          en: 'This is where you see Mohd Haziq\'s work. Professional web developer building websites for businesses like restaurants, gyms, and coaching centers.',
          hi: 'यहाँ आप मोहम्मद हाज़िक का काम देख सकते हैं। प्रोफेशनल वेब डेवलपर जो रेस्टोरेंट, जिम और कोचिंग सेंटर जैसे बिज़नेस के लिए वेबसाइट बनाते हैं।',
          hing: 'Yahan aap Mohd Haziq ka kaam dekh sakte ho. Professional web developer jo restaurant, gym aur coaching center jaise business ke liye website banate hain.',
        },
        position: 'bottom',
      },
      {
        target: 'nav-links',
        page: '/',
        title: { en: 'Browse All Pages', hi: 'सभी पेज ब्राउज़ करें', hing: 'Saare pages browse karo' },
        description: {
          en: 'Use the menu to visit Home, About, Projects, Services, Designs, Tutorials, and Contact. Each page shows different information about the services.',
          hi: 'मेनू से Home, About, Projects, Services, Designs, Tutorials और Contact पेज पर जाएं। हर पेज अलग जानकारी दिखाता है।',
          hing: 'Menu se Home, About, Projects, Services, Designs, Tutorials aur Contact page par jao. Har page alag information dikhata hai.',
        },
        position: 'bottom',
      },
      {
        target: 'projects-section',
        page: '/',
        title: { en: 'See Live Demo Projects', hi: 'लाइव डेमो प्रोजेक्ट्स देखें', hing: 'Live demo projects dekho' },
        description: {
          en: 'Here are fully-built demo websites — a restaurant, a coaching center, and a gym. Click any demo to see how YOUR website could look.',
          hi: 'यहाँ पूरी तरह बनी डेमो वेबसाइट्स हैं — रेस्टोरेंट, कोचिंग सेंटर और जिम। किसी भी डेमो पर क्लिक करें और देखें आपकी वेबसाइट कैसी दिख सकती है।',
          hing: 'Yahan fully-built demo websites hain — restaurant, coaching center aur gym. Kisi bhi demo par click karo aur dekho AAPKI website kaisi dikh sakti hai.',
        },
        position: 'top',
      },
      {
        target: 'services-section',
        page: '/',
        title: { en: 'View Plans & Pricing', hi: 'प्लान और प्राइसिंग देखें', hing: 'Plans aur pricing dekho' },
        description: {
          en: 'Three plans: Starter (₹2,500), Business (₹6,000), Premium (₹12,000). Clear pricing, no hidden fees. Choose what fits your budget.',
          hi: 'तीन प्लान: स्टार्टर (₹2,500), बिज़नेस (₹6,000), प्रीमियम (₹12,000)। साफ़ प्राइसिंग, कोई छिपी फीस नहीं। अपने बजट के हिसाब से चुनें।',
          hing: 'Teen plans: Starter (₹2,500), Business (₹6,000), Premium (₹12,000). Saaf pricing, koi hidden fees nahi. Apne budget ke hisaab se chuno.',
        },
        position: 'top',
      },
      {
        target: 'cta-section',
        page: '/',
        title: { en: 'Get a FREE Mockup', hi: 'फ्री मॉकअप पाएं', hing: 'FREE mockup pao' },
        description: {
          en: 'Not sure yet? Get a FREE homepage mockup for your business. See the design before you pay. No risk, no pressure.',
          hi: 'अभी तय नहीं? अपने बिज़नेस के लिए फ्री होमपेज मॉकअप पाएं। पेमेंट से पहले डिज़ाइन देखें। कोई रिस्क नहीं, कोई प्रेशर नहीं।',
          hing: 'Abhi decide nahi? Apne business ke liye FREE homepage mockup pao. Payment se pehle design dekho. Koi risk nahi, koi pressure nahi.',
        },
        position: 'top',
      },
    ],
  },
  {
    id: 'free-mockup',
    title: {
      en: 'How to Get FREE Mockup',
      hi: 'फ्री मॉकअप कैसे पाएं',
      hing: 'FREE mockup kaise pao',
    },
    description: {
      en: 'Step-by-step guide to get a free homepage mockup for your business. See the design before you pay anything.',
      hi: 'अपने बिज़नेस के लिए फ्री होमपेज मॉकअप पाने की पूरी गाइड। पेमेंट से पहले डिज़ाइन देखें।',
      hing: 'Apne business ke liye FREE homepage mockup paane ki poori guide. Payment se pehle design dekho.',
    },
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    device: 'all',
    steps: [
      {
        target: 'dm-btn',
        page: '/',
        title: { en: 'Step 1: Contact Us', hi: 'स्टेप 1: हमसे संपर्क करें', hing: 'Step 1: Humse contact karo' },
        description: {
          en: 'Click the "DM Me" button or go to Contact page. Tell us about your business — what you do, who are your customers.',
          hi: '"DM Me" बटन दबाएं या Contact पेज पर जाएं। हमें अपने बिज़नेस के बारे में बताएं — आप क्या करते हैं, आपके ग्राहक कौन हैं।',
          hing: '"DM Me" button dabao ya Contact page par jao. Humein apne business ke baare mein batao — aap kya karte ho, aapke customers kaun hain.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 2: We Design Your Mockup', hi: 'स्टेप 2: हम आपका मॉकअप बनाते हैं', hing: 'Step 2: Hum aapka mockup banate hain' },
        description: {
          en: 'Within 24-48 hours, we create a custom homepage design for your business. Unique design, not a template.',
          hi: '24-48 घंटे में, हम आपके बिज़नेस के लिए कस्टम होमपेज डिज़ाइन बनाते हैं। यूनिक डिज़ाइन, कोई टेम्पलेट नहीं।',
          hing: '24-48 ghante mein, hum aapke business ke liye custom homepage design banate hain. Unique design, koi template nahi.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 3: Review & Decide', hi: 'स्टेप 3: रिव्यू करें और तय करें', hing: 'Step 3: Review karo aur decide karo' },
        description: {
          en: 'See the mockup, suggest changes if needed. If you like it, we start building. If not, no problem — it\'s completely FREE.',
          hi: 'मॉकअप देखें, ज़रूरत पड़ने पर बदलाव बताएं। पसंद आए तो बनाना शुरू करें। नहीं तो कोई बात नहीं — बिल्कुल फ्री है।',
          hing: 'Mockup dekho, zaroorat padne par changes batao. Pasand aaye toh banana shuru karo. Nahi toh koi baat nahi — bilkul FREE hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'No Payment Required', hi: 'कोई पेमेंट नहीं', hing: 'Koi payment nahi' },
        description: {
          en: 'The mockup is 100% FREE. You only pay when you decide to build the full website. Zero risk.',
          hi: 'मॉकअप 100% फ्री है। आप तभी पेमेंट करते हैं जब फुल वेबसाइट बनाने का तय करें। ज़ीरो रिस्क।',
          hing: 'Mockup 100% FREE hai. Aap tabhi payment karte ho jab full website banana ka decide karo. Zero risk.',
        },
        position: 'bottom',
      },
    ],
  },
  {
    id: 'how-to-contact',
    title: {
      en: 'How to Contact & Hire',
      hi: 'कैसे संपर्क करें और हायर करें',
      hing: 'Kaise contact karein aur hire karein',
    },
    description: {
      en: 'Learn the fastest ways to reach out — DM button, contact form, or Instagram. Get a reply within 2 hours.',
      hi: 'संपर्क के सबसे तेज़ तरीके — DM बटन, कॉन्टैक्ट फॉर्म, या इंस्टाग्राम। 2 घंटे में जवाब मिलेगा।',
      hing: 'Contact ke sabse fast tarike — DM button, contact form, ya Instagram. 2 ghante mein reply milega.',
    },
    color: 'bg-success',
    device: 'all',
    steps: [
      {
        target: 'dm-btn',
        page: '/',
        title: { en: 'Fastest: DM on Instagram', hi: 'सबसे तेज़: इंस्टाग्राम पर DM', hing: 'Sabse fast: Instagram par DM' },
        description: {
          en: 'Click "DM Me" button in the header. Opens Instagram directly to @haziq.built. Reply within 2 hours.',
          hi: 'हेडर में "DM Me" बटन दबाएं। सीधे @haziq.built पर इंस्टाग्राम खुलता है। 2 घंटे में जवाब।',
          hing: 'Header mein "DM Me" button dabao. Sidha @haziq.built par Instagram khulta hai. 2 ghante mein reply.',
        },
        position: 'bottom',
      },
      {
        target: 'contact-form',
        page: '/contact',
        title: { en: 'Fill Contact Form', hi: 'कॉन्टैक्ट फॉर्म भरें', hing: 'Contact form bharein' },
        description: {
          en: 'Go to Contact page, fill your name, business name, select a plan, describe what you need. Submit and we\'ll reach out.',
          hi: 'Contact पेज पर जाएं, नाम, बिज़नेस नाम भरें, प्लान चुनें, बताएं क्या चाहिए। सबमिट करें और हम संपर्क करेंगे।',
          hing: 'Contact page par jao, naam, business naam bharein, plan chuno, batao kya chahiye. Submit karo aur hum contact karenge.',
        },
        position: 'right',
      },
      {
        target: 'instagram-card',
        page: '/contact',
        title: { en: 'Instagram DM Card', hi: 'इंस्टाग्राम DM कार्ड', hing: 'Instagram DM card' },
        description: {
          en: 'On Contact page, there\'s an Instagram DM card. Click "Send a DM" to start chatting directly.',
          hi: 'Contact पेज पर इंस्टाग्राम DM कार्ड है। "Send a DM" पर क्लिक करें और सीधे चैट शुरू करें।',
          hing: 'Contact page par Instagram DM card hai. "Send a DM" par click karo aur sidha chat shuru karo.',
        },
        position: 'left',
      },
      {
        target: 'free-mockup',
        page: '/contact',
        title: { en: 'Request FREE Mockup', hi: 'फ्री मॉकअप रिक्वेस्ट करें', hing: 'FREE mockup request karo' },
        description: {
          en: 'On Contact page, there\'s a "Free Mockup" section. Fill the form and get a custom homepage design for FREE.',
          hi: 'Contact पेज पर "Free Mockup" सेक्शन है। फॉर्म भरें और फ्री में कस्टम होमपेज डिज़ाइन पाएं।',
          hing: 'Contact page par "Free Mockup" section hai. Form bharein aur FREE mein custom homepage design pao.',
        },
        position: 'left',
      },
    ],
  },
  {
    id: 'choose-plan',
    title: {
      en: 'Which Plan is Right for You?',
      hi: 'कौन सा प्लान सही है आपके लिए?',
      hing: 'Kaun sa plan sahi hai aapke liye?',
    },
    description: {
      en: 'Compare all three plans and choose the best one for your business needs and budget.',
      hi: 'तीनों प्लान की तुलना करें और अपनी ज़रूरत और बजट के हिसाब से सबसे अच्छा चुनें।',
      hing: 'Teeno plans ki tulna karo aur apni zaroorat aur budget ke hisaab se sabse achha chuno.',
    },
    color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    device: 'all',
    steps: [
      {
        target: 'starter-plan',
        page: '/services',
        title: { en: 'Starter — ₹2,500', hi: 'स्टार्टर — ₹2,500', hing: 'Starter — ₹2,500' },
        description: {
          en: 'Best for: Small businesses just getting online. Single page, mobile responsive, basic SEO, 3-day delivery. Perfect if you need a simple online presence.',
          hi: 'बेस्ट फॉर: छोटे बिज़नेस जो अभी ऑनलाइन आ रहे हैं। सिंगल पेज, मोबाइल रिस्पॉन्सिव, बेसिक SEO, 3 दिन में डिलीवरी।',
          hing: 'Best for: Chhote business jo abhi online aa rahe hain. Single page, mobile responsive, basic SEO, 3 din mein delivery.',
        },
        position: 'right',
      },
      {
        target: 'business-plan',
        page: '/services',
        title: { en: 'Business — ₹6,000 (Most Popular)', hi: 'बिज़नेस — ₹6,000 (सबसे लोकप्रिय)', hing: 'Business — ₹6,000 (Sabse popular)' },
        description: {
          en: 'Best for: Growing businesses. Up to 5 pages, contact form, SEO optimization, scroll animations, 7-day delivery. Most clients choose this.',
          hi: 'बेस्ट फॉर: बढ़ते बिज़नेस। 5 पेज तक, कॉन्टैक्ट फॉर्म, SEO ऑप्टिमाइज़ेशन, स्क्रॉल एनिमेशन, 7 दिन में डिलीवरी।',
          hing: 'Best for: Badhte business. 5 pages tak, contact form, SEO optimization, scroll animations, 7 din mein delivery.',
        },
        position: 'right',
      },
      {
        target: 'premium-plan',
        page: '/services',
        title: { en: 'Premium — ₹12,000', hi: 'प्रीमियम — ₹12,000', hing: 'Premium — ₹12,000' },
        description: {
          en: 'Best for: Established businesses. Unlimited pages, custom dashboard, database, admin panel, 14-day delivery. Full custom solution.',
          hi: 'बेस्ट फॉर: स्थापित बिज़नेस। अनलिमिटेड पेज, कस्टम डैशबोर्ड, डेटाबेस, एडमिन पैनल, 14 दिन में डिलीवरी।',
          hing: 'Best for: Sthapit business. Unlimited pages, custom dashboard, database, admin panel, 14 din mein delivery.',
        },
        position: 'left',
      },
      {
        target: 'process-section',
        page: '/services',
        title: { en: 'How We Work', hi: 'हम कैसे काम करते हैं', hing: 'Hum kaise kaam karte hain' },
        description: {
          en: '4 steps: 1) Discuss your needs, 2) FREE mockup, 3) Build with modern tech, 4) Launch with support. Simple and transparent.',
          hi: '4 स्टेप: 1) ज़रूरतें बताएं, 2) फ्री मॉकअप, 3) मॉडर्न टेक से बनाएं, 4) सपोर्ट के साथ लॉन्च। सरल और पारदर्शी।',
          hing: '4 steps: 1) Zarooratein batao, 2) FREE mockup, 3) Modern tech se banao, 4) Support ke saath launch. Saral aur pardarshi.',
        },
        position: 'top',
      },
    ],
  },
  {
    id: 'delivery-process',
    title: {
      en: 'Website Delivery Process',
      hi: 'वेबसाइट डिलीवरी प्रोसेस',
      hing: 'Website delivery process',
    },
    description: {
      en: 'What happens after you order? See the complete process from order to launch.',
      hi: 'ऑर्डर के बाद क्या होता है? ऑर्डर से लॉन्च तक की पूरी प्रोसेस देखें।',
      hing: 'Order ke baad kya hota hai? Order se launch tak ki poori process dekho.',
    },
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    device: 'all',
    steps: [
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 1: Order Confirmed', hi: 'स्टेप 1: ऑर्डर कन्फर्म', hing: 'Step 1: Order confirm' },
        description: {
          en: 'After you choose a plan and pay 50% advance, your order is confirmed. You get a confirmation message with timeline.',
          hi: 'प्लान चुनने और 50% एडवांस पेमेंट के बाद, आपका ऑर्डर कन्फर्म हो जाता है। टाइमलाइन के साथ कन्फर्मेशन मैसेज मिलता है।',
          hing: 'Plan chunne aur 50% advance payment ke baad, aapka order confirm ho jaata hai. Timeline ke saath confirmation message milta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 2: Design Phase', hi: 'स्टेप 2: डिज़ाइन फेज़', hing: 'Step 2: Design phase' },
        description: {
          en: 'We create the design based on your business. You see mockups, suggest changes. We revise until you\'re happy.',
          hi: 'हम आपके बिज़नेस के हिसाब से डिज़ाइन बनाते हैं। आप मॉकअप देखते हैं, बदलाव बताते हैं। जब तक आप खुश न हों, हम रिवाइज़ करते हैं।',
          hing: 'Hum aapke business ke hisaab se design banate hain. Aap mockup dekhte hain, changes batate hain. Jab tak aap khush na ho, hum revise karte hain.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 3: Development', hi: 'स्टेप 3: डेवलपमेंट', hing: 'Step 3: Development' },
        description: {
          en: 'We build your website with modern tech — fast loading, mobile responsive, SEO optimized. You can track progress in your portal.',
          hi: 'हम मॉडर्न टेक से वेबसाइट बनाते हैं — फास्ट लोडिंग, मोबाइल रिस्पॉन्सिव, SEO ऑप्टिमाइज़्ड। आप पोर्टल में प्रोग्रेस ट्रैक कर सकते हैं।',
          hing: 'Hum modern tech se website banate hain — fast loading, mobile responsive, SEO optimized. Aap portal mein progress track kar sakte ho.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 4: Review & Launch', hi: 'स्टेप 4: रिव्यू और लॉन्च', hing: 'Step 4: Review aur launch' },
        description: {
          en: 'We show you the final website. You review, suggest last changes. After approval, we launch it live. Pay remaining 50%.',
          hi: 'हम आपको फाइनल वेबसाइट दिखाते हैं। आप रिव्यू करते हैं, आखिरी बदलाव बताते हैं। अप्रूवल के बाद, हम लाइव लॉन्च करते हैं। बाकी 50% पेमेंट करें।',
          hing: 'Hum aapko final website dikhate hain. Aap review karte hain, aakhiri changes batate hain. Approval ke baad, hum live launch karte hain. Baaki 50% payment karo.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Step 5: Support & Maintenance', hi: 'स्टेप 5: सपोर्ट और मेंटेनेंस', hing: 'Step 5: Support aur maintenance' },
        description: {
          en: 'After launch, we provide support. Need changes? Contact us. We\'re here to help your website grow with your business.',
          hi: 'लॉन्च के बाद, हम सपोर्ट देते हैं। बदलाव चाहिए? हमसे संपर्क करें। हम आपकी वेबसाइट को आपके बिज़नेस के साथ बढ़ाने में मदद करते हैं।',
          hing: 'Launch ke baad, hum support dete hain. Changes chahiye? Humse contact karein. Hum aapki website ko aapke business ke saath badhane mein madad karte hain.',
        },
        position: 'bottom',
      },
    ],
  },
  {
    id: 'design-showcase',
    title: {
      en: '29 Design Styles',
      hi: '29 डिज़ाइन स्टाइल',
      hing: '29 Design styles',
    },
    description: {
      en: 'See all 29 unique design styles — Glassmorphism, Cyberpunk, Minimal, and more. Each with full demo pages.',
      hi: 'सभी 29 यूनिक डिज़ाइन स्टाइल देखें — ग्लासमॉर्फिज्म, साइबरपंक, मिनिमल और बहुत कुछ। हर एक के साथ फुल डेमो पेज।',
      hing: 'Saare 29 unique design styles dekho — Glassmorphism, Cyberpunk, Minimal aur bahut kuch. Har ek ke saath full demo pages.',
    },
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    device: 'all',
    steps: [
      {
        target: 'nav-links',
        page: '/',
        title: { en: 'Go to Designs Page', hi: 'डिज़ाइन पेज पर जाएं', hing: 'Designs page par jao' },
        description: {
          en: 'Click "Designs" in the menu. This opens the design showcase with all 29 unique styles.',
          hi: 'मेनू में "Designs" पर क्लिक करें। इससे 29 यूनिक स्टाइल वाला शोकेस खुलता है।',
          hing: 'Menu mein "Designs" par click karo. Isse 29 unique styles wala showcase khulta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Browse All Designs', hi: 'सभी डिज़ाइन ब्राउज़ करें', hing: 'Saare designs browse karo' },
        description: {
          en: 'Each card shows a preview and name. Click any design to see its full demo website with Home, About, Gallery, Services, Contact pages.',
          hi: 'हर कार्ड में प्रीव्यू और नाम दिखता है। किसी भी डिज़ाइन पर क्लिक करें और फुल डेमो वेबसाइट देखें।',
          hing: 'Har card mein preview aur naam dikhta hai. Kisi bhi design par click karo aur full demo website dekho.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Filter by Category', hi: 'कैटेगरी से फ़िल्टर करें', hing: 'Category se filter karo' },
        description: {
          en: 'Use filters to find designs by style — Modern, Classic, Creative, Minimal, or Dark themes.',
          hi: 'फ़िल्टर से स्टाइल के हिसाब से डिज़ाइन खोजें — मॉडर्न, क्लासिक, क्रिएटिव, मिनिमल, या डार्क थीम।',
          hing: 'Filters se style ke hisaab se designs khojo — Modern, Classic, Creative, Minimal, ya Dark themes.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/designs',
        title: { en: 'Each Design = 5 Pages', hi: 'हर डिज़ाइन = 5 पेज', hing: 'Har design = 5 pages' },
        description: {
          en: 'Every design includes Home, About, Gallery, Services, and Contact pages — all styled in that unique design language.',
          hi: 'हर डिज़ाइन में Home, About, Gallery, Services, और Contact पेज हैं — सभी उस यूनिक डिज़ाइन में स्टाइल्ड।',
          hing: 'Har design mein Home, About, Gallery, Services, aur Contact pages hain — sab us unique design mein styled.',
        },
        position: 'bottom',
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
        title: { en: 'Sign In First', hi: 'पहले साइन इन करें', hing: 'Pehle sign in karo' },
        description: {
          en: 'Click the Google icon in header to sign in. This creates your client portal to track projects.',
          hi: 'हेडर में Google आइकन पर क्लिक करके साइन इन करें। इससे आपका क्लाइंट पोर्टल बनता है।',
          hing: 'Header mein Google icon par click karke sign in karo. Isse aapka client portal banta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'user-btn',
        page: '/',
        title: { en: 'Open Your Portal', hi: 'अपना पोर्टल खोलें', hing: 'Apna portal kholo' },
        description: {
          en: 'After signing in, click your profile photo in header. This opens the User Panel with your project details.',
          hi: 'साइन इन के बाद, हेडर में प्रोफ़ाइल फ़ोटो पर क्लिक करें। इससे प्रोजेक्ट डिटेल्स वाला यूज़र पैनल खुलता है।',
          hing: 'Sign in ke baad, header mein profile photo par click karo. Isse project details wala User Panel khulta hai.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'See Project Status', hi: 'प्रोजेक्ट स्टेटस देखें', hing: 'Project status dekho' },
        description: {
          en: 'Each project shows: business name, plan, status (Inquiry → Discussion → Confirmed → In Progress → Review → Delivered), and progress percentage.',
          hi: 'हर प्रोजेक्ट में दिखता है: बिज़नेस नाम, प्लान, स्टेटस (इन्क्वायरी → डिस्कशन → कन्फर्म्ड → इन प्रोग्रेस → रिव्यू → डिलीवर्ड), और प्रोग्रेस प्रतिशत।',
          hing: 'Har project mein dikhta hai: business naam, plan, status (Inquiry → Discussion → Confirmed → In Progress → Review → Delivered), aur progress percentage.',
        },
        position: 'bottom',
      },
      {
        target: 'hero-section',
        page: '/',
        title: { en: 'Read Developer Notes', hi: 'डेवलपर नोट्स पढ़ें', hing: 'Developer notes padho' },
        description: {
          en: 'Developer adds notes like "Homepage done, working on contact form." Delivery date is also shown so you know when to expect your website.',
          hi: 'डेवलपर नोट्स जोड़ता है जैसे "होमपेज हो गया, कॉन्टैक्ट फॉर्म पर काम चल रहा है।" डिलीवरी डेट भी दिखता है।',
          hing: 'Developer notes jodta hai jaise "Homepage ho gaya, contact form par kaam chal raha hai." Delivery date bhi dikhta hai.',
        },
        position: 'bottom',
      },
    ],
  },
]
