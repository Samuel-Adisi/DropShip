import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RecentlyViewed from "../components/home/RecentlyViewed";
// ── Mock Data ──────────────────────────────────────────────
const MOCK_CART_ITEMS = [
  {
    id: 1,
    seller: "CreateConfidence",
    name: "Waterproof Microblading Pen",
    variant: "Chestnut",
    price: 19.97,
    originalPrice: 40.0,
    savings: 20.03,
    savingsPct: 51,
    inStock: true,
    freeShipping: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop",
    variantLabel: "01.Chestnut",
  },
];

const MOCK_REVIEWS = [
  { id: 1, text: "I have been buying and selling on Inspire Uplift for 2 years, and it has never disappointed me. The payment process is secure. I have also found the sellers to be reliable and trustworthy.", author: "Michael R.", rating: 5, verified: true },
  { id: 2, text: "Absolutely love this product! Arrived quickly and exactly as described. The quality is outstanding and I've already recommended it to three of my friends.", author: "Sarah T.", rating: 5, verified: true },
  { id: 3, text: "Great experience from start to finish. Customer support was responsive when I had a question. Will definitely be shopping here again.", author: "James K.", rating: 5, verified: true },
  { id: 4, text: "The product exceeded my expectations! Packaged very well and arrived in perfect condition. Five stars without hesitation.", author: "Priya M.", rating: 5, verified: true },
  { id: 5, text: "Smooth checkout process and fast delivery. The item looks even better in person than in the photos. Very happy with my purchase.", author: "Lisa B.", rating: 5, verified: true },
];

// ── Real Payment Logo SVGs ─────────────────────────────────
const VisaLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" style={{ width: 42, height: 26, objectFit: "contain" }} />
);
const MastercardLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" style={{ width: 42, height: 26, objectFit: "contain" }} />
);

const AmexLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" style={{ width: 42, height: 26, objectFit: "contain" }} />
);

const DiscoverLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/196/196548.png" alt="Discover" style={{ width: 42, height: 26, objectFit: "contain" }} />
);

const KlarnaLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/10686/10686784.png" alt="Klarna" style={{ width: 42, height: 26, objectFit: "contain" }} />
);

const PaypalLogo = () => (
  <svg viewBox="0 0 100 30" width="80" height="24" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="22" fill="#003087" fontSize="20" fontWeight="900" fontFamily="Arial" fontStyle="italic">Pay</text>
    <text x="33" y="22" fill="#009CDE" fontSize="20" fontWeight="900" fontFamily="Arial" fontStyle="italic">Pal</text>
  </svg>
);

const GooglePayLogo = () => (
  <svg viewBox="0 0 80 28" width="80" height="28" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="22" fontFamily="Arial" fontSize="20" fontWeight="700" fill="white">Pay with </text>
    <text x="62" y="22" fontFamily="Arial" fontSize="20" fontWeight="700">
      <tspan fill="#4285F4">G</tspan>
    </text>
  </svg>
);

const VenmoLogo = () => (
  <svg viewBox="0 0 80 28" width="80" height="28" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Venmo</text>
  </svg>
);

const JcbLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="JCB" style={{ width: 42, height: 26, objectFit: "contain" }} />
);
const ShieldIcon = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="Shield" style={{ width: 22, height: 22, flexShrink: 0, marginTop: 1 }} />
);

const CashLogo = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/2504/2504939.png" alt="Cash App" style={{ width: 42, height: 26, objectFit: "contain" }} />
);



// ── Lock Icon ──────────────────────────────────────────────
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="6" width="12" height="9" rx="2" stroke="#fff" strokeWidth="1.5"/>
    <path d="M5 6V4.5a3 3 0 116 0V6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Truck Icon ─────────────────────────────────────────────
const TruckIcon = ({ color = "#16a34a" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

// ── SSL Icon ───────────────────────────────────────────────
const SslIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

// ── Check Icon ─────────────────────────────────────────────
const CheckIcon = ({ color = "#16a34a", size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5 6.5-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Stars ──────────────────────────────────────────────────
function Stars({ rating = 5, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#f59e0b" : "#e5e7eb", fontSize: size }}>★</span>
      ))}
    </span>
  );
}

// ── Countdown Timer ────────────────────────────────────────
function Countdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 12 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 13 }}>
      Lightning deal | Ends in {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

// ── Review Carousel — no background on arrow buttons ──────
function ReviewCarousel({ reviews }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [reviews.length]);

  const handleManual = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(((idx % reviews.length) + reviews.length) % reviews.length);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 4000);
  };

  const r = reviews[current];

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", textAlign: "center", marginBottom: 14 }}>Customer Reviews</h3>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6 }}>
        {/* Arrow — no background, no border, no borderRadius */}
        <button onClick={() => handleManual(current - 1)} style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M6.5 1.5L3 5l3.5 3.5" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div key={current} style={{ flex: 1, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 18px", animation: "fadeSlide 0.4s ease" }}>
          {r.verified && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#16a34a"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>Verified Purchase</span>
            </div>
          )}
          <Stars rating={r.rating} size={16} />
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, margin: "8px 0 10px" }}>{r.text}</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: 0 }}>{r.author}</p>
        </div>
        {/* Arrow — no background, no border, no borderRadius */}
        <button onClick={() => handleManual(current + 1)} style={{ width: 28, height: 28, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M3.5 1.5L7 5l-3.5 3.5" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => handleManual(i)} style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? "#008ecf" : "#d1d5db", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
        ))}
      </div>
      <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}

// ── Main Cart Component ────────────────────────────────────
export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  // NEW: Order Summary toggle
  const [summaryOpen, setSummaryOpen] = useState(true);

  const updateQty = (id, delta) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item));
  };

  const itemCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const itemTotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 80px" }}>

        {/* ── Top header row — single line ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 20, flexWrap: "wrap" }}>

          {/* Left: title + urgency banner on same line */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              {/* CHANGED: reduced font size and weight */}
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>
                Your Cart ({itemCount})
              </h1>
              <div style={{ width: 52, height: 3, background: "#ef4444", borderRadius: 99, marginTop: 4 }} />
            </div>

            {/* Urgency banner — same line as title */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              border: "1.5px solid #d97706", borderRadius: 8, padding: "10px 16px",
              background: "#fffbeb",
            }}>
              <span style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
                <strong style={{ color: "#b45309" }}>Your items aren't reserved,</strong>{" "}
                checkout quickly to make sure you don't miss out.
              </span>
            </div>
          </div>

          {/* Right: Continue Shopping */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#008ecf", color: "#fff", fontWeight: 700, fontSize: 14,
              padding: "12px 24px", borderRadius: 0, border: "none", cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* ── 2-column layout — INCREASED gap ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }}>

          {/* ════ LEFT COLUMN ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Purchase Protection banner */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "14px 18px" }}>
              <ShieldIcon />
              <p style={{ fontSize: 13.5, color: "#166534", lineHeight: 1.6, margin: 0 }}>
                <strong>Purchase Protection:</strong> Shop confidently on InspireUplift knowing if something goes wrong with an order, we've got your back.
              </p>
            </div>

            {/* Free Shipping pill */}
            <div style={{ display: "inline-flex", width: "fit-content" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1.5px solid #16a34a", color: "#16a34a", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 30, background: "#fff" }}>
                <TruckIcon color="#16a34a" />
                Free Shipping on this item
              </span>
            </div>

            {/* Cart items */}
            {items.map((item) => (
              <div key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                {/* Seller header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
                  <span style={{ fontSize: 14, color: "#374151" }}>
                    Sold by: <strong style={{ color: "#111827" }}>{item.seller}</strong>
                  </span>
                  <button onClick={() => setCouponOpen(o => !o)} style={{ fontSize: 13, color: "#008ecf", fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    + Add Coupon
                  </button>
                </div>

                {/* Coupon input */}
                {couponOpen && (
                  <div style={{ padding: "10px 18px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb", display: "flex", gap: 8 }}>
                    <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Enter coupon code" style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none" }} />
                    <button style={{ background: "#008ecf", color: "#fff", border: "none", borderRadius: 0, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Apply</button>
                  </div>
                )}

                {/* Item row */}
                <div style={{ display: "flex", gap: 18, padding: "18px", alignItems: "flex-start" }}>
                  {/* Product image */}
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <div style={{ width: 120, height: 120, borderRadius: 10, overflow: "hidden", background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginTop: 5 }}>{item.variantLabel}</p>
                  </div>

                  {/* Product details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{item.name}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 10px" }}>{item.variant}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, background: "#dcfce7", color: "#15803d", padding: "3px 10px", borderRadius: 20 }}>
                        Save ${item.savings.toFixed(2)} ({item.savingsPct}%)
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#16a34a" }}>
                        <CheckIcon />
                        In Stock
                      </span>
                    </div>
                    {item.freeShipping && (
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", margin: 0 }}>FREE SHIPPING</p>
                    )}
                  </div>

                  {/* Right: countdown + price + qty */}
                  <div style={{ flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <Countdown />
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>${item.price.toFixed(2)}</div>
                      <div style={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through" }}>${item.originalPrice.toFixed(2)}</div>
                    </div>
                    {/* Quantity stepper */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 18, border: "2px solid #16a34a", borderRadius: 40, padding: "6px 18px" }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#374151", lineHeight: 1, padding: 0 }}>−</button>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#111827", minWidth: 16, textAlign: "center" }}>{item.qty || 1}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#374151", lineHeight: 1, padding: 0 }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ RIGHT COLUMN — sticky Order Summary ════ */}
          <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "20px 20px 0" }}>

                {/* Order Summary header — NOW TOGGLEABLE */}
                <div
                  onClick={() => setSummaryOpen(o => !o)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, cursor: "pointer", userSelect: "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Order Summary</span>
                    {/* Chevron rotates based on open state */}
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ transform: summaryOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.25s ease" }}
                    >
                      <path d="M3 9l4-4 4 4" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>${itemTotal.toFixed(2)}</span>
                </div>

                {/* Collapsible content */}
                {summaryOpen && (
                  <>
                    {/* Real Payment logos */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18, alignItems: "center" }}>
                      <VisaLogo />
                      <MastercardLogo />
                      <AmexLogo />
                      <DiscoverLogo />
                      <JcbLogo />
                      <CashLogo />
                      <KlarnaLogo />
                    </div>

                    {/* Line items */}
                    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14, marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, color: "#374151" }}>Item Total</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>${itemTotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#374151" }}>Shipping</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a", display: "flex", alignItems: "center", gap: 6 }}>
                          <TruckIcon color="#16a34a" /> FREE
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 14, marginBottom: 16 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>Total</span>
                      <span style={{ fontSize: 22, fontWeight: 800, color: "#16a34a" }}>${itemTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}

                {/* People checking out */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", background: "#f9fafb", border: "1px solid #f0f0f0", borderRadius: 30, padding: "8px 16px", marginBottom: 14, fontSize: 13, color: "#374151" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block", flexShrink: 0 }} />
                  <span><strong style={{ color: "#111827" }}>130</strong> people are checking out now</span>
                </div>

                {/* Checkout button */}
                <div style={{ position: "relative", marginBottom: 10 }}>
                  <Link to="/checkout/">
                    <button style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: 8, background: "#008ecf", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 0", borderRadius: 0, border: "none", cursor: "pointer" }}>
                      <LockIcon />
                      Continue to Safe Checkout
                    </button>
                  </Link>
                  <span style={{ position: "absolute", top: -10, right: 16, background: "#16a34a", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4 }}>
                    <TruckIcon color="#fff" /> Free Shipping
                  </span>
                </div>

                {/* Continue Shopping */}
                <button style={{ display: "block", width: "100%", fontWeight: 600, fontSize: 14, padding: "12px 0", borderRadius: 0, border: "2px solid #e5e7eb", cursor: "pointer", background: "transparent", color: "#374151", marginBottom: 14 }}>
                  Continue Shopping
                </button>

                {/* SSL + Buyer Protection */}
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 5 }}>
                    <SslIcon /> SSL Encrypted
                  </span>
                  <span style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#6b7280" strokeWidth="1.3"/><path d="M4.5 7l2 2 3.5-3.5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Buyer Protection
                  </span>
                </div>

                {/* Questions */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 12, marginBottom: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
                    Questions? We're here to help
                  </span>
                  <button style={{ fontSize: 13, fontWeight: 700, color: "#008ecf", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Chat now</button>
                </div>

                {/* Terms */}
                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, marginBottom: 16 }}>
                  By placing your order, you agree to the Inspire Uplift{" "}
                  <a href="#" style={{ color: "#008ecf" }}>terms of sale</a> and{" "}
                  <a href="#" style={{ color: "#008ecf" }}>privacy policy</a>.
                </p>

                {/* Express Checkout divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                  <span style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", fontWeight: 600 }}>or Express Checkout With</span>
                  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
                </div>

                {/* Express payment buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  {/* Google Pay */}
                  <button style={{ width: "100%", padding: "13px 0", borderRadius: 0, border: "none", background: "#000", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    Pay with
                    <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" style={{ width: 20, height: 20, objectFit: "contain" }} />
                    Pay
                  </button>

                  {/* PayPal — now has "Pay with" prefix */}
                  <button style={{ width: "100%", padding: "13px 0", borderRadius: 0, border: "none", background: "#ffc439", color: "#003087", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    Pay with
                    <svg viewBox="0 0 80 24" width="80" height="24" xmlns="http://www.w3.org/2000/svg">
                      <text x="0" y="19" fontFamily="Arial" fontSize="20" fontWeight="900" fontStyle="italic" fill="#003087">Pay</text>
                      <text x="34" y="19" fontFamily="Arial" fontSize="20" fontWeight="900" fontStyle="italic" fill="#009CDE">Pal</text>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Customer Reviews — OUTSIDE the checkout container ── */}
            <div style={{ marginTop: 24 }}>
              <ReviewCarousel reviews={MOCK_REVIEWS} />
            </div>
          </div>

        </div>
      </div>
      <RecentlyViewed />
    </div>
  );
}