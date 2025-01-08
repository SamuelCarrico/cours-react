import {createContext, useState, useEffect} from "react";

const WishlistContext = createContext(undefined);

const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const [nbOfMovies, setNbOfMovies] = useState(() => wishlist.length);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        setNbOfMovies(wishlist.length);
    }, [wishlist]);

    const addToWishlist = ({id: id, name: name, overview: overview, rating: rating, img: img}) => {
        if (wishlist.some((wishedMovie) => wishedMovie.id === id)) {
            console.warn(`Le film avec l'ID ${movie.id} est déjà dans la wishlist.`);
            return;
        }
        setWishlist((prevWishlist) => [...prevWishlist, {
            id: id,
            name: name,
            overview: overview,
            rating: rating,
            img: img
        }]);
    };

    const removeFromWishlist = (movieId) => {
        if (!wishlist.some((movie) => movie.id === movieId)) {
            console.warn(`Le film avec l'ID ${movieId} n'est pas dans la wishlist.`);
            return;
        }
        setWishlist((prevWishlist) =>
            prevWishlist.filter((movie) => movie.id !== movieId)
        );
    };

    const movieIsInWishlist = (movieId) => {
        return wishlist.some((movie) => movie.id === movieId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                movieIsInWishlist,
                clearWishlist,
                nbOfMovies,
                setNbOfMovies
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export {WishlistContext};
export default WishlistProvider;
