import { createContext, useState, useEffect } from 'react';
const WishlistContext = createContext(null);

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie) => {
        setWishlist((prevWishlist) => [...prevWishlist, movie]);
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prevWishlist) => prevWishlist.filter(movie => movie.id !== movieId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export { WishlistContext };
export default WishlistProvider;
