import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignUpForm";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import HomePage from "./pages/HomePage";

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
      </Routes>
    </div>
  );
}
