import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUpForm";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import { Loader } from "./components/layout/Loader";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import CheckOutPage from "./pages/CheckOutPage";
import ShopCreate from "./components/shop/ShopCreate";
import ShopLogin from "./components/shop/ShopLogin";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ShopDashBoardPage from "./pages/Shop/ShopDashBoardPage";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";
import ShopAllProducts from "./pages/Shop/ShopAllProducts";
import ShopDashBoardEventPage from "./pages/Shop/ShopDashBoardEventPage";
import ShopAllEvents from "./pages/Shop/ShopAllEvents";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { authenticateShop } = useSelector((state) => state.seller);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Store.dispatch(loadUser());
        await Store.dispatch(loadSeller());
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/order/success/:id" element={<OrderSuccessPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
            <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
            <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopDashBoardPage />
              </SellerProtectedRoute>
            }
          />
            <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopDashBoardEventPage />
              </SellerProtectedRoute>
            }
          />
             <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
               <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}
