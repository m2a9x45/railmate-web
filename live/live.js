const submitButton = document.querySelector('#submitButton');
const stationList = document.querySelector('#stationList');
const deptable = document.querySelector('#deptable');
const deptableheadings = document.querySelector('#deptableheadings');
const stationSearch = document.querySelector('#stationSearch');
const stations = document.querySelector('#stations');
const errorMessage = document.querySelector('#errorMessage');


const API_URL = 'http://api.railmate.net';

let staionData = [];

stationSearch.addEventListener("input", () => {
    errorMessage.style.display = "none";
    console.log(stationSearch.value);
    stations.innerHTML = "";
    // console.log(staionData);
    for (let i = 0; i < staionData.length; i++) {
        if (staionData[i].Station_Name.toLowerCase().includes(stationSearch.value.toLowerCase())) {
            addToStations(staionData[i].Station_Name, staionData[i].CRS_Code);
        } 
    }  
})

fetch(`${API_URL}/app/stations`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        staionData = data.test;
        for (let i = 0; i < data.test.length; i++) {
            //addToList(data.test[i].Station_Name, data.test[i].CRS_Code);
            addToStations(data.test[i].Station_Name, data.test[i].CRS_Code);
        }

    })
    .catch((err) => {
        console.log(err); 
    });

function addToStations (Station_Name, CRS_Code) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = Station_Name;
    a.setAttribute("href", CRS_Code)
    a.setAttribute("value", CRS_Code)
    a.addEventListener("click", (event) => {
        event.preventDefault(event);
        let target = event.target;
        console.log(event.srcElement.attributes[1].value);
        getLiveDep(event.srcElement.attributes[1].value);
        stations.innerHTML = "";
        stationSearch.value = Station_Name;
        
    });
    // li.setAttribute("value", CRS_Code);

    li.appendChild(a);

    stations.appendChild(li);

}

function getLiveDep (CRS_Code) {
    fetch(`${API_URL}/app/livedepatures/${CRS_Code}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);

        deptable.innerHTML = "";

        if (data.departures.all.length == 0) {
            console.log("There are no depatures in the next 2 hours from this station");
            errorMessage.style.display = "block";
            errorMessage.innerText = `Sorry 😥 there are no depatures in the next 2 hours from ${data.station_name}`
        } else {
            deptableheadings.style.display = "contents";
            errorMessage.style.display = "none";
            for (let i = 0; i < data.departures.all.length; i++) {
                addToTable(data.departures.all[i].destination_name, data.departures.all[i].platform, 
                    data.departures.all[i].operator_name, data.departures.all[i].aimed_departure_time, data.departures.all[i].service_timetable.id);    
            };
        }
    })
    .catch((err) => {
        console.log(err); 
    });  
}

function addToTable (Des,Platform, Operator, DepTime, url){

    let tr = document.createElement('tr');
    tr.addEventListener("click", () => {
        console.log("clicked");
    })

    let tdDes = document.createElement('td');
    tdDes.innerHTML  = Des;
    let tdPlatform = document.createElement('td');
    tdPlatform.innerHTML  = Platform;
    let tdOperator = document.createElement('td');
    tdOperator.innerHTML  = Operator;
    let tdDepTime = document.createElement('td');
    tdDepTime.innerHTML  = DepTime;

    tr.appendChild(tdDes);
    tr.appendChild(tdPlatform);
    tr.appendChild(tdOperator);
    tr.appendChild(tdDepTime);

    deptable.appendChild(tr);

}