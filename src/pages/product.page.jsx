import Items from "../assets/items.json";
import { useShoppingContext } from "../contexts/shopping.context";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon";

export default function ProductPage() {
  const { addToCart } = useShoppingContext();
  const navigate = useNavigate();
  const categories = [...new Set(Items.map((product) => product.kategori))];

  return (
    <div className="bg-white">
      <div className=" mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="font-extrabold text-2xl">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              <div className=" mt-[1rem] mb-[1rem] mr-[1rem] grid grid-cols-1 gap-x-[1rem] gap-y-[1rem] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                {Items.filter((product) => product.kategori === category).map((product) => (
                  <div
                    key={product.urunID}
                    className="relative rounded-lg p-[1rem] border-[2px] border-gray-200 group text-sm"
                  >
                    <div
                      className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 non-touch:group-hover:opacity-70 cursor-pointer"
                      onClick={() => navigate(`/productDetail/${product.urunID}`)}
                    >
                      <img src={product.resim} className="object-cover" alt={product.tamAd} />
                    </div>
                    <h3 className="mt-4 font-medium text-gray-900">{product.tamAd}</h3>
                    <p className="italic text-gray-500">{product.model}</p>
                    <p className="mt-2 font-medium text-gray-900">
                      {product.fiyatHb} {product.dovizCins}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute bottom-2 right-2 px-3 outline-black bg-[#ed1c24] text-white py-2 rounded-md non-touch:hover:bg-gray-300"
                    >
                      <ShoppingCartIcon className="h-[2rem] w-[2rem]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
