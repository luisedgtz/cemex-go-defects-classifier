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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#243B80",
      light: "#F5F5F5"

    },
    secondary: {
      main: "#E42D3F"
    },
    text: {
      primary: "#243B80",
      secondary: "#BFC0D0"
    },
  },
  typography: {
    fontFamily: [
      "'Montserrat', sans-serif"
    ]
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
