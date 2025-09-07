"use client";
import React, { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import ProductSpecs from "./ProductSpecs";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";

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

  // Function to translate tone to Persian
  const translateTone = (tone: string) => {
    const toneMap: { [key: string]: string } = {
      "Fresh & Aquatic": "تازه و آبی",
      "Woody & Spicy": "چوبی و تند",
      "Floral & Fresh": "گلی و تازه",
      "Sweet & Oriental": "شیرین و شرقی",
      "Warm & Spicy": "گرم و تند",
      "Citrus & Fresh": "مرکبات و تازه",
      "Floral & Woody": "گلی و چوبی",
      "Woody & Aromatic": "چوبی و معطر",
      "Spicy & Woody": "تند و چوبی",
      "Floral & Fruity": "گلی و میوه‌ای",
      "Citrus & Floral": "مرکبات و گلی",
      "Oriental & Woody": "شرقی و چوبی",
      "Fresh & Spicy": "تازه و تند",
      "Woody & Fresh": "چوبی و تازه",
      "Floral & Oriental": "گلی و شرقی",
      "Aromatic & Fresh": "معطر و تازه",
      "Woody & Oriental": "چوبی و شرقی",
      "Fresh & Woody": "تازه و چوبی",
      "Spicy & Oriental": "تند و شرقی",
      "Oriental & Spicy": "شرقی و تند",
      "Cool & Bitter": "خنک و تلخ",
      "Fresh & Aromatic": "تازه و معطر",
      "Warm & Sweet": "گرم و شیرین",
      "Fresh & Sweet": "تازه و شیرین",
      "Fresh & Fruity": "تازه و میوه‌ای",
      "Fresh & Citrusy": "تازه و مرکبات",
      "Fresh & Citrus": "تازه و مرکبات",
      "Warm & Woody": "گرم و چوبی",
      "Cool & Fresh": "خنک و تازه",
      "Sweet & Fruity": "شیرین و میوه‌ای",
      "Spicy & Sweet": "تند و شیرین",
      "Woody & Sweet": "چوبی و شیرین",
      "Fresh & Green": "تازه و سبز",
      "Warm & Oriental": "گرم و شرقی",
      "Cool & Aquatic": "خنک و آبی",
      "Floral & Sweet": "گلی و شیرین",
      "Aromatic & Spicy": "معطر و تند",
      "Oriental & Sweet": "شرقی و شیرین",
    };
    return toneMap[tone] || tone;
  };

  // Function to translate scent family to Persian
  const translateScentFamily = (scentFamily: string) => {
    const scentFamilyMap: { [key: string]: string } = {
      "Aromatic Aquatic": "معطر آبی",
      "Woody Spicy": "چوبی تند",
      Floral: "گلی",
      "Oriental Woody": "شرقی چوبی",
      "Amber Vanilla": "کهربا وانیل",
      "Woody Aromatic": "چوبی معطر",
      "Floral Woody": "گلی چوبی",
      "Oriental Spicy": "شرقی تند",
      "Citrus Aromatic": "مرکبات معطر",
      "Floral Fruity": "گلی میوه‌ای",
      "Woody Oriental": "چوبی شرقی",
      "Amber Spicy": "کهربا تند",
      "Citrus Floral": "مرکبات گلی",
      "Oriental Floral": "شرقی گلی",
      "Aromatic Fresh": "معطر تازه",
      "Woody Fresh": "چوبی تازه",
      "Spicy Oriental": "تند شرقی",
      "Fresh Oriental": "تازه شرقی",
      "Floral Oriental": "گلی شرقی",
      "Aromatic Woody": "معطر چوبی",
      "Fresh Aquatic": "تازه آبی",
      "Warm Spicy": "گرم تند",
      "Cool Fresh": "خنک تازه",
      "Sweet Oriental": "شیرین شرقی",
      "Floral Spicy": "گلی تند",
      "Oriental Fresh": "شرقی تازه",
      "Aromatic Oriental": "معطر شرقی",
      "Fresh Woody": "تازه چوبی",
      "Spicy Fresh": "تند تازه",
    };
    return scentFamilyMap[scentFamily] || scentFamily;
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
