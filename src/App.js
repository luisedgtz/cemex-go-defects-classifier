import "./App.css";
import { AuthProvider } from "./navigation/AuthProvider";
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Application from "./screens/Application";

const theme = createTheme({
  palette: {
    primary: {
      main: "#243B80",
      light: "#E1E9FF",
      contrastText: "#FFFFFF"

    },
    secondary: {
      main: "#E42D3F"
    },
    text: {
      primary: "#243B80",
      secondary: "#BFC0D0"
    },
    info: {
      main: "#F5F5F5"
    }
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
          <Application/>         
        </Router>
      </AuthProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
