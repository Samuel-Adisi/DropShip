import { useState } from "react";
import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CheckoutNavbar() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <header className="w-full font-sans">
      <div className="bg-[#008ecf] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left — Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="text-white font-extrabold text-xl leading-tight tracking-tight cursor-pointer select-none">
              <span className="block">ShopLine</span>
             
            </div>
          </Link>

          {/* Center — Secure Checkout */}
          <button
            onClick={() => setCheckoutOpen(o => !o)}
            className="flex items-center gap-1.5 text-white font-semibold text-base"
          >
            Secure Checkout
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {/* Right — 24/7 Help + Lock */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setHelpOpen(o => !o)}
              className="flex items-center gap-1 text-white font-semibold text-sm"
            >
              24/7 Help
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <LockClosedIcon className="w-6 h-6 text-white" />
          </div>

        </div>
      </div>
    </header>
  );
}