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
let result = "Empty";
let leftOperandSign = "", rightOperandSign = "";

buttons.addEventListener("click", (event) => {
    let eventTextContent = event.target.textContent;
    let eventTagName = event.target.tagName;

    if(eventTagName === "BUTTON"){
        let isNumber = typeof +eventTextContent === "number" && !isNaN(+eventTextContent);

        if(isNumber || eventTextContent === "."){
            let isLeftOperand = mathOperator === "";
            let currentOperand = isLeftOperand ? leftOperand : rightOperand;

            let isTheClickedDotValid = eventTextContent === "." && !currentOperand.includes(".") && currentOperand.length !== 0;
            let isTheClickedZeroValid = eventTextContent === "0" && (currentOperand.includes(".") || currentOperand[0] !== "0");
            let isTheClickedNotZeroNumberValid = eventTextContent !== "0" && isNumber;

            if(isTheClickedNotZeroNumberValid && currentOperand.length === 1 && currentOperand[0] === "0"){
                currentOperand[0] = eventTextContent;
            }
            else if(isTheClickedDotValid || isTheClickedZeroValid || isTheClickedNotZeroNumberValid){
                currentOperand.push(eventTextContent);
            }
        }
        else if(eventTextContent === "clear"){
            leftOperand = [];
            mathOperator = "";
            rightOperand = [];
            leftOperandSign = "";
            rightOperandSign = "";
            result = "Empty";
        }
        else if (eventTextContent === "⌫"){
            if(rightOperand.length !== 0){
                rightOperand.pop();;
            }
            else if(rightOperandSign !== ""){
                rightOperandSign = "";
            }
            else if(mathOperator !== ""){
                mathOperator = "";
            }
            else if(leftOperand.length != 0){
                leftOperand.pop();
            }
            else if(leftOperandSign !== ""){
                leftOperandSign = "";
            }
        }
        else if(eventTextContent === "±"){
            let isLeftOperand = mathOperator === "";
            if(result === "Empty"){
                if(isLeftOperand){
                    leftOperandSign = leftOperandSign === "" ? "-" : "";
                }
                else{
                    rightOperandSign = rightOperandSign === "" ? "-" : "";
                }
            }
            else{
                leftOperandSign = "";
                leftOperand = result.toString().split("");
                leftOperand[0] === "-" ? leftOperand.shift() : leftOperandSign = "-";
                rightOperand = [];
                rightOperandSign = "";
                mathOperator = "";
                result = "Empty";
            }
        }
        else if(eventTextContent === "="){
            let isValidMathematicalOperation = !(leftOperand.length === 0 || mathOperator === "" || rightOperand.length === 0);

            if(isValidMathematicalOperation){
                let joinedLeftOperand = +[leftOperandSign, +leftOperand.join("")].join("");
                let joinedRightOperand = +[rightOperandSign, +rightOperand.join("")].join("");

                if (joinedRightOperand !== 0){
                    let isTheOperandFloat = joinedLeftOperand % 1 !== 0 || joinedRightOperand % 1 !== 0;

                    isTheOperandFloat ? result = operate(joinedLeftOperand, mathOperator, joinedRightOperand).toFixed(2)
                    : result = operate(joinedLeftOperand, mathOperator, joinedRightOperand);
                }
                else if(joinedRightOperand === 0 && mathOperator === "÷"){
                    result = joinedLeftOperand >= 0 ? "Division by 0 ERROR! (Some debate it equals +∞)"
                    : "Division by 0 ERROR! (Some debate it equals -∞)"

                }

                // Modify float result to be more appealing
                if(typeof result !== "string"){
                    result = result.toString().split("");
                    while(result[result.length - 1] === "0" || result[result.length - 1] === "."){
                        if (!result.includes(".")){
                            break;
                        }
                        result.pop();
                    }
                    result = +result.join("");
                }

                display.textContent = `${result}`;
            }
        }
        // operator buttons
        else if(leftOperand.length !== 0){
            if(result !== "Empty"){
                leftOperand = result.toString().split("");
                leftOperandSign = result.toString().split("")[0] === "-" ? "-" : "";
                leftOperandSign === "-" ? leftOperand.shift(): true;
                rightOperand = [];
                rightOperandSign = "";
                mathOperator = "";
                result = "Empty";
            }
            mathOperator = eventTextContent;
        }

        if(eventTextContent !== "="){
            let isCalculationVariablesReset = leftOperand.length === 0 && mathOperator === "" && rightOperand.length === 0;
            let isItOkayToDisplay = leftOperand.length !== 0 || leftOperandSign !== "";
    
            if (isCalculationVariablesReset && !isItOkayToDisplay){
                display.textContent = `Click the buttons below to start calculating...`;
            }
            else if (isItOkayToDisplay){
                display.textContent = `${leftOperandSign}${leftOperand.join("")} ${mathOperator} ${rightOperandSign}${rightOperand.join("")}`;
            }
        }
    }
    console.log(`L: ${leftOperandSign}${leftOperand.join("")} M: ${mathOperator} R: ${rightOperandSign}${rightOperand.join("")} result: ${result}`)

    event.stopPropagation();
});