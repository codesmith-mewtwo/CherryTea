const charityController = {}
const db = require('../models/dbModel')
const express = require('express')
const got = require('got')

charityController.getCharities = async (req,res,next) => {
  // Take in array of charity names, retrieve relevant information from the API, update these charities in the database, then 
  // return them out with details on res.locals

  const {uuid} = req.cookies;

  console.log(res.locals.charityNames) // Array of charity names to update

  res.locals.charityNames.forEach(async (charity)=>{
    console.log(charity.name)
      try {
        const response = await got('https://api.data.charitynavigator.org/v2/Organizations?app_id=daae8b79&app_key=7638e36419c57be84cfd662e3d089c0e&pageSize=1&search=Equal%20Justice%20Initiative&searchType=NAME_ONLY').json();
        const {
          tagLine,
          charityName,
          websiteURL,
          ein,
          currentRating,
          mission,
          charityNavigatorURL,
          mailingAddress
        } = response[0];
        const missionSQLFriendly = mission.replace('\'','\'\'');
        const tagLineSQLFriendly = tagLine.replace('\'','\'\'');
        const query = `
          INSERT INTO charities ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN", "name")
          VALUES ('${tagLineSQLFriendly}','${currentRating.financialRating.score}','${currentRating.score}','${currentRating.accountabilityRating.score}',
          '${missionSQLFriendly}','${mailingAddress.postalCode}','${websiteURL}','${charityNavigatorURL}','${ein}','${charityName}')          
          ON CONFLICT ("name") DO UPDATE
          SET ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN") =
          ('${tagLineSQLFriendly}',${currentRating.financialRating.score},${currentRating.score},${currentRating.accountabilityRating.score},
          '${missionSQLFriendly}','${mailingAddress.postalCode}','${websiteURL}','${charityNavigatorURL}','${ein}')
        ;`
        db.query(query)
        .then(data => {
          next();
        })
        .catch(err => {
          next(err);
        });

      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
  })

  const query = `
  SELECT * FROM charities
  INNER JOIN users_charities ON users_charities.charity_id = charities._id
  WHERE user_id = '${uuid}'
  ;`
  db.query(query)
  .then(data => {
    res.locals.profile = data.rows;
    next();
  })
  .catch(err => {
    next(err);
  });
};

charityController.addCharity= async (req,res,next) => {
  // Take in charity name, add it to database
  const {charityName} = req.body;
  try {
    const response = await got('https://api.data.charitynavigator.org/v2/Organizations?app_id=daae8b79&app_key=7638e36419c57be84cfd662e3d089c0e&pageSize=1&search=Equal%20Justice%20Initiative&searchType=NAME_ONLY').json();
  }





  const query = `
   * FROM charities
  INNER JOIN users_charities ON users_charities.charity_id = charities._id
  WHERE user_id = '${uuid}'
  ;`
  db.query(query)
  .then(data => {
    res.locals.profile = data.rows;
    next();
  })
  .catch(err => {
    next(err);
  });
};

module.exports = charityController;