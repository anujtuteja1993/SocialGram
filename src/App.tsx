import { AppRoutes } from "./routes/AppRoutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

const App = () => {
    const location = useLocation();
    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [location.pathname]);
    return <AppRoutes />;
};

export default App;
