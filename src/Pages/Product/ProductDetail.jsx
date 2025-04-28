import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../GlobalState/CartContext";
import { IoIosStar } from "react-icons/io";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null); // state to control main image
    const { addToCart } = useCart();

    // Fetch product details
    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/products/${id}`);
                setProduct(res.data);
                setMainImage(res.data.productAvatar); // set initial main image
            } catch (err) {
                console.error("Error fetching product:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Loading product...</div>;
    if (!product) return <div className="p-6 text-center text-red-500">Product not found.</div>;

    return (
        <div className="w-[80%] mx-auto p-6 grid md:grid-cols-2 gap-8 bg-white my-[1%] rounded-lg">
            {/* Left Section - Main image and thumbnails */}
            <div>
                {/* Main Image Display */}
                <div className="w-full h-[24rem] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
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
                                src={img}
                                alt={`Thumbnail ${i}`}
                                className="w-full h-full object-contain p-[2px] transition-transform duration-300"
                            />
                        </div>

                    ))}
                </div>
            </div>

            {/* Right Section - Product Info */}
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600 my-3">{product.description}</p>

                <div className="my-4">
                    <p className="text-xl text-green-600 font-semibold">₹{product.offeredPrice}</p>
                    <p className="line-through text-gray-400">₹{product.originalPrice}</p>
                </div>

                <p className="text-sm text-gray-500">Stock: {product.stock}</p>

                {/* Add to Cart Button */}
                <div className="mt-4 flex gap-4 sm:gap-7">
                    <button
                        onClick={() => { addToCart(product.id, product.offeredPrice) }}
                        className="text-[13px] sm:text-[14px] cursor-pointer px-6 py-1 border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Add to Cart
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                    {product.reviews?.length > 0 ? (
                        product.reviews.map((review, idx) => (
                            <div key={idx} className="border-t pt-3 mt-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={review.profileImg}
                                        alt="user"
                                        className="w-8 h-8 object-contain rounded-full"
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
