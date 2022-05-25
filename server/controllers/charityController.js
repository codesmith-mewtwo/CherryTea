const charityController = {}
const db = require('../models/dbModel')
const express = require('express')
const got = require('got')

charityController.getCharities = async (req,res,next) => {

  // Take in array of charity names, retrieve relevant information from the API, update these charities in the database, then 
  // return them out with details on res.locals

  const {uuid} = req.cookies;
  if (req.body.charityName) {res.locals.charityNames.push({name: req.body.charityName})}

  console.log(res.locals.charityNames) // Array of charity names to update

  for await (const charity of res.locals.charityNames){
    console.log(charity.name)
    
    const charityName = charity.name.toLowerCase();

    const searchLine = charityName.replaceAll(' ', '%20')

      try {
          const response = await got(`https://api.data.charitynavigator.org/v2/Organizations?app_id=daae8b79&app_key=7638e36419c57be84cfd662e3d089c0e&pageSize=1&search=${searchLine}&searchType=NAME_ONLY`).json();
          let {
            tagLine,
            charityName,
            websiteURL,
            ein,
            currentRating,
            mission,
            charityNavigatorURL,
            mailingAddress
          } = response[0];
          let missionSQLFriendly;
          let tagLineSQLFriendly;
          if (tagLine) {tagLineSQLFriendly = tagLine.replaceAll('\'','\'\'');}
          if (mission) {missionSQLFriendly = mission.replaceAll('\'','\'\'');}
          charityName = charityName.toLowerCase();

          const charity = [tagLineSQLFriendly || null, currentRating.financialRating.score || null, currentRating.score || null, currentRating.accountabilityRating.score || null,
          missionSQLFriendly || null, mailingAddress.postalCode || null, websiteURL || null, charityNavigatorURL || null, ein, charityName];

          const query = `
            INSERT INTO charities ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN", "name")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)          
            ON CONFLICT ("name") DO UPDATE
            SET ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN") =
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ;`
          db.query(query, charity)
          .then(data => {
            return
          })
          .catch(err => {
            next(err);
          });
      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
  };

  const user = [uuid]
  const query = `
  SELECT * FROM charities
  INNER JOIN users_charities ON users_charities.charity_id = charities._id
  WHERE user_id = $1
  ;`
  db.query(query, user)
  .then(data => {
    res.locals.profile = data.rows;
    next();
  })
  .catch(err => {
    next(err);
  });
};

module.exports = charityController;