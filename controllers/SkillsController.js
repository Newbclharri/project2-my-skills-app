///////////////
// Dependencies
/////////////////
const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

//////////////////
// Routes
/////////////////

//index
router.get("/skills", async (req, res) =>{
    const skills = await Skill.find({}).catch(err => res.send(err));
    res.render("index.ejs",{skills});
})

//create
router.post("/skill", async (req, res) =>{
    console.log(req.body.checked)
    const skill = req.body.skill;
    const resource = req.body.resource || "https://www.google.com/"
    await Skill.create({
        text: skill,
        resource: resource,
        completed: false
    })

    res.send("post successful")
})


/////////////
// Export Router
/////////////
module.exports = router;