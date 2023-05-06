import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './Movies.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get('search');
  const [movies, setMovies] = useState(null);
  const [changingValue, setChangingValue] = useState(
    searchParams.get('search')
  );
  const [submitValue, setSubmitValue] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `${BASE_URL}?${KEY}&query=${searchWord}`
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
    if (searchWord) {
      fetch();
    } else {
      setMovies(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValue]);

  return (
    <div className={css.section}>
      <h1 className={css.title}>Search movies</h1>
      <form
        className={css.form}
        onSubmit={e => {
          e.preventDefault();
          if (e.target[0].value.trim()) {
            setSearchParams({ search: e.target[0].value.trim() });
            setSubmitValue(e.target[0].value.trim());
          } else {
            setSearchParams({});
          }
        }}
      >
        <input
          onChange={e => {
            setChangingValue(e.target.value);
            setSearchParams({ search: e.target.value });
          }}
          className={css.input}
          plaseholder="Film name..."
          value={changingValue}
        />
        <button className={css.button}>Search</button>
      </form>
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

      {movies && movies.length > 0 && (
        <ul className={css.list}>
          {movies.map(movie => (
            <li className={css.moviesLi} key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: `/movies?search=${searchWord}` }}
              >
                {movie.img ? (
                  <img
                    height="411px"
                    width="100%"
                    src={`${IMG_URL}${movie.img} `}
                    alt="img"
                  />
                ) : (
                  <div
                    style={{
                      width: '274px',
                      height: '411px',
                      border: '#000 solid 1px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>Not found</p>
                  </div>
                )}
                <div className={css.text}>
                  <p className={css.name}>{movie.name}</p>
                  <p className={css.year}>{movie.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {movies && movies.length === 0 && <p>We haven't found anything.</p>}
    </div>
  );
};
export default Movies;
