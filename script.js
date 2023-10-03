//https://www.toptal.com/developers/keycode

const output = document.getElementById("output");
const equation = document.getElementById("equation");

const allClearButton = document.querySelector('.btn-all-clear');
const equalButton = document.querySelector('.btn-equal');
const parenthesesButton = document.querySelector('.btn-parentheses');
const deleteButton = document.querySelector('.btn-delete');
const equationButtons = document.querySelectorAll('.equation');

let parenthesesOpened = true;

// FUNCTIONS
function fctClear()
{
    output.textContent = equation.textContent = "0";
    parenthesesOpened = true;
}

function fctDelete()
{
    if (equation.textContent.length === 1) {
        fctClear();
    } else {
        equation.textContent = equation.textContent.slice(0, -1);
    }
}

function fctCalculate() {
    try {
        const result = eval(equation.textContent.replace(/x/g, '*').replace(/÷/g, '/').replace(/,/g, '.'));
        output.textContent = result.toString().replace(/\./g, ',');
    } catch {
        output.textContent = "Error";
    }
}

function fctAdjustEquation(input)
{
    if (equation.textContent == 0) {
        equation.textContent = input;
    } else {
        equation.textContent += input;
    }
}

function fctOnKeyPress(event) 
{
    const key = event.key;
    const code = event.keyCode;
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; 
    const operators = [187, 189, 48, 188, 57];
    let operatorFound = false;
    for(const operator of operators) {
        if (code === operator) {
            operatorFound = true;
        }
    }

    if (key in numbers) {
        fctAdjustEquation(key);
    } else if (key === "Enter") {
        fctCalculate();
    } else if (key === "Escape") {
        fctClear();
    } else if (key === "/") {
        fctAdjustEquation("÷");
    } else if (key === "*") {
        fctAdjustEquation("x");
    } else if (key === "Delete" || event.key === "Backspace") {
        fctDelete();
    } else if (operatorFound) {
        fctAdjustEquation(key);
    }
}

function fctAddToEquation(event) {
    if (event.target.textContent == "( )") {
        if (equation.textContent == "0") {
            equation.textContent = "";  
        }
        equation.textContent += parenthesesOpened ? "(" : ")";
        parenthesesOpened = !parenthesesOpened;
        return;
    } 
    fctAdjustEquation(event.target.textContent);
}

// EVENTS
allClearButton.addEventListener("click", fctClear); // Clear All

deleteButton.addEventListener("click", fctDelete); // Delete

equationButtons.forEach((button) => {
    button.addEventListener("click", fctAddToEquation); // Add to Equation
});

equalButton.addEventListener("click", fctCalculate); // Calculate

document.addEventListener("keydown", fctOnKeyPress); // Handle Keyboard Input