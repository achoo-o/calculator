let display = document.getElementById("display");
let num = document.getElementsByClassName("calcButton");
let displayValue = "";
let err = "Cannot be divided by 0";
let sum = 0;

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', buttonEvent);
}

function buttonEvent(e) {
    if (e.target.value == '=') {
        sum = calculate();
        displayValue = sum;
    } else if(e.target.value == "+/-") {
    } else if (e.target.value == "clear") {
        displayValue = "0";
    } else if (e.target.value == "<") {
        //Erases most recent input if writing an equation
        if (displayValue != "" && displayValue != sum) {
            let arr = displayValue.split("");
            arr.pop();
            displayValue = arr.join("");
        //If used on an answer of an equation, will erase whole answer
        } else if (displayValue != "") {
            displayValue = "0";
        }
    } else if (displayValue == '0' || displayValue == err) {
        displayValue = e.target.value;
    } else {
        displayValue += e.target.value;
    }
    changeDisplay(displayValue);
}

function changeDisplay(toDisplay) {
    display.innerHTML = toDisplay;
}

//sorts user input & calculates ans
function calculate() {
    let num = [];
    let op = [];
    let i = 0;
    sum = 0;
    
    let eachVal = displayValue.split("");
    eachVal.forEach(x => {
        if (isNaN(x) == false || x == ".") {
            //check if arr empty && if index has changed i.e new number
            (num.length > 0) && (i == num.length - 1) ? num[i] += x : num.push(x);
        } else {
            op.push(x);
            i++;
        }
    });
    
    if(op.length === 0){
        sum = displayValue;
        return displayValue;
    } else {
        for (let j = 0; j < op.length; j++) {
            //checks if user divided by 0
            if (num[j+1] == '0' && op[j] == '/') {
                sum = err;
                break;
            } else {
                  if (j == 0) {
                    sum = operate(num[j], num[j+1], op[j]);
                } else {
                    sum = operate(sum, num[j+1], op[j]);
                }  
            }
        }
        return sum;
    }
}

//calc funcs

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}
