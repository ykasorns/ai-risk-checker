// AI Risk Assessment Data - Source: Official Provider Documentation
// Last Updated: January 2026

export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

export interface DataCategory {
  name: string;
  description: string;
  examples: string[];
}

export interface AIVersion {
  id: string;
  name: string;
  plan: string;
  riskLevel: RiskLevel;
  dataUsedForTraining: boolean;
  dataRetention: string;
  humanReview: boolean;
  encryption: string;
  compliance: string[];
  description: string;
  recommendations: string[];
  sourceUrl: string;
}

export interface AIProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  versions: AIVersion[];
}

export const dataCategories: DataCategory[] = [
  {
    name: 'Personal Information',
    description: 'Name, email, phone number, address, date of birth',
    examples: ['Full name', 'Email address', 'Phone number', 'Home address'],
  },
  {
    name: 'Financial Data',
    description: 'Credit card numbers, bank account details, financial records',
    examples: ['Credit card number', 'Bank account info', 'Tax returns', 'Investment portfolio'],
  },
  {
    name: 'Health Information',
    description: 'Medical records, health conditions, medications, diagnoses',
    examples: ['Medical diagnosis', 'Medications', 'Health conditions', 'Hospital records'],
  },
  {
    name: 'Business Confidential',
    description: 'Trade secrets, proprietary information, business strategies',
    examples: ['Trade secrets', 'Business plans', 'Product roadmap', 'Internal memos'],
  },
  {
    name: 'Legal Documents',
    description: 'Contracts, legal agreements, intellectual property',
    examples: ['Contracts', 'Legal agreements', 'Patents', 'Copyrights'],
  },
  {
    name: 'Public Information',
    description: 'General knowledge, published articles, public data',
    examples: ['News articles', 'Published research', 'Public statistics', 'General knowledge'],
  },
];

export const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: '🤖',
    description: 'OpenAI provides ChatGPT and other AI models with different privacy levels depending on the plan.',
    versions: [
      {
        id: 'chatgpt-free',
        name: 'ChatGPT Free',
        plan: 'Free / Plus',
        riskLevel: 'high',
        dataUsedForTraining: true,
        dataRetention: 'Stored for model improvement',
        humanReview: false,
        encryption: 'TLS 1.2+ in transit',
        compliance: ['GDPR compliant (with opt-out)'],
        description:
          'Free and Plus plans use conversations to improve models. Data is retained for training purposes unless you opt out in settings.',
        recommendations: [
          '❌ Do NOT enter personal information (name, email, phone)',
          '❌ Do NOT enter financial data (credit cards, bank accounts)',
          '❌ Do NOT enter health information',
          '⚠️ Only use for general, non-sensitive queries',
          '✓ Opt out of data usage in settings if available',
        ],
        sourceUrl: 'https://openai.com/policies/row-privacy-policy/',
      },
      {
        id: 'chatgpt-business',
        name: 'ChatGPT Business',
        plan: 'Business',
        riskLevel: 'low',
        dataUsedForTraining: false,
        dataRetention: '30 days (configurable)',
        humanReview: false,
        encryption: 'AES-256 at rest, TLS 1.2+ in transit',
        compliance: ['SOC 2 Type II', 'GDPR', 'HIPAA-eligible'],
        description:
          'Business plan does NOT use data for training by default. Data is encrypted and retained only for operational purposes.',
        recommendations: [
          '✓ Safe for business-related information',
          '✓ Can use for internal documents and analysis',
          '✓ Suitable for small team collaboration',
          '⚠️ Still review sensitive data before sharing',
        ],
        sourceUrl: 'https://openai.com/business-data/',
      },
      {
        id: 'chatgpt-enterprise',
        name: 'ChatGPT Enterprise',
        plan: 'Enterprise',
        riskLevel: 'low',
        dataUsedForTraining: false,
        dataRetention: 'Configurable (default 30 days)',
        humanReview: false,
        encryption: 'AES-256 at rest, TLS 1.2+ in transit',
        compliance: ['SOC 2 Type II', 'GDPR', 'HIPAA', 'FedRAMP-eligible'],
        description:
          'Enterprise plan provides maximum security with admin controls, SAML SSO, and no data used for training.',
        recommendations: [
          '✓ Safe for all types of business data',
          '✓ Suitable for handling sensitive information',
          '✓ Recommended for regulated industries',
          '✓ Full admin control over data retention',
        ],
        sourceUrl: 'https://openai.com/enterprise-privacy/',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google Gemini',
    logo: '✨',
    description: 'Google Gemini offers different privacy levels: consumer apps with data usage, and enterprise versions with privacy protection.',
    versions: [
      {
        id: 'gemini-free',
        name: 'Gemini Apps (Free)',
        plan: 'Free / Advanced',
        riskLevel: 'very-high',
        dataUsedForTraining: true,
        dataRetention: 'Indefinite for training',
        humanReview: true,
        encryption: 'TLS 1.2+ in transit',
        compliance: ['Google Privacy Policy'],
        description:
          'Gemini Apps use conversations to improve products. Human reviewers may read, annotate, and process your conversations.',
        recommendations: [
          '❌ AVOID entering any personal information',
          '❌ AVOID entering financial or health data',
          '❌ AVOID entering confidential business information',
          '❌ AVOID entering data you do not want humans to review',
          '⚠️ Only use for general, public information queries',
        ],
        sourceUrl: 'https://support.google.com/gemini/answer/13594961',
      },
      {
        id: 'gemini-workspace',
        name: 'Gemini for Google Workspace',
        plan: 'Enterprise',
        riskLevel: 'low',
        dataUsedForTraining: false,
        dataRetention: '30 days (standard)',
        humanReview: false,
        encryption: 'Google Cloud encryption standards',
        compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA-eligible'],
        description:
          'Gemini for Workspace does NOT use data for training. Data is not seen by human reviewers and meets enterprise security standards.',
        recommendations: [
          '✓ Safe for business documents and emails',
          '✓ Can use with Google Workspace data',
          '✓ Suitable for regulated industries',
          '✓ No human review of your data',
        ],
        sourceUrl: 'https://docs.cloud.google.com/gemini/docs/discover/data-governance',
      },
    ],
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    logo: '🧠',
    description: 'Anthropic Claude offers consumer plans with opt-in data usage, and commercial plans with no data usage.',
    versions: [
      {
        id: 'claude-free',
        name: 'Claude Free / Pro',
        plan: 'Free / Pro / Max',
        riskLevel: 'medium',
        dataUsedForTraining: true,
        dataRetention: '5 years (if opt-in) or 30 days (if opt-out)',
        humanReview: false,
        encryption: 'TLS 1.2+ in transit',
        compliance: ['Privacy Policy'],
        description:
          'Consumer plans allow users to choose whether data is used for training. Users can opt out and data will be deleted after 30 days.',
        recommendations: [
          '⚠️ Check your privacy settings before using',
          '⚠️ If opted-in to training, data retained for 5 years',
          '⚠️ Avoid sensitive data unless opted-out',
          '✓ Can opt-out in Privacy Settings anytime',
          '✓ Data not sold to third parties',
        ],
        sourceUrl: 'https://www.anthropic.com/news/updates-to-our-consumer-terms',
      },
      {
        id: 'claude-team',
        name: 'Claude Team / Enterprise',
        plan: 'Team / Enterprise',
        riskLevel: 'low',
        dataUsedForTraining: false,
        dataRetention: 'Business standard retention',
        humanReview: false,
        encryption: 'Enterprise-grade encryption',
        compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
        description:
          'Team and Enterprise plans do NOT use data for training. These plans are designed for organizations handling sensitive information.',
        recommendations: [
          '✓ Safe for business-critical information',
          '✓ Suitable for team collaboration',
          '✓ Can handle confidential data',
          '✓ No data used for model training',
        ],
        sourceUrl: 'https://trust.anthropic.com/',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft Copilot',
    logo: '🔵',
    description: 'Microsoft Copilot has different privacy policies for consumer and commercial users.',
    versions: [
      {
        id: 'copilot-free',
        name: 'Copilot (Free)',
        plan: 'Free / Consumer',
        riskLevel: 'high',
        dataUsedForTraining: true,
        dataRetention: 'Per Microsoft Privacy Statement',
        humanReview: false,
        encryption: 'TLS encryption',
        compliance: ['Microsoft Privacy Statement'],
        description:
          'Free Copilot may use data to improve services based on Microsoft\'s privacy statement. Data handling varies by region.',
        recommendations: [
          '❌ Do NOT enter personal information',
          '❌ Do NOT enter financial data',
          '⚠️ Avoid sensitive business information',
          '✓ Use for general queries only',
        ],
        sourceUrl: 'https://privacy.microsoft.com/en-us/privacystatement',
      },
      {
        id: 'copilot-commercial',
        name: 'Copilot with Commercial Data Protection',
        plan: 'Enterprise (Entra ID)',
        riskLevel: 'low',
        dataUsedForTraining: false,
        dataRetention: 'Not saved by Microsoft',
        humanReview: false,
        encryption: 'Enterprise-grade encryption',
        compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA-eligible'],
        description:
          'Commercial Data Protection ensures data is NOT used for training and NOT saved by Microsoft. Designed for enterprise users.',
        recommendations: [
          '✓ Safe for all business data',
          '✓ Data not retained by Microsoft',
          '✓ Suitable for regulated industries',
          '✓ Enterprise-grade protection',
        ],
        sourceUrl: 'https://learn.microsoft.com/en-us/copilot/commercial-data-protection',
      },
    ],
  },
];

// Risk level descriptions
export const riskLevelDescriptions: Record<RiskLevel, { label: string; color: string; bgColor: string; description: string }> = {
  low: {
    label: 'Low Risk',
    color: '#16a34a',
    bgColor: '#dcfce7',
    description: 'Safe for sensitive data. Data not used for training. Enterprise-grade security.',
  },
  medium: {
    label: 'Medium Risk',
    color: '#ea580c',
    bgColor: '#fed7aa',
    description: 'Moderate risk. User controls data usage. Suitable for non-sensitive information.',
  },
  high: {
    label: 'High Risk',
    color: '#dc2626',
    bgColor: '#fee2e2',
    description: 'High risk for sensitive data. Data may be used for training. Avoid personal/financial information.',
  },
  'very-high': {
    label: 'Very High Risk',
    color: '#991b1b',
    bgColor: '#fecaca',
    description: 'Very high risk. Human review possible. Only use for public information.',
  },
};
