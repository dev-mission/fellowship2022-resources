import { useEffect, useState } from 'react';
 import { useNavigate, useParams } from 'react-router-dom';
 import Api from './Api';

 function CategoryForm() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [data, setData] = useState({
     Title: '',
     Text: '',
     AttachmentUrl: '',
   });

   useEffect(() => {
     if (id) {
       Api.items.get(id).then((response) => setData(response.data));
     }
   }, [id]);

   async function onSubmit(event) {
     event.preventDefault();
     try {
       let response;
       if (id) {
         response = await Api.items.update(id, data);
       } else {
         response = await Api.items.create(data);
       }
       navigate(`/detail/${response.data.id}`);
     } catch (error) {
       console.log(error);
     }
   }

   function onChange(event) {
     const newData = { ...data };
     newData[event.target.name] = event.target.value;
     setData(newData);
   }

   return (
     <main className="container">
       <div className="row justify-content-center">
         <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
           <h1>Category</h1>
           <form onSubmit={onSubmit}>
             <div className="mb-3">
               <label className="form-label" htmlFor="Title">
                 Title
               </label>
               <input type="text" className="form-control" id="Title" name="Title" onChange={onChange} value={data.Title} />
             </div>
             <div className="mb-3">
               <label className="form-label" htmlFor="Text">
                 Text
               </label>
               <input type="text" className="form-control" id="Text" name="Text" onChange={onChange} value={data.Text} />
             </div>
             <div className="mb-3">
               <label className="form-label" htmlFor="AttachmentUrl">
                 Attachment URL
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="AttachmentUrl"
                 name="AttachmentUrl"
                 onChange={onChange}
                 value={data.AttachmentUrl}
               />
             </div>
             <button type="submit" className="btn btn-primary">
               Submit
             </button>
           </form>
         </div>
       </div>
     </main>
   );
 }
 export default CategoryForm;