import "./App.css";
import { IconContext } from "react-icons";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./navigation/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import PrivateRoute from './navigation/PrivateRoute'
import AuthRoute from './navigation/AuthRoute'
import PortalScreen from "./screens/PortalScreen";

function App() {
  return (
  <IconContext.Provider value={{color: "#243B80", size: "20px"}}>
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginScreen/>}/>
            <Route exact path="/portal" element={<PortalScreen/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  </IconContext.Provider>
  );
}

export default App;
