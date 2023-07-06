///////////////
// Dependencies
////////////////
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL


///////////////////////
// Establish connection
////////////////////////
mongoose.connect(DATABASE_URL)

// Save connection
const cxn = mongoose.connection

// Connection Messages
cxn
.on("open", () => console.log("Mongo connection OPEN"))
.on("close", () => console.log('Mongo connection CLOSED'))
.on("error", (err) => console.log(err));

////////////////////////
// Export Connection
////////////////////////
module.exports = mongoose