import { Link } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";


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





export default function ProductCard({ product }) {
  const savings = (product.original - product.price).toFixed(2);

  return (

    <Link to="/product/1">
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
    </Link>

  );
}