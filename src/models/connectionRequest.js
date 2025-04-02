const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "rejected", "accepted"],
        message: `{VALUES} Invalid Operations`,
      },
    },
  },
  { timestamps: true }
);
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Not allowed to sent request to yourself");
  }
  next();
});
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const Connectionrequest = mongoose.model(
  "Connectionrequest",
  connectionRequestSchema
);

module.exports = Connectionrequest;
