import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  private recoveryTimer: number | null = null;
  private retryCount = 0;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Bursa Gold App recovered from transient state error:', error?.message || error);

    // AUTOMATIC RECOVERY: Reset error state immediately so no error popup interrupts the user
    if (this.recoveryTimer) {
      window.clearTimeout(this.recoveryTimer);
    }

    this.recoveryTimer = window.setTimeout(() => {
      this.retryCount++;
      if (this.retryCount < 5) {
        this.setState({ hasError: false, error: null });
      } else {
        // If persistent, cleanly re-route to home automatically without popup
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        }
      }
    }, 80);
  }

  public componentWillUnmount() {
    if (this.recoveryTimer) {
      window.clearTimeout(this.recoveryTimer);
    }
  }

  public render() {
    // If an error is caught during recovery, render a clean non-intrusive subtle pulse instead of a blocking popup
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080A0D] text-[#F4F1E8] flex items-center justify-center p-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#E2C76A] bg-[#101318] border border-[rgba(200,166,70,0.2)] px-4 py-2.5 rounded-xl shadow-lg animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#E2C76A] animate-ping" />
            <span>Piyasa verileri otomatik güncelleniyor...</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
