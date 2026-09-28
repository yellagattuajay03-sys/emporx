import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductOpportunity,
  Supplier,
  ChannelComparison,
  Order,
  ReturnRecord,
  AdCampaign,
  BusinessDecision,
  ApprovalRequest,
  InventoryItem,
  CostStructure,
  MemoryItem,
  AgentRecommendation,
  MemorySource,
  OrderStatus
} from '../types';
import {
  INITIAL_BUDGET,
  DEMO_PRODUCTS,
  DEMO_SUPPLIERS,
  DEMO_CHANNELS,
  INITIAL_COST_STRUCTURE,
  INITIAL_INVENTORY,
  INITIAL_ORDERS,
  INITIAL_RETURNS,
  INITIAL_CAMPAIGNS,
  INITIAL_DECISIONS,
  INITIAL_APPROVALS
} from '../data/demoData';
import { apiService, SystemStatus } from '../services/apiService';

export type NavigationSection =
  | 'dashboard'
  | 'agent'
  | 'marketiq'
  | 'demandx'
  | 'prodiq'
  | 'sourcex'
  | 'costiq'
  | 'channelx'
  | 'fulfillment'
  | 'pricing'
  | 'catalog'
  | 'commercex'
  | 'orders'
  | 'returns'
  | 'growth'
  | 'analytics'
  | 'decisions'
  | 'approvals'
  | 'memory'
  | 'settings';

interface CommerceContextType {
  currentSection: NavigationSection;
  setCurrentSection: (section: NavigationSection) => void;
  budget: number;
  setBudget: (val: number) => void;
  products: ProductOpportunity[];
  selectedProduct: ProductOpportunity;
  setSelectedProduct: (p: ProductOpportunity) => void;
  suppliers: Supplier[];
  selectedSupplier: Supplier;
  setSelectedSupplier: (s: Supplier) => void;
  costStructure: CostStructure;
  updateSellingPrice: (price: number) => void;
  updateCostItem: (key: keyof CostStructure, val: number) => void;
  channels: ChannelComparison[];
  selectedChannelId: string;
  setSelectedChannelId: (id: string) => void;
  orders: Order[];
  advanceOrderStatus: (orderId: string) => void;
  simulateNewOrder: () => Order;
  returns: ReturnRecord[];
  simulateReturn: (orderId?: string) => ReturnRecord | null;
  inventory: InventoryItem[];
  campaigns: AdCampaign[];
  toggleCampaignStatus: (id: string) => void;
  decisions: BusinessDecision[];
  approvals: ApprovalRequest[];
  handleApproval: (id: string, action: 'approved' | 'rejected', notes?: string) => void;
  memories: MemoryItem[];
  memorySource: MemorySource;
  systemStatus: SystemStatus;
  refreshMemories: () => Promise<void>;
  retainMemory: (text: string, category?: MemoryItem['category'], entity?: string, outcome?: MemoryItem['outcome']) => Promise<void>;
  // AI Agent
  agentGoal: string;
  setAgentGoal: (g: string) => void;
  agentRecommendation: AgentRecommendation | null;
  isAgentThinking: boolean;
  runAgentAnalysis: (customGoal?: string, targetSupplier?: string) => Promise<AgentRecommendation>;
  // Demo Mode Flow
  demoStep: number;
  setDemoStep: (step: number) => void;
  demoLogs: string[];
  isDemoRunning: boolean;
  isDemoModalOpen: boolean;
  closeDemoModal: () => void;
  runFullBusinessDemo: () => Promise<void>;
  evaluateSupplierADemo: () => Promise<{ rejected: boolean; recalledMemory?: string }>;
  resetAllData: () => Promise<void>;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('dashboard');
  const [budget, setBudget] = useState<number>(INITIAL_BUDGET);
  const [products] = useState<ProductOpportunity[]>(DEMO_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<ProductOpportunity>(DEMO_PRODUCTS[0]);
  const [suppliers, setSuppliers] = useState<Supplier[]>(DEMO_SUPPLIERS);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>(DEMO_SUPPLIERS[1]); // Supplier B
  const [costStructure, setCostStructure] = useState<CostStructure>(INITIAL_COST_STRUCTURE);
  const [channels] = useState<ChannelComparison[]>(DEMO_CHANNELS);
  const [selectedChannelId, setSelectedChannelId] = useState<string>('amazon');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [returns, setReturns] = useState<ReturnRecord[]>(INITIAL_RETURNS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_CAMPAIGNS);
  const [decisions, setDecisions] = useState<BusinessDecision[]>(INITIAL_DECISIONS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [memorySource, setMemorySource] = useState<MemorySource>('demo_memory');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'online',
    geminiConfigured: false,
    hindsightConfigured: false,
    hindsightBankId: null,
    memoryCount: 2
  });

  const [agentGoal, setAgentGoal] = useState<string>('Find a profitable product I can sell with ₹50,000.');
  const [agentRecommendation, setAgentRecommendation] = useState<AgentRecommendation | null>(null);
  const [isAgentThinking, setIsAgentThinking] = useState<boolean>(false);

  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  // Load status and memories on mount
  useEffect(() => {
    async function init() {
      const status = await apiService.getStatus();
      setSystemStatus(status);
      const memRes = await apiService.getMemories();
      setMemories(memRes.memories);
      setMemorySource(memRes.source);
    }
    init();
  }, []);

  const refreshMemories = async () => {
    const memRes = await apiService.getMemories();
    setMemories(memRes.memories);
    setMemorySource(memRes.source);
  };

  const retainMemory = async (
    text: string,
    category: MemoryItem['category'] = 'general',
    entity?: string,
    outcome: MemoryItem['outcome'] = 'insight'
  ) => {
    const res = await apiService.retainMemory({
      text,
      category,
      entity,
      outcome,
      budgetConstraint: budget
    });
    setMemories(prev => [res.memory, ...prev.filter(m => m.id !== res.memory.id)]);
    setMemorySource(res.source);
  };

  const updateSellingPrice = (newPrice: number) => {
    setCostStructure(prev => {
      const marketplaceFee = Number((newPrice * 0.125).toFixed(2));
      const totalCost = Number(
        (
          prev.productCost +
          prev.shipping +
          prev.packaging +
          marketplaceFee +
          prev.fulfillmentFee +
          prev.advertisingCAC +
          prev.returnCostProvision
        ).toFixed(2)
      );
      const profit = Number((newPrice - totalCost).toFixed(2));
      const profitMargin = Number(((profit / newPrice) * 100).toFixed(2));
      const breakEvenUnits = Math.ceil(3500 / Math.max(1, profit));

      return {
        ...prev,
        sellingPrice: newPrice,
        marketplaceFee,
        totalCost,
        profit,
        profitMargin,
        breakEvenUnits
      };
    });
  };

  const updateCostItem = (key: keyof CostStructure, val: number) => {
    setCostStructure(prev => {
      const updated = { ...prev, [key]: val };
      const totalCost = Number(
        (
          (key === 'productCost' ? val : prev.productCost) +
          (key === 'shipping' ? val : prev.shipping) +
          (key === 'packaging' ? val : prev.packaging) +
          (key === 'marketplaceFee' ? val : prev.marketplaceFee) +
          (key === 'fulfillmentFee' ? val : prev.fulfillmentFee) +
          (key === 'advertisingCAC' ? val : prev.advertisingCAC) +
          (key === 'returnCostProvision' ? val : prev.returnCostProvision)
        ).toFixed(2)
      );
      const profit = Number((prev.sellingPrice - totalCost).toFixed(2));
      const profitMargin = Number(((profit / prev.sellingPrice) * 100).toFixed(2));
      return {
        ...updated,
        totalCost,
        profit,
        profitMargin
      };
    });
  };

  const advanceOrderStatus = (orderId: string) => {
    const statusCycle: OrderStatus[] = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const currentIndex = statusCycle.indexOf(ord.status);
          if (currentIndex !== -1 && currentIndex < statusCycle.length - 1) {
            const nextStatus = statusCycle[currentIndex + 1];
            // If shipped, decrement inStock inventory
            if (nextStatus === 'shipped') {
              setInventory(invList =>
                invList.map(inv =>
                  inv.sku === 'EXP-LPSTND-ALUM-01'
                    ? { ...inv, inStock: Math.max(0, inv.inStock - ord.quantity), reserved: Math.max(0, inv.reserved - ord.quantity) }
                    : inv
                )
              );
            }
            return { ...ord, status: nextStatus };
          }
        }
        return ord;
      })
    );
  };

  const simulateNewOrder = (): Order => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const cities = ['Delhi, DL', 'Bengaluru, KA', 'Mumbai, MH', 'Chennai, TN', 'Kolkata, WB', 'Pune, MH'];
    const names = ['Kavita Rao', 'Arjun Kapoor', 'Siddharth Verma', 'Deepa Nair', 'Manish Tiwari'];
    const channelsList: ChannelComparison['id'][] = ['amazon', 'flipkart', 'direct'];
    const chosenChannel = channelsList[Math.floor(Math.random() * channelsList.length)];
    const chosenCity = cities[Math.floor(Math.random() * cities.length)];
    const chosenName = names[Math.floor(Math.random() * names.length)];

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `EMP-${randomId}`,
      customerName: chosenName,
      customerCity: chosenCity,
      productName: selectedProduct.name,
      quantity: 1,
      unitPrice: costStructure.sellingPrice,
      totalAmount: costStructure.sellingPrice,
      status: 'placed',
      channel: chosenChannel,
      fulfillment: chosenChannel === 'direct' ? 'seller_fulfilled' : 'provider_fulfilled',
      orderDate: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Reserve 1 item in inventory
    setInventory(prev =>
      prev.map(inv =>
        inv.sku === 'EXP-LPSTND-ALUM-01' ? { ...inv, reserved: inv.reserved + 1 } : inv
      )
    );

    return newOrder;
  };

  const simulateReturn = (orderId?: string): ReturnRecord | null => {
    // Find delivered order
    let targetOrder = orders.find(o => (orderId ? o.id === orderId : o.status === 'delivered'));
    if (!targetOrder) {
      // If no delivered order, pick the first order and set it to delivered then return
      if (orders.length > 0) {
        targetOrder = orders[0];
      } else {
        return null;
      }
    }

    const newReturn: ReturnRecord = {
      id: `ret-${Date.now()}`,
      orderId: targetOrder.id,
      orderNumber: targetOrder.orderNumber,
      productName: targetOrder.productName,
      reason: 'Customer reported desk clearance dimension mismatch with 17-inch laptop',
      refundAmount: targetOrder.totalAmount,
      returnShippingCost: 65,
      inventoryRestockable: true,
      netLossOnReturn: 142, // reverse logistics + restocking fee
      timestamp: new Date().toISOString()
    };

    setReturns(prev => [newReturn, ...prev]);

    // Update order status to returned
    setOrders(prev =>
      prev.map(o => (o.id === targetOrder!.id ? { ...o, status: 'returned', returnReason: newReturn.reason, refundAmount: newReturn.refundAmount } : o))
    );

    // If restockable, return unit to stock
    setInventory(prev =>
      prev.map(inv =>
        inv.sku === 'EXP-LPSTND-ALUM-01' ? { ...inv, inStock: inv.inStock + 1 } : inv
      )
    );

    // Log decision / memory learning
    retainMemory(
      `Return logged on order ${targetOrder.orderNumber}: Reason '${newReturn.reason}'. Suggest adding high-visibility dimension infographic to listing to lower return rate.`,
      'returns',
      targetOrder.productName,
      'warning'
    );

    return newReturn;
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c))
    );
  };

  const handleApproval = (id: string, action: 'approved' | 'rejected', notes?: string) => {
    setApprovals(prev =>
      prev.map(appr => (appr.id === id ? { ...appr, status: action, notes } : appr))
    );

    const target = approvals.find(a => a.id === id);
    if (target) {
      const newDecision: BusinessDecision = {
        id: `dec-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `Human ${action.toUpperCase()}: ${target.title}`,
        module: 'Praxis Approval',
        decision: `Human operator ${action} request with notes: "${notes || 'Authorized as planned'}"`,
        reason: target.description,
        dataUsed: Object.entries(target.dataSummary).map(([k, v]) => `${k}: ${v}`),
        expectedImpact: `Financial allocation: ₹${target.financialImpact.toLocaleString('en-IN')}`,
        risk: 'low',
        approvalStatus: action === 'approved' ? 'approved' : 'declined',
        requiresHumanApproval: true
      };
      setDecisions(prev => [newDecision, ...prev]);

      retainMemory(
        `Praxis Governance: ${action.toUpperCase()} action on "${target.title}" (Amount: ₹${target.financialImpact}). Notes: ${notes || 'Proceeding.'}`,
        'general',
        'Praxis Human Gate',
        action === 'approved' ? 'accepted' : 'rejected'
      );
    }
  };

  const runAgentAnalysis = async (customGoal?: string, targetSupplier?: string): Promise<AgentRecommendation> => {
    setIsAgentThinking(true);
    const goalToRun = customGoal || agentGoal;
    try {
      const res = await apiService.askAgent(goalToRun, budget, targetSupplier);
      setAgentRecommendation(res.agentResponse);
      setMemorySource(res.memorySource);
      return res.agentResponse;
    } finally {
      setIsAgentThinking(false);
    }
  };

  // Evaluate Supplier A demo logic specifically requested in prompt:
  // "First run: EmporX evaluates Supplier A and rejects it because MOQ is too high. Store this as a memory.
  // Second run: EmporX evaluates Supplier A again. Recall the previous memory and show:
  // 'Previous experience: Supplier A was rejected because its MOQ exceeded the available starting budget.'
  // Then use that information in the new recommendation."
  const evaluateSupplierADemo = async (): Promise<{ rejected: boolean; recalledMemory?: string }> => {
    // Check if memory already contains rejection for Supplier A
    const existingReject = memories.find(m => m.entity === 'Supplier A' && m.outcome === 'rejected');

    if (!existingReject) {
      // Run 1: First evaluation
      const rejectionReason = 'Supplier A (ApexTech Industrial Corp) rejected: MOQ 500 units requires ₹1,40,000 capital, which exceeds the available starting budget of ₹50,000 by ₹90,000.';
      await retainMemory(
        rejectionReason,
        'supplier',
        'Supplier A',
        'rejected'
      );

      // Record in decisions
      const newDec: BusinessDecision = {
        id: `dec-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: 'Supplier A Disqualification (Working Capital Violation)',
        module: 'SourceX',
        decision: 'Rejected Supplier A due to excessive MOQ (500 units @ ₹280 = ₹1,40,000).',
        reason: 'Current capital ceiling ₹50,000 cannot sustain 500 units upfront order without debt.',
        dataUsed: ['Budget: ₹50,000', 'Supplier A MOQ: 500 units', 'Required outlay: ₹1,40,000'],
        expectedImpact: 'Prevented liquidity insolvency. Retained memory for future procurement cycles.',
        risk: 'high',
        approvalStatus: 'executed',
        requiresHumanApproval: true
      };
      setDecisions(prev => [newDec, ...prev]);

      return {
        rejected: true,
        recalledMemory: undefined
      };
    } else {
      // Run 2: Re-evaluating Supplier A -> recalls memory!
      const recalled = existingReject.text;
      return {
        rejected: true,
        recalledMemory: `Previous experience: Supplier A was rejected because its MOQ exceeded the available starting budget (₹50,000).`
      };
    }
  };

  // Complete End-to-End Demo
  const runFullBusinessDemo = async () => {
    setIsDemoRunning(true);
    setIsDemoModalOpen(true);
    setDemoLogs([]);
    const addLog = (msg: string) => {
      setDemoLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    try {
      addLog('Initiating EmporX Autonomous Business Lifecycle...');
      setDemoStep(1); // Research
      addLog('Step 1/9: MarketIQ & DemandX — Scanning category data for ₹50,000 starting budget...');
      await new Promise(r => setTimeout(r, 900));

      setDemoStep(2); // Sourcing & Memory Check
      addLog('Step 2/9: SourceX — Evaluating Supplier A (MOQ 500 @ ₹280 = ₹1,40,000)...');
      await evaluateSupplierADemo();
      addLog('Memory Trigger: Supplier A rejected (MOQ ₹1,40,000 > ₹50,000 budget). Stored in Hindsight memory.');
      await new Promise(r => setTimeout(r, 900));

      addLog('SourceX — Automatically switching to Supplier B (ErgoPro Crafts: MOQ 100 units = ₹32,000). Fits budget!');
      setSelectedSupplier(DEMO_SUPPLIERS[1]);
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(3); // CostIQ
      addLog('Step 3/9: CostIQ — Calculating unit economics: Landed ₹355, Platform fee ₹137, Net margin 31.8%.');
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(4); // Channel & Fulfillment
      addLog('Step 4/9: ChannelX & Fulfillment — Selecting Amazon FBA & Flipkart FBF for automated Prime delivery.');
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(5); // PriceX & CatalogX
      addLog('Step 5/9: PriceX & CatalogX — Recommending price ₹1,099. Generating SEO-optimized catalog listing.');
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(6); // Praxis Human Approval
      addLog('Step 6/9: Praxis Governance — Verified pending human approval for initial 100-unit PO.');
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(7); // Simulate Order
      addLog('Step 7/9: CommerceX & Orders — Simulating live customer purchase order via Amazon FBA...');
      const createdOrd = simulateNewOrder();
      addLog(`Order #${createdOrd.orderNumber} placed by ${createdOrd.customerName} (${createdOrd.customerCity})!`);
      await new Promise(r => setTimeout(r, 900));

      advanceOrderStatus(createdOrd.id);
      addLog(`Order #${createdOrd.orderNumber} transitioned to Confirmed → Packed.`);
      await new Promise(r => setTimeout(r, 700));

      advanceOrderStatus(createdOrd.id);
      addLog(`Order #${createdOrd.orderNumber} dispatched via FBA Express.`);
      await new Promise(r => setTimeout(r, 700));

      setDemoStep(8); // Simulate Return
      addLog('Step 8/9: Returns & Reverse Logistics — Simulating customer return and testing profit impact...');
      const ret = simulateReturn(createdOrd.id);
      if (ret) {
        addLog(`Return recorded: Refund ₹${ret.refundAmount}, reverse shipping ₹${ret.returnShippingCost}. Item restocked.`);
      }
      await new Promise(r => setTimeout(r, 800));

      setDemoStep(9); // Reflect & Adapt
      addLog('Step 9/9: Hindsight Adaptive Learning — Synthesizing business experience into updated AI recommendation.');
      await runAgentAnalysis('Find a profitable product I can sell with ₹50,000.', 'Supplier A');
      addLog('EmporX Core Business Loop completed successfully! Memory retained and adaptation verified.');
    } finally {
      setIsDemoRunning(false);
    }
  };

  const resetAllData = async () => {
    setBudget(INITIAL_BUDGET);
    setSelectedProduct(DEMO_PRODUCTS[0]);
    setSuppliers(DEMO_SUPPLIERS);
    setSelectedSupplier(DEMO_SUPPLIERS[1]);
    setCostStructure(INITIAL_COST_STRUCTURE);
    setOrders(INITIAL_ORDERS);
    setReturns(INITIAL_RETURNS);
    setInventory(INITIAL_INVENTORY);
    setCampaigns(INITIAL_CAMPAIGNS);
    setDecisions(INITIAL_DECISIONS);
    setApprovals(INITIAL_APPROVALS);
    setAgentRecommendation(null);
    setDemoStep(0);
    setDemoLogs([]);
    await apiService.resetMemories();
    await refreshMemories();
  };

  return (
    <CommerceContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        budget,
        setBudget,
        products,
        selectedProduct,
        setSelectedProduct,
        suppliers,
        selectedSupplier,
        setSelectedSupplier,
        costStructure,
        updateSellingPrice,
        updateCostItem,
        channels,
        selectedChannelId,
        setSelectedChannelId,
        orders,
        advanceOrderStatus,
        simulateNewOrder,
        returns,
        simulateReturn,
        inventory,
        campaigns,
        toggleCampaignStatus,
        decisions,
        approvals,
        handleApproval,
        memories,
        memorySource,
        systemStatus,
        refreshMemories,
        retainMemory,
        agentGoal,
        setAgentGoal,
        agentRecommendation,
        isAgentThinking,
        runAgentAnalysis,
        demoStep,
        setDemoStep,
        demoLogs,
        isDemoRunning,
        isDemoModalOpen,
        closeDemoModal,
        runFullBusinessDemo,
        evaluateSupplierADemo,
        resetAllData
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = (): CommerceContextType => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
