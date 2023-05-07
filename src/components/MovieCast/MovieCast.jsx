import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCast = () => {
  const id = useParams();
  const movieId = id.movieId;

  const [actors, setActors] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${movieId}/credits?${KEY}`
        );

        const actorsArrey = response.data.cast.map(actor => {
          const { name, character, id, profile_path } = actor;

          const obj = {
            name: name,
            character: character,
            id: id,
            img: profile_path,
          };
          return obj;
        });
        setActors(actorsArrey);
        setLoader(false);
      } catch {
        setLoader(false);
        console.log('error');
        
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={css.section}>
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
      {actors.length > 0 && (
        <ul className={css.list}>
          {actors.map(actor => (
            <li className={css.item} key={actor.id}>
              {actor.img ? (
                <img
                  height="150px"
                  alt="img"
                  style={{ width: '100px' }}
                  src={`${IMG_URL}${actor.img}`}
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
              <p className={css.text}>Name: {actor.name}</p>
              <p className={css.text}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      {actors.length === 0 && <p>Cast not found</p>}
    </section>
  );
};
export default MovieCast;
