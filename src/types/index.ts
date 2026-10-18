export type Language = 'en' | 'ur' | 'ur-roman';

export type IncidentCategory =
  | 'blackmail'
  | 'photo_threat'
  | 'fake_profile'
  | 'account_hack'
  | 'cyberstalking'
  | 'cyberbullying'
  | 'non_consensual_sharing'
  | 'general_safety';

export interface VerifiedResource {
  id: string;
  name: string;
  urduName: string;
  category: 'government' | 'helpline' | 'platform' | 'international_tool';
  description: string;
  urduDescription: string;
  officialUrl: string;
  contactNumber?: string;
  email?: string;
  operatingHours?: string;
  verifiedDate: string; // e.g. "October 2026"
  verificationStatus: 'verified' | 'official_source';
  relevantLawOrTopic: string;
  notes?: string;
}

export interface LegalProvision {
  section: string;
  act: string;
  title: string;
  urduTitle: string;
  description: string;
  penaltySummary: string;
  officialSourceUrl: string;
  lastVerified: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isError?: boolean;
  suggestedPrompts?: string[];
  verifiedReferences?: Array<{
    title: string;
    url: string;
  }>;
}

export interface SituationInput {
  category: IncidentCategory;
  urgency: 'low' | 'moderate' | 'high' | 'immediate_danger';
  platform: string;
  description: string;
  hasPreservedEvidence: boolean;
  isPerpetratorKnown: 'yes' | 'no' | 'suspected' | 'unknown';
  hasDemandedMoney: boolean;
  language: Language;
}

export interface SafetyPlan {
  id: string;
  generatedAt: string;
  category: IncidentCategory;
  urgencyLevel: 'low' | 'moderate' | 'high' | 'immediate_danger';
  immediateActions: string[];
  whatToAvoid: string[];
  evidencePreservationSteps: string[];
  accountSecuritySteps: string[];
  reportingChannels: Array<{
    name: string;
    url?: string;
    contact?: string;
    action: string;
  }>;
  legalContext: string;
  psychologicalCareAdvice: string;
  disclaimer: string;
}

export interface ComplaintData {
  complainantName: string; // optional or pseudonym
  contactPhone: string;
  contactEmail: string;
  city: string;
  province: string;
  incidentCategory: IncidentCategory;
  incidentStartDate: string;
  incidentPlatform: string;
  perpetratorIdentifier: string; // phone number, username, profile link
  isPerpetratorKnown: string;
  summaryOfFacts: string;
  financialExtortionDetails?: string;
  evidenceList: string[];
  applicablePecaSections: string[];
  reliefRequested: string[];
  generatedDraft?: string;
}
