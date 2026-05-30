import { useState } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";

const products = [
  { id: 1, name: "Portable Nontoxic Fly Mosquito Trap", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop", rating: 5, reviews: 21, price: 19.97, original: 40.00, seller: "GreatGadgets LLC", hasVideo: false },
  { id: 2, name: "Magic Mirror Anti-Fog Shield", img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop", rating: 5, reviews: 21, price: 14.97, original: 30.00, seller: "GreatGadgets LLC", hasVideo: false },
  { id: 3, name: "Ipl Hair Removal Handset System – A Laser-Free...", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop", rating: 5, reviews: 25, price: 89.97, original: 180.00, seller: "CreateConfidence", hasVideo: true },
  { id: 4, name: "Food Preservation Tray (2 Pack) - Reusable, Airtight...", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", rating: 5, reviews: 26, price: 29.97, original: 60.00, seller: "KitchenCuration", hasVideo: true },
  { id: 5, name: "Smart Chopping And Strainer Bowl - Multi-...", img: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=400&h=400&fit=crop", rating: 5, reviews: 34, price: 39.97, original: 80.00, seller: "KitchenCuration", hasVideo: true },
  { id: 6, name: "Collapsible Storage Chopping Board", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 29.97, original: 60.00, seller: "KitchenCuration", hasVideo: true },
  { id: 7, name: "Space Projector Lamp - Rotating Universe Light F...", img: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=400&h=400&fit=crop", rating: 5, reviews: 111, price: 19.97, original: 40.00, seller: "GlowUp", hasVideo: false },
  { id: 8, name: "Led Lighted Crochet Hook Set - Light Up Your...", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 24.97, original: 50.00, seller: "CraftSupplies", hasVideo: false },
  { id: 9, name: "Real Jade Facial Roller And Gua Sha Set", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 29.97, original: 60.00, seller: "BeautyTools", hasVideo: false },
  { id: 10, name: "Portable Mobile Iminimic", img: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=400&h=400&fit=crop", rating: 4, reviews: 0, price: 19.97, original: 40.00, seller: "TechWear", hasVideo: false },
  { id: 11, name: "Car Windshield Easy Ice Scraper Tool", img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 14.97, original: 30.00, seller: "AutoGear", hasVideo: false },
  { id: 12, name: "Cork Wine Bottle String Light", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop", rating: 5, reviews: 0, price: 12.97, original: 25.00, seller: "HomeDecorAndMore LLC", hasVideo: false },
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

export default function MostReviewed() {
  return (
    <section className="bg-white px-4 py-8 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Most Reviewed Items</h2>
          <div className="w-16 h-0.5 bg-red-500 mt-1 rounded-full" />
        </div>
        
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}