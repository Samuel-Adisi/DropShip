import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import ProductCard from "../products/ProductCard";
import { beautySellers,newArrivalSellers } from "../../data/products";






function BestSellerSection({ title, products }) {
  const scrollRef = useRef(null);

  const slideLeft = () => {
    scrollRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  };

  const slideRight = () => {
    scrollRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="py-8 border-b border-gray-100">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <div className="w-full h-0.5 bg-red-500 mt-1 rounded-full" />
          </div>
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            Up to 70% Off
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={slideLeft}
            className="border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center hover:border-[#008ecf] hover:text-[#008ecf] transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={slideRight}
            className="border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center hover:border-[#008ecf] hover:text-[#008ecf] transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable product row — no scrollbar */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar"
        style={{
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",      /* IE/Edge */
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Webkit scrollbar hide (inlined via a style tag would be ideal,
            but this className approach works with a global CSS rule) */}
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

      
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="bg-white px-6">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      <BestSellerSection title="Best Sellers in Beauty & Wellness" products={beautySellers} />
      <BestSellerSection title="Best Sellers in New Arrival" products={newArrivalSellers} />

      {/* Single button at the very bottom */}
      <div className="flex justify-end mt-4 pb-6">
        <button className="px-6 py-2 rounded-full border border-[#008ecf] text-[#008ecf] text-sm font-medium hover:bg-[#008ecf] hover:text-white transition-colors duration-200">
          Show me more
        </button>
      </div>
    </section>
  );
}