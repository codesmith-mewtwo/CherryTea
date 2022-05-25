import React, { useState } from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';


const Charity = ({name, handleCharityClick}) => {

  return (
    <Card style={{ textAlign: "center"}} >
      <Button
        onClick={handleCharityClick}
        size="small" 
        style={{ height: '50px' }}
        fullWidth 
        name={name}
      >
      {name}
      </Button>
    </Card>
  )
}
export default Charity;