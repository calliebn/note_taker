// File systems & Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

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

app.get('/api/notes', (req, res) => res.json(getNotes));

app.post('/api/notes', (req, res) => {
  console.log(req.body)
  const newNote = req.body;


})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
