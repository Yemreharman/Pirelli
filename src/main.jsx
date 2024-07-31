import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login.jsx";
import HomePage from "./pages/home.jsx";
import ProductDetailPage from "./pages/productDetail.page.jsx";
import PaymentPage from "./pages/payment.page.jsx";
import ShoppingCartPage from "./pages/shoppingcartPage.jsx";
import { ShoppingProvider } from "./contexts/shopping.context.jsx";
import Product from "./pages/product.page.jsx";
import ProtectedRoute from "./pages/protected.route.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/productDetail/:productId", element: <ProductDetailPage /> },
      { path: "/products", element: <Product /> },
      { path: "/paymentPage", element: <PaymentPage /> },
      { path: "/shoppingcartPage", element: <ShoppingCartPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShoppingProvider>
    <RouterProvider router={router} />
  </ShoppingProvider>
);
