const downloadLink = document.querySelector('#downloadLink');

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

downloadLink.addEventListener("click", () => {
    event.preventDefault();
    console.log("clicked");
    window.open(`${API_URL}/user/download`)
});