import React from 'react';
import { Header } from './Header';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useAppStore();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-navy-900 text-gray-400 text-xs py-4 px-6 text-center">
        <p className="max-w-4xl mx-auto">{T('footerDisclaimer')}</p>
      </footer>
    </div>
  );
};
