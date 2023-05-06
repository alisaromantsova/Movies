/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense } from 'react';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './MoviePage.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';

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

  return (
    <div className={css.section}>
      <Link to={backLinkHref} className={css.back}>
        Go back
      </Link>
      <MovieDetails film={film} />

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
