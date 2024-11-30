import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function Nav() {
  return (
    <>
      <div>
        <nav class="mt-3 d-flex justify-content-center align-items-center">
        <Link to="/" className="me-2">Home</Link>
        <Link to="/login" className="me-2">Login</Link>
        <Link to="/cart" className="me-2">Cart</Link>
        <Link to="/logout" className="me-2">Logout</Link>
        </nav>
        <Outlet/>
      </div>
    </>
  )
}

export default Nav;
