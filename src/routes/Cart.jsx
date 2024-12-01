import {useState, useEffect} from 'react';
import CartCard from '../CartCard'
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';

export default function Cart(){
  const [jackets, setJackets] = useState([]) //Initialize as empty array
  const [cookies] = useCookies(['item']);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/jacket/products/';

  useEffect(() => {
    async function fetchData() {
      if (!cookies.item) return;

      //Split comma separated cookies
      const cookArray = cookies.item.split(',');

      const counts = {};
      //count amount of repeated product ids
      cookArray.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });//https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript

      //Store unique ids in array by creating set https://www.w3schools.com/js/js_sets.asp
      const uniqueIds = [...new Set(cookArray)];

      //Array of responses for API urls of each product (ex: "http://localhost:3000/api/jacket/products/31")
      const responses = await Promise.all(
        uniqueIds.map(id => fetch(apiUrl + id))
      );

      //array of all jackets
      const data = await Promise.all(
        responses.map((response, index) => {
          if (response.ok) {
            //Store all data + quantity of each jacket
            return response.json().then(jacket => ({
              ...jacket,
              quantity: counts[uniqueIds[index]],
            }));
          }
          //Return null if !response.ok
          return null;
        })
      );

      setJackets(data.filter(jacket => jacket !== null));
    }

    fetchData();
  }, [cookies.item]);

  const totalCost = jackets.reduce((total, jacket) => {
    return total + jacket.cost * jacket.quantity;
  }, 0);

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
                    quantity={jacket.quantity}
                    apiHost={apiHost}/>
            )) :
            <p>No jackets.</p>
        }
        <p>Total: ${totalCost.toFixed(2)}</p>
        <Link to="/" className="me-3"><h5>Continute shopping</h5></Link> 
        <Link to="/checkout" className="me-3"><h5>Checkout</h5></Link>
        </>
    )
}