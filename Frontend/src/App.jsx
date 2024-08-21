import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./Pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  console.log("hello world");
  return (
    <div>
      {/* <Login /> */}
      <Signup/>
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
  )
}

export default App;
