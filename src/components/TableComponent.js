import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


  // return number with thousand separators. 1000000=>1.000.000
  function numberWithSeparators(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

const TableComponent = ({data}) => {
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
            <TableCell style={{ width: '400px', fontSize: '25px', fontWeight: 'bold' }}
              >Game</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>Current</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>24h peak</TableCell>
            <TableCell style={{ fontSize: '22px', fontWeight: 'bold' }}
              align='right'>24h bottom</TableCell>
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
              <TableCell align='right'>{numberWithSeparators(item?.playercount)}</TableCell>
              <TableCell align='right'>{numberWithSeparators(item?.peak)}</TableCell>
              <TableCell align='right'>{numberWithSeparators(item?.bottom)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TableComponent;