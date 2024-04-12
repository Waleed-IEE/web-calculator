function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function operate(leftOperand, mathOperator, rightOperand){
    return mathOperator === "+" ? add(leftOperand, rightOperand)
    : mathOperator === "-" ? subtract(leftOperand, rightOperand)
    : mathOperator === "*" || mathOperator === "×" ? multiply(leftOperand, rightOperand)
    : mathOperator === "/" || mathOperator === "÷" ? divide(leftOperand, rightOperand)
    : "INVALID MATH OPERATOR!"
}

let leftOperand = [], mathOperator = "", rightOperand = [];
const display = document.querySelector(".result.container");
const buttons = document.querySelector(".buttons.container");

buttons.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){
        if((typeof +event.target.textContent === "number" && !isNaN(+event.target.textContent)) || event.target.textContent === "."){}
        else if(event.target.textContent === "clear"){
            leftOperand = [];
            mathOperator = "";
            rightOperand = [];
        }
        else if(event.target.textContent === "±"){}
        else if(event.target.textContent === "="){}
        else{}
    }
    if(event.target.textContent !== "="){
        if(leftOperand.length === 0 && mathOperator === "" && rightOperand.length === 0){
            display.textContent = `0`;
        }
        else{
            display.textContent = `${leftOperand.join("")} ${mathOperator} ${rightOperand.join("")}`;
        }
    }

    event.stopPropagation();
});