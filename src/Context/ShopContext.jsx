// Context/ShopContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  
  const [search, setSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendurl}/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error("Failed to sync cart with server.");
        console.error(error);
      }
    }
  };

const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);

  if (!cartData[itemId]) return;

  if (quantity === 0) {
    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }

  setCartItems(cartData);

  // ✅ Sync to backend if user is logged in
  if (token) {
    try {
      await axios.post(
        `${backendurl}/cart/update`,
        { itemId, size, quantity },
        { headers: { token } }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart on server.");
    }
  }
};




  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  const getCountAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(`${backendurl}/product/get`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch products.");
    }
  };

  const getUserCart = async () => {
    try {
      const res = await axios.get(`${backendurl}/cart/get`, {
        headers: { token }
      });

      if (res.data.success) {
        setCartItems(res.data.cart); // ✅ cart should be in correct format
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to load cart.");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  useEffect(() => {
    getProductData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowsearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCountAmount,
    backendurl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
