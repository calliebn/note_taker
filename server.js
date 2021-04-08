// File systems & Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 8080;

//Sets up the Express app to handle the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Basic route setup
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
  fs.readFile ("./db/db.json", "utf8", (err, response) => {
    if (err) throw err;
    let allNotes = JSON.parse(response)
    res.json(allNotes)
  })
});

app.post('/api/notes', (req, res) => {
  console.log(req.body)
  console.log(uuidv4())
  const newNote = { ...req.body, id : uuidv4() }
  fs.readFile ("./db/db.json", "utf8", (err, response) => {
    if (err) throw err;
    let allNotes = JSON.parse(response)

    allNotes = [...allNotes, newNote]

    fs.writeFile("./db/db.json", JSON.stringify(allNotes), error => {
      if (error) throw error;
      console.log("Notes created!")
      res.json(allNotes)
    })
  })
})

app.delete('/api/notes/:id', (req,res) => {
  fs.readFile ("./db/db.json", "utf8", (err, response) => {
    if (err) throw err;
    let allNotes = JSON.parse(response)
    let filterNotes = allNotes.filter(note => note.id != req.params.id)
    fs.writeFile("./db/db.json", JSON.stringify(filterNotes), error => {
      if (error) throw error;
      console.log("Note deleted!", req.params.id)
      res.json(filterNotes)
    })
  })
})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
