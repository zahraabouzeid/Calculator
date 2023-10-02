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


// EVENTS
allClearButton.addEventListener("click", fctClear); // Clear All

deleteButton.addEventListener("click", fctDelete); // Delete

equationButtons.forEach((button) => {
    button.addEventListener("click", fctAddToEquation); // Add to Equation
});

equalButton.addEventListener("click", fctCalculate); // Calculate