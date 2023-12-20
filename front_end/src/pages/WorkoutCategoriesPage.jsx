import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import backgroundImage from "../assets/crossfit-bg-image2.jpg"; 

export const WorkoutCategories = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        backgroundPosition: "center",
        maxWidth: "100vw",
        width:"100%"
    };

    return (
        <Row className="justify-content-center" style={{ ...containerStyle, textAlign: "center", padding: "0 10vmin" }}>
            <h1 className="text-center mt-5" style={{ color: 'white'}}>WOD Categories</h1>
            <div style={{ marginBottom: "50vmin" }}>
                <p style={{ color: 'white' }}>Pick a category to get a random WOD generated for you</p>
                <ButtonLink to="/workout/random/Travel%20WOD/" label="Travel WOD" variant="primary" />
                <ButtonLink to="/workout/random/Bodyweight%20WOD/" label="Bodyweight WOD" variant="success" />
                <ButtonLink to="/workout/random/Hero%20WOD/" label="Hero WOD" variant="danger" />
            </div>
        </Row>
    );
};

const ButtonLink = ({ to, label, variant }) => {
    return (
        <div style={{ margin: "2vmin" }}>
            <Link to={to}>
                <Button variant={variant}>{label}</Button>
            </Link>
        </div>
    );
};
