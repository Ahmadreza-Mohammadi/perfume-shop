"use client";

import React, { useState } from "react";
import { Pagination, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";

function ProductSwiper({ product }: any) {
  const images = product?.image || [];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">تصویر موجود نیست</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Image Swiper */}
      <Swiper
        modules={[Pagination, Thumbs]}
        className="main-swiper w-full h-96 mb-4"
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/perfume-bottle-heart.svg";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        className="thumbs-swiper"
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 6,
          },
        }}
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="w-full h-20 cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-400 transition-all duration-200">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/perfume-bottle-heart.svg";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
