import {
  Code2,
  Users,
  Play,
  MessageSquare,
  Link2,
  History,
  LayoutDashboard,
  FolderOpen,
  Share2,
  UsersRound,
  Activity,
  Settings,
  LogOut,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

// ── Navigation Links ──────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

// ── Feature Cards ─────────────────────────────
export const FEATURES = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Code together with your team in real-time. See live cursors, selections, and changes as they happen using CRDTs.",
    color: "brand",
  },
  {
    icon: Play,
    title: "Code Execution",
    description:
      "Run your code instantly with our built-in execution engine. Support for JavaScript, Python, C++, Java, and Go.",
    color: "success",
  },
  {
    icon: Code2,
    title: "Multi-language Support",
    description:
      "Write in JavaScript, Python, C++, Java, TypeScript, and Go with syntax highlighting and Monaco Editor Intellisense.",
    color: "info",
  },
  {
    icon: UsersRound,
    title: "Team Common Rooms",
    description:
      "Create persistent shared rooms for engineering teams. Collaborate instantly with 1-click room joining.",
    color: "warning",
  },
  {
    icon: Link2,
    title: "Instant Invite Links",
    description:
      "Generate shareable invite links for your rooms and teams. Anyone can join with a single click.",
    color: "brand",
  },
  {
    icon: Activity,
    title: "Redis Ephemeral Engine",
    description:
      "High-performance state tracking powered by Redis. Zero data loss and conflict-free real-time synchronization.",
    color: "danger",
  },
];

// ── How It Works ──────────────────────────────
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Create a Room",
    description: "Set up a coding room in seconds. Choose your language and privacy settings.",
    icon: Zap,
  },
  {
    step: 2,
    title: "Share the Link",
    description: "Generate an invite link and share it with your team or collaborators.",
    icon: Share2,
  },
  {
    step: 3,
    title: "Collaborate Live",
    description: "Start coding together in real-time. See live cursors, run code, and build faster.",
    icon: Users,
  },
];

// ── Pricing Plans ─────────────────────────────
export const PRICING_PLANS = [
  {
    planId: "Free",
    name: "Free",
    price: "₹0",
    priceUSD: "$0",
    period: "forever",
    description: "Perfect for getting started and personal projects.",
    features: [
      "Up to 3 rooms",
      "Unlimited collaborators per room",
      "All 6 languages supported",
      "Instant code execution",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    planId: "Pro",
    name: "Pro",
    price: "₹999",
    priceUSD: "$12",
    period: "/month",
    description: "For professional teams and serious developers.",
    features: [
      "Unlimited rooms",
      "Unlimited collaborators",
      "All languages supported",
      "Priority code execution",
      "Team workspaces & common rooms",
      "Private rooms",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

// ── Testimonials ──────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Aditya Gupta",
    role: "Lead Systems Architect",
    avatar: null,
    quote:
      "CodeSync's Yjs CRDT engine with Redis guarantees sub-millisecond cursor and code synchronization across teams.",
  },
  {
    name: "Rohan Verma",
    role: "Fullstack Engineer",
    avatar: null,
    quote:
      "The instant Team Common Rooms feature streamlined our pair programming. No invitation friction or delays.",
  },
  {
    name: "Ananya Patel",
    role: "Frontend Developer",
    avatar: null,
    quote:
      "Writing JavaScript, Python, and C++ with real-time multi-user cursor tracking directly in Monaco Editor is unbelievable.",
  },
];

// ── Stats ─────────────────────────────────────
export const STATS = [
  { label: "Active Rooms", value: "12,400+", icon: Globe },
  { label: "Projects Created", value: "54,000+", icon: FolderOpen },
  { label: "Developers Joined", value: "89,000+", icon: Users },
];

// ── Sidebar Navigation ────────────────────────
export const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Teams", href: "/dashboard/teams", icon: UsersRound },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const SIDEBAR_BOTTOM = [
  { label: "Logout", href: "/login", icon: LogOut, danger: true },
];

// ── Language Options ──────────────────────────
export const LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: "JS" },
  { value: "python", label: "Python", icon: "PY" },
  { value: "cpp", label: "C++", icon: "C+" },
  { value: "java", label: "Java", icon: "JV" },
  { value: "typescript", label: "TypeScript", icon: "TS" },
  { value: "go", label: "Go", icon: "GO" },
];

// ── Dashboard Stats ───────────────────────────
export const DASHBOARD_STATS = [
  { label: "Total Projects", value: "24", change: "+3 this week", icon: FolderOpen, color: "brand" },
  { label: "Collaborators", value: "16", change: "+5 this month", icon: Users, color: "info" },
];


// ── Language Color Map ────────────────────────
export const LANGUAGE_COLORS = {
  javascript: "#f7df1e",
  python: "#3776ab",
  cpp: "#00599c",
  java: "#ed8b00",
  typescript: "#3178c6",
  go: "#00add8",
};
