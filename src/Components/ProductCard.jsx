import { Link } from "react-router-dom";
import React from "react";

const ProductCard = ({ product }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className="relative group w-[90%] sm:min-w-[22%] sm:w-[300px] bg-white rounded-lg h-[55dvh] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    {product.badge}
                </div>
            )}

            {/* Image section */}
            <div className="h-[80%] aspect-auto bg-gray-100 w-full p-[2px]">
                <Link to={`/product/${product.item_category}/${product.item_id}`} className="w-full h-full aspect-auto">
                    <img
                        src={`${baseUrl}${product.productAvatar}`}
                        alt={product.item_name}
                        onError={(e) => {
                            e.currentTarget.src = "/fallback.png";
                            e.currentTarget.onerror = null;
                        }}
                        className="w-full h-full object-contain"
                    />
                </Link>
            </div>

            {/* Product Info */}
            <div className="p-2 h-[20%] text-center">
                <Link to={`/${product.item_category}/${product.item_id}`}>
                    <h2 className="font-semibold text-black text-lg group-hover:text-gray-800 transition-colors duration-300">
                        {product.item_name}
                    </h2>
                </Link>
                <div className="flex items-center justify-center gap-x-4">
                    <span className="text-red-500 line-through">₹{product.final_item_price}</span>
                    {product.final_item_price > product.final_item_price && (
                        <span className="animate-pulse font-semibold">₹{product.final_item_price}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
