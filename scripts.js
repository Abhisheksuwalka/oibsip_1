"use strict";

let currentEqn = "";
let previousEqn = "";
let justEvaluated = false;
let previousAnswer = "";
let clearButton = {};
//   01 -> to change Theme .
var changeTheme = document.getElementById("changeTheme");
changeTheme.onclick = function () {
  document.body.classList.toggle("dark-theme");
};
//

//   Important Functions ...
function updateDisplayValue() {
  let currentDisplayValue = document.getElementById("currentEqn");
  currentDisplayValue.textContent = currentEqn;
}

function updatePreviousEquation() {
  justEvaluated = true;
  let previousEquation = document.getElementById("previousEqn");
  previousEquation.textContent = previousEqn;
}

function addToDisplay(someValue) {
  if (justEvaluated) {
    let someValueIsNew =
      (someValue >= 0 && someValue <= 9) ||
      someValue == "(" ||
      someValue == "ans";
    if (someValueIsNew) {
      clearButton.value = "clr";
      currentEqn = "";
    }
    justEvaluated = false;
  }
  switch (someValue) {
    case "(":
      if (currentEqn) {
        let lastCharacter = currentEqn.charAt(currentEqn.length - 1);
        let lastCharacterIsOperator =
          lastCharacter == "(" ||
          lastCharacter == "*" ||
          lastCharacter == "/" ||
          lastCharacter == "+" ||
          lastCharacter == "-";
        if (!lastCharacterIsOperator) {
          return;
        }
      }
      break;
    case "ans":
      someValue = String(previousAnswer);
      break;
    default:
      break;
  }
  justEvaluated = false;
  currentEqn += String(someValue);
  console.log("currentEqn is : " + currentEqn);
  updateDisplayValue();
}

function deleteFromEnd() {
  currentEqn = currentEqn.substring(0, currentEqn.length - 1);
  updateDisplayValue();
}
function clearDisplay(idValue) {
  clearButton = document.getElementById(idValue);
  if (currentEqn) {
    // when currentEqn is not empty (first click.)
    currentEqn = "";
    clearButton.value = "AC";
    updateDisplayValue();
  } else {
    // when currentEqn is empty (second click.)
    currentEqn = "";
    previousEqn = "";
    justEvaluated = false;
    clearButton = {};
    updateDisplayValue();
  }
}

/// for percentage % % %
// let evaluatingPercentage = false;
// let percentageValue = ""; // Variable to store the percentage value
// let resolvePreviousAnswer; // Promise resolver for the second number
// function percentageOf() {
//   percentageValue = currentEqn; // Store the current equation as the percentage value
//   currentEqn = ""; // Clear the current equation
//   evaluatingPercentage = true;
// }
function percentageOf() {
  // percentageValue = currentEqn; // Store the current equation as the percentage value
  // currentEqn = ""; // Clear the current equation
  // evaluatingPercentage = true;
  let finalValue;
  try {
    finalValue = eval(currentEqn);
  } catch (error) {
    console.log("Error in calculation");
  }
  currentEqn = finalValue / 100;
  currentEqn = String(currentEqn);
  updateDisplayValue();
}

function evaluateCurrentEqn() {
  previousEqn = currentEqn;
  try {
    if (currentEqn) {
      previousAnswer = eval(currentEqn)
        .toFixed(12)
        .replace(/\.?0+$/, ""); // Evaluate the current equation
    } else {
      previousAnswer = 0;
    }
    // if (evaluatingPercentage) {
    //   // If in percentage calculation mode
    //   let result = (parseFloat(percentageValue) * previousAnswer) / 100;
    //   previousEqn = percentageValue + " % of " + previousAnswer;
    //   currentEqn = String(result);
    //   // evaluatingPercentage = false; // Reset the flag
    // } else {
    //   // If not in percentage calculation mode
    //   currentEqn = String(previousAnswer);
    //   previousEqn = previousEqn + " = " + currentEqn;
    // }
    currentEqn = String(previousAnswer);
    previousEqn = previousEqn + " = " + currentEqn;
    updatePreviousEquation();
    updateDisplayValue();
  } catch (error) {
    console.log("Error in calculation");
  }
  return previousAnswer;
}

function sqrRootThis() {
  let squareRoot;
  try {
    squareRoot = eval(currentEqn);
  } catch (error) {
    console.log("Error in calculation");
  }
  squareRoot = Math.sqrt(squareRoot);
  currentEqn = String(squareRoot.toFixed(5).replace(/\.?0+$/, ""));
  // previousEqn = "√" + previousAnswer + " = " + currentEqn;
  updateDisplayValue();
  // updatePreviousEquation();
}

function changeSignOfCurrentEqn() {
  // let currentEqnBackup = currentEqn;
  let changedSign;
  try {
    changedSign = eval(currentEqn)
      .toFixed(12)
      .replace(/\.?0+$/, "");
  } catch (error) {
    console.log("Error in calculation");
  }
  changedSign = -1 * changedSign;
  // previousEqn = "- ( " + currentEqnBackup + ") = " + previousAnswer;
  currentEqn = String(changedSign);
  updateDisplayValue();
  // updatePreviousEquation();
}

// to edit keys design , when clicked
document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".keys");

  buttons.forEach(function (button) {
    button.addEventListener("mousedown", function () {
      button.classList.add("clicked");
    });

    button.addEventListener("mouseup", function () {
      button.classList.remove("clicked");
    });

    // mouseout event listener to handle the case when the mouse is dragged out of the button while still holding down
    button.addEventListener("mouseout", function () {
      button.classList.remove("clicked");
    });
  });
});

// KEYBOARD FUNCTIONALITY
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "Enter":
    case "=":
      evaluateCurrentEqn();
      break;
    case "e":
      addToDisplay(Math.E);
      break;
    case "p":
      addToDisplay(Math.PI);
      break;
    case "Backspace":
      deleteFromEnd();
      break;
    case "%":
      percentageOf();
      break;
    case "c":
      clearDisplay();
      break;
    case "r":
      sqrRootThis();
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
    case "+":
    case "-":
    case "*":
    case "/":
    case "(":
    case ")":
      addToDisplay(event.key);
      break;
    default:
      // Do nothing for other keys
      break;
  }
});
