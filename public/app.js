const first = document.querySelector("#first");
const second = document.querySelector("#second");
const third = document.querySelector("#third");
const btn = document.querySelector("#searchButton");
const searchInput = document.querySelector("#cityInput");

specialButton.addEventListener("click",checkFunctionality);

async function checkFunctionality(string){
    console.log("Ive been pressed ")
    const api_url =  await fetch(`/weather/${string}`);
    let use_data= await api_url.json();
    runFunction(use_data);
}

btn.addEventListener("click",updateDisplay);


function updateDisplay(){
    let useText = searchInput.value;
    console.log(searchInput.value);
    if(useText===""){
        alert("No text Detected");

    }
    else{
        checkFunctionality(searchInput.value);

    }
}


function getWeekday(date){
    let weekNum = new Date(date*1000).getDay()
    let weekday = "";
    switch(weekNum){

        case 0:
            weekday="Sunday"
            break;

        case 1:
            weekday="Monday"
            break;

        case 2:
            weekday="Tuesday"
            break;

        case 3:
            weekday="Wednesday"
            break;

        case 4:
            weekday="Thursday"
            break;

        case 5:
            weekday="Fridayay"
            break;

        case 6:
            weekday="Saturday"
            break;
    }
    return weekday
}

function removeChildren(){
    if(first.childElementCount>0){
        console.log("here is our child",first.children[0])
        first.children[0].remove();
        second.children[0].remove();
        third.children[0].remove();
    }
    else{
        console.log("No children")
    }
}
function runFunction(data){
    console.log("Here iso our data",data)
    //check for children of the elements and delete them 
    removeChildren()
    
    let use_data = data;
    let days = use_data["daily"];
    console.log(days);

    let counter = 0;
    Object.keys(days).forEach(key =>{
        if(counter < 3){ 
        let date = days[key]["dt"];

        var s = new Date(date*1000).toLocaleDateString("en-US");
        let weekday = getWeekday(date) 

        let temp = days[key]["temp"];
        let humidity = days[key]["humidity"];
        let feelsLike = days[key]["feels_like"];
        let desc = days[key]["weather"][0]["description"];
        let icon = days[key]["weather"][0]["icon"];
        let container = document.createElement("div");
        container.classList.add("container");
        
        let dateHolder = document.createElement("h2");
        dateHolder.innerText = weekday;
        container.append(dateHolder);
        let dateTextHolder = document.createElement("h2");
        dateTextHolder.innerText = s;
        container.append(dateTextHolder);




        let tempMax = document.createElement("h4");
        tempMax.innerText = "Estimated High: " + parseInt((temp["max"] - 273.15) * 9/5 + 32);
        container.append(tempMax);
        let tempMin = document.createElement("h4");
        tempMin.innerText = "Estimated Low: "+ parseInt((temp["min"] - 273.15) * 9/5 + 32);
        container.append(tempMin);
        let image = document.createElement("img");
        
        image.src=`http://openweathermap.org/img/wn/${icon}@2x.png`
        container.append(image); 

        let descHolder = document.createElement("h2");
        descHolder.innerText = desc;


        container.append(descHolder);
        switch(counter){
            case 0:
                first.append(container);
                console.log("zero");
                break;
            case 1:
                second.append(container);
                console.log("one");
                break;
            case 2:
                third.append(container);
                 console.log("two");
                 break;
            }
        
        counter += 1
        }
    });
}








//console.log(s)

