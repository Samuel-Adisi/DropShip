import { useRef } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";

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

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} className={`w-3.5 h-3.5 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} />
      ))}
      {reviews > 0 && <span className="text-[#008ecf] text-xs ml-1">{reviews}</span>}
    </div>
  );
}

function ProductCard({ product }) {
  const savings = (product.original - product.price).toFixed(2);
  return (
    <div className="flex flex-col cursor-pointer group shrink-0 w-48">
      <div className="relative overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.img}
          alt={product.name}
          className="w-48 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.hasVideo && (
          <div className="absolute bottom-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center">
            <PlayIcon className="w-4 h-4 text-white ml-0.5" />
          </div>
        )}
      </div>
      <div className="pt-2">
        <p className="text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-[#008ecf] transition-colors">
          {product.name}
        </p>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[#008ecf] font-bold text-base">
            ${Math.floor(product.price)}
            <sup className="text-xs font-bold">.{String(product.price.toFixed(2)).split(".")[1]}</sup>
          </span>
          <span className="text-gray-400 text-sm line-through">${product.original.toFixed(2)}</span>
        </div>
        <p className="text-green-500 text-xs font-semibold mt-0.5">You save ${savings}</p>
        <p className="text-gray-400 text-xs mt-0.5">{product.seller}</p>
      </div>
    </div>
  );
}

export default function RecentlyViewed() {
  const scrollRef = useRef(null);

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="bg-white px-4 py-8 border-t border-gray-100">
      <style>{`.rv-scroll::-webkit-scrollbar { display: none; }`}</style>

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
        <div className="w-16 h-0.5 bg-red-500 mt-1 rounded-full" />
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="rv-scroll flex gap-3 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}