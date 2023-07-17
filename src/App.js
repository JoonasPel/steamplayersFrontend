import './App.css';
import React from 'react';
//MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// change to 100,300,400,500,700,900 to change font.
// get italic with e.g. '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/500.css';
// components
import MainComponent from './components/MainComponent';
import { Link } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">

          <header className="App-header">
            SteamPlayers.info
          </header>
 
          <MainComponent />
          <Link href="https://www.g2a.com/squad-steam-key-global-i10000008695006?gtag=16cf32cff3"
            target="_blank" rel="noopener noreferrer"
            >Buy now!</Link>
          
          <footer className="App-footer">
            Not affiliated with Valve or Steam. All
            trademarks are property of their respective
            owners.
          </footer>
          
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};
export default App;
