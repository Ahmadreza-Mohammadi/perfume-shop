"use client";
import { useState } from "react";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderCard from "@/components/orders/OrderCard";
import { sampleOrders } from "@/components/constants/SampleOrdersData";

function OrdersPage() {
  const [orders] = useState(sampleOrders);

  const handleViewDetails = (orderId: number) => {
    // Handle viewing order details - could navigate to a detailed view
    console.log(`Viewing details for order ${orderId}`);
  };

  return (
    <div className="m-auto p-2 sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] flex flex-col gap-6">
      <OrdersHeader />

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            هنوز سفارشی ندارید
          </h3>
          <p className="text-gray-600 mb-6">
            اولین سفارش خود را ثبت کنید و از محصولات ما لذت ببرید
          </p>
          <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200">
            مشاهده محصولات
          </button>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
