import styles from './MovieCard.module.css';
import {Link} from "react-router";
import {useContext, useEffect, useState} from "react";
import {WishlistContext} from "../../context/WishlistProvider.jsx";

const MovieCard = ({id, img, name, overview, release_date, rating}) => {
    const wishlist = useContext(WishlistContext);
    console.log(wishlist);
    const [isInWishlist, setIsInWishlist] = useState(wishlist.movieIsInWishlist(id));

    useEffect(() => {
        setIsInWishlist(wishlist.movieIsInWishlist(id));
    }, [wishlist, id]);

    function handleWishlistToggle() {
        if (isInWishlist) {
            wishlist.removeFromWishlist(id);
        } else {
            wishlist.addToWishlist({ id: id, name: name, overview: overview, rating: rating , img: img});
        }
        setIsInWishlist(!isInWishlist);
    }

    return (
        <div className={styles.card}>
            <img
                className={styles.movieImage}
                width={200}
                height={300}
                src={import.meta.env.VITE_BASE_URL_IMAGE + img}
                alt='Image du film'/>
            <p className={styles.movieName}>{name}</p>
            <p className={styles.movieDesc}>{overview}</p>
            <p className={styles.movieYear}>{release_date}</p>
            <div className={styles.movieRating}>
                {rating}
                <span className={styles.star}>★</span>
            </div>
            <div className={styles.movieButtons}>
                <button className={styles.movieSeeMoreButton}>
                    <Link className={styles.link} to={`/movie/${id}`}>Voir plus</Link>
                </button>
                <button
                    onClick={handleWishlistToggle}
                    className={`${styles.movieButton} ${isInWishlist ? styles.inWishlist : ''}`}
                >
                    {isInWishlist ? "Retirer de ma liste" : "Ajouter à ma liste"}
                </button>
            </div>

        </div>
    )
}
export default MovieCard;