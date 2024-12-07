import { Link } from 'react-router-dom';

export default function Card(props){
    const apiHost = import.meta.env.VITE_API_HOST;
    const subTotal = (props.jacket.cost * props.jacket.quantity);
    const tax = .15;
    const subTax = subTotal * tax;
    var displayImg;
    var displayName;
    displayImg = apiHost + "/" + props.jacket.image_filename;

    return(
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center position-relative">
                        <Link to={`/details/${props.jacket.product_id}`}>
                            <img alt={props.jacket.description} src={displayImg} width={100} className="m-3"/>
                            </Link>
                            <div className="artist-info">
                                <h5 className="card-title">{displayName}</h5>
                                <p className="card-text">
                                    Name: {props.jacket.name || "N/A"} 
                                    <br/>
                                    Price: ${props.jacket.cost || "N/A"}  
                                    <br/>
                                    Quantity: {props.jacket.quantity}
                                    <br/>
                                    Sub-total w/o tax: ${(subTotal).toFixed(2)}
                                    <br/>
                                    Tax: ${subTax.toFixed(2)}
                                    <br/>
                                    <h5>Sub-total: ${(subTax + subTotal).toFixed(2)}</h5>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                            )
                        }