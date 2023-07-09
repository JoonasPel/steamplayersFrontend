import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
//MUI
import Button from '@mui/material/Button';

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
    <div className="App">
      <header className="App-header">

        <img src={imageUrl} className="App-logo"
          alt="black infinity symbol rotating clockwise"
          style={{ maxWidth: "7%", height: "auto"}}/>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Game | Current | 24h peak | 24h bottom | PAGE:{pageNumber}</li>
          {data &&
            data.map((item) => (
              <li key={item.gameid}
                style={{marginBottom:'10px', backgroundColor:"#1d69a8",
                padding:'5px 10px', border:"2px solid #ccc"}}>
                {item?.gamename+" | "+item?.playercount+" | "+item?.peak+
                " | "+item?.bottom}
              </li>
            ))}
        </ul>
        
        <div style={{ display: 'flex' }}>
          <Button variant="contained" onClick={()=>changePage(-1)}
          disabled={buttonsDisabled}
          >EARLIER PAGE</Button>
          <Button variant="contained" onClick={()=>changePage(1)} disabled={buttonsDisabled}
          >NEXT PAGE</Button>
        </div>

      </header>
    </div>
  );
};

export default App;
