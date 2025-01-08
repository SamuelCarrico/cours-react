import {useContext, useEffect} from "react";
import { WishlistContext } from "../../context/WishlistProvider";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Votre Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className={styles.emptyMessage}>Votre wishlist est vide.</p>
            ) : (
                <div className={styles.cardContainer}>
                    {wishlist.map((movie) => (
                        <div key={movie.id} className={styles.card}>
                            <img
                                className={styles.movieImage}
                                src={import.meta.env.VITE_BASE_URL_IMAGE + movie.img}
                                alt={`Affiche de ${movie.name}`}
                            />
                            <div className={styles.cardContent}>
                                <p className={styles.movieName}>{movie.name}</p>
                                <p className={styles.movieDesc}>{movie.overview}</p>
                                <button
                                    onClick={() => removeFromWishlist(movie.id)}
                                    className={styles.removeButton}
                                >
                                    Retirer de la wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
