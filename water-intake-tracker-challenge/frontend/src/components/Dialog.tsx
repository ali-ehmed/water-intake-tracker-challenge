"use client";
import React from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
