import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUpForm";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";

export default function Home() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <div className="">
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
      </Routes>
    </div>
  );
}
