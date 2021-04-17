console.log('js');

//global variable to hold user chosen math operator
let mathOperator = '';

$(document).ready(onReady);

function onReady(){
    console.log('jQ');
    //Hey jQ, at equal button, on click, send ajax POST request to server w input object
    $('#equals-button').on('click', postInputs);
    //Hey jQ, when a button of the class operator is clicked, run a function to 
    //capture 'this' (specific button clicked) operator value
    $('.operator').on('click', operatorValue);
    //Hey jQ, when the clear button is clicked, clear input values
    $('#clear-button').on('click', clearInputFields);

}//end onReady

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

//send input from user/DOM to server
function postInputs(){
    console.log('in POST, clicked');
    //get input from user/browser, bundle it up, and...
    let mathSet = {
        firstNumber: Number($('#first-number').val()),
        secondNumber: Number($('#second-number').val()),
        mathOperator: mathOperator
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
            //renderHistory(response);
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Cannot get math. Try again later.')
        });
}// end getCalculation 

//TODO render