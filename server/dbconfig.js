const mysql = require('mysql2');
//gets the env module
const dotenv = require('dotenv');
const path = require('path')

//initializes env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// database connection settings
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection((error, connection) => {

  if(error){
    console.log(`Error connecting to database: ${error}`);
    return;
  };
  console.log(`Connection success!`);
  connection.release();
});


module.exports = connection;