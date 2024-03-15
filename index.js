import express from "express";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
// Defining the PG client
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABSE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
// Connecting to the database
db.connect();
// Configuring express
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

// Main route
app.get("/",async(req,res)=>{

    res.render("index.ejs");
})

// Sorting books by rating/recency
app.post("/sort",async(req,res)=>{
    
})


app.listen(port,()=>{
    console.log("I am listening");
})