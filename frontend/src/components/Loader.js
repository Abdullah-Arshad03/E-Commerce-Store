
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


const Loader = () =>{
    
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={60}  />
    </Box>
  );
}


    export default Loader
