import React, { useState } from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';


const Charity = ({name, handleCharityClick, charityButtonHeight}) => {

  return (
    <Card style={{ textAlign: "center"}} >
      <Button 
        onClick={handleCharityClick}
        size="small" 
        style={{ height: charityButtonHeight }}
        fullWidth 
        name={name}
      >
      {name}
      </Button>
    </Card>
  )
}
export default Charity;