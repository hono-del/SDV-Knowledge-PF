import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import type { Language, Market, Region, JapanRegion, NAState } from '../../types';
import { Globe, RefreshCw, ChevronDown } from 'lucide-react';

const japanRegions: { value: JapanRegion; label: string }[] = [
  { value: 'tokyo', label: 'Tokyo / 東京' },
  { value: 'hokkaido', label: 'Hokkaido / 北海道' },
  { value: 'nagano', label: 'Nagano / 長野' },
  { value: 'okinawa', label: 'Okinawa / 沖縄' },
];

const naStates: { value: NAState; label: string }[] = [
  { value: 'california', label: 'California' },
  { value: 'texas', label: 'Texas' },
  { value: 'washington', label: 'Washington' },
  { value: 'minnesota', label: 'Minnesota' },
  { value: 'colorado', label: 'Colorado' },
  { value: 'new-york', label: 'New York' },
];

export const Header: React.FC = () => {
  const { language, market, region, setLanguage, setMarket, setRegion, resetDemo } = useAppStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const handleMarketChange = (m: Market) => {
    setMarket(m);
    if (m === 'japan') setRegion('tokyo');
    else setRegion('washington');
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetDemo();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  const regions = market === 'japan' ? japanRegions : naStates;
  const regionLabel = regions.find(r => r.value === region)?.label || T('state');

  return (
    <header className="bg-navy-900 text-white h-14 flex items-center px-6 gap-4 sticky top-0 z-50 shadow-lg">
      <a href="/" className="font-bold text-base tracking-tight mr-4 hover:text-teal-300 transition-colors whitespace-nowrap">
        KEP
      </a>
      
      <div className="flex-1" />
      
      {/* Language */}
      <div className="flex items-center gap-1 bg-navy-800 rounded-lg p-0.5">
        <button
          onClick={() => setLanguage('ja')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === 'ja' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          日本語
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === 'en' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          EN
        </button>
      </div>
      
      {/* Market */}
      <div className="flex items-center gap-1 bg-navy-800 rounded-lg p-0.5">
        <button
          onClick={() => handleMarketChange('japan')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${market === 'japan' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          {T('japan')}
        </button>
        <button
          onClick={() => handleMarketChange('north-america')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${market === 'north-america' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          {T('northAmerica')}
        </button>
      </div>
      
      {/* Region selector */}
      <div className="relative">
        <div className="flex items-center gap-1 bg-navy-800 rounded-lg px-3 py-1.5 text-sm text-gray-300">
          <Globe size={14} />
          <select
            value={region || ''}
            onChange={e => setRegion(e.target.value as Region)}
            className="bg-transparent text-gray-300 text-sm outline-none cursor-pointer"
          >
            {regions.map(r => (
              <option key={r.value} value={r.value} className="bg-navy-900 text-white">
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Reset */}
      <button
        onClick={handleReset}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          showResetConfirm 
            ? 'bg-red-600 text-white' 
            : 'bg-navy-800 text-gray-300 hover:bg-navy-700 hover:text-white'
        }`}
      >
        <RefreshCw size={14} />
        {showResetConfirm ? (language === 'ja' ? '確認？' : 'Confirm?') : T('resetDemo')}
      </button>
    </header>
  );
};
