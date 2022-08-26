import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';

function NavigationPage() {
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(function () {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
    fetch('/api/resources')
      .then((response) => response.json())
      .then((data) => setResources(data));
  }, []);

  const { user } = useAuthContext();
  return (
    <main className="container">
      <h1>Home</h1>

      {user?.isAdmin && (
        <p>
          <Link to="/categories/new" className="btn btn-primary">
            New Category
          </Link>

          <Link to="/resources/new" className="btn btn-primary">
            New resource
          </Link>
        </p>
      )}
      <div className="row">
        {categories.map((cat) => (
          <p key={`cat-${cat.id}`}>
            {cat.Name}
            {cat.IconBackImgUrl && <img src={cat.IconBackImgUrl} />}
            {cat.NavBackImgUrl && <img src={cat.NavBackImgUrl} />}
            <Link to={`/categories/${cat.id}/edit`}>Edit</Link>
          </p>
        ))}
      </div>
      <div className="row">
        {resources.map((res) => (
          <p key={`res-${res.id}`}>
            {res.Title} ({res.Category?.Name})<Link to={`/resources/${res.id}/edit`}>Edit</Link>
          </p>
        ))}
      </div>
    </main>
  );
}

export default NavigationPage;
