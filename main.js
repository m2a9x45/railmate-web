const submitButton = document.querySelector('#submitButton');
const getButton = document.querySelector('#getButton');
const webButton = document.querySelector('#webButton');
const moreButton = document.querySelectorAll('#moreButton');
const errorText = document.querySelector('#errorText');

let API_URL = "";
let env = "";

fetch('env')
  .then(response => response.text())
  .then((res) => {
    env = res
    fetch('env.json')
        .then(response => response.json())
        .then((data) => {
            console.log(data[`${env}`])
            API_URL = data[`${env}`]
  })
})

webButton.addEventListener("click", () => {
    window.location.href = "./live"
})


getButton.addEventListener('click', () => {
    // submitButton.scrollIntoView({block: 'start', behavior: 'smooth'});
    window.location.href = "./download";
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