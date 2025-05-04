import React, { useState } from "react";
import { useCart } from "../GlobalState/CartContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CartCard = ({ product }) => {
    const { addToCart, updateQuantity, removeFromCart } = useCart();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const isLoggedIn = !!localStorage.getItem("authToken");

    const [isRemoving, setIsRemoving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubtracting, setIsSubtracting] = useState(false);

    const handleSubtract = async () => {
        if (product?.quantity > 1) {
            setIsSubtracting(true);
            await updateQuantity(product?.home_item?.item_id, product.quantity - 1);
            setIsSubtracting(false);
        }
    };

    const handleAdd = async (id) => {
        setIsAdding(true);
        await addToCart(id);
        setIsAdding(false);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        await removeFromCart(product.id);
        setIsRemoving(false);
    };

    if (!product) return null;

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <img
                src={`${baseUrl}${product.productAvatar || "/fallback.png"}`}
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
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                        disabled={product.quantity <= 1 || !isLoggedIn || isSubtracting}
                    >
                        {isSubtracting ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-base" />
                        ) : (
                            "-"
                        )}
                    </button>
                    <span>{product.quantity}</span>
                    <button
                        onClick={() => handleAdd(product.home_item?.item_id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                        disabled={!isLoggedIn || isAdding}
                    >
                        {isAdding ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-base" />
                        ) : (
                            "+"
                        )}
                    </button>
                </div>
            </div>

            <button
                className="text-red-500 text-sm font-semibold hover:underline disabled:opacity-50 flex items-center gap-1"
                onClick={handleRemove}
                disabled={isRemoving || !isLoggedIn}
            >
                {isRemoving ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : (
                    "Remove"
                )}
            </button>
        </div>
    );
};

export default CartCard;
