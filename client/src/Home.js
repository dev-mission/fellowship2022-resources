import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import HeadSection from './HeadSection';

function Home() {
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(function () {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
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
        </p>
      )}
      <HeadSection Title={'Our Home Page Title'} Description="Our Unique Description" Img="UniqueURL" />

      <div class="Body container">
        <div className="Steps"></div>
        <h1>Recursos en 3 pasos!</h1>
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
          {categories.map((cat) => (
            <CategoryCard Name={cat.Name} IconBackImg={cat.IconBackImg} NavBackImg={cat.NavBackImg} Position={cat.Position} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
