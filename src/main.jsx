import { createRoot } from "react-dom/client";

// import "./index.css";
// import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router";
//导入定制主题文件
import "./theme.css";
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
);
