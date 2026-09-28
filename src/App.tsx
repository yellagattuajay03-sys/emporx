import React from 'react';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { DemoRunnerModal } from './components/common/DemoRunnerModal';

import { DashboardView } from './components/views/DashboardView';
import { AgentView } from './components/views/AgentView';
import { MarketIQView } from './components/views/MarketIQView';
import { DemandXView } from './components/views/DemandXView';
import { ProdIQView } from './components/views/ProdIQView';
import { SourceXView } from './components/views/SourceXView';
import { CostIQView } from './components/views/CostIQView';
import { ChannelXView } from './components/views/ChannelXView';
import { FulfillmentView } from './components/views/FulfillmentView';
import { PricingView } from './components/views/PricingView';
import { CatalogView } from './components/views/CatalogView';
import { CommerceXView } from './components/views/CommerceXView';
import { OrdersView } from './components/views/OrdersView';
import { ReturnsView } from './components/views/ReturnsView';
import { GrowthView } from './components/views/GrowthView';
import { RevOptView } from './components/views/RevOptView';
import { DecisionsView } from './components/views/DecisionsView';
import { PraxisView } from './components/views/PraxisView';
import { MemoryView } from './components/views/MemoryView';
import { SettingsView } from './components/views/SettingsView';

const MainContent: React.FC = () => {
  const { currentSection } = useCommerce();

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {currentSection === 'dashboard' && <DashboardView />}
        {currentSection === 'agent' && <AgentView />}
        {currentSection === 'marketiq' && <MarketIQView />}
        {currentSection === 'demandx' && <DemandXView />}
        {currentSection === 'prodiq' && <ProdIQView />}
        {currentSection === 'sourcex' && <SourceXView />}
        {currentSection === 'costiq' && <CostIQView />}
        {currentSection === 'channelx' && <ChannelXView />}
        {currentSection === 'fulfillment' && <FulfillmentView />}
        {currentSection === 'pricing' && <PricingView />}
        {currentSection === 'catalog' && <CatalogView />}
        {currentSection === 'commercex' && <CommerceXView />}
        {currentSection === 'orders' && <OrdersView />}
        {currentSection === 'returns' && <ReturnsView />}
        {currentSection === 'growth' && <GrowthView />}
        {currentSection === 'analytics' && <RevOptView />}
        {currentSection === 'decisions' && <DecisionsView />}
        {currentSection === 'approvals' && <PraxisView />}
        {currentSection === 'memory' && <MemoryView />}
        {currentSection === 'settings' && <SettingsView />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 font-sans antialiased text-zinc-100">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar />
          <MainContent />
        </div>
        <DemoRunnerModal />
      </div>
    </CommerceProvider>
  );
}
