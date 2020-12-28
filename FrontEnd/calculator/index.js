const URL = "127.0.0.1:8080/";
const theScreen = new Vue({
    el: '#scr',
    data: {
        text: "0",
        result: '',
    }
})

function replace(char, string, to) {
    let newStr = ""
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === char)
            newStr += to;
        else
            newStr += string.charAt(i);
    }
    return newStr;

}

function send(url, operation, type) {
    let sent = '';
    operation = replace('%', operation, 'x0.01');

    operation = replace('+', operation, '%2B');
    if (type === 0)
        sent = url + "?operation=" + operation;
    else
        sent = url + "?operation=" + operation + "&type=" + type;
    console.log('Sent is ' + sent)
    fetch('//' + sent)
        .then(response => response.text())
        .then(function(text) {
            console.log(text);
            theScreen.result = text;
        })
}

let clickButton = function(number) {
    if (theScreen.result !== '') {
        theScreen.result = '';
        theScreen.text = '';
    }
    let num = parseInt(number);
    if ((number !== ".") && (Number.isNaN(num) || number === "1/x")) {
        console.log("Operator");
        handleOperators(number);
    } else { // a number
        console.log(num);
        if (theScreen.text === "0")
            theScreen.text = number;
        else
            theScreen.text += number;
    }
}

function handleOperators(op) {
    console.log("Entered ops")
    let url = 0;

    if (op !== "=") {
        if (op === "1/x" || op === "sqrt(x)" || op === "x^2") {
            op = op === "x^2" ? "xx" : op;
            console.log("Unit operations");
            send(URL + "single", theScreen.text, op);
        } else {
            if (op === "+/-")
                op = "-";
            theScreen.text += op;
        }
    } else {
        console.log("====")
        console.log("theScreen op is " + theScreen.operator)
        send(URL + "normal", theScreen.text, 0);
    }

}

let addNumber = function() {
    clickButton(this.value);
}

const listOfButtons = document.getElementById("buttonsList");
let rows = 6;
for (let i = 1; i <= rows; i++) {
    let element = document.createElement("li");
    for (let j = 1; j <= 4; j++) {
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("class", "button number");
        input.setAttribute("name", "button");
        input.setAttribute("value", "X");
        input.setAttribute("id", "button" + (i * 10 + j));
        input.addEventListener("click", addNumber);
        element.appendChild(input);
    }
    listOfButtons.appendChild(element);
}

//Classes:operators,numbers,calculator operators.
let element = 0;
document.querySelector('#button11').value = "%";
element = document.querySelector('#button12');
element.value = "CE";
element.removeEventListener("click", addNumber);
element.addEventListener("click", () => theScreen.text = 0);
element = document.querySelector('#button13');
element.value = "C";
element.removeEventListener("click", addNumber);
element.addEventListener("click", function() {
    theScreen.text = "0";
})
element = document.querySelector('#button14');
element.value = "Erase";
element.removeEventListener("click", addNumber);
element.addEventListener("click", function() {
    theScreen.text = theScreen.text.slice(0, -1);
})

document.querySelector('#button21').value = "1/x";
document.querySelector('#button22').value = "x^2";
document.querySelector('#button23').value = "sqrt(x)";
document.querySelector('#button24').value = "/";

document.querySelector('#button31').value = "7";
document.querySelector('#button32').value = "8";
document.querySelector('#button33').value = "9";
document.querySelector('#button34').value = "x";

document.querySelector('#button41').value = "4";
document.querySelector('#button42').value = "5";
document.querySelector('#button43').value = "6";
document.querySelector('#button44').value = "-";


document.querySelector('#button51').value = "1";
document.querySelector('#button52').value = "2";
document.querySelector('#button53').value = "3";
document.querySelector('#button54').value = "+";


document.querySelector('#button61').value = "+/-";
document.querySelector('#button62').value = "0";
document.querySelector('#button63').value = ".";
document.querySelector('#button64').value = "=";