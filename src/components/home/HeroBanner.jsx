import { useState, useEffect } from "react";
import { ShieldCheckIcon, LockClosedIcon, CreditCardIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const categories = [
  { name: "Father's Day Deals", label: "Up to 70% off →", special: true, img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop" },
  { name: "Unique Gift Ideas For Everyone", label: "Shop now →", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop" },
  { name: "Solar Garden Decor", label: "Shop now →", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" },
  { name: "Kitchen & Dining", label: "Shop now →", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
  { name: "Gifts For Him", label: "Shop now →", img: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=200&h=200&fit=crop" },
  { name: "Gifts For Her", label: "Shop now →", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" },
  { name: "Women's Clothing", label: "Shop now →", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop" },
  { name: "Skin Care", label: "Shop now →", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop" },
  { name: "Toys", label: "Shop now →", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop", centered: true },
];

function useCountdown() {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    const diff = end - now;
    return {
      hours: Math.floor((diff / 1000 / 60 / 60) % 24).toString().padStart(2, "0"),
      minutes: Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, "0"),
      seconds: Math.floor((diff / 1000) % 60).toString().padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function HeroBanner() {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold text-gray-900 mb-8">
          Buy Creative Products Online From Small Business Owners at Inspire Uplift Marketplace!
        </h1>

           {/* Category Circles */}
<div className="grid grid-cols-8 gap-6">
  {categories.slice(0, 8).map((cat, i) => (
    <div
      key={i}
      className="flex flex-col items-center cursor-pointer group"
    >
      <div className={`w-36 h-36 rounded-full overflow-hidden mb-3 
        ${cat.special
          ? "ring-4 ring-offset-2 ring-pink-500"
          : "ring-2 ring-gray-200 group-hover:ring-[#008ecf]"
        } transition-all duration-200`}
      >
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-sm font-bold text-gray-800 text-center max-w-[130px]">
        {cat.name}
      </p>
      <p className={`text-xs mt-0.5 font-medium ${cat.special ? "text-green-500" : "text-gray-500 group-hover:text-[#008ecf]"}`}>
        {cat.label}
      </p>
    </div>
  ))}
</div>

{/* Last centered item - Toys */}
<div className="flex justify-center mt-6">
  <div className="flex flex-col items-center cursor-pointer group">
    <div className="w-36 h-36 rounded-full overflow-hidden mb-3 ring-2 ring-gray-200 group-hover:ring-[#008ecf] transition-all duration-200">
      <img
        src={categories[8].img}
        alt={categories[8].name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <p className="text-sm font-bold text-gray-800 text-center max-w-[130px]">
      {categories[8].name}
    </p>
    <p className="text-xs mt-0.5 font-medium text-gray-500 group-hover:text-[#008ecf]">
      {categories[8].label}
    </p>
  </div>
</div>

      </div>

      

    </section>
  );
}