"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Dior from "../../../public/dior.png";
import armani from "../../../public/armani.png";
import versace from "../../../public/versace.png";
import montBlanc from "../../../public/montblanc.png";
import ysl from "../../../public/ysl.png";
import chanel from "../../../public/chanel.png";
import LV from "../../../public/LV.png";
import lalique from "../../../public/lalique.png";

// Brand data structure for easy customization
const brandData = [
  { image: Dior, name: "Dior" },
  { image: armani, name: "Armani" },
  { image: versace, name: "Versace" },
  { image: LV, name: "LV" },
  { image: ysl, name: "YSL" },
  { image: chanel, name: "Chanel" },
  { image: montBlanc, name: "Mont Blanc" },
  { image: lalique, name: "Lalique" },
];

function TopBrands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse/Touch event handlers for smooth dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel event for smooth scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY * 0.5;
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="top-brands-container">
      <div
        ref={containerRef}
        className={`brands-gallery ${isDragging ? "grabbing" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Duplicate brands for infinite scroll effect */}
        {[...brandData, ...brandData, ...brandData].map((brand, index) => (
          <div key={`${brand.name}-${index}`} className="brand-item">
            <div className="brand-image-container">
              <Image
                src={brand.image}
                alt={brand.name}
                className="brand-image"
                width={80}
                height={80}
              />
              <div className="brand-overlay">
                <span className="brand-name">{brand.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBrands;
