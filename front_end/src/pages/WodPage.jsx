import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { api } from "../utilities";
import backgroundImage from "../assets/crossfit-bg-image8.jpg"; 

export const RandomWod = () => {
    const { category } = useParams();
    const [wod, setWod] = useState(null);

    const getWod = async () => {
        try {
            const response = await api.get(`workout/workout/random/${category}/`);
            setWod(response.data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
            console.log(category)
        }
    };

    const generateNewWod = () => {
        window.location.reload();
    };

    useEffect(() => {
        getWod();
    }, [category]);

    if (!wod) {
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
            <Row className="justify-content-center text-center" style={{ padding: "0 10vmin" }}>
                <h1 className="text-center mt-5 text-white">WOD Generator</h1>
                <Card style={{ width: '40rem', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Card.Body>
                        <Card.Title>{wod.category} (ID #{wod.id})</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{wod.exercise}</Card.Subtitle>
                        <Card.Text>
                            {wod.description}
                        </Card.Text>
                        <Button variant="primary" onClick={generateNewWod}>
                            Generate New Workout
                        </Button>
                        <Link to="/workoutcategories">
                            <Button variant="info" style={{ marginLeft: "10px" }}>
                                Try a Different Category
                            </Button>
                        </Link>
                        <Card.Text>
                            Not familiar with an exercise? Check out our{" "}
                            <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'purple' }}>
                                Terms Page
                            </Link>{" "}
                            for help!
                        </Card.Text>
                        <Card.Text>
                            Did you complete <strong>Workout #{wod.id}</strong>? Add it to your{' '}
                            <Link to="/progress" style={{ color: 'purple' }}>Progress Page</Link>!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </div >
    );
};