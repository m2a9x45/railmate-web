const submitButton = document.querySelector('#submitButton');

let API_URL = "";
let env = "";

fetch('../env')
  .then(response => response.text())
  .then((res) => {
    env = res
    fetch('../env.json')
        .then(response => response.json())
        .then((data) => {
            console.log(data[`${env}`])
            API_URL = data[`${env}`]
  })
})


submitButton.addEventListener("click",() => {
    event.preventDefault()
    
    const email = document.querySelector('#email').value;
    // const os = document.querySelector('input[name="os"]:checked').value;

    const data = {
        "email": email
    }
    
    if (email == "") {
        showError("Oops 😔 You need to enter your email address", "Red");
    } else {
        console.log(data);
        sendData(data); 
    }

    
});

function sendData(data){

    const url = `${API_URL}/user/sar`;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.error != true) {
            console.log("Everthing worked");
            showError(data.message, "green");
            setTimeout(() => {window.location = "../";}, 3500)
        } else {
            console.log("oops something went wrong");
            console.log(data);
            showError(data.message, "red");
        }
    })
    .catch(error => console.error(error));        
};


function showError(message, colour){
    errorText.innerText = message;
    errorText.setAttribute("style", `color:${colour};`)
    setTimeout(() => { errorText.setAttribute("style", "color:black;"); }, 500);
}