import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-primary p-8 flex flex-col items-start justify-center">
          <div className="bg-danger-muted p-6 rounded-xl border border-danger/30 w-full max-w-4xl mx-auto overflow-auto">
            <h1 className="text-2xl font-bold text-danger mb-4">Something went wrong!</h1>
            <p className="text-text-body mb-4">The application crashed. Here are the error details:</p>
            <pre className="text-sm text-text-muted bg-surface-secondary p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/80 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
