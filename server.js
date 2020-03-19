// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const uniqid = require('uniqid');
const fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// =============================================================

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    // should read the db.json file
    // console.log(db)
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    // should receive a new note to save to the request body, add to db.json and return to the client 
    
    var newNote = req.body;
    var newID = uniqid();

    newNote.id = newID;
    
    db.push(newNote);

    res.json(newNote);

    fs.writeFileSync(db,res.json(db))

    return res.json(db);
});

app.delete("/api/notes/:id", function(req, res) {
    // should delete the notes based on their id 

    // let notesData = fs.readFileSync(db);

    const db = fs.readFileSync(path.join(__dirname, "/db/db.json"));
    const dbFile = JSON.parse(db);

    var chose = req.params.id;

    var deleteNote = db.filter(data => {
        data.id != chose;
    });

    // for (let x = 0; x < dbFile.length; x++) {
    //     if (dbFile[x].id.toString() === chose) {
    //       dbFile.splice(x, 1);
    //       break;
    //     }
    //   }

    console.log(deleteNote)

    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(dbFile));
    res.sendFile(path.join(__dirname, "/db/db.json"));
    
    // fs.writeFileSync(db, res.json(db));
    
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// LISTENER
// The below code effectively "starts" our server
// ==============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });