import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";

const products = [
  { id: 1, name: "Waterproof Microblading Pen", img: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&h=400&fit=crop", rating: 4, reviews: 2382, price: 19.97, original: 40.00, seller: "CreateConfidence", hasVideo: true },
  { id: 2, name: "Skin Tag Remover Patch (36 Pack)", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 14.97, original: 30.00, seller: "StayWell", hasVideo: false },
  { id: 3, name: "Washable Slingback Orthopedic Sandals", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 34.97, original: 70.00, seller: "StayWell", hasVideo: true },
  { id: 4, name: "12 Color Cream Texture Waterproof Lipstick -...", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 29.97, original: 60.00, seller: "CreateConfidence", hasVideo: false },
  { id: 5, name: "The Indestructible Trimmer", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 34.97, original: 70.00, seller: "GreatGadgets LLC", hasVideo: true },
  { id: 6, name: "Painless Skin Tag Removal Kit For Safe At Home Skin...", img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 47.97, original: 95.94, seller: "StayWell", hasVideo: true },
  { id: 7, name: "Led Flame Effect Light Bulb", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop", rating: 5, reviews: 472, price: 27.97, original: 60.00, seller: "HomeDecorAndMore LLC", hasVideo: true },
  { id: 8, name: "Orthopedic Seat Cushion For Hip Pain Relief &...", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 59.97, original: 120.00, seller: "WellnessPro", hasVideo: true },
  { id: 9, name: "Premium Stand Up Weed Puller Tool – Long Handle,...", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 24.97, original: 49.94, seller: "GardenPro", hasVideo: true },
  { id: 10, name: "Solar Water Fountain For Garden – Eco-Friendly...", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop", rating: 5, reviews: 1041, price: 29.97, original: 70.00, seller: "GardenPro", hasVideo: true },
  { id: 11, name: "Ergonomic Hip Cushion Posture Corrector –...", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", rating: 5, reviews: 406, price: 39.97, original: 80.00, seller: "WellnessPro", hasVideo: true },
  { id: 12, name: "Diy Glass Repair Kit, Restore Windshields &...", img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 18.97, original: 35.00, seller: "AutoGear", hasVideo: true },
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
    <div className="flex flex-col cursor-pointer group">
      <div className="relative overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
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

export default function RecentDiscoveries() {
  return (
    <section className="bg-white px-4 py-8 border-t border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Discoveries</h2>
        <div className="w-16 h-0.5 bg-red-500 mt-1 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => (
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