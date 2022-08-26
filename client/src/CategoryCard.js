function CategoryCard({ Name, Img }) {
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-body">
          <div className="card-icon row">
            <img className="card-img" src={Img}></img>
          </div>
          <h5 className="card-title row">{Name}</h5>
          <a href="" className="btn btn-primary">
            More Information
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
