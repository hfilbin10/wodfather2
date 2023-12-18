import { Row, Button } from 'react-bootstrap';
import wodfatherImage from '../assets/Wodfather.png';
import { Link } from 'react-router-dom'; 

export const Welcome = () => {
    return (
        <Row className="justify-content-center" style={{ textAlign: "center", padding: "20px 10vmin" }}>
            <img
                src={wodfatherImage}
                alt="WODfather"
                style={{ width: '500px', height: 'auto', margin: '20px 0' }}
            />
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: '40rem', margin: '20px 0' }}>
                <p>Sign up for an offer you can't refuse</p>
                <Link to="/register">
                    <Button variant="primary">Sign Up</Button>
                </Link>
            </div>
        </Row>
    );
};