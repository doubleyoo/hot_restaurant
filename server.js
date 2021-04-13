// Dependencies
const express = require('express');
const path = require('path');

const reserve = require('./reserve');
const table = require('./table');

// Sets up the Express App
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// Reserved tables will be here
 

// Wait List tables will be here
const waitListTables = [];

// const tableOne =
// {
//   customerName: 'Yoda',
//   phoneNumber: 9,
//   email: 'hjkjhk',
//   id: '2df',
// };
const tables = [];
// Routes


// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/table', (req, res) => res.sendFile(path.join(__dirname, 'table.html')));

// Displays tables
app.get('/api/reserve', (req, res) => res.json(tables));
// Display tables in the waiting list
app.get('/api/table', (req, res) => res.json(waitListTables));


// Create New Table - takes in JSON input
app.post('/api/reserve', (req, res) => {
  const newTable = req.body;
  if (tables.length < 5) {
    tables.push(newTable);    
  }
  else {waitListTables.push(newTable);
  }
  res.json(newTable);
});

// Create Wait List Table - takes in JSON input
app.post('/api/table', (req, res) => {
  const listTable = req.body;
  waitListTables.push(listTable);
  res.json(listTable);
  
});



// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));