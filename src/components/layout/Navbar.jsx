import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon, UserCircleIcon, ShoppingCartIcon,
  Bars3Icon, MapPinIcon, ChevronDownIcon, XMarkIcon,
  PhoneIcon, ChatBubbleLeftRightIcon, EnvelopeIcon,
  ChevronRightIcon, FireIcon, SparklesIcon,
} from "@heroicons/react/24/outline";
import { MdLocalShipping, MdPeople, MdChat, MdSecurity } from "react-icons/md";
import { FaStar, FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const slidingMessages = [
  { icon: <MdPeople className="text-white text-lg" />, text: "Served 2,000,000 Customers" },
  { icon: <MdSecurity className="text-yellow-400 text-lg" />, text: "Secure Payments" },
  { icon: <MdLocalShipping className="text-white text-lg" />, text: "Easy Returns & Refunds" },
  { icon: <FaStar className="text-yellow-400 text-lg" />, text: "70,000+ Verified Reviews" },
];

const countries = [
  "Ghana", "Nigeria", "Kenya", "South Africa", "United States",
  "United Kingdom", "Canada", "Australia", "Germany", "France",
  "India", "Brazil", "UAE", "Singapore", "Netherlands",
];

const categories = [
  "Home & Garden", "Beauty & Personal Care", "Jewelry & Accessories",
  "Toys & Games", "Sports & Outdoors", "Electronics", "Pet Supplies",
  "Kitchen & Dining", "Health & Wellness", "Automotive",
];

function useModalClose(ref, isOpen, onClose) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, ref, onClose]);
}

export default function Navbar() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [cartCount] = useState(0);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Ghana");

  const authRef = useRef(null);
  const helpRef = useRef(null);
  const locationRef = useRef(null);
  const sidebarRef = useRef(null);

  useModalClose(authRef, showAuthModal, () => setShowAuthModal(false));
  useModalClose(helpRef, showHelpModal, () => setShowHelpModal(false));
  useModalClose(locationRef, showLocationModal, () => setShowLocationModal(false));
  useModalClose(sidebarRef, showSidebar, () => setShowSidebar(false));

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

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showSidebar]);

  return (
    <>
      <header className="w-full font-sans">

        {/* ── Top Black Announcement Bar ── */}
        <div className="bg-black text-white text-sm py-2 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdLocalShipping className="text-green-400 text-xl" />
              <span className="text-green-400 font-semibold">Free Shipping</span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
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
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-2">
              <MdChat className="text-yellow-400 text-xl" />
              <span className="font-semibold">24/7 Live Chat</span>
            </div>
          </div>
        </div>

        {/* ── Main Blue Navbar ── */}
        <div className="bg-[#008ecf] py-3 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-5">

            {/* Hamburger — opens sidebar */}
            <button onClick={() => setShowSidebar(true)}>
              <Bars3Icon className="w-7 h-7 text-white" />
            </button>

            {/* Logo + Location */}
            <div className="flex items-center gap-3 min-w-fit">
              <div className="text-white font-extrabold text-2xl leading-tight tracking-tight">
                <span className="block">ShopLine</span>
              </div>
              <button
                onClick={() => setShowLocationModal(true)}
                className="text-xs text-white/90 leading-tight text-left hover:opacity-80 transition-opacity"
              >
                <div>Deliver to</div>
                <div className="flex items-center gap-0.5 font-bold text-white">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{selectedCountry}</span>
                </div>
              </button>
            </div>

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

            <div className="hidden lg:flex items-center gap-1.5 min-w-fit text-white">
              <FaStar className="text-yellow-400 text-lg" />
              <span className="font-bold text-yellow-400">70k+</span>
              <span className="text-sm">Verified Reviews</span>
            </div>

            <button
              onClick={() => setShowHelpModal(true)}
              className="hidden lg:flex items-center gap-1 text-white min-w-fit hover:opacity-80 transition-opacity"
            >
              <span className="text-sm font-semibold">24/7 Help</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            <Link to="/seller-login/">
              <button className="hidden lg:block border-2 border-white text-white px-5 py-1.5 rounded-full text-sm font-bold hover:bg-white hover:text-[#008ecf] transition-all duration-200 min-w-fit">
                Start Selling
              </button>
            </Link>

            <div className="flex items-center gap-4 ml-2">
              <button onClick={() => setShowAuthModal(true)}>
                <UserCircleIcon className="w-7 h-7 text-white" />
              </button>
              <Link to="/cart/">
                <button className="relative">
                  <ShoppingCartIcon className="w-7 h-7 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          SIDEBAR DRAWER
      ══════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{
          opacity: showSidebar ? 1 : 0,
          pointerEvents: showSidebar ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
        style={{ transform: showSidebar ? "translateX(0)" : "translateX(-100%)" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <span className="text-lg font-extrabold text-gray-900">ShopLine</span>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-1">

          {/* ── Categories ── */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</p>
          {categories.map((cat) => (
            <button
              key={cat}
              className="w-full flex items-center justify-between py-3 border-b border-gray-100 text-sm font-medium text-gray-800 hover:text-[#008ecf] transition-colors group"
            >
              <span>{cat}</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#008ecf] transition-colors" />
            </button>
          ))}

          {/* ── Inspiration ── */}
          <div className="pt-5 pb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Inspiration</p>
            <button className="w-full flex items-center gap-3 py-3 text-sm font-medium text-gray-800 hover:text-[#008ecf] transition-colors">
              <FireIcon className="w-5 h-5 text-orange-400" />
              Today's Top Sellers
            </button>
            <button className="w-full flex items-center gap-3 py-3 text-sm font-medium text-gray-800 hover:text-[#008ecf] transition-colors">
              <SparklesIcon className="w-5 h-5 text-purple-400" />
              New & Interesting Finds
            </button>
          </div>

          {/* ── Customer Support ── */}
          <div className="rounded-2xl bg-[#e8f7f5] p-4 mt-2">
            <div className="flex items-center gap-2 mb-4">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#008ecf]" />
              <span className="text-sm font-bold text-[#008ecf]">Customer Support</span>
            </div>

            {/* Live Chat */}
            <button className="w-full flex items-center gap-3 bg-white rounded-xl p-3 mb-2 hover:shadow-sm transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">Live Chat</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Available 24/7
                </p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </button>

            {/* Email Us */}
            <button className="w-full flex items-center gap-3 bg-white rounded-xl p-3 mb-2 hover:shadow-sm transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <EnvelopeIcon className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">Email Us</p>
                <p className="text-xs text-gray-500">contact@shopline.com</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </button>

            {/* Phone */}
            <button className="w-full flex items-center gap-3 bg-white rounded-xl p-3 mb-4 hover:shadow-sm transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <PhoneIcon className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">1-877-780-2973</p>
                <p className="text-xs text-gray-500">Mon–Fri, 9am–10pm EST</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </button>

            {/* Support Links */}
            {["Track My Order", "Help Desk & FAQs", "Returns & Exchanges"].map((item) => (
              <button
                key={item}
                className="flex items-center gap-2 text-sm text-[#008ecf] font-medium py-1 hover:underline"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008ecf] inline-block" />
                {item}
              </button>
            ))}
          </div>

          {/* ── App Store Buttons ── */}
          <div className="pt-4 space-y-2">
            <button className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 px-4 hover:bg-gray-900 transition-colors">
              <FaApple className="text-2xl" />
              <div className="text-left">
                <p className="text-[10px] leading-none text-gray-300">Download on the</p>
                <p className="text-base font-bold leading-tight">App Store</p>
              </div>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 px-4 hover:bg-gray-900 transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M3 20.5v-17l13.5 8.5L3 20.5z" fill="#4CAF50" />
                <path d="M3 3.5l10 10L3 20.5V3.5z" fill="#2196F3" />
                <path d="M3 20.5l10-7 3.5 2.2L3 20.5z" fill="#F44336" />
                <path d="M3 3.5l13.5 8.5-3.5 2.2L3 3.5z" fill="#FFC107" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none text-gray-300">GET IT ON</p>
                <p className="text-base font-bold leading-tight">Google Play</p>
              </div>
            </button>
          </div>

          {/* ── Services ── */}
          <div className="pt-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Services</p>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-[#008ecf] transition-colors py-1">
              🛍️ Sell with ShopLine
            </button>
          </div>

          {/* ── Company ── */}
          <div className="pt-4 pb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Company</p>
            <button className="flex items-center text-sm font-medium text-gray-800 hover:text-[#008ecf] transition-colors py-1">
              About
            </button>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          MODAL — Sign In
      ══════════════════════════════════════ */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div ref={authRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign In</h2>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Email</label>
              <input type="email" placeholder="Enter your email" className="w-full border-2 border-[#008ecf] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none" />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Password</label>
              <input type="password" placeholder="Enter your password" className="w-full border-2 border-[#008ecf] rounded-lg px-4 py-3 text-sm text-gray-700 outline-none" />
            </div>
            <div className="mb-5">
              <button className="text-sm text-[#008ecf] hover:underline font-medium">Forgot password?</button>
            </div>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              By clicking Sign In you agree to ShopLine's{" "}
              <span className="text-[#008ecf] cursor-pointer hover:underline">Terms of Use</span> and{" "}
              <span className="text-[#008ecf] cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
            <button className="w-full bg-[#008ecf] hover:bg-[#0077b3] text-white font-bold py-3 rounded-lg transition-colors mb-5">Sign In</button>
            <p className="text-sm text-center text-gray-600 mb-1">
              Don't have an account?{" "}
              <button className="text-[#008ecf] font-semibold hover:underline">Sign up</button>
            </p>
            <p className="text-sm text-center text-gray-600 mb-6">
              Trying to login as a seller?{" "}
              <button className="text-[#008ecf] font-semibold hover:underline">Login here</button>
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm font-semibold text-[#008ecf]">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1464d8] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                <FaFacebook className="text-lg" /> Sign in with Facebook
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-2.5 rounded-lg transition-colors">
                <FcGoogle className="text-lg" /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MODAL — 24/7 Help
      ══════════════════════════════════════ */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-sm pt-20 pr-6">
          <div ref={helpRef} className="bg-white rounded-2xl shadow-2xl w-80 p-6 relative">
            <button onClick={() => setShowHelpModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-500 mb-1">Get help from our experts 24/7</p>
            <div className="flex items-center gap-2 mb-1">
              <PhoneIcon className="w-5 h-5 text-[#008ecf]" />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">1-877-780-2973</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Phone support available</p>
            <p className="text-xs text-gray-400 mb-5">Mon – Fri, 9am – 10pm EST</p>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-[#008ecf] text-[#008ecf] text-sm font-semibold py-2.5 rounded-xl hover:bg-[#008ecf] hover:text-white transition-all duration-200">
                <ChatBubbleLeftRightIcon className="w-4 h-4" /> Chat Live
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <EnvelopeIcon className="w-4 h-4" /> Contact Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          MODAL — Shipping Location
      ══════════════════════════════════════ */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div ref={locationRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-start gap-3 mb-2">
              <MapPinIcon className="w-5 h-5 text-gray-700 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Choose your shipping location</h3>
                <p className="text-sm text-gray-500 mt-1">Delivery options and delivery speeds may vary for different locations</p>
              </div>
            </div>
            <div className="mt-5">
              <select
                value={selectedCountry}
                onChange={(e) => { setSelectedCountry(e.target.value); setShowLocationModal(false); }}
                className="w-full border-2 border-[#008ecf] rounded-lg px-4 py-3 text-sm text-gray-800 outline-none bg-white cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}