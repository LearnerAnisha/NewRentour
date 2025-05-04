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
  // const hasSynced = useRef(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Group duplicate entries by item_id
  // const normalizeCart = (rawCart) => {
  //   const grouped = {};

  //   rawCart.forEach(({ home_item, quantity }) => {
  //     const id = home_item.item_id;
  //     if (!grouped[id]) {
  //       grouped[id] = {
  //         productid: id,
  //         quantity,
  //         home_item,
  //       };
  //     } else {
  //       grouped[id].quantity += quantity;
  //     }
  //   });

  //   return Object.values(grouped);
  // };

  // Sync on login or first load
  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (isLoggedIn) {
        try {
          const res = await axiosInstance.get(`/cart/summary/`);
          // const backendCart = normalizeCart(res.data || []);
          setCartItems(res.data);
          // localStorage.setItem("cart", JSON.stringify(backendCart));

          // hasSynced.current = true;
        } catch (error) {
          console.error("Cart sync failed:", error);
        }
      }
    };

    syncCartWithBackend();
  }, [isLoggedIn]);

  const addToCart = async (productid) => {
    if (!isLoggedIn) return;
    const existingItem = cartItems.find(item => item.home_item?.item_id === productid);
    if (existingItem) {
      removeFromCart(existingItem.id);
    }
    const quantity = existingItem ? existingItem?.quantity + 1 : 1;

    try {
      await axiosInstance.post("/cart/add/", {
        item_id: productid,
        quantity: quantity,
      });
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };


  const updateQuantity = async (productid) => {
    if (!isLoggedIn) return;
    const existingItem = cartItems.find(item => item.home_item?.item_id === productid);
    if (existingItem) {
      removeFromCart(existingItem.id);
    }
    const quantity = existingItem ? existingItem?.quantity - 1 : 1;

    try {
      await axiosInstance.post("/cart/add/", {
        item_id: productid,
        quantity: quantity,
      });
    } catch (err) {
      console.error("Failed to subtract item to cart:", err);
    }
  };


  const removeFromCart = async (productid) => {
    // const updatedCart = cartItems.filter((item) => item.productid !== productid);
    // setCartItems(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isLoggedIn) {
      try {
        await axiosInstance.delete(`/cart/remove/${productid}/`);
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
    }
  };

  // const updateQuantity = async (productid, quantity) => {
  //   if (quantity <= 0) return removeFromCart(productid);

  //   const updatedCart = cartItems.map((item) =>
  //     item.productid === productid ? { ...item, quantity } : item
  //   );
  //   setCartItems(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));

  //   if (isLoggedIn) {
  //     try {
  //       await axiosInstance.post("/cart/add/", {
  //         item_id: productid,
  //         quantity,
  //       });
  //     } catch (err) {
  //       console.error("Failed to update quantity:", err);
  //     }
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItems,
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
