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
    let eventTextContent = event.target.textContent;
    let eventTagName = event.target.tagName;

    if(eventTagName === "BUTTON"){
        let isNumber = typeof +eventTextContent === "number" && !isNaN(+eventTextContent);

        if(isNumber || eventTextContent === "."){
            let isLeftOperand = mathOperator === "";
            let currentOperand = isLeftOperand ? leftOperand : rightOperand;

            let isClickedPointAndValid = eventTextContent === "." && !currentOperand.includes(".") && currentOperand.length !== 0;
            let isClickedZeroAndValid = eventTextContent === "0" && (currentOperand.includes(".") || currentOperand[0] !== "0");
            let isClickedNumberAndValid = eventTextContent !== "0" && isNumber;

            if(isClickedPointAndValid || isClickedZeroAndValid || isClickedNumberAndValid){
                currentOperand.push(eventTextContent);
            }

        }
        else if(eventTextContent === "clear"){
            leftOperand = [];
            mathOperator = "";
            rightOperand = [];
        }
        else if(eventTextContent === "±"){}
        else if(eventTextContent === "="){
            let isValidOperation = !(leftOperand.length === 0 || mathOperator === "" || rightOperand.length === 0);

            if(isValidOperation){
                let result;
                let joinedLeftOperand = +leftOperand.join("");
                let joinedRightOperand = +rightOperand.join("");

                if(joinedLeftOperand % 1 !== 0 || joinedRightOperand % 1 !== 0){
                    result = operate(joinedLeftOperand, mathOperator, joinedRightOperand).toFixed(2);
                }
                else{
                    result = operate(joinedLeftOperand, mathOperator, joinedRightOperand);
                }
                display.textContent = `${result}`;
            }
        }
        else if(leftOperand.length !== 0){
            mathOperator = eventTextContent;
        }
    }
    if(eventTextContent !== "="){
        let isCalculationVariablesReset = leftOperand.length === 0 && mathOperator === "" && rightOperand.length === 0;

        if (isCalculationVariablesReset){
            display.textContent = `Click the buttons below to start calculating...`;
        }
        else if (leftOperand.length !== 0){
            display.textContent = `${leftOperand.join("")} ${mathOperator} ${rightOperand.join("")}`;
        }
    }
    console.log(`L: ${leftOperand.join("")} M: ${mathOperator} R: ${rightOperand.join("")}`)

    event.stopPropagation();
});