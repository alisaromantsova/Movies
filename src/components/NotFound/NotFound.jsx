import { Link } from 'react-router-dom';
import css from './NotFound.module.css';
export const NotFound = () => {
  return (
    <div className={css.div}>
      <h1>Sorry, we don't have this page.</h1>
      <h2>
        <Link className={css.link} to="/">
          Go to Home Page
        </Link>
      </h2>
    </div>
  );
};
