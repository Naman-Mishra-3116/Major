import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./Pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RootWelcome from "./Pages/RootWelcome";
import Home from "./Pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootWelcome />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/about",
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        closeOnClick={true}
        closeButton={false}
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
