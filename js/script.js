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
    mathOperator === "+" ? add(leftOperand, rightOperand)
    : mathOperator === "-" ? subtract(leftOperand, rightOperand)
    : mathOperator === "*" ? multiply(leftOperand, rightOperand)
    : mathOperator === "/" ? divide(leftOperand, rightOperand)
    : "ERROR"
}

let leftOperand, mathOperator, rightOperand;
console.log(operate(5,"+",5));