import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

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

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Bursa Gold App Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080A0D] text-[#F4F1E8] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#101318] border border-[rgba(244,241,232,0.12)] rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E2C76A]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h1 className="text-xl font-bold font-serif mb-2 text-white">
              Bursa Altın Fiyatları Yükleniyor...
            </h1>
            <p className="text-xs text-[#A5A8AE] mb-6 leading-relaxed">
              Piyasa verileri senkronize edilirken bir kesinti oluştu. Sayfayı güvenle yeniden yükleyebilirsiniz.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.hash = '';
                  window.location.reload();
                }}
                className="flex-1 px-4 py-2.5 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sayfayı Yenile</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.hash = '';
                }}
                className="flex-1 px-4 py-2.5 bg-[#14181E] hover:bg-[#1E2530] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.1)] text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Ana Sayfa</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
