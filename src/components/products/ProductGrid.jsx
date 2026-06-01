import { useState } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import { products } from "../../data/products";
import ProductCard from "./ProductCard";

const filterTabs = [
  "Home Improvement",
  "Home Decor",
  "Bathroom Decor, Linens & Hardware",
  "Pet Clothing & Accessories",
  "Fashion Accessories",
  "Decorative Objects",
  "Cell Phone Accessories",
  "Cutters & Slicers",
];


function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      {reviews > 0 && (
        <span className="text-[#008ecf] text-xs ml-1">{reviews}</span>
      )}
    </div>
  );
}


export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState(0);

  return (
     <section className="px-4 py-8">

      {/* Section Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          Top Trending Products You Can't Miss
        </h2>
        <div className="w-16 h-1 bg-red-500 mt-1 rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {filterTabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap
              ${activeTab === i
                ? "bg-[#008ecf] text-white border-[#008ecf]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#008ecf] hover:text-[#008ecf]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid - 6 columns */}
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}