export interface RiskProfile {
  id: string;
  name: string;
  description: string;
  industry: string;
  dataTypes: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  complianceFrameworks: string[];
  recommendations: string[];
}

export const riskProfiles: RiskProfile[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    description: 'For healthcare providers, hospitals, and medical research organizations',
    industry: 'Healthcare',
    dataTypes: ['Health Information', 'Personal Information', 'Legal Documents'],
    riskTolerance: 'low',
    complianceFrameworks: ['GDPR', 'PDPA', 'HIPAA', 'HITECH'],
    recommendations: [
      'Use only Enterprise/Team plans with no data training',
      'Implement end-to-end encryption for patient data',
      'Conduct regular DPIA (Data Protection Impact Assessment)',
      'Maintain audit logs for all AI usage',
      'Ensure data residency in compliant regions',
      'Implement role-based access control (RBAC)',
    ],
  },
  {
    id: 'finance',
    name: 'Financial Services',
    description: 'For banks, insurance companies, and financial institutions',
    industry: 'Finance',
    dataTypes: ['Financial Data', 'Personal Information', 'Business Confidential'],
    riskTolerance: 'low',
    complianceFrameworks: ['GDPR', 'PDPA', 'PCI-DSS', 'SOX'],
    recommendations: [
      'Use only Enterprise/Team plans with commercial data protection',
      'Implement strict data minimization practices',
      'Conduct regular security audits and penetration testing',
      'Maintain compliance with PCI-DSS for payment data',
      'Use tokenization or masking for sensitive financial data',
      'Implement multi-factor authentication (MFA)',
    ],
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    description: 'For government agencies and public sector organizations',
    industry: 'Government',
    dataTypes: ['Personal Information', 'Legal Documents', 'Business Confidential'],
    riskTolerance: 'low',
    complianceFrameworks: ['GDPR', 'PDPA', 'Government Data Protection Standards'],
    recommendations: [
      'Use only on-premises or government-approved cloud solutions',
      'Implement classified data handling procedures',
      'Conduct regular security clearance reviews',
      'Maintain strict audit trails and logging',
      'Use government-approved encryption standards',
      'Implement air-gapped systems for highly sensitive data',
    ],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'For law firms, compliance departments, and legal services',
    industry: 'Legal',
    dataTypes: ['Legal Documents', 'Personal Information', 'Business Confidential'],
    riskTolerance: 'low',
    complianceFrameworks: ['GDPR', 'PDPA', 'Attorney-Client Privilege'],
    recommendations: [
      'Use only Enterprise plans with attorney-client privilege protection',
      'Implement document classification and access controls',
      'Maintain separate systems for privileged communications',
      'Conduct regular compliance audits',
      'Use secure document management systems',
      'Implement data retention policies per legal requirements',
    ],
  },
  {
    id: 'education',
    name: 'Education & Research',
    description: 'For universities, research institutions, and educational organizations',
    industry: 'Education',
    dataTypes: ['Personal Information', 'Health Information', 'Public Information'],
    riskTolerance: 'medium',
    complianceFrameworks: ['GDPR', 'PDPA', 'FERPA'],
    recommendations: [
      'Use Business or Enterprise plans for student data',
      'Implement FERPA-compliant data handling',
      'Conduct DPIA for research involving human subjects',
      'Maintain data minimization for student records',
      'Implement secure data sharing protocols',
      'Use institutional review board (IRB) approval for research',
    ],
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'For retail companies and e-commerce platforms',
    industry: 'Retail',
    dataTypes: ['Personal Information', 'Financial Data', 'Business Confidential'],
    riskTolerance: 'medium',
    complianceFrameworks: ['GDPR', 'PDPA', 'PCI-DSS'],
    recommendations: [
      'Use Business plan for customer data',
      'Implement PCI-DSS compliance for payment data',
      'Maintain customer consent for data processing',
      'Use data anonymization for analytics',
      'Implement secure customer data storage',
      'Regular security assessments and updates',
    ],
  },
  {
    id: 'tech',
    name: 'Technology & Software',
    description: 'For tech companies and software development organizations',
    industry: 'Technology',
    dataTypes: ['Business Confidential', 'Personal Information', 'Public Information'],
    riskTolerance: 'medium',
    complianceFrameworks: ['GDPR', 'PDPA'],
    recommendations: [
      'Use Business or Enterprise plans for proprietary code',
      'Implement code review and security scanning',
      'Maintain intellectual property protection',
      'Use secure development practices',
      'Implement data classification for code and documentation',
      'Regular security training for development teams',
    ],
  },
  {
    id: 'nonprofit',
    name: 'Non-profit & NGO',
    description: 'For non-profit organizations and NGOs',
    industry: 'Non-profit',
    dataTypes: ['Personal Information', 'Health Information', 'Public Information'],
    riskTolerance: 'medium',
    complianceFrameworks: ['GDPR', 'PDPA'],
    recommendations: [
      'Use Business plan for donor and beneficiary data',
      'Maintain donor privacy and confidentiality',
      'Implement data minimization practices',
      'Use secure communication channels',
      'Implement access controls for sensitive data',
      'Regular data protection training for staff',
    ],
  },
];
