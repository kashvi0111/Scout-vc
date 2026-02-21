export interface Signal {
  id: string
  type: string
  description: string
  date: string
  icon: string
}

export interface Company {
  id: string
  name: string
  description: string
  sector: string
  stage: string
  location: string
  foundedYear: number
  website: string
  signalScore: number
  logo: string
  fundingTotal: string
  lastRound: string
  lastRoundDate: string
  employees: string
  investors: string[]
  keywords: string[]
  signals: Signal[]
}

export const companies: Company[] = [
  {
    id: "1",
    name: "Synthetica AI",
    description: "Building next-gen synthetic data pipelines for enterprise ML teams. Automates training data generation with privacy-first design.",
    sector: "AI",
    stage: "Series A",
    location: "San Francisco, CA",
    foundedYear: 2022,
    website: "https://synthetica.ai",
    signalScore: 92,
    logo: "S",
    fundingTotal: "$18.5M",
    lastRound: "Series A",
    lastRoundDate: "2025-09-15",
    employees: "45-60",
    investors: ["Sequoia Capital", "a16z", "Y Combinator"],
    keywords: ["synthetic data", "ML ops", "privacy", "enterprise AI", "data pipelines"],
    signals: [
      { id: "s1", type: "Funding", description: "Raised $14M Series A led by Sequoia Capital", date: "2025-09-15", icon: "funding" },
      { id: "s2", type: "Hiring", description: "Posted 12 new engineering roles in the last 30 days", date: "2025-10-01", icon: "hiring" },
      { id: "s3", type: "Product", description: "Launched enterprise SDK with SOC 2 compliance", date: "2025-08-20", icon: "product" },
    ],
  },
  {
    id: "2",
    name: "Paystream",
    description: "Real-time payment orchestration for B2B SaaS companies. Unifies billing, invoicing, and revenue recognition.",
    sector: "Fintech",
    stage: "Seed",
    location: "New York, NY",
    foundedYear: 2023,
    website: "https://paystream.io",
    signalScore: 78,
    logo: "P",
    fundingTotal: "$4.2M",
    lastRound: "Seed",
    lastRoundDate: "2025-06-10",
    employees: "15-25",
    investors: ["Stripe Ventures", "Ribbit Capital"],
    keywords: ["payments", "B2B SaaS", "billing", "revenue recognition", "fintech infrastructure"],
    signals: [
      { id: "s4", type: "Partnership", description: "Integrated with Stripe Connect and Plaid", date: "2025-07-12", icon: "partnership" },
      { id: "s5", type: "Traction", description: "Reached $1M ARR within 8 months of launch", date: "2025-09-01", icon: "traction" },
      { id: "s6", type: "Hiring", description: "Hired VP of Engineering from Adyen", date: "2025-08-15", icon: "hiring" },
    ],
  },
  {
    id: "3",
    name: "MedGraph",
    description: "AI-powered clinical decision support using knowledge graphs. Helps doctors identify drug interactions and optimal treatment paths.",
    sector: "Healthcare",
    stage: "Pre-seed",
    location: "Boston, MA",
    foundedYear: 2024,
    website: "https://medgraph.health",
    signalScore: 65,
    logo: "M",
    fundingTotal: "$1.8M",
    lastRound: "Pre-seed",
    lastRoundDate: "2025-03-20",
    employees: "5-10",
    investors: ["ARCH Venture Partners", "Flare Capital"],
    keywords: ["clinical AI", "knowledge graphs", "drug interactions", "healthcare", "decision support"],
    signals: [
      { id: "s7", type: "Product", description: "Completed FDA pre-submission meeting with positive feedback", date: "2025-05-10", icon: "product" },
      { id: "s8", type: "Traction", description: "Pilot with 3 major hospital systems in Northeast", date: "2025-06-01", icon: "traction" },
      { id: "s9", type: "Team", description: "CTO previously led AI research at Mayo Clinic", date: "2025-01-15", icon: "team" },
    ],
  },
  {
    id: "4",
    name: "Cloudlayer",
    description: "Developer-first infrastructure monitoring with AI-powered anomaly detection. Catches incidents before they become outages.",
    sector: "SaaS",
    stage: "Series A",
    location: "Austin, TX",
    foundedYear: 2021,
    website: "https://cloudlayer.dev",
    signalScore: 85,
    logo: "C",
    fundingTotal: "$22M",
    lastRound: "Series A",
    lastRoundDate: "2025-04-22",
    employees: "50-80",
    investors: ["Accel", "Lightspeed Venture Partners", "Datadog Ventures"],
    keywords: ["observability", "DevOps", "anomaly detection", "infrastructure", "monitoring"],
    signals: [
      { id: "s10", type: "Funding", description: "Raised $16M Series A led by Accel", date: "2025-04-22", icon: "funding" },
      { id: "s11", type: "Product", description: "Launched AI root cause analysis feature", date: "2025-06-15", icon: "product" },
      { id: "s12", type: "Traction", description: "500+ companies using the platform, 3x growth QoQ", date: "2025-07-01", icon: "traction" },
    ],
  },
  {
    id: "5",
    name: "NeuroPharma",
    description: "Using AI to discover novel small-molecule therapeutics for neurological disorders. Focus on Alzheimer's and Parkinson's.",
    sector: "Healthcare",
    stage: "Seed",
    location: "Cambridge, MA",
    foundedYear: 2023,
    website: "https://neuropharma.bio",
    signalScore: 71,
    logo: "N",
    fundingTotal: "$8M",
    lastRound: "Seed",
    lastRoundDate: "2025-05-30",
    employees: "20-30",
    investors: ["GV", "Lux Capital", "a16z Bio"],
    keywords: ["drug discovery", "AI pharma", "neurological", "small molecule", "biotech"],
    signals: [
      { id: "s13", type: "Funding", description: "Raised $8M seed round led by GV", date: "2025-05-30", icon: "funding" },
      { id: "s14", type: "Product", description: "Lead compound entered preclinical trials", date: "2025-08-01", icon: "product" },
      { id: "s15", type: "Partnership", description: "Research partnership with MIT Brain and Cognitive Sciences", date: "2025-07-15", icon: "partnership" },
    ],
  },
  {
    id: "6",
    name: "FlowQL",
    description: "Natural language interface for databases. Ask questions in English, get SQL queries and visualizations instantly.",
    sector: "AI",
    stage: "Seed",
    location: "Seattle, WA",
    foundedYear: 2023,
    website: "https://flowql.com",
    signalScore: 82,
    logo: "F",
    fundingTotal: "$5.5M",
    lastRound: "Seed",
    lastRoundDate: "2025-07-18",
    employees: "12-20",
    investors: ["Madrona Ventures", "OpenAI Startup Fund"],
    keywords: ["natural language", "SQL", "database", "data analytics", "AI tools"],
    signals: [
      { id: "s16", type: "Traction", description: "10,000+ developers on waitlist, 2,000 active users", date: "2025-08-10", icon: "traction" },
      { id: "s17", type: "Product", description: "Added support for PostgreSQL, MySQL, and BigQuery", date: "2025-09-01", icon: "product" },
      { id: "s18", type: "Hiring", description: "Hiring aggressively — 8 open roles across engineering and GTM", date: "2025-09-20", icon: "hiring" },
    ],
  },
  {
    id: "7",
    name: "VaultFi",
    description: "Non-custodial digital asset management for institutions. MPC wallets with regulatory-compliant reporting.",
    sector: "Fintech",
    stage: "Series A",
    location: "London, UK",
    foundedYear: 2021,
    website: "https://vaultfi.io",
    signalScore: 76,
    logo: "V",
    fundingTotal: "$25M",
    lastRound: "Series A",
    lastRoundDate: "2025-02-14",
    employees: "60-90",
    investors: ["Paradigm", "Coinbase Ventures", "Electric Capital"],
    keywords: ["digital assets", "MPC wallets", "custody", "institutional", "compliance"],
    signals: [
      { id: "s19", type: "Funding", description: "Raised $20M Series A led by Paradigm", date: "2025-02-14", icon: "funding" },
      { id: "s20", type: "Partnership", description: "Licensed by FCA for digital asset custody in UK", date: "2025-04-01", icon: "partnership" },
      { id: "s21", type: "Traction", description: "$500M+ in assets under management", date: "2025-06-01", icon: "traction" },
    ],
  },
  {
    id: "8",
    name: "ContextOS",
    description: "AI-native operating system for knowledge workers. Connects all your tools and surfaces relevant context automatically.",
    sector: "SaaS",
    stage: "Pre-seed",
    location: "San Francisco, CA",
    foundedYear: 2024,
    website: "https://contextos.ai",
    signalScore: 58,
    logo: "X",
    fundingTotal: "$2.1M",
    lastRound: "Pre-seed",
    lastRoundDate: "2025-08-05",
    employees: "5-10",
    investors: ["Abstract Ventures", "Soma Capital"],
    keywords: ["productivity", "AI assistant", "knowledge work", "context", "automation"],
    signals: [
      { id: "s22", type: "Team", description: "Founded by ex-Notion and ex-Linear engineers", date: "2025-01-10", icon: "team" },
      { id: "s23", type: "Product", description: "Private beta with 200 users, 85% weekly retention", date: "2025-09-15", icon: "product" },
      { id: "s24", type: "Traction", description: "Featured in TechCrunch Early Stage showcase", date: "2025-10-01", icon: "traction" },
    ],
  },
  {
    id: "9",
    name: "CareLink",
    description: "Telemedicine platform for chronic disease management. Combines remote monitoring with AI-driven care plans.",
    sector: "Healthcare",
    stage: "Series A",
    location: "Chicago, IL",
    foundedYear: 2022,
    website: "https://carelink.health",
    signalScore: 88,
    logo: "L",
    fundingTotal: "$15M",
    lastRound: "Series A",
    lastRoundDate: "2025-03-10",
    employees: "40-55",
    investors: ["General Catalyst", "Khosla Ventures", "Rock Health"],
    keywords: ["telemedicine", "chronic care", "remote monitoring", "care plans", "digital health"],
    signals: [
      { id: "s25", type: "Funding", description: "Raised $12M Series A led by General Catalyst", date: "2025-03-10", icon: "funding" },
      { id: "s26", type: "Traction", description: "Managing 50,000+ patients across 15 health systems", date: "2025-07-01", icon: "traction" },
      { id: "s27", type: "Product", description: "Launched RPM device integration hub", date: "2025-05-20", icon: "product" },
    ],
  },
  {
    id: "10",
    name: "Embedchain",
    description: "Open-source RAG framework for building AI apps. Simplifies embedding, retrieval, and generation pipelines.",
    sector: "AI",
    stage: "Seed",
    location: "Bangalore, India",
    foundedYear: 2023,
    website: "https://embedchain.ai",
    signalScore: 74,
    logo: "E",
    fundingTotal: "$3.8M",
    lastRound: "Seed",
    lastRoundDate: "2025-04-05",
    employees: "10-15",
    investors: ["Peak XV Partners", "Nexus Venture Partners"],
    keywords: ["RAG", "open source", "embeddings", "LLM tools", "developer tools"],
    signals: [
      { id: "s28", type: "Traction", description: "15,000 GitHub stars, 500+ contributors", date: "2025-06-15", icon: "traction" },
      { id: "s29", type: "Product", description: "Released v2.0 with multi-modal RAG support", date: "2025-08-01", icon: "product" },
      { id: "s30", type: "Partnership", description: "Official integration partner with LangChain and LlamaIndex", date: "2025-07-20", icon: "partnership" },
    ],
  },
]

export const sectors = ["AI", "Fintech", "Healthcare", "SaaS"] as const
export const stages = ["Pre-seed", "Seed", "Series A"] as const
export const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Boston, MA",
  "Austin, TX",
  "Cambridge, MA",
  "Seattle, WA",
  "London, UK",
  "Chicago, IL",
  "Bangalore, India",
] as const
