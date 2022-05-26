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
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLoginClick = () => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username, password
      })
    })
    .then(res => {console.log(res.status)})
    .catch(err => {console.log(err)})
  };

  return (
    <div className="root-container">
      <CssBaseline />
      <Card>
        <Stack spacing={3}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <br />
            <form noValidate autoComplete="off">
              <Stack spacing={3}>
                <TextField id="outlined-username" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                <TextField type="password" id="outlined-password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
              </Stack>
            </form>
          </CardContent>
          <CardActions className="reg-buttons">
            <Stack>
              <Button href="/home" variant="outlined" size="large" color="primary" onClick={handleLoginClick}>
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
