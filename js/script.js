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
        if((typeof +event.target.textContent === "number" && !isNaN(+event.target.textContent)) || event.target.textContent === "."){
            if(mathOperator === ""){
                if(event.target.textContent === "." && leftOperand.length !== 0){
                    if(!leftOperand.includes(".")){
                        leftOperand.push(event.target.textContent);
                    }
                }
                else{
                    if(!(leftOperand.length === 0 && event.target.textContent === "0")){
                        leftOperand.push(event.target.textContent);
                    }
                }
            }
            else{
                if(event.target.textContent === "." && rightOperand.length !== 0){
                    if(!rightOperand.includes(".")){
                        rightOperand.push(event.target.textContent);
                    }

                }
                else{
                    if(!(rightOperand.length === 0 && event.target.textContent === "0")){
                        rightOperand.push(event.target.textContent);
                    }
                }
            }
        }
        else if(event.target.textContent === "clear"){
            leftOperand = [];
            mathOperator = "";
            rightOperand = [];
        }
        else if(event.target.textContent === "±"){}
        else if(event.target.textContent === "="){
            let checkValidOperation = !(leftOperand.length === 0 && mathOperator === "" && rightOperand.length === 0);
            if(checkValidOperation){
                let result = operate(+leftOperand.join(""), mathOperator, +rightOperand.join(""));
                display.textContent = `${result}`;
            }
        }
        else{
            mathOperator = event.target.textContent;
        }
    }

    if(event.target.textContent !== "="){
        if(leftOperand.length === 0 && mathOperator === "" && rightOperand.length === 0){
            display.textContent = `0`;
        }
        else{
            display.textContent = `${leftOperand.join("")} ${mathOperator} ${rightOperand.join("")}`;
        }
    }
    console.log(`L: ${leftOperand.join("")} M: ${mathOperator} R: ${rightOperand.join("")}`)

    event.stopPropagation();
});