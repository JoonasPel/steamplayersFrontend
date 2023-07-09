import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const PageNavigation = ({changePage, buttonsDisabled}) => {
  return (
    <div style={{ display: 'flex' }}>

      <Button variant="contained" startIcon={<ArrowBackIosIcon />}
      onClick={()=>changePage(-1)} disabled={buttonsDisabled}
      >EARLIER PAGE</Button>

      <Button variant="contained" endIcon={<ArrowForwardIosIcon />}
        onClick={()=>changePage(1)} disabled={buttonsDisabled}
      >NEXT PAGE</Button>
    </div>
  )

};
export default PageNavigation;