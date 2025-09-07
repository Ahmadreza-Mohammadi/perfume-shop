"use client";

import React, { useState } from "react";
import { Pagination, Thumbs, Zoom } from "swiper/modules";
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
        modules={[Pagination, Thumbs, Zoom]}
        className="main-swiper w-full h-96 mb-4"
        spaceBetween={10}
        zoom={{ maxRatio: 2 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center swiper-zoom-container cursor-zoom-in">
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
        spaceBetween={16}
        slidesPerView={5}
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
            <div className="w-full h-20 mb-2 cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-600 transition-all duration-200">
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
