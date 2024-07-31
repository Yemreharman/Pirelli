import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import Items from "../assets/items.json";

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const openProductSection = () => {
    setProductOpen(true);
  };

  const closeProductSection = () => {
    setProductOpen(false);
  };

  const filterProducts = (term) => {
    const filtered = Items.filter((product) => product.tamAd.toLowerCase().includes(term.toLowerCase()));
    setFilteredProducts(filtered);
  };
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.urunID === product.urunID);
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + 1;
        if (newQuantity > 12) {
          return prevItems;
        }
        return prevItems.map((item) => (item.urunID === product.urunID ? { ...item, quantity: newQuantity } : item));
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.urunID !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity < 1 || quantity > 12) {
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.urunID === productId ? { ...item, quantity: quantity } : item))
    );
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.urunID === productId && item.quantity < 12) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.urunID === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedItems;
    });
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        open,
        productOpen,
        openProductSection,
        closeProductSection,
        addToCart,
        cartOpen,
        setCartOpen,
        removeFromCart,
        updateCartItemQuantity,
        incrementQuantity,
        decrementQuantity,
        setOpen,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        filterProducts,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);

  if (!context) {
    console.log("useShoppingContext must be used within a ShoppingProvider");
  }

  return context;
};

ShoppingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
