import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { api } from '../utilities';
import ExerciseVideo from '../components/ExerciseVideo';
import backgroundImage from "../assets/crossfit-bg-image9.jpg"; 

export const TermDetail = () => {
    const { id } = useParams();
    const [termDetail, setTermDetail] = useState(null);

    const getTermDetail = async () => {
        try {
            const response = await api.get(`crossfitterm/terms/${id}/`);
            setTermDetail(response.data);
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        getTermDetail();
    }, [id]);

    if (!termDetail) {
        return <div>Loading...</div>;
    }

    const containerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        // width: "100%"
    };

    return (
        <div style={containerStyle}>
            <Row className="justify-content-center" style={{ textAlign: 'center', padding: '0 10vmin' }}>
                <h1 className="text-center mt-5 text-white">{termDetail.term}</h1>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '40rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <p >{termDetail.definition}</p>
                    <ExerciseVideo exercise={termDetail.term} />
                    <Link to="/terms">
                        <Button variant="primary">Go Back to Terms</Button>
                    </Link>
                </div>
            </Row>
        </div >
    );
};
