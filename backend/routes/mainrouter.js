const express = require("express");
const userRouter = require("./userrouter");
const repoRouter = require("./reporouter");
const issueRouter = require("./issuerouter");

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

mainRouter.get("/" , (req , res)=>{
    res.send("Welcome!");
});

module.exports = mainRouter;