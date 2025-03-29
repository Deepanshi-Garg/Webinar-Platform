const express = require("express");
const { userSignup, userLogin } = require("../controllers/users.controller.js");

const userRouter = express.Router();

// User Signup
userRouter.post("/signup", userSignup);

// User Login
userRouter.post("/login", userLogin);

module.exports = userRouter;