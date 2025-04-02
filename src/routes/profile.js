const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  console.log("Received Request Body:", req.body);
  const loggedInUser = req.user;
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Not allowed to change the field");
    }

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} your profile has been updated `);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  try {
    const userFoundOrNot = await User.findOne({ emailId: req.body.emailId });
    if (!userFoundOrNot) {
      throw new Error("Invalid operations");
    }
    userFoundOrNot.password = await bcrypt.hash(req.body.password, 10);
    await userFoundOrNot.save();
    res.send("Password Updated Successfully !! ");
  } catch (err) {
    res.status(404).send("Invalid Credentials");
  }
});

module.exports = profileRouter;
