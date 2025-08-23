import React, { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface AlertModalProps {
  title?: string;
  text: string;
  onClose: () => void;
  isOpen: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title = "Success!",
  text,
  onClose,
  isOpen,
}) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close alert"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="text-center py-4">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-3 rounded-full shadow-inner">
              <CheckCircle
                className="w-12 h-12 text-green-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Title */}
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          {/* Message */}
          <p id="modal-description" className="mt-3 text-gray-600">
            {text}
          </p>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-white text-gray-800 font-medium rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
