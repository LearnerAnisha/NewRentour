import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { SearchProvider } from "./SearchContext";

const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <CartProvider>
                    <SearchProvider>
                        {children}
                    </SearchProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default AppProvider;
