////////////////////////
// Setup - Import deps and create app object
////////////////////////

const express = require("express"); //server framework
const PORT = process.env.PORT || 4000
const MONGO = process.env.MONGO || "localhost:3000/skills"
const mongoose = require("./models/connection"); // work with DB
const Skill = require("./models/Skill"); //work with Skill Schema
const Journal = require("./models/Journal");
const methodOverride = require("method-override"); //overide form methods
const SkillRouter = require("./controllers/SkillsController");
const morgan = require("morgan") //log request to my server

//Create Express Application
const app = express();



//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({extended: true})); //parse form submission data
app.use("/static", express.static("static")); //serve static files
app.use(methodOverride("_method")); //overide form submission methods
app.use(SkillRouter); //access routes
app.use(morgan("dev"));  //log requests to server

///////////////////////
// Declare Routes and Routers 
///////////////////////
//controllers/SkillsController.js


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>{console.log("Honing my skills on port", PORT)});