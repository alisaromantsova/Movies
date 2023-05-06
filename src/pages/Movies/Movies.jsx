import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './Movies.module.css';
import { Audio } from 'react-loader-spinner';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { SearchForm } from 'components/SearchForm/SearchForm';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';

const Movies = () => {
  const [formValue, setFormValue] = useState('');

  const [movies, setMovies] = useState(null);

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `${BASE_URL}?${KEY}&query=${formValue}`
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
    if (formValue) {
      fetch();
    } else {
      setMovies(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  return (
    <div className={css.section}>
      <h1 className={css.title}>Search movies</h1>
      <SearchForm setFormValue={setFormValue} />

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

      {movies && movies.length > 0 && <MoviesList movies={movies} />}
      {movies && movies.length === 0 && <p>We haven't found anything.</p>}
    </div>
  );
};
export default Movies;
