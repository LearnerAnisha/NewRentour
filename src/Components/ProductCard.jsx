import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductCard = ({ product }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState(product); // 👈 Use a local copy

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const category = product.item_category;
                const [productRes, imagesRes] = await Promise.all([
                    axios.get(`${baseUrl}/api/category/${category}/`, { timeout: 10000 }),
                    axios.get(`http://127.0.0.1:8000/api/ph/`, { timeout: 10000 }),
                ]);

                console.log("Product details:", productRes.data);
                console.log("Images:", imagesRes.data);

                const matched = productRes.data.find(
                    p => p.item_id === product.item_id
                );

                const matchedImage = imagesRes.data.find(
                    img => img.item_name === matched?.item_name
                );

                if (matched) {
                    setProductData({
                        ...matched,
                        productAvatar: matchedImage?.item_photo || matched?.productAvatar
                    });
                }
            } catch (error) {
                console.error("Error fetching product details or images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [baseUrl, product.item_category, product.item_id]);

    return (
        <div className="relative group w-[90%] sm:min-w-[22%] sm:w-[300px] bg-white rounded-lg h-[55dvh] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            
            {/* Badge */}
            {productData.badge && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    {productData.badge}
                </div>
            )}

            {/* Image section */}
            <div className="h-[80%] aspect-auto bg-gray-100 w-full p-[2px]">
                <Link to={`/product/${productData.item_category}/${productData.item_id}`} className="w-full h-full aspect-auto">
                    <img
                        src={productData.productAvatar || "/fallback.png"}
                        alt={productData.item_name}
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
                <Link to={`/${productData.item_category}/${productData.item_id}`}>
                    <h2 className="font-semibold text-black text-lg group-hover:text-gray-800 transition-colors duration-300">
                        {productData.item_name}
                    </h2>
                </Link>
                <div className="flex items-center justify-center gap-x-4">
                    <span className="text-red-500 line-through">₹{productData.final_item_price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
