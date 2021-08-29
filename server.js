const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express()
const path = require("path");
const allNotes = require("./db/db.json");
const fs = require('fs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    res.json(allNotes);
});

app.post('/api/notes', function(req, res) {

    console.log(req.body);
    console.log(allNotes);
    allNotes.push(req.body);
    console.log(allNotes);
    
    fs.writeFile('./db/db.json', JSON.stringify(allNotes) , () => {
        res.json(allNotes)
    })
});


// removing and updating



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});