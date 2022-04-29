///////////////
// Dependencies
/////////////////
const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const skill = async ()=>{

}
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
    }).catch(err=> res.send(err))

    res.send("post successful")
})

//update
router.put("/:id", async (req, res)=>{
    const id = req.params.id
    const status = !!req.body.checked
    console.log(req.body.checkbox)
    const skill = await Skill.findById(id).catch(err => res.send(err))
    skill.completed = !skill.completed
    await skill.save().catch(err => res.send(err))
    res.redirect("/skills")
})


/////////////
// Export Router
/////////////
module.exports = router;