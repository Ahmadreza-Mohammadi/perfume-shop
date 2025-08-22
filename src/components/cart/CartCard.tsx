import Image from "next/image";
import Img from "../../../public/armani.png";
import { digitsEnToFa, formatPrice } from "../utils/helper";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume: number;
  perfumeType: string;
  gender: string;
  quantity: number;
}

interface CartCardProps {
  item: CartItem;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

function CartCard({ item, onQuantityChange, onRemove }: CartCardProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
      {/* Image */}
      <div className="w-full h-48 relative bg-gray-50 flex items-center justify-center">
        <Image
          src={Img}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow gap-4">
        <div className="flex flex-col gap-2">
          <h2
            className="text-xl font-bold text-gray-900 capitalize mb-1 truncate text-center"
            title={item.name}
          >
            {item.name}
          </h2>
          <p className="text-sm text-gray-500 capitalize mb-1 text-center">
            {item.brand}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-center">
              حجم: {digitsEnToFa(item.volume)}ml
            </span>
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full capitalize text-center">
              {item.perfumeType}
            </span>
          </div>
          <div className="flex justify-between">
            {/* Gender */}
            <span
              className={`mt-2 inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${
                item.gender === "unisex"
                  ? "bg-blue-100 text-blue-600"
                  : item.gender === "male"
                  ? "bg-cyan-100 text-cyan-700"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {item.gender === "unisex"
                ? "یونی‌سکس"
                : item.gender === "male"
                ? "مردانه"
                : "زنانه"}
            </span>
          </div>
        </div>

        {/* Price and Quantity Controls */}
        <div className="mt-4 flex flex-col gap-4">
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-extrabold text-gray-900">
              {formatPrice(item.price)}{" "}
              <span className="text-base font-medium text-gray-500">تومان</span>
            </p>
            <p className="text-sm font-semibold text-gray-700">
              کل: {formatPrice(item.price * item.quantity)} تومان
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">
                {digitsEnToFa(item.quantity)}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow transition-colors duration-200 focus:outline-none"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
