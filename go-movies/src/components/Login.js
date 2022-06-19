import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../ui/Alert';

export default function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [alert, setAlert] = useState({ alertType: '', message: '' });
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const { status } = await fetch('http://localhost:4000/v1/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      if ('success' === status) {
        setAlert({
          alertType: 'alert-success',
          message: 'Success Login',
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setAlert({
          alertType: 'alert-danger',
          message: 'Fail Login',
        });
      }
    })();
  };

  return (
    <Fragment>
      <Alert alertType={alert.alertType} message={alert.message} />
      <form onSubmit={handlerSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            onChange={(e) => {
              setUser((preState) => ({
                ...preState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => {
              setUser((preState) => ({
                ...preState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </Fragment>
  );
}
