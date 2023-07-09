import './App.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
//MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// change to 100,300,400,500,700,900 to change font.
// get italic with e.g. '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/500.css';
// components
import TableComponent from './components/TableComponent';
import PageNavigation from './components/PageNavigation';

const url = "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(url, {
        params: {
          page: page.toString()
        },
        headers: {
          // this api key is not confidental and can be exposed.
          'x-api-key': 'aZ6S5wfZiW7k1MFsIRhE96EJNqlc2ZDJ8DvK5jCg',
        },
      });
      const sortedData = [...response.data.data].sort(
        (a,b)=> b?.playercount - a?.playercount);
      setData(sortedData);
      return response.status;
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, []);

  // return number with thousand separators. 1000000=>1.000.000
  function numberWithSeparators(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const changePage = async (param) => {
    setButtonsDisabled(true);
    let newPageNumber = parseInt(pageNumber) + param;
    newPageNumber = newPageNumber > 0 ? newPageNumber : 1;
    if (newPageNumber == pageNumber) { 
      setButtonsDisabled(false);
      return;
    }
    let responseStatus = await fetchData(newPageNumber);
    if (responseStatus === 200) {
      setPageNumber(newPageNumber);
      setButtonsDisabled(false);
    } 
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            SteamPlayers.info
          </header>
          <main className='App-main'>
            <TableComponent data={data}/>
            <PageNavigation changePage={changePage} 
              buttonsDisabled={buttonsDisabled} pageNumber={pageNumber}/>
          </main>
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
