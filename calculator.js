let display = document.getElementById("display");
let num = document.getElementsByClassName("calcButton");
let displayValue = "";

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', changeDisplay);
}

function changeDisplay(e) {
    if (e.target.value == '=') {
        let sum = calculate();
        displayValue = sum;
        display.innerHTML = sum;
    } else if(e.target.value == "+/-") {
    } else if (e.target.value == "clear") {
        displayValue = "0";
        display.innerHTML = displayValue;
    } else if (e.target.value == "<") {
    } else if (displayValue == '0') {
        displayValue = e.target.value;
        display.innerHTML = displayValue;
    } else {
        displayValue += e.target.value;
        display.innerHTML = displayValue;
    }
}

//sorts user input & calculates ans
function calculate() {
    let num = [];
    let op = [];
    let i = 0;
    let sum = 0;
    
    let eachVal = displayValue.split("");
    eachVal.forEach(x => {
        if (isNaN(x) == false) {
            //check if arr empty && if index has changed i.e new number
            (num.length > 0) && (i == num.length - 1) ? num[i] += x : num.push(x);
        } else {
            op.push(x);
            i++;
        }
    });
    
    for (let j = 0; j < op.length; j++) {
        if (j == 0) {
            sum = operate(num[j], num[j+1], op[j]);
        } else {
            sum = operate(sum, num[j+1], op[j])
        }
    }
    
    return sum;
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