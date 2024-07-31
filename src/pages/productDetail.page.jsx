// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
import Items from "../assets/items.json";
import { useShoppingContext } from "../contexts/shopping.context";

export default function ProductDetail() {
  const { addToCart } = useShoppingContext();
  const { productId } = useParams();
  const selectedProduct = Items.find((product) => product.urunID === productId);

  if (!selectedProduct) {
    return <div>Ürün Bulunamadı</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <div className="flex flex-col items-center gap-8 ">
            <h1 className="text-4xl text-[#2E4053] mt-20"></h1>
            <h1 className="font-extrabold text-2xl">
              {selectedProduct?.kategori} {">"} {selectedProduct?.marka}
            </h1>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{selectedProduct?.tamAd}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="">
              Ürün Bilgileri
            </h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl"></p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="h-[14rem] line-clamp-[10] overflow-auto text-base text-gray-500">
                {selectedProduct?.aciklama}
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={selectedProduct?.resim}
              alt={selectedProduct?.tamAd}
              className="mt-[6rem] size-[25rem] object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <button
              onClick={() => addToCart(selectedProduct)}
              className="flex w-full items-center justify-center rounded-md bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-gray-300"
            >
              Sepete Ekle
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
