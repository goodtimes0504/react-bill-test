//创建路由实例 绑定 path element
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "month",
          element: <Month />,
        },
        {
          path: "year",
          element: <Year />,
        },
        {
          index: true,
          element: <Navigate to="/month" replace />,
        },
      ],
    },
    {
      path: "/new",
      element: <New />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
