function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}

function operate(leftOperand, mathOperator, rightOperand) {
	return mathOperator === "+"
		? add(leftOperand, rightOperand)
		: mathOperator === "-"
		? subtract(leftOperand, rightOperand)
		: mathOperator === "*" || mathOperator === "×"
		? multiply(leftOperand, rightOperand)
		: mathOperator === "/" || mathOperator === "÷"
		? divide(leftOperand, rightOperand)
		: "INVALID MATH OPERATOR!";
}

let leftOperandSign = "",
	leftOperand = [],
	mathOperator = "",
	rightOperandSign = "",
	rightOperand = [],
	result = "Empty";

const display = document.querySelector(".display-paragraph");
const buttons = document.querySelector(".buttons.container");

let operatorString = "/*-+÷×".split("");
let acceptedKeyboardCharacters = "0123456789/*-+=.÷×±⌫".split("");
acceptedKeyboardCharacters.push("Enter", "Backspace");

function bro(event) {
    let eventTextContent;
	let eventTagName = event.target.tagName;
    let isSafeKeyboardInput = acceptedKeyboardCharacters.includes(event.key);
	let isSafeButtonClick = eventTagName === "BUTTON" && !event.key;

	if (isSafeButtonClick || isSafeKeyboardInput) {
        
    /*--------------- Keyboard support -----------------*/
        if(isSafeKeyboardInput){

            switch (event.key) {
                case "/":
                    eventTextContent = "÷";
                    break;
                case "*":
                    eventTextContent = "×";
                    break;
                case "-":
                    if(event.altKey){eventTextContent = "±";} else {eventTextContent = "-";}
                    break;
                case "Backspace":
                    if (event.altKey){eventTextContent = "clear";} else {eventTextContent = "⌫";}
                    break;
                case "Enter":
                    eventTextContent = "=";
                    break;
                default:
                    eventTextContent = event.key;
            }
            
        } else if (!isSafeKeyboardInput) {
            eventTextContent = event.target.textContent;
        }
    /*---------------------------------------------------*/

		let isNumber =
			typeof +eventTextContent === "number" && !isNaN(+eventTextContent);

		let isThrClickedOperatorValid =
			leftOperand.length !== 0 &&
			leftOperand[leftOperand.length - 1] !== "." &&
			rightOperand[rightOperand.length - 1] !== ".";

		if (isNumber || eventTextContent === ".") {
			let isLeftOperand = mathOperator === "";
			let currentOperand = isLeftOperand ? leftOperand : rightOperand;

			let isTheClickedDotValid =
				eventTextContent === "." &&
				!currentOperand.includes(".") &&
				currentOperand.length !== 0;

			let isTheClickedZeroValid =
				eventTextContent === "0" &&
				(currentOperand.includes(".") || currentOperand[0] !== "0");

			let isTheClickedNotZeroNumberValid = eventTextContent !== "0" && isNumber;

			let isZeroTheFirstDigitInCurrentOperand =
				isTheClickedNotZeroNumberValid &&
				currentOperand.length === 1 &&
				currentOperand[0] === "0";

			if (isZeroTheFirstDigitInCurrentOperand) {
				currentOperand[0] = eventTextContent;
			} else if (
				isTheClickedDotValid ||
				isTheClickedZeroValid ||
				isTheClickedNotZeroNumberValid
			) {
				currentOperand.push(eventTextContent);
			}

		} else if (eventTextContent === "±") {
			let isLeftOperand = mathOperator === "";

			if (result === "Empty") {
				if (isLeftOperand) {
					leftOperandSign = leftOperandSign === "" ? "-" : "";
				} else {
					rightOperandSign = rightOperandSign === "" ? "-" : "";
				}
			} else {
				leftOperandSign = "";
				leftOperand = result.toString().split("");
				leftOperand[0] === "-" ? leftOperand.shift() : (leftOperandSign = "-");
				rightOperand = [];
				rightOperandSign = "";
				mathOperator = "";
				result = "Empty";
			}

		} else if (eventTextContent === "clear") {
			leftOperandSign = "";
			leftOperand = [];
			mathOperator = "";
			rightOperandSign = "";
			rightOperand = [];
			result = "Empty";

		} else if (eventTextContent === "⌫") {
			if (rightOperand.length !== 0) {
				rightOperand.pop();
			} else if (rightOperandSign !== "") {
				rightOperandSign = "";
			} else if (mathOperator !== "") {
				mathOperator = "";
			} else if (leftOperand.length != 0) {
				leftOperand.pop();
			} else if (leftOperandSign !== "") {
				leftOperandSign = "";
			}

		} else if (eventTextContent === "=" || operatorString.includes(eventTextContent)) {
			console.log(operatorString.includes(eventTextContent));
			let isValidMathematicalOperation = !(
				leftOperand.length === 0 ||
				mathOperator === "" ||
				rightOperand.length === 0);

			if (isValidMathematicalOperation) {
				let joinedLeftOperand = +[leftOperandSign, +leftOperand.join("")].join("");
				let joinedRightOperand = +[rightOperandSign, +rightOperand.join("")].join("");

				if (joinedRightOperand === 0 && mathOperator === "÷") {
					result =
						joinedLeftOperand >= 0
							? "Division by 0 ERROR! (Nuh Uh it's +∞)"
							: "Division by 0 ERROR! (Nuh Uh it's -∞)";
					display.textContent = `${result}`;
					result = "Empty";
				} else {
					let isTheOperandFloat =
						joinedLeftOperand % 1 !== 0 || joinedRightOperand % 1 !== 0;

					if (isTheOperandFloat || mathOperator === "÷") {
						result = +operate(joinedLeftOperand, mathOperator, joinedRightOperand).toFixed(2);
					} else {
						result = +operate(joinedLeftOperand, mathOperator, joinedRightOperand);
					}
					display.textContent = `${result}`;
				}
			}

			if (operatorString.includes(eventTextContent)){
				if (result !== "Empty") {
					leftOperand = result.toString().split("");
					leftOperandSign = result.toString().split("")[0] === "-" ? "-" : "";
					leftOperandSign === "-" ? leftOperand.shift() : true;
					rightOperand = [];
					rightOperandSign = "";
					mathOperator = "";
					result = "Empty";
				}

				mathOperator = eventTextContent
			}
		}

    /*--------------------------------------------   Display   ---------------------------------------------*/
        let isSafeToDisplay = eventTextContent !== "=";
		if (isSafeToDisplay) {
			let isReset =
				leftOperand.length === 0 &&
				mathOperator === "" &&
				rightOperand.length === 0;

			let isDisplayOkay = leftOperand.length !== 0 || leftOperandSign !== "";

			if (isReset && !isDisplayOkay) {
				display.textContent = `|`;
			} else if (isDisplayOkay) {
				display.textContent = `${leftOperandSign}${leftOperand.join("")} ${mathOperator} ${rightOperandSign}${rightOperand.join("")}`;
			}
		}
	}
    /*------------------------------------------------------------------------------------------------------*/
	console.log(
		`L: ${leftOperandSign}${leftOperand.join(
			""
		)} M: ${mathOperator} R: ${rightOperandSign}${rightOperand.join(
			""
		)} result: ${result}`
	);

	event.stopPropagation();
}


buttons.addEventListener("click", bro);
buttons.addEventListener("keypress", (e) => e.key === "Enter" ? e.preventDefault() : false);
document.addEventListener("keyup", bro);

// Prevent unwanted mouse behaviors
let mouse = document.querySelector(".calculator");
mouse.addEventListener("dragstart", (e) => e.preventDefault());
mouse.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("selectstart", (e) => e.preventDefault());

