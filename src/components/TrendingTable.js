import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TrendingTable = ({data}) => {
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
            <TableCell style={{ fontSize: '25px', fontWeight: 'bold' }}
              >Trending</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>Increase Today</TableCell>
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
              <TableCell align='right'>{Math.round(item?.increase*100)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TrendingTable;