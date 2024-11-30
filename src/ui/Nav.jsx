import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function Nav() {
  return (
    <>
      <div>
        <nav className="mt-3 d-flex justify-content-center align-items-center">
        <Link to="/" className="me-3"><h5>Home</h5></Link>
        <Link to="/login" className="me-3"><h5>Login</h5></Link>
        <Link to="/cart" className="me-3"><h5>Cart</h5></Link>
        <Link to="/logout" className="me-3"><h5>Logout</h5></Link>
        </nav>
        <Outlet/>
      </div>
    </>
  )
}

export default Nav;
