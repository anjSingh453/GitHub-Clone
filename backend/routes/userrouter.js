const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/allUser" , userController.getAllUsers);
userRouter.post("/signup" , userController.signup);
userRouter.post("/login" , userController.login);
userRouter.get("/userProfile" , userController.getAllUsers);
userRouter.put("/updateProfile/:id" , userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id" , userController.deleteUserProfile);

module.exports = userRouter;