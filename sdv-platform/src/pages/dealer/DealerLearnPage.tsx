import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { getProductById } from '../../data/products';
import { getLearningContent } from '../../data/learning';
import { ChevronRight, CheckCircle, XCircle, HelpCircle, ArrowLeft, ArrowRight, BookOpen, Star, AlertTriangle } from 'lucide-react';

const sections = ['whatIsIt', 'whyCustomersCare', 'bestFitCustomers', 'customerStory', 'howToSell', 'successStory', 'quiz'];

export const DealerLearnPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const product = getProductById(productId || '');
  const learning = getLearningContent(productId || '');

  const [activeSection, setActiveSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null]);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean[]>([false, false, false]);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (productId) {
      addLog({ actorType: 'dealer', market: 'japan', language, vehicle: product?.vehicle, eventType: 'learning_view', productId: productId as any, metadata: { section: sections[activeSection] } });
    }
  }, [activeSection]);

  useEffect(() => {
    setCompletedSections(prev => new Set([...prev, activeSection - 1]));
  }, [activeSection]);

  if (!product || !learning) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">{language === 'ja' ? '商品が見つかりません' : 'Product not found'}</p>
        <button onClick={() => navigate('/dealer')} className="btn-primary mt-4">{T('back')}</button>
      </div>
    );
  }

  const sectionLabels: Record<string, string> = {
    whatIsIt: T('whatIsIt'),
    whyCustomersCare: T('whyCustomersCare'),
    bestFitCustomers: T('bestFitCustomers'),
    customerStory: T('customerStory'),
    howToSell: T('howToSell'),
    successStory: T('successStory'),
    quiz: T('quiz'),
  };

  const renderSection = () => {
    switch (sections[activeSection]) {
      case 'whatIsIt':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">{T('whatIsIt')}</h2>
            <div className="card">
              <div className="flex items-start gap-4">
                <span className="text-5xl">{product.imageEmoji}</span>
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-1">{product.name[language]}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{learning.whatIsIt[language]}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {product.primaryValues.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 bg-teal-50 rounded-xl p-3">
                    <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-teal-800">{v[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'whyCustomersCare':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">{T('whyCustomersCare')}</h2>
            <div className="space-y-4">
              {learning.whyCustomersCare.map((item, i) => (
                <div key={i} className="card">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{T('feature')}</div>
                      <div className="text-sm font-semibold text-navy-900">{item.feature[language]}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight size={20} className="text-teal-500" />
                    </div>
                    <div className="bg-teal-50 rounded-xl p-4 text-center">
                      <div className="text-xs font-bold text-teal-500 uppercase tracking-wide mb-2">{T('value')}</div>
                      <div className="text-sm font-semibold text-teal-800">{item.value[language]}</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-navy-50 rounded-xl p-3">
                    <div className="text-xs font-bold text-navy-500 uppercase tracking-wide mb-1">{T('experience')}</div>
                    <div className="text-sm text-navy-800 italic">"{item.experience[language]}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bestFitCustomers':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">{T('bestFitCustomers')}</h2>
            <div className="space-y-4">
              {learning.bestFitCustomers.map((c, i) => (
                <div key={i} className="card">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{c.persona[language]}</h3>
                      <p className="text-sm text-gray-600 mb-2">{c.reason[language]}</p>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map(tag => (
                          <span key={tag} className="tag-teal">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customerStory':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-2">{T('customerStory')}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="tag bg-gold-100 text-gold-700 text-xs">{T('demoHypothesis')}</span>
            </div>
            <div className="card mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                <div className="font-medium text-navy-900">{learning.customerStory.persona[language]}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <div className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">{T('before')}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{learning.customerStory.before[language]}</p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="text-xs font-bold text-green-500 uppercase tracking-wide mb-2">{T('after')}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{learning.customerStory.after[language]}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'howToSell':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">{T('howToSell')}</h2>
            <div className="space-y-4">
              <div className="card border-l-4 border-teal-400">
                <div className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2">{T('opener')}</div>
                <p className="text-base font-medium text-navy-900">"{learning.howToSell.opener[language]}"</p>
              </div>
              
              <div className="card">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{T('questions')}</div>
                <div className="space-y-2">
                  {learning.howToSell.questions.map((q, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <HelpCircle size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{q[language]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card border-l-4 border-navy-400">
                <div className="text-xs font-bold text-navy-600 uppercase tracking-wide mb-2">{T('suggestedTalk')}</div>
                <p className="text-sm text-gray-700 leading-relaxed">{learning.howToSell.suggestedTalk[language]}</p>
              </div>

              <div className="card">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{T('objectionHandling')}</div>
                <div className="space-y-3">
                  {learning.howToSell.objectionHandling.map((obj, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-sm font-medium text-red-600 mb-1">
                        Q: "{obj.objection[language]}"
                      </div>
                      <div className="text-sm text-gray-700">
                        A: {obj.response[language]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'successStory':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-2">{T('successStory')}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="tag bg-gold-100 text-gold-700 text-xs">{T('demoHypothesis')}</span>
            </div>
            <div className="card border-l-4 border-gold-400">
              <div className="flex items-center gap-2 mb-3">
                <Star size={18} className="text-gold-500" />
                <h3 className="font-bold text-navy-900">{learning.successStory.title[language]}</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{learning.successStory.content[language]}</p>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">{T('quiz')}</h2>
            <div className="space-y-6">
              {learning.quiz.map((q, qi) => (
                <div key={qi} className="card">
                  <div className="flex items-start gap-2 mb-4">
                    <span className="w-6 h-6 bg-navy-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {qi + 1}
                    </span>
                    <p className="font-medium text-navy-900">{q.question[language]}</p>
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const selected = quizAnswers[qi] === oi;
                      const submitted = quizSubmitted[qi];
                      const correct = q.correctIndex === oi;
                      let cls = 'border border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50';
                      if (submitted && correct) cls = 'border-2 border-green-400 bg-green-50 text-green-800';
                      else if (submitted && selected && !correct) cls = 'border-2 border-red-400 bg-red-50 text-red-800';
                      else if (selected) cls = 'border-2 border-teal-400 bg-teal-50 text-teal-800';
                      
                      return (
                        <button
                          key={oi}
                          disabled={submitted}
                          onClick={() => {
                            const newAnswers = [...quizAnswers];
                            newAnswers[qi] = oi;
                            setQuizAnswers(newAnswers);
                          }}
                          className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all ${cls}`}
                        >
                          <div className="flex items-center gap-2">
                            {submitted && correct && <CheckCircle size={14} className="text-green-500 flex-shrink-0" />}
                            {submitted && selected && !correct && <XCircle size={14} className="text-red-500 flex-shrink-0" />}
                            <span>{opt[language]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {!quizSubmitted[qi] && quizAnswers[qi] !== null && (
                    <button
                      onClick={() => {
                        const newSubmitted = [...quizSubmitted];
                        newSubmitted[qi] = true;
                        setQuizSubmitted(newSubmitted);
                        addLog({ actorType: 'dealer', market: 'japan', language, vehicle: product.vehicle, eventType: 'quiz_answer', productId: productId as any, metadata: { correct: quizAnswers[qi] === q.correctIndex } });
                      }}
                      className="mt-3 btn-teal text-sm py-2"
                    >
                      {language === 'ja' ? '回答する' : 'Submit Answer'}
                    </button>
                  )}
                  
                  {quizSubmitted[qi] && (
                    <div className={`mt-3 rounded-xl p-3 text-sm ${quizAnswers[qi] === q.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <div className="font-bold mb-1">
                        {quizAnswers[qi] === q.correctIndex ? (language === 'ja' ? '正解！' : 'Correct!') : (language === 'ja' ? '不正解' : 'Incorrect')}
                      </div>
                      {q.explanation[language]}
                    </div>
                  )}
                </div>
              ))}
              
              {quizSubmitted.every(s => s) && (
                <div className="card bg-teal-50 border-teal-200 text-center">
                  <div className="text-lg font-bold text-teal-800 mb-1">
                    {language === 'ja' ? 'クイズ完了！' : 'Quiz Complete!'}
                  </div>
                  <div className="text-sm text-teal-600 mb-3">
                    {language === 'ja' 
                      ? `正解数: ${quizSubmitted.filter((_, i) => quizAnswers[i] === learning.quiz[i].correctIndex).length} / ${learning.quiz.length}`
                      : `Correct: ${quizSubmitted.filter((_, i) => quizAnswers[i] === learning.quiz[i].correctIndex).length} / ${learning.quiz.length}`}
                  </div>
                  <button onClick={() => navigate('/dealer/sales')} className="btn-teal">
                    {language === 'ja' ? 'セールスアシストで使ってみる →' : 'Try in Sales Assist →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <button onClick={() => navigate('/dealer')} className="hover:text-teal-600 transition-colors">{T('dealerPortal')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{product.name[language]}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{product.imageEmoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">{product.name[language]}</h1>
              <p className="text-sm text-gray-500">{product.shortDesc[language]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar navigation */}
        <div className="w-48 flex-shrink-0">
          <div className="sticky top-20">
            {/* Progress */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">
                {language === 'ja' ? '進捗' : 'Progress'}: {Math.round((completedSections.size / sections.length) * 100)}%
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-500"
                  style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                />
              </div>
            </div>
            
            <nav className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    activeSection === i
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : completedSections.has(i)
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {completedSections.has(i) && i !== activeSection ? (
                    <CheckCircle size={12} className="text-teal-400 flex-shrink-0" />
                  ) : (
                    <span className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span>{sectionLabels[s]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {renderSection()}
          
          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="btn-secondary disabled:opacity-40 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              {T('back')}
            </button>
            <span className="text-sm text-gray-400">
              {activeSection + 1} / {sections.length}
            </span>
            {activeSection < sections.length - 1 ? (
              <button
                onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                className="btn-teal flex items-center gap-2"
              >
                {T('next')}
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/dealer/sales')}
                className="btn-primary flex items-center gap-2"
              >
                {language === 'ja' ? 'セールスアシストへ' : 'Go to Sales Assist'}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
