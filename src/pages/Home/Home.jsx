import axios from 'axios';
import { useEffect, useState } from 'react';

import css from './Home.module.css';
import { Audio } from 'react-loader-spinner';
import { MoviesList } from 'components/MoviesList/MoviesList';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/day?${KEY}`
        );

        const filmNames = response.data.results.map(film => {
          const { title, name, id, poster_path, release_date } = film;
          const obj = {
            name: title || name,
            id: id,
            img: poster_path,
            date: release_date ? release_date.slice(0, 4) : '',
          };
          return obj;
        });
        setMovies(filmNames);
        setLoader(false);
      } catch {
        console.log('error');
      }
    };
    fetch();
  }, []);

  return (
    <section className={css.section}>
      <h1 className={css.title}>Trending today</h1>
      {loader && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          margin="auto"
        />
      )}
      <MoviesList movies={movies} />
    </section>
  );
};
export default Home;
