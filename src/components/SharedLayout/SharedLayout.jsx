import { Link, NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './SharedLayout.module.css';
import { Audio } from 'react-loader-spinner';

export const SharedLayout = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <nav className={css.nav}>
            <Link className={css.logo} to="/">
              Filmoteka
            </Link>
            <NavLink className={css.home} to="/">
              Home
            </NavLink>
            <NavLink className={css.movies} to="/movies">
              Movies
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="container">
          <Suspense
            fallback={
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                margin="auto"
              />
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer className={css.footer}>
        <div className="container">
          <p className={css.footerTitle}>
            © 2023 | All Rights Reserved | Developed by{' '}
            <a
              href="https://www.linkedin.com/in/alisa-romantsova/"
              className={css.link}
            >
              Alisa Romantsova
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};
