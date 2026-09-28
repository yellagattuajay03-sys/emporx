export type ChannelType = 'amazon' | 'flipkart' | 'direct' | 'meesho';
export type FulfillmentType = 'seller_fulfilled' | 'provider_fulfilled';
export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'returned';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type DecisionStatus = 'proposed' | 'approved' | 'executed' | 'declined';
export type MemorySource = 'hindsight' | 'demo_memory';

export interface ProductOpportunity {
  id: string;
  name: string;
  category: string;
  monthlyDemand: number;
  averageSellingPrice: number;
  competitorCount: number;
  marketSizeInCrores: number;
  growthYoY: number;
  opportunityScore: number;
  seasonality: string;
  demandConfidence: number;
  suggestedSellingPrice: number;
  estimatedNetMargin: number;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  unitCost: number;
  moq: number;
  shippingCostPerUnit: number;
  leadTimeDays: number;
  rating: number;
  reliabilityScore: number;
  certifications: string[];
  totalLandedCost: number;
  notes: string;
  capitalRequired: number;
  exceedsBudget?: boolean;
}

export interface CostStructure {
  productCost: number;
  shipping: number;
  packaging: number;
  marketplaceFee: number;
  fulfillmentFee: number;
  advertisingCAC: number;
  returnCostProvision: number;
  totalCost: number;
  sellingPrice: number;
  profit: number;
  profitMargin: number;
  breakEvenUnits: number;
}

export interface ChannelComparison {
  id: ChannelType;
  name: string;
  platformFeePercent: number;
  estimatedReach: string;
  fulfillmentOptions: string[];
  estimatedProfitPerUnit: number;
  netMarginPercent: number;
  keyRisks: string[];
  payoutCycleDays: number;
  bestFor: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerCity: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: OrderStatus;
  channel: ChannelType;
  fulfillment: FulfillmentType;
  orderDate: string;
  trackingNumber?: string;
  returnReason?: string;
  refundAmount?: number;
}

export interface ReturnRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  productName: string;
  reason: string;
  refundAmount: number;
  returnShippingCost: number;
  inventoryRestockable: boolean;
  netLossOnReturn: number;
  timestamp: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  channel: string;
  status: 'active' | 'paused';
  dailyBudget: number;
  adSpend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  conversions: number;
  cac: number;
  attributedRevenue: number;
  roas: number;
}

export interface BusinessDecision {
  id: string;
  timestamp: string;
  title: string;
  module: string;
  decision: string;
  reason: string;
  dataUsed: string[];
  expectedImpact: string;
  risk: 'low' | 'medium' | 'high';
  approvalStatus: DecisionStatus;
  requiresHumanApproval: boolean;
}

export interface ApprovalRequest {
  id: string;
  timestamp: string;
  type: 'inventory_purchase' | 'listing_publish' | 'price_change' | 'ad_spend' | 'marketplace_action';
  title: string;
  description: string;
  financialImpact: number;
  status: ApprovalStatus;
  requestedBy: string;
  notes?: string;
  dataSummary: Record<string, any>;
}

export interface MemoryItem {
  id: string;
  text: string;
  category: 'supplier' | 'channel' | 'pricing' | 'returns' | 'fulfillment' | 'general';
  entity?: string;
  outcome: 'rejected' | 'accepted' | 'warning' | 'insight';
  timestamp: string;
  budgetConstraint?: number;
  confidence: number;
  source: MemorySource;
}

export interface AgentRecommendation {
  goal: string;
  constraints: string[];
  dataConsidered: string[];
  relevantPreviousMemory: string;
  recommendation: string;
  costImpact: {
    inventoryProcurement: number;
    packagingAndPrep: number;
    initialAdSpend: number;
    operatingBuffer: number;
    totalAllocated: number;
  };
  expectedRevenue: number;
  expectedProfit: number;
  risks: string[];
  uncertainty: string;
  nextAction: string;
  approvalRequired: boolean;
}

export interface InventoryItem {
  sku: string;
  productName: string;
  inStock: number;
  reserved: number;
  inTransit: number;
  reorderPoint: number;
  unitLandedCost: number;
  sellingPrice: number;
  location: string;
}
