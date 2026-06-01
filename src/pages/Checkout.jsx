import { useState } from "react";
import { Link } from "react-router-dom";
import CheckoutNavbar from "../components/layout/CheckoutNav";
import {
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ShieldCheckIcon as ShieldSolid } from "@heroicons/react/24/solid";

// ── Mock order items ───────────────────────────────────────
const ORDER_ITEMS = [
  {
    id: 1,
    name: "Waterproof Microblading Pen",
    variant: "01. Chestnut",
    price: 19.97,
    qty: 8,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop",
  },
  {
    id: 2,
    name: "IPL Hair Removal Handset System – A Laser-Free...",
    variant: "Standard",
    price: 89.97,
    qty: 2,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=120&h=120&fit=crop",
  },
  {
    id: 3,
    name: "Perfect Hair Remover",
    variant: "Rose Gold",
    price: 24.97,
    qty: 1,
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=120&h=120&fit=crop",
  },
];

// ── Payment method tabs ────────────────────────────────────
const PAYMENT_TABS = [
  { id: "card",  label: "Credit / Debit Card" },
  { id: "momo",  label: "Mobile Money" },
];

// ── Momo networks ──────────────────────────────────────────
const MOMO_NETWORKS = [
  {
    id: "mtn",
    label: "MTN MoMo",
    color: "#FFC107",
   logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/MTN_Logo.svg",
  },
 {
  id: "vodafone",
  label: "Vodafone Cash",
  color: "#E60000",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Vodafone_logo_2017.svg",
},
  {
    id: "airteltigo",
    label: "AirtelTigo Money",
    color: "#E4002B",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/da/Airtel_Africa_logo.svg",

  },
];

// ── Same Flaticon logos as CartPage ────────────────────────
const PAYMENT_LOGOS = [
  { alt: "Visa",       src: "https://cdn-icons-png.flaticon.com/512/196/196578.png" },
  { alt: "Mastercard", src: "https://cdn-icons-png.flaticon.com/512/196/196561.png" },
  { alt: "Amex",       src: "https://cdn-icons-png.flaticon.com/512/196/196539.png" },
  { alt: "Discover",   src: "https://cdn-icons-png.flaticon.com/512/196/196548.png" },
  { alt: "JCB",        src: "https://cdn-icons-png.flaticon.com/512/196/196559.png" },
  { alt: "Cash",       src: "https://cdn-icons-png.flaticon.com/512/2504/2504939.png" },
  { alt: "Klarna",     src: "https://cdn-icons-png.flaticon.com/512/10686/10686784.png" },
];

// ── Helpers ────────────────────────────────────────────────
function SectionHeader({ number, icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-full bg-[#008ecf] flex items-center justify-center flex-shrink-0 shadow-md">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Step {number}</p>
        <h2 className="text-lg font-bold text-gray-800 leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function FloatingInput({ label, type = "text", value, onChange, required }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm text-gray-800 outline-none focus:border-[#008ecf] focus:ring-2 focus:ring-[#008ecf]/10 transition-all bg-white"
      />
      <label className="absolute left-4 top-3.5 text-xs text-gray-400 font-medium transition-all peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#008ecf] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] pointer-events-none">
        {label}{required && " *"}
      </label>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function CheckoutPage() {
  const [email, setEmail]               = useState("");
  const [keepUpdated, setKeepUpdated]   = useState(true);
  const [billingMatch, setBillingMatch] = useState(true);
  const [paymentTab, setPaymentTab]     = useState("card");
  const [momoNetwork, setMomoNetwork]   = useState("mtn");
  const [momoPhone, setMomoPhone]       = useState("");
  const [cardNum, setCardNum]           = useState("");
  const [cardName, setCardName]         = useState("");
  const [expiry, setExpiry]             = useState("");
  const [cvv, setCvv]                   = useState("");
  const [orderExpanded, setOrderExpanded] = useState(true);

  const [ship, setShip] = useState({
    first: "", last: "", address: "", city: "",
    region: "", zip: "", country: "Ghana", phone: "",
  });
  const updateShip = (k, v) => setShip(p => ({ ...p, [k]: v }));

  const itemTotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = ORDER_ITEMS.reduce((s, i) => s + i.qty, 0);

  const formatCard   = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = (v) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>=3?`${d.slice(0,2)}/${d.slice(2)}`:d; };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CheckoutNavbar />

      {/* ── wider gap between columns ── */}
      <div className="max-w-6xl mx-auto pl-0 pr-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">


        {/* ══════════════ LEFT COLUMN ══════════════ */}
        <div className="flex flex-col gap-6">

          {/* Express Checkout — Google Pay + PayPal only, no border radius */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-yellow-400 text-base">⚡</span>
                <span className="text-[#008ecf]">Express Checkout</span>
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 pb-1">Skip the form – complete in just a few taps</p>

            <div className="grid grid-cols-2 gap-3 px-6 pb-5 pt-3">
              {/* Google Pay — no border radius */}
              <button
                className="flex items-center justify-center gap-2 bg-black text-white py-3.5 font-bold text-sm hover:bg-gray-900 transition-colors"
                style={{ borderRadius: 0 }}
                >
                Pay with
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" style={{ width: 20, height: 20, objectFit: "contain" }} />
                Pay
                </button>

              {/* PayPal — no border radius */}
              <button
                className="flex items-center justify-center bg-[#FFC439] py-3.5 font-bold text-sm hover:bg-[#f0b830] transition-colors"
                style={{ borderRadius: 0 }}
              >
                <svg viewBox="0 0 80 22" width="72" height="22">
                  <text x="0" y="18" fontFamily="Arial" fontSize="19" fontWeight="900" fontStyle="italic" fill="#003087">Pay</text>
                  <text x="34" y="18" fontFamily="Arial" fontSize="19" fontWeight="900" fontStyle="italic" fill="#009CDE">Pal</text>
                </svg>
              </button>
            </div>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Or Credit / Debit Card</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <SectionHeader
              number="1"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
              title="Email Address"
            />
            <FloatingInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={keepUpdated} onChange={e => setKeepUpdated(e.target.checked)} className="w-4 h-4 accent-[#008ecf] rounded" />
                <span className="text-xs text-gray-500">Keep me up to date on news and exclusive offers.</span>
              </label>
              <span className="text-xs text-gray-500">
                Already have an account?{" "}
                <a href="#" className="text-[#008ecf] font-semibold hover:underline">Log In</a>
              </span>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <SectionHeader
              number="2"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              title="Shipping Address"
              subtitle="Where should we send your order?"
            />
            <div className="grid grid-cols-2 gap-3">
              <FloatingInput label="First Name" value={ship.first} onChange={e => updateShip("first", e.target.value)} required />
              <FloatingInput label="Last Name"  value={ship.last}  onChange={e => updateShip("last",  e.target.value)} required />
            </div>
            <div className="mt-3">
              <FloatingInput label="Street Address" value={ship.address} onChange={e => updateShip("address", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <FloatingInput label="City"          value={ship.city}   onChange={e => updateShip("city",   e.target.value)} required />
              <FloatingInput label="Region / State" value={ship.region} onChange={e => updateShip("region", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <FloatingInput label="Postal Code" value={ship.zip} onChange={e => updateShip("zip", e.target.value)} />
              <div className="relative">
                <select
                  value={ship.country}
                  onChange={e => updateShip("country", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm text-gray-800 outline-none focus:border-[#008ecf] focus:ring-2 focus:ring-[#008ecf]/10 transition-all appearance-none bg-white"
                >
                  {["Ghana","Nigeria","Kenya","United States","United Kingdom","Canada","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
                <label className="absolute left-4 top-1.5 text-[10px] text-gray-400 font-medium pointer-events-none">Country</label>
                <ChevronDownIcon className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="mt-3">
              <FloatingInput label="Phone Number" type="tel" value={ship.phone} onChange={e => updateShip("phone", e.target.value)} required />
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input type="checkbox" checked={billingMatch} onChange={e => setBillingMatch(e.target.checked)} className="w-4 h-4 accent-[#008ecf] rounded" />
              <span className="text-xs text-gray-500">My billing address is the same as my shipping address</span>
            </label>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
              <SectionHeader
                number="3"
                icon={<LockClosedIcon className="w-4 h-4 text-white" />}
                title="Secure Payment"
              />
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold mt-1">
                <LockClosedIcon className="w-3.5 h-3.5" />
                All transactions are secure and encrypted
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5 p-1 bg-gray-100 rounded-xl">
              {PAYMENT_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPaymentTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    paymentTab === tab.id
                      ? "bg-white text-[#008ecf] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Card form */}
            {paymentTab === "card" && (
              <div className="flex flex-col gap-3">
                {/* Flaticon payment logos — same as cart */}
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  {PAYMENT_LOGOS.map(logo => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      style={{ width: 42, height: 26, objectFit: "contain" }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  ))}
                </div>
                <FloatingInput label="Card Number" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} required />
                <FloatingInput label="Name on Card" value={cardName} onChange={e => setCardName(e.target.value)} required />
                <div className="grid grid-cols-2 gap-3">
                  <FloatingInput label="Expiry (MM/YY)" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} required />
                  <FloatingInput label="CVV" type="password" value={cvv} onChange={e => setCvv(e.target.value.slice(0,4))} required />
                </div>
              </div>
            )}

            {/* MoMo form */}
            {paymentTab === "momo" && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-gray-500">Select your mobile money network and enter your registered number.</p>
                <div className="grid grid-cols-3 gap-3">
                  {MOMO_NETWORKS.map(net => (
                    <button
                      key={net.id}
                      onClick={() => setMomoNetwork(net.id)}
                      style={{ borderColor: momoNetwork === net.id ? net.color : "#e5e7eb", background: momoNetwork === net.id ? net.color + "18" : "#fff" }}
                      className={`rounded-xl border-2 py-3 px-2 flex flex-col items-center gap-2 transition-all duration-200 ${momoNetwork === net.id ? "shadow-md" : "hover:border-gray-300"}`}
                    >
                     <img src={net.logo} alt={net.label} className="object-contain"
                        style={{ width: net.id === "vodafone" ? 56 : 40, height: net.id === "vodafone" ? 56 : 40 }}
                        onError={e => { e.target.style.display="none"; }}
                        />
                         <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{net.label}</span>
                      {momoNetwork === net.id && <span style={{ background: net.color }} className="w-2 h-2 rounded-full" />}
                    </button>
                  ))}
                </div>
                <FloatingInput label="Mobile Money Number" type="tel" value={momoPhone} onChange={e => setMomoPhone(e.target.value.replace(/\D/g,"").slice(0,10))} required />
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <span className="text-amber-500 text-lg mt-0.5">ℹ</span>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    After clicking <strong>Complete Order</strong>, you will receive a prompt on your phone to approve the payment. Ensure your phone is available and has sufficient balance.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ══════════════ RIGHT COLUMN ══════════════ */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Your Order header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Your Order</h3>
                <p className="text-xs text-gray-400">{itemCount} items</p>
              </div>
              <Link to="/cart" className="text-xs font-semibold text-[#008ecf] hover:underline flex items-center gap-1">
                <PencilSquareIcon className="w-3.5 h-3.5" />
                Edit Cart
              </Link>
            </div>

            {/* Items list */}
            <div className="divide-y divide-gray-50">
              {ORDER_ITEMS.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="relative flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-gray-100" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#008ecf] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.variant}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Order Summary accordion */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => setOrderExpanded(o => !o)}
                className="flex items-center justify-between w-full px-5 py-4 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span>Order Summary</span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-gray-900">${itemTotal.toFixed(2)}</span>
                  {orderExpanded
                    ? <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                    : <ChevronDownIcon className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {orderExpanded && (
                <div className="px-5 pb-5 flex flex-col gap-3">
                  {/* Same Flaticon logos as cart */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {PAYMENT_LOGOS.map(logo => (
                      <img
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                        style={{ width: 42, height: 26, objectFit: "contain" }}
                        onError={e => { e.target.style.display = "none"; }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Item(s) Total</span>
                    <span className="font-semibold text-gray-800">${itemTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 5v4h-7V8z"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between font-extrabold text-gray-900 border-t border-gray-100 pt-3">
                    <span className="text-base">Total</span>
                    <span className="text-xl text-green-600">${itemTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Happy customers */}
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 w-fit mx-auto">
                <div className="flex -space-x-1.5">
                  {["1508601","1065084","774909"].map(id => (
                    <img key={id} src={`https://i.pravatar.cc/28?img=${id}`} className="w-6 h-6 rounded-full border-2 border-white object-cover" alt="customer" />
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-semibold">70,000+ Happy Customers.</span>
              </div>
            </div>

            {/* ── Complete Order CTA ── */}
            <div className="px-5 pb-2 border-t border-gray-100 pt-4">
              <button className="w-full bg-[#006fa0] hover:bg-[#005f8a] text-white font-bold py-4 text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#008ecf]/20 rounded-xl">
                <LockClosedIcon className="w-4 h-4 flex-shrink-0" />
                <span>Complete Order — ${itemTotal.toFixed(2)}</span>
                <span className="bg-green-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ml-1 flex-shrink-0">
                  Free Shipping
                </span>
              </button>

              <p className="text-[10.5px] text-gray-400 text-center mt-3 leading-relaxed px-2 pb-4">
                By placing your order, you agree to the Inspire Uplift{" "}
                <a href="#" className="text-[#008ecf] hover:underline">terms of sale</a> and{" "}
                <a href="#" className="text-[#008ecf] hover:underline">privacy policy</a>.
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 border-t border-gray-100">
              {[
                { icon: <ShieldSolid className="w-5 h-5 text-green-500" />,             label: "Purchase Protection" },
                { icon: <LockClosedIcon className="w-5 h-5 text-green-500" />,           label: "Secure Payments" },
                { icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />,  label: "24/7 Support" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-4 bg-green-50 border-r border-gray-100 last:border-r-0 text-center px-2">
                  {icon}
                  <span className="text-[10px] font-semibold text-green-700 leading-tight">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}