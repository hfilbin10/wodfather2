import { useNavigate, useOutletContext } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

export const Register = () => {
    const { user, setUser } = useOutletContext();
    const [existingUser, setExistingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);
    return (
        <>
            
            {existingUser ? (
                <>
                    <SignUp setUser={setUser} />
                    <Button
                        variant="warning"
                        onClick={() => setExistingUser(!existingUser)}
                    >
                        Already have an account
                    </Button>
                </>
            ) : (
                <>
                    <LogIn setUser={setUser} />
                    <Button
                        variant="warning"
                        onClick={() => setExistingUser(!existingUser)}
                    >
                        Don't have an account
                    </Button>
                </>
            )}
        </>
    );
};