import { useRef } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import ProductCard from "../products/ProductCard";

// In a real app this would come from localStorage or user session.
// For now, seeded with one product to match the screenshot.
const recentlyViewed = [
  {
    id: 1,
    name: "IPL Hair Removal Handset System – A Laser-Free...",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 25,
    price: 89.97,
    original: 180.00,
    seller: "CreateConfidence",
    hasVideo: false,
  },
];




export default function RecentlyViewed({ title = "Recent Items Viewed By You" }) {
  const scrollRef = useRef(null);

  if (recentlyViewed.length === 0) return null;

  return (
      <section className="bg-white px-4 py-8 border-t border-gray-100">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="w-16 h-0.5 bg-red-500 mt-1 rounded-full" />
        </div>
  
        {/* Grid */}
        <div className="grid grid-cols-6 gap-4">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
  
        {/* Show me more — bottom center */}
        <div className="flex justify-center mt-8">
          <button className="px-8 py-2.5 rounded-full border border-[#008ecf] text-[#008ecf] text-sm font-medium hover:bg-[#008ecf] hover:text-white transition-colors duration-200">
            Show me more
          </button>
        </div>
      </section>
    );
}