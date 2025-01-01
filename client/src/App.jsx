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
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage";
import { getAllEvents } from "./redux/actions/eventAction";
import { getAllProducts } from "./redux/actions/productAction";
import api from "./utils/server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./pages/PaymentPage";
import ShopAllOrders from "./pages/Shop/ShopAllOrders";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopAllRefund from "./pages/Shop/ShopAllRefund";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
import DashBoardWithdrawPage from "./pages/Shop/DashBoardWithdrawPage";
import { ShopInBoxPage } from "./pages/Shop/ShopInBoxPage";
import UserInbox from "./pages/UserInbox";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { authenticateShop } = useSelector((state) => state.seller);

  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await api.get(`/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Store.dispatch(loadUser());
        await Store.dispatch(loadSeller());
        await Store.dispatch(getAllEvents());
        await Store.dispatch(getAllProducts());
        getStripeApikey();
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
          {/* Payment Route wrapped with Elements */}
          {stripeApikey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApikey)}>
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <PaymentPage />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}

          {/* Other Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route
            path="/order/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />

<Route
            path="/inbox"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserInbox />
              </ProtectedRoute>
            }
          />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
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

          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TrackOrderPage />
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
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllRefund />
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
            path="/shop/order/:id"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopAllOrders />
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
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopInBoxPage />
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
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <DashBoardWithdrawPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <SellerProtectedRoute authenticateShop={authenticateShop}>
                <ShopSettingsPage />
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
