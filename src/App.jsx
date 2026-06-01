import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";

function App() {
  const heroBannerRef = useRef(null);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <div>
            <Navbar />
            <div className="flex">
              <Sidebar heroBannerRef={heroBannerRef} />
              <main className="flex-1 min-w-0 ml-[50px]">
                <HomePage heroBannerRef={heroBannerRef} />
              </main>
            </div>
            <Footer />
          </div>
        } />

        <Route path="/product/:id" element={
          <div>
            <Navbar />
            <ProductDetail />
            <Footer />
          </div>
        } />

        <Route path="/cart/" element={
          <div>
            <Navbar />
            <CartPage />
            <Footer />
          </div>
        } />

        {/* No Navbar or Footer here */}
        <Route path="/checkout/" element={<CheckoutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;