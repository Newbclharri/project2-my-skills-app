///////////////
// Dependencies
/////////////////
const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const Journal = require("../models/Journal")
//////////////////
// Routes
/////////////////

//root / debug route
router.get("/", (req,res) =>{
    res.status(404).redirect("/skills");
})

//index
router.get("/skills", async (req, res) =>{
    const skills = await Skill.find({}).catch(err => res.send(err));
    const entries = await Journal.find({}).catch(err => res.send(err))
    res.render("index.ejs",{
        skills: skills, 
        entries: entries});
})

//create

router.post("/journal", async (req, res) =>{
    const skill = req.body.skill;
    const entry = req.body.entry;
    await Journal.create({
        title: skill,
        text: entry,
        edited: false
    }).catch(err => res.send(err))
    res.redirect("/skills")
})

router.post("/skill", async (req, res) =>{
    const skill = req.body.skill;
    const resource = req.body.resource || "https://www.google.com/"
    await Skill.create({
        text: skill,
        resource: resource,
        completed: false
    }).catch(err=> res.send(err))

    res.redirect("/skills")
})


//show
router.get("/skill/:id", async (req, res) =>{

    const id = req.params.id;
    const skill = await Skill.findById(id).catch(err => res.send(err))
    const entries = await Journal.find({title: skill.text}).catch(err => res.send(err))

    res.render("show.ejs", {
        skill: skill,
        entries: entries})
})

//update
router.put("/edit/:id", async (req, res) =>{
    const skillId =req.params.id;
    const skill = req.body.skill
    const resource = req.body.resource
    const entryIds = req.body.entryIds
    const allEntryBodies = req.body.text; //an array of text.  form body key title should be changed to reflect a list
    await Skill.findByIdAndUpdate(skillId,{text: skill, resource: resource}).catch(err => res.send(err))
    for(i = 0; i < entryIds.length; i++){
        let entry = await Journal.findByIdAndUpdate(entryIds[i], {title: skill, text: allEntryBodies[i], edited: true})
    }
    res.redirect("/skills")
    // res.json(req.body)
})

//checkbox update
router.put("/:id", async (req, res)=>{
    const id = req.params.id
    // const status = !!req.body.checked
    const skill = await Skill.findById(id).catch(err => res.send(err))
    skill.completed = !skill.completed
    await skill.save().catch(err => res.send(err))
    res.redirect("/skills")
})

//delete
router.delete("/entry/:id", async (req, res)=>{
    const id = req.params.id;
    await Journal.findByIdAndDelete(id).catch(err => res.send(err))
    res.redirect("/skills");
})
router.delete("/:id", async (req, res) =>{
    const id = req.params.id
    await Skill.findByIdAndDelete(id).catch(err => res.send(err))
    res.redirect("/skills");
})



// function editEntries(entryIds, entries){
//     for(i = 0; i < entryIds.length; i++){
//         await
//     }
// }


/////////////
// Export Router
/////////////
module.exports = router;