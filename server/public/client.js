console.log('js');

//stretch goal //variable to hold chosen math button values
let mathValue = '';
//stretch goal //array to hold objects of values
let mathArray = [];
//stretch goal //operator check via boolean 
let operatorBoolean = false;

//base mode global variable to hold user chosen math operator
let mathOperator = '';

$(document).ready(onReady);

function onReady(){
    console.log('jQ');
    ///////BASE MODE CODE////////
    //Hey jQ, at equal button, on click, send ajax POST request to server w input object
    $('#equals-button').on('click', postInputs);
    //Hey jQ, when a button of the class operator is clicked, run a function to 
    //capture 'this' (specific button clicked) operator value
    $('.operator').on('click', operatorValue);
    //Hey jQ, when the clear button is clicked, clear input values
    $('#clear-button').on('click', clearInputFields);
    //renders calulation history on page load
    getCalculation(); 

    /////STRETCH GOAL CODE//////////
    $('.real-buttons').on('click', buttonValue);
    $('#real-equal').on('click', postRealInputs);
    $('#real-clear-button').on('click', clear);
    getRealCalculation();

}//end onReady

////////BASE MODE CODE//////////
function clearInputFields(){
    //sets client/browser number input feilds to empty strings, emptying them out
    $('#first-number').val('');
    $('#second-number').val('');
}

//function to capture value of user/browser selected operator
function operatorValue(){
    //assign a variable to capture operator value
    mathOperator = $(this).data('value');
    //must log after variable to actually log mathOperator value
    console.log('operator', mathOperator);
}//end operatorValue

//send input from user/browser to server
function postInputs(){
    console.log('in POST, clicked');
    //get input from user/browser, bundle it up, and...
    let mathSet = {
        firstNumber: Number($('#first-number').val()),
        secondNumber: Number($('#second-number').val()),
        mathOperator: mathOperator,
    }
    //send data to server via POST request at XXXX url with this data
    $.ajax({
        method: 'POST',
        url: '/submitInputs',
        data: mathSet 
    })
        .then(function(response){
            console.log('response', response);
            //call to get calculation total
            getCalculation();
        })
        .catch(function(error){
            console.log('error POST to server', error);
            alert('Something went wrong. Try again later.');
        });
}//end postInputs function

//TODO Write ajax 'GET' response from server
function getCalculation(){
    //get data from server via GET request at XXXX url... 
    $.ajax({
        method: 'GET',
        url: '/submitInputs'
    })
        //returning this data...
        .then(function(response){
            console.log('response', response);
            //and appending current total to the browser
            $('#current-total').empty();
            //prevents error on page load since a response does not yet exist
            if(response.length > 0){
                $('#current-total').append(response[response.length-1].total)
            }
            //call to render/append response/array/history to browser 
            renderHistory(response);
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Cannot get math. Try again later.')
        });
}// end getCalculation 

//renders history to browser
function renderHistory(response){
    $('#calculation-history').empty();
    for(let item of response){
        $('#calculation-history').append(`
            <li>${item.firstNumber} ${item.mathOperator} ${item.secondNumber} 
            = ${item.total}</li>
        `);
    }//end for of loop
}//end render 

/////////STRETCH GOAL CODE//////////////

//TODO eventually the stretch goal clear button should be a delete request...
function clear(){
    $('#real-input-field').empty();
}

//gets values of buttons selected, creates a first number string and operator 
//and pushes them to an array
function buttonValue(){
    //could try assigning numbers and operators different html data-'' to better distriguish between them
    //variable numberValue = $(this).data('realNumber');
    //variable realOperatorValue = $(this).data('realOperator);

    //appends selected button values to the input field on the calculator
    $('#real-input-field').append($(this).data('real'));

    //conditional to check if button pressed is a number or an operator
    if( !($(this).data('real') == ' + ' || $(this).data('real') == ' - ' || 
        $(this).data('real') == ' * ' || $(this).data('real') == ' / ') ){
        //this if section is where the values are numbers
        operatorBoolean = false;
        //concatenates first number values entered prior to an operator 
        //being selected to catpture the first value for the equation
        mathValue += $(this).data('real'); 
        console.log('concatenated', mathValue);
    } else {
        //this is where the values become operators
        operatorBoolean = true;
        //pushing first number value into array
        mathArray.push(mathValue);
        //pushing operator into array
        mathArray.push($(this).data('real'));
        //setting mathValue to an empty string to catch second number value after operator
        mathValue = '';
        console.log('array of button clicks', mathArray);
    }//end operator conditional check
}//end buttonValue

//when equal button is selected, captures second number value, pushes to mathArray, 
//and sends equation array to server 
function postRealInputs(){
    console.log('equal clicked!');
    //conditional checks that last button selected was a number rather than 
    //operator and adds last number item to the array for POST
    if(operatorBoolean === false){
        mathArray.push(mathValue);
    }//end operator check
    //resets mathValue to empty string
    mathValue = '';
    console.log('in POST. req body = ', mathArray);
    // let realMathSet = {
    //     num1:
    //     num2:
    //     realOperator:
    // }
    $.ajax({
        method: 'POST',
        //Can I use the same url from base mode here???
        url: '/submitRealInputs',
        //realMathSet removed from data
        data: {mathArray}
    })
        .then(function(response){
            console.log('response', response);
            //call to get calculation total
            getRealCalculation();
        })
        .catch(function(error){
            console.log('error POST to server', error);
            alert('Something went wrong. Try again later.');
        });
}//end postRealInputs

//GET request to server...
function getRealCalculation(){
    $.ajax({
        method: 'GET',
        url: '/submitRealInputs'
    })
        //returning this data...
        .then(function(response){
            console.log('response', response);
            // //and appending current total to the browser
            // $('#total').empty();
            // //prevents error on page load since a response does not yet exist
            // if(response.length > 0){
            //     $('#total').append(response[response.length-1])
            // }
            //call to render history to browser 
            renderRealHistory(response);
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Cannot get math. Try again later.')
        });
}//end getRealCalculation

//renders history list of calulations to client/browser
function renderRealHistory(response){
    $('#real-calculation-history').empty();
    for(let i = 0; i < response.length; i++){
        $('#real-calculation-history').append(`
            <li>${response[0]} ${response[1]} ${response[2]} 
            = ${response[3]}</li>
        `);
    }//end for of loop
}//end renderRealHistory