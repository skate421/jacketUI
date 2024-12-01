import { Link } from 'react-router-dom';

export default function Card(props){
    const apiHost = import.meta.env.VITE_API_HOST;
    var displayImg;
    var displayName;
    displayImg = apiHost + "/" + props.jacket.image_filename;

    return(
                <div style={{ backgroundColor: '#edafab' }} className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center position-relative">
                            <img alt={props.jacket.description} src={displayImg} width={100} className="m-3"/>
                            <div className="artist-info">
                                <h5 className="card-title">{displayName}</h5>
                                <p className="card-text">
                                    Name: {props.jacket.name || "N/A"} 
                                    <br/>
                                    Price: ${props.jacket.cost || "N/A"}  
                                    <br/>
                                    Quantity: {props.jacket.quantity}
                                    <br/>
                                    Sub-total: ${(props.jacket.cost * props.jacket.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                            )
                        }