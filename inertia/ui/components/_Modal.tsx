import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
    >
      <div className="min-w-[768px] rounded-md bg-white p-4 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
