import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    setIsCartOpen,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-6 bg-green-600 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-green-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-green-600 hover:text-green-800"
                        >
                          -
                        </button>
                        <span className="mx-2 text-gray-600">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-green-600 hover:text-green-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with total and checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // Handle checkout logic here
                    alert('Proceeding to checkout...');
                  }}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 