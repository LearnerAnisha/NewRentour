import React from "react";
import { useCart } from "../GlobalState/CartContext";
// import axiosInstance from "../utils/axiosInstance";

const CartCard = ({ product }) => {
    const { addToCart, updateQuantity, removeFromCart } = useCart();
    // const [product, setProduct] = useState(null);
    // const [quantity, setQuantity] = useState(1);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const res = await axiosInstance.get(`${baseUrl}/cart/summary/${item_id}/`);
    //             setProduct(res.data.home_item);
    //             setQuantity(res.data.quantity);
    //         } catch (err) {
    //             console.error("Failed to fetch cart summary:", err);
    //         }
    //     };

    //     if (item_id) {
    //         fetchProduct();
    //     }
    // }, [item_id, isCartOpen, baseUrl]);

    const isLoggedIn = !!localStorage.getItem("authToken");

    const handleSubtract = () => {
        if (product?.quantity > 1) {
            updateQuantity(product?.home_item?.item_id, product.quantity - 1);
        }
    };

    const handleAdd = (id) => {
        addToCart(id)
    };

    if (!product) return null;

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <img
                src={`${baseUrl}${product.productAvatar ? product.productAvatar : "/fallback.png"}`}
                alt={product?.home_item?.item_name}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.src = "/fallback.png";
                }}
                className="w-16 h-16 object-contain"
            />
            <div className="flex-1 px-3">
                <h3 className="text-sm font-medium">{product?.home_item?.item_name}</h3>
                <p className="text-xs text-gray-500">
                    ₹{product?.home_item.final_item_price} x {product.quantity}
                </p>

                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={handleSubtract}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        disabled={product.quantity <= 1 || !isLoggedIn}
                    >
                        -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                        onClick={() => { handleAdd(product.home_item?.item_id) }}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        disabled={!isLoggedIn}
                    >
                        +
                    </button>
                </div>
            </div>

            <button
                className="text-red-500 text-sm font-semibold hover:underline disabled:opacity-50"
                onClick={() => removeFromCart(product.id)}
                disabled={!isLoggedIn}
            >
                Remove
            </button>
        </div>
    );
};

export default CartCard;
