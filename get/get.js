const downloadID = document.querySelector('#downloadID');


window.addEventListener("load", () => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    const os = url.searchParams.get("os");
    const _id = url.searchParams.get("id");

    console.log(os);

    downloadID.href = `http://localhost:3001/interest/download/${os}/${_id}`;
});