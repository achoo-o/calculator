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
    
    if(isNaN(select) == true || numShort(select) == true) {
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
}

//checks if number exceeds 15 digits
function numShort() {
    let reverse = displayValue.slice().reverse();
    let length = 0;
    for(let key in reverse) {
        if (operators.includes(reverse[key])) {
            break;
        } else if (reverse[key] != ".") {
            length+= 1;
            if (length == 15) {
                alert("Max digits allowed: 15")
                return false;
            }
        }
    }
    return true;
}

//checks if most recent input is an operator
function notOperator() {
    for (let key in operators) {
        if (operators[key] == displayValue[displayValue.length - 1]) {
            return false;
        }
    }
    return true;
}

//checks if there is already a decimal in a number
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

/* This will insert a <br> tag if the displayValue is forced to newline due to length (15 characters).
 * It will get rid of the <br> tag if it only takes up a single line
 * This is purely for user display purposes */
function lengthCheck() {
    let displayWrapper = document.getElementById("displayWrapper");
    let br = document.getElementById("br");
    if (displayValue.length >= 15 && br != null) {
        displayWrapper.removeChild(br);
    } else if (displayValue.length < 15 && !br) {
        let br = document.createElement("br");
        br.setAttribute("id", "br");
        displayWrapper.insertBefore(br, display);
    }
}

function changeDisplay(toDisplay) {
    display.innerHTML = toDisplay.join("");
    lengthCheck();
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
