import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      const movies = await fetch('http://localhost:4000/v1/movies').then(
        (res) => {
          if (!res.ok) {
            setErr(new Error('Something was wrong!'));
          }
          return res.json();
        }
      );
      setMovies(movies.movies);
      setIsLoading(false);
    })();
  }, [movies]);

  if (err) {
    return <p>{err.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>choose a movie</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
