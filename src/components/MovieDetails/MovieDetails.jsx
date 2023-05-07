import css from './MovieDetails.module.css';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieDetails = ({ film }) => {
  const { img, name, date, rating, overview, genres } = film;
  return (
    <div className={css.div}>
      {img && <img height="500px" src={`${IMG_URL}${img}`} alt="" />}
      <div className={css.textContainer}>
        {name ? (
          <h2 className={css.title}>
            {name}({date})
          </h2>
        ) : (
          <h2 className={css.title}> Not found</h2>
        )}
        {rating ? (
          <p className={css.ratingP}>
            Rating: <span className={css.ratingSpan}>{rating}</span>
          </p>
        ) : (
          <p className={css.ratingP}>Rating: Not found</p>
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
        {overview ? (
          <p className={css.overview}>{overview}</p>
        ) : (
          <p className={css.overview}>Not found</p>
        )}
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
  );
};

// MovieDetails.propTypes = {
//   film: PropTypes.object,
// };
