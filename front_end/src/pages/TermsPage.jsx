import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utilities";
import backgroundImage from "../assets/crossfit-bg-image.jpg";

export const Terms = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        width: "100%"
    };

    const [terms, setTerms] = useState([]);

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
        <Row style={containerStyle}>
            <div style={{ textAlign: "center", padding: "0 10vmin", position: "relative", zIndex: 1 }}>
                <h1 className="text-center mt-5" style={{ color: 'white' }} >Workout and Exercise Definitions</h1>
                <p style={{ color: 'white' }} >Click a term below to see its full definition and video</p>
                <ol>
                    {terms.map((term) => (
                        <li
                            key={term.id}
                            style={{
                                margin: "2vmin",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                            }}
                        > <Link to={`/terms/${term.id}`}>{term.term}</Link>
                        </li>
                    ))}
                </ol>
            </div>
        </Row>
    );
};



// ----with dull background-----//
// import Row from "react-bootstrap/esm/Row";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { api } from "../utilities";
// import backgroundImage from "../assets/crossfit-bg-image.jpg";

// export const Terms = () => {
//     const containerStyle = {
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         position: "relative", // Required for the ::before pseudo-element
//     };

//     const [terms, setTerms] = useState([]);

//     const getAllTerms = async () => {
//         try {
//             const response = await api.get("crossfitterm/terms/");
//             const sortedTerms = response.data.sort((a, b) => a.term.localeCompare(b.term));
//             setTerms(sortedTerms);
//         } catch (error) {
//             console.error(error);
//             alert("Something went wrong");
//         }
//     };

//     useEffect(() => {
//         getAllTerms();
//     }, []);

//     return (
//         <Row style={containerStyle}>
//             <div style={{ textAlign: "center", padding: "0 10vmin", position: "relative", zIndex: 1 }}>
//                 <h1 className="text-center mt-5">Workout and Exercise Definitions</h1>
//                 <p>Click a term below to see its full definition and video</p>
//                 <ol>
//                     {terms.map((term) => (
//                         <li
//                             key={term.id}
//                             style={{
//                                 margin: "2vmin",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 textAlign: "left"
//                             }}
//                         > <Link to={`/terms/${term.id}`}>{term.term}</Link>
//                         </li>
//                     ))}
//                 </ol>
//             </div>
//             <div
//                 style={{
//                     content: "",
//                     background: "rgba(255, 255, 255, 0.6)", // Adjust the alpha channel for opacity
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: 0,
//                     zIndex: 0,
//                 }}
//             />
//         </Row>
//     );
// };