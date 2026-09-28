import { MemoryItem, AgentRecommendation } from '../types';

export interface SystemStatus {
  status: string;
  geminiConfigured: boolean;
  hindsightConfigured: boolean;
  hindsightBankId: string | null;
  memoryCount: number;
}

export const apiService = {
  async getStatus(): Promise<SystemStatus> {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API status fetch failed, using local mock status', e);
    }
    return {
      status: 'online',
      geminiConfigured: false,
      hindsightConfigured: false,
      hindsightBankId: null,
      memoryCount: 2
    };
  },

  async getMemories(): Promise<{ memories: MemoryItem[]; source: 'hindsight' | 'demo_memory' }> {
    try {
      const res = await fetch('/api/memory/list');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('getMemories failed', e);
    }
    return {
      memories: [
        {
          id: 'mem-seed-1',
          text: 'Desk accessories with high return rates (>8%) on marketplace channels require stricter quality checks on hinges and packaging.',
          category: 'returns',
          entity: 'Category Baseline',
          outcome: 'insight',
          timestamp: new Date().toISOString(),
          confidence: 0.92,
          source: 'demo_memory'
        }
      ],
      source: 'demo_memory'
    };
  },

  async retainMemory(data: {
    text: string;
    category?: MemoryItem['category'];
    entity?: string;
    outcome?: MemoryItem['outcome'];
    budgetConstraint?: number;
  }): Promise<{ success: boolean; memory: MemoryItem; source: 'hindsight' | 'demo_memory' }> {
    try {
      const res = await fetch('/api/memory/retain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('retainMemory failed', e);
    }
    const fallbackMem: MemoryItem = {
      id: `mem-local-${Date.now()}`,
      text: data.text,
      category: data.category || 'general',
      entity: data.entity,
      outcome: data.outcome || 'insight',
      timestamp: new Date().toISOString(),
      budgetConstraint: data.budgetConstraint,
      confidence: 0.95,
      source: 'demo_memory'
    };
    return { success: true, memory: fallbackMem, source: 'demo_memory' };
  },

  async recallMemories(query?: string, entity?: string): Promise<{ matches: MemoryItem[]; source: 'hindsight' | 'demo_memory' }> {
    try {
      const res = await fetch('/api/memory/recall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, entity })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('recallMemories failed', e);
    }
    return { matches: [], source: 'demo_memory' };
  },

  async reflectMemories(): Promise<{ reflections: string[]; totalMemoriesAnalyzed: number; source: 'hindsight' | 'demo_memory' }> {
    try {
      const res = await fetch('/api/memory/reflect', { method: 'POST' });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('reflectMemories failed', e);
    }
    return {
      reflections: [
        'Capital preservation for budgets under ₹50,000 mandates low MOQ (<100 units) to maintain launch ad velocity.',
        'Provider fulfillment (FBA/FBF) captures 3.8x higher buy-box share over self-fulfilled merchant orders.'
      ],
      totalMemoriesAnalyzed: 2,
      source: 'demo_memory'
    };
  },

  async resetMemories(): Promise<boolean> {
    try {
      const res = await fetch('/api/memory/reset', { method: 'POST' });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async askAgent(goal: string, budget: number = 50000, supplierUnderEval?: string): Promise<{
    agentResponse: AgentRecommendation;
    memorySource: 'hindsight' | 'demo_memory';
    aiProvider: string;
  }> {
    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, budget, supplierUnderEval })
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.warn('askAgent failed, returning client fallback', e);
    }

    return {
      agentResponse: {
        goal: goal || 'Find a profitable product I can sell with ₹50,000',
        constraints: [
          `Starting Working Capital: ₹${budget.toLocaleString('en-IN')}`,
          'Turnaround Cycle: < 30 days',
          'Target Net Margin: > 30%'
        ],
        dataConsidered: [
          'MarketIQ: 48,500 monthly search units',
          'Supplier B unit cost ₹320 with MOQ 100',
          'Platform fees 12.5% + FBA fulfillment ₹65'
        ],
        relevantPreviousMemory: 'Recalled supplier MOQ budget constraint baseline.',
        recommendation: 'Procure 100 units of Ergonomic Aluminum Laptop Stand from Supplier B (ErgoPro Crafts Ltd) at ₹320/unit. Launch on Amazon and Flipkart using Provider Fulfillment.',
        costImpact: {
          inventoryProcurement: 32000,
          packagingAndPrep: 3500,
          initialAdSpend: 8000,
          operatingBuffer: 6500,
          totalAllocated: 50000
        },
        expectedRevenue: 109900,
        expectedProfit: 38400,
        risks: [
          'Return provision estimated at 5.8%',
          'Supplier 7-day transit SLA verification needed'
        ],
        uncertainty: 'Low-to-Medium',
        nextAction: 'Authorize purchase order in Praxis Approval Center',
        approvalRequired: true
      },
      memorySource: 'demo_memory',
      aiProvider: 'emporx-deterministic-agent'
    };
  }
};
