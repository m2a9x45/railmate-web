const submitButton = document.querySelector('#submitButton');
const stationList = document.querySelector('#stationList');
const deptable = document.querySelector('#deptable');
const deptableheadings = document.querySelector('#deptableheadings');
const stationSearch = document.querySelector('#stationSearch');
const stations = document.querySelector('#stations');
const errorMessage = document.querySelector('#errorMessage');
const route = document.querySelector('#route');
const back = document.querySelector('#back');
const table = document.querySelector('#table');
const trainLogo = document.querySelector('#trainLogo');

let searchedStation = "";

let API_URL = "";
let env = "";

fetch('../env')
  .then(response => response.text())
  .then((res) => {
    env = res;
    fetch('../env.json')
        .then(response => response.json())
        .then((data) => {
            console.log(data[env]);
            API_URL = data[env];
            loadStationsList();
  })
})

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

back.addEventListener("click", () => {
    route.innerHTML = "";
    trainLogo.src = "";
    // deptableheadings.style.visibility = "visible";
    // deptable.style.visibility = "visible";
    table.style.display = "table";
    back.style.visibility = "collapse";
})

function loadStationsList(){
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
}




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
        searchedStation = CRS_Code;
        
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
    tr.setAttribute("value", url);
    tr.addEventListener("click", (e) => {
        console.log(e);
        if (e.toElement.parentElement.attributes["0"].value) {
            console.log(e.toElement.parentElement.attributes["0"].value); // Ios
            getTrainRoute(e.toElement.parentElement.attributes["0"].value)
        } else {
            console.log(e.path[1].attributes[0].value);
            getTrainRoute(e.path[1].attributes[0].value);
        }  
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

function getTrainRoute(url) {
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        getlogo(data.operator);
        // deptableheadings.style.visibility = "collapse";
        // deptable.style.visibility = "collapse";
        table.style.display = "none";
        back.style.visibility = "visible";
        for (let i = 0; i < data.stops.length; i++) {
            addRouteToPage(data.stops[i].station_name, data.stops[i].platform, data.stops[i].aimed_arrival_time, data.stops[i].status, data.stops[i].station_code);
        }
    })
    .catch((err) => {
        console.log(err); 
});
}

function addRouteToPage(stationName, Platform, DepTime, Status, CRS_Code) {

    if (Platform == null) {
        Platform = "TBC";
    }
    if (Status == null) {
        Status = ""
    }

    let name = document.createElement("p");
    name.setAttribute("id", "name");
    name.innerText = stationName;
    
    let time = document.createElement("p");
    time.setAttribute("id", "time");
    time.innerText = DepTime;

    let nameTime = document.createElement("div");
    nameTime.setAttribute("class", "nameTime");

    nameTime.appendChild(name);
    nameTime.appendChild(time);

    let plat = document.createElement("p");
    plat.setAttribute("id", "plat");
    plat.innerText = `Platform ${Platform}`;

    let stat = document.createElement("p");
    stat.setAttribute("id", "stat");
    stat.innerText = Status.toLowerCase();

    let platstat = document.createElement("div");
    platstat.setAttribute("class", "platStat");

    platstat.appendChild(plat);
    platstat.appendChild(stat);

    
    let div = document.createElement("div");
    div.setAttribute("class", "routeElement");
    
    

    div.appendChild(nameTime);
    div.appendChild(platstat);

    route.appendChild(div);

    if (CRS_Code == searchedStation) {
        console.log("match");
        
        div.style.backgroundColor = "#bfffd0";
    }
}


function getlogo(operator_code){
    fetch(`${API_URL}/app/operator/${operator_code}/false`)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        if (!data.message) {
            trainLogo.src = data.img_url;
        }
        
    })
    .catch((err) => {
        console.log(err); 
    });  
}