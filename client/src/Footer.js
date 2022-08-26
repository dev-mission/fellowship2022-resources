import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className=" footer-container container row" id="footer">
      <div className="col-3">
        <p>Created by Josue Hernandez and Kevin Rodas</p>
      </div>
      <div className="col-6">
        <Link to="/mission">Nuestra Misiòn</Link>
        <Link to="/resources">Recursos</Link>
        <Link to="/contact">Contacto</Link>
      </div>
    </div>
  );
}
export default Footer;
