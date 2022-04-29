//////////////
// Dependencies
////////////////
const mongoose = require("./connection");

///////////////////
//Schema and Model
//////////////////

//Schema
const journalSchema = new mongoose.Schema({
    text: String
},
{timestamps: true});

//Model
const Journal = mongoose.model("Journal", journalSchema);

///////////////
// Export Model
///////////////
module.exports = Journal;
