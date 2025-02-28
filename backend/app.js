
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader("Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS")

    next();
})

app.post("/api/posts", (req, res, next) =>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
})

app.get('/api/posts',(req, res, next) => {
    const posts = 
        [{
            id: "abracadabra",
            title: "first title server",
            content: "first content"
        },
        {
            id: "abracadabra",
            title: "second title server",
            content: "second content"
        }
    ];
    

    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
    });
})

module.exports = app;