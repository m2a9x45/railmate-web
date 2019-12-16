const submitButton = document.querySelector('#submitButton');
const API_URL = "http://railmate.net";

submitButton.addEventListener("click",() => {
    event.preventDefault()
    
    const email = document.querySelector('#email').value;
    // const os = document.querySelector('input[name="os"]:checked').value;

    const data = {
        "email": email
    }
    
    if (email == "") {
        showError("Oops 😔 You need to enter your email address");
    } else {
        console.log(data);
        sendData(data); 
    }

    
});

function sendData(data){

    const url = `${API_URL}:3060/user/sar`;

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
            // window.location = `http://${API_URL}/get/?os=${data.os}&id=${data.id}`;
                   
        } else {
            console.log("oops something went wrong");
            console.log(data);
            showError(data.message);
        }
    })
    .catch(error => console.error(error));        
};


function showError(error){
    errorText.innerText = error;
    errorText.setAttribute("style", "color:red;")
    setTimeout(() => { errorText.setAttribute("style", "color:black;"); }, 500);
}