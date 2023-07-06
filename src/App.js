import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';

const url = "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";
const imageUrl = "https://cdn.pixabay.com/photo/2016/11/19/00/17/infinity-1837436_1280.png";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          // this api key is not confidental and can be exposed.
          'x-api-key': 'aZ6S5wfZiW7k1MFsIRhE96EJNqlc2ZDJ8DvK5jCg',
        },
      });
      const sortedData = [...response.data.data].sort(
        (a,b)=> b?.playercount - a?.playercount);
      setData(sortedData);
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // return number with thousand separators. 1000000=>1.000.000
  function numberWithSeparators(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={imageUrl} className="App-logo"
          alt="black infinity symbol rotating clockwise"
          style={{ maxWidth: "7%", height: "auto"}}/>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Game | Currentplayers | 24h peak | 24h bottom</li>
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

      </header>
    </div>
  );
};

export default App;
