import {useState, useEffect} from 'react';
import Card from '../Card'

export default function Home(){
    const [jackets, setJackets] = useState([]) //Initialize as empty array

    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + '/api/jacket/products/all';
    
    useEffect(() => {
        //fetch data from API
        async function fetchData() {
            const response = await fetch(apiUrl);

            if(response.ok){
                const data = await response.json();
                if(!ignore){
                    setJackets(data);
                }
            }else{
                setJackets(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []); //run only once

    return(
        <>
        <h1>Home</h1>
        {
            jackets.length > 0 ?
            jackets.map(jacket =>(
                <Card 
                    key={jacket.product_id}
                    jacket={jacket} name={jacket.name} 
                    description={jacket.description} 
                    apiHost={apiHost}/>
            )) :
            <p>No jackets.</p>
        }
        </>
    )
}