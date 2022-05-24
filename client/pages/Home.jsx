import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const Home = () => {
  return (
    // Input Bar
    // Centered Card
    // Heading --> Typography
    // User's charity boxes --> Container
    // Individual charity -->
    // Charity Name --> Button Links
    <Container maxWidth="sm" className="root-container">
      <CssBaseline />

      <TextField id="outlined-charity-add-field" label="Charity Name" variant="outlined" />
      <Fab size="medium" aria-label="add charity" color="primary">
        <AddIcon />
      </Fab>
      <Stack>
        <p>hi</p>
        <p>hi</p>
        <p>hi</p>
      </Stack>
    </Container>
  );
};

export default Home;
