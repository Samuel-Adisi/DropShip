import { useState } from "react";
import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import ProductCard from "../products/ProductCard";
import { mostReviewedProducts } from "../../data/products";



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
        {mostReviewedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}