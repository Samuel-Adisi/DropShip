import { useState } from "react";
// At the top of SellerLogin.jsx, add the import
import sellerIllustration from "../assets/Ecommerce campaign-cuate.png"; // use the exact filename

import { Link } from "react-router-dom";

// ── Inspire Uplift Logo ────────────────────────────────────
const InspireUpliftLogo = () => (
  <svg viewBox="0 0 120 60" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="10" fill="#f97316" />
    <line x1="28" y1="10" x2="28" y2="5" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="28" y1="46" x2="28" y2="51" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="10" y1="28" x2="5" y2="28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="46" y1="28" x2="51" y2="28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="14.9" y1="14.9" x2="11.4" y2="11.4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="41.1" y1="41.1" x2="44.6" y2="44.6" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="41.1" y1="14.9" x2="44.6" y2="11.4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="14.9" y1="41.1" x2="11.4" y2="44.6" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M22 25h3l2 5h7l1.5-4h-8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="25.5" cy="31.5" r="1" fill="#fff"/>
    <circle cx="29.5" cy="31.5" r="1" fill="#fff"/>
    <text x="58" y="26" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#1e3a5f" letterSpacing="0.5">ShopLine</text>
  </svg>
);

// ── Eye Icon ───────────────────────────────────────────────
const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

// ── Arrow Right ────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Bar heights for chart ──────────────────────────────────
const BAR_HEIGHTS = [20, 32, 18, 40, 28, 35, 22];

// ── Dashboard Illustration ─────────────────────────────────

// ── Replace the entire DashboardIllustration component with this ──

const DashboardIllustration = () => (
  <>
    <img
      src={sellerIllustration}
      alt="People illustration"
      style={{ width: "100%", maxWidth: 700, height: "auto", display: "block" }}
    />
      <a 
      href="https://storyset.com/people"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textAlign: "center",
        marginTop: 12,
        fontSize: 11,
        color: "rgba(255,255,255,0.55)",
      }}
      >
    
    </a>
  </>
);
// ── Main Component ─────────────────────────────────────────
export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#fff",
    }}>
      <style>{`
        * { box-sizing: border-box; }

        .seller-left {
          flex: 1;
          background: #008ecf;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        .seller-left::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 320px; height: 320px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        .seller-left::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 240px; height: 240px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }

        .seller-right {
          width: 50%;
          max-width: 620px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 56px;
          background: #fff;
        }

        .seller-form-inner {
          width: 100%;
          max-width: 400px;
          animation: fadeUp 0.45s ease both;
        }

        .seller-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14.5px;
          color: #111827;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background: #fff;
          font-family: inherit;
        }

        .seller-input:focus {
          border-color: #008ecf;
          box-shadow: 0 0 0 3px rgba(0,142,207,0.12);
        }

        .seller-input::placeholder { color: #9ca3af; }

        .seller-btn {
          width: 100%;
          padding: 15px 0;
          background: #008ecf;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
          font-family: inherit;
          letter-spacing: 0.3px;
        }

        .seller-btn:hover:not(:disabled) {
          background: #0078b3;
          box-shadow: 0 4px 14px rgba(0,142,207,0.35);
        }

        .seller-btn:active:not(:disabled) { transform: scale(0.99); }
        .seller-btn:disabled { opacity: 0.75; cursor: not-allowed; }

        .pw-wrap { position: relative; }

        .pw-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          line-height: 1;
        }

        .seller-link {
          color: #008ecf;
          text-decoration: none;
          font-weight: 700;
        }

        .seller-link:hover { text-decoration: underline; }

        .forgot-link {
          color: #008ecf;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
        }

        .forgot-link:hover { text-decoration: underline; }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .seller-left { display: none; }
          .seller-right {
            width: 100%;
            max-width: 100%;
            padding: 40px 24px;
            min-height: 100vh;
          }
        }

        @media (max-width: 480px) {
          .seller-right {
            padding: 40px 20px;
            align-items: flex-start;
            padding-top: 52px;
          }
        }

        @media (min-width: 901px) and (max-width: 1200px) {
          .seller-right { padding: 48px 40px; }
        }
      `}</style>

      {/* ════ LEFT PANEL ════ */}
      <div className="seller-left">
        <div style={{ position: "relative", zIndex: 1 }}>
          <DashboardIllustration />
        </div>
      </div>

      {/* ════ RIGHT PANEL ════ */}
      <div className="seller-right">
        <div className="seller-form-inner">

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <InspireUpliftLogo />
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, margin: 0 }}>
              <span style={{ color: "#1e3a5f" }}>SELLER</span>
              {" "}
              <span style={{ color: "#ef4444" }}>CENTRAL</span>
            </h1>
            <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 8, marginBottom: 0 }}>
              Welcome to Inspire Uplift Seller Central. Please login to your account.
            </p>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#374151", marginBottom: 7 }}>
              Email
            </label>
            <input
              type="email"
              className="seller-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#374151", marginBottom: 7 }}>
              Password
            </label>
            <div className="pw-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="seller-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                className="pw-eye"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <a href="#" className="forgot-link">Forgot your password?</a>
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="seller-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Logging in...
              </>
            ) : (
              <>
                Log In
                <ArrowRight />
              </>
            )}
          </button>

          {/* Register */}

          <Link to="/seller-signup/">
          <p style={{ fontSize: 13.5, color: "#374151", textAlign: "center", marginTop: 20, marginBottom: 0 }}>
            Not registered yet?{" "}
            <a href="#" className="seller-link">Create An Account</a>
          </p>

          </Link>
          
          {/* Terms */}
          <p style={{ fontSize: 12.5, color: "#9ca3af", textAlign: "center", marginTop: 14, lineHeight: 1.65, marginBottom: 0 }}>
            By clicking Log In, you agree to Inspire Uplift{" "}
            <a href="#" style={{ color: "#008ecf", textDecoration: "none" }}>Terms of Use</a>
            {" "}and{" "}
            <a href="#" style={{ color: "#008ecf", textDecoration: "none" }}>Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  );
}