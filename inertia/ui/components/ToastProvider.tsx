import { createContext, useCallback, useContext, useState } from 'react';
import { Toast } from 'flowbite-react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast className="mb-2">
            <div className="flex items-center justify-between w-full">
              <div className="text-red-600 font-medium">{toast}</div>
              <button
                type="button"
                className="ml-4 text-gray-400 hover:text-gray-700"
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
