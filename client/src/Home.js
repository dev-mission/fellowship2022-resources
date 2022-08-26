import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setItems(data));
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

      {items.map((item) => (
        <p>
          {item.Name}
          <img src={item.IconBackImgUrl} />
        </p>
      ))}
    </main>
  );
}

export default Home;
