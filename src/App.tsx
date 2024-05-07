import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <div className="flex h-screen">
            <AppRoutes />
            <ToastContainer />
        </div>
    );
};

export default App;
