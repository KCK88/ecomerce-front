import {type ReactNode} from 'react';

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
      className={`fixed inset-0 backdrop-blur-[1px] flex justify-center items-center z-50`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg relative overflow-y-auto shadow-xl ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 bg-transparent border-none text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
