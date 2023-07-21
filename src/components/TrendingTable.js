import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import { useEffect, useState } from 'react';


const TrendingTable = ({data, aff}) => {
  const [salePercentages, setSalePercentages] = useState({});

  useEffect(() => {
    let tempSales = {};
    for (let gameAff of aff) {
      const id = gameAff?.gameid;
      if (!data.find(x => x.gameid == id)) { continue; }
      const sale = (gameAff.retailprice - gameAff.price) / (gameAff.retailprice );
      if (isFinite(sale)) { tempSales[id] = Math.floor(sale*100); }   
    }
    setSalePercentages(tempSales);
  }, [aff]);

  return (
    <TableContainer component={Paper}
      sx={{
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Table sx={{ minWidth: 100 }}
        size="small" aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '300px', fontSize: '25px', fontWeight: 'bold' }}
              >Trending Today</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>{"Growth \u{1F4C8}"}</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>{"Deals \u{1F4B0}"}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map((item) => (
            <TableRow 
              key={item.gameid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{ fontSize: '17px'}}
                component='th' scope='row'>
                {item.gamename}
              </TableCell>

              <TableCell style={{color: "green", fontSize: '18px'}}
                align='right'>
                {Math.round(item?.increase*100)}%
              </TableCell>

              <TableCell style={{fontSize: '18px'}}
                align='right'>
                {aff && aff.length > 0 && aff.find(
                  x => x.gameid === item.gameid) ?
                  <Link href={"https://www.g2a.com"+
                    (aff.find(x => x.gameid === item.gameid).url)+"?gtag=16cf32cff3"}
                    target="_blank" rel="noopener noreferrer" style={{color: "#FF8C00"}}>         
                    {"Buy "}
                    {(salePercentages[item.gameid] ?
                      -salePercentages[item.gameid] + "% OFF!"
                      : ""
                    )}
                  </Link>
                  : ""} 
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TrendingTable;