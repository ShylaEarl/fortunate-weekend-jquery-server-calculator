console.log('js');

$(document).ready(onReady);

function onReady(){
    console.log('jQ');
    //Hey jQ, at equal button, on click, send ajax POST request to server w input object
    $('#equalsButton').on('click', postInputs);

}//end onReady

function postInputs(){
    console.log('in POST, clicked');
    //get number data from user/DOM
    // let firstNumber = Number($('#first-number').val());
    // let secondNumber = Number($('#second-number').val());
    // // OR...
    //get input from user/DOM, bundle it up, and...
    let mathSet = {
        firstNumber: Number($('#first-number').val()),
        secondNumber: Number($('#second-number').val()),
        //mathOperator: $('.operators') //work on operators...
    }
    //send data to server via POST request
    $.ajax({
        method: 'POST',
        url: '/submitInputs',
        data: mathSet //you could add object here too if you wanted
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