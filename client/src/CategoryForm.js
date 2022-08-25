import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PhotoInput from './Components/PhotoInput';

import Api from './Api';

function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    Name: '',
    IconBackImg: '',
    NavBackImg: '',
    Position: '',
  });

  useEffect(() => {
    if (id) {
      Api.categories.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.categories.update(id, data);
      } else {
        response = await Api.categories.create(data);
      }
      navigate('/');
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
              <label className="form-label" htmlFor="Name">
                Name
              </label>
              <input type="text" className="form-control" id="Name" name="Name" onChange={onChange} value={data.Name} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="NavBackImg">
                NavBackImg
              </label>
              <PhotoInput
                className="card"
                id="NavBackImg"
                name="NavBackImg"
                value={data.NavBackImg}
                valueUrl={data.NavBackImgUrl}
                onChange={onChange}>
                <div className="card-body">
                  <div className="card-text">Drag-and-drop a photo file here, or click here to browse and select a file.</div>
                </div>
              </PhotoInput>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="IconBackImg">
                IconBackImg
              </label>
              <PhotoInput
                className="card"
                id="IconBackImg"
                name="IconBackImg"
                value={data.IconBackImg}
                valueUrl={data.IconBackImgUrl}
                onChange={onChange}>
                <div className="card-body">
                  <div className="card-text">Drag-and-drop a photo file here, or click here to browse and select a file.</div>
                </div>
              </PhotoInput>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Position">
                Position
              </label>
              <input type="text" className="form-control" id="Position" name="Position" onChange={onChange} value={data.Position} />
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
