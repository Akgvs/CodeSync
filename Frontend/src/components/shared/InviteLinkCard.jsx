import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import Button from "../ui/Button";

export default function InviteLinkCard({ link, onOpenRoom }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl bg-surface-tertiary/50 border border-edge p-4">
      <p className="text-xs text-text-muted mb-2 font-medium">Invite Link</p>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 bg-surface-primary rounded-lg text-sm text-brand-400 font-mono truncate border border-edge">
          {link}
        </code>
        <button
          onClick={handleCopy}
          className={`p-2.5 rounded-lg border transition-all duration-200 ${
            copied
              ? "bg-success-muted border-success/30 text-success"
              : "bg-surface-tertiary border-edge hover:border-edge-hover text-text-muted hover:text-text-body"
          }`}
          aria-label="Copy invite link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex gap-2 mt-3">
        <Button
          variant="secondary"
          size="sm"
          icon={Copy}
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={ExternalLink}
          onClick={onOpenRoom}
          className="flex-1"
        >
          Open Room
        </Button>
      </div>
    </div>
  );
}
