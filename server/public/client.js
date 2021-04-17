console.log('js');

//global variable to hold user chosen math operator
let mathOperator = '';

$(document).ready(onReady);

function onReady(){
    console.log('jQ');
    //Hey jQ, at equal button, on click, send ajax POST request to server w input object
    $('#equals-button').on('click', postInputs);
    $('.operator').on('click', operatorValue);

}//end onReady

//function to capture value of user/DOM selected operator
function operatorValue(){
    //assign a variable to capture operator value
    mathOperator = $(this).data('value');
    //must log after variable to actually log mathOperator value
    console.log('operator', mathOperator);
}//end operatorValue

//send input from user/DOM to server
function postInputs(){
    console.log('in POST, clicked');
    //get input from user/DOM, bundle it up, and...
    let mathSet = {
        firstNumber: Number($('#first-number').val()),
        secondNumber: Number($('#second-number').val()),
        mathOperator: mathOperator
    }
    //send data to server via POST request
    $.ajax({
        method: 'POST',
        url: '/submitInputs',
        data: mathSet 
    })
        .then(function(response){
            console.log('response', response);
            //call function to get calculation total
        })
        .catch(function(error){
            console.log('error POST to server', error);
            alert('Something went wrong. Try again later.');
        });
}//end postInputs function