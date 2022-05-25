import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid';

import dummyData from '../../dummyData'

import Charity from '../components/Charity';

const charityContainer = [
];
const cur = false;

function Home() {
  const charityButtonHeight = '50px';
  const [ charitiesData, setCharitiesData ] = useState({});
  const [ selected, setSelected ] = useState('');
  const [ containerWidthLeft, setContainerWidthLeft ] = useState(12);
  const [ containerWidthRight, setContainerWidthRight ] = useState(0);
  const [ charityButtonClicked, setCharityButtonClicked] = useState(false);
  const charityRef = useRef({})
  charityRef.current = charityButtonClicked;

  {/* 
    POST for new charity requires charityName in body
  */}

  
  useEffect( () => {
    // fetch('/api/profile', {
    {/* }) EIN / name
      // .then((res) => res.json() )
      // .then((res) => {
        if (!Array.isArray(res)) setCharities([]);
        if (res) {
        }
        // })
      */}
    console.log(dummyData);
    const charityDataObj = {};
    dummyData.map((el, ind) => {
      charityDataObj[el.name] = {...el};
      charityContainer.push(
      <Card key={el.name} style={{ textAlign: "center"}}>
        <Button
          onClick={handleCharityClick}
          size="small" 
          style={{ height: charityButtonHeight }}
          fullWidth 
        >
        {el.name}
        </Button>
      </Card>
    )
    })
    setCharitiesData(charityDataObj)
  }, [])

  useEffect(() => {
    if (charityButtonClicked) {
      setContainerWidthLeft(6)
      setContainerWidthRight(6)
    } else {
      setContainerWidthLeft(12)
      setContainerWidthRight(0)
  }
  }, [charityRef.current])

  const handleCharityClick = (e) => {
    console.log(e.target.innerText);
    console.log(e.target.innerHTML.split('<')[0]);
    // console.log(e.target.props.children.props.name)
    
    setCharityButtonClicked(!charityRef.current);
  }

  return (

    <Container maxWidth="lg" className="root-container">
      {/* <CssBaseline /> */}
      <div className={"charity-add-div"}>
        <TextField
          id="outlined-charity-add-field" 
          label="Charity Name" 
          variant="outlined"
          fullWidth
        />
        <Button variant="text">Add</Button>
      </div>
        <Card>
          <h2 className={"charities-header"}>
            {/* <Typography > */}
              Your Charities
            {/* </Typography> */}
          </h2>
          <Grid container>
            <Grid item xs={8} md={containerWidthLeft} >
              <Stack spacing={1}>
                <div className={"charities-button-container"}>
                  {charityContainer}
                </div>
              </Stack>
            </Grid>
            <Grid item xs={8} md={containerWidthRight}>
              <Card sx={{margin: "10px", height: "96%"}}>
                
                <div className={"charity-details"}>
                Hello
                </div>
              </Card>
            </Grid>
          </Grid>
        </Card>
    </Container>
  );
};

export default Home;
