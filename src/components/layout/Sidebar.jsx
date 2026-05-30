import { useState, useEffect, useRef } from "react";

const categories = [
  { name: "Father's Day Deals", img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop", special: true },
  { name: "Unique Gift Ideas For Everyone", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop" },
  { name: "Solar Garden Decor", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" },
  { name: "Kitchen & Dining", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
  { name: "Gifts For Him", img: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=200&h=200&fit=crop" },
  { name: "Gifts For Her", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" },
  { name: "Women's Clothing", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop" },
  { name: "Skin Care", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop" },
  { name: "Toys", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop" },
];

export default function Sidebar({ heroBannerRef }) {
  const [visible, setVisible] = useState(false);
  const scrollTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroBannerRef?.current) return;

      // Get hero banner's bottom edge position relative to viewport
      const heroBottom = heroBannerRef.current.getBoundingClientRect().bottom;

      // If hero bottom is still visible (above 0), hide sidebar completely
      if (heroBottom > 0) {
        setVisible(false);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        return;
      }

      // Hero has scrolled past top — hide while scrolling, show when stopped
      setVisible(false);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setVisible(true);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [heroBannerRef]);

  return (
    // Sidebar.jsx outer div — change sticky to fixed
    <div className="w-[75px] shrink-0 fixed top-0 left-0 h-screen z-40">
      <div
        className="w-full h-full bg-[#008ecf] overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div className="flex flex-col items-center gap-3 py-4 px-1">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer group w-full"
            >
              <div
                className={`w-12 h-12 rounded-full overflow-hidden border-2 
                  ${cat.special
                    ? "border-pink-400"
                    : "border-white/40 group-hover:border-white"
                  } transition-all duration-200`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-white text-center text-[8px] font-semibold mt-1 leading-tight">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}