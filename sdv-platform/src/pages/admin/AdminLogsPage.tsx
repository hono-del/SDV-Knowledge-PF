import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { getProductById } from '../../data/products';
import { ChevronRight, Trash2 } from 'lucide-react';

const eventTypeColors: Record<string, string> = {
  learning_view: 'bg-blue-50 text-blue-700',
  quiz_answer: 'bg-purple-50 text-purple-700',
  sales_assist_run: 'bg-navy-50 text-navy-700',
  recommendation_view: 'bg-teal-50 text-teal-700',
  customer_interest: 'bg-green-50 text-green-700',
  customer_not_interested: 'bg-red-50 text-red-700',
  demo_view: 'bg-gray-50 text-gray-700',
  knowledge_import: 'bg-gold-50 text-gold-700',
  prompt_test: 'bg-indigo-50 text-indigo-700',
};

export const AdminLogsPage: React.FC = () => {
  const { language, logs, clearLogs } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);
  
  const [filter, setFilter] = useState<string>('all');
  const [actorFilter, setActorFilter] = useState<string>('all');

  const filtered = logs.filter(log => {
    if (filter !== 'all' && log.eventType !== filter) return false;
    if (actorFilter !== 'all' && log.actorType !== actorFilter) return false;
    return true;
  });

  const eventTypes = [
    'all', 'learning_view', 'quiz_answer', 'sales_assist_run',
    'recommendation_view', 'customer_interest', 'customer_not_interested',
    'knowledge_import', 'prompt_test',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
              <ChevronRight size={14} />
              <span className="text-navy-900">{T('logs')}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900">{T('logs')}</h1>
          </div>
          <button
            onClick={() => clearLogs()}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Trash2 size={14} />
            {language === 'ja' ? 'リセット' : 'Reset'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex gap-1 flex-wrap">
            {['all', 'dealer', 'customer', 'admin'].map(actor => (
              <button
                key={actor}
                onClick={() => setActorFilter(actor)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  actorFilter === actor ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {actor === 'all' ? (language === 'ja' ? '全員' : 'All') : actor}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === type ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {type === 'all' ? (language === 'ja' ? '全イベント' : 'All Events') : type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-400 mb-3">
          {filtered.length} {language === 'ja' ? '件のログ' : 'logs'}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{T('timestamp')}</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{T('actor')}</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Market</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Region</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{T('event')}</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{T('product')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(log => {
                  const product = log.productId ? getProductById(log.productId) : null;
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString(language === 'ja' ? 'ja-JP' : 'en-US', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`tag text-xs ${log.actorType === 'dealer' ? 'bg-navy-50 text-navy-600' : log.actorType === 'customer' ? 'bg-teal-50 text-teal-600' : 'bg-gray-100 text-gray-600'}`}>
                          {log.actorType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{log.market}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{log.region || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`tag text-xs ${eventTypeColors[log.eventType] || 'bg-gray-50 text-gray-600'}`}>
                          {log.eventType.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {product ? `${product.imageEmoji} ${product.name[language]}` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
