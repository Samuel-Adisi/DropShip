import { useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import HeroBanner from "./components/home/HeroBanner";
import PromoSection from "./components/home/PromoSection";
import ProductGrid from "./components/products/ProductGrid";
import CategorySection from "./components/home/CategorySection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import MostReviewed from "./components/home/MostReviewed";
import RecentDiscoveries from "./components/home/RecentDiscoveries";
import RecentlyViewed from "./components/home/RecentlyViewed";

function App() {
  const heroBannerRef = useRef(null);
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar heroBannerRef={heroBannerRef} />
        {/* Single wrapper: ml-[75px] clears fixed sidebar, px-4 is the ONE source of horizontal padding */}
        <main className="flex-1 min-w-0 ml-[50px]">
          <div className="px-4">
            <div ref={heroBannerRef}>
              <HeroBanner />
            </div>
            <PromoSection />
            <ProductGrid />
            <CategorySection />
            <FeaturedProducts />
            <MostReviewed />
            <RecentDiscoveries />
            <RecentlyViewed />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;