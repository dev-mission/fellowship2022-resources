import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from './Api';

function ResourceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    CategoryId: '',
    CategoryTitle: '',
    Title: '',
    Organization: '',
    Detail: '',
    NavImg: '',
    Link: '',
    Hours: '',
    Address: '',
    Contact: '',
    MainImg: '',
    SuppImg: '',
  });

  useEffect(() => {
    if (id) {
      Api.resources.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.resources.update(id, data);
      } else {
        response = await Api.resources.create(data);
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
          <h1>Resource Page</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="CategoryId">
                Category Id
              </label>
              <input type="text" className="form-control" id="CategoryId" name="CategoryId" onChange={onChange} value={data.CategoryId} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="CategoryTitle">
                Category Title
              </label>
              <input
                type="text"
                className="form-control"
                id="CategoryTitle"
                name="CategoryTitle"
                onChange={onChange}
                value={data.CategoryTitle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Title">
                Title
              </label>
              <input type="text" className="form-control" id="Title" name="Title" onChange={onChange} value={data.Title} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Organization">
                Organization
              </label>
              <input
                type="text"
                className="form-control"
                id="Organization"
                name="Organization"
                onChange={onChange}
                value={data.Organization}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Detail">
                Detail
              </label>
              <input type="text" className="form-control" id="Detail" name="Detail" onChange={onChange} value={data.Detail} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="NavImg">
                Nav Img
              </label>
              <input type="text" className="form-control" id="NavImg" name="NavImg" onChange={onChange} value={data.NavImg} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Title">
                Title
              </label>
              <input type="text" className="form-control" id="Title" name="Title" onChange={onChange} value={data.Title} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Link">
                Resource Link
              </label>
              <input type="text" className="form-control" id="Link" name="Link" onChange={onChange} value={data.Link} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Hours">
                Hours
              </label>
              <input type="text" className="form-control" id="Hours" name="Hours" onChange={onChange} value={data.Hours} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Address">
                Address
              </label>
              <input type="text" className="form-control" id="Address" name="Address" onChange={onChange} value={data.Address} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Contact">
                Contact
              </label>
              <input type="text" className="form-control" id="Contact" name="Contact" onChange={onChange} value={data.Contact} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="MainImg">
                Main Img
              </label>
              <input type="text" className="form-control" id="MainImg" name="MainImg" onChange={onChange} value={data.MainvImg} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="SuppImg">
                Supporting Img
              </label>
              <input type="text" className="form-control" id="SuppImg" name="SuppImg" onChange={onChange} value={data.SuppImg} />
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
export default ResourceForm;
