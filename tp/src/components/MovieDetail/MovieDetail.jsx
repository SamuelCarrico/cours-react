import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import styles from "./MovieDetail.module.css";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer.jsx";

const MovieDetail = () => {
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [videos, setVideos] = useState([]);
    const [actors, setActors] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetch(import.meta.env.VITE_BASE_URL + "/movie/" + id, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => response.json())
            .then((data) => setMovie(data));

        fetch(import.meta.env.VITE_BASE_URL + "/movie/" + id + "/credits", {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => response.json())
            .then((data) => setActors(data.cast));

        fetch(import.meta.env.VITE_BASE_URL + "/movie/" + id + "/similar", {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            })
        })
            .then((response) => response.json())
            .then((data) => setSimilarMovies(data.results));

        fetch(import.meta.env.VITE_BASE_URL + "/movie/" + id + "/videos", {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); setVideos(data.results)});
    }, [id]);

    if (!movie) {
        return <div className={styles.loader}>Chargement...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={import.meta.env.VITE_BASE_URL_IMAGE + movie.poster_path}
                    alt={`Affiche de ${movie.title}`}
                />
                <div>
                    <h4>Films similaires</h4>
                    <ul className={styles.listSimilarMovies}>
                        {similarMovies.map((similarMovie) => (
                            <li key={similarMovie.id}>
                                <Link to={`/movie/${similarMovie.id}`}>
                                    <img
                                        className={styles.similarImage}
                                        src={import.meta.env.VITE_BASE_URL_IMAGE + similarMovie.poster_path}
                                        alt={`Affiche de ${similarMovie.title}`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className={styles.details}>
                <h1 className={styles.name}>{movie.title}</h1>
                <p className={styles.overview}>{movie.overview}</p>
                <p className={styles.meta}>
                    <span className={styles.releaseDate}>
                        Date de sortie : {movie.release_date}
                    </span>
                    <span className={styles.rating}>
                        {movie.vote_average} <span className={styles.star}>★</span>
                    </span>
                </p>
                <div>
                    <YoutubePlayer className={styles.videoWrapper}
                                   key={videos.filter((video) => video.type.toLowerCase() === "trailer".toLowerCase())[0]?.key}/>
                </div>
            </div>
            <div className={styles.actors}>
                <h2 className={styles.actorsTitle}>Acteurs</h2>
                <ul className={styles.actorsList}>
                    {actors.slice(0, 10).map((actor) => (
                        <li key={actor.id} className={styles.actorItem}>
                            <img
                                className={styles.actorImage}
                                src={import.meta.env.VITE_BASE_URL_IMAGE + actor.profile_path}
                                alt={actor.name}
                            />
                            <p className={styles.actorName}>{actor.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieDetail;
