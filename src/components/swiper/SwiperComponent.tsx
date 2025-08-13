"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface Slide {
  id: number;
  title: string;
  image: string; // مسیر عکس
}

const slides: Slide[] = [
  { id: 1, title: "عطر شماره 1", image: "/armani.png" },
  { id: 2, title: "عطر شماره 2", image: "/chanel.png" },
  { id: 3, title: "عطر شماره 3", image: "/dior.png" },
];

export default function SwiperComponent() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Swiper
        dir="rtl"
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="swiper-container"
        breakpoints={{
          640: {
            spaceBetween: 30,
          },
          768: {
            spaceBetween: 40,
          },
          1024: {
            spaceBetween: 50,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
