import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const featuredCategories = [
  { name: "Men's Shoes", discount: "Up to 50%", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
  { name: "Nursery Decor", discount: "Up to 55%", img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&h=200&fit=crop" },
  { name: "Health & Pain Relief", discount: "Up to 30%", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop" },
  { name: "Women's Tops & Tees", discount: "Up to 60%", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop" },
  { name: "Father's Day Gifts", discount: "Up to 55%", img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop" },
  { name: "Women's Leggings", discount: "Up to 50%", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop" },
  { name: "Foot, Hand & Nail Care", discount: "Up to 30%", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop" },
  { name: "Kitchen & Dining", discount: "Up to 45%", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
  { name: "Skin Care", discount: "Up to 35%", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop" },
  { name: "Solar Garden", discount: "Up to 40%", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" },
];

const lovedCollections = [
  { name: "Children Toys For Learning And Play", discount: "Up to 30%", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop" },
  { name: "Women Bags", discount: "Up to 40%", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop" },
  { name: "Laundry Appliances", discount: "Up to 40%", img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200&h=200&fit=crop" },
  { name: "Maternity Sweater Dresses", discount: "Up to 50%", img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d8b?w=200&h=200&fit=crop" },
  { name: "Bird Supplies", discount: "Up to 30%", img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&h=200&fit=crop" },
  { name: "Networking Items", discount: "Up to 50%", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop" },
  { name: "Pet Hammocks", discount: "Up to 60%", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop" },
  { name: "Pet Dresses", discount: "Up to 30%", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop" },
  { name: "Home Decor", discount: "Up to 45%", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&h=200&fit=crop" },
  { name: "Gifts For Her", discount: "Up to 35%", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" },
];

function InfiniteCarousel({ title, items }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const positionRef = useRef(0);
  const animFrameRef = useRef(null);
  const SPEED = 0.5; // px per frame

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = 160; // w-36 + gap
    const totalWidth = items.length * itemWidth;

    const animate = () => {
      if (!paused) {
        positionRef.current += SPEED;
        if (positionRef.current >= totalWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [paused, items.length]);

  const slideLeft = () => {
    positionRef.current = Math.max(0, positionRef.current - 160);
  };

  const slideRight = () => {
    positionRef.current += 160;
  };

  return (
    <div className="py-8 border-b border-gray-100">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        {title}
      </h2>

      {/* Carousel Wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={slideLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Sliding Track Container */}
        <div
          className="overflow-hidden mx-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ willChange: "transform" }}
          >
            {doubled.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer group shrink-0 w-36"
              >
                {/* Circle with discount badge */}
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#008ecf] transition-all duration-200">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Green discount badge at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[11px] font-bold text-center py-1">
                    {cat.discount}
                  </div>
                </div>

                {/* Name */}
                <p className="text-sm font-semibold text-gray-800 text-center mt-2 leading-tight">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={slideRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default function CategorySection() {
  return (
    <section className="bg-white px-6">
      <InfiniteCarousel title="Featured Categories" items={featuredCategories} />
      <InfiniteCarousel title="Our Loved Collections" items={lovedCollections} />
    </section>
  );
}