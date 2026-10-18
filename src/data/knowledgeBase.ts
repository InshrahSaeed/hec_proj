import { VerifiedResource, LegalProvision } from '../types';

export const HIFAZAT_ABOUT = {
  name: 'HIFAZAT — AI Safety Guide for Girls',
  taglineEn: 'Your space. Your safety. You deserve to feel safe online.',
  taglineUr: 'آپ کی جگہ۔ آپ کا تحفظ۔ آپ کا انٹرنیٹ پر محفوظ رہنا بنیادی حق ہے۔',
  taglineRoman: 'Aap ki jagah. Aap ki hifazat. Aap ka internet par mehfooz rehna haq hai.',
  mission:
    'HIFAZAT is a privacy-first, anonymous digital safety guidance system designed for girls and women in Pakistan confronting online blackmail, harassment, impersonation, hacked accounts, cyberstalking, and non-consensual content threats.',
  whatItIs: [
    'A real-time, privacy-conscious safety plan and guidance assistant.',
    'An evidence preservation advisor that helps victims document proof before evidence vanishes.',
    'A structured complaint draft generator based exclusively on facts provided by the user for submission to official agencies.',
    'A verified knowledge base of Pakistani laws (PECA 2016 & 2025 amendments) and official reporting bodies.',
    'A multilingual resource supporting English, Urdu (اردو), and Roman Urdu.'
  ],
  whatItIsNot: [
    'Not a law enforcement agency or police station (it does NOT investigate or arrest suspects).',
    'Not a law firm or licensed legal counsel (it does not provide formal legal representation or guarantee court outcomes).',
    'Not an automated complaint filing service (it does NOT secretly file complaints on your behalf; you maintain full control of your draft).',
    'Not an emergency 911/15 dispatch service for imminent physical assault or domestic violence.',
    'Not a surveillance or hacking tool (it will never hack an adversary, trace an IP, or retaliate).'
  ],
  privacyCommitment: [
    'Anonymous by default: No account creation, phone number, or CNIC required to use any feature.',
    'Zero surveillance: No raw sensitive incident narratives or intimate details are permanently logged on remote servers.',
    'No image uploads: HIFAZAT will NEVER ask you to upload private or intimate photos or videos.',
    'Local Draft Safety: In-browser forms remain on your device and can be cleared instantly via Quick Exit or Clear button.'
  ]
};

export const VERIFIED_RESOURCES: VerifiedResource[] = [
  {
    id: 'nccia-portal',
    name: 'National Cyber Crime Investigation Agency (NCCIA) - Official Complaint Portal',
    urduName: 'نیشنل سائبر کرائم انویسٹی گیشن ایجنسی (این سی سی آئی اے) آن لائن پورٹل',
    category: 'government',
    description:
      'The premier federal agency in Pakistan mandated to investigate cyber offences under PECA. Provides an online portal to register formal cybercrime complaints.',
    urduDescription:
      'پاکستان میں سائبر جرائم کی تحقیقات کی مرکزی مجاز وفاقی ایجنسی۔ آن لائن شکایت درج کرانے کی سرکاری سہولت۔',
    officialUrl: 'https://complaint.nccia.gov.pk/',
    verifiedDate: 'October 2026',
    verificationStatus: 'official_source',
    relevantLawOrTopic: 'PECA 2016 / 2025 Act - Primary Cyber Crime Reporting',
    notes: 'Keep your complaint tracking ID safe once submitted through their official portal.'
  },
  {
    id: 'nccia-main',
    name: 'NCCIA Main Portal & Regional Offices Directory',
    urduName: 'این سی سی آئی اے مرکزی ویب سائٹ اور علاقائی دفاتر',
    category: 'government',
    description:
      'Official web portal with contact information and addresses for NCCIA regional reporting centers across Islamabad, Lahore, Karachi, Peshawar, Quetta, and other major cities.',
    urduDescription:
      'اسلام آباد، لاہور، کراچی، پشاور، کوئٹہ سمیت تمام علاقائی دفاتر کے پتے اور دفتری معلومات۔',
    officialUrl: 'https://www.nccia.gov.pk/Offices',
    verifiedDate: 'October 2026',
    verificationStatus: 'official_source',
    relevantLawOrTopic: 'Physical Walk-in Cyber Crime Reporting Stations',
    notes: 'You can also submit in person with an official written complaint draft and evidence printouts.'
  },
  {
    id: 'drf-helpline',
    name: 'Digital Rights Foundation (DRF) Cyber Harassment Helpline',
    urduName: 'ڈیجیٹل رائٹس فاؤنڈیشن (ڈی آر ایف) سائبر ہراسمنٹ ہیلپ لائن',
    category: 'helpline',
    description:
      'A dedicated, confidential, free legal and psychological support helpline for victims of online harassment, extortion, and cyber abuse in Pakistan.',
    urduDescription:
      'پاکستان میں آن لائن ہراسانی اور بلیک میلنگ کا شکار افراد کے لیے مفت اور خفیہ قانونی اور نفسیاتی رہنمائی۔',
    officialUrl: 'https://digitalrightsfoundation.pk/',
    contactNumber: '0800-39393 (Toll Free)',
    email: 'helpline@digitalrightsfoundation.pk',
    operatingHours: 'Monday – Friday, 9:00 AM – 5:00 PM PKT',
    verifiedDate: 'October 2026',
    verificationStatus: 'verified',
    relevantLawOrTopic: 'Non-governmental victim support, digital safety counseling, legal guidance'
  },
  {
    id: 'pta-cms',
    name: 'Pakistan Telecommunication Authority (PTA) Complaint Management System',
    urduName: 'پاکستان ٹیلی کمیونیکیشن اتھارٹی (پی ٹی اے) آن لائن شکایت نظام',
    category: 'government',
    description:
      'Statutory authority managing telecommunication and digital content removal/blocking in Pakistan under Section 37 of PECA.',
    urduDescription:
      'غیر اخلاقی، توہین آمیز، یا نازیبا مواد کو پاکستانی انٹرنیٹ پر بلاک اور ہٹانے کا مجاز ادارہ۔',
    officialUrl: 'https://complaint.pta.gov.pk/',
    contactNumber: '0800-55055',
    verifiedDate: 'October 2026',
    verificationStatus: 'official_source',
    relevantLawOrTopic: 'Section 37 PECA - Unlawful Online Content Removal'
  },
  {
    id: 'madadgaar-1098',
    name: 'Madadgaar National Helpline 1098',
    urduName: 'مددگار نیشنل ہیلپ لائن 1098',
    category: 'helpline',
    description:
      'Pakistan’s first national toll-free helpline providing crisis intervention, psychological counseling, and legal referral for women and children.',
    urduDescription:
      'خواتین اور بچوں کے لیے ہنگامی بحرانی مشاورت، تحفظ اور رہنمائی کی قومی ہیلپ لائن۔',
    officialUrl: 'https://madadgaar.org/',
    contactNumber: '1098',
    operatingHours: '24/7 Helpline',
    verifiedDate: 'October 2026',
    verificationStatus: 'verified',
    relevantLawOrTopic: 'Crisis support and emergency referral for minors and women'
  },
  {
    id: 'stopncii',
    name: 'StopNCII.org (Non-Consensual Intimate Image Protection)',
    urduName: 'اسٹاپ این سی آئی آئی (غیر رضامندانہ تصاویر کی آن لائن روک تھام)',
    category: 'international_tool',
    description:
      'An internationally recognized privacy-preserving platform that creates cryptographic hashes (digital fingerprints) of intimate images directly on your device, preventing them from being shared on Meta (Facebook, Instagram, Threads), TikTok, Reddit, and Bumble without uploading your actual photos.',
    urduDescription:
      'آپ کے اپنے موبائل/کمپیوٹر پر تصویر کا ڈیجیٹل کوڈ بنا کر انسٹاگرام، فیس بک اور ٹک ٹاک پر اس کے پھیلنے کو پیشگی روکنے کا عالمی محفوظ نظام۔ اصلی تصویر کبھی اپلوڈ نہیں ہوتی۔',
    officialUrl: 'https://stopncii.org/',
    verifiedDate: 'October 2026',
    verificationStatus: 'verified',
    relevantLawOrTopic: 'Global preventive tech against blackmail and non-consensual image distribution',
    notes: 'For adults (18+). Uses zero-knowledge client-side hashing.'
  },
  {
    id: 'take-it-down',
    name: 'Take It Down (by NCMEC for Minors Under 18)',
    urduName: 'ٹیک اٹ ڈاؤن (18 سال سے کم عمر افراد کے لیے نجی مواد کی روک تھام)',
    category: 'international_tool',
    description:
      'A global service run by the National Center for Missing & Exploited Children allowing individuals under 18 (or adults who had images taken when under 18) to remove or prevent distribution of intimate media on participating tech platforms.',
    urduDescription:
      'اگر تصویر 18 سال سے کم عمری کی ہو تو انٹرنیٹ سے ہٹوانے کا عالمی بااعتماد پلیٹ فارم۔',
    officialUrl: 'https://takeitdown.ncmec.org/',
    verifiedDate: 'October 2026',
    verificationStatus: 'verified',
    relevantLawOrTopic: 'Child Sexual Abuse Material (CSAM) and youth extortion prevention'
  },
  {
    id: 'pakistan-code',
    name: 'The Pakistan Code - Federal Laws Portal',
    urduName: 'دی پاکستان کوڈ - سرکاری وفاقی قوانین پورٹل',
    category: 'government',
    description:
      'The official online repository of all federal legislation maintained by the Ministry of Law and Justice, Government of Pakistan.',
    urduDescription:
      'وزارت قانون و انصاف، حکومت پاکستان کا آفیشل پورٹل جہاں PECA ایکٹ 2016 کے اصل نوٹیفائیڈ متون موجود ہیں۔',
    officialUrl: 'https://pakistancode.gov.pk/',
    verifiedDate: 'October 2026',
    verificationStatus: 'official_source',
    relevantLawOrTopic: 'Official text of PECA 2016 and statutory amendments'
  }
];

export const PECA_LEGAL_PROVISIONS: LegalProvision[] = [
  {
    section: 'Section 21',
    act: 'Prevention of Electronic Crimes Act (PECA) 2016',
    title: 'Offences against modesty of a natural person and minor',
    urduTitle: 'کسی فرد یا نابالغ کے حیا اور پردے کے خلاف جرائم',
    description:
      'Criminalizes superimposing a photograph, creating sexually explicit content, or distributing/broadcasting intimate or sensitive media of a person without consent, or using such media to coerce or blackmail.',
    penaltySummary:
      'Imprisonment up to 5 years, fine up to five million rupees, or both. In cases involving minors, imprisonment up to seven years.',
    officialSourceUrl: 'https://pakistancode.gov.pk/',
    lastVerified: 'October 2026'
  },
  {
    section: 'Section 20',
    act: 'Prevention of Electronic Crimes Act (PECA) 2016',
    title: 'Offences against dignity of a natural person',
    urduTitle: 'کسی انسان کے وقار اور عزت کے خلاف جرائم (بدنامی اور توہین)',
    description:
      'Criminalizes public exhibition or transmission of false information with intent to harm the reputation or privacy of a natural person online.',
    penaltySummary: 'Imprisonment up to 3 years, fine up to one million rupees, or both.',
    officialSourceUrl: 'https://pakistancode.gov.pk/',
    lastVerified: 'October 2026'
  },
  {
    section: 'Section 24',
    act: 'Prevention of Electronic Crimes Act (PECA) 2016',
    title: 'Cyberstalking',
    urduTitle: 'سائبر اسٹاکنگ (آن لائن پیچھا کرنا اور ہراساں کرنا)',
    description:
      'Covers persistent following, surveillance, electronic communication despite disinterest, impersonation, or repeatedly contacting a person in a way that generates reasonable fear of harm, emotional distress, or damage.',
    penaltySummary:
      'Imprisonment up to 3 years, fine up to one million rupees, or both. If the victim is a minor, penalty extends up to five years.',
    officialSourceUrl: 'https://pakistancode.gov.pk/',
    lastVerified: 'October 2026'
  },
  {
    section: 'Section 14',
    act: 'Prevention of Electronic Crimes Act (PECA) 2016',
    title: 'Unauthorized use of identity information',
    urduTitle: 'شناختی معلومات کا غیر مجاز استعمال (جعلی پروفائل اور امپرسنیشن)',
    description:
      'Penalizes creating fake accounts using another person’s photograph, name, CNIC, or biometric information to deceive, impersonate, or mislead the public.',
    penaltySummary: 'Imprisonment up to 3 years, fine up to five million rupees, or both.',
    officialSourceUrl: 'https://pakistancode.gov.pk/',
    lastVerified: 'October 2026'
  },
  {
    section: 'Section 3',
    act: 'Prevention of Electronic Crimes Act (PECA) 2016',
    title: 'Unauthorized access to information system or data',
    urduTitle: 'اکاؤنٹ یا ڈیٹا تک غیر قانونی رسائی (ہیکنگ)',
    description:
      'Prohibits accessing someone else’s account, smartphone, email, or social media without authorization or through stolen credentials.',
    penaltySummary: 'Imprisonment up to 3 months, fine up to fifty thousand rupees, or both.',
    officialSourceUrl: 'https://pakistancode.gov.pk/',
    lastVerified: 'October 2026'
  },
  {
    section: '2025 Legislative Transition Note',
    act: 'PECA Framework & Statutory Reorganization',
    title: 'Establishment of National Cyber Crime Investigation Agency (NCCIA)',
    urduTitle: 'نیشنل سائبر کرائم انویسٹی گیشن ایجنسی (این سی سی آئی اے) کا قیام',
    description:
      'The federal government formally designated the NCCIA as the dedicated civil specialized agency responsible for handling cyber offences under PECA. Complaints are submitted to NCCIA (complaint.nccia.gov.pk) rather than general local police stations.',
    penaltySummary: 'Statutory procedural framework governing jurisdiction and investigation.',
    officialSourceUrl: 'https://www.nccia.gov.pk/faqs.php',
    lastVerified: 'October 2026'
  }
];

export const SITUATION_SPECIFIC_GUIDES = {
  blackmail: {
    title: 'Online Blackmail & Extortion',
    urduTitle: 'آن لائن بلیک میلنگ اور تاوان کی دھمکیاں',
    immediateDo: [
      'Stop communicating with the blackmailer immediately, but do NOT delete or block until you preserve evidence.',
      'Do NOT pay any money (paying once almost always triggers repeated and higher financial demands).',
      'Take complete screenshots showing dates, times, caller ID/usernames, and full message threads.',
      'Use StopNCII.org to create device-level hashes if intimate photos are being weaponized.'
    ],
    immediateAvoid: [
      'Do NOT send additional photos or videos in hopes that they will stop.',
      'Do NOT delete chat history or WhatsApp backups before taking uncropped screenshots.',
      'Do NOT agree to meet the extortionist in person or confront them without trusted support.',
      'Do NOT pay via EasyPaisa, JazzCash, bank transfer, crypto, or gift cards.'
    ]
  },
  photo_threat: {
    title: 'Threats to Leak Private Photos or Videos',
    urduTitle: 'نجی تصاویر یا ویڈیوز لیک کرنے کی دھمکیاں',
    immediateDo: [
      'Visit StopNCII.org immediately if you are 18+ to hash your media safely.',
      'If you are under 18, use TakeItDown.ncmec.org immediately.',
      'Capture exact profile URLs (e.g., instagram.com/username) and message timestamps.',
      'Contact DRF Cyber Harassment Helpline (0800-39393) for emotional and digital crisis guidance.'
    ],
    immediateAvoid: [
      'Do NOT blame yourself or panic — you are the target of a crime under Section 21 of PECA.',
      'Do NOT forward the intimate images to anyone else over WhatsApp or email for advice (this creates more digital trails).',
      'Do NOT plead or negotiate with the blackmailer.'
    ]
  },
  fake_profile: {
    title: 'Fake Account & Impersonation',
    urduTitle: 'جعلی اکاؤنٹ اور آپ کے نام/تصویر کا غلط استعمال',
    immediateDo: [
      'Document the exact profile URL (do not just copy the display name, copy the exact handle and profile link).',
      'Take screenshots of the fake bio, profile picture, and any defamatory posts with timestamps.',
      'Report the profile directly through the platform (Instagram/Facebook/TikTok/X) using "Impersonation / Pretending to be me".',
      'Alert close friends and family with a short neutral message: "A fake account is impersonating me. Please do not accept requests or engage with it."'
    ],
    immediateAvoid: [
      'Do NOT engage in public flame wars or arguments in the comments.',
      'Do NOT share personal phone numbers in public clarification stories.'
    ]
  },
  account_hack: {
    title: 'Hacked or Compromised Account',
    urduTitle: 'اکاؤنٹ ہیک ہونا یا غیر مجاز رسائی',
    immediateDo: [
      'Attempt official platform account recovery through verified recovery links.',
      'Check if your registered email has also been compromised. Change your email password first and activate 2FA.',
      'Revoke active sessions and connected third-party apps in security settings.',
      'Alert contacts via an alternate channel if the hacker is messaging them asking for urgent money or OTPs.'
    ],
    immediateAvoid: [
      'Do NOT trust third-party Instagram "hackers" or DM accounts claiming "I can recover your account for 2000 PKR" — these are common secondary recovery scams.',
      'Do NOT enter OTP codes into unsolicited links sent via SMS.'
    ]
  },
  cyberstalking: {
    title: 'Persistent Cyberstalking & Harassment',
    urduTitle: 'مسلسل آن لائن پیچھا اور ہراساں کرنا (سائبر اسٹاکنگ)',
    immediateDo: [
      'Keep an Incident Log: Date, time, platform, user handle, and exact words used.',
      'Set social media accounts to private, disable location tagging, and review follower lists.',
      'Lock down privacy settings so only saved phone contacts can add you to WhatsApp groups.',
      'If you fear imminent physical approach, notify trusted family or local emergency helplines immediately.'
    ],
    immediateAvoid: [
      'Do NOT respond to persistent burner numbers or new anonymous accounts.',
      'Do NOT check-in to real-time physical locations or post live stories while at public venues.'
    ]
  }
};
