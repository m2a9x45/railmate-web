const submitButton = document.querySelector('#submitButton');
const getButton = document.querySelector('#getButton');
const moreButton = document.querySelectorAll('#moreButton');

moreButton.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = "http://localhost/dev/railmate/learnmore";
    })
});

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
    console.log(data);
    
    sendData(data); 
});

getButton.addEventListener('click', () => {
    submitButton.scrollIntoView({block: 'start', behavior: 'smooth'});
});

function sendData(data){

    const url = "http://localhost:3001/interest";

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
            window.location = `http://localhost/dev/railmate/get/?os=${data.os}&id=${data._id}`;
                   
        } else {
            console.log("oops something went wrong");
            
        }
    })
    .catch(error => console.error(error));        
};