"use client";
import React, { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import ProductSpecs from "./ProductSpecs";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";
import { translateScentFamily, translateTone } from "../utils/helper";

interface ProductProps {
  id: string | number;
  product: {
    name: string;
    brand: string;
    tone: string;
    scentFamily: string;
    perfumer: string[];
    gender: string;
    perfumeType: string;
    season: string;
    longevity: string;
    sillage: string;
    available: boolean;
    discount: number;
    image: string[];
    description: string;
    variants: Array<{
      volume: number;
      price: number;
      quantity: number;
    }>;
  };
}


function Product({ id, product }: ProductProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Function to translate seasons to Persian
  const translateSeason = (season: string) => {
    const seasonMap: { [key: string]: string } = {
      Spring: "بهار",
      Summer: "تابستان",
      Autumn: "پاییز",
      Fall: "پاییز",
      Winter: "زمستان",
      "All Seasons": "همه فصول",
      Day: "روز",
      Night: "شب",
      Evening: "عصر",
    };

    return season
      .split(", ")
      .map((s) => seasonMap[s.trim()] || s.trim())
      .join("، ");
  };

  // Function to translate longevity to Persian
  const translateLongevity = (longevity: string) => {
    const longevityMap: { [key: string]: string } = {
      "Very Long Lasting": "خیلی ماندگار",
      Long: "ماندگار",
      Moderate: "متوسط",
      Short: "کم ماندگار",
    };
    return longevityMap[longevity] || longevity;
  };

  // Function to translate sillage to Persian
  const translateSillage = (sillage: string) => {
    const sillageMap: { [key: string]: string } = {
      Strong: "قوی",
      Moderate: "متوسط",
      Weak: "ضعیف",
      Intimate: "صمیمی",
    };
    return sillageMap[sillage] || sillage;
  };

 

  if (!product) {
    return (
      <div className="m-auto max-w-[1440px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            محصول یافت نشد
          </h2>
          <p className="text-gray-600">متأسفانه محصول مورد نظر یافت نشد.</p>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants?.[selectedVariant];
  const maxQuantity = currentVariant?.quantity || 0;

  const handleVariantChange = (index: number) => {
    setSelectedVariant(index);
    setQuantity(1); // Reset quantity when variant changes
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", {
      productId: id,
      variant: currentVariant,
      quantity: quantity,
    });
  };

  // fake related products: pick up to 4 from product images or fallback
  const related = (product?.image || [])
    .slice(0, 4)
    .map((img: string, idx: number) => ({
      id: `${id}-r${idx + 1}`,
      name: product.name,
      brand: product.brand,
      image: img,
    }));
  const variants = product?.product_variants;
  const prices = variants?.map((i: any) => i.price);
  console.log(prices);
  return (
    <div className="m-auto max-w-[1440px] min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.image || []} />
          <div className="mt-6 space-y-6">
            <ProductSpecs
              gender={product.gender}
              perfumeType={product.perfumeType}
              season={product.season}
              longevity={product.longevity}
              tone={product.tone}
              scentFamily={product.scentFamily}
              sillage={product.sillage}
              perfumer={product.perfumer}
              translate={{
                season: translateSeason,
                longevity: translateLongevity,
                sillage: translateSillage,
                tone: translateTone,
                scentFamily: translateScentFamily,
              }}
            />

            {product.description && (
              <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  توضیحات
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <RelatedProducts products={related} />
          </div>
        </div>

        {/* Sticky Info Column */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 self-start">
          <ProductInfo
            name={product.name}
            brand={product.brand}
            discount={product.discount}
            available={product.available}
            variants={product.variants}
            selectedVariantIndex={selectedVariant}
            onVariantChange={handleVariantChange}
          />
          <Reviews rating={4.6} count={132} />
          <ProductActions
            maxQuantity={maxQuantity}
            quantity={quantity}
            available={product.available}
            onChangeQuantity={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
