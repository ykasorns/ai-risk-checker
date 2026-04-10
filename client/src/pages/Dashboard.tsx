import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { MainNavigation } from '@/components/MainNavigation';

export default function Dashboard() {
  // Sample data for charts
  const riskDistribution = [
    { name: 'Low Risk', value: 2, color: '#16a34a' },
    { name: 'Medium Risk', value: 1, color: '#ea580c' },
    { name: 'High Risk', value: 3, color: '#dc2626' },
    { name: 'Very High Risk', value: 1, color: '#991b1b' },
  ];

  const complianceStatus = [
    { provider: 'OpenAI', gdpr: 75, pdpa: 60, ccpa: 70 },
    { provider: 'Google Gemini', gdpr: 85, pdpa: 80, ccpa: 82 },
    { provider: 'Anthropic Claude', gdpr: 90, pdpa: 85, ccpa: 88 },
    { provider: 'Microsoft Copilot', gdpr: 80, pdpa: 75, ccpa: 78 },
  ];

  const riskTrend = [
    { month: 'Jan', risk: 65 },
    { month: 'Feb', risk: 62 },
    { month: 'Mar', risk: 68 },
    { month: 'Apr', risk: 60 },
    { month: 'May', risk: 55 },
    { month: 'Jun', risk: 58 },
  ];

  const stats = [
    {
      title: 'Total AI Providers',
      value: '4',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'High Risk Models',
      value: '3',
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      title: 'Compliance Score',
      value: '82%',
      icon: <Shield className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Compliant Models',
      value: '2',
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNavigation />
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your AI usage and compliance status</p>
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
                  fill="#8884d8"
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

          {/* Compliance Status */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance Score by Provider</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gdpr" fill="#6dcff6" name="GDPR" />
                <Bar dataKey="pdpa" fill="#1b75bc" name="PDPA" />
                <Bar dataKey="ccpa" fill="#2e3192" name="CCPA" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Risk Trend */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Risk Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2e3192"
                strokeWidth={2}
                dot={{ fill: '#1b75bc', r: 5 }}
                activeDot={{ r: 7 }}
                name="Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">High Risk Alert</p>
                <p className="text-sm text-red-700">ChatGPT Free uses data for training. Review compliance requirements.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Policy Update</p>
                <p className="text-sm text-yellow-700">Google Gemini Apps now includes human review. Update your assessment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Compliance Update</p>
                <p className="text-sm text-blue-700">Anthropic Claude Enterprise now supports custom data retention policies.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
