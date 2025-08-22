import Image from "next/image";
import Img from "../../../public/armani.png";
import { digitsEnToFa, formatPrice } from "../utils/helper";

interface OrderItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume: number;
  perfumeType: string;
  gender: string;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  items: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: number) => void;
}

function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: "در انتظار تایید",
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
      case "processing":
        return {
          text: "در حال پردازش",
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "shipped":
        return {
          text: "ارسال شده",
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case "delivered":
        return {
          text: "تحویل داده شده",
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "cancelled":
        return {
          text: "لغو شده",
          color: "bg-red-100 text-red-700 border-red-200",
        };
      default:
        return {
          text: "نامشخص",
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const orderDate = new Date(order.date).toLocaleDateString("fa-IR");

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {order.orderNumber}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              تاریخ سفارش: {orderDate}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}
          >
            {statusInfo.text}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {order.items.length} محصول
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(order.totalAmount)} تومان
          </span>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-6 flex-1">
        <div className="space-y-4">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              {/* Item Image */}
              <div className="w-16 h-16 relative bg-gray-50 rounded-2xl flex-shrink-0">
                <Image
                  src={Img}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                  style={{ objectPosition: "center" }}
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500">{item.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {digitsEnToFa(item.volume)}ml
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {digitsEnToFa(item.quantity)} عدد
                  </span>
                </div>
              </div>

              {/* Item Price */}
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="text-xs text-gray-500">تومان</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show more items indicator */}
        {order.items.length > 2 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              و {order.items.length - 2} محصول دیگر
            </p>
          </div>
        )}
      </div>

      {/* Order Actions */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onViewDetails(order.id)}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200 focus:outline-none"
        >
          مشاهده جزئیات
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
