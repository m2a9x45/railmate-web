const submitButton = document.querySelector('#submitButton');
const stationList = document.querySelector('#stationList');
const deptable = document.querySelector('#deptable');

fetch('http://railmate.net:3060/app/stations')
    .then(response => response.json())
    .then((data) => {
        console.log(data);

        for (let i = 0; i < data.test.length; i++) {
            addToList(data.test[i].Station_Name, data.test[i].CRS_Code);
        }


    })
    .catch((err) => {
        console.log(err); 
    });

submitButton.addEventListener("click", () => {
    var CRS_Code = stationList.options[stationList.selectedIndex].value;
    console.log(CRS_Code);

    getLiveDep(CRS_Code);

});

function addToList (Station_Name, CRS_Code) {
    let option = document.createElement("option");
    option.value = CRS_Code;
    option.text = Station_Name;
    stationList.appendChild(option);
}

function getLiveDep (CRS_Code) {
    fetch(`http://railmate.net:3060/app/livedepatures/${CRS_Code}`)
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