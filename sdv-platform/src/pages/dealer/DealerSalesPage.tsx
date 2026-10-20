import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { personas } from '../../data/personas';
import type { CustomerProfile, Vehicle } from '../../types';
import { User, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export const DealerSalesPage: React.FC = () => {
  const { language, market, region, currentProfile, setProfile, aiWeights, addLog, setRecommendations } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [profile, setLocalProfile] = useState<CustomerProfile>(
    currentProfile || {
      market,
      region: region || undefined,
      language,
      vehicle: 'fj',
      ownershipStatus: 'owns',
      drivingFrequency: 'daily',
      interests: { safety: 3, comfort: 3, convenience: 3, outdoor: 3, cleanliness: 3, evUsability: 1, design: 3 },
    }
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const loadPersona = (personaId: string) => {
    const persona = personas[personaId];
    if (persona) {
      setLocalProfile({ ...persona, market, language });
    }
  };

  const toggleLifestyle = (tag: string) => {
    const tags = profile.lifestyleTags || [];
    setLocalProfile(prev => ({
      ...prev,
      lifestyleTags: tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag],
    }));
  };

  const toggleUsage = (usage: string) => {
    const usages = profile.primaryUsage || [];
    setLocalProfile(prev => ({
      ...prev,
      primaryUsage: usages.includes(usage) ? usages.filter(u => u !== usage) : [...usages, usage],
    }));
  };

  const toggleFeature = (feature: string) => {
    const features = profile.frequentlyUsedFeatures || [];
    setLocalProfile(prev => ({
      ...prev,
      frequentlyUsedFeatures: features.includes(feature) ? features.filter(f => f !== feature) : [...features, feature],
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProfile(profile);
    addLog({
      actorType: 'dealer',
      market: profile.market,
      region: profile.region,
      language,
      vehicle: profile.vehicle,
      customerProfileId: profile.id,
      eventType: 'sales_assist_run',
      metadata: { profileName: profile.name },
    });

    // Simulate AI processing
    await new Promise(r => setTimeout(r, 1200));
    
    const { runRecommendationEngine } = await import('../../engine/recommendationEngine');
    const recs = runRecommendationEngine(profile, aiWeights);
    const sessionId = `session-${Date.now()}`;
    setRecommendations(recs, sessionId);
    
    setIsGenerating(false);
    navigate('/dealer/sales/results');
  };

  const lifestyleTags = ['Family', 'Outdoor', 'Commuter', 'Long-distance', 'Weekend Trip', 'Camping'];
  const usageOptions = language === 'ja' 
    ? ['通勤', '家族での外出', 'キャンプ', '長距離', '買い物', '山・自然', '海', '通学送迎']
    : ['commuting', 'family_trips', 'camping', 'long_distance', 'shopping', 'mountain', 'beach', 'school_pickup'];
  const featureOptions = language === 'ja'
    ? ['エアコン', 'ナビ', '荷物スペース', '充電', '運転支援', 'シートヒーター']
    : ['air_conditioning', 'navigation', 'cargo_space', 'charging', 'driver_assistance', 'climate_control'];

  const InterestSlider = ({ label, key, value }: { label: string; key: keyof NonNullable<CustomerProfile['interests']>; value: number }) => (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-24 flex-shrink-0">{label}</span>
      <input
        type="range"
        min={1}
        max={5}
        value={value || 3}
        onChange={e => setLocalProfile(prev => ({
          ...prev,
          interests: { ...prev.interests, [key]: parseInt(e.target.value) },
        }))}
        className="flex-1 accent-teal-500"
      />
      <span className="text-sm font-bold text-teal-600 w-4">{value || 3}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <button onClick={() => navigate('/dealer')} className="hover:text-teal-600">{T('dealerPortal')}</button>
            <ChevronDown size={14} className="rotate-[-90deg]" />
            <span className="text-navy-900">{T('customerProfile')}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">{T('customerProfile')}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Demo Persona loaders */}
        <div className="card mb-6">
          <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
            <Zap size={16} className="text-teal-500" />
            {T('loadDemoProfile')}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(personas).map(([id, p]) => (
              <button
                key={id}
                onClick={() => loadPersona(id)}
                className="border border-teal-200 hover:border-teal-400 hover:bg-teal-50 rounded-xl p-3 text-left transition-all group"
              >
                <div className="text-xl mb-1">{id === 'persona-a' ? '🏕️' : id === 'persona-b' ? '⚡' : '🛡️'}</div>
                <div className="font-medium text-sm text-navy-900 group-hover:text-teal-700">{p.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{p.vehicle === 'fj' ? 'Land Cruiser FJ' : 'bZ4X'} · {p.region}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.lifestyleTags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card space-y-6">
          {/* Basic */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{language === 'ja' ? '基本情報' : 'Basic Info'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{T('name')}</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={e => setLocalProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  placeholder={language === 'ja' ? '氏名' : 'Full name'}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{T('age')}</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={e => setLocalProfile(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  placeholder="35"
                />
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{T('vehicleLabel')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {(['fj', 'bz4x'] as Vehicle[]).map(v => (
                <button
                  key={v}
                  onClick={() => setLocalProfile(prev => ({ ...prev, vehicle: v }))}
                  className={`border-2 rounded-xl p-4 text-left transition-all ${profile.vehicle === v ? 'border-teal-400 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="text-2xl mb-1">{v === 'fj' ? '🚙' : '⚡'}</div>
                  <div className="font-medium text-navy-900">{v === 'fj' ? 'Land Cruiser FJ' : 'bZ4X'}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Household */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{T('household')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">{T('spouse')}</label>
                <button
                  onClick={() => setLocalProfile(prev => ({ ...prev, hasSpouse: !prev.hasSpouse }))}
                  className={`relative w-10 h-6 rounded-full transition-colors ${profile.hasSpouse ? 'bg-teal-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${profile.hasSpouse ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{T('children')}</label>
                <select
                  value={profile.childrenCount ?? ''}
                  onChange={e => setLocalProfile(prev => ({ ...prev, childrenCount: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                >
                  <option value="">{language === 'ja' ? '選択' : 'Select'}</option>
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{language === 'ja' ? '利用状況' : 'Usage'}</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{T('drivingFrequency')}</label>
                <select
                  value={profile.drivingFrequency || ''}
                  onChange={e => setLocalProfile(prev => ({ ...prev, drivingFrequency: e.target.value as any }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                >
                  <option value="daily">{T('daily')}</option>
                  <option value="5-days">{T('fiveDays')}</option>
                  <option value="weekends">{T('weekends')}</option>
                  <option value="occasional">{T('occasional')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  {T('weeklyDistance')} ({market === 'japan' ? T('km') : T('miles')})
                </label>
                <input
                  type="number"
                  value={market === 'japan' ? (profile.weeklyDistanceKm || '') : (profile.weeklyDistanceMiles || '')}
                  onChange={e => {
                    const val = parseInt(e.target.value) || undefined;
                    setLocalProfile(prev => market === 'japan' 
                      ? { ...prev, weeklyDistanceKm: val }
                      : { ...prev, weeklyDistanceMiles: val }
                    );
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  placeholder={market === 'japan' ? '320' : '200'}
                />
              </div>
            </div>

            {/* Shared vehicle */}
            <div className="flex items-center gap-3 mb-3">
              <label className="text-sm text-gray-600">{T('sharedVehicle')}</label>
              <button
                onClick={() => setLocalProfile(prev => ({ ...prev, sharedVehicle: !prev.sharedVehicle }))}
                className={`relative w-10 h-6 rounded-full transition-colors ${profile.sharedVehicle ? 'bg-teal-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${profile.sharedVehicle ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Primary usage tags */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">{T('primaryUsage')}</label>
              <div className="flex flex-wrap gap-2">
                {usageOptions.map(u => (
                  <button
                    key={u}
                    onClick={() => toggleUsage(u)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      profile.primaryUsage?.includes(u)
                        ? 'bg-teal-500 text-white border-teal-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{T('lifestyleTags')}</h3>
            <div className="flex flex-wrap gap-2">
              {lifestyleTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleLifestyle(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    profile.lifestyleTags?.includes(tag)
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Frequently used features */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{T('frequentlyUsedFeatures')}</h3>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    profile.frequentlyUsedFeatures?.includes(f)
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-3">{T('interests')}</h3>
            <div className="space-y-3">
              <InterestSlider label={T('safety')} key="safety" value={profile.interests?.safety || 3} />
              <InterestSlider label={T('comfort')} key="comfort" value={profile.interests?.comfort || 3} />
              <InterestSlider label={T('convenience')} key="convenience" value={profile.interests?.convenience || 3} />
              <InterestSlider label={T('outdoor')} key="outdoor" value={profile.interests?.outdoor || 3} />
              <InterestSlider label={T('cleanliness')} key="cleanliness" value={profile.interests?.cleanliness || 3} />
              {profile.vehicle === 'bz4x' && (
                <InterestSlider label={T('evUsability')} key="evUsability" value={profile.interests?.evUsability || 3} />
              )}
            </div>
          </div>

          {/* EV specific */}
          {profile.vehicle === 'bz4x' && (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <h3 className="font-semibold text-teal-800 mb-3">⚡ EV</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-teal-700">{T('homeCharging')}</label>
                  <button
                    onClick={() => setLocalProfile(prev => ({ ...prev, homeCharging: !prev.homeCharging }))}
                    className={`relative w-10 h-6 rounded-full transition-colors ${profile.homeCharging ? 'bg-teal-500' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${profile.homeCharging ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div>
                  <label className="text-sm text-teal-700 mb-1 block">{T('chargingSessions')}</label>
                  <input
                    type="number"
                    min={0}
                    max={14}
                    value={profile.chargingSessionsPerWeek || ''}
                    onChange={e => setLocalProfile(prev => ({ ...prev, chargingSessionsPerWeek: parseInt(e.target.value) || undefined }))}
                    className="w-24 border border-teal-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-teal-400 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-teal-700 mb-1 block">{T('cableUsage')}</label>
                  <select
                    value={profile.cableUsageFrequency || ''}
                    onChange={e => setLocalProfile(prev => ({ ...prev, cableUsageFrequency: e.target.value as any }))}
                    className="border border-teal-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-teal-400 bg-white"
                  >
                    <option value="">-</option>
                    <option value="low">{language === 'ja' ? '低' : 'Low'}</option>
                    <option value="medium">{language === 'ja' ? '中' : 'Medium'}</option>
                    <option value="high">{language === 'ja' ? '高' : 'High'}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Dealer Notes */}
          <div>
            <h3 className="font-semibold text-navy-900 mb-2">{T('dealerNotes')}</h3>
            <textarea
              value={profile.dealerNotes || ''}
              onChange={e => setLocalProfile(prev => ({ ...prev, dealerNotes: e.target.value }))}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none"
              placeholder={language === 'ja' 
                ? '例：冬の朝の車内が寒いのが困る、週末に子どもとキャンプに行く、充電ケーブルの収納が面倒...'
                : 'e.g., Struggles with cold cabin on winter mornings, goes camping with kids on weekends, cable storage is a hassle...'}
            />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !profile.vehicle}
            className="w-full btn-teal py-3 text-base font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                {T('generating')}
              </>
            ) : (
              <>
                <Zap size={18} />
                {T('generate')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
