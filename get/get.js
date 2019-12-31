const downloadID = document.querySelector('#downloadID');
const downloadButton = document.querySelector('#downloadButton');

window.addEventListener("load", () => {

    const {os, id} = getUrlParams();
    if (os == null || id == null) {
        console.log("null");
        window.location = "http://railmate.net/";
    }
});

downloadButton.addEventListener("click", () => {

    const {os, id} = getUrlParams();
    console.log(os, id);
    window.open(`http://api.railmate.net/user/interest/download/${os}/${id}`, "_self");
});

function getUrlParams(){

    const url_string = window.location.href;
    const url = new URL(url_string);
    const os = url.searchParams.get("os");
    const id = url.searchParams.get("id");
    return {os : os, id : id};
};
