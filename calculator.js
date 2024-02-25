let currentOperand = ""
let previousOperand = ""
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

const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll(".calculator-buttons button");

function handleButtonClick(event) {
    const buttonValue = event.target.value;
    const buttonType = event.target.classList;

    if (buttonType.contains('number')) {
        currentOperand += buttonValue; // Accumulate digits
        screen.value = currentOperand; // Update screen with current number
    } else if (buttonType.contains('operator') && buttonValue !== '=') {
        if (previousOperand !== "" && currentOperand !== "" && currentOperator) {
            // If there's a pending operation, execute it
            currentOperand = operate(parseFloat(previousOperand), currentOperator, parseFloat(currentOperand)).toString();
            previousOperand = currentOperand;
            screen.value = currentOperand;
            currentOperand = ""; // Prepare for new operand
        } else if (previousOperand === "" && currentOperand !== "") {
            // First operation
            previousOperand = currentOperand;
            currentOperand = "";
        }
        currentOperator = buttonValue; // Set new operator
    } else if (buttonValue === '=') {
        if (currentOperator && previousOperand !== "" && currentOperand !== "") {
            // Perform calculation
            screen.value = operate(parseFloat(previousOperand), currentOperator, parseFloat(currentOperand)).toString();
            // Reset operands, keep result as previousOperand for chaining calculations
            previousOperand = screen.value;
            currentOperand = "";
            currentOperator = null;
        }
    } else if (buttonValue === 'AC') {
        // Reset everything
        screen.value = '0';
        currentOperand = "";
        previousOperand = "";
        currentOperator = null;
    } else if (buttonValue === '+/-') {
        // Toggle positive/negative
        currentOperand = currentOperand.startsWith("-") ? currentOperand.slice(1) : `-${currentOperand}`;
        screen.value = currentOperand;
    } else if (buttonValue === '%') {
        // Convert to percentage
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        screen.value = currentOperand;
    }
    else if (buttonValue === '.' && !currentOperand.includes('.')) {
        currentOperand += buttonValue;
        screen.value = currentOperand;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);

})