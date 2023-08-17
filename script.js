let firstnumber = 0;
let secondnumber = 0;
let operator = null;
let displayValue = "0";
let previousOperation = '';
let calculationHistory = [];
let historyWindowOpen = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, number1, number2) {
    let result;
    let calculationString;

    if (operator === "+") {
        result = add(number1, number2);
        calculationString = `${number1} + ${number2} = ${result}`;
    } else if (operator === "-") {
        result = subtract(number1, number2);
        calculationString = `${number1} - ${number2} = ${result}`;
    } else if (operator === "*" || operator === "x") {
        result = multiply(number1, number2);
        calculationString = `${number1} x ${number2} = ${result}`;
    } else if (operator === "/") {
        if (number2 === 0) {
            return "Cannot divide by zero";
        }
        result = divide(number1, number2);
        calculationString = `${number1} / ${number2} = ${result}`;
    }

    result = parseFloat(result.toFixed(8)); // Round to 6 decimal places
    calculationHistory.push(calculationString); // Store the calculation
    return result;
}

const clear = document.getElementById("clear") 
clear.addEventListener("click", function() { // Clear the display text when the AC button is clicked
    firstnumber = 0;
    secondnumber = 0;
    operator = null;
    displayValue = "0";
    document.getElementById("displaytext").textContent = "0";
    document.getElementById("upperdisplaytext").textContent = "0";
})

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    document.getElementById("displaytext").textContent = displayValue;
});

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

function openHistoryWindow() {
    const historyModal = document.getElementById("historyModal");
    const historyContent = document.getElementById("historyContent");

    historyContent.innerHTML = "";

    for (const calculation of calculationHistory) {
        historyContent.innerHTML += `<p>${calculation}</p>`;
    }

    historyModal.style.display = "block";

    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => {
        historyModal.style.display = "none";
    });
}

window.addEventListener('beforeunload', function() {
    historyWindowOpen = false;
});

const historyButton = document.getElementById("history");
historyButton.addEventListener("click", openHistoryWindow);

const toggleSignButton = document.getElementById("togglesign"); // Toggle for Negative/Positive numbers
toggleSignButton.addEventListener("click", function() {
    if (displayValue !== "0") {
        if (displayValue.startsWith("-")) {
            displayValue = displayValue.substring(1);
        } else {
            displayValue = "-" + displayValue;
        }
        document.getElementById("displaytext").textContent = displayValue;
    }
});

document.addEventListener("DOMContentLoaded", function() { // Button sounds
    const buttons = document.querySelectorAll("button");
    const buttonSound = document.getElementById("buttonSound");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            buttonSound.currentTime = 0;
            buttonSound.play();
        });
    });
});