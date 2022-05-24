import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Login = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="root-container">
      <Card>
        <Stack spacing={3}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <br />
            <form noValidate autoComplete="off">
              <Stack spacing={3}>
                <TextField id="outlined-username" label="Username" variant="outlined" />
                <TextField type="password" id="outlined-password" label="Password" variant="outlined" />
              </Stack>
            </form>
          </CardContent>
          <CardActions className="reg-buttons">
            <Stack>
              <Button variant="outlined" size="large" color="primary">
                Login
              </Button>
              <Button href="/register" size="small">
                Don't have an account?
              </Button>
            </Stack>
          </CardActions>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
