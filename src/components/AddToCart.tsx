import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { api } from "../utils/api";
import QuotationModel from "../shared/QuotationModel";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotationData, setQuotationData] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [total, setTotal] = useState(0);
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await api.product.getCartIems();

      const formattedItems = (response.items || []).map((item: any) => ({
        id: item.id,
        name: item.product_name,
        price: parseFloat(item.product_price),
        image: item.product_image,
        quantity: item.quantity,
      }));

      setCartItems(formattedItems);
      calculateTotals(formattedItems);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Error fetching cart items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotals = (items: any[]) => {
    const sub = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(sub);
    setTotal(sub);
  };

  const updateQuantity = async (id: number, change: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (!currentItem) return;

    const newQuantity = Math.max(1, currentItem.quantity + change);

    const response = await api.product.updateCartQuantity(id, {
      quantity: newQuantity, // send final quantity, not just +1/-1
    });

    if (response) {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  const removeItem = async (id: any) => {
    const response = await api.product.deleteCartInProduct(id);

    if (response) {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  const handleSendQuotation = async () => {
    setIsSending(true);
    try {
      const response = await api.quotation.sendQuotations();
      if (response) {
        setQuotationData(response); // store API data
        setIsModalOpen(true); // open modal
      }
    } catch (err) {
      console.error("Error sending quotation", err);
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Browse our products to add items to your cart
              </p>
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                <a href="/">Continue Shopping</a>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6"
                  >
                    {/* Product Image */}
                    <div className="md:col-span-3 bg-gray-50 rounded-md flex items-center justify-center p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain h-40 w-full"
                      />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-9 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h2>
                          {item.size && (
                            <p className="mt-2 text-sm text-gray-500">
                              Size:{" "}
                              <span className="text-gray-700">{item.size}</span>
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-500">
                              Color:{" "}
                              <span className="text-gray-700">
                                {item.color}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2">
                          <button
                            className="border border-gray-300 rounded-md p-1 hover:bg-gray-100 transition"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 border border-gray-300 rounded-md min-w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="border border-gray-300 rounded-md p-1 hover:bg-gray-100 transition"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-bold">Total</span>
                      <span className="text-gray-900 font-bold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full bg-black text-white py-3 mt-6 rounded-md transition font-medium flex items-center justify-center ${
                    isSending
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={handleSendQuotation}
                  disabled={isSending}
                >
                  {isSending ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      ></path>
                    </svg>
                  ) : (
                    "Send quotation"
                  )}
                </button>

                <div className="mt-4 text-sm text-center text-gray-500">
                  or{" "}
                  <a href="/" className="text-gray-900 hover:underline">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <QuotationModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchCart();
        }}
        data={quotationData}
      />
    </>
  );
};

export default AddToCart;
