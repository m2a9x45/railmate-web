const submitButton = document.querySelector('#submitButton');
const stationList = document.querySelector('#stationList');
const deptable = document.querySelector('#deptable');
const stationSearch = document.querySelector('#stationSearch');
const stations = document.querySelector('#stations');

const API_URL = 'http://railmate.net';

let staionData = [];

stationSearch.addEventListener("input", () => {
    console.log(stationSearch.value);
    stations.innerHTML = "";
    for (let i = 0; i < staionData.length; i++) {
        if (staionData[i].Station_Name.toLowerCase().includes(stationSearch.value)) {
            console.log(staionData[i].Station_Name, staionData[i].CRS_Code);
            
            addToStations(staionData[i].Station_Name, staionData[i].CRS_Code);
        }
    }  
})

fetch(`${API_URL}:3060/app/stations`)
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
        // stations.innerHTML = "";
        
    });
    // li.setAttribute("value", CRS_Code);

    li.appendChild(a);

    stations.appendChild(li);

}

function getLiveDep (CRS_Code) {
    fetch(`${API_URL}:3060/app/livedepatures/${CRS_Code}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);

        deptable.innerHTML = "";

        for (let i = 0; i < data.departures.all.length; i++) {
            addToTable(data.departures.all[i].destination_name, data.departures.all[i].platform, data.departures.all[i].operator_name, data.departures.all[i].aimed_departure_time);    
        };

    })
    .catch((err) => {
        console.log(err); 
    });  
}

function addToTable (Des,Platform, Operator, DepTime){

    let tr = document.createElement('tr');

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