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

export default function Home() {
  const [loading, setLoading] = useState(true);

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
        </Routes>
      )}
    </div>
  );
}
