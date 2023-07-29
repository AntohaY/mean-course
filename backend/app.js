const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { 
            id: 'asdf21312', 
            title: 'First server-side post', 
            content: 'This is coming from the server'
        },
        { 
            id: 'asdfkljae89', 
            title: 'Second server-side post', 
            content: 'This is coming from the server'
        },
        { 
            id: 'ipvbnmklgj0', 
            title: 'Third server-side post', 
            content: 'This is coming from the server'
        },
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: posts
    });
});

module.exports = app;