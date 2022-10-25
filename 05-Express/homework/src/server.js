// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

let id = 1;
// TODO: your code to handle requests
server.post('/posts', (req, res)=>{
    const { author, title, contents } = req.body;
    if(!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }

    const newPost = { id: id++, author, title, contents };
    posts.push(newPost);
    res.status(200).json(newPost);
});

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;

    if(!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para crear el Post"
        })
    }

    const newPost = { id: id++, author, title, contents };
    posts.push(newPost);
    res.status(200).json(newPost);
});

server.get('/posts', (req, res) => {
    const { term } = req.query;

    if(term) {
        const result = posts.filter((post) => {
            return post.title.includes(term) || post.contents.includes(term);
        });
        res.status(200).json(result);
    } else {
        res.status(200).json(posts);
    };
});

server.get('/posts/:author', (req, res) => {
    const { author } = req.params;
    const result = posts.filter((post) => {
        return post.author === author;
    })

    if(result.length) {
        res.status(200).json(result);
    } else {
        res 
            .status(STATUS_USER_ERROR)
            .json({error: 'No existe ningun post del autor indicado'});
    };
});

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;

    const result = posts.filter((post) => {
        return post.author === author && post.title === title;
    })

    if(result.length) {
        res.status(200).json(result);
    } else {
        res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"});
    };
});

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;

    if(!id || !title || ! contents)
        return res.status(STATUS_USER_ERROR).json({
            error: "No se recibieron los parámetros necesarios para modificar el Post"
        });

    const post = posts.find((post) => post.id === parseInt(id));
    
    if(post) {
        post.title = title;
        post.contents = contents;
        res.status(200).json(post);
    } else {
        res.status(STATUS_USER_ERROR).json({
            error: 'No existe el Post con ese ID'
        });
    }
});

server.delete("/posts", (req, res) => {
    const { id } = req.body;

    const post = posts.find((post) => post.id === parseInt(id));

    if (!id || !post) {
        return res.status(STATUS_USER_ERROR).json({error: 'Mensaje de error'});
    }
    
    posts = posts.filter((post) => post.id !== id);

    res.status(200).json({ success: true });
});

server.delete("/author", (req, res) => {
    const { author } = req.body;

    const authorPosts = posts.filter((post) => post.author === author);

    if(!author || !authorPosts.length) {
        return res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe el autor indicado"});
    }

    posts = posts.filter((post) => post.author !== author);

    res.status(200).json(authorPosts);
});

module.exports = { posts, server };
