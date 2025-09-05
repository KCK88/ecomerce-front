import { type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function ModalOrder({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-[1px] flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 md:p-6 rounded-lg relative overflow-y-auto shadow-xl w-full max-w-[95vw] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[90vh] ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 md:top-3 md:right-3 bg-transparent border-none text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition-colors z-10"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
        <div className="pt-1 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}