const charityController = {}
const db = require('../models/dbModel')
const got = require('got')

// getCharities middleware - using the array of charity names stored on res.locals,
// send calls to API for each of these charities to update info in the database
// then, return out to the user all the info for each of the updated charities
// that user is subscribed to
charityController.getCharities = async (req,res,next) => {
  const {uuid} = req.cookies;
  if (req.body.charityName) {res.locals.charityNames.push({name: req.body.charityName})}

  // For of loop - will iterate through the charity name array and call the API
  // for each. Destructures info off of the API response and updates that 
  // info in the database
  for await (const charity of res.locals.charityNames){
    
    // Convert charity name to lower case for API request
    const charityName = charity.name.toLowerCase();

    // Structure API request appropriately
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
            mailingAddress,
            advisories
          } = response[0];
          let missionSQLFriendly;
          let tagLineSQLFriendly;

          // Since mission statements and taglines may have apostrophes, double the apostrophes that 
          // are there so postgres does not error out
          if (tagLine) {tagLineSQLFriendly = tagLine.replaceAll('\'','\'\'');}
          if (mission) {missionSQLFriendly = mission.replaceAll('\'','\'\'');}

          // Convert charity name to lower case so that calls will match
          // Without this, if the case doesn't match from request body we won't get a new or updated charity
          charityName = charityName.toLowerCase();

          // Some charities may not have ratings, query will error out if so. Added this line
          // to have default null values if the charity is unrated
          if (!currentRating){currentRating = {financialRating: {score: null}, score: null, accountabilityRating: {score: null}}}

          // Parameters for SQL query
          const charity = [tagLineSQLFriendly || null, currentRating.financialRating.score || null, currentRating.score || null, currentRating.accountabilityRating.score || null,
          missionSQLFriendly || null, mailingAddress.postalCode || null, websiteURL || null, charityNavigatorURL || null, ein, charityName, advisories.severity];

          const query = `
            INSERT INTO charities ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN", "name", "advisory")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)          
            ON CONFLICT ("name") DO UPDATE
            SET ("purpose", "financialRating", "overallRating", "accountabilityRating", "missionStatement", "contactInfo", "website", "CNLink", "EIN","advisory") =
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $11)
          ;`
          db.query(query, charity)
          .then(data => {
            return
          })
          .catch(err => {
            next(err);
          });
      } catch (error) {
        console.log(error);
        next(error)
        //=> 'Internal server error ...'
      }
  };

  // Once for loop updating is complete, select all rows from charity joined
  // with user (all charities the user is subscribed to) and send data out 
  // to client
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