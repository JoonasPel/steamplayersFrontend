import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css';
// components
import TableComponent from "./TableComponent";
import TrendingTable from "./TrendingTable";
import PageNavigation from "./PageNavigation";
import Stack from "@mui/material/Stack"

const url =
  "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";

const MainComponent = () => {
  const [data, setData] = useState([]);
  const [aff, setAff] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
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
      const parsedData = response.data.data.map(
        item => JSON.parse(item));
      const sortedData = parsedData.sort(
        (a,b)=> b?.playercount - a?.playercount);
      setData(sortedData);
      return response.status;
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  const fetchTreding = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          trending: 1
        },
        headers: {
          // this api key is not confidental and can be exposed.
          'x-api-key': 'aZ6S5wfZiW7k1MFsIRhE96EJNqlc2ZDJ8DvK5jCg',
        },
      });   
      const parsedData = JSON.parse(response.data.data);
      setTrendingData(parsedData);
      setAff(JSON.parse(response.data.aff));
      return response.status;
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
    fetchTreding();
  }, []);

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
    <main className='App-main'>
      <Stack direction="row" spacing={5}>
        <Stack spacing={1} alignItems="flex-end">
          <TableComponent data={data} pageNumber={pageNumber}/>
          <PageNavigation changePage={changePage} 
            buttonsDisabled={buttonsDisabled} pageNumber={pageNumber}/>
        </Stack>
        <Stack>
          <TrendingTable data={trendingData} aff={aff}/>
        </Stack>
      </Stack>

    </main>
  );
};
export default MainComponent;