import { type FallbackProps, ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { locale } from './constants/locale';
import { LoginPage, ProductsPage } from './pages';
import { store } from './redux/store';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
    <div className="max-w-sm w-full bg-white rounded-xl p-6 shadow-lg text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{locale.error}</h2>
      <p className="text-red-600 text-sm mb-6 min-h-[1.25rem]">
        {(error as Error).message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
      >
        {locale.tryAgain}
      </button>
    </div>
  </div>
);

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={console.error}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
    <Toaster position="top-right" richColors />
  </Provider>
);
