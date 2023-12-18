import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/HomePage";
import { Register } from "./pages/RegisterPage";
import { Progress } from "./pages/ProgressPage";
import { Terms } from "./pages/TermsPage";
import { TermDetail } from "./pages/TermDetailPage";
import { WorkoutCategories } from "./pages/WorkoutCategoriesPage";
import { RandomWod } from "./pages/WodPage";
import { FindBox } from "./pages/FindBoxPage";
import { SubmitWod } from "./pages/SubmitWodPage";
import { Welcome } from "./pages/WelcomePage";
import Error404Page from "./pages/Error404Page.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Welcome />,
            },
            {
                path: "register/",
                element: <Register />,
            },
            {
                path: "home/",
                element: <Home />,
            },
            {
                path: "findbox/",
                element: <FindBox />,
            },
            {
                path: "terms/",
                element: <Terms />,
            },
            {
                path: "terms/:id/",
                element: <TermDetail />,
            },

            {
                path: "workoutcategories/",
                element: <WorkoutCategories />,
            },
            {
                path: "workout/random/:category/",
                element: <RandomWod />,
            },
            {
                path: "progress/",
                element: <Progress />,
            },
            {
                path: "submitwod/",
                element: <SubmitWod />,
            },
        ],
        errorElement: <Error404Page />,
    },
]);

export default router;