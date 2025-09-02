import Link from "next/link";
import { digitsEnToFa, formatPrice } from "../utils/helper";

export type Product =
  typeof import("../constants/ProductsData").perfumes[number];

type ProductCardProps = {
  product: Product & { id?: string | number };
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden flex flex-col relative">
      <div className="w-full h-64 relative bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={
            (product.image && product.image[0]) || "/perfume-bottle-heart.svg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {!product.available && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-10">
            <span className="text-lg font-bold text-red-600 bg-white px-4 py-2 rounded-full shadow-xl border border-red-200">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow gap-4">
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h2
              className="text-xl font-bold text-gray-800 capitalize mb-2 truncate"
              title={product.name}
            >
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{product.brand}</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              حجم:{" "}
              {digitsEnToFa(
                Array.isArray(product.volume)
                  ? product.volume[0]
                  : product.volume
              )}
              ml
            </span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full capitalize border border-gray-300">
              {product.perfumeType}
            </span>
          </div>

          <div className="flex justify-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                product.gender === "Unisex"
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : product.gender === "Men"
                  ? "bg-cyan-50 text-cyan-700 border-cyan-300"
                  : "bg-pink-50 text-pink-700 border-pink-300"
              }`}
            >
              {product.gender === "Unisex"
                ? "یونی‌سکس"
                : product.gender === "Men"
                ? "مردانه"
                : "زنانه"}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                product.available
                  ? "bg-green-50 text-green-700 border-green-300"
                  : "bg-red-50 text-red-700 border-red-300"
              }`}
            >
              {product.available ? "موجود" : "ناموجود"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex flex-col">
            <p className="text-xl font-bold text-gray-800">
              {formatPrice(product.price)}
            </p>
            <span className="text-sm text-gray-500">تومان</span>
          </div>
          <Link
            href={`/single-product/${product.id}`}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            مشاهده محصول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
