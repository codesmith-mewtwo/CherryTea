import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Card, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Grid from '@mui/material/Grid';

import dummyData from '../../dummyData'

import Charity from '../components/Charity';
import Detail from '../components/Detail'

const charityContainer = [
];
const cur = false;

function Home() {
  const [ charitiesData, setCharitiesData ] = useState({});
  const [ selected, setSelected ] = useState();
  const [ containerWidthLeft, setContainerWidthLeft ] = useState(12);
  const [ containerWidthRight, setContainerWidthRight ] = useState(0);
  const [ charityButtonClicked, setCharityButtonClicked] = useState(false);
  const [ charityInputText, setCharityInputText ] = useState(false);
  const charityRef = useRef({})
  charityRef.current = charityButtonClicked;
  const selectedRef = useRef({})
  selectedRef.current = selected;

  useEffect(() => {
    fetch('/api/profile', {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      const charityDataObj = {};
      res.map((el, ind) => {
        charityDataObj[el.name] = {...el};
        console.log(el);
        charityContainer.push(
          <Charity key={el.name} name={el.name} handleCharityClick={handleCharityClick} advisory={el.advisory}/>
          )
        })
      setCharitiesData(charityDataObj)
    })
    // })
  }, [])

  useEffect(() => {
    console.log(charitiesData);
  }, [charitiesData])

  useEffect(() => {
    if (selected) {
      setContainerWidthLeft(6)
      setContainerWidthRight(6)
    } else {
      setContainerWidthLeft(12)
      setContainerWidthRight(0)
  }
  }, [selected])

  const handleAddCharity = () => {
    console.log('\n\n\n CHARITY INPUT TEXT', charityInputText)
    fetch('/api/profile', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "charityName": charityInputText
      })
    })
    .then(res => {console.log(res.status)})
    .catch(err => {console.log(err)})
  }

  const handleCharityClick = (e) => {
    // This line below isolates for target charity's name
    const charityName = e.target.innerHTML.split('<')[0];
    console.log(e.target)
    if (charityName === selectedRef.current) {
      setSelected(undefined)
    } else {
      setSelected(charityName)
    }
  }

  useEffect(() => {
    console.log(selected)
    
    console.log(charitiesData[selected])
  }, [selected]);



  return (

    <Container maxWidth="lg" className="root-container">
      {/* <CssBaseline /> */}
      <div className={"charity-add-div"}>
        <TextField
          id="outlined-charity-add-field" 
          label="Charity Name" 
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setCharityInputText(e.target.value)
          }}
        />
        <Button href='/home' variant="text" onClick={handleAddCharity}>Add</Button>
      </div>
        <Card>
          <h2 className={"charities-header"}>
            <Typography>
              Your Charities
            </Typography>
          </h2>
          <Grid container>
            <Grid item xs={8} md={containerWidthLeft} >
              <Stack spacing={1}>
                <div className={"charities-button-container"}>
                  {charityContainer}
                </div>
              </Stack>
            </Grid>
            {(
            selected ? (
              <Grid item xs={8} md={containerWidthRight}>
                <Card sx={{margin: "10px", height: "96%"}}>
                  <Detail charity={charitiesData[selected]}/>
                </Card>
              </Grid>
            ) : <div></div>
            )}
          </Grid>
        </Card>
    </Container>
  );
};

export default Home;
