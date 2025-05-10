import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../GlobalState/CartContext";
import { IoIosStar } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const { addToCart, cartLoading } = useCart();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const [productRes, imageRes] = await Promise.all([
                    axiosInstance.get(`${baseUrl}/api/getitems/${id}`),
                    axiosInstance.get(`http://127.0.0.1:8000/api/ph/`)
                ]);
    
                const fetchedProduct = productRes.data;
                const images = imageRes.data;

                console.log(images);
    
                const matchedImage = images.find(img => img.item_name === fetchedProduct.item_name);
                if (matchedImage) {
                    fetchedProduct.productAvatar = matchedImage.item_photo;
                    fetchedProduct.images = [matchedImage.item_photo]; 
                }
    
                setProduct(fetchedProduct);
                setMainImage(fetchedProduct.productAvatar);
            } catch (err) {
                console.error("Error fetching product or image:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id, baseUrl]);
    

    if (loading) return <div className="p-6 text-center">Loading product...</div>;
    if (!product)
        return (
            <div className="p-6 text-center text-red-500">Product not found.</div>
        );

    return (
        <div className="w-[80%] mx-auto p-6 grid md:grid-cols-2 gap-8 bg-white my-[1%] rounded-lg">
            {/* Left Section */}
            <div>
                {/* Main Product Image */}
                <div className="w-full h-[24rem] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={product.productAvatar || "/fallback.png"}
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
                            className="w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-95"
                        >
                            <img
                                src={product.productAvatar || "/fallback.png"}
                                alt={`Thumbnail ${i}`}
                                className="w-full h-full object-contain p-[2px]"
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback.png";
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Buttons Below Image - Centered */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        disabled={cartLoading}
                        onClick={() => addToCart(product.item_id)}
                        className="min-w-[140px] px-6 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300"
                    >
                        {cartLoading ? "Adding..." : "Add to Cart"}
                    </button>
                    <Link
                        to={"/buynow"}
                        className="min-w-[140px] px-6 py-2 bg-green-600 text-white hover:bg-white hover:text-green-600 border border-green-600 transition-all duration-300"
                        onClick={() => {
                            addToCart(product.item_id);
                        
                        }}
                    >
                        Buy Now
                    </Link>
                </div>

            </div>

            {/* Right Section */}
            <div>
                <h1 className="text-3xl font-bold">{product.item_name}</h1>
                <p className="text-gray-600 my-3">{product.item_description}</p>

                <div className="my-4">
                    <p className="text-xl text-green-600 font-semibold">
                        ₹{product.final_item_price}
                    </p>
                    <p className="line-through text-gray-400">
                        ₹{product.offered_item_price}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    {/* <p className="text-sm text-gray-900 grow-1">
                        Renter: {product.publisher_name || "Not Available"}
                    </p> */}
                    <p className="text-sm text-gray-800 md:w-[25%]">
                        Stock: {product.Quantity}
                    </p>
                </div>

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
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                    {product.reviews ? (
        <div className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2">
                <img
                    src="/fallback.png"
                    alt="user"
                    className="w-8 h-8 object-contain rounded-full"
                />
                <p className="font-medium">Anonymous</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <IoIosStar key={i} className="text-yellow-500" />
                ))}
            </div>
            <p className="text-sm mt-1">{product.reviews}</p>
        </div>
    ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
    )}
</div>

            </div>
        </div>
    );
};

export default ProductDetail;
