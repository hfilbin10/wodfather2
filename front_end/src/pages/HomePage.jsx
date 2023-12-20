import { Row } from 'react-bootstrap';
import wodfatherImage from '../assets/wodfather-white.png';
import backgroundImage from "../assets/crossfit-bg-image3.jpg";

export const Home = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        // minWidth: "100vw",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        
    };

    return (
        <Row className="justify-content-center" style={{ ...containerStyle, textAlign: "center", padding: "20px 10vmin", position: 'relative' }}>
            <div style={{ marginBottom: '20px', zIndex: 1 }}>
                <img src={wodfatherImage} alt="WODfather" style={{ width: '400px', height: 'auto' }} />
            </div>
        </Row>
    );
};



// ----With video-----//
// import { Row } from 'react-bootstrap';
// import wodfatherImage from '../assets/wodfather-white.png';
// import backgroundImage from "../assets/crossfit-bg-image3.jpg";

// export const Home = () => {
//     const containerStyle = {
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         position: "relative",
//         backgroundPosition: "bottom",
//     };

//     return (
//         <Row className="justify-content-center" style={{ ...containerStyle, textAlign: "center", padding: "20px 10vmin" }}>
//             <div style={{ marginBottom: '20px' }}>
//                 <img src={wodfatherImage} alt="WODfather" style={{ width: '400px', height: 'auto' }} />
//             </div>
//             <div style={{ width: '40rem', margin: '20px 0' }}>
//                 <p style={{ color: 'white', fontWeight: 'bolder' }}>Never heard of CrossFit before? No problem, check out the video and then start exploring the site to learn more!</p>
//                 <div className="embed-responsive embed-responsive-16by9">
//                     <iframe
//                         className="embed-responsive-item"
//                         src="https://www.youtube.com/embed/1Q18EOZfTJQ"
//                         title="What is CrossFit"
//                         frameBorder="0"
//                         allowFullScreen
//                         style={{ width: '100%', minHeight: '315px', margin: '20px 0' }}
//                     ></iframe>
//                 </div>
//             </div>
//             <div
//                 style={{
//                     content: "",
//                     background: "rgba(255, 255, 255, 0.2)", // Adjust the alpha channel for opacity
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: 0,
//                     zIndex: -1,
//                 }}
//             />
//         </Row>
//     );
// };