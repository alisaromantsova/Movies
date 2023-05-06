import css from './MovielistCard.module.css';
import { Link } from 'react-router-dom';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MovielistCard = ({ id, img, movieName, date }) => {
  return (
    <li className={css.moviesLi}>
      <Link to={`/movies/${id}`} state={{ from: '/' }}>
        {img ? (
          <img src={`${IMG_URL}${img} `} alt={movieName || ''} height="411px" />
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
          <p className={css.name}>{movieName}</p>
          <p className={css.year}>{date}</p>
        </div>
      </Link>
    </li>
  );
};
