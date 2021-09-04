const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express()
const path = require("path");
const allNotes = require("./db/db.json");
const fs = require('fs');

// TESTING-----------------------------------------------------------------------------------------------------------------------------
const generateUniqueID = require('generate-unique-id');
// TESTING-----------------------------------------------------------------------------------------------------------------------------

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});







// function NewNoteId(allNotes, ) = [] {

// }
// function addedNote ()
// 'list-group-item'


app.get('/api/notes', function (req, res) {
    res.json(allNotes);
});




// TESTING HOW TO GET/GIVE ID TO NEW NOTES ------------------------------------------------------------



function createNewNote(note, allNotesArray = []) {

    const id = generateUniqueID({
        length: 4,
        useLetters: false
    });

    note.id = id;
    allNotesArray.push(note);

    // let newNote = req.body;

    // allNotes.push(newNote);

    
    
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ allNotes}, null, 2)
    );
    return note;
};


app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    // set id based on what the next index of the array will be
    // newNote.id = allNotes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    // if (!validateAnimal(newNote)) {
    //     res.status(400).send("The Note is not properly formatted.");
    // } else {
        const note = createNewNote(newNote, allNotes);
        res.json(note);
    // }
});


// FINISH TESTING GET/GIVE ID TO NEW NOTES------------------------------------------------------------------------------------




// app.post('/api/notes', function (req, res) {

//     let newNote = req.body;

//     console.log(newNote);
//     // console.log(allNotes);
//     allNotes.push(newNote);
//     // console.log(allNotes);

//     fs.writeFile('./db/db.json', JSON.stringify(allNotes), () => {
//         res.json(allNotes)
//     })
// });













// app.delete('api/notes', function(req, res) {
//     res
// })


// removing and updating



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});