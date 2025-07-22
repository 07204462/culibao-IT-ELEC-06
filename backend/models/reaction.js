const mongoose = require("mongoose")

const reactionSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["like", "love", "laugh", "angry", "sad"], required: true },
  createdAt: { type: Date, default: Date.now },
})

// Ensure one reaction per user per post
reactionSchema.index({ postId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Reaction", reactionSchema)
