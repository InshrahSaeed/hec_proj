export interface TranslationStrings {
  brandTitle: string;
  brandSubtitle: string;
  quickExit: string;
  quickExitTooltip: string;
  quickExitWarning: string;
  leaveNow: string;
  stayHere: string;
  emergencyNotice: string;
  homeTab: string;
  chatTab: string;
  safetyPlanTab: string;
  complaintTab: string;
  resourcesTab: string;
  evidenceGuideTab: string;
  aboutTab: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline1: string;
  heroTagline2: string;
  getHelpNow: string;
  chatWithAI: string;
  exploreResources: string;
  anonymousNotice: string;
  anonymousDetails: string;
  categoriesTitle: string;
  categoryBlackmail: string;
  categoryPhotoThreat: string;
  categoryFakeProfile: string;
  categoryAccountHack: string;
  categoryCyberstalking: string;
  categoryBullying: string;
  startAssessment: string;
  describeSituationPlaceholder: string;
  generatingPlan: string;
  planTitle: string;
  immediateSafety: string;
  whatNotToDo: string;
  evidenceChecklist: string;
  accountSecurity: string;
  reportingOptions: string;
  legalContextTitle: string;
  downloadPlan: string;
  copyPlan: string;
  copied: string;
  complaintGeneratorTitle: string;
  complaintGeneratorSubtitle: string;
  generateDraft: string;
  complaintDisclaimer: string;
  verifiedResourcesTitle: string;
  verifiedResourcesSubtitle: string;
  lastVerifiedOn: string;
  officialPortal: string;
  contactHelpline: string;
  chatPlaceholder: string;
  chatSend: string;
  chatSuggestedHeading: string;
  clearChat: string;
  newChat: string;
  chatDisclaimer: string;
  disclaimerText: string;
  rightsReserved: string;
}

export const translations: Record<'en' | 'ur' | 'ur-roman', TranslationStrings> = {
  en: {
    brandTitle: 'HIFAZAT',
    brandSubtitle: 'AI Safety Guide for Girls & Women in Pakistan',
    quickExit: 'Quick Exit',
    quickExitTooltip: 'Leaves this site immediately and opens a neutral page.',
    quickExitWarning:
      'Warning: Quick Exit immediately redirects this tab to a neutral site (Weather/News), but it CANNOT delete your browser history, network router logs, or spyware installed on your phone. Please use private/incognito browsing or clear your history afterwards if safe to do so.',
    leaveNow: 'Leave Now',
    stayHere: 'Stay on Site',
    emergencyNotice:
      'If you are in immediate physical danger, call Emergency Police (15) or Women Helpline (1043) immediately.',
    homeTab: 'Home',
    chatTab: 'Chat with AI',
    safetyPlanTab: 'Safety Plan',
    complaintTab: 'Draft Complaint',
    resourcesTab: 'Verified Helplines & NCCIA',
    evidenceGuideTab: 'Evidence Guide',
    aboutTab: 'About & Privacy',
    heroHeadline: 'Your space. Your safety.',
    heroSubheadline: 'You deserve to feel safe online.',
    heroTagline1:
      'Confidential, anonymous guidance for online blackmail, leaked photos threats, fake profiles, and cyber harassment in Pakistan.',
    heroTagline2: 'No account required. No image uploads. Grounded in Pakistani PECA law.',
    getHelpNow: 'Create Safety Plan',
    chatWithAI: 'Chat with HIFAZAT AI',
    exploreResources: 'Verified Contacts & NCCIA',
    anonymousNotice: '100% Anonymous & Private by Design',
    anonymousDetails:
      'We do not ask for your CNIC, passwords, phone number, or intimate pictures. Your information stays in your browser session.',
    categoriesTitle: 'What type of problem are you facing?',
    categoryBlackmail: 'Blackmail / Money Extortion',
    categoryPhotoThreat: 'Threats to Leak Private Photos/Videos',
    categoryFakeProfile: 'Fake Profile / Using My Photos',
    categoryAccountHack: 'Hacked Account / Unauthorized Access',
    categoryCyberstalking: 'Persistent Cyberstalking / Harassment',
    categoryBullying: 'Defamation / Cyberbullying',
    startAssessment: 'Generate My Safety Plan',
    describeSituationPlaceholder:
      'Briefly describe what happened (do not share passwords, CNIC, or personal names)...',
    generatingPlan: 'Analyzing situation with safety protocols...',
    planTitle: 'Your Customized Digital Safety Plan',
    immediateSafety: 'Immediate Actions To Take',
    whatNotToDo: 'What You Should AVOID Doing',
    evidenceChecklist: 'Evidence Preservation Checklist',
    accountSecurity: 'Account Security Hardening',
    reportingOptions: 'Official Reporting Pathways in Pakistan',
    legalContextTitle: 'Relevant Provisions under PECA 2016',
    downloadPlan: 'Download Safety Plan (Text)',
    copyPlan: 'Copy to Clipboard',
    copied: 'Copied!',
    complaintGeneratorTitle: 'NCCIA / Cybercrime Complaint Draft Generator',
    complaintGeneratorSubtitle:
      'Generate a structured, formal complaint draft based strictly on the facts you enter. HIFAZAT does NOT submit complaints automatically; you review, edit, and file via NCCIA portal.',
    generateDraft: 'Generate Official Draft',
    complaintDisclaimer:
      'This draft is an informational tool based on PECA 2016 guidelines. It is not formal legal counsel. Always review carefully before submitting to NCCIA at complaint.nccia.gov.pk.',
    verifiedResourcesTitle: 'Verified Pakistani Helplines & Authorities',
    verifiedResourcesSubtitle:
      'All government portals, emergency numbers, and civil society helplines verified with official sources.',
    lastVerifiedOn: 'Last verified',
    officialPortal: 'Visit Official Portal',
    contactHelpline: 'Call Helpline',
    chatPlaceholder: 'Ask HIFAZAT AI anything safely (in English, Urdu, or Roman Urdu)...',
    chatSend: 'Send',
    chatSuggestedHeading: 'Common questions & urgent topics:',
    clearChat: 'Clear Conversation',
    newChat: 'Start Fresh Session',
    chatDisclaimer:
      'HIFAZAT AI is a digital safety guidance assistant powered by Gemini. It does not provide legal representation or emergency rescue. If in immediate physical danger, contact emergency services.',
    disclaimerText:
      'HIFAZAT is an educational and guidance tool, not a law firm or police agency. It does not replace professional legal advice or emergency authorities.',
    rightsReserved: 'HIFAZAT — Privacy-First Digital Safety Guide for Girls'
  },
  ur: {
    brandTitle: 'حفاظت',
    brandSubtitle: 'پاکستانی خواتین اور لڑکیوں کے لیے ڈیجیٹل تحفظ کی اے آئی گائیڈ',
    quickExit: 'فوری خروج (کوئیک ایگزٹ)',
    quickExitTooltip: 'اس ویب سائٹ کو فوری بند کر کے محفوظ صفحہ کھولتا ہے۔',
    quickExitWarning:
      'انتباہ: "فوری خروج" کا بٹن دبانے سے یہ ٹیب فوری طور پر موسم یا خبروں کے صفحے پر چلی جائے گی، لیکن یہ آپ کے فون کی براؤزر ہسٹری یا راؤٹر کا ریکارڈ صاف نہیں کر سکتا۔ اگر محفوظ محسوس کریں تو براؤزر ہسٹری خود صاف کریں۔',
    leaveNow: 'ابھی باہر نکلیں',
    stayHere: 'اسی صفحے پر رہیں',
    emergencyNotice:
      'اگر آپ کو کسی فوری جسمانی خطرے یا حملے کا اندیشہ ہے تو فوری طور پر ایمرجنسی پولیس (15) یا ویمن ہیلپ لائن (1043) پر کال کریں۔',
    homeTab: 'مرکزی صفحہ',
    chatTab: 'حفاظت اے آئی سے بات کریں',
    safetyPlanTab: 'تحفظ کا لائحہ عمل',
    complaintTab: 'درخواست کا مسودہ',
    resourcesTab: 'تصدیق شدہ ادارے و ہیلپ لائنز',
    evidenceGuideTab: 'ثبوت محفوظ کرنے کی گائیڈ',
    aboutTab: 'ہمارے بارے میں و پرائیویسی',
    heroHeadline: 'آپ کی جگہ۔ آپ کا تحفظ۔',
    heroSubheadline: 'آپ کا انٹرنیٹ پر محفوظ رہنا بنیادی حق ہے۔',
    heroTagline1:
      'آن لائن بلیک میلنگ، نجی تصاویر لیک کرنے کی دھمکیوں، جعلی پروفائلز اور سائبر ہراسانی سے نمٹنے کے لیے مکمل طور پر خفیہ اور بلا معاوضہ رہنمائی۔',
    heroTagline2: 'کوئی اکاؤنٹ یا رجسٹریشن ضروری نہیں۔ تصاویر اپلوڈ کرنے کی ضرورت نہیں۔ پاکستانی قانون (پیکا) کے مطابق۔',
    getHelpNow: 'حفاظتی لائحہ عمل بنائیں',
    chatWithAI: 'حفاظت اے آئی اسسٹنٹ سے بات کریں',
    exploreResources: 'این سی سی آئی اے اور ہیلپ لائنز',
    anonymousNotice: 'مکمل پرائیویسی اور گمنامی کی ضمانت',
    anonymousDetails:
      'ہم آپ سے شناختی کارڈ، پاس ورڈ، موبائل نمبر یا کوئی نجی تصویر طلب نہیں کرتے۔ آپ کا ڈیٹا آپ کے براؤزر تک محدود رہتا ہے۔',
    categoriesTitle: 'آپ کو کس قسم کے مسئلے کا سامنا ہے؟',
    categoryBlackmail: 'بلیک میلنگ / پیسے یا تاوان کا مطالبہ',
    categoryPhotoThreat: 'نجی تصاویر یا ویڈیوز وائرل کرنے کی دھمکی',
    categoryFakeProfile: 'جعلی آئی ڈی / میرے نام اور تصویر کا غلط استعمال',
    categoryAccountHack: 'سوشل میڈیا یا واٹس ایپ ہیک ہونا',
    categoryCyberstalking: 'مسلسل آن لائن پیچھا کرنا اور تنگ کرنا',
    categoryBullying: 'بدنام کرنے کی مہم / سائبر بلینگ',
    startAssessment: 'میرا حفاظتی منصوبہ تیار کریں',
    describeSituationPlaceholder:
      'مختصراً بیان کریں کیا ہوا ہے (برائے مہربانی پاس ورڈ، شناختی کارڈ یا نام نہ لکھیں)...',
    generatingPlan: 'حفاظتی اصولوں کے مطابق تجاویز مرتب کی جا رہی ہیں...',
    planTitle: 'آپ کے لیے مخصوص ڈیجیٹل حفاظتی منصوبہ',
    immediateSafety: 'فوری طور پر کرنے والے اقدامات',
    whatNotToDo: 'کن باتوں سے سختی سے گریز کرنا ہے؟',
    evidenceChecklist: 'قانونی ثبوت محفوظ کرنے کی چیک لسٹ',
    accountSecurity: 'اکاؤنٹ کی سیکیورٹی مضبوط بنانا',
    reportingOptions: 'پاکستان میں قانونی رپورٹنگ کے راستے',
    legalContextTitle: 'پیکا ایکٹ 2016 کے متعلقہ قوانین',
    downloadPlan: 'حفاظتی منصوبہ ڈاؤنلوڈ کریں',
    copyPlan: 'کاپی کریں',
    copied: 'کاپی ہو گیا!',
    complaintGeneratorTitle: 'این سی سی آئی اے / سائبر کرائم درخواست کا مسودہ',
    complaintGeneratorSubtitle:
      'اپنے فراہم کردہ حقائق کی بنیاد پر باضابطہ قانونی شکایت تیار کریں۔ حفاظت ایپ ازخود درخواست جمع نہیں کراتی؛ آپ خود این سی سی آئی اے پورٹل پر جمع کرائیں گے۔',
    generateDraft: 'باضابطہ مسودہ تیار کریں',
    complaintDisclaimer:
      'یہ مسودہ صرف آپ کی آسانی کے لیے تیار کیا گیا ہے۔ جمع کرانے سے قبل تسلی سے پڑھ لیں اور NCCIA کی سرکاری ویب سائٹ پر درج کریں۔',
    verifiedResourcesTitle: 'پاکستان کی تصدیق شدہ ہیلپ لائنز اور سرکاری ادارے',
    verifiedResourcesSubtitle:
      'سرکاری ویب لنکس، شکایات پورٹل اور مصدقہ ہیلپ لائن نمبرز۔',
    lastVerifiedOn: 'آخری تصدیق',
    officialPortal: 'سرکاری پورٹل پر جائیں',
    contactHelpline: 'ہیلپ لائن پر کال کریں',
    chatPlaceholder: 'حفاظت اے آئی سے کچھ بھی محفوظ طریقے سے پوچھیں (اردو، انگلش یا رومن اردو میں)...',
    chatSend: 'ارسال کریں',
    chatSuggestedHeading: 'اہم موضوعات اور سوالات:',
    clearChat: 'گفتگو صاف کریں',
    newChat: 'نیا سیشن شروع کریں',
    chatDisclaimer:
      'حفاظت اے آئی ایک ڈیجیٹل گائیڈ ہے، یہ کوئی وکیل یا پولیس کا متبادل نہیں۔ کسی ہنگامی خطرے کی صورت میں متعلقہ ہیلپ لائن سے رابطہ کریں۔',
    disclaimerText:
      'حفاظت ایک رہنمائی اور معلوماتی پلیٹ فارم ہے، یہ کوئی قانون نافذ کرنے والا ادارہ یا عدالت نہیں۔',
    rightsReserved: 'حفاظت — بچیوں اور خواتین کا ڈیجیٹل محافظ'
  },
  'ur-roman': {
    brandTitle: 'HIFAZAT',
    brandSubtitle: 'Pakistani Khawateen aur Bachiyon ke liye Digital Safety Guide',
    quickExit: 'Quick Exit',
    quickExitTooltip: 'Website ko foran band kar ke aam safha khol deta hai.',
    quickExitWarning:
      'Warning: Quick Exit dabaane se yeh tab foran Weather ya News par chali jayegi, lekin yeh aap ke mobile ki browser history ya Wi-Fi router ka record delete nahi kar sakti. Safe honay par history khud clear karein.',
    leaveNow: 'Abhi Bahir Niklein',
    stayHere: 'Isi Safhay Par Rahein',
    emergencyNotice:
      'Agar aap ki jismani hifazat ko fori khatra hai toh Emergency Police (15) ya Women Helpline (1043) par foran call karein.',
    homeTab: 'Home',
    chatTab: 'AI se Baat Karein',
    safetyPlanTab: 'Safety Plan',
    complaintTab: 'Complaint Draft',
    resourcesTab: 'Helplines & NCCIA',
    evidenceGuideTab: 'Evidence Guide',
    aboutTab: 'About & Privacy',
    heroHeadline: 'Aap ki jagah. Aap ki hifazat.',
    heroSubheadline: 'Aap ka internet par mehfooz rehna haq hai.',
    heroTagline1:
      'Online blackmailing, leaked photos ki dhamkiyan, fake accounts aur cyber harassment se nibatnay ke liye privacy-first aur muft rehnumai.',
    heroTagline2: 'Koi account ya login zaroori nahi. Tasaveer upload karne ki zaroorat nahi. Pakistani PECA qanoon ke mutabiq.',
    getHelpNow: 'Safety Plan Banayein',
    chatWithAI: 'HIFAZAT AI se Baat Karein',
    exploreResources: 'NCCIA & Helplines List',
    anonymousNotice: '100% Anonymous & Mehfooz',
    anonymousDetails:
      'Hum CNIC, password, phone number ya personal photos nahi mangte. Data aapke apnay browser tak mehdood rehta hai.',
    categoriesTitle: 'Aap ko kis qism ka masla darpaish hai?',
    categoryBlackmail: 'Blackmail / Paisay ka Mutaliba',
    categoryPhotoThreat: 'Private Photos / Videos leak karne ki dhamki',
    categoryFakeProfile: 'Fake ID / Mere naam aur picture ka ghalat istemal',
    categoryAccountHack: 'Account Hack hona / Unauthorized access',
    categoryCyberstalking: 'Musalsal online peecha karna aur tang karna',
    categoryBullying: 'Badnaam karna / Cyberbullying',
    startAssessment: 'Mera Safety Plan Banayein',
    describeSituationPlaceholder:
      'Mukhtasaran batayein kya hua (passwords, CNIC ya kisi ka asli naam mat likhein)...',
    generatingPlan: 'Safety plan tayyar ho raha hai...',
    planTitle: 'Aap ke liye Customized Safety Plan',
    immediateSafety: 'Fori tor par karne wale kaam',
    whatNotToDo: 'Kin baaton se sakhti se parhez karna hai?',
    evidenceChecklist: 'Saboot (Evidence) Mehfooz Karne ki Checklist',
    accountSecurity: 'Account Security Mazboot Karna',
    reportingOptions: 'Pakistan mein Official Reporting ke Raste',
    legalContextTitle: 'PECA 2016 ke Qawaneen',
    downloadPlan: 'Safety Plan Download Karein',
    copyPlan: 'Copy Karein',
    copied: 'Copy ho gaya!',
    complaintGeneratorTitle: 'NCCIA / Cybercrime Complaint Draft Generator',
    complaintGeneratorSubtitle:
      'Apnay faraham kardah facts ki bunyad par formal complaint draft banayein. HIFAZAT khud submit nahi karta; aap review karke NCCIA portal par daalein.',
    generateDraft: 'Official Draft Tayyar Karein',
    complaintDisclaimer:
      'Yeh draft aapki rehnumai ke liye hai. Submit karne se pehle zaroor parhein aur complaint.nccia.gov.pk par darj karein.',
    verifiedResourcesTitle: 'Pakistan ki Verified Helplines aur Idaray',
    verifiedResourcesSubtitle:
      'Sarkari web links, online complaint portals aur toll-free helplines.',
    lastVerifiedOn: 'Akhri tasdeeq',
    officialPortal: 'Official Portal Par Jayein',
    contactHelpline: 'Helpline Par Call Karein',
    chatPlaceholder: 'HIFAZAT AI se safe tareeqay se kuch bhi poochein (English, Urdu ya Roman Urdu mein)...',
    chatSend: 'Bhejein',
    chatSuggestedHeading: 'Ahem sawalat aur topics:',
    clearChat: 'Chat Clear Karein',
    newChat: 'Naya Session',
    chatDisclaimer:
      'HIFAZAT AI digital safety guide hai, yeh wakeel ya police ka naeemul-badal nahi. Fori khatray ki soorat mein emergency helpline par rabta karein.',
    disclaimerText:
      'HIFAZAT educational aur guidance tool hai, koi law firm ya police station nahi.',
    rightsReserved: 'HIFAZAT — Girls Digital Safety Guide'
  }
};
