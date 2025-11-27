const { Pool } = require("pg");
//include the db ask pool keyword from the .env file which is mention as dotenv
require("dotenv").config();
const pool = new Pool({
user:process.env.DB_USER,
password:process.env.DB_PASS,
host:process.env.DB_HOST,
database:process.env.DB_NAME,
port:process.env.DB_PORT
});
//initate the coonection to db and make a check on it 
pool.connect()
    .then(()=>console.log("DB connected"))
    .catch(()=>console.log("DB is not been connected"));
module.exports = pool;