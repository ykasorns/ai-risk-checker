import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Shield, TrendingUp } from 'lucide-react';
import { MainNavigation } from '@/components/MainNavigation';
import { aiProviders, riskLevelDescriptions } from '@/lib/data/aiProvidersData';

// Derive risk distribution from real data
function buildRiskDistribution() {
  const counts: Record<string, number> = { low: 0, medium: 0, high: 0, 'very-high': 0 };
  for (const provider of aiProviders) {
    for (const version of provider.versions) {
      counts[version.riskLevel]++;
    }
  }
  return [
    { name: riskLevelDescriptions.low.label, value: counts.low, color: riskLevelDescriptions.low.color },
    { name: riskLevelDescriptions.medium.label, value: counts.medium, color: riskLevelDescriptions.medium.color },
    { name: riskLevelDescriptions.high.label, value: counts.high, color: riskLevelDescriptions.high.color },
    { name: riskLevelDescriptions['very-high'].label, value: counts['very-high'], color: riskLevelDescriptions['very-high'].color },
  ].filter((d) => d.value > 0);
}

// Derive compliance scores per provider from actual compliance arrays
function buildComplianceStatus() {
  const frameworks = ['GDPR', 'SOC 2', 'ISO 27001'];
  return aiProviders.map((provider) => {
    const allVersionCompliance = provider.versions.flatMap((v) => v.compliance);
    const score = (framework: string) => {
      const matching = provider.versions.filter((v) =>
        v.compliance.some((c) => c.toUpperCase().includes(framework))
      ).length;
      return Math.round((matching / provider.versions.length) * 100);
    };
    return {
      provider: provider.name,
      GDPR: score('GDPR'),
      'SOC 2': score('SOC'),
      'ISO 27001': score('ISO'),
    };
  });
}

// Derive summary stats from real data
function buildStats() {
  const allVersions = aiProviders.flatMap((p) => p.versions);
  const highRisk = allVersions.filter((v) => v.riskLevel === 'high' || v.riskLevel === 'very-high').length;
  const lowRisk = allVersions.filter((v) => v.riskLevel === 'low').length;
  const compliantCount = allVersions.filter((v) => !v.dataUsedForTraining).length;
  const complianceScore = Math.round((compliantCount / allVersions.length) * 100);

  return { totalProviders: aiProviders.length, highRisk, complianceScore, compliantModels: lowRisk };
}

// Derive recent alerts from high-risk versions with training enabled
function buildAlerts() {
  return aiProviders
    .flatMap((p) =>
      p.versions
        .filter((v) => v.dataUsedForTraining)
        .map((v) => ({
          level: v.riskLevel,
          message: `${p.name} — ${v.name}: ${v.description.split('.')[0]}.`,
        }))
    )
    .slice(0, 3);
}

const riskDistribution = buildRiskDistribution();
const complianceStatus = buildComplianceStatus();
const { totalProviders, highRisk, complianceScore, compliantModels } = buildStats();
const alerts = buildAlerts();

const alertStyle: Record<string, { bg: string; text: string; title: string; iconColor: string }> = {
  'very-high': { bg: 'bg-red-50', text: 'text-red-700', title: 'text-red-900', iconColor: 'text-red-600' },
  high: { bg: 'bg-red-50', text: 'text-red-700', title: 'text-red-900', iconColor: 'text-red-600' },
  medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', title: 'text-yellow-900', iconColor: 'text-yellow-600' },
  low: { bg: 'bg-blue-50', text: 'text-blue-700', title: 'text-blue-900', iconColor: 'text-blue-600' },
};

export default function Dashboard() {
  const stats = [
    {
      title: 'Total AI Providers',
      value: String(totalProviders),
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'High / Very High Risk Models',
      value: String(highRisk),
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      title: 'Safe Models (No Training)',
      value: `${complianceScore}%`,
      icon: <Shield className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Low Risk Models',
      value: String(compliantModels),
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNavigation />
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of AI providers risk and compliance status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`p-6 ${stat.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Compliance Score by Provider */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance Coverage by Provider</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" angle={-20} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="GDPR" fill="#6dcff6" />
                <Bar dataKey="SOC 2" fill="#1b75bc" />
                <Bar dataKey="ISO 27001" fill="#2e3192" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Training Data Usage by Provider */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Used for Training — Per Plan</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={aiProviders.flatMap((p) =>
                p.versions.map((v) => ({
                  name: `${p.name.split(' ')[0]} — ${v.name.split(' ').slice(-1)[0]}`,
                  training: v.dataUsedForTraining ? 1 : 0,
                  color: v.dataUsedForTraining ? '#dc2626' : '#16a34a',
                }))
              )}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
              <YAxis ticks={[0, 1]} tickFormatter={(v) => (v === 1 ? 'Yes' : 'No')} />
              <Tooltip formatter={(v) => (v === 1 ? 'Used for training' : 'Not used')} />
              <Bar dataKey="training" name="Training Data">
                {aiProviders
                  .flatMap((p) => p.versions)
                  .map((v, i) => (
                    <Cell key={i} fill={v.dataUsedForTraining ? '#dc2626' : '#16a34a'} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts from high-risk training-enabled models */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const style = alertStyle[alert.level] ?? alertStyle.medium;
              return (
                <div key={i} className={`flex items-start gap-3 p-3 ${style.bg} rounded-lg`}>
                  <AlertCircle className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-semibold ${style.title}`}>
                      {alert.level === 'very-high' ? 'Very High Risk' : alert.level.charAt(0).toUpperCase() + alert.level.slice(1) + ' Risk'} — Uses Training Data
                    </p>
                    <p className={`text-sm ${style.text}`}>{alert.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
