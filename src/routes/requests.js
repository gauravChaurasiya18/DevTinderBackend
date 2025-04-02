const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const Connectionrequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    console.log(req.user._id);

    try {
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const fromUserId = req.user._id;
      const allowedStatus = ["interested", "ignored"];
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User Not Found ");
      }
      // if (fromUserId === toUserId){
      //    throw new Error ("Not allowed to sent ")
      // }
      if (!allowedStatus.includes(status)) {
        return res.status(404).json({
          message: "Invalid Status Type: " + status,
        });
      }
      const existingConnectionRequest = await Connectionrequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection Request Already Exist ");
      }
      const Connection = new Connectionrequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await Connection.save();
      res.json({
        message:
          req.user.firstName + " is " + status + "  in " + toUser.firstName,
        data,
      });
    } catch (err) {
      console.error("Error:", err);
      res
        .status(404)
        .json({ message: "Oops! Error Occurred", error: err.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Error Occured !" + status);
      }
      const connectionRequest = await Connectionrequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("Error Occured !!");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(404).send("Error Occured !!");
    }
  }
);

module.exports = requestRouter;
