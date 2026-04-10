export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

export interface ComplianceRequirement {
  framework: string;
  description: string;
  requirements: string[];
  recommendations: Record<RiskLevel, string[]>;
}

export const complianceData: Record<string, ComplianceRequirement> = {
  GDPR: {
    framework: 'GDPR (General Data Protection Regulation)',
    description:
      'European Union regulation protecting personal data and privacy. Applies to any organization processing EU residents\' data.',
    requirements: [
      'Data minimization - collect only necessary data',
      'Lawful basis - must have legal reason to process data',
      'Data subject rights - users can request access, deletion, portability',
      'Data Protection Impact Assessment (DPIA) - for high-risk processing',
      'Data Processing Agreement (DPA) - required with AI providers',
      'Breach notification - must notify within 72 hours',
      'Privacy by design - implement security from the start',
    ],
    recommendations: {
      'low': [
        '✅ Generally compliant with standard DPA with provider',
        '✅ Document lawful basis for data processing',
        '✅ Maintain records of processing activities',
        '✅ Implement standard data protection measures',
      ],
      'medium': [
        '⚠️ Conduct Data Protection Impact Assessment (DPIA)',
        '⚠️ Ensure explicit user consent for data usage',
        '⚠️ Implement enhanced data protection measures',
        '⚠️ Regular compliance audits recommended',
        '⚠️ Document all processing purposes and retention periods',
      ],
      'high': [
        '❌ NOT RECOMMENDED for personal/financial data under GDPR',
        '⚠️ If used, requires explicit DPIA and legal review',
        '⚠️ Implement data anonymization/pseudonymization',
        '⚠️ Obtain explicit informed consent from data subjects',
        '⚠️ Consider data residency requirements (EU data centers)',
      ],
      'very-high': [
        '❌ HIGHLY PROBLEMATIC for GDPR compliance',
        '❌ Human review of data violates privacy expectations',
        '⚠️ Only use with non-personal, public information',
        '⚠️ Requires extensive legal documentation',
        '⚠️ Consider alternative solutions with better privacy guarantees',
      ],
    },
  },
  PDPA: {
    framework: 'PDPA (Personal Data Protection Act)',
    description:
      'Thai personal data protection law. Applies to any organization processing personal data of Thai residents.',
    requirements: [
      'Consent - explicit consent required for data collection',
      'Purpose limitation - data used only for stated purposes',
      'Data accuracy - keep personal data accurate and up-to-date',
      'Data retention - delete data when no longer needed',
      'Data security - implement appropriate security measures',
      'Data subject rights - users can request access and correction',
      'Notification - inform data subjects of collection and usage',
    ],
    recommendations: {
      'low': [
        '✅ Compliant with standard PDPA requirements',
        '✅ Maintain clear privacy notice for users',
        '✅ Implement reasonable security measures',
        '✅ Document consent and processing purposes',
      ],
      'medium': [
        '⚠️ Ensure explicit user consent is obtained',
        '⚠️ Provide clear opt-out mechanisms',
        '⚠️ Implement enhanced security measures',
        '⚠️ Regular data protection compliance checks',
        '⚠️ Document data retention and deletion policies',
      ],
      'high': [
        '❌ NOT RECOMMENDED for personal/financial data under PDPA',
        '⚠️ If used, requires explicit written consent from each user',
        '⚠️ Implement data encryption and access controls',
        '⚠️ Conduct regular security audits',
        '⚠️ Prepare incident response plan for data breaches',
      ],
      'very-high': [
        '❌ HIGHLY PROBLEMATIC for PDPA compliance',
        '❌ Human review of data violates PDPA principles',
        '⚠️ Only use with non-personal, public information',
        '⚠️ Requires explicit legal review and approval',
        '⚠️ Consider alternative solutions with stronger privacy protections',
      ],
    },
  },
};

export const riskComplianceMapping: Record<RiskLevel, any> = {
  'low': {
    gdprStatus: 'Generally Compliant',
    pdpaStatus: 'Generally Compliant',
    gdprColor: 'text-green-700',
    pdpaColor: 'text-green-700',
  },
  'medium': {
    gdprStatus: 'Conditional Compliance',
    pdpaStatus: 'Conditional Compliance',
    gdprColor: 'text-yellow-700',
    pdpaColor: 'text-yellow-700',
  },
  'high': {
    gdprStatus: 'Non-Compliant (Sensitive Data)',
    pdpaStatus: 'Non-Compliant (Sensitive Data)',
    gdprColor: 'text-red-700',
    pdpaColor: 'text-red-700',
  },
  'very-high': {
    gdprStatus: 'Highly Non-Compliant',
    pdpaStatus: 'Highly Non-Compliant',
    gdprColor: 'text-red-900',
    pdpaColor: 'text-red-900',
  },
};
