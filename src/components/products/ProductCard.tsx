import Image from "next/image";
import Img from "../../../public/armani.png";
import { digitsEnToFa, formatPrice } from "../utils/helper";

export type Product =
  typeof import("../constants/ProductsData").perfumes[number];

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden flex flex-col relative">
      <div className="w-full h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={Img}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-500 ease-out"
          style={{ objectPosition: "center" }}
        />

        {!product.available && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <span className="text-lg font-bold text-red-500 bg-white px-4 py-2 rounded-full shadow-lg">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow gap-4">
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h2
              className="text-lg font-bold text-[#343A40] capitalize mb-1 truncate"
              title={product.name}
            >
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 capitalize">{product.brand}</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs font-medium text-[#343A40] bg-gray-100 px-3 py-1.5 rounded-full">
              حجم:{" "}
              {digitsEnToFa(
                Array.isArray(product.volume)
                  ? product.volume[0]
                  : product.volume
              )}
              ml
            </span>
            <span className="text-xs font-medium text-[#343A40] bg-gray-100 px-3 py-1.5 rounded-full capitalize">
              {product.perfumeType}
            </span>
          </div>

          <div className="flex justify-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                product.gender === "Unisex"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : product.gender === "Men"
                  ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                  : "bg-pink-50 text-pink-700 border border-pink-200"
              }`}
            >
              {product.gender === "Unisex"
                ? "یونی‌سکس"
                : product.gender === "Men"
                ? "مردانه"
                : "زنانه"}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                product.available
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {product.available ? "موجود" : "ناموجود"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-[#343A40]">
              {formatPrice(product.price)}
            </p>
            <span className="text-sm text-gray-500">تومان</span>
          </div>
          <button className="bg-gradient-to-r from-[#343A40] to-[#495057] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-[#495057] hover:to-[#343A40] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#343A40] focus:ring-opacity-20 transform hover:scale-105 active:scale-95 cursor-pointer">
            مشاهده محصول
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
