////////////////////
// Dependencies
////////////////////
const mongoose = require("./connection");

//////////////////
//Schema and Models
////////////////////

//Schema
const skillSchema = new mongoose.Schema({
    text: String,
    resource: String,
    journal: String,
    completed: Boolean
}, 
{timestamps: true});

const Skill = mongoose.model("Skill", skillSchema);

///////////////
// Export Model
/////////////////
module.exports = Skill;