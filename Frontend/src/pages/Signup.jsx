import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <SignUp 
          routing="path" 
          path="/signup" 
          signInUrl="/login"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: "bg-surface-secondary border border-edge shadow-2xl rounded-2xl",
              headerTitle: "text-text-heading",
              headerSubtitle: "text-text-muted",
              socialButtonsBlockButton: "border-edge text-text-body hover:bg-surface-tertiary",
              socialButtonsBlockButtonText: "text-text-body font-medium",
              dividerLine: "bg-edge",
              dividerText: "text-text-muted",
              formFieldLabel: "text-text-secondary",
              formFieldInput: "bg-surface-tertiary border-edge text-text-body focus:ring-brand-500 focus:border-brand-500",
              formButtonPrimary: "bg-brand-500 hover:bg-brand-400 text-white shadow-lg",
              footerActionText: "text-text-muted",
              footerActionLink: "text-brand-400 hover:text-brand-300",
            }
          }}
        />
      </div>
    </div>
  );
}
