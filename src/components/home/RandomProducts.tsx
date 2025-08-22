import Image from "next/image";
import Img from "../../../public/armani.png";
import { perfumes } from "../constants/ProductsData";
import { digitsEnToFa, formatPrice } from "../utils/helper";

function RandomProducts() {
  return (
    <>
      {/* Product Grid */}
      <div className="w-full py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden flex flex-col relative"
          >
            {/* Product Image Container */}
            <div className="w-full h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={Img}
                alt={perfume.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-500 ease-out"
                style={{ objectPosition: "center" }}
              />

              {/* Overlay for unavailable products */}
              {!perfume.available && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-red-500 bg-white px-4 py-2 rounded-full shadow-lg">
                    ناموجود
                  </span>
                </div>
              )}
            </div>

            {/* Product Content */}
            <div className="p-5 flex flex-col justify-between flex-grow gap-4">
              {/* Product Info */}
              <div className="flex flex-col gap-3">
                {/* Product Name and Brand */}
                <div className="text-center">
                  <h2
                    className="text-lg font-bold text-[#343A40] capitalize mb-1 truncate"
                    title={perfume.name}
                  >
                    {perfume.name}
                  </h2>
                  <p className="text-sm text-gray-600 capitalize">
                    {perfume.brand}
                  </p>
                </div>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {/* Volume Tag */}
                  <span className="text-xs font-medium text-[#343A40] bg-gray-100 px-3 py-1.5 rounded-full">
                    حجم: {digitsEnToFa(perfume.volume)}ml
                  </span>

                  {/* Perfume Type Tag */}
                  <span className="text-xs font-medium text-[#343A40] bg-gray-100 px-3 py-1.5 rounded-full capitalize">
                    {perfume.perfumeType}
                  </span>
                </div>

                {/* Gender and Availability Tags */}
                <div className="flex justify-center gap-2">
                  {/* Gender Tag */}
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      perfume.gender === "unisex"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : perfume.gender === "male"
                        ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                        : "bg-pink-50 text-pink-700 border border-pink-200"
                    }`}
                  >
                    {perfume.gender === "unisex"
                      ? "یونی‌سکس"
                      : perfume.gender === "male"
                      ? "مردانه"
                      : "زنانه"}
                  </span>

                  {/* Availability Tag */}
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      perfume.available
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {perfume.available ? "موجود" : "ناموجود"}
                  </span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {/* Price */}
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-[#343A40]">
                    {formatPrice(perfume.price)}
                  </p>
                  <span className="text-sm text-gray-500">تومان</span>
                </div>

                {/* View Product Button */}
                <button className="bg-gradient-to-r from-[#343A40] to-[#495057] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-[#495057] hover:to-[#343A40] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#343A40] focus:ring-opacity-20 transform hover:scale-105 active:scale-95 cursor-pointer">
                  مشاهده محصول
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="pb-24 w-full flex justify-center items-center ">
        <button className="bg-gradient-to-r from-[#343A40] to-[#495057] text-white text-base font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-[#495057] hover:to-[#343A40] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#343A40] focus:ring-opacity-20 transform hover:scale-105 active:scale-95 cursor-pointer">
          مشاهده محصولات
        </button>
      </div>
    </>
  );
}

export default RandomProducts;
