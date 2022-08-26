import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import HeadSection from './HeadSection';

function Home() {
  const [categories, setCategories] = useState([]);

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

      <div className="Body container">
        <div className="Steps"></div>
        <h1>Recursos en 3 pasos!</h1>

        <div className="row">
          {categories.map((cat) => (
            <div>
              <CategoryCard Name={cat.Name} Img={cat.IconBackImg} />
              <Link to={`/categories/${cat.id}/edit`}>Edit</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
