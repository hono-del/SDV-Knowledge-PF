import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { products } from '../../data/products';
import { BookOpen, Lightbulb, ArrowRight, Star } from 'lucide-react';

export const DealerHomePage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const fjProducts = products.filter(p => p.vehicle === 'fj');
  const bzProducts = products.filter(p => p.vehicle === 'bz4x');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
            <span>/</span>
            <span className="text-navy-900">{T('dealerPortal')}</span>
          </div>
          <h1 className="page-title">{T('dealerHome')}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'ja' 
              ? '商品を深く理解し、最適な顧客に最適な価値を届けましょう。'
              : 'Deeply understand products and deliver the right value to the right customer.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Primary actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => navigate('/dealer/products')}
            className="card-hover group border-2 border-teal-100 hover:border-teal-300 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-teal-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-1">
                  {T('learn')}
                </div>
                <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {language === 'ja' ? '商品を学ぶ' : 'Product Learning'}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {language === 'ja'
                    ? '商品の特徴、なぜ顧客に刺さるか、売り方まで体系的に学ぶ。クイズで理解を確認。'
                    : 'Systematically learn product features, why they resonate with customers, and how to sell. Verify understanding with quizzes.'}
                </p>
                <div className="mt-3 flex items-center gap-1 text-teal-600 text-sm font-medium">
                  {language === 'ja' ? '学習を開始' : 'Start Learning'}
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/dealer/sales')}
            className="card-hover group border-2 border-navy-100 hover:border-navy-300 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb size={24} className="text-navy-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-navy-600 uppercase tracking-wide mb-1">
                  {T('sell')}
                </div>
                <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
                  {language === 'ja' ? 'セールスアシスト' : 'Sales Assist'}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {language === 'ja'
                    ? '顧客プロファイルを入力して最適な商品と提案トークを自動生成。顧客に直接見せることも可能。'
                    : 'Enter customer profiles to auto-generate optimal product recommendations and sales talk. Can be shown directly to customers.'}
                </p>
                <div className="mt-3 flex items-center gap-1 text-navy-600 text-sm font-medium">
                  {language === 'ja' ? '顧客プロファイルを入力' : 'Enter Customer Profile'}
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Products overview */}
        <h2 className="section-title mb-4">
          {language === 'ja' ? '対象商品' : 'Target Products'}
        </h2>

        {/* Land Cruiser FJ */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🚙</span>
            <h3 className="text-lg font-bold text-navy-900">Land Cruiser FJ</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fjProducts.map(p => (
              <button
                key={p.id}
                onClick={() => navigate(`/dealer/learn/${p.id}`)}
                className="card-hover text-left group"
              >
                <div className="text-2xl mb-2">{p.imageEmoji}</div>
                <h4 className="font-semibold text-navy-900 group-hover:text-teal-700 transition-colors">
                  {p.name[language]}
                </h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {p.shortDesc[language]}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.valueTags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag-teal text-xs">{tag}</span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-teal-600 font-medium flex items-center gap-1">
                  <BookOpen size={12} />
                  {T('learn')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* bZ4X */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">⚡</span>
            <h3 className="text-lg font-bold text-navy-900">bZ4X</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bzProducts.map(p => (
              <button
                key={p.id}
                onClick={() => navigate(`/dealer/learn/${p.id}`)}
                className="card-hover text-left group"
              >
                <div className="text-2xl mb-2">{p.imageEmoji}</div>
                <h4 className="font-semibold text-navy-900 group-hover:text-teal-700 transition-colors">
                  {p.name[language]}
                </h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {p.shortDesc[language]}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.valueTags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag-teal text-xs">{tag}</span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-teal-600 font-medium flex items-center gap-1">
                  <BookOpen size={12} />
                  {T('learn')}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
