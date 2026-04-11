export interface PolicyChange {
  date: Date;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  affectedPlans: string[];
}

export interface ProviderHistory {
  provider: string;
  changes: PolicyChange[];
}

export const providerHistory: ProviderHistory[] = [
  {
    provider: 'OpenAI',
    changes: [
      {
        date: new Date('2025-12-15'),
        title: 'Enhanced Data Retention Controls',
        description: 'OpenAI introduced more granular data retention settings for Business and Enterprise plans',
        impact: 'positive',
        affectedPlans: ['ChatGPT Business', 'ChatGPT Enterprise'],
      },
      {
        date: new Date('2025-11-01'),
        title: 'Data Usage Policy Update',
        description: 'Updated data usage policy for Free plan to clarify model training practices',
        impact: 'neutral',
        affectedPlans: ['ChatGPT Free'],
      },
      {
        date: new Date('2025-09-20'),
        title: 'GDPR Compliance Enhancement',
        description: 'Added support for GDPR data subject rights requests in Business plan',
        impact: 'positive',
        affectedPlans: ['ChatGPT Business'],
      },
      {
        date: new Date('2025-08-10'),
        title: 'Enterprise Security Features',
        description: 'Introduced advanced security features for Enterprise customers',
        impact: 'positive',
        affectedPlans: ['ChatGPT Enterprise'],
      },
    ],
  },
  {
    provider: 'Google Gemini',
    changes: [
      {
        date: new Date('2025-12-01'),
        title: 'Workspace Privacy Controls',
        description: 'Enhanced privacy controls for Gemini for Google Workspace',
        impact: 'positive',
        affectedPlans: ['Gemini for Google Workspace'],
      },
      {
        date: new Date('2025-10-15'),
        title: 'Human Review Policy',
        description: 'Introduced human review for Gemini Apps to improve safety and quality',
        impact: 'negative',
        affectedPlans: ['Gemini Apps'],
      },
      {
        date: new Date('2025-09-01'),
        title: 'Data Retention Update',
        description: 'Updated data retention policy for Workspace customers',
        impact: 'positive',
        affectedPlans: ['Gemini for Google Workspace'],
      },
      {
        date: new Date('2025-07-20'),
        title: 'Regional Compliance',
        description: 'Added support for regional data residency requirements',
        impact: 'positive',
        affectedPlans: ['Gemini for Google Workspace'],
      },
    ],
  },
  {
    provider: 'Anthropic Claude',
    changes: [
      {
        date: new Date('2025-12-10'),
        title: 'Custom Data Retention Policies',
        description: 'Enterprise customers can now set custom data retention policies',
        impact: 'positive',
        affectedPlans: ['Claude Team', 'Claude Enterprise'],
      },
      {
        date: new Date('2025-11-05'),
        title: 'Opt-out Data Training',
        description: 'Consumer plans now support opt-out for data training with automatic deletion',
        impact: 'positive',
        affectedPlans: ['Claude Free', 'Claude Pro'],
      },
      {
        date: new Date('2025-09-30'),
        title: 'PDPA Compliance',
        description: 'Added explicit PDPA compliance support for Thailand and Southeast Asia',
        impact: 'positive',
        affectedPlans: ['Claude Team', 'Claude Enterprise'],
      },
      {
        date: new Date('2025-08-15'),
        title: 'Security Audit',
        description: 'Completed SOC 2 Type II security audit for Enterprise plan',
        impact: 'positive',
        affectedPlans: ['Claude Enterprise'],
      },
    ],
  },
  {
    provider: 'Microsoft Copilot',
    changes: [
      {
        date: new Date('2025-12-05'),
        title: 'Commercial Data Protection Enhancement',
        description: 'Strengthened data protection guarantees for Commercial Data Protection users',
        impact: 'positive',
        affectedPlans: ['Copilot with Commercial Data Protection'],
      },
      {
        date: new Date('2025-10-20'),
        title: 'Enterprise Deployment Options',
        description: 'Added on-premises deployment option for Enterprise customers',
        impact: 'positive',
        affectedPlans: ['Copilot Enterprise'],
      },
      {
        date: new Date('2025-09-10'),
        title: 'Privacy Statement Update',
        description: 'Updated privacy statement to clarify data handling practices',
        impact: 'neutral',
        affectedPlans: ['Copilot Free', 'Copilot Enterprise'],
      },
      {
        date: new Date('2025-07-25'),
        title: 'GDPR Data Processing Agreement',
        description: 'Published updated Data Processing Agreement for GDPR compliance',
        impact: 'positive',
        affectedPlans: ['Copilot Enterprise'],
      },
    ],
  },
];
