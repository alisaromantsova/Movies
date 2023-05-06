/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense } from 'react';
import {
  Link,
  NavLink,
  useParams,
  Outlet,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './MoviePage.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MoviePage = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const id = useParams();
  const [film, setFilm] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id.movieId}?${KEY}`
        );
        const {
          original_title,
          release_date,
          poster_path,
          vote_average,
          overview,
          genres,
        } = response.data;
        const obj = {
          name: original_title,
          date: release_date.slice(0, 4),
          img: poster_path,
          rating: vote_average.toFixed(2),
          overview: overview,
          genres: genres,
        };
        setFilm(obj);
      } catch {
        console.log('error');
      }
    };
    fetch();
  }, []);
  const { img, name, date, rating, overview, genres } = film;
  return (
    <div className={css.section}>
      <Link to={backLinkHref} className={css.back}>
        Go back
      </Link>
      <div className={css.div}>
        {img && <img height="500px" src={`${IMG_URL}${img}`} alt="" />}
        <div className={css.textContainer}>
          {name ? (
            <h2 className={css.title}>
              {name}({date})
            </h2>
          ) : (
            'Not found'
          )}
          {rating ? (
            <p className={css.ratingP}>
              Rating: <span className={css.ratingSpan}>{rating}</span>
            </p>
          ) : (
            <p>Rating: Not found</p>
          )}
          <div className={css.genres}>
            <h3 className={css.ratingP}>Genres:</h3>
            <ul className={css.list}>
              {genres &&
                genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
            </ul>
          </div>
          <h3 className={css.overviewTitle}>Overview</h3>
          {overview ? <p className={css.overview}>{overview}</p> : 'Not found'}
          <ul className={css.buttons}>
            <li>
              <NavLink className={css.castLink} to="cast">
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink className={css.castLink} to="reviews">
                Review
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div></div>

      <Suspense
        fallback={
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            margin="auto"
          />
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MoviePage;
