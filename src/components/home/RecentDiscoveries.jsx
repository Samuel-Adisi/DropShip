import { StarIcon, PlayIcon } from "@heroicons/react/24/solid";
import ProductCard from "../products/ProductCard";
import { RecentDiscoveries as RecentDiscoveriesData} from "../../data/products";


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
        {RecentDiscoveriesData.map((product) => (
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