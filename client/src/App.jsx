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

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Store.dispatch(loadUser());
        setLoading(false);
      } catch (error) {
        console.error("Failed to load user", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
        </Routes>
      )}
    </div>
  );
}