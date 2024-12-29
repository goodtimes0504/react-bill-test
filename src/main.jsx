import { createRoot } from "react-dom/client";

// import "./index.css";
import App from "./App.jsx";

// import sum from "./test.js";
import sum from "@/test.js";
console.log(sum(1, 2));
createRoot(document.getElementById("root")).render(<App />);
