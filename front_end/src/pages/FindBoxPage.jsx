import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import BoxCard from "../components/BoxCard";
import { api } from "../utilities";

export const FindBox = () => {
    const [town, setTown] = useState("");
    const [foursquareData, setFoursquareData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [displayCount, setDisplayCount] = useState(5);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const getBox = async () => {
        try {
            setLoading(true);
            const response = await api.get(
                `map/${town}/?query=crossfit%20gym&near=${town}&sort=DISTANCE`
            );
            setFoursquareData(response.data.results);
            setSearchPerformed(true);
        } catch (error) {
            console.error("Error fetching Foursquare data:", error);
            setError("Error fetching data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setDisplayCount((prevCount) => prevCount + 5);
    };

    useEffect(() => {
        setDisplayCount(5);
    }, [town]);

    return (
        <div>
            <h2>Find a CrossFit Box Near You</h2>
            <Form className="d-flex gap-2">
                <Form.Control
                    id="townInput"
                    type="text"
                    placeholder="Enter town"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                />
                <Button onClick={getBox} variant="primary">
                    Search
                </Button>
            </Form>

            {loading && <p>Loading...</p>}

            {searchPerformed && !loading && !error && foursquareData.length === 0 ? (
                <p>Sorry, there are no CrossFit boxes found in that town. Please try another town.</p>
            ) : null}

            {!loading && !error && foursquareData.length > 0 && (
                <>
                    <div>
                        {foursquareData.slice(0, displayCount).map((place) => (
                            <BoxCard key={place.fsq_id} place={place} />
                        ))}
                    </div>

                    {foursquareData.length > displayCount && (
                        <Button onClick={() => handleLoadMore()} variant="primary">
                            Show More
                        </Button>
                    )}
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};