// Require express - gives us a function
const express = require('express');

// Call function returned above to create an instance of express 
const app = express();

// express can now access our static files
app.use(express.static('server/public'));

//to wrap POST request data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//array to hold history of mathObjects
let calculationHistory = [];

//server side of ajax GET request...
app.get('/submitInputs', (req, res) => {
    console.log('Request array...', calculationHistory);
    //sending the data back to the browser/client
    res.send(calculationHistory);
})

//server side of ajax POST request
app.post('/submitInputs', (req, res) => {
    let mathObject = req.body;
    console.log('Your new calculation is', mathObject);
    //save new inputs object in array 
    calculationHistory.push(mathObject);
    res.sendStatus(201); //201 status means 'I created, added a thing...'
})

//TODO add function to do calculation with inputs from client/mathObject

// Start up our server
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });