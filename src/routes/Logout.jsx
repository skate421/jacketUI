import { useEffect, useState } from "react"
import { useParams, Link} from 'react-router-dom';

export default function Logout() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/jacket/users/';
  const [status, setStatus] = useState("Logging out...");
  
  useEffect(() => {
    async function logout() {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: 'include' // inlcude cookies in request
      });

      if(response.ok) {        
        setStatus('You are successfully logged out.');
      }
      else {
        setStatus('Error encountered. Try again.');
      }
    }

    logout();
  }, []);

  return (
    <>
    <div className="text-center">
    <h2 className="text-center mt-3 mb-4">LOGOUT</h2>
      <h5>{ status }</h5>
      <Link to={"/signup"}><button className="mx-3 mt-2 btn btn-primary">SIGN-UP</button></Link>
      <Link to={"/login"}><button className="mx-3 mt-2 btn btn-primary">LOGIN</button></Link>
    </div>
    </>
  )
}