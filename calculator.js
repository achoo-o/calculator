let display = document.getElementById("display");
let num = document.getElementsByClassName("calcButton");
let displayValue = ["0",];
let err = "Cannot be divided by 0";
let operators = ["+","-","*","/"];
let sum;

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', buttonEvent);
}

function buttonEvent(e) {
    let select = e.target.value;
    
    switch (select) {
        case "=":
            calculate();
            break;
        
        case "+":
        case "-":
        case "*":
        case "/":
            //adds operator if not a repeat
            if (notOperator() == true && displayValue.length != 0 || notOperator() == true && select == "-") {
                displayValue.push(select);
            //switches operator if repeat
            } else if (displayValue.length != 0) {
                //does not put in operator in first instance, except if - operator
                if (!(displayValue.length == 1 && displayValue[0] == "-")) {
                    displayValue.pop();
                    displayValue.push(select); 
                } else if (displayValue.length == 1 && displayValue[0] == "-") {
                    displayValue.pop();
                }
                
            }
            break;
        
        case ".":
            if (decimalRepeat() == false) {
                displayValue.push(select);
            }
            break;
        
        case "clear": displayValue = ["0",];break;
        
        case "<": displayValue.pop(); break;
        
        default:
            (displayValue == '0' || displayValue == err) ?
                displayValue = [select,] :
                displayValue.push(select);
    }
    changeDisplay(displayValue);
}

function notOperator() {
    
    for (let key in operators) {
        if (operators[key] == displayValue[displayValue.length - 1]) {
            return false;
        }
    }
    return true;
}

function decimalRepeat() {
    let reverse = displayValue.slice().reverse();
    for(let key in reverse) {
        if (operators.includes(reverse[key])) {
            break;
        } else if (reverse[key] == ".") {
            return true;
        }
    }
    return false;
}


function changeDisplay(toDisplay) {
    display.innerHTML = toDisplay.join("");
}

//sorts user input & calculates ans
function calculate() {
    let num = [];
    let op = [];
    let i = 0;
    sum = 0;
    
    //pops unneccessary operators at end of equation
    if (operators.includes(displayValue[displayValue.length - 1])) {
        displayValue.pop();
    }
    
    displayValue.forEach(x => {
        if (isNaN(x) == false || x == ".") {
            //check if arr empty && if index has changed i.e new number
            (num.length > 0) && (i == num.length - 1) ? num[i] += x : num.push(x);
        } else {
            op.push(x);
            i++;
        }
    });
    
    if(op.length != 0){
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
            sum = Math.round(sum * 100)/100;
        }
        displayValue = sum.toString().split("");
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
