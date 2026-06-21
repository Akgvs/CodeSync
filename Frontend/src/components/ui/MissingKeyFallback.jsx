export default function MissingKeyFallback() {
  return (
    <div className="min-h-screen bg-surface-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-danger-muted rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-text-heading mb-4">Missing Clerk Key</h1>
      <p className="text-text-muted max-w-md mb-8">
        The application requires a Clerk Publishable Key to handle authentication. Please create a <code className="bg-surface-secondary px-2 py-1 rounded border border-edge text-text-body">.env.local</code> file in the <code className="bg-surface-secondary px-2 py-1 rounded border border-edge text-text-body">Frontend</code> directory and add your key.
      </p>
      <div className="bg-surface-secondary p-4 rounded-xl border border-edge text-left w-full max-w-lg">
        <pre className="text-sm text-text-body">
          <span className="text-brand-400">VITE_CLERK_PUBLISHABLE_KEY</span>=pk_test_your_key_here
        </pre>
      </div>
    </div>
  );
}
