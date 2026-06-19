'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Rocket, BookOpen, ShieldAlert, FileText, Activity, 
  Lightbulb, Milestone, Cpu, Database, Server, Key, 
  Workflow, Layers, CheckCircle2, AlertOctagon, HelpCircle
} from 'lucide-react';
import styles from './Sections.module.css';

// Typewriter manifesto quotes
const MANIFESTO_QUOTES = [
  "SOFTWARE IS A SEQUENCE OF TRADE-OFFS. OPTIMIZE FOR LEVERAGE.",
  "BUILD SUSTAINABLE SYSTEMS, NOT JUST VISUAL PAGES.",
  "RELIABILITY IS A CORE FEATURE. OBSERVABILITY IS MANDATORY.",
  "CAN SYSTEMS UNDERSTAND INTENT? CONVERT INFORMATION TO INTELLIGENCE."
];

// Architectural Node Diagrams Data
const ARCH_EXPLORER_PROJECTS = {
  documind: {
    title: "DocuMind AI (Document Intelligence)",
    nodes: [
      { id: 'user', label: 'Client UI', tech: 'Next.js 15 Client' },
      { id: 'api', label: 'API Gateway', tech: 'FastAPI (Python)' },
      { id: 'auth', label: 'Auth Broker', tech: 'JWT Cookies' },
      { id: 'cache', label: 'Embedding Cache', tech: 'Redis Store' },
      { id: 'ai', label: 'AI RAG Core', tech: 'OpenRouter & LLaMA-3' },
      { id: 'db', label: 'Relational DB', tech: 'PostgreSQL' },
      { id: 'vector', label: 'Vector Store', tech: 'ChromaDB' }
    ],
    details: {
      user: {
        tech: 'Next.js 15 SPA Hydrated',
        reason: 'Optimized initial TTFB, progressive server rendering, and hydration of the IDE workspace UI.',
        alternatives: 'Single-page Vite client, Vanilla JS SPA.',
        tradeoffs: '+ Higher SEO indexability & fast initial shell load. - Complex build steps & hydration boundary locks.',
        scalability: 'Edge caching of the compile assets shell on Vercel Node CDNs.',
        bottleneck: 'Thread-blocking client hydration when loading large document lists.'
      },
      api: {
        tech: 'FastAPI (Asynchronous Python)',
        reason: 'High-throughput async endpoints, built-in Pydantic data verification, and automatic OpenAPI generation.',
        alternatives: 'Express.js, Flask.',
        tradeoffs: '+ Sub-millisecond router parsing & native Python AI library bindings. - Python global interpreter lock (GIL) under high CPU workloads.',
        scalability: 'Horizontal microservices scaling via containerized Docker nodes.',
        bottleneck: 'Thread contention during synchronous PDF parsing operations (requires celery worker offloading).'
      },
      auth: {
        tech: 'Stateless JWT cookies with HTTP-Only flags',
        reason: 'Prevents XSS/CSRF token leakage and enables decoupled authentication verification across backend workers.',
        alternatives: 'Session storage in database, local storage tokens.',
        tradeoffs: '+ Stateless validation bypasses database calls. - Complex token blacklisting for immediate logouts.',
        scalability: 'No session store synchronization overhead across microservices.',
        bottleneck: 'Token size overhead on HTTP headers for clients carrying large permission structures.'
      },
      cache: {
        tech: 'Redis (Upstash serverless cache)',
        reason: 'Prevents redundant vector generation calls and rate-limits concurrent user queries.',
        alternatives: 'In-memory local dictionary, Memcached.',
        tradeoffs: '+ Persistent cache key expiry configurations. - Incremental network cost and setup latency.',
        scalability: 'Clustered Redis scaling paths with read replica nodes.',
        bottleneck: 'High concurrent eviction triggers when processing large context vectors.'
      },
      ai: {
        tech: 'OpenRouter / LLaMA-3 + Cross-Encoder Reranker',
        reason: 'Allows switching model endpoints dynamically based on query ambiguity and executes Cross-Encoder semantic reranking.',
        alternatives: 'Naive cosine-similarity index queries.',
        tradeoffs: '+ Generates precise multi-document grounded answers. - Reranking latency (adds 120ms average response overhead).',
        scalability: 'Async API query queues routing through concurrent inference loops.',
        bottleneck: 'Model rate limit quotas under burst request volumes.'
      },
      db: {
        tech: 'PostgreSQL Relational DB',
        reason: 'Ensures structured consistency, foreign key cascades for multi-tenant assets, and complex audit trails.',
        alternatives: 'MongoDB, DynamoDB.',
        tradeoffs: '+ Strict relational integrity models. - Block-level locks and downtime updates for major migrations.',
        scalability: 'Read-replica queries split and horizontal data sharding.',
        bottleneck: 'Connection pool exhaustion under burst client connection spikes.'
      },
      vector: {
        tech: 'ChromaDB Local/Embedded Store',
        reason: 'Lowers infrastructure costs and eliminates external network calls for similarity queries.',
        alternatives: 'Pinecone, pgvector.',
        tradeoffs: '+ Fast local retrieval in execution context. - Vector sharding is bound by process memory bounds.',
        scalability: 'Requires migrating to pgvector or Pinecone if document storage expands to millions of chunks.',
        bottleneck: 'Process memory bloat during multi-document vector ingestion loops.'
      }
    }
  },
  wordsage: {
    title: "WordSage (AI Writing Platform)",
    nodes: [
      { id: 'user', label: 'Client UI', tech: 'Next.js 16 UI' },
      { id: 'proxy', label: 'Proxy Gateway', tech: 'Nginx Load Balancer' },
      { id: 'api', label: 'Express API', tech: 'Express.js (TypeScript)' },
      { id: 'auth', label: 'Auth Broker', tech: 'NextAuth v5 JWE' },
      { id: 'db', label: 'Relational DB', tech: 'PostgreSQL + Prisma' },
      { id: 'pay', label: 'Payments Core', tech: 'Razorpay HMAC Gate' },
      { id: 'ai', label: 'AI OpenRouter', tech: 'openai/gpt-4o-mini' }
    ],
    details: {
      user: {
        tech: 'Next.js 16 Client & TipTap Editor',
        reason: 'Provides server-side rendering (SSR), high-performance client hydration, and dynamic inline formatting toolbars.',
        alternatives: 'Single-page Vite client, standalone rich-text libraries.',
        tradeoffs: '+ Faster initial page load and SEO indexability. - Complex bundle split requirements for rich text libraries.',
        scalability: 'Static visual shell delivery via edge CDNs.',
        bottleneck: 'Chunk size and loading latency of the TipTap editing engine modules.'
      },
      proxy: {
        tech: 'Nginx Port 80 Load Balancer',
        reason: 'Buffers slow client connections, serves static files, and routes requests to frontend (port 3000) and backend (port 4000).',
        alternatives: 'Application-level custom routing middleware.',
        tradeoffs: '+ Zero-latency proxying & robust connection queueing. - Single point of failure if Nginx process crashes.',
        scalability: 'Run multiple backend containers behind Nginx round-robin balancing.',
        bottleneck: 'Nginx connection buffer overflow under extreme burst traffic.'
      },
      api: {
        tech: 'Express.js TypeScript ESM Server',
        reason: '16 API routers handling authentication, document streams, team style guides, transactions, and analytics.',
        alternatives: 'NestJS, Koa.',
        tradeoffs: '+ Unrestricted routing architecture and rapid prototyping setup. - No native dependency injection container.',
        scalability: 'Horizontal node processes clustered behind PM2 or Docker microservices.',
        bottleneck: 'CPU blocking when executing heavy password hashing (bcryptjs rounds).'
      },
      auth: {
        tech: 'NextAuth v5 JWE tokens',
        reason: 'Uses JWE (encrypted JWTs) decoded across ports using the shared session secret.',
        alternatives: 'Stateful Redis session tokens.',
        tradeoffs: '+ Decouples API servers from constant session database queries. - Revocation requires a blocklist sync store.',
        scalability: 'Completely stateless authentication scales infinitely.',
        bottleneck: 'Large cookie header size overhead on client requests.'
      },
      db: {
        tech: 'PostgreSQL with Prisma ORM (24 tables)',
        reason: 'Maintains complex normalized relations across user profiles, team style guides, transactions, and document histories.',
        alternatives: 'MongoDB, DynamoDB.',
        tradeoffs: '+ Enforces database level schema integrity. - Database connection pools are constrained in serverless scaling.',
        scalability: 'Read/write database query split and vertical compute autoscaling.',
        bottleneck: 'Thread deadlock bottlenecks during concurrent document versions auto-saves.'
      },
      pay: {
        tech: 'Razorpay Subscriptions + Orders Gate',
        reason: 'Handles local payments, top-up orders, monthly subscriptions, and webhook updates with HMAC validation.',
        alternatives: 'Stripe, PayPal.',
        tradeoffs: '+ Tailored localization options for Indian developer markets. - Inconsistent API error documentation.',
        scalability: 'Process webhook events asynchronously to avoid client thread lock.',
        bottleneck: 'Payment API gateway responses latency under load.'
      },
      ai: {
        tech: 'OpenRouter SDK Gateway',
        reason: 'Routes prompt contexts dynamically to gpt-4o-mini, Claude, or Gemini Pro based on user writing modes.',
        alternatives: 'Direct OpenAI/Anthropic APIs integration.',
        tradeoffs: '+ Automatic failover capabilities to back-up LLMs. - Third-party API payload latency overhead (~1.5s).',
        scalability: 'Queues user requests in rate-limiting queues per account tier.',
        bottleneck: 'Rate-limiting API quotas during team workspace document updates.'
      }
    }
  },
  taskguru: {
    title: "TaskGuru (Productivity Operating System)",
    nodes: [
      { id: 'user', label: 'Client UI', tech: 'React / Next.js' },
      { id: 'api', label: 'Serverless Actions', tech: 'Next.js API & Zod' },
      { id: 'auth', label: 'Auth Broker', tech: 'Google OAuth 2.0' },
      { id: 'db', label: 'Postgres DB', tech: 'Neon Serverless + Prisma' }
    ],
    details: {
      user: {
        tech: 'React client with Framer Motion animations',
        reason: 'Enables high-performance micro-interactions for streak systems, XP gains, and gamified level-ups.',
        alternatives: 'Tailwind transitions, CSS keyframe blocks.',
        tradeoffs: '+ Fluid interactive response & custom animation chains. - High runtime JavaScript evaluation overhead.',
        scalability: 'Client-side component state management to avoid roundtrip UI lag.',
        bottleneck: 'Excessive re-renders during drag-and-drop habit reorganization.'
      },
      api: {
        tech: 'Next.js 15 Server Actions & Zod validation',
        reason: 'Unifies client-server interactions with type-safe schema checking at API entry points.',
        alternatives: 'Express REST routes.',
        tradeoffs: '+ Direct invocation of backend controllers. - Hidden build payload bundle sizes.',
        scalability: 'Scales to zero in Vercel Serverless environment.',
        bottleneck: 'Serverless cold start delays (adds 1.2s to initial actions).'
      },
      auth: {
        tech: 'Google OAuth 2.0 Auth',
        reason: 'Implements trust security flow with standard OAuth credentials and secure session tokens.',
        alternatives: 'Custom bcrypt hashed email/password tables.',
        tradeoffs: '+ Zero password storage liability & simple signup. - Complete dependency on Google authentication API.',
        scalability: 'Delegates auth volume handling completely to Google.',
        bottleneck: 'Google API token refresh timeouts during background syncing.'
      },
      db: {
        tech: 'Neon Serverless PostgreSQL + Prisma ORM',
        reason: 'Provides automated branch-on-PR workflows, connection pooling, and structured schema queries.',
        alternatives: 'AWS RDS Postgres, MongoDB.',
        tradeoffs: '+ Instant schema synchronization and connection autoscaling. - Cold starts when database is idle.',
        scalability: 'Neon autoscales CPU/compute resources dynamically based on transactional query load.',
        bottleneck: 'Initial pooling connection latency when serverless functions spin up.'
      }
    }
  },
  pipeline: {
    title: "AI Sales Pipeline (Event-Driven Automation)",
    nodes: [
      { id: 'trigger', label: 'Serp API / LinkedIn Ingestion', tech: 'Cron Ingestion' },
      { id: 'api', label: 'n8n Event Core', tech: 'n8n Engine' },
      { id: 'ai', label: 'Intent Parser', tech: 'OpenRouter GPT' },
      { id: 'queue', label: 'SQLite Store', tech: 'Internal Registry' },
      { id: 'crm', label: 'Google Sheets CRM', tech: 'Meta/Google Sheets' }
    ],
    details: {
      trigger: {
        tech: 'Serp API scheduler rules',
        reason: 'Retrieves qualified lead data based on custom niche queries without manual copy-paste scripts.',
        alternatives: 'Custom headless Puppeteer scrapers.',
        tradeoffs: '+ Robust selectors managed by external vendor. - High API cost per 1000 requests.',
        scalability: 'Distributes queries across multiple scheduled proxy targets.',
        bottleneck: 'Rate-limiting from search engine platforms.'
      },
      api: {
        tech: 'n8n Workflow Automation Engine',
        reason: 'Handles webhook routing, graphical debugging logs, and SaaS connection nodes in one interface.',
        alternatives: 'Custom Node.js execution brokers.',
        tradeoffs: '+ Rapid deployment and instant troubleshooting views. - Bound to node execution memory limits.',
        scalability: 'Distributing workers via Docker Swarm on self-hosted VMs.',
        bottleneck: 'Concurrency congestion on webhook triggers under load.'
      },
      ai: {
        tech: 'OpenRouter (LLaMA-3 / GPT-4o)',
        reason: 'Classifies lead profiles and extracts contact intent parsing tags from multi-turn responses.',
        alternatives: 'Static regex keyword filtering.',
        tradeoffs: '+ Captures subtle natural language nuances. - Expensive API cost per token and high latency.',
        scalability: 'Rate-limiting queuing inside n8n workflow pipelines.',
        bottleneck: 'API timeout responses when prompt contexts exceed limit bounds.'
      },
      queue: {
        tech: 'n8n SQLite Internal Queue',
        reason: 'Keeps track of campaign statuses, message logs, and webhook buffers.',
        alternatives: 'External PostgreSQL database.',
        tradeoffs: '+ Integrated directly in self-hosted pipeline storage. - Single-file disk locks during high write frequency.',
        scalability: 'Requires migrating to a centralized Redis/Postgres store for concurrent threads.',
        bottleneck: 'Disk I/O blocks under multi-threading write workloads.'
      },
      crm: {
        tech: 'Google Sheets API Sync & WhatsApp Cloud API Client',
        reason: 'Synchronizes outreach payloads to team dashboards and sends official rate-limited template messages.',
        alternatives: 'Custom CRM SaaS dashboards.',
        tradeoffs: '+ Simplicity for operational teams to read and write. - High API latency & row volume limits.',
        scalability: 'Queued updates to avoid Google API write quotas.',
        bottleneck: 'Google Sheets API quota limits (100 requests per 100 seconds).'
      }
    }
  }
};

// Incident Simulator Data
const INCIDENT_SIMULATOR_FAILURES = {
  LATENCY: {
    label: "Embedding API Latency Spike (>8s)",
    description: "ChromaDB vector embedding generation is exceeding the 8000ms threshold, causing Next.js client timeouts.",
    mitigations: ["CACHE", "FALLBACK"],
    logs: [
      "[00:20:15] [WARNING] Vector API request taking > 8500ms on index 'DocuMind-RAG'",
      "[00:20:16] [FATAL] Client connection dropped (HTTP 504 Gateway Timeout)",
      "[00:20:18] [METRICS] Average latency spike: 8920ms. Error Rate: 44%"
    ],
    solveLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Fallback Provider routing enabled.",
      "[00:20:21] [SYSTEM] Routing OpenAI Text-Embeddings -> Local Cohere embed-english-v3",
      "[00:20:22] [SYSTEM] Connection established. Processing time: 142ms.",
      "[00:20:23] [SUCCESS] Operations normalized. System status: HEALTHY."
    ],
    cacheLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Cache check enabled.",
      "[00:20:21] [SYSTEM] Checking Redis query cache hits. Serving cached vectors.",
      "[00:20:22] [SUCCESS] 92% of redundant client queries resolved via cache. Latency: 12ms.",
      "[00:20:23] [SUCCESS] Target RAG engine healthy. Operations normalized."
    ]
  },
  DB_EXHAUST: {
    label: "Neon Postgres Connection Exhaustion",
    description: "Dynamic scaling of Vercel serverless actions has spawned 20/20 active connections, locking relational threads.",
    mitigations: ["SCALE_POOL"],
    logs: [
      "[00:20:15] [FATAL] FATAL: remaining connection slots are reserved for non-replication connections",
      "[00:20:16] [ERROR] Prisma Client failed to acquire connection in 5000ms",
      "[00:20:18] [METRICS] Queued DB queries: 142. Transaction loss occurring."
    ],
    solveLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Neon connection pool autoscale parameter adjusted.",
      "[00:20:21] [SYSTEM] Increasing active connection slot limit 20 -> 100 via PgBouncer route.",
      "[00:20:22] [SYSTEM] Resolving query thread buffer... 142 commands executed.",
      "[00:20:23] [SUCCESS] Database lock cleared. Latency normalized to 14ms."
    ]
  },
  RATE_LIMIT: {
    label: "OpenRouter LLM Rate Limit (HTTP 429)",
    description: "Outgoing API queries to Groq LLaMA-3 have hit the rate limit threshold. AI coach responses failing.",
    mitigations: ["FALLBACK", "CIRCUIT_BREAKER"],
    logs: [
      "[00:20:15] [ERROR] OpenRouter request failed: Status Code 429 (Too Many Requests)",
      "[00:20:16] [WARNING] AI Task Coach scheduler failing to dissect user backlog tasks",
      "[00:20:18] [METRICS] Request drop rate: 88%. Cognitive system degraded."
    ],
    solveLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Switching to Fallback LLM endpoint.",
      "[00:20:21] [SYSTEM] Re-routing queries from OpenRouter LLaMA-3 -> Local Groq LLaMA-3 API.",
      "[00:20:22] [SYSTEM] Handshake established. Intent parsing context window validated.",
      "[00:20:23] [SUCCESS] Chat responses resolved. Services restored to normal limits."
    ],
    circuitLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Open Circuit Breaker.",
      "[00:20:21] [SYSTEM] Isolating model queries. Serving cached template answers.",
      "[00:20:22] [SUCCESS] Fallback text returned without API outbound calls. Error rate: 4%.",
      "[00:20:23] [SUCCESS] System status: DEGRADED (resilient fail-safe operational)."
    ]
  },
  BUFFER_SATURATION: {
    label: "WhatsApp Webhook Buffer Saturation",
    description: "Meta Graph API webhook updates are flooding the n8n automation engine faster than SQLite registers can write.",
    mitigations: ["SCALE_WORKERS", "REROUTE_BUFFER"],
    logs: [
      "[00:20:15] [WARNING] Thread pool queue size > 500 tasks on n8n runtime",
      "[00:20:16] [FATAL] SQLite database disk image is locked (code 5 SQLITE_BUSY)",
      "[00:20:18] [METRICS] Incoming webhook drops: 35%. Outbound leads stalling."
    ],
    solveLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Scaling active worker processes.",
      "[00:20:21] [SYSTEM] Deploying concurrent Docker worker micro-nodes via swarm rules.",
      "[00:20:22] [SYSTEM] Distributing processing thread load across 4 concurrent engines.",
      "[00:20:23] [SUCCESS] Queue flushed. SQLite I/O lock released. Telemetry normalized."
    ],
    rerouteLogs: [
      "[00:20:20] [SYSTEM] Mitigation triggered: Rerouting events to Redis queue.",
      "[00:20:21] [SYSTEM] Intercepting incoming hook streams and buffering payloads in Redis.",
      "[00:20:22] [SUCCESS] Inbound load absorbed. Rate-limiting n8n ingest speed to 20 writes/sec.",
      "[00:20:23] [SUCCESS] Database lock released. System operating normally."
    ]
  }
};

// Architecture Decision Records
const ADR_DATA = [
  {
    id: "ADR-001",
    title: "Hybrid RAG + Cross-Encoder Semantic Reranking for DocuMind AI",
    date: "Sep 2023",
    status: "APPROVED",
    context: "Naive vector database queries retrieve chunks based strictly on cosine similarity of text embeddings. In enterprise documents, this leads to semantic noise, lack of key context (e.g. document section structures), and poor search precision, reducing conversational accuracy.",
    decision: "Deploy a two-step retrieval pipeline: 1) Execute parallel BM25 lexical search and vector search queries (ChromaDB) to fetch a candidate pool. 2) Re-rank this pool using a lightweight local Cross-Encoder model (ms-marco-MiniLM) to isolate the top 5 highly relevant text nodes.",
    alternatives: "Standard semantic retrieval only, manual document tagging metadata filtering rules.",
    consequences: "+ Context chunk accuracy increased by 35%. + Irrelevant context noise isolated out.",
    tradeoffs: "- Adds 120ms to total RAG query pipelines. - Reranker model execution increases server memory consumption by 320MB.",
    future: "Migrating the Cross-Encoder model runtimes to edge serverless inference (ONNX runtime in Vercel Edge)."
  },
  {
    id: "ADR-002",
    title: "Neon Connection Pooling and Prisma Instance Caching in Next.js 15",
    date: "Jan 2024",
    status: "APPROVED",
    context: "In serverless runtime environments (Vercel), routes spin up and scale down dynamically. Each cold start or API call creates a new PostgreSQL database client connection. Under high concurrent user spikes, this quickly exhausts the 20-connection pool limit of Neon database endpoints.",
    decision: "Configure a centralized connection pool connection route through Neon's PgBouncer utility, and cache the Prisma client instance globally within the Node process object using: global.prisma = global.prisma || new PrismaClient().",
    alternatives: "AWS RDS PostgreSQL, pooling client query executions to local in-memory caches.",
    consequences: "+ Prevents PostgreSQL connection pool exhaustion spikes. + Reduces connection handshake time by 80%.",
    tradeoffs: "- Connection pooling introduces a tiny translation layer. - Serverless cold starts still take ~1.2s to establish connection contexts.",
    future: "Moving heavy database writes to offline background jobs processing through Redis BullMQ tasks."
  },
  {
    id: "ADR-003",
    title: "Self-Hosted n8n Engine for AI Sales Pipeline",
    date: "Jan 2025",
    status: "APPROVED",
    context: "Scraping businesses, classifying niches, compiling WhatsApp templates, and qualifying inbound responses require multi-phase state machines. Writing custom scheduling servers and maintaining API integrations manually leads to high boilerplate codebase maintenance.",
    decision: "Utilize a self-hosted n8n automation engine run inside Docker as the core event processor, using webhooks to handle incoming messages and calling custom Python APIs for embedding indexing.",
    alternatives: "Custom Celery + Redis queues, AWS Step Functions.",
    consequences: "+ Rapid visual workflow debugging dashboard. + Immediate B2B SaaS API bindings.",
    tradeoffs: "- High memory overhead (n8n requires ~1GB RAM). - SQLite internal queue single-write locking constraints.",
    future: "Scaling out worker nodes in a Kubernetes cluster utilizing a shared Redis task broker."
  },
  {
    id: "ADR-004",
    title: "Stateless JWT Auth Tokens Passed via HTTP-Only Cookies",
    date: "Mar 2024",
    status: "APPROVED",
    context: "Authenticating users on DocuMind AI and TaskGuru API endpoints must be performant and scale across microservices. Using stateful database-checked sessions adds a database query roundtrip on every user API call.",
    decision: "Implement stateless JSON Web Token (JWT) authorization where tokens are encrypted, signed using HS256, and passed in HTTP-Only, Secure, SameSite=Strict cookies to protect against XSS/CSRF attacks.",
    alternatives: "Stateful Redis session tokens, Auth0 external vendor integration.",
    consequences: "+ Bypasses database queries during API verification loops. + Zero session store sync latency.",
    tradeoffs: "- Revoking active tokens immediately requires temporary token blocklists. - Payload payload size is bound to cookie size limits (4KB).",
    future: "Moving token verification to Next.js middleware execution on edge caching routes."
  }
];

export default function ReadmeContent() {
  // Manifesto typewriter states
  const [manifestoIdx, setManifestoIdx] = useState(0);
  const [typedQuote, setTypedQuote] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Architecture explorer states
  const [activeArchProj, setActiveArchProj] = useState('documind');
  const [selectedNode, setSelectedNode] = useState('user');

  // Incident simulator states
  const [selectedFailure, setSelectedFailure] = useState(null);
  const [activeMitigation, setActiveMitigation] = useState(null);
  const [simLogs, setSimLogs] = useState([
    "[00:20:12] [SYSTEM] Command Center loaded.",
    "[00:20:12] [SYSTEM] System status: HEALTHY (No alerts)."
  ]);
  const logEndRef = useRef(null);

  // Animated metrics states
  const [metrics, setMetrics] = useState({
    projects: 0,
    apiNodes: 0,
    webhooks: 0,
    embeddings: 0,
    uptime: 0
  });

  // ADR state
  const [activeAdrId, setActiveAdrId] = useState("ADR-001");

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const fullText = MANIFESTO_QUOTES[manifestoIdx];
    const speed = isDeleting ? 25 : 60;

    if (!isDeleting && typedQuote === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && typedQuote === '') {
      setIsDeleting(false);
      setManifestoIdx((prev) => (prev + 1) % MANIFESTO_QUOTES.length);
    } else {
      timer = setTimeout(() => {
        setTypedQuote(prev => 
          isDeleting 
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [typedQuote, isDeleting, manifestoIdx]);

  // Animated metrics counters
  useEffect(() => {
    const targets = {
      projects: 6,
      apiNodes: 18,
      webhooks: 124000,
      embeddings: 45000,
      uptime: 99.98
    };

    const duration = 1200;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setMetrics({
        projects: Math.floor(targets.projects * progress),
        apiNodes: Math.floor(targets.apiNodes * progress),
        webhooks: Math.floor(targets.webhooks * progress),
        embeddings: Math.floor(targets.embeddings * progress),
        uptime: parseFloat((targets.uptime * progress).toFixed(2))
      });

      if (currentStep >= steps) {
        setMetrics(targets);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Incident log scroller
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollTop = logEndRef.current.scrollHeight;
    }
  }, [simLogs]);

  // Project select node resets
  const handleProjectSelect = (projKey) => {
    setActiveArchProj(projKey);
    const firstNode = ARCH_EXPLORER_PROJECTS[projKey].nodes[0].id;
    setSelectedNode(firstNode);
  };

  // Failure Injection
  const injectFailure = (failureKey) => {
    setSelectedFailure(failureKey);
    setActiveMitigation(null);
    const failData = INCIDENT_SIMULATOR_FAILURES[failureKey];
    setSimLogs([
      `[${new Date().toLocaleTimeString()}] [SYSTEM] ALERT! Fail state injected: ${failData.label}`,
      ...failData.logs.map(log => `[${new Date().toLocaleTimeString()}] ${log.substring(10)}`)
    ]);
  };

  // Mitigation trigger
  const runMitigation = (mitKey) => {
    if (!selectedFailure) {
      setSimLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [SYSTEM] Diagnostic bypassed. No active failures found.`
      ]);
      return;
    }

    setActiveMitigation(mitKey);
    const failData = INCIDENT_SIMULATOR_FAILURES[selectedFailure];
    const isCorrect = failData.mitigations.includes(mitKey);

    if (isCorrect) {
      let runLogs = [];
      if (mitKey === 'CACHE' && failData.cacheLogs) {
        runLogs = failData.cacheLogs;
      } else if (mitKey === 'CIRCUIT_BREAKER' && failData.circuitLogs) {
        runLogs = failData.circuitLogs;
      } else if (mitKey === 'REROUTE_BUFFER' && failData.rerouteLogs) {
        runLogs = failData.rerouteLogs;
      } else {
        runLogs = failData.solveLogs;
      }

      setSimLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [SYSTEM] Processing mitigation patch: ${mitKey}...`,
        ...runLogs.map(log => `[${new Date().toLocaleTimeString()}] ${log.substring(10)}`)
      ]);

      setTimeout(() => {
        setSelectedFailure(null);
        setActiveMitigation(null);
      }, 2000);
    } else {
      setSimLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [SYSTEM] Deploying patch: ${mitKey}...`,
        `[${new Date().toLocaleTimeString()}] [ERROR] Mitigation mismatch. System failure resolved at 0% efficiency. Thread deadlock continues.`
      ]);
    }
  };

  const activeProjectData = ARCH_EXPLORER_PROJECTS[activeArchProj];
  const activeNodeInfo = activeProjectData.details[selectedNode] || {
    tech: "Unknown",
    reason: "No node selected.",
    alternatives: "None.",
    tradeoffs: "None.",
    scalability: "None.",
    bottleneck: "None."
  };

  const activeAdr = ADR_DATA.find(a => a.id === activeAdrId) || ADR_DATA[0];

  return (
    <div className={styles.section} style={{ paddingBottom: '80px' }}>
      
      {/* MODULE 1: ENGINEERING MANIFESTO HERO */}
      <div className={styles.manifestoHero} style={{ marginBottom: '32px' }}>
        <div className={styles.manifestoTerminal}>
          <span>shitesh@command-center:~$ cat manifesto.txt</span>
          <span className={styles.typewriterText}>
            {typedQuote}<span style={{ opacity: 1, animation: 'blink 1s infinite' }}>|</span>
          </span>
        </div>
        <p className={styles.manifestoSub}>
          Welcome to the <strong>Engineering Command Center</strong>. This workspace is a live showcase 
          of production mindset, architecture layouts, systemic trade-off analysis, and failures mitigation loops.
        </p>
      </div>

      {/* MODULE 5: ENGINEERING METRICS DASHBOARD */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <Activity size={16} />
          </div>
          <h2>System Telemetry Diagnostics</h2>
        </div>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>{metrics.projects}</div>
            <div className={styles.metricLabel}>Systems Built</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>{metrics.apiNodes}</div>
            <div className={styles.metricLabel}>API Nodes Configured</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>{(metrics.webhooks / 1000).toFixed(0)}k+</div>
            <div className={styles.metricLabel}>Production Webhooks</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricVal}>{metrics.uptime}%</div>
            <div className={styles.metricLabel}>Service Availability</div>
          </div>
        </div>
      </div>

      {/* MODULE 2: INTERACTIVE ARCHITECTURE EXPLORER */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <Layers size={16} />
          </div>
          <h2>Interactive Architecture Node Explorer</h2>
        </div>
        
        <div className={styles.explorerContainer}>
          <div className={styles.projectSelector}>
            <button 
              className={`${styles.projectSelectorBtn} ${activeArchProj === 'documind' ? styles.projectSelectorBtnActive : ''}`}
              onClick={() => handleProjectSelect('documind')}
            >
              DocuMind AI
            </button>
            <button 
              className={`${styles.projectSelectorBtn} ${activeArchProj === 'wordsage' ? styles.projectSelectorBtnActive : ''}`}
              onClick={() => handleProjectSelect('wordsage')}
            >
              WordSage
            </button>
            <button 
              className={`${styles.projectSelectorBtn} ${activeArchProj === 'taskguru' ? styles.projectSelectorBtnActive : ''}`}
              onClick={() => handleProjectSelect('taskguru')}
            >
              TaskGuru
            </button>
            <button 
              className={`${styles.projectSelectorBtn} ${activeArchProj === 'pipeline' ? styles.projectSelectorBtnActive : ''}`}
              onClick={() => handleProjectSelect('pipeline')}
            >
              AI Sales Pipeline
            </button>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Click on any architectural node to inspect technology choices, alternatives, trade-offs, and scaling bottlenecks:
          </p>

          <div className={styles.nodeDiagram}>
            {activeProjectData.nodes.map((node, i) => (
              <span key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  className={`${styles.diagramNode} ${selectedNode === node.id ? styles.diagramNodeActive : ''}`}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <Cpu size={12} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '10.5px' }}>{node.label}</strong>
                    <span style={{ opacity: 0.6, fontSize: '9px' }}>{node.tech}</span>
                  </div>
                </button>
                {i < activeProjectData.nodes.length - 1 && (
                  <span className={styles.nodeConnector}>→</span>
                )}
              </span>
            ))}
          </div>

          <div className={styles.specOutput}>
            <div style={{ color: '#ff2b8f', fontWeight: 'bold', borderBottom: '1px dashed var(--border-primary)', paddingBottom: '6px', marginBottom: '12px' }}>
              --- {activeProjectData.title} : Node ({selectedNode.toUpperCase()}) Specs ---
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong style={{ color: '#58a6ff' }}>Technology choice:</strong> <span style={{ color: '#e1e4e8' }}>{activeNodeInfo.tech}</span></div>
              <div><strong style={{ color: '#58a6ff' }}>Reason for choosing:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeNodeInfo.reason}</span></div>
              <div><strong style={{ color: '#58a6ff' }}>Alternatives considered:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeNodeInfo.alternatives}</span></div>
              <div><strong style={{ color: '#58a6ff' }}>Tradeoffs analyzed:</strong> <span style={{ color: '#f472b6' }}>{activeNodeInfo.tradeoffs}</span></div>
              <div><strong style={{ color: '#58a6ff' }}>Scalability model:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeNodeInfo.scalability}</span></div>
              <div><strong style={{ color: '#58a6ff' }}>Potential Bottleneck:</strong> <span style={{ color: '#ffb86c' }}>{activeNodeInfo.bottleneck}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 3: PRODUCTION INCIDENT SIMULATOR */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <ShieldAlert size={16} />
          </div>
          <h2>Live Resiliency Incident Simulator</h2>
        </div>

        <div className={styles.incidentSimulator}>
          <div className={`${styles.incidentHeader} ${!selectedFailure ? styles.incidentHeaderHealthy : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={`${styles.incidentHeaderPulse} ${!selectedFailure ? styles.incidentHeaderPulseHealthy : ''}`}></span>
              <span>
                System Status: <strong>{selectedFailure ? `ALERT - INCIDENT ACTIVE (${selectedFailure})` : "HEALTHY (All services nominal)"}</strong>
              </span>
            </div>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>INCIDENT_CONTROLLER_V1</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Inject a production-grade failure to test system resiliency, then select the matching architectural mitigation tool:
          </p>

          <div className={styles.failureGrid}>
            <button 
              className={`${styles.failureBtn} ${selectedFailure === 'LATENCY' ? styles.failureBtnActive : ''}`}
              onClick={() => injectFailure('LATENCY')}
            >
              ☢ Inject ChromaDB Latency Spike
            </button>
            <button 
              className={`${styles.failureBtn} ${selectedFailure === 'DB_EXHAUST' ? styles.failureBtnActive : ''}`}
              onClick={() => injectFailure('DB_EXHAUST')}
            >
              ☢ Inject Postgres Connections Exhaust
            </button>
            <button 
              className={`${styles.failureBtn} ${selectedFailure === 'RATE_LIMIT' ? styles.failureBtnActive : ''}`}
              onClick={() => injectFailure('RATE_LIMIT')}
            >
              ☢ Inject Groq LLM API Rate Limit
            </button>
            <button 
              className={`${styles.failureBtn} ${selectedFailure === 'BUFFER_SATURATION' ? styles.failureBtnActive : ''}`}
              onClick={() => injectFailure('BUFFER_SATURATION')}
            >
              ☢ Inject WhatsApp Webhook Saturation
            </button>
          </div>

          <div className={styles.mitigationGrid}>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'FALLBACK' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('FALLBACK')}
            >
              Switch LLM Fallback
            </button>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'CACHE' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('CACHE')}
            >
              Check Redis Cache
            </button>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'SCALE_POOL' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('SCALE_POOL')}
            >
              Autoscale DB Pool
            </button>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'SCALE_WORKERS' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('SCALE_WORKERS')}
            >
              Deploy Swarm Workers
            </button>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'CIRCUIT_BREAKER' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('CIRCUIT_BREAKER')}
            >
              Open Circuit Breaker
            </button>
            <button 
              className={`${styles.mitigationBtn} ${activeMitigation === 'REROUTE_BUFFER' ? styles.mitigationBtnActive : ''}`}
              onClick={() => runMitigation('REROUTE_BUFFER')}
            >
              Re-route webhook queue
            </button>
          </div>

          <div className={styles.incidentLogs} ref={logEndRef}>
            {simLogs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>

      {/* MODULE 4: ARCHITECTURE DECISION RECORDS (ADR) */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <BookOpen size={16} />
          </div>
          <h2>Architectural Decision Records (ADRs)</h2>
        </div>

        <div className={styles.adrContainer}>
          <div className={styles.adrTabRow}>
            {ADR_DATA.map((adr) => (
              <button 
                key={adr.id}
                className={`${styles.adrTabBtn} ${activeAdrId === adr.id ? styles.adrTabBtnActive : ''}`}
                onClick={() => setActiveAdrId(adr.id)}
              >
                {adr.id}: {adr.title.split(' ')[0]} {adr.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>

          <div className={styles.adrContentCard}>
            <div className={styles.adrMetaRow}>
              <span>Status: <strong style={{ color: '#4ade80' }}>{activeAdr.status}</strong></span>
              <span>Date: {activeAdr.date}</span>
            </div>
            
            <h3 className={styles.adrTitle}>{activeAdr.id} — {activeAdr.title}</h3>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Context</div>
              <p className={styles.adrBlockText}>{activeAdr.context}</p>
            </div>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Decision</div>
              <p className={styles.adrBlockText}>{activeAdr.decision}</p>
            </div>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Alternatives Considered</div>
              <p className={styles.adrBlockText}>{activeAdr.alternatives}</p>
            </div>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Consequences</div>
              <p className={styles.adrBlockText}>{activeAdr.consequences}</p>
            </div>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Trade-Offs</div>
              <p className={styles.adrBlockText} style={{ color: '#f472b6' }}>{activeAdr.tradeoffs}</p>
            </div>

            <div className={styles.adrBlock}>
              <div className={styles.adrBlockHeading}>Future Considerations</div>
              <p className={styles.adrBlockText}>{activeAdr.future}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 6: HARD-EARNED LESSONS */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <Lightbulb size={16} />
          </div>
          <h2>Hard-Earned Systems Lessons</h2>
        </div>

        <div className={styles.lessonsList}>
          <div className={styles.lessonItem}>
            <div className={styles.lessonIconBox}><CheckCircle2 size={16} /></div>
            <div className={styles.lessonText}>
              <span className={styles.lessonTitle}>Observability is a First-Class Requirement</span>
              <span className={styles.lessonDesc}>
                Tracing structural issues inside concurrent n8n pipelines or background tasks is 10x more expensive 
                if structured logs are missing. I design systems with standardized timestamp tags, request ID tracking, and telemetry buffers.
              </span>
            </div>
          </div>

          <div className={styles.lessonItem}>
            <div className={styles.lessonIconBox}><CheckCircle2 size={16} /></div>
            <div className={styles.lessonText}>
              <span className={styles.lessonTitle}>Enforce Output Schema Validation Guardrails</span>
              <span className={styles.lessonDesc}>
                LLM completion structures can drift. Guarding API entry points with Zod models and Pydantic schemas 
                at runtime prevents corrupted data from propagating down relational database tables.
              </span>
            </div>
          </div>

          <div className={styles.lessonItem}>
            <div className={styles.lessonIconBox}><CheckCircle2 size={16} /></div>
            <div className={styles.lessonText}>
              <span className={styles.lessonTitle}>Caching Solves Latency But Introduces Coordination Cost</span>
              <span className={styles.lessonDesc}>
                Using Redis caches saves API token costs and speeds up repeat client loads. However, maintaining cache invalidation 
                lifecycles adds system logic complexity that requires robust, deliberate cache eviction strategies.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 7: FUTURE ROADMAP */}
      <div className={styles.readmeSectionPremium}>
        <div className={styles.readmeIconHeader}>
          <div className={styles.readmeIconCircle}>
            <Milestone size={16} />
          </div>
          <h2>Future Architecture Roadmap</h2>
        </div>

        <div className={styles.roadmapGrid}>
          <div className={styles.roadmapCard}>
            <div className={styles.issueHeader}>
              <span className={styles.issueNum}>issue #204</span>
              <span className={styles.issueState}>Planned</span>
            </div>
            <h3>Distributed Task Queuing</h3>
            <p>Scale task scheduling horizontally by decoupling route execution from thread tasks via Redis-backed BullMQ clusters.</p>
          </div>

          <div className={styles.roadmapCard}>
            <div className={styles.issueHeader}>
              <span className={styles.issueNum}>issue #205</span>
              <span className={styles.issueState}>In Review</span>
            </div>
            <h3>Edge RAG Grounding</h3>
            <p>Compile embedding models into ONNX formats to execute document vector calculations directly at edge request routes, reducing cloud costs.</p>
          </div>

          <div className={styles.roadmapCard}>
            <div className={styles.issueHeader}>
              <span className={styles.issueNum}>issue #206</span>
              <span className={styles.issueState}>Concept</span>
            </div>
            <h3>Multi-Agent Intent Mesh</h3>
            <p>Deploy a state-synchronized mesh of AI agents running specific roles (QA, context validation, notification parsing) communicating via web sockets.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
