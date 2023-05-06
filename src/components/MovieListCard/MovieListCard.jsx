import css from './MovielistCard.module.css';

import { Link, useLocation } from 'react-router-dom';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MovielistCard = ({ id, img, name, date }) => {
  const location = useLocation();
  return (
    <li className={css.moviesLi} key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        {img ? (
          <img src={`${IMG_URL}${img} `} alt={name || ''} height="411px" />
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
          <p className={css.name}>{name}</p>
          <p className={css.year}>{date}</p>
        </div>
      </Link>
    </li>
  );
};
