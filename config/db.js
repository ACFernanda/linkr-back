import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
let configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false,
  };
}

const user = 'postgres'
const password = process.env.PASSWORD ;
const host = 'localhost';
const port = 5432;
const database = process.env.DATABASE;
if(process.env.MODE === "DEV"){
  configDatabase = {
    user,
    password,
    host,
    port,
    database
  }
}
 

const db = new Pool(configDatabase);
export default db;
