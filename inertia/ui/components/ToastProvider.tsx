import { createContext, useCallback, useContext, useState } from 'react';
import { Toast } from 'flowbite-react';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            className={
              toast.type === 'success'
                ? 'mb-2 bg-green-600 text-white font-medium'
                : 'mb-2 bg-red-600 text-white font-medium'
            }
          >
            <div className="flex items-center justify-between w-full">
              <div>{toast.message}</div>
              <button
                type="button"
                className="ml-4 text-gray-50 hover:text-gray-100"
                onClick={() => setToast(null)}
              >
                ×
              </button>
            </div>
          </Toast>
        </div>
      )}
    </ToastContext.Provider>
  );
}
