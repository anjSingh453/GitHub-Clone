const mongoose = require("mongoose");
const Issue = require("../models/issueModel");

// async function createIssue(req , res){
//     // res.send("issue created!");
//     const {title , description} = req.body;
//     const {id} = req.params;

//     try{
//         const issue= new Issue({
//         title,
//         description,
//         repository:id,
//     });
//     await issue.save();
//     res.status(201).json(issue);

//     }
//     catch(err){
//         console.error("Error during issue creation :" , err.message);
//         res.status(500).send("server error!");

//     }
// }

async function createIssue(req, res) {
    const { title, description, repositoryId } = req.body;  // repositoryId from the body

    try {
        const issue = new Issue({
            title,
            description,
            repository: repositoryId,  // use repositoryId from body
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.error("Error during issue creation:", err.message);
        res.status(500).send("Server error!");
    }
}


async function updateIssueById(req , res){
    // res.send("issue updated!");
    const {id} = req.params;
    const{title , description , status} =req.body;

     try{
       const issue = await Issue.findById(id);
       if(!issue){
        return res.status(404).json({error:"Issue not Found!"});
       }
       issue.title =title;
       issue.description = description;
       issue.status = status;

       await issue.save();
       res.json(issue , {message : "Issue updated"});
    }
    catch(err){
        console.error("Error during issue updation :" , err.message);
        res.status(500).send("server error!");

    }
}

async function deleteIssueById(req , res){
    // res.send(" issue delted !");
    const {id} = req.params;
    try{
       const issue = Issue.findByIdAndDelete(id);
       if(!issue){
        return res.status(404).json({error:"Issue not Found!"});
       }
        res.json({message : "Issue is deleted"});
    }
    catch(err){
        console.error("Error during issue deletion:" , err.message);
        res.status(500).send("server error!");

    }
}

async function getAllIssue(req , res){
    // res.send(" all issue is fetched!");
    const {id} = req.params;
    try{
        const issue = await Issue.find({repository:id});
        if(!issue){
            return res.status(404).json({error:"Issue not Found!"});
        }
        res.status(200).json(issue);
    }
    catch(err){
        console.error("Error during issue fetching :" , err.message);
        res.status(500).send("server error!");

    }
}

async function getIssueById(req , res){
    // res.send(" issue detailed fetched!");
    const {id} = req.params;
    try{
        const issue = await Issue.findById(id);
        if(!issue){
            return res.status(404).json({error:"Issue not Found!"});
        }
        res.json(issue);
    }
    catch(err){
        console.error("Error during fetching issue:" , err.message);
        res.status(500).send("server error!");

    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssue,
    getIssueById,
};
