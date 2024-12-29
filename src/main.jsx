import { createRoot } from "react-dom/client";

// import "./index.css";
// import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router";
//导入定制主题文件
import "./theme.css";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </Provider>
);
