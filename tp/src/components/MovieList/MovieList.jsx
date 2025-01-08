import {useEffect, useState} from "react";
import styles from './movieList.module.css';
import MovieCard from "../MovieCard/MovieCard.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Searchbar from "../Searchbar/Searchbar.jsx";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BASE_URL + '/movie/popular', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                    'Content-Type': 'application/json'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        if (!searchQuery) {
            fetchMovies()
            return;
        }
        setLoading(true);


        fetch(import.meta.env.VITE_BASE_URL + '/search/movie?query=' + searchQuery, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                setLoading(false);
            });
    };

    return (
        <>
            <Searchbar placeholder="Rechercher un film..." onSearch={handleSearch}/>
            <div>
                {loading && <p>Loading movies...</p>}
                {error && <p className={styles.error}>Error: {error}</p>}
                {!loading && !error && (
                    <ul className={styles.list}>
                        {movies.map(movie => (
                            <li key={movie.id} className={styles.movieCard}>
                                <MovieCard
                                    id={movie.id}
                                    name={movie.title}
                                    overview={movie.overview}
                                    release_date={movie.release_date}
                                    img={movie.poster_path}
                                    rating={movie.vote_average}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default MovieList;
