import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import css from './MovieReview.module.css';
import { Audio } from 'react-loader-spinner';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const KEY = 'api_key=e777b5f5a1d00d3a4d56208d16e8e0e4';

const MovieReview = () => {
  const id = useParams();
  const movieId = id.movieId;

  const [review, setReview] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${movieId}/reviews?${KEY}&language=en-US&page=1`
        );

        const reviewArray = response.data.results.map(review => {
          const {
            author_details: { username },
            id,
            content,
          } = review;
          const obj = {
            id: id,
            content: content,
            username: username,
          };
          return obj;
        });
        setReview(reviewArray);
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
    <div className={css.section}>
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
      {review.length > 0 && (
        <ul className={css.list}>
          {review.map(comment => (
            <li key={comment.id}>
              <h3 className={css.title}>Autor:{comment.username}</h3>
              <p className={css.text}>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
      {review.length === 0 && <p>Reviews not found</p>}
    </div>
  );
};
export default MovieReview;
