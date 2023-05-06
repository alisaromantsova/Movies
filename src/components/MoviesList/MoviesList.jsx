import { MovielistCard } from 'components/MovieListCard/MovieListCard';
import css from './MoviesList.module.css';
export const MoviesList = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies.map(movie => {
        const { id, movieName, date, img } = movie;
        return (
          <MovielistCard id={id} movieName={movieName} date={date} img={img} />
        );
      })}
    </ul>
  );
};
