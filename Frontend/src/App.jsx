import { useEffect } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true;
function App() {
  useEffect(() => {
    (async () => {
      try {
        axios
          .get("http://localhost:8000/test")
          .then((resp) => console.log(resp.data))
          .catch((_)=>console.log("sorry"));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <>hello</>;
}

export default App;
