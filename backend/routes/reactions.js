const express = require("express")
const router = express.Router()
const Reaction = require("../models/reaction")
const checkAuth = require("../middleware/check-auth")

// Add or update reaction
router.post("/", checkAuth, async (req, res) => {
  try {
    const { postId, type } = req.body
    const userId = req.userData.userId

    // Check if user already reacted to this post
    const existingReaction = await Reaction.findOne({ postId, userId })

    if (existingReaction) {
      // Update existing reaction
      existingReaction.type = type
      await existingReaction.save()
      res.status(200).json({ message: "Reaction updated", reaction: existingReaction })
    } else {
      // Create new reaction
      const reaction = new Reaction({ postId, userId, type })
      await reaction.save()
      res.status(201).json({ message: "Reaction added", reaction })
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling reaction", error: error.message })
  }
})

// Get reactions for a post
router.get("/:postId", async (req, res) => {
  try {
    const reactions = await Reaction.find({ postId: req.params.postId }).populate("userId", "email")
    res.status(200).json(reactions)
  } catch (error) {
    res.status(500).json({ message: "Error fetching reactions", error: error.message })
  }
})

// Remove reaction
router.delete("/:postId", checkAuth, async (req, res) => {
  try {
    const result = await Reaction.deleteOne({
      postId: req.params.postId,
      userId: req.userData.userId,
    })

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Reaction removed" })
    } else {
      res.status(404).json({ message: "Reaction not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error: error.message })
  }
})

module.exports = router
