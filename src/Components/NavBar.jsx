import React, { useState, useRef, useEffect } from 'react';
import ProductCategory from './ProductsCategories';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../GlobalState/CartContext';
import { FaUser } from 'react-icons/fa6';
import { BsSearch, BsCart4 } from "react-icons/bs";
import { SiSellfy } from "react-icons/si";
import { useAuth } from '../GlobalState/AuthContext';

const NavBar = ({ toggleCart }) => {
    const { cartItems } = useCart();
    const { user, logout, isLoggedIn } = useAuth();
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [showUserMenu, setShowUserMenu] = useState(false);
    const userRef = useRef();
    const location = useLocation();
    const isRoot = location.pathname === "/";

    useEffect(() => {
        const handler = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="w-full bg-white pb-2 z-50 shadow-md relative">
            {/* Logo + Icons */}
            <div className='relative flex items-center w-full min-h-[70px] py-2'>
                {/* Logo */}
                <Link to="/" className='w-full flex items-center gap-2 sm:gap-4 px-[10px] justify-start md:justify-center z-[1]'>
                    <img src="/logo.svg" alt="logo" className='h-full w-[30px] sm:w-[40px] md:w-[50px] object-cover' />
                    <h1 className='lavishly-yours-regular text-3xl sm:text-5xl md:text-6xl font-bold'>RenTour</h1>
                </Link>

                {/* Icons */}
                <div className='absolute right-4 flex items-center gap-4 sm:gap-6 top-1/2 -translate-y-1/2 text-[16px] sm:text-[24px] z-50'>
                    {/* User Profile */}
                    <div className="relative" ref={userRef}>
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center justify-center" aria-label="User menu" title="Account">
                                    <FaUser className="text-[16px] sm:text-[24px]" />
                                </button>
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 min-w-fit bg-white border rounded-lg shadow p-2 z-50">
                                        <div className="font-medium px-2 py-1 flex items-center gap-1 text-[12px] md:text-[16px]">
                                            <span>👋</span>
                                            <span>{user?.username || user?.name || "user"}</span>
                                        </div>
                                        <hr className="my-1" />
                                        <Link
                                            to="https://rentour-seller-ruddy.vercel.app/"
                                            className="flex items-center gap-2 px-2 py-1 text-[12px] md:text-[16px] hover:bg-red-100 rounded"
                                        >
                                            <SiSellfy className='text-green-500' />
                                            Seller
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-2 py-1 text-red-600 text-[12px] md:text-[16px] hover:bg-red-100 rounded"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/auth" className="flex items-center justify-center" aria-label="Login" title="Login">
                                <FaUser className="text-[16px] sm:text-[24px]" />
                            </Link>
                        )}
                    </div>

                    {/* Search Icon */}
                    <Link to="/search" className="flex items-center justify-center" aria-label="Search" title="Search">
                        <BsSearch className="text-[16px] sm:text-[24px]" />
                    </Link>

                    {/* Cart Icon */}
                    <div onClick={toggleCart} className="relative cursor-pointer flex items-center justify-center" aria-label="Cart" title="Cart">
                        <BsCart4 className="text-[16px] sm:text-[24px]" />
                        {cartItemCount > 0 && isLoggedIn &&(
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Categories */}
            {!isRoot && (
                <div className="w-full">
                    <ProductCategory />
                </div>
            )}
        </div>
    );
};

export default NavBar;
