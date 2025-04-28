import React, { useContext } from 'react';
import { SearchContext } from '../../GlobalState/SearchContext';
import ProductCard from '../../Components/ProductCard';

const Search = () => {
    const { query, setQuery, results, loading } = useContext(SearchContext);

    return (
        <div className="min-h-[55vh] w-full px-4 py-6 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {loading && (
                    <p className="text-center text-gray-600 text-sm">Searching...</p>
                )}

                {!loading && results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {results.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && results.length === 0 && query.trim() !== '' && (
                    <p className="text-center text-gray-500 mt-8">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
