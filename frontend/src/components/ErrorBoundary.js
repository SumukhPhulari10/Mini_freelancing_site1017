import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
          <div className="bg-dark-secondary rounded-2xl p-8 max-w-lg w-full text-center border border-gray-700">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong</h2>
            <p className="text-text-secondary mb-6">
              We're sorry, but there was an error loading this page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Reload Page
            </button>
            {this.state.error && (
              <div className="mt-6 p-4 bg-red-900/20 rounded-lg text-left">
                <p className="text-red-400 text-sm font-mono">{this.state.error.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
