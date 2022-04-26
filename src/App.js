import "./App.css";
import { IconContext } from "react-icons";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./navigation/AuthProvider";


function App() {
  return (
  <IconContext.Provider value={{color: "#243B80", size: "20px"}}>
    <div className="App">
      <AuthProvider>
        <LoginScreen/>
      </AuthProvider>
    </div>
  </IconContext.Provider>
  );
}

export default App;
