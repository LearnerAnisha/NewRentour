import React from "react";
import { LuPanelRightClose } from "react-icons/lu";
import { useCart } from "../GlobalState/CartContext";
import { Link } from "react-router-dom";
import CartCard from "./CartCard";
// import axiosInstance from "../utils/axiosInstance";

const Cart = ({ isOpen, toggleCart }) => {
  const { cartItems } = useCart();
  // const [cartItems, setCartItems] = useState([]);
  const isLoggedIn = !!localStorage.getItem("authToken");

  // useEffect(() => {
  //   const getCart = async () => {
  //     const { data } = await axiosInstance.get("/cart/summary/");
  //     setCartItems(data);
  //   }
  //   getCart();
  // }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.home_item?.final_item_price * item.quantity,
    0
  );


  return (
    <div
      className={`fixed top-0 right-0 h-full 
        w-full sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%]
        bg-white border-l border-gray-300 p-4 shadow-lg z-50
        transform transition-transform duration-500 ease-in-out overflow-y-scroll 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <LuPanelRightClose
        className="text-black font-bold text-xl absolute top-4 right-4 cursor-pointer"
        onClick={toggleCart}
      />

      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {!isLoggedIn ? (
        <div className="mt-4 text-center text-sm text-red-600 font-medium">
          Please{" "}
          <Link onClick={toggleCart} to="/auth" className="text-blue-600 underline hover:text-blue-800">
            log in
          </Link>{" "}
          to use your cart.
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">No items in the cart.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <CartCard key={index} product={item} />
          ))}

          {/* Total & Checkout */}
          <div className="mt-4">
            <p className="text-lg font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
            <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
