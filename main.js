const submitButton = document.querySelector('#submitButton');
const getButton = document.querySelector('#getButton');
const moreButton = document.querySelectorAll('#moreButton');
const errorText = document.querySelector('#errorText');

//https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling
//https://stackoverflow.com/questions/9860630/javascript-smooth-scroll-ipad
const API_URL = "http://api.railmate.net";

// moreButton.forEach(button => {
//     button.addEventListener('click', () => {
//         window.location.href = "http://localhost/dev/railmate/learnmore";
//     })
// });

submitButton.addEventListener("click",() => {
    event.preventDefault()
    
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    // const os = document.querySelector('input[name="os"]:checked').value;

    const data = {
        "name" : name,
        "email": email,
        "os": "android"
    }
    

    if (name == "" || email == "") {
        showError("Oops 😔 You need to enter your name and email address");
    } else {
        console.log(data);
        sendData(data); 
    }

    
});

getButton.addEventListener('click', () => {
    submitButton.scrollIntoView({block: 'start', behavior: 'smooth'});
});

function sendData(data){

    const url = `${API_URL}:3060/user/interest`;

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
            window.location = "http://railmate.net/get/?os=${data.os}&id=${data.id}";
                   
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