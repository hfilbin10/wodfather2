import { Row } from 'react-bootstrap';
import wodfatherImage from '../assets/Wodfather.png'

export const Home = () => {
    return (
        <Row className="justify-content-center" style={{ textAlign: "center", padding: "20px 10vmin" }}>
            <img src={wodfatherImage} alt="WODfather" style={{ width: '500px', height: 'auto' }} />
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: '40rem', margin: '20px 0' }}>
                <p>In this application you will become familiar with CrossFit terms, watch videos on how to perform certain exercises, find random CrossFit WODs to complete and track your progress over time.</p>
            </div>
        </Row>
    );
};

