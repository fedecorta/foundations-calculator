let currentOperand = 0
let previousOperand = 0
let currentOperator = null

function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
  }

function divide(a, b) {
    if (b === 0) {
      return NaN;
    }
    return a / b;
  }

function operate (a,operator,b) {
    switch (operator) {
        case "+": 
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            console.error("Invalid operator");
            return null;
    }

}

const screen = document.querySelector('.calculator-screen input');

const buttons = document.querySelectorAll(".calculator-buttons button");

function handleButtonClick(event) {
    const buttonValue = event.target.value; // Gets the 'value' attribute of the clicked button
    const buttonType = event.target.classList; // Access the classes of the button

    // Regular expression to check for any operator at the end of the screen's value
    const endsWithOperator = /[\+\-\*\/] $/.test(screen.value.trim());

    // Handle number and operator buttons
    if (buttonType.contains('number')) {
        screen.value += buttonValue;
        currentOperand += buttonValue;
    } else if (buttonType.contains('operator')) {
        if (!endsWithOperator && screen.value !== "") {
            // Ensure no consecutive operators by checking against the regex
            screen.value += ` ${buttonValue} `;
        }
    } else if (buttonValue === 'AC') {
        // Clear the screen
        screen.value = '';
        currentOperand = '';
        previousOperand = '';
        currentOperator = null;
    } else if (buttonValue === '=') {
        // Perform calculation
        calculateResult();
    } else if (buttonValue === '+/-') {
        if (screen.value) {
            screen.value = screen.value.includes("-") ? screen.value.replace("-", "") : "-" + screen.value;
        }
    } else if (buttonValue === '%') {
        let currentValue = parseFloat(screen.value);
        if (!isNaN(currentValue)) {
            screen.value = currentValue / 100;
        }
    }
    // Additional functionalities like '+/-' and '%' can be added here
}

buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);

})