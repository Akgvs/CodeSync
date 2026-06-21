import { Link } from "react-router-dom";
import { Code2, ExternalLink, Globe, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Licenses", href: "#" },
  ],
};

const SOCIALS = [
  { icon: ExternalLink, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-heading tracking-tight">
                Code<span className="text-brand-400">Sync</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted max-w-xs leading-relaxed">
              Real-time collaborative coding platform for developers, students, and teams.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-surface-tertiary/50 border border-edge hover:border-edge-hover flex items-center justify-center text-text-muted hover:text-text-body transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-heading mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-body transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-edge flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} CodeSync. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Built with ❤️ for developers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
