import {useState, useEffect} from 'react';
import CartCard from '../CartCard'
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';

export default function Cart(){
  const [jackets, setJackets] = useState([]) //Initialize as empty array
  const [cookies] = useCookies(['item']);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/jacket/products/';

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  

  useEffect(() => {
    // Fetch data for all IDs
    async function fetchData() {
      if (!cookies.item) return;

      var cookArray = cookies.item.split(',');
      
      cookArray = cookArray.filter(onlyUnique);
      
        const responses = await Promise.all(
          cookArray.map(id => fetch(apiUrl + id))
        );

        const data = await Promise.all(
          responses.map(response => response.ok ? response.json() : null)
        );

        setJackets(data.filter(jacket => jacket !== null));
    }

    fetchData();
  }, [cookies.item]);

    return(
        <>
        <h1>Cart</h1>
        {
            jackets.length > 0 ?
            jackets.map(jacket =>(
                <CartCard 
                    key={jacket.product_id}
                    jacket={jacket} name={jacket.name} 
                    description={jacket.description} 
                    apiHost={apiHost}/>
            )) :
            <p>No jackets.</p>
        }
        <Link to="/" className="me-3"><h5>Continute shopping</h5></Link> 
        <Link to="/checkout" className="me-3"><h5>Checkout</h5></Link>
        </>
    )
}