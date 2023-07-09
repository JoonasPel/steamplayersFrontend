import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
//MUI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// change to 100,300,400,500,700,900 to change font.
// get italic with e.g. '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/500.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const url = "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";
const imageUrl = "https://cdn.pixabay.com/photo/2016/11/19/00/17/infinity-1837436_1280.png";

function App() {
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
      <CssBaseline />
      <div className="App">
        <header className="App-header">

          <img src={imageUrl} className="App-logo"
            alt="black infinity symbol rotating clockwise"
            style={{ maxWidth: "7%", height: "auto"}}/>

          <TableContainer component={Paper}
            sx={{
              width: '60%',
              margin: '0 auto', // Center the table horizontally
            }}
          >
            <Table sx={{ minWidth: 650 }}
              size="small" aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align='right'>Current</TableCell>
                  <TableCell align='right'>24h peak</TableCell>
                  <TableCell align='right'>24h bottom</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data && data.map((item) => (
                  <TableRow 
                    key={item.gameid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {item.gamename}
                    </TableCell>
                    <TableCell align='right'>{item?.playercount}</TableCell>
                    <TableCell align='right'>{item?.peak}</TableCell>
                    <TableCell align='right'>{item?.bottom}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ display: 'flex' }}>
            <Button variant="contained" onClick={()=>changePage(-1)}
            disabled={buttonsDisabled}
            >EARLIER PAGE</Button>
            <Button variant="contained" onClick={()=>changePage(1)} disabled={buttonsDisabled}
            >NEXT PAGE</Button>
          </div>

        </header>
      </div>
    </React.Fragment>
  );
};

export default App;
