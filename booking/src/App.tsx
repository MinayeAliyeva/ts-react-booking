import "./App.css";
import { routes } from "./routes/Routes";
import { useRoutes } from "react-router-dom";
function App() {
  return useRoutes(routes);
}

export default App;
