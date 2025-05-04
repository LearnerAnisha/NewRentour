import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const local = localStorage.getItem("cart");
    return local ? JSON.parse(local) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setLoading] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (isLoggedIn) fetchCartItems();
  }, [isLoggedIn]);

  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get(`/cart/summary/`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Cart sync failed:", error);
    }
  };

  const addToCart = async (productid) => {
    if (!isLoggedIn) return;
    setLoading(true);
    const existingItem = cartItems.find(item => item.home_item?.item_id === productid);
    if (existingItem) {
      await removeFromCart(existingItem.id, false);
    }
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    try {
      const res = await axiosInstance.post("/cart/add/", {
        item_id: productid,
        quantity,
      });

      if (res?.status === 201 || res?.data?.status === "success") {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productid) => {
    if (!isLoggedIn) return;
    setLoading(true);
    const existingItem = cartItems.find(item => item.home_item?.item_id === productid);
    if (!existingItem) return;

    const newQty = existingItem.quantity - 1;
    await removeFromCart(existingItem.id, false);

    if (newQty < 1) {
      await fetchCartItems();
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/cart/add/", {
        item_id: productid,
        quantity: newQty,
      });

      if (res?.status === 201 || res?.data?.status === "success") {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productid, shouldRefresh = true) => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/cart/remove/${productid}/`);

      if (res?.status === 204 && shouldRefresh) {
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItems,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
