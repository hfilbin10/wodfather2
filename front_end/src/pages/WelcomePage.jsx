import { Row, Button } from 'react-bootstrap';
import wodfatherImage from '../assets/wodfather-white.png';
import { Link } from 'react-router-dom';
import backgroundImage from "../assets/crossfit-bg-image6.jpg"

export const Welcome = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        minHeight: "100vh",
        // position: "relative",
        // overflow: "hidden",
        // width: "100%",
        
        
    };

    return (
        <Row style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ margin: '20px' }}>
                <img
                    src={wodfatherImage}
                    alt="WODfather"
                    style={{ width: '600px' }}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ color: 'white' }}>Sign up now for an offer you can't refuse</p>
                <Link to="/register">
                    <Button variant="primary">Sign Up</Button>
                </Link>
            </div>
        </Row>
    );
};