import React from 'react';
import { Typography } from '@mui/material';

export default function Detail({charity}) {
  return (
    <div className="charities-button-container">
      {/* <Typography> */}
          <h1>{charity.name}</h1>
          <Typography variant="subtitle1"> 
          {charity.purpose}
          <br/>
          {charity.advisory ? (<p>Please note: Advisory in effect for this charity. Please check your donation level and recent news. Severity Level: {charity.advisory}</p>):''}
          <br/>
          <br/>
          Ratings: 
          Overall Rating: {charity.overallRating ? `${charity.overallRating}%` : 'Not Provided'}
          <br/>
          Financial Rating: {charity.financialRating ? `${charity.financialRating}%` : 'Not Provided'}
          <br/>
          Accountability: {charity.accountability ? `${charity.accountability}%` : 'Not Provided'}
          <br/><br/>
          <a href={charity.website}>Website</a>
          <br/><br/>
          <a href={charity.CNLink}>More Info on Charity Navigator</a>
          </Typography>
      {/* </Typography> */}
      
      {/* Trends */}
      {/* Radar chart */}
    </div>
  )
}

// "id": "100",
// "EIN": "hlkj423h5ljl",
// "name": "Eric Wu Foundation",
// "purpose": "111111111111111111111111111111111",
// "financialRating" : "2",
// "overallRating" : "3",
// "accountability" : "4",
// "contactInfo": "6",
// "website": "7",
// "CNLink": "8",
// "financialTrend": false,
// "overallTrend": null,
// "accountabilityTrend": true

/**
 * ${name}
 * 
 * ${purpose}
 * 
 * Ratings (out of 10):
 * Overall Rating ${Overall Rating}
 * Financial Rating: ${financialRating}
 * Accountability: ${accountability}
 * 
 * ${website}
 * 
 * More info: ${CNLink} 
 */