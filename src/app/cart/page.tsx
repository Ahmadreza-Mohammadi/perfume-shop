"use client";
import { useState } from "react";
import CartHeader from "@/components/cart/CartHeader";
import CartCard from "@/components/cart/CartCard";
import { sampleCartItems } from "@/components/constants/SampleCartItems";



function CartPage() {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="m-auto p-2 sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] flex flex-col gap-6">
      <CartHeader />

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                خلاصه سبد خرید
              </h3>
              <span className="text-sm text-gray-600">
                {cartItems.length} محصول
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">مجموع:</span>
              <span className="text-lg font-bold text-gray-900">
                {totalPrice.toLocaleString()} تومان
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200">
              ادامه خرید
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            سبد خرید شما خالی است
          </h3>
          <p className="text-gray-600 mb-6">
            محصولات مورد نظر خود را به سبد خرید اضافه کنید
          </p>
          <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200">
            مشاهده محصولات
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
