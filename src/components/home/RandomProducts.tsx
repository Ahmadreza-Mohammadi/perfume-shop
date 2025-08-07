import Image from "next/image";
import Img from "../../../public/armani.png";
import { perfumes } from "../constants/ProductsData";
import { digitsEnToFa, formatPrice } from "../utils/helper";

function RandomProducts() {
  return (
    <>
      <div className="w-full py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group relative"
          >
            {/* Image */}
            <div className="w-full h-72 relative bg-gray-50 flex items-center justify-center">
              <Image
                src={Img}
                alt={perfume.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
                style={{ objectPosition: "center" }}
              />
              {!perfume.available && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-red-500">
                    ناموجود
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-3">
              <div className="flex flex-col gap-2 it">
                <h2
                  className="text-xl font-bold text-gray-900 capitalize mb-1 truncate text-center"
                  title={perfume.name}
                >
                  {perfume.name}
                </h2>
                <p className="text-sm text-gray-500 capitalize mb-1 text-center">
                  {perfume.brand}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    حجم: {digitsEnToFa(perfume.volume)}ml
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full capitalize">
                    {perfume.perfumeType}
                  </span>
                </div>
                <div className="flex justify-between">
                  {/* Gender */}
                  <span
                    className={`mt-2 inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${
                      perfume.gender === "unisex"
                        ? "bg-blue-100 text-blue-600"
                        : perfume.gender === "male"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {perfume.gender === "unisex"
                      ? "یونی‌سکس"
                      : perfume.gender === "male"
                      ? "مردانه"
                      : "زنانه"}
                  </span>
                  {/* Availability */}
                  <span
                    className={`mt-2 inline-block w-fit text-xs font-bold px-3 py-1 rounded-full ${
                      perfume.available
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-600 border border-red-200"
                    }`}
                  >
                    {perfume.available ? "موجود" : "ناموجود"}
                  </span>
                </div>
              </div>
              {/* Price */}
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-extrabold text-gray-900">
                  {formatPrice(perfume.price)}{" "}
                  <span className="text-base font-medium text-gray-500">
                    تومان
                  </span>
                </p>
                <button className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 cursor-pointer rounded-full shadow hover:bg-gray-700 transition-colors duration-200 focus:outline-none">
                  مشاهده محصول
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pb-24 w-full flex justify-center items-center">
        <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white cursor-pointer text-base font-bold px-8 py-3 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-900 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
          مشاهده محصولات
        </button>
      </div>
    </>
  );
}

export default RandomProducts;
