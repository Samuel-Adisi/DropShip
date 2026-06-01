import HeroBanner from "../components/home/HeroBanner";
import PromoSection from "../components/home/PromoSection";
import ProductGrid from "../components/products/ProductGrid";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import MostReviewed from "../components/home/MostReviewed";
import RecentDiscoveries from "../components/home/RecentDiscoveries";
import RecentlyViewed from "../components/home/RecentlyViewed";

export default function HomePage({ heroBannerRef }) {
  return (
    <div className="px-4">
      <div ref={heroBannerRef}><HeroBanner /></div>
      <PromoSection />
      <ProductGrid />
      <CategorySection />
      <FeaturedProducts />
      <MostReviewed />
      <RecentDiscoveries />
      <RecentlyViewed />
    </div>
  );
}