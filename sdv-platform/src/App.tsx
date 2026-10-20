import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DealerHomePage } from './pages/dealer/DealerHomePage';
import { DealerLearnPage } from './pages/dealer/DealerLearnPage';
import { DealerSalesPage } from './pages/dealer/DealerSalesPage';
import { DealerSalesResultsPage } from './pages/dealer/DealerSalesResultsPage';
import { CustomerRecommendationPage } from './pages/customer/CustomerRecommendationPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminSourcesPage } from './pages/admin/AdminSourcesPage';
import { AdminPipelinePage } from './pages/admin/AdminPipelinePage';
import { AdminKnowledgePage } from './pages/admin/AdminKnowledgePage';
import { AdminAIControlPage } from './pages/admin/AdminAIControlPage';
import { AdminPromptTestPage } from './pages/admin/AdminPromptTestPage';
import { AdminLogsPage } from './pages/admin/AdminLogsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminInsightsPage } from './pages/admin/AdminInsightsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Dealer */}
          <Route path="/dealer" element={<DealerHomePage />} />
          <Route path="/dealer/products" element={<DealerHomePage />} />
          <Route path="/dealer/learn/:productId" element={<DealerLearnPage />} />
          <Route path="/dealer/sales" element={<DealerSalesPage />} />
          <Route path="/dealer/sales/results" element={<DealerSalesResultsPage />} />
          
          {/* Customer */}
          <Route path="/customer" element={<CustomerRecommendationPage />} />
          <Route path="/customer/recommendation/:sessionId" element={<CustomerRecommendationPage />} />
          
          {/* Admin */}
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/sources" element={<AdminSourcesPage />} />
          <Route path="/admin/pipeline/:sourceId" element={<AdminPipelinePage />} />
          <Route path="/admin/knowledge" element={<AdminKnowledgePage />} />
          <Route path="/admin/ai-control" element={<AdminAIControlPage />} />
          <Route path="/admin/prompt-test" element={<AdminPromptTestPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/insights" element={<AdminInsightsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
