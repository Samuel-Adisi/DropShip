import { useState } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";

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

const products = [
  {
    id: 1,
    name: "H2o Fruit Infusion Water Bottle - Perfect Gift For...",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 49,
    price: 24.97,
    original: 50.0,
    seller: "KitchenCuration",
    hasVideo: false,
  },
  {
    id: 2,
    name: "Holidays Booze Ornament Balls",
    img: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=400&h=400&fit=crop",
    rating: 4,
    reviews: 34,
    price: 19.97,
    original: 40.0,
    seller: "HomeDecorAndMore LLC",
    hasVideo: false,
  },
  {
    id: 3,
    name: "Sink Glass Cleaner Brush",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 19.97,
    original: 40.0,
    seller: "KitchenCuration",
    hasVideo: true,
  },
  {
    id: 4,
    name: "Luxury Marble Finish Epoxy Floor Coating Kit For...",
    img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 141.97,
    original: 283.94,
    seller: "Uplift Treasures",
    hasVideo: false,
  },
  {
    id: 5,
    name: "Portable Mattress Lifter Ergonomic Bed Aid For...",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 27.97,
    original: 55.94,
    seller: "Trendy Discount Goods",
    hasVideo: true,
  },
  {
    id: 6,
    name: "Combination Barn Door Lock, Sliding Deadbolt...",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 99.99,
    original: 199.98,
    seller: "Inspired Finds",
    hasVideo: false,
  },
  {
    id: 7,
    name: "Eco Elegance - All-Natural 2-In-1 Beeswax Furniture...",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 21.99,
    original: 43.97,
    seller: "HomeDecorAndMore LLC",
    hasVideo: false,
  },
  {
    id: 8,
    name: "Wall Mounted Desktop Heater And Fan Combo F...",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 129.97,
    original: 259.94,
    seller: "Inspired Finds",
    hasVideo: false,
  },
  {
    id: 9,
    name: "5000w Vertical Wind Turbine Generator –...",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 449.97,
    original: 899.94,
    seller: "Inspired Finds",
    hasVideo: false,
  },
  {
    id: 10,
    name: "Smarttwo-Way Pet Door - Secure Cat & Dog Flap Fo...",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 24.97,
    original: 49.94,
    seller: "Inspired Living",
    hasVideo: false,
  },
  {
    id: 11,
    name: "Multifunction Magic Broom For Sweeping And Wiping",
    img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 22.97,
    original: 35.0,
    seller: "HomeDecorAndMore LLC",
    hasVideo: true,
  },
  {
    id: 12,
    name: "Vertical Wind Turbine Generator With Mppt...",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 0,
    price: 449.97,
    original: 899.94,
    seller: "Inspire Essentials",
    hasVideo: false,
  },
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

function ProductCard({ product }) {
  const savings = (product.original - product.price).toFixed(2);

  return (
    <div className="flex flex-col cursor-pointer group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.hasVideo && (
          <div className="absolute bottom-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center">
            <PlayIcon className="w-4 h-4 text-white ml-0.5" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-2">
        {/* Name */}
        <p className="text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-[#008ecf] transition-colors">
          {product.name}
        </p>

        {/* Stars */}
        <StarRating rating={product.rating} reviews={product.reviews} />

        {/* Price */}
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

        {/* Savings */}
        <p className="text-green-500 text-xs font-semibold mt-0.5">
          You save ${savings}
        </p>

        {/* Seller */}
        <p className="text-gray-400 text-xs mt-0.5">{product.seller}</p>
      </div>
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