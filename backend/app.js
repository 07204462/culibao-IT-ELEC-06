
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");

    next();
})

app.use('/api/posts',(req, res, next) => {
    const posts = 
        [{
            id: "adad",
            title: "first tit;e server",
            content: "first content"
        },
        {
            id: "adad",
            title: "second tit;e server",
            content: "second content"
        }
    ];
    

    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
    });
})

module.exports = app;