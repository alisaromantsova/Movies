import css from './MovielistCard.module.css';
// import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MovielistCard = ({ id, img, name, date }) => {
  const location = useLocation();
  return (
    <li className={css.moviesLi}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        {img ? (
          <img src={`${IMG_URL}${img} `} alt={name || ''} />
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
// MovielistCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
// };
