import React from "react";
import { CheckCircle } from "lucide-react";

interface QuotationModelProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const QuotationModel: React.FC<QuotationModelProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) return null;

  const { message, quotation } = data;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={48} />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Quotation Request Sent
        </h2>
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Quotation Details */}
        <div className="space-y-4">
          {/* Items */}
          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="divide-y divide-gray-200">
              {quotation.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationModel;
