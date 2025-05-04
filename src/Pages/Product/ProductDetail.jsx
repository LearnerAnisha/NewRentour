import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../GlobalState/CartContext";
import { IoIosStar } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null); // state to control main image
    const { addToCart, cartLoading } = useCart();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`${baseUrl}/api/getitems/${id}`);
                setProduct(res.data);
                setMainImage(res.data.productAvatar);
            } catch (err) {
                console.error("Error fetching product:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, baseUrl]);

    if (loading) return <div className="p-6 text-center">Loading product...</div>;
    if (!product) return <div className="p-6 text-center text-red-500">Product not found.</div>;

    return (
        <div className="w-[80%] mx-auto p-6 grid md:grid-cols-2 gap-8 bg-white my-[1%] rounded-lg">
            {/* Left Section - Main image and thumbnails */}
            <div>
                {/* Main Image Display */}
                <div className="w-full h-[24rem] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={`${baseUrl}${mainImage}`}
                        alt={product.item_name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                            e.currentTarget.src = "/fallback.png";
                        }}
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-4">
                    {product.images?.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setMainImage(img)}
                            className="w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-95" // 👈 hover:scale-95 = zoom out
                        >
                            <img
                                src={`${baseUrl}${img}`}
                                alt={`Thumbnail ${i}`}
                                className="w-full h-full object-contain p-[2px] transition-transform duration-300"
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback.png";
                                }}
                            />
                        </div>

                    ))}
                </div>
            </div>

            {/* Right Section - Product Info */}
            <div>
                <h1 className="text-3xl font-bold">{product.item_name}</h1>
                <p className="text-gray-600 my-3">{product.item_description}</p>

                <div className="my-4">
                    <p className="text-xl text-green-600 font-semibold">₹{product.final_item_price}</p>
                    <p className="line-through text-gray-400">₹{product.offered_item_price}</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-900 grow-1 ">Renter: {product.publisher_name ? product.publisher_name : "Not Available"}</p>
                    <p className="text-sm text-gray-800 md:w-[25%]">Stock: {product.Quantity}</p>
                </div>



                {/* {features} */}
                <div className="flex justify-between mt-3 md:mt-6">
                    <div className="grow-1">
                        <h1>Features</h1>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {product.width && <li>Width: {product.width} cm</li>}
                            {product.height && <li>Height: {product.height} cm</li>}
                            {product.weight && <li>Weight: {product.weight} kg</li>}
                            {product.length && <li>Length: {product.length} cm</li>}
                        </ul>

                    </div>
                    {/* Add to Cart Button */}
                    <div className="self-end w-fit min-w-fit">
                        <button
                            disabled={cartLoading}
                            onClick={() => { addToCart(product.item_id) }}
                            className="text-[13px] sm:text-[14px] cursor-pointer px-6 py-1 border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            {cartLoading ? "Adding..." : "  Add to Cart"}
                        </button>
                    </div>
                </div>
                {/* Reviews Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                    {product.reviews?.length > 0 ? (
                        product.reviews.map((review, idx) => (
                            <div key={idx} className="border-t pt-3 mt-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={`${baseUrl}${review.profileImg}`}
                                        alt="user"
                                        className="w-8 h-8 object-contain rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.src = "/fallback.png";
                                        }}
                                    />
                                    <p className="font-medium">{review.user}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <IoIosStar key={i} className="text-yellow-500" />
                                    ))}
                                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                                        <span key={i} className="text-gray-300 text-lg">★</span>
                                    ))}
                                </div>
                                <p className="text-sm mt-1">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
