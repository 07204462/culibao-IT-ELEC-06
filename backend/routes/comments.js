const express = require("express")
const router = express.Router()
const Comment = require("../models/comment")
const checkAuth = require("../middleware/check-auth")

// Add comment
router.post("/", checkAuth, async (req, res) => {
  try {
    const { postId, content } = req.body
    const userId = req.userData.userId

    const comment = new Comment({ postId, userId, content })
    await comment.save()

    const populatedComment = await Comment.findById(comment._id).populate("userId", "email")

    res.status(201).json({
      message: "Comment added",
      comment: populatedComment,
    })
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message })
  }
})

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "email")
      .sort({ createdAt: -1 })
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message })
  }
})

// Delete comment
router.delete("/:commentId", checkAuth, async (req, res) => {
  try {
    const result = await Comment.deleteOne({
      _id: req.params.commentId,
      userId: req.userData.userId,
    })

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Comment deleted" })
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message })
  }
})

module.exports = router
