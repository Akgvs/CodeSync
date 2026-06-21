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
      "Code together with your team in real-time. See live cursors, selections, and changes as they happen.",
    color: "brand",
  },
  {
    icon: Play,
    title: "Code Execution",
    description:
      "Run your code instantly with our built-in execution engine. Support for multiple languages and runtimes.",
    color: "success",
  },
  {
    icon: Code2,
    title: "Multi-language Support",
    description:
      "Write in JavaScript, Python, C++, Java and more. Syntax highlighting and IntelliSense included.",
    color: "info",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description:
      "Communicate with collaborators through built-in chat. Share ideas without leaving your editor.",
    color: "warning",
  },
  {
    icon: Link2,
    title: "Instant Invite Links",
    description:
      "Generate shareable invite links for your rooms. Anyone can join with a single click.",
    color: "brand",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Track every change with full version history. Revert to any previous state in seconds.",
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
    description: "Start coding together in real-time. See changes, chat, and build faster.",
    icon: Users,
  },
];

// ── Pricing Plans ─────────────────────────────
export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started and personal projects.",
    features: [
      "Up to 3 rooms",
      "2 collaborators per room",
      "5 languages supported",
      "Basic code execution",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professional teams and serious developers.",
    features: [
      "Unlimited rooms",
      "Unlimited collaborators",
      "All languages supported",
      "Priority code execution",
      "Version history",
      "Private rooms",
      "Priority support",
      "Team workspaces",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
];

// ── Testimonials ──────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at Stripe",
    avatar: null,
    quote:
      "CodeSync transformed how our team does code reviews. Real-time collaboration saves us hours every sprint.",
  },
  {
    name: "Marcus Johnson",
    role: "CS Student at MIT",
    avatar: null,
    quote:
      "As a student, pair programming with classmates remotely was always painful. CodeSync makes it seamless.",
  },
  {
    name: "Priya Sharma",
    role: "Tech Lead at Vercel",
    avatar: null,
    quote:
      "The latency is incredible — it genuinely feels like we're sitting at the same machine. Best collab tool I've used.",
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
  { label: "Shared Rooms", href: "/dashboard/shared", icon: Share2 },
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
