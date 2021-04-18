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
    //Hey jQ, at equal button, on click, send ajax POST request to server w input object
    $('#equals-button').on('click', postInputs);
    //Hey jQ, when a button of the class operator is clicked, run a function to 
    //capture 'this' (specific button clicked) operator value
    $('.operator').on('click', operatorValue);
    //Hey jQ, when the clear button is clicked, clear input values
    $('#clear-button').on('click', clearInputFields);
    //renders calulation history on page load
    getCalculation(); 

    /////STRETCH GOALS//////////
    $('.real-buttons').on('click', buttonValue);
    $('#real-equal').on('click', postRealInputs);
    $('#real-clear-button').on('click', clear);

}//end onReady

//TODO eventually the stretch goal clear button should be a delete request...
function clear(){
    $('#real-input-field').empty();
}

//TODO NEED TO GET VALUES OF BUTTON CLICKS, 
//CREATE FIRST NUMBER, 
//BUNDLE WITH OPERATOR AND 
//SECOND NUMBER AND 
//SEND TO SERVER FOR CALCULATION AND STORAGE
function buttonValue(){
    //variable numberValue = $(this).data('realNumber');
    //variable realOperatorValue = $(this).data('realOperator);

    //TODO WRAP MULTIPLE VALUES IN AN OBJECT?? numberOne = '' set to empty string and concatenate (EX. 43.1 is '4' + '3' + '.' + '1')
    //TODO INCLUDE OPERATOR - ACTUAL MATH WIll HAPPEN ON SERVER
    //TODO Include second number of multiple values numberTwo = ''

    // mathValue += $(this).data('real');
    // //conditional to determine if mathValue is a number or operator to create number objects?
    // if(mathValue !== '+' && mathValue !== '-' && mathValue !== '*' && mathValue !== '/'){
    //     //push to own array? or variable to POST?
    //     // mathValue += $(this).data('real');  //add += to concatenate
    //     //console.log('each button clicked', mathValue);
    //     $('#real-input-field').empty();
    //     $('#real-input-field').append(mathValue);
    //     console.log('concatenated', mathValue);
    // } else {
    //     mathArray.push(mathValue);
    //     console.log('array of button clicks', mathArray);
    // }
    
    if( !($(this).data('real') == ' + ' || $(this).data('real') == ' - ' || $(this).data('real') == ' * ' || $(this).data('real') == ' / ') ){
        //this if section is where the number section is
        operatorBoolean = false;
        mathValue += $(this).data('real'); 
        //console.log('each button clicked', mathValue);
        $('#real-input-field').empty();
        $('#real-input-field').append(mathValue);
        console.log('concatenated', mathValue);
    } else {
        //this is where the values will become operators
        operatorBoolean = true;
        mathArray.push(mathValue);
        $('#real-input-field').empty();
        $('#real-input-field').append(mathValue);
        mathArray.push($(this).data('real'));
        mathValue = '';
        console.log('array of button clicks', mathArray);
    }//end operator conditional check
}//end buttonValue

//TODO POST
function postRealInputs(){
    console.log('equal clicked!');
    if(operatorBoolean === false){
        mathArray.push(mathValue);
    }//end operator check
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
            //getRealCalculation();
        })
        .catch(function(error){
            console.log('error POST to server', error);
            alert('Something went wrong. Try again later.');
        });
}//end postRealInputs

//TODO GET
function getRealCalculation(){
    // $.ajax({
    //     method: 'GET',
    //     // Can I use this url agian???
    //     url: '/submitRealInputs'
    // })
    //     //returning this data...
    //     .then(function(response){
    //         console.log('response', response);
    //         //and appending current total to the browser
    //         $('#total').empty();
    //         //prevents error on page load since a response does not yet exist
    //         if(response.length > 0){
    //             $('#total').append(response[response.length-1].total)
    //         }
    //         //call to render/append response/array/history to browser 
    //         //renderRealHistory(response);
    //     })
    //     .catch(function(error){
    //         console.log('Error from server', error);
    //         alert('Cannot get math. Try again later.')
    //     });
}//end getRealCalculation

//TODO RENDER
// function renderRealHistory(response){
    // $('#real-calculation-history').empty();
    // for(let item of response){
    //     $('#real-calculation-history').append(`
    //         <li>${item.num1} ${item.realOperator} ${item.num2} 
    //         = ${item.realTotal}</li>
    //     `);
    // }//end for of loop
// }//end renderRealHistory

////////BASE MODE CODE//////////
function clearInputFields(){
    //sets client/browser number input feilds to empty strings, emptying them out
    $('#first-number').val('');
    $('#second-number').val('');
    //$('#current-total').empty('');
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