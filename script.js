let firstnumber = 0;
let secondnumber = 0;
let operator = null;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

function operate (operator, number1, number2) {
    if (operator === "+") {
        return add(number1, number2)
    }
    else if (operator === "-") {
        return subtract(number1, number2)
    }
    else if (operator === "*") {
        return multiply(number1, number2)
    }
    else if (operator === "/") {
        return divide(number1, number2)
    }
}

let displayValue = "0";

document.querySelectorAll(".digit-buttons").forEach(button => {
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

const clear = document.getElementById("clearbutton")
clear.addEventListener("click", function() {
    firstnumber = 0;
    secondnumber = 0;
    operator = null;
    displayValue = "0";
    document.getElementById("displaytext").textContent = "0";
})