const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express()
const path = require("path");
const allNotes = require("./db/db.json");
const fs = require('fs');
const generateUniqueID = require('generate-unique-id');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET allNotes
app.get('/api/notes', function (req, res) {
    res.json(allNotes);
});

// Give ID to each note
function createNewNote(note, allNotesArray = []) {

    const id = generateUniqueID({
        length: 4,
        useLetters: false
    });
    note.id = id;
    allNotesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(allNotes, null, 2)
    );
    return note;
};

// Write new Notes with ID and = save them
app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    const note = createNewNote(newNote, allNotes);
    res.json(note);
});

// select ID to loading and deleting
function selectId(id, allNotesArray) {
    const selectedResult = allNotesArray.filter(note => note.id === id)[0];
    return selectedResult;
}

// DELETE Notes 
app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = allNotes.indexOf(selectId(req.params.id, allNotes));

    if (deleteNote > -1) {
        allNotes.splice(deleteNote, 1);

        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(allNotes, null, 2)
        );
        return res.json(allNotes);
    } else {
        return res.send(404);
    }
});



// Listen Port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});