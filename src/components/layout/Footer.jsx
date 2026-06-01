import { ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ArrowUpIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer>
      {/* What Makes Us Unique */}
      <div className="bg-gray-50 py-12 pl-[83px] pr-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          What Makes ShopLine Marketplace Unique?
        </h2>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Free shipping", desc: "We are one of the few global online marketplaces that offer free shipping on the products we own. It's part of our commitment to create a shopping experience you won't forget." },
            { title: "Multiple payment options", desc: "Enjoy hassle-free payment options on Inspire Uplift marketplace. We accept credit/debit cards, PayPal, Google Pay, American Express and installment services like Afterpay, etc." },
            { title: "Digital & physical goods", desc: "The marketplace features an ever-growing number of sellers (small businesses to enterprise-level brands) who create both physical and digital products for you." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Get In Touch Bar */}
      <div className="bg-[#008ecf] text-white py-4 pl-[83px] pr-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6 flex-wrap text-sm">
            <span className="font-bold text-base">Get In Touch</span>
            <div className="flex items-center gap-2"><ChatBubbleLeftRightIcon className="w-5 h-5" /><span>24/7 Live Chat</span></div>
            <div className="flex items-center gap-2"><PhoneIcon className="w-5 h-5" /><span>1-877-780-2973</span></div>
            <div className="flex items-center gap-2"><EnvelopeIcon className="w-5 h-5" /><span>contact@inspireuplift.com</span></div>
            <div className="flex items-center gap-2"><MapPinIcon className="w-5 h-5" /><span>5335 NW 87th Ave C109 Ste #388 Miami, FL 33178</span></div>
          </div>
          <button onClick={scrollToTop} className="flex items-center gap-2 border border-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-white hover:text-[#008ecf] transition-colors">
            <ArrowUpIcon className="w-4 h-4" />Top
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0078b0] text-white pl-[83px] pr-6 py-10">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-base mb-4">Shop & Learn</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["Customer Reviews", "About Us", "Blog", "FAQs", "Sitemap"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["Help Center", "Track your Order", "Returns & Exchanges", "Need Help With Your Order?", "Contact Us", "Accessibility", "Policies"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Partner With Us</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["Sell with Inspire Uplift", "Seller Login", "Affiliates & Influencers", "Become a Brand Ambassador"].map((item) => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Sign Up For Exclusive Deals & Offers</h4>
            <div className="flex items-center bg-white rounded-full overflow-hidden mb-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-transparent" />
              <button className="px-4 py-2.5 text-sm font-semibold text-[#008ecf] hover:text-[#006a99] transition-colors whitespace-nowrap">Subscribe</button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-white rounded-full py-2.5 text-sm font-semibold hover:bg-white hover:text-[#008ecf] transition-colors mb-4">
              <DevicePhoneMobileIcon className="w-5 h-5" />Download the Inspire Uplift App
            </button>
            <p className="text-xs text-white/70 leading-relaxed text-center">
              Inspire Uplift is a US-based marketplace that sells unique products to shoppers globally. From home improvement and fashion to toys, gifts, pet items and more, our product variety and customer service aim to inspire you and uplift your everyday life.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#006a99] text-white pl-[83px] pr-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">Follow Us</span>
            {[{label:"Facebook",icon:"f"},{label:"X",icon:"𝕏"},{label:"Instagram",icon:"◎"},{label:"Medium",icon:"M"},{label:"YouTube",icon:"▶"},{label:"Pinterest",icon:"P"},{label:"TikTok",icon:"♪"}].map((s) => (
              <button key={s.label} aria-label={s.label} className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center text-sm font-bold hover:bg-white hover:text-[#008ecf] transition-colors">{s.icon}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm mr-1">We Accept</span>
            {["VISA","MC","AMEX","DISC","JCB","UP","Pay","PP","GPay","$","Klarna","Venmo"].map((p) => (
              <span key={p} className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#005f8a] text-white/70 pl-[83px] pr-6 py-3 flex items-center justify-between flex-wrap gap-2 text-xs">
        <span>Copyright @ 2026 - Inspire Uplift</span>
        <div className="flex items-center gap-4">
          {["Consent Preferences","Website Accessibility Policy","DMCA","Terms of Service","Privacy Policy"].map((item) => (
            <span key={item} className="hover:text-white cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}