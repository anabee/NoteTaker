// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var db = require("./db/db.json");

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
    console.log(db)
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    // should receive a new note to save to the request body, add to db.json and return to the client 
    // console.log(res);
    var newNote = req.body;

    db.push(newNote);

    res.json(newNote);

    return res.json(db);
});

app.get("/api/notes/:id", function(req, res) {
    // should delete the notes based on their id 
    var chose = req.params.id;

    
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