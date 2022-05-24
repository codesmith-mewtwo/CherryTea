const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:


// Export query
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};