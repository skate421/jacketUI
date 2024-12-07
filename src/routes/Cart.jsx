import {useState, useEffect} from 'react';
import CartCard from '../CartCard'
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';


export default function Cart(){
  const [jackets, setJackets] = useState([]) //Initialize as empty array
  const [cookies, setCookie, removeCookie] = useCookies(['item']);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/jacket/products/';

  useEffect(() => {
    async function fetchData() {
      if (!cookies.item) return;
      var cookArray = [cookies.item];

      //Split comma separated cookies
      for(var i = 0; i < (cookies.item).length;i++){
        if(cookies.item[i] ==','){
          cookArray = cookies.item.split(',');
          break;
        }
      }

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

  const tax = .15;

  const total = (totalCost * tax) + totalCost;

  function deleteCookie() {
    if (!cookies.item) return;
    removeCookie('item');
    setJackets([]);
  }

    return(
        <>
        <h2 className="text-center mt-3 mb-4">CART</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
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
            <p>Your cart is empty</p>
        }
        </div>
        <h5 className="mt-1">TAX: ${tax}</h5>
        <h5>TOTAL W/O TAX: ${totalCost.toFixed(2)}</h5>
        <h2 className="mt-1">TOTAL: ${total.toFixed(2)}</h2>
        <div className="d-flex flex-wrap">
          <Link to="/" className="btn btn-secondary mx-1"><h5>Continute shopping</h5></Link> 
          <Link to="/checkout" className="btn btn-primary mx-1"><h5>Checkout</h5></Link>
          <button onClick={deleteCookie}  className="btn btn-danger mx-1"><h5>Empty Cart</h5></button>
        </div>
        </div>
        </>
    )
}