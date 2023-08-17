let firstnumber = 0;
let secondnumber = 0;
let operator = null;
let displayValue = "0";
let previousOperation = '';


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, number1, number2) {
    if (operator === "+") {
        return add(number1, number2);
    } else if (operator === "-") {
        return subtract(number1, number2);
    } else if (operator === "*" || operator === "x") {
        return multiply(number1, number2);
    } else if (operator === "/") {
        if (number2 === 0) {
            return "Cannot divide by zero";
        }
        return divide(number1, number2);
    }
}

document.querySelectorAll(".digits").forEach(button => { // Change the display text when a button is clicked
    button.addEventListener("click", function() {
        const digit = this.textContent;

        if (displayValue === "0" || displayValue === "0.") {
            displayValue = digit;
        } else {
            displayValue += digit;
        }

        document.getElementById("displaytext").textContent = displayValue;
    });
});

const clear = document.getElementById("clear") 
clear.addEventListener("click", function() { // Clear the display text when the AC button is clicked
    firstnumber = 0;
    secondnumber = 0;
    operator = null;
    displayValue = "0";
    document.getElementById("displaytext").textContent = "0";
    document.getElementById("upperdisplaytext").textContent = "";
})

document.querySelectorAll(".operators").forEach(operatorButton => {
    operatorButton.addEventListener("click", function() {
        if (operator !== null) {
            secondnumber = parseFloat(displayValue);
            firstnumber = operate(operator, firstnumber, secondnumber);
            displayValue = String(firstnumber);
            document.getElementById("upperdisplaytext").textContent = previousOperation + " " + secondnumber;
        } else {
            firstnumber = parseFloat(displayValue);
        }
        operator = this.textContent;
        displayValue = "0";
        document.getElementById("displaytext").textContent = "0";
        previousOperation = firstnumber + " " + operator;
    });
});


const equalButton = document.getElementById("equalbutton");
equalButton.addEventListener("click", function() {
    if (operator !== null) {
        secondnumber = parseFloat(displayValue);
        const result = operate(operator, firstnumber, secondnumber);
        
        if (typeof result === "number") {
            displayValue = String(result);
            document.getElementById("displaytext").textContent = displayValue;
        } else {
            displayValue = result;
            document.getElementById("displaytext").textContent = displayValue;
        }
        document.getElementById("upperdisplaytext").textContent = previousOperation + " " + secondnumber;
        operator = null;
        previousOperation = '';
    }
});


const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    document.getElementById("displaytext").textContent = displayValue;
});


