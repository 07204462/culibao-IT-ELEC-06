const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")
const reactionRoutes = require("./routes/reactions")
const commentRoutes = require("./routes/comments")
const Post = require("./models/post")
const path = require("path")

mongoose
  .connect("mongodb+srv://kyle:123@post.i2qrs.mongodb.net/?retryWrites=true&w=majority&appName=Post")
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed!")
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next()
})

app.use("/api/posts", postsRoutes)
app.use("/api/user", userRoutes)
app.use("/api/reactions", reactionRoutes)
app.use("/api/comments", commentRoutes)
app.use("/images", express.static(path.join("backend/images")))

module.exports = app
