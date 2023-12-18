import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { api } from "../utilities";

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
    return (
        <Row className="justify-content-center text-center" style={{ padding: "0 10vmin" }}>
            <h2>WOD Generator</h2>
            <Card style={{ width: '50rem', textAlign: "center" }} className="mx-auto">
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
                        <Link to="/terms" target="_blank" rel="noopener noreferrer">
                            Terms Page
                        </Link>{" "}
                        for help!
                    </Card.Text>
                    <Card.Text>
                        Did you complete <strong>Workout #{wod.id}</strong>? Add it to your{' '}
                        <Link to="/progress">Progress Page</Link>!
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    );
};