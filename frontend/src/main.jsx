import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Dashboard from "./Dashboard";
import "./styles.css";

const path = window.location.pathname;
const Component = path.startsWith("/users/Dashboard") ? Dashboard : App;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
