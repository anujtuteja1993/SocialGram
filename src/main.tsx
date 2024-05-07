import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/userContext";
import QueryProvider from "./lib/react-query/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </QueryProvider>
        </BrowserRouter>
    </React.StrictMode>
);
