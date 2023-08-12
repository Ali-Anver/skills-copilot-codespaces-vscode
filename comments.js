// Create web server for comment

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Comment data
let data = [];

// Read data from file
fs.readFile('data/comment.json', 'utf8', (err, fileData) => {
    data = JSON.parse(fileData);
});

// Write data to file
const saveData = () => {
    fs.writeFile('data/comment.json', JSON.stringify(data), 'utf8', () => {
        console.log('Data saved');
    });
}

// Get comment list
app.get('/api/comment', (req, res) => {
    res.send(data);
});

// Add new comment
app.post('/api/comment', (req, res) => {
    const newComment = {
        id: data.length + 1,
        content: req.body.content,
