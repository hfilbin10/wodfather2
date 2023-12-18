import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utilities";

export const Terms = () => {
    const [terms, setTerms] = useState([])
    const getAllTerms = async () => {
        try {
            const response = await api.get("crossfitterm/terms/");
            const sortedTerms = response.data.sort((a, b) => a.term.localeCompare(b.term));
            setTerms(sortedTerms);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        getAllTerms();
    }, []);

    return (
        <Row style={{ textAlign: "center", padding: "0 10vmin" }}>
            <h1>Terms</h1>
            <ol>
                {terms.map((term) => (
                    <li
                        key={term.id}
                        style={{
                            margin: "2vmin",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left"
                        }}
                    > <Link to={`/terms/${term.id}`}>{term.term}</Link>
                    </li>
                ))}
            </ol>
        </Row>
    );
};