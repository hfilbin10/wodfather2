import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const WorkoutCategories = () => {
    return (
        <Row className="justify-content-center" style={{ textAlign: "center", padding: "0 10vmin" }}>
            <h2>WOD Categories</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: '40rem' }}>
                <p>Pick a category to get a random WOD generated for you</p>
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