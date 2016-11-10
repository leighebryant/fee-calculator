
// TODO: DEFINE ANY VARIABLES HERE

var buffer = '';
var lastOperator = false;
var lastDecimal = false;
var operator = '';
var total = 0;

// DEFINE YOUR FUNCTIONS HERE



function add(valueOne, valueTwo) {
    valueOne = parseFloat(valueOne);
    valueTwo = parseFloat(valueTwo);
    return valueOne + valueTwo;
}

function divide(valueOne, valueTwo) {
    valueOne = parseFloat(valueOne);
    valueTwo = parseFloat(valueTwo);
    return valueOne / valueTwo;
}

function subtract(valueOne, valueTwo) {
    valueOne = parseFloat(valueOne);
    valueTwo = parseFloat(valueTwo);
    return valueTwo - valueOne;
}

function multiply(valueOne, valueTwo) {
    valueOne = parseFloat(valueOne);
    valueTwo = parseFloat(valueTwo);
    return valueOne * valueTwo;
}



/**
 * 		EDIT ME!
 *
 * This function is called each time a button is clicked. You must decide what
 * to do in each case (most likely call another function).
 *
 * @param  {String} buttonValue   The value of the button that was clicked on, for example "6" or "+"
 */



function handleButtonClick(buttonValue) {

    if (buttonValue === 'clear') {
        buffer = '';
        total = 0;
    } else if (buttonValue === '+' || buttonValue === '/' || buttonValue === 'x' || buttonValue === '-' || buttonValue === '=') {

        switch (buttonValue) {
            case '+':
                if (operator === '+' && total !== 0) {
                    buffer = add(total, buffer);
                    total = buffer;
                }
                total = parseFloat(buffer);
                operator = buttonValue;
                lastOperator = true;
                break;

            case '/':
                if (operator === '/' && total !== 0) {
                    buffer = divide(total, buffer);
                    total = buffer;
                }
                total = parseFloat(buffer);
                operator = buttonValue;
                lastOperator = true;
                break;

            case 'x':
                if (operator === 'x' && total !== 0) {
                    buffer = multiply(total, buffer);
                    total = buffer;
                }
                total = parseFloat(buffer);
                operator = buttonValue;
                lastOperator = true;
                break;

            case '-':
                operator = buttonValue;
                if (buffer === '') {
                    buffer = buttonValue;
                    lastOperator = false;
                } else {
                    if (operator === '-' && total !== 0) {
                        buffer = subtract(buffer, total);
                        total = buffer;
                    }
                    lastOperator = true;
                    total = parseFloat(buffer);
                }
                break;

            case '=':
                if (operator === '+') {
                    buffer = add(total, buffer);
                } else if (operator === '-') {
                    buffer = subtract(buffer, total);
                } else if (operator === 'x') {
                    buffer = multiply(total, buffer);
                } else if (lastOperator === '/') {
                    buffer = divide(total, buffer);
                }
                total = 0;

                break;
        }
    } else {
        if (lastOperator === true) {
            buffer = buttonValue;
            lastOperator = false;
            lastDecimal = false;
        } else if (buttonValue === '.' && lastDecimal === false) {
            buffer += buttonValue;
            lastDecimal = true;
        } else if (buttonValue === '.' && lastDecimal === true) {
            buffer = buffer;
        } else {
            buffer += buttonValue;
            lastDecimal = false;
        }
    }


    updateDisplay(buffer);
}



/** **************************************************************
 * These are our tests. If any of them fail you will see a message
 * in the developer tools "Console" - in which case the assignment
 * will NOT be considered complete!
 *
 *                  DO NOT CHANGE THESE LINES
 ****************************************************************/
/** **************************************************************
 * These are our tests. If any of them fail you will see a message
 * in the developer tools "Console" - in which case the assignment
 * will NOT be considered complete!
 *
 *                  DO NOT CHANGE THESE LINES
 ****************************************************************/
document.querySelector('.run-tests').addEventListener('click', function() {
    console.info('Running tests...');
    var testOutput = document.querySelector('.display figure');
    updateDisplay('');
    try {
        // Addition
        console.assert(add(10, 3) === 13, 'adding 10 and 3 did not result in 13');
        console.assert(add('10', 3) === 13, 'adding "10" and 3 did not result in 13');
        console.assert(add('0', 13) === 13, 'adding "0" and 13 did not result in 13');
        console.assert(add(0, 13) === 13, 'adding 0 and 13 did not result in 13');
        console.assert(add('-20', 10) === -10, 'adding "-20" and 10 did not result in -10');
        // Subtraction
        console.assert(subtract(10, 30) === 20, 'subtracting 10 from 30 did not result in 20');
        console.assert(subtract('10', 30) === 20, 'subtracting "10" from 30 did not result in 20');
        console.assert(subtract('0', 13) === 13, 'subtracting "0" from 13 did not result in 13');
        console.assert(subtract(0, 13) === 13, 'subtracting 0 from 13 did not result in 13');
        console.assert(subtract('-20', 10) === 30, 'subtracting "-20" from 10 did not result in 30');
        // Division
        console.assert(divide(30, 10) === 3, 'dividing 30 by 10 did not result in 3');
        console.assert(divide(30, '10') === 3, 'dividing 30 by "10" did not result in 3');
        console.assert(divide(13, '1') === 13, 'dividing 13 by "1" did not result in 13');
        console.assert(divide(13, 1) === 13, 'dividing 13 by 1 did not result in 13');
        console.assert(divide(0, 13) === 0, 'dividing 0 by 13 did not result in 0');
        console.assert(divide('-2', 10) === -0.2, 'dividing "-2" by 10 did not result in -0.2');
        // Multiplication
        console.assert(multiply(10, 30) === 300, 'multiplying 10 by 30 did not result in 300');
        console.assert(multiply('10', 30) === 300, 'multiplying "10" by 30 did not result in 300');
        console.assert(multiply('0', 13) === 0, 'multiplying "0" by 13 did not result in 0');
        console.assert(multiply(0, 13) === 0, 'multiplying 0 by 13 did not result in 0');
        console.assert(multiply('-2', 10) === -20, 'multiplying "-2" by 10 did not result in -20');
        // Button click handler
        handleButtonClick('1');
        console.assert(testOutput.innerHTML === '1', testOutput.innerHTML, 'pressing `1` did not result in "1" in the display');
        handleButtonClick('3');
        console.assert(testOutput.innerHTML === '13', testOutput.innerHTML, 'pressing `3` did not result in "13" in the display');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '13', testOutput.innerHTML, 'pressing `+` did not result in "13" in the display');
        handleButtonClick('7');
        console.assert(testOutput.innerHTML === '7', testOutput.innerHTML, 'pressing `7` did not result in "7" in the display');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '20', testOutput.innerHTML, 'pressing `+` did not result in "20" in the display');
        handleButtonClick('2');
        console.assert(testOutput.innerHTML === '2', testOutput.innerHTML, 'pressing `2` did not result in "2" in the display');
        handleButtonClick('.');
        console.assert(testOutput.innerHTML === '2.', testOutput.innerHTML, 'pressing `.` did not result in "2." in the display');
        handleButtonClick('7');
        console.assert(testOutput.innerHTML === '2.7', testOutput.innerHTML, 'pressing `7` did not result in "2.7" in the display');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '22.7', testOutput.innerHTML, 'pressing `=` did not result in "22.7" in the display');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '22.7', testOutput.innerHTML, 'pressing `+` did not result in "22.7" in the display');
        handleButtonClick('5');
        console.assert(testOutput.innerHTML === '5', testOutput.innerHTML, 'pressing `5` did not result in "5" in the display');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '27.7', testOutput.innerHTML, 'pressing `=` did not result in "22.7" in the display');
        // Clear
        handleButtonClick('clear');
        console.assert(testOutput.innerHTML === '', testOutput.innerHTML, 'pressing `C` did not clear the display');
        // Second calculation
        handleButtonClick('7');
        handleButtonClick('+');
        handleButtonClick('2');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '9', testOutput.innerHTML, 'pressing `7+2=` after clearing did not result in "9"');
        console.log('All tests have run. (If you see no errors, they all passed!)');
        updateDisplay('');
    } catch (e) {
        console.error('There was a syntax error during the test run:', e);
    }
});
/**
 *      DO NOT CHANGE ANY LINES BELOW HERE!!
 *
 * This event handler will fire for ALL button clicks. You need to decide
 * what to do based on which button was clicked in the handler function
 * defined above.
 */
[].slice.call(document.querySelectorAll('button')).forEach(function(element) {
    element.addEventListener('click', function() {
        handleButtonClick(this.value);
    });
});
var display = document.querySelector('.display figure');

function updateDisplay(text) {
    display.innerText = text;
}
