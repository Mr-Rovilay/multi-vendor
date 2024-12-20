import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUpForm";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
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
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import CheckOutPage from "./pages/CheckOutPage";
import SellersPage from "./pages/SellersPage";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Store.dispatch(loadUser());
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
          <Route path="/seller" element={<SellersPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}
