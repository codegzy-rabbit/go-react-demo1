import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../ui/Alert';

export default function EditMovie() {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    runtime: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ alertType: '', message: '' });
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetch(`http://localhost:4000/v1/movie/${id}`).then(
        (res) => {
          if (!res.ok) {
            setError(new Error('something was wrong'));
          }
          return res.json();
        }
      );
      setMovie(data.movie);
      setIsLoading(false);
    })();
  }, [id]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const { status } = await fetch('http://localhost:4000/v1/movie/edit', {
        method: 'PUT',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      if ('success' === status) {
        setAlert({
          alertType: 'alert-success',
          message: 'update Movie success',
        });
      } else {
        setAlert({
          alertType: 'alert-danger',
          message: 'update Movie fail',
        });
      }
    })();
    console.log('update movie...');
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    (async () => {
      const { status } = await fetch(
        `http://localhost:4000/v1/admin/delete/${id}`
      ).then((res) => res.json());
      if ('success' === status) {
        setAlert({
          alertType: 'alert-success',
          message: 'Delete Movie success',
        });
      } else {
        setAlert({
          alertType: 'alert-danger',
          message: 'Delete Movie fail',
        });
      }
    })();
  };

  return (
    <Fragment>
      <h2>Edit Movie</h2>
      <Alert alertType={alert.alertType} message={alert.message} />
      <hr />
      <form onSubmit={handlerSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
            onChange={(e) => {
              setMovie((preState) => ({
                ...preState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="description"
            className="form-control"
            id="description"
            name="description"
            value={movie.description}
            onChange={(e) => {
              setMovie((preState) => ({
                ...preState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="runtime">
            Runtime
          </label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            name="runtime"
            value={movie.runtime}
            onChange={(e) => {
              setMovie((preState) => ({
                ...preState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button className="btn btn-danger" onClick={deleteHandler}>
          Delete
        </button>
        <Link to={`/admin`} className="btn btn-warning">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
}
