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
  CostStructure
} from '../types';

export const INITIAL_BUDGET = 50000;

export const DEMO_PRODUCTS: ProductOpportunity[] = [
  {
    id: 'prod-laptop-stand',
    name: 'Ergonomic Aluminum Laptop Stand',
    category: 'Computer Accessories',
    monthlyDemand: 48500,
    averageSellingPrice: 1199,
    competitorCount: 18,
    marketSizeInCrores: 64.5,
    growthYoY: 28.4,
    opportunityScore: 92,
    seasonality: 'Consistent year-round with Q4 Back-to-Office & Diwali spikes',
    demandConfidence: 89,
    suggestedSellingPrice: 1099,
    estimatedNetMargin: 31.8,
    description: 'Foldable 6-angle adjustable aluminum alloy riser with dual silicone protection pads for 10-15.6 inch laptops.'
  },
  {
    id: 'prod-wireless-mouse',
    name: 'Silent Multi-Device Wireless Mouse',
    category: 'Computer Peripherals',
    monthlyDemand: 62000,
    averageSellingPrice: 899,
    competitorCount: 34,
    marketSizeInCrores: 88.0,
    growthYoY: 14.2,
    opportunityScore: 78,
    seasonality: 'Steady consumer demand, price sensitivity high',
    demandConfidence: 82,
    suggestedSellingPrice: 799,
    estimatedNetMargin: 21.5,
    description: 'Rechargeable dual-mode 2.4G & Bluetooth 5.2 optical mouse with silent micro-switches.'
  },
  {
    id: 'prod-desk-organizer',
    name: 'Modular Bamboo Desk Organizer',
    category: 'Home & Office Storage',
    monthlyDemand: 22000,
    averageSellingPrice: 1299,
    competitorCount: 12,
    marketSizeInCrores: 28.2,
    growthYoY: 21.0,
    opportunityScore: 84,
    seasonality: 'Peaks during New Year & Q3 corporate gifting',
    demandConfidence: 86,
    suggestedSellingPrice: 1249,
    estimatedNetMargin: 35.2,
    description: 'Eco-friendly natural bamboo tiered organizer with pen slots, cable docks, and sliding utility drawer.'
  },
  {
    id: 'prod-led-lamp',
    name: 'Architect Smart LED Desk Lamp',
    category: 'Workspace Lighting',
    monthlyDemand: 31000,
    averageSellingPrice: 1899,
    competitorCount: 22,
    marketSizeInCrores: 52.8,
    growthYoY: 19.5,
    opportunityScore: 81,
    seasonality: 'Winter studying peak, heavy Q4 corporate demand',
    demandConfidence: 84,
    suggestedSellingPrice: 1799,
    estimatedNetMargin: 27.6,
    description: 'Clamp-on swing arm eye-care desk lamp with 5 color temperatures, step-less dimming, and auto-shutoff timer.'
  }
];

export const DEMO_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-a',
    name: 'Supplier A (ApexTech Industrial Corp)',
    location: 'Bhiwandi / Shenzhen Hub',
    unitCost: 280,
    moq: 500,
    shippingCostPerUnit: 25,
    leadTimeDays: 18,
    rating: 4.4,
    reliabilityScore: 86,
    certifications: ['ISO9001', 'RoHS Compliant'],
    totalLandedCost: 305,
    notes: 'Low unit cost but requires 500 units upfront order (₹1,40,000 + shipping). Exceeds starting ₹50,000 budget.',
    capitalRequired: 140000,
    exceedsBudget: true
  },
  {
    id: 'sup-b',
    name: 'Supplier B (ErgoPro Crafts Ltd)',
    location: 'Pune / Chakan Auto Cluster',
    unitCost: 320,
    moq: 100,
    shippingCostPerUnit: 35,
    leadTimeDays: 7,
    rating: 4.8,
    reliabilityScore: 96,
    certifications: ['ISO9001', 'CE', 'BIS Registered'],
    totalLandedCost: 355,
    notes: 'Optimal fit for ₹50,000 budget: 100 units @ ₹320 = ₹32,000. Leaves ₹18,000 buffer for ads & packaging.',
    capitalRequired: 32000,
    exceedsBudget: false
  },
  {
    id: 'sup-c',
    name: 'Supplier C (Zenith Precision Hardware)',
    location: 'Rajkot Hardware Zone',
    unitCost: 310,
    moq: 200,
    shippingCostPerUnit: 30,
    leadTimeDays: 12,
    rating: 4.2,
    reliabilityScore: 82,
    certifications: ['MSME Registered'],
    totalLandedCost: 340,
    notes: 'MOQ 200 units requires ₹62,000 capital. Sits ₹12,000 above current working capital limit.',
    capitalRequired: 62000,
    exceedsBudget: true
  },
  {
    id: 'sup-d',
    name: 'Supplier D (SpeedRoute Logistics & Supply)',
    location: 'Noida Phase II',
    unitCost: 360,
    moq: 50,
    shippingCostPerUnit: 28,
    leadTimeDays: 3,
    rating: 4.6,
    reliabilityScore: 93,
    certifications: ['Domestic Fast Track'],
    totalLandedCost: 388,
    notes: 'Ultra-low MOQ (50 units = ₹18,000), fastest lead time (3 days), but unit margin is 6% lower.',
    capitalRequired: 18000,
    exceedsBudget: false
  }
];

export const DEMO_CHANNELS: ChannelComparison[] = [
  {
    id: 'amazon',
    name: 'Amazon India',
    platformFeePercent: 12.5,
    estimatedReach: '85M+ Active Shoppers (Prime ecosystem)',
    fulfillmentOptions: ['FBA (Fulfillment by Amazon)', 'Easy Ship', 'Self-Ship'],
    estimatedProfitPerUnit: 350,
    netMarginPercent: 31.8,
    keyRisks: ['Strict A-to-Z returns policy', 'Competition for Buy Box'],
    payoutCycleDays: 7,
    bestFor: 'High conversion velocity and automated Prime badge fulfillment'
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    platformFeePercent: 11.0,
    estimatedReach: '70M+ Monthly Users (Strong Tier 2 & 3 penetration)',
    fulfillmentOptions: ['FBF (Fulfilled by Flipkart)', 'Smart Seller', 'Standard'],
    estimatedProfitPerUnit: 368,
    netMarginPercent: 33.5,
    keyRisks: ['Regional warehouse placement mandates', 'Slightly higher RTO risk'],
    payoutCycleDays: 10,
    bestFor: 'Volume velocity during festive sale events (Big Billion Days)'
  },
  {
    id: 'direct',
    name: 'Direct Website (D2C)',
    platformFeePercent: 2.5,
    estimatedReach: 'Targeted niche traffic via Instagram/Google Ads',
    fulfillmentOptions: ['Logistics aggregator (Shiprocket / Delhivery)', 'Self-packed'],
    estimatedProfitPerUnit: 395,
    netMarginPercent: 35.9,
    keyRisks: ['High customer acquisition cost (CAC)', 'No organic customer trust initially'],
    payoutCycleDays: 2,
    bestFor: 'Brand equity, repeat customer email capture, and highest gross margin'
  },
  {
    id: 'meesho',
    name: 'Meesho / Social Marketplace',
    platformFeePercent: 0,
    estimatedReach: '120M+ Value-conscious buyers',
    fulfillmentOptions: ['Meesho 3PL Integrated Logistics'],
    estimatedProfitPerUnit: 280,
    netMarginPercent: 25.4,
    keyRisks: ['High Return-to-Origin (RTO) up to 18%', 'Extreme price sensitivity'],
    payoutCycleDays: 15,
    bestFor: 'Bulk volume testing with zero platform commission fee'
  }
];

export const INITIAL_COST_STRUCTURE: CostStructure = {
  productCost: 320,
  shipping: 45,
  packaging: 25,
  marketplaceFee: 137.38, // ~12.5% of 1099
  fulfillmentFee: 65,     // FBA pick & pack
  advertisingCAC: 120,    // Target blended CAC
  returnCostProvision: 42,// ~5.8% return rate loss buffer
  totalCost: 754.38,
  sellingPrice: 1099,
  profit: 344.62,
  profitMargin: 31.36,
  breakEvenUnits: 28
};

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    sku: 'EXP-LPSTND-ALUM-01',
    productName: 'Ergonomic Aluminum Laptop Stand',
    inStock: 82,
    reserved: 12,
    inTransit: 0,
    reorderPoint: 20,
    unitLandedCost: 355,
    sellingPrice: 1099,
    location: 'Bhiwandi FBA Fulfillment Center'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'EMP-98214',
    customerName: 'Aditya Sharma',
    customerCity: 'Bengaluru, KA',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'delivered',
    channel: 'amazon',
    fulfillment: 'provider_fulfilled',
    orderDate: '2026-09-24T10:15:00Z',
    trackingNumber: 'FBA-IN-9827361'
  },
  {
    id: 'ord-1002',
    orderNumber: 'EMP-98215',
    customerName: 'Priya Iyer',
    customerCity: 'Mumbai, MH',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'delivered',
    channel: 'flipkart',
    fulfillment: 'provider_fulfilled',
    orderDate: '2026-09-24T14:40:00Z',
    trackingNumber: 'FBF-EXP-11029'
  },
  {
    id: 'ord-1003',
    orderNumber: 'EMP-98216',
    customerName: 'Vikram Malhotra',
    customerCity: 'Gurugram, HR',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'shipped',
    channel: 'amazon',
    fulfillment: 'provider_fulfilled',
    orderDate: '2026-09-26T09:00:00Z',
    trackingNumber: 'FBA-IN-9828452'
  },
  {
    id: 'ord-1004',
    orderNumber: 'EMP-98217',
    customerName: 'Sneha Patel',
    customerCity: 'Ahmedabad, GJ',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'packed',
    channel: 'amazon',
    fulfillment: 'provider_fulfilled',
    orderDate: '2026-09-27T11:20:00Z',
    trackingNumber: 'FBA-IN-9830112'
  },
  {
    id: 'ord-1005',
    orderNumber: 'EMP-98218',
    customerName: 'Rahul Deshmukh',
    customerCity: 'Pune, MH',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'confirmed',
    channel: 'direct',
    fulfillment: 'seller_fulfilled',
    orderDate: '2026-09-27T18:05:00Z'
  },
  {
    id: 'ord-1006',
    orderNumber: 'EMP-98219',
    customerName: 'Ananya Gupta',
    customerCity: 'Hyderabad, TS',
    productName: 'Ergonomic Aluminum Laptop Stand',
    quantity: 1,
    unitPrice: 1099,
    totalAmount: 1099,
    status: 'placed',
    channel: 'flipkart',
    fulfillment: 'provider_fulfilled',
    orderDate: '2026-09-28T04:12:00Z'
  }
];

export const INITIAL_RETURNS: ReturnRecord[] = [
  {
    id: 'ret-501',
    orderId: 'ord-0994',
    orderNumber: 'EMP-98188',
    productName: 'Ergonomic Aluminum Laptop Stand',
    reason: 'Customer reported desk clearance was too tight for 17-inch gaming laptop',
    refundAmount: 1099,
    returnShippingCost: 65,
    inventoryRestockable: true,
    netLossOnReturn: 145, // shipping + inspection fee
    timestamp: '2026-09-23T15:20:00Z'
  }
];

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-1',
    name: 'Amazon Sponsored Products - Auto Targeting',
    channel: 'Amazon Ads',
    status: 'active',
    dailyBudget: 400,
    adSpend: 3200,
    impressions: 48200,
    clicks: 680,
    cpc: 4.7,
    conversions: 32,
    cac: 100,
    attributedRevenue: 35168,
    roas: 10.99
  },
  {
    id: 'camp-2',
    name: 'Flipkart Product Listing Ads - Exact Match',
    channel: 'Flipkart Ads',
    status: 'active',
    dailyBudget: 350,
    adSpend: 2450,
    impressions: 34100,
    clicks: 490,
    cpc: 5.0,
    conversions: 21,
    cac: 116.6,
    attributedRevenue: 23079,
    roas: 9.42
  }
];

export const INITIAL_DECISIONS: BusinessDecision[] = [
  {
    id: 'dec-101',
    timestamp: '2026-09-21T08:30:00Z',
    title: 'Product Selection: Ergonomic Laptop Stand',
    module: 'ProdIQ',
    decision: 'Selected Ergonomic Aluminum Laptop Stand as launch SKU over Wireless Mouse.',
    reason: 'High category demand (48.5k/mo) combined with healthy 31.8% net margin and low technical defect liability.',
    dataUsed: ['MarketIQ Opportunity Score: 92', 'Low seasonal volatility', 'High unit price ₹1,099'],
    expectedImpact: 'Estimated gross revenue ₹1,09,900 on 100-unit pilot run.',
    risk: 'low',
    approvalStatus: 'executed',
    requiresHumanApproval: true
  },
  {
    id: 'dec-102',
    timestamp: '2026-09-21T11:15:00Z',
    title: 'Supplier Selection & MOQ Guardrail',
    module: 'SourceX',
    decision: 'Selected Supplier B (ErgoPro Crafts) for initial batch of 100 units; rejected Supplier A (ApexTech).',
    reason: 'Supplier A MOQ of 500 units (₹1,40,000) violates working capital ceiling of ₹50,000. Supplier B MOQ of 100 units costs ₹32,000.',
    dataUsed: ['Working capital: ₹50,000', 'Supplier A MOQ: 500 units', 'Supplier B MOQ: 100 units'],
    expectedImpact: 'Preserved ₹18,000 liquidity buffer for advertising and return contingencies.',
    risk: 'low',
    approvalStatus: 'executed',
    requiresHumanApproval: true
  },
  {
    id: 'dec-103',
    timestamp: '2026-09-22T09:45:00Z',
    title: 'Fulfillment Routing Policy',
    module: 'Fulfillment Intelligence',
    decision: 'Allocated 80% inventory to Amazon FBA / Flipkart FBF and 20% to Seller-Fulfilled reserve.',
    reason: 'Prime/Assured badge boosts buy-box share by 3.8x and removes seller packing bottlenecks.',
    dataUsed: ['Prime conversion lift benchmark +42%', 'SLA compliance metrics'],
    expectedImpact: '94% of orders delivered within 48 hours.',
    risk: 'low',
    approvalStatus: 'executed',
    requiresHumanApproval: false
  }
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-01',
    timestamp: '2026-09-28T05:00:00Z',
    type: 'inventory_purchase',
    title: 'Authorize PO #EMP-PO-2026-02 for Reorder of 100 Units',
    description: 'Autonomous reorder trigger reached (Current stock: 82 units, velocity 6.5 units/day). Supplier B unit cost ₹320.',
    financialImpact: 32000,
    status: 'pending',
    requestedBy: 'EmporX Inventory Sentinel',
    dataSummary: {
      supplier: 'Supplier B (ErgoPro Crafts Ltd)',
      units: 100,
      totalAmount: '₹32,000',
      estimatedLeadTime: '7 days',
      projectedRunoutDate: 'Oct 11, 2026'
    }
  },
  {
    id: 'appr-02',
    timestamp: '2026-09-27T16:30:00Z',
    type: 'ad_spend',
    title: 'Scale Daily Ad Budget from ₹750 to ₹1,200 (Festive Push)',
    description: 'Current ROAS is 10.2x across Amazon & Flipkart. Scaling ad spend will capture early festive shoppers.',
    financialImpact: 13500,
    status: 'pending',
    requestedBy: 'GrowthX Autonomous Bidding',
    dataSummary: {
      currentRoas: '10.2x',
      projectedIncrementalRevenue: '₹42,000',
      currentAcos: '9.7%',
      channelTarget: 'Amazon Sponsored Products'
    }
  }
];

export const DEMO_CATALOG_ENTRY = {
  sku: 'EXP-LPSTND-ALUM-01',
  title: 'EmporX Ergonomic Aluminum Laptop Stand – 6-Angle Adjustable Foldable Riser for Desk (10-15.6 Inch Laptops, Anti-Slip Silicone Pads, Space Grey)',
  mrp: 1999,
  sellingPrice: 1099,
  bulletPoints: [
    'ERGONOMIC 6-LEVEL EYE-LEVEL ADJUSTMENT: Elevates laptop screen height from 2.15” to 6” for posture relief, eliminating neck fatigue during long work hours.',
    'STURDY AEROSPACE-GRADE ALUMINUM ALLOY: Precision CNC machined with sand-blasted anodic oxidation finish, supporting up to 10kg load without wobble.',
    'PATENTED VENTILATED HEAT DISSIPATION: Forward-tilt design and open hollow frame maximize natural airflow to keep laptops cool under heavy computation.',
    'COMPACT & TRAVEL-READY: Folds flat in 1 second to 9.4 x 1.75 inches, weighing just 260g. Includes premium velvet travel storage pouch.',
    'UNIVERSAL COMPATIBILITY: Engineered for all 10 to 15.6-inch laptops including MacBook Pro/Air, Dell XPS, Lenovo ThinkPad, HP, ASUS, and Acer.'
  ],
  specifications: {
    'Material': 'Aviation Aluminum Alloy + Premium Silicone',
    'Product Dimensions': '24.0 x 4.5 x 1.5 cm (Folded)',
    'Weight': '260 Grams',
    'Angle Levels': '6 Levels (15° to 45° elevation)',
    'Max Load Capacity': '10 Kilograms',
    'Warranty': '1 Year EmporX Hassle-Free Replacement'
  },
  backendKeywords: [
    'laptop stand for desk',
    'aluminum adjustable riser',
    'ergonomic laptop holder',
    'macbook pro stand',
    'foldable portable stand for wfh',
    'cooling desk riser'
  ],
  suggestedImages: [
    { label: 'Hero Image: 45-degree angle on clean minimalist studio desk with MacBook', type: 'Primary White Background' },
    { label: 'Infographic: 6 adjustable heights diagram with degree callouts', type: 'Feature Explainer' },
    { label: 'Dimension & Weight Comparison against smartphone', type: 'Size Guide' },
    { label: 'Ergonomic Posture Comparison (Hunched vs Straight Spine)', type: 'Lifestyle & Problem-Solution' },
    { label: 'Thermal Cooling Hollow Frame Airflow Visualization', type: 'Performance Technical' }
  ]
};
