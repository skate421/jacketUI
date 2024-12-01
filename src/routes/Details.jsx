import {useState, useEffect} from 'react';
import { useParams, Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function Details(){
  const { id } = useParams();
  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = apiHost + '/api/jacket/products/' + id;
  
  const [cookies, setCookie] = useCookies(['item']);

  function addCookie(item){
    if(cookies.item){
      setCookie('item', cookies.item + ',' + item, {maxAge: 3600});
    }else{
      setCookie('item', item, {maxAge: 3600});
    }
   }

  // Store the result from API
  const [jacket, setJacket] = useState(null);

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

  if(!isNaN(id) && jacket){
  return (
    <>
      <h1 className="mt-5 d-flex justify-content-center align-items-center">{jacket.name}</h1>
      <div className="d-flex justify-content-center align-items-center">
        <img className="me-3" width={200} src={apiHost + "/" + jacket.image_filename}/>
        <div className="artist-info">
          <div><h5>${jacket.cost}</h5></div>
          <div className="mt-2">{jacket.description || "N/A"}</div>
          <div className="mt-2">Product ID: {jacket.product_id}</div>
          <Link to={"/"}><div className="mt-2 mt-2 btn btn-primary">HOME</div></Link>
          <br/>
          <Link to={"/cart"}><button className="mt-2 btn btn-primary" onClick={() => addCookie(jacket.product_id)}>ADD TO CART</button></Link>
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