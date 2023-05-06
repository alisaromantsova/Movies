import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from './Home.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${BASE_URL}/trending/all/day?${KEY}`);

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

      <ul className={css.list}>
        {movies.map(movie => (
          <li className={css.moviesLi} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: '/' }}>
              {movie.img ? (
                <img
                  src={`${IMG_URL}${movie.img} `}
                  alt={movie.name || ''}
                  height="411px"
                />
              ) : (
                <div
                  style={{
                    width: '100px',
                    height: '150px',
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
    </section>
  );
};
export default Home;
