import axios from 'axios';
import { useEffect, useState } from "react";
import '../App.css';
// components
import TableComponent from "./TableComponent";
import TrendingTable from "./TrendingTable";
import PageNavigation from "./PageNavigation";
import SearchBar from './SearchBar';
import Stack from "@mui/material/Stack";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';


const url =
  "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/data";
const searchUrl =
  "https://jlxkrysich.execute-api.eu-north-1.amazonaws.com/prod/search";

const MainComponent = () => {
  const [data, setData] = useState({});
  const [aff, setAff] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xl"));

  const fetchData = async (page) => {
    try {
      if (data.hasOwnProperty(page)) { return 200; }
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
      setData(prev => ({...prev, [page]: sortedData}));    
      return response.status;
    } catch (error) {
      console.error("error fetching:", error);
    }
  };

  const fetchTrending = async () => {
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

  const fetchbySearchQuery = async (query) => {
    try {
      const response = await axios.get(searchUrl, {
        params: { query },
        headers: {
          // this api key is not confidental and can be exposed.
          'x-api-key': 'aZ6S5wfZiW7k1MFsIRhE96EJNqlc2ZDJ8DvK5jCg',
        },
      });
      const parsedData = response.data.map(item => JSON.parse(item));
      console.log(parsedData);
    } catch (error) {
      console.error("error searching:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
    fetchTrending();
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
    <main className='App-main'
    style={matches ? { overflowY: "hidden" } : {}}>
      <Stack direction={matches ? "column" : "row"} spacing={5}
      padding={5}>
        <Stack spacing={1} alignItems="flex-end">
          <SearchBar executeSearch={fetchbySearchQuery}/>
          <TableComponent data={data} pageNumber={pageNumber}/>
          <PageNavigation changePage={changePage} 
            buttonsDisabled={buttonsDisabled} pageNumber={pageNumber}/>
        </Stack>
        <Stack>
          {matches ? "" : <div style={{ height: "65px"}} />}
          <TrendingTable data={trendingData} aff={aff}/>
        </Stack>
      </Stack>
    </main>
  );
};
export default MainComponent;