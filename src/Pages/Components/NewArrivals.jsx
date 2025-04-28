import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [typedText, setTypedText] = useState("");
    const typingInterval = useRef(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            setIsLoading(true);
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;
                const res = await axios.get(`${baseUrl}/products/new-arrivals`, {
                    timeout: 10000
                });
                setFilteredProducts(res.data);
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    const handleMouseEnter = (desc, index) => {
        clearInterval(typingInterval.current);
        setHoveredIndex(index);
        setTypedText("");
        let i = 0;
        typingInterval.current = setInterval(() => {
            setTypedText(prev => {
                if (i < desc.length) {
                    const char = desc[i];
                    i++;
                    return prev + char;
                } else {
                    clearInterval(typingInterval.current);
                    return prev;
                }
            });
        }, 12);
    };

    const handleMouseLeave = () => {
        clearInterval(typingInterval.current);
        setHoveredIndex(null);
        setTypedText("");
    };

    const skeletonCard = Array(4)
        .fill(0)
        .map((_, i) => (
            <div
                key={i}
                className="bg-white animate-pulse min-w-[250px] min-h-[250px] w-[250px] h-[250px] sm:w-[250px] sm:h-[320px] rounded-xl shadow-md"
            />
        ));

    return (
        <div className="flex flex-col items-center h-fit py-5 sm:py-14">
            <h2 className="text-xl sm:text-3xl underline font-semibold mb-6 sm:mb-12 tracking-wider">
                NEW ARRIVALS
            </h2>

            <div className="w-full overflow-x-scroll md:overflow-hidden">
                {
                    isLoading
                        ? <div className="flex flex-row flex-nowrap gap-3 px-4 sm:px-0 sm:flex-wrap sm:justify-center scroll-smooth snap-x">{skeletonCard}</div>
                        : (
                            <div className="flex flex-row flex-nowrap gap-3 px-4 sm:px-0 sm:flex-wrap sm:justify-center scroll-smooth snap-x">
                                {filteredProducts.map((product, index) => (
                                    <Link
                                        to={`${product.category}/${product.id}`}
                                        key={index}
                                        className="snap-start shrink-0 group bg-white relative min-w-[250px] min-h-[250px] w-[250px] h-[250px] p-5 sm:p-0 sm:w-[250px] sm:h-[320px] rounded-xl overflow-hidden shadow-lg transition-all duration-[750ms] sm:ease-[cubic-bezier(0.25, 1, 0.5, 1)] sm:hover:w-[350px] sm:hover:h-[360px] hover:z-10"
                                        onMouseEnter={() => handleMouseEnter(product.description, index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img
                                            src={product.productAvatar}
                                            alt={product.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = "/fallback.png";
                                            }}
                                            className="w-full h-full object-contain transition-all !duration-[750ms] sm:ease-[cubic-bezier(0.25, 1, 0.5, 1)] sm:group-hover:scale-[1.1]"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-80 hover:bg-[rgba(0,0,0,0.4)] hover:backdrop-blur-[8px] transition-all duration-300 ease-out">
                                            <div className="p-5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-500 ease-out text-center">
                                                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                                <p className="text-sm">{hoveredIndex === index ? typedText : ""}</p>
                                            </div>
                                        </div>

                                    </Link>
                                ))}
                            </div>
                        )
                }
            </div>

            <Link
                to="collections/new-arrivals"
                className="mt-5 sm:mt-10 underline text-sm text-black hover:text-gray-700 transition-all duration-300"
            >
                See More
            </Link>
        </div>
    );
};

export default React.memo(NewArrivals);
