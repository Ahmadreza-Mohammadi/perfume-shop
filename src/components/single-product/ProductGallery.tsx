"use client";
import React from "react";
import ProductSwiper from "../swiper/ProductSwiper";

interface ProductGalleryProps {
  images: string[];
}

function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden p-2 sm:p-3">
        <ProductSwiper product={{ image: images }} />
      </div>
    </div>
  );
}

export default ProductGallery;
