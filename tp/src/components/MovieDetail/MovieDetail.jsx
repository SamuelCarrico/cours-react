import styles from './MovieDetail.module.css';
import {useParams} from "react-router";
import {useEffect, useState} from "react";

const MovieDetail = ({name, overview, release_date, img, rating}) => {
    const [movie, setMovie] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        fetch(import.meta.env.VITE_BASE_URL + '/movie/' + id + '?language=fr-FR', {
            method: 'get',
            headers: new Headers({
                Authorization: 'Bearer ' + import.meta.env.VITE_API_READ_KEY,
                'Content-Type': 'application/json'
            }),
        }).then(r => r.json())
            .then(data => {
                setMovie(data)
            })
    }, []);

    return (

        <div className={styles.movieCard}>
            <img src={import.meta.env.VITE_BASE_URL_IMAGE + img + '.svg'} alt='Image du film' width={82} height={64}/>
            <p className={styles.movieName}>{name}</p>
            <p className={styles.movieDesc}>{overview}</p>
            <p className={styles.movieYear}>{release_date}</p>
            <p className={styles.movieRating}>{rating}</p>
        </div>
    )
}
export default MovieDetail;