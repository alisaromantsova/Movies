import { MovielistCard } from 'components/MovieListCard/MovieListCard';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';
export const MoviesList = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies.map(movie => {
        const { id, name, date, img } = movie;

        return (
          <MovielistCard key={id} id={id} name={name} date={date} img={img} />
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
