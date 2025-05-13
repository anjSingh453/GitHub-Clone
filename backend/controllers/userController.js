const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient, ReturnDocument } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URL;



let client;

async function connectionClient(){
    if(!client){
        client = new MongoClient(uri ,{useNewUrlParser :true , useUnifiedTopology:true,});
    }
    await client.connect();
}


async function signup (req , res) {
    const {username , password , email} = req.body;

    try{
       await connectionClient();
       const db = client.db("githubclone");
       const usersCollection = db.collection("users");
       
       const user = await usersCollection.findOne({username});
       if(user){
        return res.status(400).json({message:"User already exit!"});
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password , salt);

       const newUser={
        username,
        password:hashedPassword,
        email,
        repositories:[],
        followedUsers:[],
        starRepos:[]
       }

       const result = await usersCollection.insertOne(newUser);

       const token= jwt.sign({id:result.insertId} , process.env.JWT_SECRET_KEY , {expiresIn:"120h"});
       res.json({token , userId:result.insertId});
    }
    catch(err){
      console.error("Error during signup : " , err.message);
      res.status(500).send("Server Error");
    }
}


async function login (req , res) {
    // res.send("logging in");
    const {email , password} = req.body;

    try{
       await connectionClient();
       const db = client.db("githubclone");
       const usersCollection = db.collection("users");

       const user = await usersCollection.findOne({email});
       if(!user){
        return res.status(400).jsom({message:"Invaild credential"});
       }

       const isMatch = await bcrypt.compare(password , user.password);
       if(!isMatch){
        return res.status(400).jsom({message:"Invaild credential"});
       }

       const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY ,{expiresIn:"120h"});
       res.json({token , userId:user._id});
    }
    catch(error){
       console.error("Error during login : " , error.message);
       res.status(500).send("Server Error!");
    }

}


async function getAllUsers (req , res){
    // res.send("All users fetched!");

    try{
        await connectionClient();
       const db = client.db("githubclone");
       const usersCollection = db.collection("users");
       
       const users = await usersCollection.find({}).toArray();
       res.json(users);

    }
    catch(err){
        console.error("Error during fetching : " , err.message);
       res.status(500).send("Server Error!");
    }
};



async function getUserProfile (req , res){
    // res.send("Profile fetched");

    const currentID = req.params.id;

  try {
    await  connectionClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).send("Server error!");
  }

}

async function updateUserProfile (req , res){
    // res.send("Profile updated");

    const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectionClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteUserProfile (req , res){
    // res.send("Profile deleted");

    const currentID = req.params.id;

     try{
        await connectionClient();
       const db = client.db("githubclone");
       const usersCollection = db.collection("users");
       
       const result = await usersCollection.deleteOne({
        _id: new ObjectId(currentID),
       })

       if(result.deleteCount == 0){
        return res.status(404).json({message:"User not found!"});
       }

       res.json({message:"User Proflie Deleted!"});
    }
    catch(err){
       console.error("Error during deletion : " , err.message);
       res.status(500).send("Server Error!");
    }
}

module.exports ={  signup , login , getAllUsers , getUserProfile,updateUserProfile ,deleteUserProfile};
