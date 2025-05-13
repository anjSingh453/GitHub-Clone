const fs = require("fs").promises;
const path = require("path");
const {v4: uuidv4} = require("uuid");

async function commitRepo(message){
   // console.log("commit command called");
   const repoPath = path.resolve(process.cwd() , ".hiddenGit");
   const stagedPath = path.join(repoPath , "staging");
   const commitPath = path.join(repoPath , "commits");


   try{
      const commitID = uuidv4();
      const commitDir = path.join(commitPath , commitID);
      await fs.mkdir(commitDir , {recursive: true});

      //copy files from staging to commit
      const files = await fs.readdir(stagedPath);
      for(const file of files){
         await fs.copyFile(path.join(stagedPath , file) , path.join(commitDir , file));
      }
      
      //kab commit kiya hai with data and message
      await fs.writeFile(path.join(commitDir , "commit.json") , JSON.stringify({message , date :new Date().toISOString()}));
      console.log(`Commit ${commitID} created with message : ${message}`);
   }
   catch(err){
      console.error("Error committing files : " , err);
   }
}


module.exports = {commitRepo};