/* The calculator takes in numbers and operands, then calculate it into the result.

**FINISH THE LOGIC FIRST**

TASKS:
1. a function that takes inputs that forms like number - operand - number ...
 1-1. helper function that calculate the result
*/

/* Here is the display messages */
let topLine = "";
let answer = "";
let number = "";
let operand = "";
let operands = ["+", "−", "×", "÷", "%"]
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
let counting = []
let current = "";
let justFinished = false;
let changeInputText = "";

const buttons = document.querySelectorAll(".input");
const resultArea = document.querySelector(".result")
const inputArea = document.querySelector(".input");

/** Take input string number, if meet operand as input, store the number.
 * return the a array with number and operands limited in three items.
 * 
 * When operand is hit, the string will be transferred into number.
 */
function inputKeys(event) {

    input = event.currentTarget.textContent;

    if (input === "=") {
        if (counting.length === 2) {
            counting.push(number);
            number = calculate(counting);
            counting = [];
            justFinished = true;
            changeInputText = "equal";
        }
    } else if (operands.includes(input)) {
        if (counting.length === 3) {
            number = calculate(counting);
            counting = [];
        } else if (counting.length === 2) {
            if (number !== "") {
                counting.push(number);
                number = calculate(counting);
                justFinished = true;
                counting = [number, input];
            } else {
                counting[1] = input;
            }
        } else {
            counting.push(number);
            counting.push(input);
        }
        number = "";
        changeInputText = "operand"
    } else if (numbers.includes(input)) {
        if (justFinished) {
            number = "";
            justFinished = false;
        }
        number += input;
    } else if (input === "C") {
        number = number.slice(0, -1);
    } else if (input === "AC") {
        number = "";
        counting = [];
        changeInputText = "clean";
    } else if (input === "(−)") {
        if (parseInt(number, 10) > 0) {
            number = "-" + number;
        } else if (parseInt(number, 10) < 0) {
            number = number.slice(1);
        }
    } else if (input === ".") {
        if (parseInt(number, 10).isInteger) {
            number += ".";
        }
    } else if (input === "X") {
        return;
    }

    console.log(input);
    console.log(number);
    console.log(counting);

    changeText();

}

/** Take the array as input, return the calculated result */
function calculate(formula) {

    switch (formula[1]) {
        case "+":
            return +formula[0] + +formula[2];
        case "−":
            return +formula[0] - +formula[2];
        case "×":
            return +formula[0] * +formula[2];
        case "÷":
            return +formula[0] / +formula[2];
        case "%":
            return +formula[0] % +formula[2];
    }

}

// Visible control goes here

buttons.forEach(button => {
    button.addEventListener("click", inputKeys);
})

function changeText() {
    if (number === "" && counting.length === 2) {
        resultArea.textContent = counting[0];
    } else {
        resultArea.textContent = number;
    }

    switch (changeInputText) {
        case "operand":
            inputArea.textContent = counting[0] + " " + counting[1];
            break;
        case "":
            break;
        case "clean" || "equal":
            inputArea.textContent = "";
            break;
    }

}