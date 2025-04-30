import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../utils/axiosInstance";

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date_desc");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/getitems/`);
                setProducts(res?.data);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching category products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, page, sort]);
    console.log("Products:", products);
    const handleSortChange = (e) => setSort(e.target.value);

    return (
        <div className="px-[2%] py-[1%]">
            <div className="flex justify-between mb-4">
                <select value={sort} onChange={handleSortChange} className="border p-1 rounded">
                    <option value="date_desc">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Rating</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-5">
                    {products.map((p) => <ProductCard key={p.item_id} product={p} />)}
                </div>
            ) : (
                <p>No products found in this category.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded border ${i + 1 === page ? "bg-black text-white" : "bg-white"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
