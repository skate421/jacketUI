import {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Details(){
  const { id } = useParams();
  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = apiHost + '/api/jacket/products/' + id;

  // Store the result from API
  const [jacket, setJacket] = useState(null);

  // GET the contact to delete
  useEffect(() => {
   // Fetch data from API
   async function fetchJacket() {     
     const response = await fetch(getUrl);
     if(response.ok){ 
       const data = await response.json();
       if (!ignore) {
         setJacket(data);
       }
     } else {
       setJacket(null);
     }
   }

   let ignore = false;
   fetchJacket();
   return () => {
      ignore = true;
   }
 }, []);

 // form submit function
 async function formSubmit(data) {
  const url = 'http://localhost:3000/api/users/login';

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: 'include' //Make fetch include cookies in the request
  });
  
  if(response.ok){
    window.location.href = '/'; //Redirect to home page
  }
  else{
    setLoginFail(true); //Show login fail message
  }
}

  if(!isNaN(id) && jacket){
  return (
    <>
      <h1 class="mt-5 d-flex justify-content-center align-items-center">{jacket.name}</h1>
      <div className="card mt-3" class=" d-flex justify-content-center align-items-center">
        <img className="me-3" width={200} src={apiHost + "/" + jacket.image_filename}/>
        <div className="artist-info">
          <div><h5>${jacket.cost}</h5></div>
          <div className="mt-2">{jacket.description || "N/A"}</div>
          <div className="mt-2">Product ID: {jacket.product_id}</div>
          <Link to={"/"}><div className="mt-2 mt-2 btn btn-primary">HOME</div></Link>
          <br/>
          <Link to={"/cart"}><div className="mt-2 btn btn-primary">ADD TO CART</div></Link>
</div>

      </div>
    </>
  )
}else{
  return (
    <>
      <h1>Details</h1>
    </>
  )
}
}