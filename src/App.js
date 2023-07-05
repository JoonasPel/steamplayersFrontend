import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';

const url = "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";

function App() {
  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          // this api key is not confidental and can be exposed. dont worry.
          'x-api-key': 'aZ6S5wfZiW7k1MFsIRhE96EJNqlc2ZDJ8DvK5jCg',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Joonas!</p>
      </header>
    </div>
  );
};

export default App;
