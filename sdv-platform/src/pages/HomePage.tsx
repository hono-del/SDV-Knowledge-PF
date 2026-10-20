import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { t } from '../utils/i18n';
import { BookOpen, Users, Settings, ArrowRight, Sparkles, Database, TrendingUp } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const cards = [
    {
      icon: <Users size={32} className="text-teal-600" />,
      title: T('dealerPortal'),
      desc: T('dealerPortalDesc'),
      path: '/dealer',
      color: 'border-teal-200 hover:border-teal-400',
      badge: language === 'ja' ? 'ディーラー向け' : 'For Dealers',
      badgeColor: 'bg-teal-50 text-teal-700',
      features: language === 'ja' 
        ? ['商品を学ぶ', '顧客プロファイル入力', 'レコメンド生成', '顧客に見せる']
        : ['Product Learning', 'Customer Profile', 'Generate Recommendations', 'Show Customer'],
    },
    {
      icon: <Sparkles size={32} className="text-purple-500" />,
      title: T('customerExperience'),
      desc: T('customerExperienceDesc'),
      path: '/customer',
      color: 'border-purple-200 hover:border-purple-400',
      badge: language === 'ja' ? 'ユーザー向け' : 'For Users',
      badgeColor: 'bg-purple-50 text-purple-700',
      features: language === 'ja'
        ? ['パーソナライズされた提案', 'あなたへの理由', '関心を伝える', 'フィードバック']
        : ['Personalized Proposals', 'Why for You', 'Express Interest', 'Feedback'],
    },
    {
      icon: <Settings size={32} className="text-navy-600" />,
      title: T('adminConsole'),
      desc: T('adminConsoleDesc'),
      path: '/admin',
      color: 'border-navy-200 hover:border-navy-400',
      badge: language === 'ja' ? '管理者向け' : 'For Admins',
      badgeColor: 'bg-navy-50 text-navy-700',
      features: language === 'ja'
        ? ['ナレッジ管理', 'AI制御', '分析ダッシュボード', '改善インサイト']
        : ['Knowledge Management', 'AI Control', 'Analytics Dashboard', 'Improvement Insights'],
    },
  ];

  const flow = language === 'ja'
    ? ['公開情報', 'AI Ready化', 'Dealer学習', 'Dealer提案', 'ユーザー体験', 'ログ分析', '継続改善']
    : ['Public Info', 'AI Ready', 'Dealer Learn', 'Dealer Sell', 'User Experience', 'Log Analysis', 'Improvement'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      {/* Hero */}
      <div className="bg-navy-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-600/20 border border-teal-500/30 rounded-full px-4 py-1.5 text-teal-300 text-sm font-medium mb-6">
            <Database size={14} />
            {language === 'ja' ? 'コンセプトデモ — 公開情報ベース' : 'Concept Demo — Based on Public Information'}
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            {T('appName')}
          </h1>
          <p className="text-xl text-teal-300 mb-8 font-medium">
            {T('appSubcopy')}
          </p>
          
          {/* Flow diagram */}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {flow.map((step, i) => (
              <React.Fragment key={i}>
                <span className="bg-navy-800 border border-navy-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <ArrowRight size={14} className="text-teal-500 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`card-hover text-left group border-2 ${card.color} transition-all duration-200`}
            >
              <div className="mb-4">
                {card.icon}
              </div>
              <div className="mb-2">
                <span className={`tag text-xs ${card.badgeColor} mb-2`}>
                  {card.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-teal-700 transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {card.desc}
              </p>
              <ul className="space-y-1">
                {card.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1 h-1 bg-teal-400 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-1 text-teal-600 text-sm font-medium group-hover:gap-2 transition-all">
                {language === 'ja' ? '開始' : 'Get Started'}
                <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>

        {/* Demo story hint */}
        <div className="mt-10 bg-teal-50 border border-teal-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <TrendingUp size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-navy-900 mb-1">
                {language === 'ja' ? '推奨デモストーリー' : 'Recommended Demo Story'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'ja' 
                  ? 'Admin → ナレッジインポート → Dealer学習 → 顧客プロファイル → レコメンド生成 → 顧客に見せる → ログ確認 → Analytics → 改善インサイト'
                  : 'Admin → Knowledge Import → Dealer Learn → Customer Profile → Generate Recommendations → Show Customer → View Logs → Analytics → Improvement Insights'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
