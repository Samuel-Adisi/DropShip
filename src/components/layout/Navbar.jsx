import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, UserCircleIcon, ShoppingCartIcon, Bars3Icon, MapPinIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdLocalShipping, MdPeople, MdChat, MdSecurity } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const slidingMessages = [
  { icon: <MdPeople className="text-white text-lg" />, text: "Served 2,000,000 Customers" },
  { icon: <MdSecurity className="text-yellow-400 text-lg" />, text: "Secure Payments" },
  { icon: <MdLocalShipping className="text-white text-lg" />, text: "Easy Returns & Refunds" },
  { icon: <FaStar className="text-yellow-400 text-lg" />, text: "70,000+ Verified Reviews" },
];

export default function Navbar() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % slidingMessages.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full font-sans">

      {/* ── Top Black Announcement Bar ── */}
      <div className="bg-black text-white text-sm py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-2">
            <MdLocalShipping className="text-green-400 text-xl" />
            <span className="text-green-400 font-semibold">Free Shipping</span>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-gray-600" />

          {/* Center — Animated */}
          <div className="flex items-center justify-center h-6 overflow-hidden">
            <div
              className="flex items-center gap-2"
              style={{
                transform: animating ? "translateY(-120%)" : "translateY(0%)",
                opacity: animating ? 0 : 1,
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              {slidingMessages[currentMessage].icon}
              <span className="font-semibold text-white">
                {slidingMessages[currentMessage].text}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-gray-600" />

          {/* Right */}
          <div className="flex items-center gap-2">
            <MdChat className="text-yellow-400 text-xl" />
            <span className="font-semibold">24/7 Live Chat</span>
          </div>

        </div>
      </div>

      {/* ── Main Blue Navbar ── */}
      <div className="bg-[#008ecf] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-5">

          {/* Hamburger */}
          <button>
            <Bars3Icon className="w-7 h-7 text-white" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className="text-white font-extrabold text-2xl leading-tight tracking-tight">
              <span className="block">Inspire</span>
              <span className="block">Uplift</span>
            </div>
            <div className="text-xs text-white/90 leading-tight">
              <div>Deliver to</div>
              <div className="flex items-center gap-0.5 font-bold text-white">
                <MapPinIcon className="w-3 h-3" />
                <span>Ghana</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-white rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="flex-1 px-5 py-2.5 text-gray-700 text-sm outline-none bg-transparent"
            />
            <button className="bg-[#008ecf] hover:bg-[#0077b3] px-5 py-2.5 transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Verified Reviews */}
          <div className="hidden lg:flex items-center gap-1.5 min-w-fit text-white">
            <FaStar className="text-yellow-400 text-lg" />
            <span className="font-bold text-yellow-400">70k+</span>
            <span className="text-sm">Verified Reviews</span>
          </div>

          {/* 24/7 Help */}
          <button className="hidden lg:flex items-center gap-1 text-white min-w-fit">
            <span className="text-sm font-semibold">24/7 Help</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {/* Start Selling */}
          <button className="hidden lg:block border-2 border-white text-white px-5 py-1.5 rounded-full text-sm font-bold hover:bg-white hover:text-[#008ecf] transition-all duration-200 min-w-fit">
            Start Selling
          </button>

          {/* User + Cart */}
          <div className="flex items-center gap-4 ml-2">
            <button>
              <UserCircleIcon className="w-7 h-7 text-white" />
            </button>
            <button className="relative">
              <ShoppingCartIcon className="w-7 h-7 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

    </header>
  );
}