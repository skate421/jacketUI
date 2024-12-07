import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Nav() {
  return (
    <>
      <div>
        <nav className="d-flex align-items-center bg-dark w-100">
          <div className="text-center">
            <img alt="Edward Hopper painting 'Woman At A Cafe Table'" src=".\images\EdwardHopperWomanAtACafeTable.jpg" width={100} className="mx-5 mt-3 rounded-circle"/>
            <h5 className="text-white">Zips and <br/> Buttons</h5>
          </div>

          <div className="d-flex flex-wrap justify-content-center mx-3">
            <Link to="/" className="mx-3"><h2 className="text-white">Home</h2></Link>
            <Link to="/cart" className="mx-3"><h2 className="text-white">Cart</h2></Link>
            <Link to="/login" className="mx-3"><h2 className="text-white">Login</h2></Link>
            <Link to="/signup" className="mx-3"><h2 className="text-white">Signup</h2></Link>
            <Link to="/logout" className="mx-3"><h2 className="text-white">Logout</h2></Link>
          </div>
          
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Nav;
