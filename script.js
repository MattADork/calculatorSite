const numberButtons = document.querySelectorAll(".button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const decimalButton = document.querySelector("#decimal");
const equalButton = document.querySelector("#equal");
const screen = document.querySelector(".screen");

deleteButton.addEventListener("click", deleteNumber);
clearButton.addEventListener("click", clearScreen);
equalButton.addEventListener("click", evaluate);
decimalButton.addEventListener("click", typeDecimal);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => typeNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);


let partOne = "";
let partTwo = "";
let currentOperation = null;
let resetScreen = false;

function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}

function typeNumber(number) {
  if (screen.textContent === "0" || resetScreen) reset();
  screen.textContent += number;
}

function typeDecimal() {
  if (resetScreen) reset();
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function clearScreen() {
  screen.textContent = "0";
  partOne = "";
  partTwo = "";
  currentOperation = null;
}

function setOperation (operator) {
  currentOperation = operator;
  partOne = screen.textContent;
  resetScreen = true;
}

function reset() {
  screen.textContent = "";
  resetScreen = false;
}

function evaluate () {
  if (currentOperation === null || resetScreen) return;
  if (currentOperation === "/" && screen.textContent === "0") {
    alert("Operation can't be completed");
    return;
  }
  partTwo = screen.textContent;
  screen.textContent = round(calculate(currentOperation, partOne, partTwo));
  currentOperation = null;
}

function calculate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else {
    return null;
  }
}

function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}
