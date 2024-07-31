import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { useShoppingContext } from "../contexts/shopping.context";
import Cart from "../components/cart";
import Logo from "../assets/logo.svg";

const ProtectedRoute = () => {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, setOpen } = useShoppingContext();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <header className="relative overflow-hidden">
        <nav
          aria-label="Top"
          className="border-[2px] border-gray-200 relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
              <NavLink to="/" className="ml-4 flex lg:ml-0">
                <img src={Logo} className="h-[30px] w-auto" />
              </NavLink>

              <NavLink to="/products" className="ml-9 text-m font-normal text-red-600 hover:text-red-800">
                Ürünler
              </NavLink>

              <div className="ml-auto flex items-center">
                <div className="flex lg:ml-6 relative">
                  <span className="sr-only">Ara</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />

                  {/* Arama Kutusu */}
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      onClick={() => {
                        setCartOpen(true);
                      }}
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItems?.length}
                    </span>
                    <span className="sr-only">Sepetteki Ürünler</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Cart open={cartOpen} setOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
