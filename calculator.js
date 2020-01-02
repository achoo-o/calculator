let display = document.getElementById("display");
let num = document.getElementsByClassName("calcButton");
let displayValue = "";

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', changeDisplay);
}

function changeDisplay(e) {
    if (e.target.value == '=') {
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
                //console.log("first operator")
                //console.log(num[j] +  op[j] + num[j+1] + '=' + sum);
            } else {
                //console.log("second operator");
                //console.log(sum + "+");
                sum = operate(sum, num[j+1], op[j])
                //console.log(op[j] + num[j+1] + '=' + sum);
            }
            console.log("Sum: " + sum);
        }
        
    } else if(e.target.value == "+/-") {
    } else if (e.target.value == "clear") {
    } else if (e.target.value == "<") {
    } else {
        displayValue += e.target.value;
        display.innerHTML = displayValue;
        console.log(displayValue); 
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
    return a/b
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