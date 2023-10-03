var numberButtons = document.querySelectorAll('.number');
var operatorButtons = document.querySelectorAll('.operator');
var equationButtons = document.querySelectorAll('.equation');
var equalButton = document.querySelector('.btn-equal');
var deleteButton = document.querySelector('.btn-delete');
var allClearButton = document.querySelector('.btn-all-clear');
var parenthesesButton = document.querySelector('.btn-parentheses');
var output = document.getElementById("output");
var equation = document.getElementById("equation");

// FUNCTIONS
function fctClear()
{
    output.textContent = "0"; 
    equation.textContent = "0";
}

function fctDelete()
{
    if (equation.textContent.length === 1)
    {
        fctClear(); 
    }
    else
    {
        equation.textContent = equation.textContent.slice(0, -1);
    }
}

var parenthesesOpened = true;

function fctAddToEquation(event) {
    if ((equation.textContent == "0") && !(event.target.textContent == "( )"))
    {
        equation.textContent = event.target.textContent;
    } 
    else if ((event.target.textContent == "( )"))
    {
        if (equation.textContent == "0")
        {
            equation.textContent = "";  
        }
        if (parenthesesOpened) 
        {
            equation.textContent += "(";
        } 
        else 
        {
            equation.textContent += ")";
        }
        parenthesesOpened = !parenthesesOpened;
    }
    else 
    {
        equation.textContent += event.target.textContent;
    } 
}

function fctCalculate() {
    try
    {
        output.textContent = eval(equation.textContent.replace(/x/g, '*').replace(/÷/g, '/').replace(/,/g, '.'));
    }
    catch
    {
        output.textContent = "Error";
    }
}

function fctOnKeyPress(event) {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; 
    if (event.key in keys) {
        if (equation.textContent == 0) 
        {
            equation.textContent = event.key;
        }
        else
        {
            equation.textContent += event.key;
        }
    } 
    else if (event.key === "Enter")
    {
        fctCalculate();
    }
    else if (event.key === "Escape") 
    {
        fctClear();
    } 
    else if (event.key === "/") 
    {
        if (equation.textContent == 0) 
        {
            equation.textContent = "+";
        }
        else
        {
            equation.textContent += "+";
        }
    }
    else if (event.key === "*") 
    {
        if (equation.textContent == 0) 
        {
            equation.textContent = "x";
        }
        else
        {
            equation.textContent += "x";
        }
    }
    else if (event.key === "Delete" || event.key === "Backspace") 
    {
        fctDelete();
    }
    else if (event.keyCode === 187 || event.keyCode === 189 || event.keyCode === 48 || event.keyCode === 188 || event.keyCode === 57)
    {
        if (equation.textContent === "0") {
            equation.textContent = event.key;
        } else {
            equation.textContent += event.key;
        }
    }
}

// EVENTS
allClearButton.addEventListener("click", fctClear); // Clear All

deleteButton.addEventListener("click", fctDelete); // Delete

equationButtons.forEach((button) => {
    button.addEventListener("click", fctAddToEquation); // Add to Equation
});

equalButton.addEventListener("click", fctCalculate); // Calculate

document.addEventListener("keydown", fctOnKeyPress); // Handle Keyboard Input