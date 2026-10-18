import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { HIFAZAT_ABOUT, PECA_LEGAL_PROVISIONS, VERIFIED_RESOURCES, SITUATION_SPECIFIC_GUIDES } from '../src/data/knowledgeBase';

dotenv.config();

// Shared server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const hasApiKey = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY');

const ai = hasApiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

async function callGeminiWithFailover(contents: any, systemInstruction: string) {
  if (!ai) return null;

  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

  for (const model of modelsToTry) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id);
          reject(new Error('TIMEOUT_8S'));
        }, 8000);
      });

      const generatePromise = ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed or timed out (${err?.message?.slice(0, 80)}). Trying next...`);
    }
  }

  return null;
}

const SYSTEM_INSTRUCTION = `
You are "HIFAZAT AI Assistant" (حفاظت اے آئی معاون), an empathetic, trauma-informed, cybersecurity-aware, and legally grounded digital safety guide for girls and women in Pakistan.

### CORE PURPOSE & BOUNDARIES:
- You help people in Pakistan facing online harassment, blackmail, non-consensual image distribution, threats to leak private photos/videos, impersonation/fake accounts, account hacking, and cyberstalking.
- You are a GUIDANCE TOOL. You are NOT a police officer, law-enforcement agency, court, or licensed attorney.
- Never guarantee a legal or criminal outcome. Clearly distinguish verified laws from general safety advice.
- You NEVER file complaints automatically on the user's behalf.
- If the user describes imminent physical danger, immediately advise contacting emergency police (15) or women crisis helplines (1043 / 1098).
- NEVER ask the user for passwords, OTPs, CNIC numbers, full bank details, or intimate images.
- NEVER tell the user to upload or send intimate pictures.
- NEVER victim-blame, judge, shame, or pressure the user. Always validate their feelings: "You are not to blame. What the perpetrator is doing is a crime under Pakistani law."
- NEVER encourage retaliation, counter-hacking, offensive threats, or unsafe confrontation.

### HIFAZAT APPLICATION KNOWLEDGE:
- HIFAZAT offers:
  1. "Home": Purpose, reassurance ("Your space. Your safety. You deserve to feel safe online"), privacy overview.
  2. "Chat with HIFAZAT AI": Full conversational guidance (which is you!).
  3. "Safety Plan Generator": Generates step-by-step personalized action plans, what to avoid, evidence checklist, and account hardening.
  4. "Complaint Draft Generator": Helps user write a formal complaint formatted for the National Cyber Crime Investigation Agency (NCCIA) citing PECA sections based only on user-supplied facts.
  5. "Evidence Preservation Guide": Crucial steps for capturing full uncropped screenshots with timestamps, URLs, handles, and backing them up securely.
  6. "Verified Resources Directory": Official verified contacts (NCCIA, DRF, PTA, Madadgaar, StopNCII.org, Take It Down).
  7. "Quick Exit": Instant escape button that redirects to a neutral site (with honest warning that it cannot erase browser history).

### VERIFIED PAKISTANI LAWS & AUTHORITIES (PECA 2016 & AMENDMENTS):
- Official legal portal: Pakistan Code (https://pakistancode.gov.pk/).
- Official Cybercrime Agency: National Cyber Crime Investigation Agency (NCCIA) - https://www.nccia.gov.pk/
  * Official complaint portal: https://complaint.nccia.gov.pk/
  * FAQs & Regional Offices: https://www.nccia.gov.pk/faqs.php and https://www.nccia.gov.pk/Offices
- Key PECA 2016 Sections:
  * Section 21: Offences against modesty of a natural person & minor (non-consensual intimate imagery, blackmail, coercion). Penalty: up to 5 years prison, up to 5M PKR fine (up to 7 years if minor).
  * Section 20: Offences against dignity of a natural person (defamation, public vilification online). Penalty: up to 3 years, up to 1M PKR fine.
  * Section 24: Cyberstalking (persistent messaging, surveillance, intimidation). Penalty: up to 3 years (up to 5 years if minor).
  * Section 14: Unauthorized use of identity info (fake profiles, impersonation). Penalty: up to 3 years.
  * Section 3: Unauthorized access (hacking accounts/passwords). Penalty: up to 3 months.
  * Section 37: Unlawful online content removal (regulated through PTA: https://complaint.pta.gov.pk/).
- Specialized Helplines:
  * Digital Rights Foundation (DRF) Cyber Harassment Helpline: 0800-39393 (Mon-Fri 9am-5pm PKT, free, confidential).
  * Madadgaar National Helpline: 1098 (24/7 crisis support for women & children).
  * StopNCII.org: Free client-side image hashing platform that blocks intimate photo sharing on Instagram, Facebook, TikTok, Threads without uploading the photo.
  * Take It Down (takeitdown.ncmec.org): For imagery taken when under 18 years old.

### LANGUAGE RULES:
- The user can communicate in English, Urdu (اردو), or Roman Urdu.
- Respond in the language or dialect used by the user, or match their selected language.
- When writing Urdu in Arabic script, write natural, respectful, and supportive Urdu.
- When writing Roman Urdu, write clear, compassionate, and readable Roman Urdu.
- Maintain a warm, protective, clear, and reassuring tone.
`;

export async function generateChatResponse(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  userLanguage: string = 'en',
  situationContext?: string
) {
  if (!ai) {
    return generateFallbackGuidance(messages[messages.length - 1]?.content || '', userLanguage);
  }

  try {
    // Format contents for Gemini
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let contextualPrompt = SYSTEM_INSTRUCTION;
    if (situationContext) {
      contextualPrompt += `\n\nCURRENT USER SITUATION CONTEXT:\n${situationContext}`;
    }
    contextualPrompt += `\n\nUSER PREFERRED LANGUAGE: ${userLanguage}`;

    const replyText = await callGeminiWithFailover(contents, contextualPrompt);

    if (!replyText) {
      return generateFallbackGuidance(messages[messages.length - 1]?.content || '', userLanguage);
    }

    const suggestedFollowUps = extractSuggestedFollowUps(replyText, userLanguage);

    return {
      text: replyText,
      verifiedResources: extractRelevantResources(replyText),
      suggestedFollowUps,
    };
  } catch (err: any) {
    console.error('Error in generateChatResponse:', err?.message || err);
    return generateFallbackGuidance(messages[messages.length - 1]?.content || '', userLanguage);
  }
}

export async function generateCustomSafetyPlan(data: {
  category: string;
  urgency: string;
  platform: string;
  description: string;
  hasPreservedEvidence: boolean;
  isPerpetratorKnown: string;
  hasDemandedMoney: boolean;
  language: string;
}) {
  const baseCategory = SITUATION_SPECIFIC_GUIDES[data.category as keyof typeof SITUATION_SPECIFIC_GUIDES] ||
    SITUATION_SPECIFIC_GUIDES.blackmail;

  if (!ai) {
    return {
      category: data.category,
      urgencyLevel: data.urgency,
      immediateActions: baseCategory.immediateDo,
      whatToAvoid: baseCategory.immediateAvoid,
      evidencePreservationSteps: [
        'Take uncropped screenshots showing the entire screen, device time, date, and user handle.',
        'Copy the exact account profile URL (e.g., https://instagram.com/username) before they change their handle.',
        'Export WhatsApp chat with media or keep message logs untouched.',
        'Back up all screenshots to a private offline flash drive or a secure password-protected cloud account unknown to the perpetrator.'
      ],
      accountSecuritySteps: [
        'Turn on Two-Factor Authentication (2FA) with an authenticator app (Google Authenticator) rather than SMS.',
        'Review logged-in devices and revoke unfamiliar active sessions.',
        'Change master email password first, then social media passwords.',
        'Set profile to private and review who can tag you or send direct messages.'
      ],
      reportingChannels: [
        {
          name: 'National Cyber Crime Investigation Agency (NCCIA)',
          url: 'https://complaint.nccia.gov.pk/',
          action: 'File online cybercrime complaint with verified evidence'
        },
        {
          name: 'Digital Rights Foundation (DRF) Helpline',
          contact: '0800-39393',
          action: 'Free confidential guidance from cyber harassment specialists (Mon-Fri 9am-5pm)'
        },
        {
          name: 'StopNCII.org',
          url: 'https://stopncii.org/',
          action: 'Create client-side hash to prevent intimate photo sharing on Instagram, Facebook, and TikTok'
        }
      ],
      legalContext: 'Governed under PECA 2016 Sections 21 (Offences against modesty & coercion), 20 (Defamation), and 24 (Cyberstalking).',
      psychologicalCareAdvice: 'Remember: This is not your fault. You are the target of a cybercrime. Take a deep breath, do not isolate yourself, and consider reaching out to a trusted confidante or the DRF helpline.',
      disclaimer: 'This safety plan is generated for informational and risk-mitigation purposes only. It is not formal legal counsel or police intervention.'
    };
  }

  try {
    const prompt = `
Generate a structured, highly personalized digital safety plan for a woman in Pakistan facing this specific situation:
- Incident Category: ${data.category}
- Stated Urgency: ${data.urgency}
- Platform Involved: ${data.platform || 'Social Media'}
- Situation Summary: ${data.description || 'Not provided in detail'}
- Has Preserved Evidence: ${data.hasPreservedEvidence ? 'Yes' : 'Not yet'}
- Is Perpetrator Known: ${data.isPerpetratorKnown}
- Has Demanded Money/Extortion: ${data.hasDemandedMoney ? 'Yes' : 'No'}
- User Preferred Language: ${data.language}

Respond with clear actionable guidance tailored directly to these facts. Emphasize:
1. Immediate actions (first 30 minutes)
2. Crucial things to avoid doing (never pay extortion, never delete chats before screenshots)
3. Evidence preservation specific to this platform
4. Account security hardening
5. Verified Pakistani reporting routes (NCCIA complaint.nccia.gov.pk, DRF 0800-39393, StopNCII.org)
6. Grounded PECA 2016 legal provisions (Sections 21, 20, 24, 14, 3)
`;

    const planText = (await callGeminiWithFailover(prompt, SYSTEM_INSTRUCTION)) || '';

    return {
      category: data.category,
      urgencyLevel: data.urgency,
      customNarrative: planText,
      immediateActions: baseCategory.immediateDo,
      whatToAvoid: baseCategory.immediateAvoid,
      evidencePreservationSteps: [
        `Capture full, uncropped screenshots on ${data.platform || 'the app'} showing sender handle, dates, and timestamps.`,
        'Copy the exact profile URL (web link) rather than just the display name.',
        'Record any voice notes or export chat transcripts if applicable.',
        'Upload all evidence to a secure folder or external USB drive.'
      ],
      accountSecuritySteps: [
        'Enable Two-Factor Authentication (2FA) immediately using an Authenticator app.',
        'Revoke all unfamiliar active sessions across Instagram, WhatsApp, and Google.',
        'Audit recovery email address and phone number for unauthorized modifications.',
        'Adjust privacy settings to friends-only and restrict incoming DMs.'
      ],
      reportingChannels: [
        {
          name: 'National Cyber Crime Investigation Agency (NCCIA)',
          url: 'https://complaint.nccia.gov.pk/',
          action: 'Official statutory cybercrime complaint portal in Pakistan'
        },
        {
          name: 'Digital Rights Foundation (DRF) Cyber Harassment Helpline',
          contact: '0800-39393',
          action: 'Confidential, free psychological and digital safety assistance'
        },
        {
          name: 'StopNCII.org',
          url: 'https://stopncii.org/',
          action: 'Prevent non-consensual intimate image sharing across Meta & TikTok platforms'
        }
      ],
      legalContext: 'Applicable PECA 2016 provisions include Section 21 (Modesty & Blackmail), Section 20 (Dignity), Section 24 (Cyberstalking), and Section 14 (Impersonation).',
      psychologicalCareAdvice: 'You are resilient and you are not alone. Perpetrators rely on fear, panic, and isolation. Taking systematic, documented steps puts control back in your hands.',
      disclaimer: 'HIFAZAT is a safety guidance tool. This plan is not legal representation or police intervention.'
    };
  } catch (err: any) {
    console.error('Error generating custom safety plan:', err);
    return {
      category: data.category,
      urgencyLevel: data.urgency,
      immediateActions: baseCategory.immediateDo,
      whatToAvoid: baseCategory.immediateAvoid,
      evidencePreservationSteps: [
        'Take uncropped screenshots showing date, time, and full handle.',
        'Save URLs of offending profiles.',
        'Keep evidence in a secure offline drive.'
      ],
      accountSecuritySteps: [
        'Enable 2FA immediately.',
        'Change passwords and log out of all active sessions.'
      ],
      reportingChannels: [
        {
          name: 'NCCIA Complaint Portal',
          url: 'https://complaint.nccia.gov.pk/',
          action: 'File formal cybercrime report'
        },
        {
          name: 'DRF Helpline',
          contact: '0800-39393',
          action: 'Call for confidential counseling'
        }
      ],
      legalContext: 'PECA 2016 Sections 21, 20, 24.',
      psychologicalCareAdvice: 'Stay calm. You did nothing wrong. Support is available.',
      disclaimer: 'This guidance is an informational resource.'
    };
  }
}

export async function generateComplaintDraft(data: {
  complainantName?: string;
  contactPhone?: string;
  contactEmail?: string;
  city?: string;
  incidentCategory: string;
  incidentStartDate: string;
  incidentPlatform: string;
  perpetratorIdentifier: string;
  summaryOfFacts: string;
  financialExtortionDetails?: string;
  evidenceList: string[];
  applicablePecaSections?: string[];
  requestedRelief?: string[];
}) {
  const dateStr = new Date().toLocaleDateString('en-GB');

  let draft = `================================================================================
FORMAL COMPLAINT DRAFT FOR SUBMISSION TO:
NATIONAL CYBER CRIME INVESTIGATION AGENCY (NCCIA) / FIA CYBER CRIME WING
GOVERNMENT OF PAKISTAN
(Online Portal: https://complaint.nccia.gov.pk/)
================================================================================

DATE: ${dateStr}

TO:
The In-Charge / Director,
National Cyber Crime Investigation Agency (NCCIA),
Islamabad / Regional Office ${data.city ? `(${data.city})` : ''}, Pakistan.

SUBJECT: FORMAL COMPLAINT REGARDING CYBER HARASSMENT, EXTORTION, AND OFFENCES UNDER THE PREVENTION OF ELECTRONIC CRIMES ACT (PECA) 2016

Respected Officer,

I am submitting this formal complaint regarding deliberate cyber offences committed against me through digital media. The pertinent facts are stated hereunder for official investigation and statutory action:

1. PARTICULARS OF COMPLAINANT:
   - Name: ${data.complainantName || '[Name withheld for privacy / to be supplied on official portal]'}
   - City / Jurisdiction: ${data.city || '[City]'}
   - Contact Number: ${data.contactPhone || '[Contact Number]'}
   - Email Address: ${data.contactEmail || '[Email Address]'}

2. DETAILS OF ACCUSED / OFFENDER:
   - Identity / Handle / Phone Number: ${data.perpetratorIdentifier || 'Unknown / Unverified Handle'}
   - Platform Utilized: ${data.incidentPlatform || 'Electronic communication service / Social media'}
   - Approximate Date of Commencement: ${data.incidentStartDate || 'Recent weeks'}

3. SUMMARY OF FACTUAL ALLEGATIONS:
   ${data.summaryOfFacts}
   ${
     data.financialExtortionDetails
       ? `\n   Financial Extortion Demands:\n   ${data.financialExtortionDetails}`
       : ''
   }

4. APPLICABLE STATUTORY PROVISIONS UNDER PECA 2016:
   Based on the documented actions, the following sections of the Prevention of Electronic Crimes Act 2016 apply:
   ${
     data.applicablePecaSections && data.applicablePecaSections.length > 0
       ? data.applicablePecaSections.map((s) => `   - ${s}`).join('\n')
       : `   - Section 21: Offences against modesty of a natural person and minor (coercion/blackmail)
   - Section 20: Offences against dignity of a natural person (defamation/malicious intent)
   - Section 24: Cyberstalking and persistent electronic harassment
   - Section 14: Unauthorized use of identity information`
   }

5. LIST OF PRESERVED DIGITAL EVIDENCE ATTACHED:
   ${
     data.evidenceList && data.evidenceList.length > 0
       ? data.evidenceList.map((e, idx) => `   [${idx + 1}] ${e}`).join('\n')
       : `   [1] Uncropped digital screenshots showing sender ID, date, and timestamps.
   [2] URL profile link of the accused account.
   [3] Electronic transmission logs / chat export.`
   }

6. RELIEF SOUGHT:
   It is respectfully prayed that NCCIA initiate statutory proceedings to:
   a) Trace the IP addresses, subscriber identity, and registration details of the accused account/number.
   b) Block, remove, and seize the offending material under Section 37 of PECA through PTA.
   c) Prosecute the offender under relevant sections of PECA 2016 and the Pakistan Penal Code.

Yours sincerely,

_____________________________
Complainant Signature / Portal Submitter
Date: ${dateStr}

================================================================================
IMPORTANT NOTICE & DISCLAIMER:
This document is a structured draft prepared by the user using the HIFAZAT guidance tool.
HIFAZAT has NOT submitted this complaint. You must copy/paste this text into the official
NCCIA portal (https://complaint.nccia.gov.pk/) or print it for walk-in submission at your
local NCCIA Regional Cybercrime Office.
================================================================================`;

  return { draft };
}

function extractSuggestedFollowUps(text: string, language: string): string[] {
  if (language === 'ur') {
    return [
      'کیا میں بلیک میلر کو بلاک کر دوں؟',
      'این سی سی آئی اے میں شکایت کیسے درج کراؤں؟',
      'کیا میری تصویریں انٹرنیٹ سے ہٹ سکتی ہیں؟',
      'ڈی آر ایف ہیلپ لائن کا نمبر کیا ہے؟'
    ];
  }
  if (language === 'ur-roman') {
    return [
      'Kya main blackmailer ko block kar doon?',
      'NCCIA mein complaint kaise file karein?',
      'Kya StopNCII se meri photos protect ho sakti hain?',
      'DRF helpline se rabta kaise karein?'
    ];
  }
  return [
    'Should I block the blackmailer right now?',
    'How do I file on the NCCIA portal step-by-step?',
    'How does StopNCII.org protect my photos?',
    'What evidence do Pakistani cyber police require?'
  ];
}

function extractRelevantResources(text: string) {
  const lower = text.toLowerCase();
  const matched = [];

  if (lower.includes('nccia') || lower.includes('police') || lower.includes('fia') || lower.includes('portal')) {
    matched.push(VERIFIED_RESOURCES[0]); // nccia-portal
  }
  if (lower.includes('drf') || lower.includes('helpline') || lower.includes('counseling') || lower.includes('mental')) {
    matched.push(VERIFIED_RESOURCES[2]); // drf-helpline
  }
  if (lower.includes('stopncii') || lower.includes('photo') || lower.includes('picture') || lower.includes('leak') || lower.includes('video')) {
    matched.push(VERIFIED_RESOURCES[5]); // stopncii
  }
  if (lower.includes('pta') || lower.includes('block') || lower.includes('remove content')) {
    matched.push(VERIFIED_RESOURCES[3]); // pta-cms
  }

  return matched.length > 0 ? matched : [VERIFIED_RESOURCES[0], VERIFIED_RESOURCES[2]];
}

function generateFallbackGuidance(userQuery: string, language: string) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'ur-roman';

  if (isUrdu) {
    return {
      text: `سلام، میں حفاظت اے آئی اسسٹنٹ ہوں۔ آپ اکیلی نہیں ہیں اور آپ کا کوئی قصور نہیں۔

اگر کوئی آپ کو آن لائن بلیک میل یا ہراساں کر رہا ہے تو فوراً درج ذیل بنیادی باتوں پر عمل کریں:
1. **پیسے مت دیں**: بلیک میلر کی رقم کا مطالبہ کبھی پورا نہ کریں، کیونکہ پیسے دینے سے وہ مزید بلیک میل کرتا ہے۔
2. **چیٹ ڈیلیٹ مت کریں**: بات چیت اور دھمکیوں کے مکمل سکرین شاٹس لیں جس میں موبائل کا ٹائم، تاریخ اور سامنے والے کا فون نمبر/یوزر نیم نظر آ رہا ہو۔
3. **تصاویر کے تحفظ کے لیے**: اگر کوئی نجی تصاویر وائرل کرنے کی دھمکی دے رہا ہے تو مفت ویب سائٹ StopNCII.org کا استعمال کریں۔ یہ آپ کے موبائل پر تصویر کا ڈیجیٹل کوڈ بنا کر فیس بک اور انسٹاگرام پر پھیلنے سے روکتی ہے (اصلی تصویر اپلوڈ نہیں ہوتی)۔
4. **سرکاری رپورٹ درج کرائیں**: نیشنل سائبر کرائم انویسٹی گیشن ایجنسی (NCCIA) کے پورٹل پر complaint.nccia.gov.pk پر جا کر شکایت درج کریں۔
5. **مفت اور خفیہ قانونی مشورہ**: ڈیجیٹل رائٹس فاؤنڈیشن کی ہیلپ لائن 0800-39393 پر پیر تا جمعہ صبح 9 سے شام 5 بجے مفت کال کریں۔

آپ مجھ سے ثبوت محفوظ کرنے، اکاؤنٹ سیکیورٹی یا قانونی دفعات کے بارے میں مزید سوال پوچھ سکتی ہیں۔`,
      verifiedResources: [VERIFIED_RESOURCES[0], VERIFIED_RESOURCES[2], VERIFIED_RESOURCES[5]],
      suggestedFollowUps: [
        'کیا میں بلیک میلر کو بلاک کر دوں؟',
        'این سی سی آئی اے میں شکایت کیسے درج کراؤں؟',
        'ثبوت کس طرح محفوظ کرنے ہیں؟'
      ]
    };
  }

  if (isRoman) {
    return {
      text: `Salam, main HIFAZAT AI Assistant hoon. Aap bilkul akeli nahi hain aur is mein aap ka koi qasoor nahi hai.

Agar koi aapko online blackmail ya harass kar raha hai toh in fori steps par amal karein:
1. **Paisa bilkul mat dein**: Extortionist ko paise dene se woh mazeed demands karta hai.
2. **Chat delete mat karein**: Pehle date, time aur user handle ke sath uncropped screenshots lein.
3. **Private Photos ki Protection**: Agar photos leak karne ki dhamki hai toh StopNCII.org use karein. Yeh tool photo upload kiye baghair Meta aur TikTok par pictures block kar deta hai.
4. **Official Complaint**: NCCIA ke official portal complaint.nccia.gov.pk par complaint darj karein.
5. **Free & Confidential Help**: Digital Rights Foundation (DRF) helpline 0800-39393 par call karein.

Aap mujhse mazeed sawalat pooch sakti hain.`,
      verifiedResources: [VERIFIED_RESOURCES[0], VERIFIED_RESOURCES[2], VERIFIED_RESOURCES[5]],
      suggestedFollowUps: [
        'Kya main blackmailer ko block kar doon?',
        'NCCIA portal par complaint kaise daalein?',
        'Saboot kaise save karein?'
      ]
    };
  }

  return {
    text: `Hello, I am the HIFAZAT AI Safety Assistant. You are not alone, and you are not to blame for this situation.

If you are facing cyber harassment or online blackmail in Pakistan, please follow these crucial immediate steps:
1. **Do NOT Pay Extortion Demands**: Paying money never stops blackmailers; it almost invariably leads to repeated, escalated demands.
2. **Do NOT Delete Messages Yet**: Before blocking or deleting, capture full, uncropped screenshots displaying the date, time, and sender handle/phone number.
3. **Protect Intimate Media via StopNCII.org**: If someone is threatening to leak private photos, visit StopNCII.org (for 18+) or TakeItDown.ncmec.org (for under 18). These tools create cryptographic hashes locally on your device to block media from being uploaded across Meta, Instagram, TikTok, and Threads without your photos ever leaving your phone.
4. **Official Reporting in Pakistan**: File a cybercrime complaint with the National Cyber Crime Investigation Agency (NCCIA) at https://complaint.nccia.gov.pk/.
5. **Free & Confidential Support**: Call Digital Rights Foundation (DRF) Cyber Harassment Helpline at 0800-39393 (Mon-Fri 9AM-5PM PKT) for compassionate, confidential counseling.

How can I assist you further? You can ask about preserving evidence, securing your accounts, or drafting your complaint.`,
    verifiedResources: [VERIFIED_RESOURCES[0], VERIFIED_RESOURCES[2], VERIFIED_RESOURCES[5]],
    suggestedFollowUps: [
      'Should I block the blackmailer right now?',
      'How do I file on the NCCIA portal step-by-step?',
      'What evidence do Pakistani cyber police require?'
    ]
  };
}
