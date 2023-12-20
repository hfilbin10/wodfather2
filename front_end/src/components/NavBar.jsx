import { Link, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import Button from "react-bootstrap/esm/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const logOut = async () => {
        let response = await api.post("users/logout/");
        if (response.status === 204) {
            setUser(null);
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
            navigate("/");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="#home">WODfather</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/findbox/">Find Box</Nav.Link>
                                <Nav.Link as={Link} to="/terms/">Terms</Nav.Link>
                                <Nav.Link as={Link} to="/workoutcategories/">WOD Categories</Nav.Link>
                                <Nav.Link as={Link} to="/progress/">Journal</Nav.Link>
                                <Nav.Link as={Link} to="/submitwod/">Submit WOD</Nav.Link>
                                <Button onClick={logOut} variant="danger" className="mr-2">
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/register/">Log In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
