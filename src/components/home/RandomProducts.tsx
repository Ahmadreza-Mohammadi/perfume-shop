import Image from "next/image";
import Img from "../../../public/armani.png";
import { perfumes } from "../constants/ProductsData";
import { digitsEnToFa, formatPrice } from "../utils/helper";

function RandomProducts() {
  return (
    <div className="w-full py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {perfumes.map((perfume) => (
        <div
          key={perfume.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Image */}
          <div className="w-full h-64 relative">
            <Image
              src={Img}
              alt={perfume.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
            />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col justify-between flex-grow">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {perfume.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                برند: {perfume.brand}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">
                  حجم: {digitsEnToFa(perfume.volume)}ml
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {perfume.perfumeType}
                </span>
              </div>

              {/* Gender */}
              <span className="mt-2 inline-block w-fit text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {perfume.gender === "unisex"
                  ? "یونی‌سکس"
                  : perfume.gender === "male"
                  ? "مردانه"
                  : "زنانه"}
              </span>

              {/* Availability */}
              <span
                className={`mt-2 inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${
                  perfume.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {perfume.available ? "موجود" : "ناموجود"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-md font-bold text-gray-800">
                {formatPrice(perfume.price)} تومان
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RandomProducts;
