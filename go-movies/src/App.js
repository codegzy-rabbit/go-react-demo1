import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Movies from './components/Movies';
import Categories from './components/Categories';
import Movie from './components/Movie';
import EditMovie from './components/EditMovie';
import Login from './components/Login';

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-3">Go Watch A Movie</h1>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <hr className="mb-3" />
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="list-group-item">
                <Link to="/by-category">Categories</Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin/add">EditMovie</Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin">Manage Catalogue</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/by-category" element={<CategoryPage />} />
            <Route path="/admin/add/:id" element={<EditMovie />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/by-category/comedy"
              element={<Categories title={`Comedy`} />}
            />
            <Route
              path="/by-category/drama"
              element={<Categories title={`Drama`} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function CategoryPage() {
  const { pathname } = useLocation();
  return (
    <div>
      <h2>Category page</h2>
      <ul>
        <li>
          <Link to={`${pathname}/comedy`}>Comedy</Link>
        </li>
        <li>
          <Link to={`${pathname}/drama`}>Drama</Link>
        </li>
      </ul>
    </div>
  );
}
