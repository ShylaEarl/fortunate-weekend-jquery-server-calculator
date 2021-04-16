// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();

// express can access our static public folder
app.use(express.static('server/public'));

// //to wrap POST request data
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));

// // //TODO rename array 
// const trains = [
//         { name: 'Thomas', color: 'Blue' },
//         { name: 'Gordon', color: 'Blue' },
//         { name: 'Henry', color: 'Green' },
//         { name: 'James', color: 'Red' }
//     ];

// // //TODO rename route and change array to new name
// //server side of ajax GET request 
// app.get('/trains', (req, res) => {
//     console.log('Request array...', trains);

//     //send the data back to the browser/client
//     res.send(trains); //trains array
// })

// //TODO rename route, array, and 'newObject'
// //server side of ajax POST request
// app.post('/XXXX', (req, res) => {
//     let newObject = req.body;
//     console.log('Your new calculation is', newObject);
//     //save new quote in array to be able to add it to the DOM
//     XXXXArray.push(newObject);
//     res.sendStatus(201); //201 status means 'I created, added a thing...'
// })

// Start up our server
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });