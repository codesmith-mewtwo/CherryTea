import React, { useState } from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));

const Charity = ({name, handleCharityClick, advisory}) => {
  console.log(name, advisory)
  return (
    <Card style={{ textAlign: "center"}} >
      {advisory ? (
      <ColorButton
          onClick={handleCharityClick}
          size="small" 
          style={{ height: '50px' }}
          fullWidth 
          name={name}
        >
        {name}
      </ColorButton>
      ) : 
      (<Button
        onClick={handleCharityClick}
        size="small" 
        style={{ height: '50px' }}
        fullWidth 
        name={name}
      >
      {name}
      </Button>)}
      
    </Card>
  )
}
export default Charity;