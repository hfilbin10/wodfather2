import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { api } from '../utilities';
import ExerciseVideo from '../components/ExerciseVideo';

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

    return (
        <Row className="justify-content-center" style={{ textAlign: 'center', padding: '0 10vmin' }}>
            <h2>{termDetail.term}</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '40rem' }}>
                <p>{termDetail.definition}</p>
                <ExerciseVideo exercise={termDetail.term} />
                <Link to="/terms">
                    <Button variant="primary">Go Back to Terms</Button>
                </Link>
            </div>
        </Row>
    );
};
