import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoxCard = ({ place }) => {
    return (
        <Card style={{ width: "18rem", marginBottom: "20px" }}>
            <Card.Body>
                <Card.Title>{place.name}</Card.Title>
                <Card.Text>
                    <strong>Address:</strong> {place.location.formatted_address}
                </Card.Text>
                <Card.Text>
                    <strong>Distance:</strong> {place.distance} meters
                </Card.Text>
                {/* <Card.Text>
                    <strong>Link:</strong><Link>https://api.foursquare.com{place.link} </Link> 
                </Card.Text> */}
            </Card.Body>
        </Card>
    );
};

export default BoxCard;