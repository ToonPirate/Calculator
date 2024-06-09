let operator
let result
let last
let buttons
let number
let history =""

const buttonPress = addEventListener('click', (button) =>
    {
    // Retrieve id from clicked element
    let elementId = button.target.id
    last = document.getElementById(elementId)
    // Calls Clear function to reset calculator variables
    if (last.id === "clear"){
        clr() 
        }
    
    else {
        // If button clicked is a number...
        if (last.className === "num"){
            number = +last.value
            // ...check if it's the first number
            if (!result){
                result = number
            }
            else {
                solve()
            }
            document.getElementById("result").innerText = result
            // Calls function to toggle buttons
            operandsOn()
        }

        if (last.className === "operand"){
            // Calculates square root
            if (last.value ==="√x"){
                if (result){
                    result = Math.sqrt(number)
                }
            }
            // Calculates power of 2
            else if (last.value ==="x^2"){
                result = number * number    
            }
            // ...otherwise sets operator to last value
            else {
                operator = last.value
            }
            // Toggles buttons
            numbersOn()
        }
        
        document.getElementById("prev-operation").innerText = last.value
        history += String(last.value)
        addToHistory()
    }
})

// Activates number buttons and deactivates operands
function numbersOn(){
    buttons = document.getElementsByClassName("num")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    buttons = document.getElementsByClassName("operand")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }    
    
}

// Activates operands and deactivates number buttons
function operandsOn(){
    buttons = document.getElementsByClassName("num")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    buttons = document.getElementsByClassName("operand")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

// Does the maths
function solve(){
    if (operator === "+"){
        result += number
    }
    else if (operator === "-"){
        result -= number
    }
    else if (operator === "*"){
        result *= number
    }
    else if (operator === "/"){
        if (number !== "0"){
            result /= number
        }
    }
}

// Writes to the history <ol>
function addToHistory() {
    let ol = document.querySelector(".history")
    let li = document.createElement('li')
    let text = document.createTextNode(history + " = "+result)
    li.appendChild(text)
    ol.appendChild(li)   
}

//Clears stored variable data and text fields
function clr() {
    history = ""
    number = ""
    result = ""
    document.getElementById('prev-operation').innerText = ""
    document.getElementById('result').innerText = ""
    let ol = document.querySelector(".history")
    numbersOn()
    while( ol.firstChild ){
        ol.removeChild( ol.firstChild );
    }
}
