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

//server side of ajax POST request
app.post('/submitInputs', (req, res) => {
    console.log('new req.body', req.body);
    //variable to hold request object from client/browser
    let mathObject = req.body;
    console.log('the new math object is,', mathObject);
    //assinging new property to request object/mathObject to hold calculation total 
    //by calling calculation function with current mathObject
    mathObject.total = calculate(mathObject);
    //save new inputs object in array 
    calculationHistory.push(mathObject);
    res.sendStatus(201); //201 status means 'I created, added a thing...'
})

//function to calculate inputs from client/mathObject
function calculate(mathObject){
    //variables to hold input numbers from user/client
    let firstNumber = mathObject.firstNumber;
    let secondNumber = mathObject.secondNumber;
    //switch case uses current operator to do calculation
    switch (mathObject.mathOperator){
        case '+':
            total = firstNumber + secondNumber;
            return total;
        case '-':
            total = firstNumber - secondNumber;
            return total;
        case '*':
            total = firstNumber * secondNumber;
            return total;
        case '/':
            total = firstNumber / secondNumber;
            return total;
    }//end switch case
}//end calculate function

//server side of ajax GET request...
app.get('/submitInputs', (req, res) => {
    console.log('Request array...', calculationHistory);
    //sending the data back to the browser/client
    res.send(calculationHistory);
})

// Start up our server
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });