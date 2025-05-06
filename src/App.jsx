import { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { Outlet } from "react-router-dom";
import { useCart } from "./GlobalState/CartContext";
import { setAuthToken } from "./utils/axiosInstance"; // import setAuthToken function

const App = () => {
  const { isCartOpen, toggleCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuthToken(token); // Set the token when app loads
    }
  }, []);

  return (
    <div
      className={`w-full roboto-condensed-medium overflow-hidden relative transition-all duration-500 ease-in-out 
        ${isCartOpen ? "pr-[25%]" : "pr-0"}`}
    >
      <NavBar toggleCart={toggleCart} />
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
