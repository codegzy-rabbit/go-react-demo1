import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const movie = await fetch(`http://localhost:4000/v1/movie/${id}`).then(
        (res) => res.json()
      );
      setMovie(movie.movie);
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h2>the movie id is {id}</h2>
      <table className="table table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{movie.description}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{movie.runtime}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
