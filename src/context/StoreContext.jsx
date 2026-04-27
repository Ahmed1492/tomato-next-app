"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const menu_list = [
  { menu_name: "salad", menu_image: "/menu_1.png" },
  { menu_name: "Rolls", menu_image: "/menu_2.png" },
  { menu_name: "Deserts", menu_image: "/menu_3.png" },
  { menu_name: "Sandwich", menu_image: "/menu_4.png" },
  { menu_name: "Cake", menu_image: "/menu_5.png" },
  { menu_name: "Pure-Veg", menu_image: "/menu_6.png" },
  { menu_name: "Pasta", menu_image: "/menu_7.png" },
  { menu_name: "Noodles", menu_image: "/menu_8.png" },
];

export const StoreContextProvider = ({ children }) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [foodLoading, setFoodLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) await addToCartServer(itemId);
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) await removeFromCartServer(itemId);
  };

  const cartTotal = () => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = data.find((i) => i._id === id);
        if (item) total += item.price * cartItems[id];
      }
    }
    return total;
  };

  const getFoods = async () => {
    try {
      setFoodLoading(true);
      const res = await axios.get(`${url}/api/food/get`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setData(res.data.food);
    } catch (e) {
      console.log(e);
    } finally {
      setFoodLoading(false);
    }
  };

  const addToCartServer = async (itemId) => {
    try {
      await axios.post(`${url}/api/cart/add`, { itemId }, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      await fetchCardData();
    } catch (e) { console.log(e); }
  };

  const removeFromCartServer = async (itemId) => {
    try {
      await axios.put(`${url}/api/cart/remove`, { itemId }, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      await fetchCardData();
    } catch (e) { console.log(e); }
  };

  const fetchCardData = async () => {
    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      setCartItems(res?.data?.userCart || {});
    } catch (e) { console.log(e); }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios(`${url}/api/auth/user-data`, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      setUserData(res.data.user);
    } catch (e) { console.log(e); }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${url}/api/favorites/get`, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      setFavorites(res.data.favorites || []);
    } catch (e) { console.log(e); }
  };

  const addToFavorites = async (itemId) => {
    setFavorites((prev) => [...prev, itemId]);
    if (token) {
      try {
        await axios.post(`${url}/api/favorites/add`, { itemId }, {
          headers: { token, "ngrok-skip-browser-warning": "true" },
        });
      } catch (e) { console.log(e); }
    }
  };

  const removeFromFavorites = async (itemId) => {
    setFavorites((prev) => prev.filter((id) => id !== itemId));
    if (token) {
      try {
        await axios.delete(`${url}/api/favorites/remove`, {
          data: { itemId },
          headers: { token, "ngrok-skip-browser-warning": "true" },
        });
      } catch (e) { console.log(e); }
    }
  };

  const isFavorite = (itemId) => favorites.includes(itemId);

  useEffect(() => { getFoods(); }, []);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("food_flow_token");
      if (saved) {
        setToken(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCardData();
      fetchUserData();
      fetchFavorites();
    }
  }, [token]);

  return (
    <StoreContext.Provider value={{
      url, cartItems, setCartItems, token, setToken,
      data, setData, userData, fetchUserData,
      addToCart, removeFromCart, cartTotal,
      addToCartServer, removeFromCartServer, foodLoading,
      menu_list,
      favorites, addToFavorites, removeFromFavorites, isFavorite,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
export default StoreContextProvider;
