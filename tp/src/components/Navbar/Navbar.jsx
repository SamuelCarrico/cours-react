import {Link} from "react-router";
import styles from "./Navbar.module.css";
import {useContext, useState} from "react";
import {WishlistContext} from "../../context/WishlistProvider.jsx";

const Navbar = () => {
    const { nbOfMovies } = useContext(WishlistContext);
    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink}>Accueil</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/movies" className={styles.navLink} viewTransition>Films</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/wishlist" className={styles.navLink} viewTransition>Wishlist</Link>
                    </li>
                </ul>
                {nbOfMovies > 0 && (<span className={styles.badge}>{nbOfMovies}</span>)}
            </nav>

        </>
    );
};

export default Navbar;
