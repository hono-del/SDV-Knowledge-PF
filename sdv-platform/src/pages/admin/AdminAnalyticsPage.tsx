import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { analyticsData } from '../../data/analytics';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, Legend,
} from 'recharts';
import { ChevronRight } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const kpis = [
    { label: T('learningCompletion'), value: `${analyticsData.learningCompletion}%`, trend: '+5%', positive: true },
    { label: T('quizAccuracy'), value: `${analyticsData.quizAccuracy}%`, trend: '+3%', positive: true },
    { label: T('salesAssistUsage'), value: analyticsData.salesAssistUsage, trend: '+18', positive: true },
    { label: T('recommendationViews'), value: analyticsData.recommendationViews, trend: '+12', positive: true },
    { label: T('interestedRate'), value: `${analyticsData.interestedRate}%`, trend: '+4%', positive: true },
    { label: T('demoViewRate'), value: `${analyticsData.demoViewRate}%`, trend: '+2%', positive: true },
  ];

  const productData = analyticsData.recommendationByProduct.map(p => ({
    name: p.name[language],
    count: p.count,
    rate: p.interestedRate,
  }));

  const stateData = analyticsData.interestByState.map(s => ({
    name: s.state,
    rate: s.rate,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
              <ChevronRight size={14} />
              <span className="text-navy-900">{T('analytics')}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900">{T('analytics')}</h1>
          </div>
          <button
            onClick={() => navigate('/admin/insights')}
            className="btn-teal flex items-center gap-2 text-sm"
          >
            {language === 'ja' ? '改善インサイトを見る' : 'View Improvement Insights'}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="card text-center">
              <div className="text-2xl font-bold text-navy-900">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
              <div className={`text-xs font-medium mt-1 ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommendation by Product */}
          <div className="card">
            <h3 className="font-bold text-navy-900 mb-4">
              {language === 'ja' ? '商品別レコメンド数 & 関心率' : 'Recommendation Count & Interest Rate by Product'}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={productData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="count" fill="#14b8a6" name={language === 'ja' ? 'レコメンド数' : 'Recommendations'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="rate" fill="#1e2a5a" name={language === 'ja' ? '関心率(%)' : 'Interest Rate(%)'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Interest by State */}
          <div className="card">
            <h3 className="font-bold text-navy-900 mb-4">
              {language === 'ja' ? '地域別関心率' : 'Interest Rate by Region'}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stateData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 70]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={70} />
                <Tooltip />
                <Bar dataKey="rate" fill="#14b8a6" name={language === 'ja' ? '関心率(%)' : 'Interest Rate(%)'} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Value Resonance */}
          <div className="card">
            <h3 className="font-bold text-navy-900 mb-4">
              {language === 'ja' ? '価値訴求の反応スコア' : 'Value Resonance Score'}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={analyticsData.valueResonance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="value" tick={{ fontSize: 10 }} />
                <Radar dataKey="score" fill="#14b8a6" fillOpacity={0.3} stroke="#14b8a6" />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Learning vs Sales Usage */}
          <div className="card">
            <h3 className="font-bold text-navy-900 mb-4">
              {language === 'ja' ? '学習 vs セールスアシスト利用推移' : 'Learning vs Sales Assist Usage Trend'}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={analyticsData.learningVsSales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="learning" stroke="#14b8a6" strokeWidth={2} name={language === 'ja' ? '学習' : 'Learning'} dot={false} />
                <Line type="monotone" dataKey="sales" stroke="#1e2a5a" strokeWidth={2} name={language === 'ja' ? 'セールスアシスト' : 'Sales Assist'} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market comparison */}
        <div className="card">
          <h3 className="font-bold text-navy-900 mb-4">
            {language === 'ja' ? 'マーケット別関心率' : 'Interest Rate by Market'}
          </h3>
          <div className="flex gap-6 items-center">
            {analyticsData.interestByMarket.map(m => (
              <div key={m.market} className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{m.market}</span>
                  <span className="text-lg font-bold text-teal-600">{m.interestedRate}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${m.interestedRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
