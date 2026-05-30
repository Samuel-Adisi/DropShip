import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";

const beautySellers = [
  { name: "Resistance Ring Comprehensive Body...", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 24.97, original: 35.00, savings: 10.03, seller: "StayWell", hasVideo: false },
  { name: "Invisible Face Lifter Tape", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop", rating: 4, reviews: 0, price: 21.97, original: 40.00, savings: 18.03, seller: "CreateConfidence", hasVideo: false },
  { name: "Power Knee Stabilizer Pads For Pain Relief &...", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", rating: 4, reviews: 151, price: 49.97, original: 100.00, savings: 50.03, seller: "StayWell", hasVideo: true },
  { name: "Nasal Dilator, Silicone Nose Clip Stop Snore Aid...", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 27.97, original: 55.94, savings: 27.97, seller: "Healfit Counter", hasVideo: false, variants: "3 colors" },
  { name: "Waterproof Eyebrow Pen With 4 Split Tip, Long-...", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 29.97, original: 59.94, savings: 29.97, seller: "Frasier Beauty", hasVideo: false, variants: "5 colors" },
  { name: "Adjustable Shoulder Posture Brace, Posture...", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 44.97, original: 89.94, savings: 44.97, seller: "Healfit Counter", hasVideo: true, variants: "2 colors, 5 sizes" },
  { name: "Painless Skin Tag Kit For Safe At Ho...", img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 47.97, original: 95.94, savings: 47.97, seller: "StayWell", hasVideo: false },
];

const newArrivalSellers = [
  { name: "Smart LCD Aquarium Thermometer With...", img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 19.97, original: 40.00, savings: 20.03, seller: "AquaLife", hasVideo: false, variants: "2 colors" },
  { name: "7 Color LED Face Mask For Skin Rejuvenation And...", img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 49.97, original: 100.00, savings: 50.03, seller: "GlowUp", hasVideo: false, variants: "2 colors" },
  { name: "Leg Roller Massager For Calf, Thigh & Muscle...", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 34.97, original: 70.00, savings: 35.03, seller: "WellnessPro", hasVideo: false, variants: "3 colors" },
  { name: "LED Eyebrow Trimmer & Precision Eyelash Curler...", img: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 31.97, original: 63.94, savings: 31.97, seller: "BeautyTools", hasVideo: false },
  { name: "Smart LED Digital Wall Clock With Weather...", img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 44.97, original: 89.94, savings: 44.97, seller: "SmartHome", hasVideo: false, variants: "3 colors" },
  { name: "Whale Smart Baby Bath Thermometer With LED...", img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 27.97, original: 55.94, savings: 27.97, seller: "BabyGear", hasVideo: false, variants: "2 colors" },
  { name: "Smart E Wristbo...", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 39.97, original: 79.94, savings: 39.97, seller: "TechWear", hasVideo: false, variants: "2 colors" },
];

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ))}
      {reviews > 0 && (
        <span className="text-[#008ecf] text-xs ml-1">{reviews}</span>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="flex flex-col cursor-pointer group shrink-0 w-48">
      {/* Variants */}
      {product.variants && (
        <p className="text-xs text-gray-500 mb-1">{product.variants}</p>
      )}

      {/* Image */}
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

      {/* Info */}
      <div className="pt-2">
        <p className="text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-[#008ecf] transition-colors">
          {product.name}
        </p>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[#008ecf] font-bold text-base">
            ${Math.floor(product.price)}
            <sup className="text-xs font-bold">
              .{String(product.price.toFixed(2)).split(".")[1]}
            </sup>
          </span>
          <span className="text-gray-400 text-sm line-through">
            ${product.original.toFixed(2)}
          </span>
        </div>
        <p className="text-green-500 text-xs font-semibold mt-0.5">
          You save ${product.savings.toFixed(2)}
        </p>
        <p className="text-gray-400 text-xs mt-0.5">{product.seller}</p>
      </div>
    </div>
  );
}

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