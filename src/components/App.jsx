import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { NotFound } from './NotFound/NotFound';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MoviePage = lazy(() => import('../pages/MoviePage/MoviePage'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReview = lazy(() => import('./MovieReview/MovieReview'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MoviePage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReview />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
