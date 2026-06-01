import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const MOCK_PRODUCT = {
  title: "IPL Hair Removal Handset System – A Laser-Free Alternative",
  badge: "Inspire Uplift Verified",
  rating: 4.8,
  reviewCount: 2847,
  price: 89.97,
  originalPrice: 180.0,
  inStock: true,
  viewingNow: 30,
  seller: {
    name: "CreateConfidence",
    badge: "Trending Seller",
    sold: "29,526",
    initials: "CC",
    avatarUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=80&h=80&fit=crop&face",
  },
  featuredReview: {
    text: `"I've been using this laser for two months and it seems to be keeping up with my hair growth, I've had professional laser which i...`,
    author: "Sandra H.",
    verified: true,
  },
  colors: [
    { label: "White", hex: "#f0ede8", hot: true },
    { label: "Rose",  hex: "#c0857a", hot: false },
  ],
  images: [
    { img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop", label: "Front View",   hasVideo: false },
    { img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop", label: "In Use",       hasVideo: true  },
    { img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop", label: "Side View",    hasVideo: false },
    { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop", label: "Detail",       hasVideo: false },
    { img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop", label: "In Use 2",     hasVideo: false },
    { img: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=600&h=600&fit=crop", label: "Packaging",    hasVideo: false },
    { img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop", label: "Comparison",   hasVideo: false },
  ],
  aboutSections: [
    { emoji: "🌧️", title: "IPL Hair Removal Handset System – A Laser-Free Alternative", content: "Say goodbye to painful waxing, expensive salon visits, and constant shaving. This IPL handset delivers professional-grade hair removal from the comfort of home — permanently reducing regrowth with each session." },
    { emoji: "💥", title: "All-Day Confidence, Zero Effort", content: "From your 8 AM coffee to your 10 PM plans, enjoy smooth skin around the clock. No smearing, no fading — just long-lasting results that survive sweat, sun, and even the pool." },
    { emoji: "💧", title: "Clinically Tested. Dermatologist Approved.", content: "Our IPL technology has been clinically tested and dermatologist approved for safe, effective hair removal on all skin tones. The advanced light pulses target hair at the root." },
    { emoji: "✏️", title: "Salon-Level Precision, Without the Price Tag", content: "Why pay hundreds per session at a clinic? Our precision head design targets even the finest hairs — giving you results that look professionally done, even if you've never tried IPL before." },
    { emoji: "🌿", title: "Lightweight, Gentle & Skin-Safe", content: "Designed with skin-loving materials and five intensity settings, this handset glides on smoothly, feels comfortable, and suits all skin types. No harsh chemicals, no irritation." },
  ],
};

function Stars({ rating, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(1, Math.max(0, rating - (s - 1)));
        return (
          <span key={s} style={{ position: "relative", display: "inline-block", fontSize: size, lineHeight: 1 }}>
            <span style={{ color: "#e5e7eb" }}>★</span>
            <span style={{ position: "absolute", left: 0, top: 0, overflow: "hidden", width: `${fill * 100}%`, color: "#f59e0b" }}>★</span>
          </span>
        );
      })}
    </span>
  );
}

export default function ProductDetail({ product = MOCK_PRODUCT }) {
  const VISIBLE  = 5;
  const THUMB_H  = 90;

  const [activeImg,   setActiveImg]   = useState(0);
  const [fade,        setFade]        = useState(true);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [quantity,    setQuantity]    = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [aboutOpen,   setAboutOpen]   = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const aboutBodyRef = useRef(null);
  const maxOffset    = Math.max(0, product.images.length - VISIBLE);

  const switchImg = (idx) => {
    if (idx === activeImg) return;
    setFade(false);
    setTimeout(() => { setActiveImg(idx); setFade(true); }, 150);
  };

  useEffect(() => {
    if (activeImg < thumbOffset) setThumbOffset(activeImg);
    else if (activeImg >= thumbOffset + VISIBLE) setThumbOffset(activeImg - VISIBLE + 1);
  }, [activeImg]);

  const savings  = (product.originalPrice - product.price).toFixed(2);
  const priceInt = Math.floor(product.price);
  const priceDec = String(product.price.toFixed(2)).split(".")[1];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "24px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, display: "flex", alignItems: "center", gap: 4 }}>
          <Link to="/" style={{ color: "#008ecf", textDecoration: "none" }}>Beauty &amp; Wellness</Link>
        </div>

        {/* ═══ 4-COLUMN LAYOUT ═══
            Col A (80px)  : Thumbnail strip
            Col B (460px) : Main image + About this item below
            Col C (1fr)   : Product info (title, reviews, color, featured review)
            Col D (320px) : Action / Checkout panel — sticky
        */}
        <div style={{ display: "grid", gridTemplateColumns: "80px 500px 1fr 320px", gap: "0 20px", alignItems: "start" }}>

          {/* ── COL A: Thumbnail strip ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

            {/* Popular Seller badge */}
            <div style={{
              background: "#16a34a", color: "#fff", fontSize: 10, fontWeight: 700,
              padding: "4px 6px", borderRadius: 6, textAlign: "center", width: "100%",
              letterSpacing: "0.02em", lineHeight: 1.4,
            }}>Popular Seller</div>

            {/* Up */}
            <button
              onClick={() => setThumbOffset(o => Math.max(0, o - 1))}
              disabled={thumbOffset === 0}
              style={{
                width: 30, height: 30, borderRadius: "50%", border: "1px solid #e5e7eb",
                background: "#fff", cursor: thumbOffset === 0 ? "default" : "pointer",
                opacity: thumbOffset === 0 ? 0.3 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 8.5L6 4.5L10 8.5" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Thumb window */}
            <div style={{ overflow: "hidden", height: VISIBLE * THUMB_H, width: 74 }}>
              <div style={{
                display: "flex", flexDirection: "column", gap: 10,
                transform: `translateY(-${thumbOffset * THUMB_H}px)`,
                transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
              }}>
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => switchImg(idx)} style={{
                    width: 74, height: 74, borderRadius: 10, flexShrink: 0, overflow: "hidden", padding: 0,
                    border: activeImg === idx ? "2.5px solid #008ecf" : "1.5px solid #e5e7eb",
                    boxShadow: activeImg === idx ? "0 0 0 3px rgba(0,142,207,0.18)" : "none",
                    cursor: "pointer", position: "relative", background: "none",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}>
                    <img src={img.img} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    {img.hasVideo && (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="8" height="9" viewBox="0 0 8 10" fill="none"><path d="M1.5 1.5l5 3.5-5 3.5V1.5z" fill="#374151"/></svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Down */}
            <button
              onClick={() => setThumbOffset(o => Math.min(maxOffset, o + 1))}
              disabled={thumbOffset >= maxOffset}
              style={{
                width: 30, height: 30, borderRadius: "50%", border: "1px solid #e5e7eb",
                background: "#fff", cursor: thumbOffset >= maxOffset ? "default" : "pointer",
                opacity: thumbOffset >= maxOffset ? 0.3 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 3.5L6 7.5L10 3.5" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── COL B: Main image only ── */}
          <div>
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#f9fafb", width: "100%", height:"533.5px" }}>
              <img
                src={product.images[activeImg].img}
                alt={product.images[activeImg].label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: fade ? 1 : 0, transition: "opacity 0.18s ease" }}
              />
              <button style={{
                position: "absolute", top: 14, right: 14, width: 38, height: 38, borderRadius: "50%",
                background: "#fff", border: "1px solid #e5e7eb", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}>
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <circle cx="14" cy="3" r="2" stroke="#6b7280" strokeWidth="1.5"/>
                  <circle cx="14" cy="15" r="2" stroke="#6b7280" strokeWidth="1.5"/>
                  <circle cx="4" cy="9" r="2" stroke="#6b7280" strokeWidth="1.5"/>
                  <path d="M12.2 4.2L5.8 7.8M12.2 13.8L5.8 10.2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── COL C: Product info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>

            {/* Stars + verified badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <Stars rating={product.rating} size={18} />
              <span style={{ fontSize: 13, color: "#6b7280" }}>({product.reviewCount.toLocaleString()})</span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                border: "1.5px solid #008ecf", color: "#008ecf", fontSize: 12, fontWeight: 600,
                padding: "4px 12px", borderRadius: 20, background: "#fff",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L2 3v4c0 2.8 2.1 4.8 5 5.5C9.9 11.8 12 9.8 12 7V3L7 1z" fill="#dbeafe" stroke="#008ecf" strokeWidth="1"/>
                  <path d="M4.5 7l2 2 3.5-3.5" stroke="#008ecf" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {product.badge}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#008ecf" strokeWidth="1.2"/>
                  <path d="M7 6.5v3M7 4.5v.5" stroke="#008ecf" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.35, margin: 0 }}>
              {product.title}
            </h1>

            {/* Featured review */}
            <div style={{ background: "#f9fafb", border: "1px solid #f0f0f0", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: "0 0 8px" }}>{product.featuredReview.text}</p>
              <button style={{ color: "#008ecf", fontSize: 13, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}>See more</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#008ecf" }}>{product.featuredReview.author}</span>
                {product.featuredReview.verified && (
                  <span style={{ fontSize: 11, color: "#059669", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "2px 10px", fontWeight: 500 }}>
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>

            {/* Color swatches */}
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 10, marginTop: 0 }}>
                Color: <strong>{product.colors[activeColor].label}</strong>
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {product.colors.map((c, idx) => (
                  <button key={idx} onClick={() => setActiveColor(idx)} style={{
                    width: 64, height: 64, borderRadius: 10, padding: 0,
                    background: c.hex,
                    border: activeColor === idx ? "2.5px solid #008ecf" : "1.5px solid #d1d5db",
                    boxShadow: activeColor === idx ? "0 0 0 3px rgba(0,142,207,0.18)" : "none",
                    cursor: "pointer", position: "relative",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}>
                    {c.hot && (
                      <span style={{
                        position: "absolute", top: 4, left: 4,
                        background: "#ef4444", color: "#fff", fontSize: 8,
                        fontWeight: 800, padding: "2px 5px", borderRadius: 4, lineHeight: 1.4,
                      }}>HOT</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional product details / specs can go here */}
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 0 }}>Product Highlights</p>
              {[
                "✔ Professional-grade IPL technology at home",
                "✔ 5 adjustable intensity levels for all skin types",
                "✔ Clinically tested & dermatologist approved",
                "✔ Up to 400,000 light pulses per cartridge",
                "✔ Results visible from 4–8 weeks of regular use",
              ].map((item, i) => (
                <p key={i} style={{ fontSize: 13.5, color: "#4b5563", lineHeight: 1.7, margin: "0 0 4px", paddingLeft: 2 }}>{item}</p>
              ))}
            </div>
          </div>

          {/* ── COL D: Action / Checkout Panel — STICKY, spans rows 1+2 ── */}
          <div style={{ gridColumn: 4, gridRow: "1 / 3", position: "sticky", top: 24, alignSelf: "start" }}>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ padding: "20px 20px 0" }}>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#16a34a", alignSelf: "flex-start", marginTop: 4 }}>$</span>
                  <span style={{ fontSize: 40, fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>{priceInt}</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>.{priceDec}</span>
                  <span style={{ fontSize: 16, color: "#9ca3af", textDecoration: "line-through", marginLeft: 8 }}>${product.originalPrice.toFixed(2)}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="6.5" stroke="#9ca3af" strokeWidth="1.3"/>
                    <path d="M8 7.5v3M8 5.5v.5" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* You save pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>You save</span>
                  <span style={{ fontSize: 15, color: "#16a34a", fontWeight: 700 }}>${savings}</span>
                </div>

                {/* Seller row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid #f0f0f0", borderRadius: 12, marginBottom: 16, background: "#fafafa" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #e5e7eb" }}>
                    <img src={product.seller.avatarUrl} alt={product.seller.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.seller.name}...</span>
                      <button style={{ fontSize: 12, color: "#008ecf", border: "1px solid #008ecf", borderRadius: 8, padding: "3px 10px", background: "transparent", cursor: "pointer", fontWeight: 600, flexShrink: 0, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H8l-3 2V10H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#008ecf" strokeWidth="1.3"/></svg>
                        Message
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3, fontSize: 12, color: "#6b7280" }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" fill="#6b7280" stroke="#6b7280" strokeWidth="0.5"/>
                        <path d="M4 7l2 2 4-3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{product.seller.badge}</span>
                      <span style={{ color: "#d1d5db" }}>|</span>
                      <span>{product.seller.sold} Sold</span>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 10, marginTop: 0 }}>Quantity</p>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 20, border: "2px solid #16a34a", borderRadius: 40, padding: "7px 20px" }}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#374151", lineHeight: 1, padding: 0, display: "flex" }}>−</button>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#111827", minWidth: 16, textAlign: "center" }}>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#374151", lineHeight: 1, padding: 0, display: "flex" }}>+</button>
                  </div>
                </div>

                {/* In stock */}
                <p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#16a34a", fontWeight: 600, marginBottom: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5 6.5-7" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  In stock <span style={{ color: "#374151", fontWeight: 400 }}>&nbsp;— Ready to ship</span>
                </p>

                {/* Buy Now */}
                <button style={{ display: "block", width: "100%", background: "#008ecf", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 0", borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 10, textAlign: "center" }}>
                  Buy Now! — In High Demand
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000); }}
                  style={{ display: "block", width: "100%", fontWeight: 600, fontSize: 15, padding: "13px 0", borderRadius: 12, border: "2px solid #008ecf", cursor: "pointer", marginBottom: 16, textAlign: "center", background: addedToCart ? "#008ecf" : "transparent", color: addedToCart ? "#fff" : "#008ecf", transition: "all 0.2s" }}>
                  {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
                </button>

                {/* Trust pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 12 }}>
                  {[["🚚", "Ships free"], ["🔄", "14-days returns"], ["🔒", "Secure checkout"]].map(([icon, label]) => (
                    <span key={label} style={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", color: "#374151", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      {icon} {label}
                    </span>
                  ))}
                </div>

                {/* Viewing now */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, color: "#374151", marginBottom: 14 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <ellipse cx="9" cy="9" rx="8" ry="5.5" stroke="#16a34a" strokeWidth="1.5"/>
                    <circle cx="9" cy="9" r="2.5" stroke="#16a34a" strokeWidth="1.5"/>
                  </svg>
                  <span><span style={{ color: "#16a34a", fontWeight: 700 }}>{product.viewingNow}</span> people viewing right now.</span>
                </div>

                {/* Guaranteed checkout */}
                <div style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1.5L3 4v5c0 3.5 2.6 6 6 7 3.4-1 6-3.5 6-7V4L9 1.5z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.3"/>
                      <path d="M5.5 9l2.5 2.5 5-5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>Guaranteed Safe &amp; Secured Checkout</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {[
                      { label: "VISA",     bg: "#1a1f71", color: "#fff"    },
                      { label: "MC",       bg: "#eb001b", color: "#fff"    },
                      { label: "AMEX",     bg: "#007bc1", color: "#fff"    },
                      { label: "DISCOVER", bg: "#f76f20", color: "#fff"    },
                      { label: "JCB",      bg: "#003087", color: "#fff"    },
                      { label: "UnionPay", bg: "#e21836", color: "#fff"    },
                      { label: "⊕ Pay",   bg: "#000",    color: "#fff"    },
                      { label: "PayPal",   bg: "#003087", color: "#fff"    },
                      { label: "GPay",     bg: "#fff",    color: "#374151", border: "1px solid #e5e7eb" },
                      { label: "$",        bg: "#3db651", color: "#fff"    },
                      { label: "Klarna",   bg: "#ffb3c7", color: "#000"    },
                    ].map(({ label, bg, color, border }) => (
                      <span key={label} style={{ fontSize: 9, background: bg, color, borderRadius: 4, padding: "2px 5px", fontWeight: 700, letterSpacing: "0.01em", border: border || "none" }}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Questions row */}
              <div style={{ margin: "14px 16px 16px", border: "1px solid #f0f0f0", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#16a34a", flexShrink: 0, display: "inline-block" }}></span>
                <span style={{ fontSize: 12, color: "#374151" }}>
                  Questions? We're here to help{" "}
                  <button style={{ color: "#008ecf", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 12, padding: 0 }}>Chat now</button>
                </span>
              </div>

              {/* Delivery footer */}
              <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 20px 16px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 5, marginTop: 0 }}>Delivery &amp; Return Policy</p>
                <button style={{ fontSize: 12, color: "#008ecf", background: "none", border: "none", cursor: "pointer", padding: 0, display: "block", marginBottom: 3 }}>Shipping And Return Policy</button>
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Returns: Accepted</p>
              </div>
            </div>
          </div>{/* end COL D */}

          {/* ── ABOUT THIS ITEM — spans cols 1–3, row 2 ── */}
          <div style={{ gridColumn: "1 / 4", gridRow: 2, marginTop: 8, border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
            <button
              onClick={() => setAboutOpen(o => !o)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 20px", background: "#fff", border: "none", cursor: "pointer", textAlign: "left",
              }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>About this item</span>
              <span style={{ display: "inline-block", transition: "transform 0.3s", transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 7.5l6 6 6-6" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <div style={{
              overflow: "hidden", transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1)",
              maxHeight: aboutOpen ? `${aboutBodyRef.current?.scrollHeight ?? 2000}px` : "0px",
            }}>
              <div ref={aboutBodyRef} style={{ padding: "0 20px 22px" }}>
                {product.aboutSections.map((sec, idx) => (
                  <div key={idx} style={{ paddingTop: 16, borderTop: idx > 0 ? "1px solid #f3f4f6" : "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 18, lineHeight: 1.3 }}>{sec.emoji}</span>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: 0 }}>{sec.title}</p>
                    </div>
                    <p style={{ fontSize: 13.5, color: "#4b5563", lineHeight: 1.75, margin: 0, paddingLeft: 28 }}>{sec.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* end 4-col grid */}
      </div>
    </div>
  );
}