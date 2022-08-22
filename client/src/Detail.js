 import { useEffect, useState } from 'react';
 import { Link, useParams } from 'react-router-dom';
 import { useAuthContext } from './AuthContext';

 function Detail() {
   const { id } = useParams();

   const { user } = useAuthContext();
   const [data, setData] = useState();

   useEffect(
    function () {
      if (id) {
        fetch(`/api/categories/${id}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      }
    },
    [id]
  );
   return (
     <main className="container">
       <h1>{data?.Title}</h1>
       {user?.isAdmin && (
         <p>
           <Link to="edit" className="btn btn-primary">
             Edit
           </Link>
         </p>
       )}
       <p>{JSON.stringify(data)}</p>
     </main>
   );
 }
 export default Detail;