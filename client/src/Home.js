import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
function Home() {
  const { user } = useAuthContext();
  return (
    <main className="container">
      <h1>Home</h1>
      {user?.isAdmin && (
         <p>
           <Link to="/detail/new" className="btn btn-primary">
             New Category
           </Link>
         </p>
       )}
    </main>
  );
}

export default Home;
