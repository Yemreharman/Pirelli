/* eslint-disable react/prop-types */
"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../contexts/shopping.context";

export default function Cart({ open, setOpen }) {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useShoppingContext();
  const subtotal = cartItems.reduce((acc, product) => acc + parseInt(product.fiyatHb) * parseInt(product.quantity), 0);
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900 sm:text-base">
                      Alışveriş Sepeti
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Paneli Kapat</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={product.urunID} className="flex py-6 sm:py-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.imageAlt}
                                src={product.resim}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 sm:text-sm">
                                  <h3>
                                    <Link to="#" className="sm:text-sm">
                                      {product.tamAd}
                                    </Link>
                                  </h3>
                                  <p className="ml-3 sm:text-sm">
                                    {product?.fiyatHb * product.quantity} {product?.dovizCins}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 sm:text-xs">{product.model}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm sm:text-xs">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => decrementQuantity(product.urunID)}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                                    disabled={product.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span className="text-lg">{product.quantity}</span>
                                  <button
                                    onClick={() => incrementQuantity(product.urunID)}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                                    disabled={product.quantity >= 12}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(product.urunID)}
                                    className="font-medium text-[#ed1c24] hover:text-red-800 sm:text-xs"
                                  >
                                    Kaldır
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 sm:text-sm">
                    <p>Toplam Tutar</p>
                    <p>
                      {subtotal} {cartItems[0]?.dovizCins}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button onClick={() => navigate("/shoppingcartPage")}>
                      <Link
                        to="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Sepete Git
                      </Link>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500 sm:text-xs">
                    <p>
                      ya da{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-[#ed1c24] hover:text-red-800 sm:text-xs"
                      >
                        Alışverişe Devam Et
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
