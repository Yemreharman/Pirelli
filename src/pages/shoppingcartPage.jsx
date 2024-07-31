import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../contexts/shopping.context";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ShoppingCart() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useShoppingContext();
  const [items, setItems] = useState(cartItems);
  const subtotal = items.reduce((acc, product) => acc + parseInt(product.fiyatHb) * parseInt(product.quantity), 0);
  const navigate = useNavigate();
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);
  const goToPayment = () => {
    if (items.length > 0) {
      navigate("/paymentPage");
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Alışveriş Sepeti</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Alışveriş Sepetinizdeki Ürünler
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((product) => (
                <li key={product.urunID} className="flex py-6 sm:py-10 relative">
                  <div className="flex-shrink-0">
                    <img
                      src={product.resim}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link to={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.tamAd}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.fiyatHb} {product.dovizCins}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(product?.urunID)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                            disabled={product.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-lg">{product.quantity}</span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(product?.urunID)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                            disabled={product.quantity >= 12}
                          >
                            +
                          </button>
                        </div>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => removeFromCart(product.urunID)}
                          >
                            <span className="sr-only">Kaldır</span>
                            <TrashIcon className="h-7 w-7" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="flex flex-col gap-3 mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Sipariş Toplamı ({items.length} Ürün)
            </h2>

            <div className="flex gap-3 flex-col mt-6">
              {items.map((product) => (
                <div key={product.urunID}>
                  <div className="flex justify-between text-sm text-gray-700">
                    <p>{product?.tamAd}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <p>
                      {product?.fiyatHb * product?.quantity} {product?.dovizCins}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-6">
              <p>Toplam Tutar</p>
              <p>
                {subtotal} {items[0]?.dovizCins}
              </p>
            </div>
            <button
              onClick={() => goToPayment()}
              className="w-full rounded-md border border-transparent bg-gray-400 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Ödemeye Geç
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
