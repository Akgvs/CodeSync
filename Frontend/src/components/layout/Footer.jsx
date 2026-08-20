import { Link } from "react-router-dom";
import { Code2, Terminal, Zap, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface-secondary/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Operational Status */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-heading tracking-tight">
                Code<span className="text-brand-400">Sync</span>
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed">
              Sub-millisecond real-time collaborative code editor powered by Yjs CRDTs and Redis state replication.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 w-fit mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </div>
          </div>

          {/* Column 2: Platform Capabilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading mb-4 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              Capabilities
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-muted">
              <li className="hover:text-text-body transition-colors">Yjs CRDT Real-Time Sync</li>
              <li className="hover:text-text-body transition-colors">Team Common Rooms</li>
              <li className="hover:text-text-body transition-colors">Monaco IntelliSense Editor</li>
              <li className="hover:text-text-body transition-colors">Multi-Language Code Runner</li>
              <li className="hover:text-text-body transition-colors">Ephemeral Redis Architecture</li>
            </ul>
          </div>

          {/* Column 3: Supported Runtimes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading mb-4 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-brand-400" />
              Supported Runtimes
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-muted font-mono">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> JavaScript / TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Python 3.11
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> C++ (GCC 11)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" /> Java 17 LTS
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Go Engine
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-text-muted mb-4">
              <Link to="/features" className="hover:text-text-heading transition-colors">
                Explore Features
              </Link>
              <Link to="/pricing" className="hover:text-text-heading transition-colors">
                Pricing & Plans
              </Link>
              <Link to="/about" className="hover:text-text-heading transition-colors">
                About CodeSync
              </Link>
              <Link to="/dashboard" className="hover:text-text-heading transition-colors">
                Developer Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-edge/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} CodeSync Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-rose-400">♥</span> for developers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
