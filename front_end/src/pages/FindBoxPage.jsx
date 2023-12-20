import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import BoxCard from "../components/BoxCard";
import { api } from "../utilities";
import backgroundImage from "../assets/crossfit-bg-image4.jpg"; 

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

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
    };

    return (
        <div style={containerStyle}>
            <h1 className="text-center" style={{ color: 'white' }}>Find a CrossFit Box Near You</h1>
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
                <p style={{ color: 'white' }}>Sorry, there are no CrossFit boxes found in that town. Please try another town.</p>
            ) : null}

            {!loading && !error && foursquareData.length > 0 && (
                <>
                    <Row className="gx-4 mx-5 justify-content-center">
                        {foursquareData.slice(0, displayCount).map((place, index) => (
                            <Col key={place.fsq_id} md={6} lg={4} className="mb-4">
                                <BoxCard place={place} />
                            </Col>
                        ))}
                    </Row>

                    {foursquareData.length > displayCount && (
                        <Button onClick={() => handleLoadMore()} variant="primary" style={{ margin: '0 10px' }}>
                            Show More
                        </Button>
                    )}
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

// import { useState, useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import BoxCard from "../components/BoxCard";
// import { api } from "../utilities";
// import backgroundImage from "../assets/crossfit-bg-image4.jpg";

// export const FindBox = () => {
//     const containerStyle = {
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         position: "relative",
//     };

//     const [town, setTown] = useState("");
//     const [foursquareData, setFoursquareData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [displayCount, setDisplayCount] = useState(5);
//     const [searchPerformed, setSearchPerformed] = useState(false);

//     const getBox = async () => {
//         try {
//             setLoading(true);
//             const response = await api.get(
//                 `map/${town}/?query=crossfit%20gym&near=${town}&sort=DISTANCE`
//             );
//             setFoursquareData(response.data.results);
//             setSearchPerformed(true);
//         } catch (error) {
//             console.error("Error fetching Foursquare data:", error);
//             setError("Error fetching data. Please try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLoadMore = () => {
//         setDisplayCount((prevCount) => prevCount + 5);
//     };

//     useEffect(() => {
//         setDisplayCount(5);
//     }, [town]);


//     return (
//         <div style={{ ...containerStyle, textAlign: "center", }}>
//             <h1 className="text-center text-white">Find a CrossFit Box Near You</h1>
//             <Form className="d-flex gap-2">
//                 <Form.Control
//                     id="townInput"
//                     type="text"
//                     placeholder="Enter town"
//                     value={town}
//                     onChange={(e) => setTown(e.target.value)}
//                 />
//                 <Button onClick={getBox} variant="primary">
//                     Search
//                 </Button>
//             </Form>

//             {loading && <p>Loading...</p>}

//             {searchPerformed && !loading && !error && foursquareData.length === 0 ? (
//                 <p style={{ color: 'white' }}>Sorry, there are no CrossFit boxes found in that town. Please try another town.</p>
//             ) : null}

//             {!loading && !error && foursquareData.length > 0 && (
//                 <>
//                     <Row className="gx-4 mx-5 justify-content-center">
//                         {foursquareData.slice(0, displayCount).map((place, index) => (
//                             <Col key={place.fsq_id} md={6} lg={4} className="mb-4">
//                                 <BoxCard place={place} />
//                             </Col>
//                         ))}
//                     </Row>

//                     {foursquareData.length > displayCount && (
//                         <Button onClick={() => handleLoadMore()} variant="primary" style={{ margin: '0 10px' }}>
//                             Show More
//                         </Button>
//                     )}
//                 </>
//             )}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };